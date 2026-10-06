"use client";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  Code2,
  Compass,
  FlaskConical,
  Lightbulb,
  Play,
  RotateCcw,
  ShieldCheck,
  Square,
  Terminal,
  X,
  Zap,
} from "lucide-react";
import { lessons, type Lesson } from "@/domain/content";
import { assess, type Answer } from "@/domain/learning";
import { Visual } from "./visual";

type Attempt = {
  id: string;
  at: string;
  kind: "run" | "checks";
  assisted: boolean;
  outcome: string;
};
type Progress = {
  stage: number;
  code: string;
  prediction: number | null;
  revealed: boolean;
  hints: number;
  attempts: Attempt[];
  reflection: string;
};
type Snapshot = {
  version: 1;
  lessonId: string;
  progress: Record<string, Progress>;
};
const keyFor = (lesson: Lesson) => `${lesson.id}@${lesson.revision}`;
const fresh = (lesson: Lesson): Progress => ({
  stage: 0,
  code: lesson.exercise.starter,
  prediction: null,
  revealed: false,
  hints: 0,
  attempts: [],
  reflection: "",
});
const storageKey = "xecute.local-prototype.v1";
const stages = ["Understand", "Experiment", "Implement", "Reflect"];

export function Workspace() {
  const [lessonId, setLessonId] = useState(lessons[0].id);
  const [progress, setProgress] = useState<Record<string, Progress>>({});
  const [loaded, setLoaded] = useState(false);
  const [storageStatus, setStorageStatus] = useState("Loading saved work…");
  const [panel, setPanel] = useState<"source" | "assessment" | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [runtimeReady, setRuntimeReady] = useState(false);
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState(
    "Your output will appear here. Python runs in an isolated browser worker.",
  );
  const iframe = useRef<HTMLIFrameElement>(null);
  const dialog = useRef<HTMLElement>(null);
  const run = useRef<{
    id: string;
    key: string;
    kind: "run" | "checks";
    assisted: boolean;
  } | null>(null);
  const lesson = lessons.find((l) => l.id === lessonId)!;
  const lessonKey = keyFor(lesson);
  const p = progress[lessonKey] ?? fresh(lesson);
  const update = (patch: Partial<Progress>) =>
    setProgress((all) => ({
      ...all,
      [lessonKey]: { ...(all[lessonKey] ?? fresh(lesson)), ...patch },
    }));
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const saved = JSON.parse(raw) as Snapshot;
        if (
          saved.version !== 1 ||
          !saved.progress ||
          !lessons.some((l) => l.id === saved.lessonId)
        )
          throw new Error("Unsupported saved work");
        const valid: Record<string, Progress> = {};
        for (const l of lessons) {
          const value = saved.progress[keyFor(l)];
          if (!value) continue;
          if (
            typeof value.code !== "string" ||
            value.code.length > 30000 ||
            !Number.isInteger(value.stage) ||
            value.stage < 0 ||
            value.stage > 3 ||
            !Array.isArray(value.attempts) ||
            typeof value.hints !== "number" ||
            typeof value.reflection !== "string" ||
            typeof value.revealed !== "boolean" ||
            !(
              value.prediction === null ||
              (Number.isInteger(value.prediction) &&
                value.prediction >= 0 &&
                value.prediction < l.prediction.options.length)
            )
          )
            throw new Error("Invalid saved work");
          valid[keyFor(l)] = value;
        }
        setLessonId(saved.lessonId);
        setProgress(valid);
      }
      setStorageStatus("Saved on this device");
    } catch {
      setStorageStatus(
        "Saved work could not be loaded. Local saving is paused to preserve it.",
      );
    }
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (!loaded || storageStatus.includes("paused")) return;
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ version: 1, lessonId, progress }),
      );
      setStorageStatus("Saved on this device");
    } catch {
      setStorageStatus(
        "Could not save. Keep this tab open and copy your code.",
      );
    }
  }, [loaded, lessonId, progress, storageStatus]);
  useEffect(() => {
    function receive(event: MessageEvent) {
      if (
        event.origin !== "http://127.0.0.1:3001" ||
        event.source !== iframe.current?.contentWindow ||
        event.data?.channel !== "xecute-runner"
      )
        return;
      const data = event.data;
      if (data.kind === "ready") {
        setRuntimeReady(true);
        return;
      }
      const current = run.current;
      if (!current || current.id !== data.id) return;
      if (data.kind === "loaded") {
        setOutput("");
        return;
      }
      if (data.kind === "output") {
        setOutput((text) => (text + data.text + "\n").slice(0, 18000));
        return;
      }
      if (["done", "error", "stopped"].includes(data.kind)) {
        setOutput((text) => text + "\n" + String(data.text));
        setRunning(false);
        setProgress((all) => {
          const l = lessons.find((l) => keyFor(l) === current.key)!;
          const old = all[current.key] ?? fresh(l);
          return {
            ...all,
            [current.key]: {
              ...old,
              attempts: [
                ...old.attempts,
                {
                  id: current.id,
                  at: new Date().toISOString(),
                  kind: current.kind,
                  assisted: current.assisted,
                  outcome: data.kind === "done" ? "completed" : data.kind,
                },
              ].slice(-50),
            },
          };
        });
        run.current = null;
      }
    }
    addEventListener("message", receive);
    const ping = setInterval(
      () =>
        iframe.current?.contentWindow?.postMessage(
          { channel: "xecute-runner", action: "ping" },
          "http://127.0.0.1:3001",
        ),
      1000,
    );
    return () => {
      removeEventListener("message", receive);
      clearInterval(ping);
    };
  }, []);
  useEffect(() => {
    if (!panel) return;
    const previous = document.activeElement as HTMLElement;
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function trap(event: KeyboardEvent) {
      if (event.key !== "Tab") return;
      const elements = dialog.current?.querySelectorAll<HTMLElement>(
        'button:not(:disabled), input, textarea, [tabindex="0"]',
      );
      if (!elements?.length) return;
      const first = elements[0],
        last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", trap);
    return () => {
      document.body.style.overflow = before;
      document.removeEventListener("keydown", trap);
      previous?.focus();
    };
  }, [panel]);
  const stop = () =>
    iframe.current?.contentWindow?.postMessage(
      { channel: "xecute-runner", action: "stop" },
      "http://127.0.0.1:3001",
    );
  const navigate = (id: string) => {
    if (running) stop();
    setLessonId(id);
    setPanel(null);
    setAnswers([]);
    setSubmitted(false);
    setOutput("Choose Run code to execute this lesson’s draft.");
  };
  const execute = (kind: "run" | "checks") => {
    const id = crypto.randomUUID();
    run.current = { id, key: lessonKey, kind, assisted: p.hints > 0 };
    setRunning(true);
    setOutput("Starting Python… The first run loads the local runtime.");
    iframe.current?.contentWindow?.postMessage(
      {
        channel: "xecute-runner",
        action: "run",
        id,
        code: p.code + (kind === "checks" ? lesson.exercise.tests : ""),
      },
      "http://127.0.0.1:3001",
    );
  };
  return (
    <div className="app-shell">
      <a href="#main" className="skip-link">
        Skip to lesson
      </a>
      <aside className="sidebar">
        <a className="brand" href="/" aria-label="Xecute Labs home">
          <span className="brand-mark">
            <Zap size={21} fill="currentColor" />
          </span>
          XECUTE<span className="brand-labs">LABS</span>
        </a>
        <div className="workspace-label">PERSONAL WORKSPACE</div>
        <div className="sidebar-nav">
          <span className="nav-selected">
            <BookOpen size={17} /> My learning
          </span>
          <button
            onClick={() => {
              setPanel("assessment");
              setAnswers([]);
              setSubmitted(false);
            }}
          >
            <Compass size={17} /> Find my starting point
          </button>
        </div>
        <div className="sidebar-section">
          <span>YOUR LEARNING LABS</span>
          <span>02</span>
        </div>
        {lessons.map((l, i) => (
          <button
            className={`course-card ${lessonId === l.id ? "selected" : ""}`}
            key={l.id}
            onClick={() => navigate(l.id)}
          >
            <span className="course-number">0{i + 1}</span>
            <span>
              <strong>{l.subject}</strong>
              <small>{l.title}</small>
            </span>
            <ArrowRight size={15} />
          </button>
        ))}
        <div className="outline">
          <div className="sidebar-section">
            <span>IN THIS LESSON</span>
            <span>04</span>
          </div>
          {stages.map((stage, i) => (
            <button
              className={p.stage === i ? "active-step" : ""}
              key={stage}
              onClick={() => update({ stage: i })}
            >
              <span className="step-dot">{i + 1}</span>
              {stage}
              {p.stage === i && <span className="current-label">NOW</span>}
            </button>
          ))}
        </div>
        <div className="sidebar-bottom">
          <div className="prototype-tag">
            <FlaskConical size={16} /> Prototype · authored lessons
          </div>
          <p>
            Explore any section.
            <br />
            Understanding sets the pace.
          </p>
          <div className="profile">
            <span>YL</span>
            <div>
              Your learning space<small>Local prototype</small>
            </div>
          </div>
        </div>
      </aside>
      <div className="main-shell">
        <header className="topbar">
          <span>
            My learning <span className="slash">/</span>{" "}
            <strong>{lesson.subject}</strong>
          </span>
          <span className="save-status">
            <span />
            {storageStatus}
          </span>
        </header>
        <main id="main" tabIndex={-1}>
          <div className="lesson-header">
            <div>
              <div className="eyebrow">
                LEARNING LAB <span> / </span> {lesson.duration}
              </div>
              <h1>{lesson.title}</h1>
              <p>{lesson.subtitle}</p>
            </div>
            <button
              className="source-button"
              onClick={() => setPanel("source")}
            >
              <BookOpen size={16} /> Source notes <ChevronDown size={14} />
            </button>
          </div>
          <div className="lesson-tabs" aria-label="Lesson sections">
            {stages.map((stage, i) => (
              <button
                aria-current={p.stage === i ? "step" : undefined}
                className={p.stage === i ? "selected" : ""}
                key={stage}
                onClick={() => update({ stage: i })}
              >
                <span>0{i + 1}</span>
                {stage}
              </button>
            ))}
          </div>
          <div className="lesson-grid">
            <section className="lesson-content">
              {p.stage === 0 && (
                <>
                  <div className="section-kicker">
                    <span className="small-icon">
                      <Lightbulb size={17} />
                    </span>{" "}
                    THE IDEA
                  </div>
                  <h2>A few samples. A useful question.</h2>
                  <p className="body-copy">{lesson.introduction}</p>
                  <div className="objective">
                    <span>WHAT YOU’LL BE ABLE TO DO</span>
                    <p>{lesson.objective}</p>
                  </div>
                  <div className="prediction">
                    <span className="micro-label">
                      BEFORE YOU RUN IT · MAKE A PREDICTION
                    </span>
                    <h3>{lesson.prediction.prompt}</h3>
                    <div className="options">
                      {lesson.prediction.options.map((option, i) => (
                        <button
                          key={option}
                          disabled={p.revealed}
                          className={p.prediction === i ? "chosen" : ""}
                          onClick={() => update({ prediction: i })}
                        >
                          <span>{String.fromCharCode(65 + i)}</span>
                          {option}
                          {p.prediction === i && <Check size={16} />}
                        </button>
                      ))}
                    </div>
                    {p.revealed ? (
                      <div className="feedback" role="status">
                        <strong>
                          {p.prediction === lesson.prediction.answer
                            ? "Your prediction fits."
                            : "Let’s inspect the assumption."}
                        </strong>
                        <p>{lesson.prediction.explanation}</p>
                      </div>
                    ) : (
                      <button
                        className="primary"
                        disabled={p.prediction === null}
                        onClick={() => update({ revealed: true })}
                      >
                        Check my reasoning <ArrowRight size={16} />
                      </button>
                    )}
                  </div>
                </>
              )}
              {p.stage === 1 && (
                <>
                  <div className="section-kicker">
                    <FlaskConical size={18} /> THE EXPERIMENT
                  </div>
                  <h2>Change it. Explain what follows.</h2>
                  <p className="body-copy">{lesson.insight}</p>
                  <div className="objective">
                    <span>TRY THIS</span>
                    <p>
                      {lesson.visual.kind === "sampled-series"
                        ? "Predict what happens to total distance when every speed doubles. Move the multiplier, then use the interval controls to explain why."
                        : "Try a target that is absent. Follow the bounds until there are no candidates left. Which update makes the algorithm stop?"}
                    </p>
                  </div>
                  <p className="muted">
                    The visual shows a controlled reference model. It does not
                    trace your Python code.
                  </p>
                </>
              )}
              {p.stage === 2 && (
                <>
                  <div className="section-kicker">
                    <Code2 size={18} /> YOUR IMPLEMENTATION
                  </div>
                  <h2>Turn the idea into working code.</h2>
                  <p className="body-copy">{lesson.exercise.prompt}</p>
                  <div className="editor">
                    <div className="editor-title">
                      <span>practice.py</span>
                      <span>Python · standard library</span>
                    </div>
                    <textarea
                      aria-label="Python code"
                      spellCheck={false}
                      maxLength={28000}
                      value={p.code}
                      onChange={(e) => update({ code: e.target.value })}
                    />
                    <div className="editor-actions">
                      <button
                        className="primary"
                        disabled={!runtimeReady || running}
                        onClick={() => execute("run")}
                      >
                        <Play size={14} /> Run code
                      </button>
                      <button
                        disabled={!runtimeReady || running}
                        onClick={() => execute("checks")}
                      >
                        Run checks
                      </button>
                      <button
                        aria-label="Stop execution"
                        disabled={!running}
                        onClick={stop}
                      >
                        <Square size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="terminal">
                    <span>
                      <Terminal size={14} /> OUTPUT
                    </span>
                    <pre aria-live="polite">{output}</pre>
                  </div>
                  {!runtimeReady && (
                    <p className="muted">
                      Runner not connected yet. Start the app with npm run dev
                      to launch both services.
                    </p>
                  )}
                  <p className="muted">
                    Checks are formative and run in your browser. A completed
                    run is not proof of mastery.
                  </p>
                </>
              )}
              {p.stage === 3 && (
                <>
                  <div className="section-kicker">
                    <ShieldCheck size={18} /> LEARNING EVIDENCE
                  </div>
                  <h2>Make your reasoning visible.</h2>
                  <p className="body-copy">
                    {lesson.visual.kind === "sampled-series"
                      ? "Explain why assuming a fixed sample interval can produce the wrong distance. What uncertainty remains even if your implementation passes every check?"
                      : "Explain why the target cannot be in the discarded half. Then describe a boundary-update bug that would prevent the interval from shrinking."}
                  </p>
                  <label className="reflection-label">
                    Your explanation
                    <textarea
                      value={p.reflection}
                      maxLength={5000}
                      onChange={(e) => update({ reflection: e.target.value })}
                      placeholder="State your assumption, explain your reasoning, and name a limitation…"
                    />
                  </label>
                  <div className="evidence">
                    <h3>Your work so far</h3>
                    <p>
                      {p.attempts.length} recorded executions · {p.hints} hints
                      opened
                    </p>
                    <p>
                      Reflection:{" "}
                      {p.reflection.trim()
                        ? "saved, not evaluated"
                        : "not written yet"}
                    </p>
                    <p>
                      Independent transfer and delayed retention:{" "}
                      <strong>not assessed</strong>
                    </p>
                  </div>
                  <p className="muted">
                    This record describes your activity. A fresh independent
                    task and later retrieval check are needed before making
                    stronger learning claims.
                  </p>
                </>
              )}
              <div className="lesson-footer">
                <span>SECTION {p.stage + 1} OF 4 · FREE NAVIGATION</span>
                {p.stage < 3 ? (
                  <button
                    className="text-button"
                    onClick={() => update({ stage: p.stage + 1 })}
                  >
                    Continue to {stages[p.stage + 1].toLowerCase()}{" "}
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    className="text-button"
                    onClick={() => update({ stage: 0 })}
                  >
                    <RotateCcw size={15} /> Revisit the idea
                  </button>
                )}
              </div>
            </section>
            <aside className="activity-column">
              <div className="activity-heading">
                <span>
                  <FlaskConical size={16} /> THE LIVE MODEL
                </span>
                <span>01</span>
              </div>
              <Visual key={lesson.id} visual={lesson.visual} />
              <div className="coach-card">
                <span className="coach-icon">
                  <Lightbulb size={20} />
                </span>
                <div>
                  <h3>A nudge, when you need it.</h3>
                  <p>
                    Try your own approach first. Open one small hint at a time.
                  </p>
                </div>
                {lesson.exercise.hints.slice(0, p.hints).map((hint, i) => (
                  <p className="hint" key={hint}>
                    <strong>{i + 1}.</strong> {hint}
                  </p>
                ))}
                <button
                  onClick={() =>
                    update({
                      hints: Math.min(
                        p.hints + 1,
                        lesson.exercise.hints.length,
                      ),
                    })
                  }
                  disabled={p.hints >= lesson.exercise.hints.length}
                >
                  {p.hints ? "Show next hint" : "Give me a nudge"}{" "}
                  <ArrowRight size={15} />
                </button>
                <small>Authored hints · AI tutor not connected yet</small>
              </div>
            </aside>
          </div>
        </main>
      </div>
      <iframe
        title="Isolated Python execution"
        ref={iframe}
        src="http://127.0.0.1:3001"
        sandbox="allow-scripts allow-same-origin"
        className="runner-frame"
      />
      {panel && (
        <div className="dialog-backdrop" onClick={() => setPanel(null)}>
          <section
            ref={dialog}
            role="dialog"
            aria-modal="true"
            aria-label={
              panel === "source" ? "Source notes" : "Starting point assessment"
            }
            className="dialog"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === "Escape") setPanel(null);
            }}
          >
            <button
              className="close-dialog"
              autoFocus
              aria-label="Close panel"
              onClick={() => setPanel(null)}
            >
              <X size={20} />
            </button>
            {panel === "source" ? (
              <>
                <span className="eyebrow">CONTENT ORIGIN</span>
                <h2>Know what you’re learning from.</h2>
                <span className="provenance-badge">
                  Authored sample · revision {lesson.revision}
                </span>
                <p>{lesson.sourceNote}</p>
                <h3>Useful prerequisites</h3>
                <ul>
                  {lesson.prerequisites.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p>
                  These are suggestions. You can open any lesson section and
                  return to the foundations whenever helpful.
                </p>
              </>
            ) : (
              <>
                <span className="eyebrow">OPTIONAL QUICK CHECK · 3–5 MIN</span>
                <h2>Find a useful starting point.</h2>
                <p>
                  This small prototype checks a few concepts in{" "}
                  {lesson.subject.toLowerCase()}. It does not assess your
                  overall level. Skip anything you don’t know.
                </p>
                {!submitted ? (
                  <>
                    <div className="assessment-questions">
                      {lesson.checks.map((item, index) => (
                        <fieldset key={item.id}>
                          <legend>
                            {index + 1}. {item.prompt}
                          </legend>
                          {[...item.options, "I don’t know yet"].map(
                            (option, i) => (
                              <label key={option}>
                                <input
                                  type="radio"
                                  name={item.id}
                                  checked={answers.some(
                                    (a) =>
                                      a.itemId === item.id &&
                                      a.choice ===
                                        (i === item.options.length ? null : i),
                                  )}
                                  onChange={() =>
                                    setAnswers((old) => [
                                      ...old.filter(
                                        (a) => a.itemId !== item.id,
                                      ),
                                      {
                                        itemId: item.id,
                                        choice:
                                          i === item.options.length ? null : i,
                                        assisted: false,
                                      },
                                    ])
                                  }
                                />
                                {option}
                              </label>
                            ),
                          )}
                        </fieldset>
                      ))}
                    </div>
                    <button
                      className="primary"
                      onClick={() => setSubmitted(true)}
                    >
                      See my recommendation <ArrowRight size={16} />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="assessment-results">
                      {assess(lesson.checks, answers).map((result) => (
                        <div key={result.concept}>
                          <strong>{result.concept}</strong>
                          <span>{result.status}</span>
                          <p>
                            {result.status === "ready to try"
                              ? "Two correct signals. Try the implementation; this is provisional readiness."
                              : result.status === "needs practice"
                                ? "A response suggests a gap. Start with the idea and experiment."
                                : "Not enough independent evidence. Start anywhere, or revisit the fundamentals."}
                          </p>
                        </div>
                      ))}
                    </div>
                    <button
                      className="primary"
                      onClick={() => {
                        update({
                          stage: assess(lesson.checks, answers).every(
                            (r) => r.status === "ready to try",
                          )
                            ? 2
                            : 0,
                        });
                        setPanel(null);
                      }}
                    >
                      Open recommended section <ArrowRight size={16} />
                    </button>
                    <button
                      className="text-button"
                      onClick={() => {
                        setAnswers([]);
                        setSubmitted(false);
                      }}
                    >
                      Review questions (practice only)
                    </button>
                  </>
                )}
                <button
                  className="text-button"
                  onClick={() => {
                    update({ stage: 0 });
                    setPanel(null);
                  }}
                >
                  Start from fundamentals
                </button>
                <button className="text-button" onClick={() => setPanel(null)}>
                  Explore freely
                </button>
              </>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
