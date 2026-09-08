"use client";
import { useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import type { Lesson } from "@/domain/content";
import { searchTrace, trapezoids } from "@/domain/learning";

export function Visual({ visual }: { visual: Lesson["visual"] }) {
  const [cursor, setCursor] = useState(0);
  const [scale, setScale] = useState(1);
  const [target, setTarget] = useState(
    visual.kind === "binary-search" ? visual.target : 0,
  );
  if (visual.kind === "sampled-series") {
    const values = visual.values.map((v) => v * scale);
    const intervals = trapezoids(visual.times, values);
    const i = Math.min(cursor, intervals.length - 1);
    const current = intervals[i];
    const x = (t: number) => 50 + (t / visual.times.at(-1)!) * 540;
    const y = (v: number) => 230 - (v / 40) * 190;
    return (
      <div className="experiment">
        <div className="visual-head">
          <span>SAMPLED MOTION</span>
          <span className="live-dot">Synthetic data</span>
        </div>
        <svg
          viewBox="0 0 640 280"
          role="img"
          aria-label="Speed over time. Highlighted area is the selected interval's estimated distance."
        >
          {[0, 10, 20, 30, 40].map((v) => (
            <g key={v}>
              <line
                x1="50"
                x2="590"
                y1={y(v)}
                y2={y(v)}
                stroke="#dedfd9"
                strokeDasharray="3 5"
              />
              <text x="38" y={y(v) + 4} textAnchor="end">
                {v}
              </text>
            </g>
          ))}
          <polygon
            points={`${x(visual.times[i])},230 ${x(visual.times[i])},${y(values[i])} ${x(visual.times[i + 1])},${y(values[i + 1])} ${x(visual.times[i + 1])},230`}
            fill="#ccd9a8"
          />
          <polyline
            points={values
              .map((v, j) => `${x(visual.times[j])},${y(v)}`)
              .join(" ")}
            fill="none"
            stroke="#465a28"
            strokeWidth="3"
          />
          {values.map((v, j) => (
            <g key={j}>
              <circle
                cx={x(visual.times[j])}
                cy={y(v)}
                r="5"
                fill="#465a28"
                stroke="white"
                strokeWidth="2"
              />
              <text x={x(visual.times[j])} y="252" textAnchor="middle">
                {visual.times[j]}s
              </text>
            </g>
          ))}
          <text x="50" y="18">
            {visual.yLabel}
          </text>
          <text x="590" y="275" textAnchor="end">
            {visual.xLabel}
          </text>
        </svg>
        <div className="equation">
          <span>
            {current.from}–{current.to} s
          </span>
          <strong>
            {current.mean.toFixed(1)} m/s ×{" "}
            {(current.to - current.from).toFixed(1)} s ={" "}
            {current.area.toFixed(1)} m
          </strong>
        </div>
        <div className="visual-controls">
          <button
            aria-label="Previous interval"
            disabled={i === 0}
            onClick={() => setCursor(i - 1)}
          >
            <ArrowLeft size={16} />
          </button>
          <span>
            Interval {i + 1} / {intervals.length}
          </span>
          <button
            aria-label="Next interval"
            disabled={i === intervals.length - 1}
            onClick={() => setCursor(i + 1)}
          >
            <ArrowRight size={16} />
          </button>
          <button
            aria-label="Reset experiment"
            onClick={() => {
              setCursor(0);
              setScale(1);
            }}
          >
            <RotateCcw size={16} />
          </button>
        </div>
        <label className="slider-label">
          What if every speed changes? <strong>{scale.toFixed(1)}×</strong>
          <input
            aria-label="Speed multiplier"
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={scale}
            onChange={(e) => setScale(Number(e.target.value))}
          />
        </label>
        <p className="visual-summary" aria-live="polite">
          Estimated total distance:{" "}
          <strong>
            {intervals.reduce((sum, item) => sum + item.area, 0).toFixed(1)} m
          </strong>
        </p>
        <details>
          <summary>Inspect the data table</summary>
          <table>
            <thead>
              <tr>
                <th>Time (s)</th>
                <th>Speed (m/s)</th>
              </tr>
            </thead>
            <tbody>
              {visual.times.map((t, j) => (
                <tr key={t}>
                  <td>{t}</td>
                  <td>{values[j].toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      </div>
    );
  }
  const frames = searchTrace(visual.values, target),
    i = Math.min(cursor, frames.length - 1),
    frame = frames[i];
  return (
    <div className="experiment">
      <div className="visual-head">
        <span>BINARY SEARCH</span>
        <span>Inclusive bounds</span>
      </div>
      <label className="target-label">
        Target{" "}
        <input
          type="number"
          value={target}
          onChange={(e) => {
            setTarget(Number(e.target.value));
            setCursor(0);
          }}
        />
      </label>
      <div className="array">
        {visual.values.map((v, j) => (
          <div
            className={`array-cell ${j === frame.mid ? "mid" : ""} ${j < frame.low || j > frame.high ? "discarded" : ""}`}
            key={j}
          >
            <small>{j === frame.mid ? "MID" : `i = ${j}`}</small>
            <strong>{v}</strong>
          </div>
        ))}
      </div>
      <p className="trace-message" aria-live="polite">
        {frame.message}
      </p>
      <div className="equation">
        <span>Current bounds</span>
        <strong>
          low = {frame.low} · high = {frame.high}
        </strong>
      </div>
      <div className="visual-controls">
        <button
          aria-label="Previous step"
          disabled={!i}
          onClick={() => setCursor(i - 1)}
        >
          <ArrowLeft size={16} />
        </button>
        <span>
          Step {i + 1} / {frames.length}
        </span>
        <button
          aria-label="Next step"
          disabled={i === frames.length - 1}
          onClick={() => setCursor(i + 1)}
        >
          <ArrowRight size={16} />
        </button>
        <button aria-label="Reset trace" onClick={() => setCursor(0)}>
          <RotateCcw size={16} />
        </button>
      </div>
      <p className="visual-summary">
        Faded cells have been ruled out. The midpoint is labelled MID; colour is
        supplementary.
      </p>
    </div>
  );
}
