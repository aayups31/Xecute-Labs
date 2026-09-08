# Execution plan

Consolidated baseline: September 8, 2026. Based on complete reads of [PROJECT_SCOPE.md](PROJECT_SCOPE.md) (§§1–46), [standout.md](standout.md) (§§0–83), and [TEACHING_SYSTEM.md](TEACHING_SYSTEM.md) (§§0–89). Technical design: [ARCHITECTURE.md](ARCHITECTURE.md). Complete source coverage: [REQUIREMENTS_MAP.md](REQUIREMENTS_MAP.md).

## 1. What we are building

Implementation update: the platform is subject-independent. The race-telemetry book is a private test source, not the core curriculum or a hardcoded product assumption. The first working slice uses two independent authored lessons (sampled motion and binary search) through shared contracts. See [BUILD_STATUS.md](BUILD_STATUS.md) for actual implementation and remaining milestones.

The product helps a learner **use what a technical source teaches**. Its value comes from connecting the source, an understandable explanation, an interactive demonstration, progressive practice, and independent application in one continuous experience.

The key product object is a **teachable concept with evidence of learning**. A PDF supplies material; a course organizes it; a lesson teaches it; attempts and projects show whether the learner can apply it. This relationship should drive both the interface and the data model.

The six questions in scope §3 guide content coverage: what, why, how, visual intuition, implementation, and independent application. They are not six headings to repeat in every lesson. The teaching system governs concept-specific sequencing and quality; the standout strategy adds diagnosis, deliberate failure, proof, transparent evidence, and retention.

Three decisions govern execution:

1. **Prove the lesson before scaling generation.** Scope §46 explicitly starts with one chapter and one useful lesson. Build an authored reference lesson first so generation has a concrete quality target.
2. **Preserve depth while limiting breadth.** Keep meaningful visualization, executable practice, hints, assessment, and a small project in the prototype. Limit supported material and runtime instead of reducing the experience to summaries and quizzes.
3. **Make quality observable.** Inspect source references, run exercise and visual-state tests, record misconceptions and assistance, observe learners, and measure transfer and delayed retention. Course completion alone does not establish learning.

The signature loop is **ground → understand → visualize → predict → manipulate → implement → break/debug → apply → prove → recall later**. Choose the useful stages for each concept. Shared components should produce varied, deliberately authored lessons rather than identical rhetorical templates.

### Teaching decisions that apply from the first lesson

- Start with a concrete problem, prediction, or surprising behavior; build the mental model before notation when appropriate. Restore exact definitions and assumptions after intuition.
- Route by concept type: algorithms need invariants, traces, and edge cases; mathematical relationships need parameters, units, and limits; systems need observable events; ML needs the data-to-evaluation chain. Implement only the routes used by supported topics.
- Record each major step's objective, cognitive action, targeted misconception, example purpose, scaffolding, and reason for its placement. Add counterexamples where an assumption can plausibly be misunderstood.
- Use the teaching system's 2–5 minute active rhythm as a planning heuristic. Flag long passive stretches for review; never enforce a click timer or word quota. Remove repetitive prose and content-free interactions.
- Make visual state, explanatory text, relevant code, and equations agree. Preserve object identity and learner control. A wrong animation is a correctness defect.
- Let depth expose another representation or reasoning layer, such as a worked example, derivation, implementation, or failure case. Do not merely lengthen the same answer.
- Teach realistic decisions progressively. Small examples are useful when labeled honestly; later tasks should contain authentic constraints, imperfect inputs, and tradeoffs.
- End with what the learner demonstrated, what remains unproven, and the next practice/review action. Keep intellectual difficulty while removing logistical friction.

## 2. Working assumptions

Confirmed first user use case: the project owner wants to learn race telemetry toward becoming a simulation software engineer, reports intermediate-to-advanced Python/C++, and is a complete beginner in vehicle dynamics. Math and numerical-methods readiness remain unassessed. The supplied 537-page *Analysis Techniques for Racecar Data Acquisition*, second edition, has been inspected for contents and introductory context, not yet reviewed chapter by chapter. [Learning path and placement](LEARNING_PATH.md) specifies a beginner-to-advanced map, optional quick-start assessment and unrestricted navigation among published lessons. Binary search and gradient descent remain engineering fixtures, not compulsory learner prerequisites. The full book is available for offline planning; this does not expand prototype ingestion/runtime limits.

The remaining defaults below are proposals, not established facts about the learner or book. They allow implementation to begin without inventing a business model or a large organization.

| Decision | Initial default | Revisit when |
| --- | --- | --- |
| First learner | Project owner learning race telemetry toward simulation software engineering; intermediate-to-advanced Python/C++, beginner vehicle dynamics | Diagnostic clarifies math/numerical readiness |
| First real topic | Candidate: interpret a speed trace and calculate distance; verify relevant chapter 2/3 pages before authoring | Source review and diagnostic suggest a better entry |
| Second topic | A small numerical/ML concept such as one-dimensional gradient descent | The first lesson passes its quality gate |
| Input | One English, selectable-text chapter PDF; proposed limit 30 pages / 20 MB | Extraction and generation measurements justify larger inputs |
| Runtime | Single-file Python, standard library; add a named package only for a validated lesson | A required project cannot fit this runtime |
| Tracing | Reference trace in the prototype; bounded Trace My Code for supported single-function Python at chapter launch | The pinned-runtime tracing spike demonstrates a larger supported subset |
| Language | English initially; locale-neutral teaching logic, separate display strings, and terminology glossary from the start | A supported second language can pass technical translation QA |
| Product access | Private, authenticated, invite-only pilot | Reliability, cost, privacy, and quality gates support broader access |
| Content review | Builder reviews each generated lesson before pilot publication | Automated validation and measured quality support removing this gate |
| Team | One primary builder with access to a subject reviewer and pilot learners | Actual staffing becomes known |

Start by testing supported inputs honestly. Scanned, encrypted, badly extracted, diagram-dependent, or unsupported chapters receive an actionable explanation. Large books are a later release. A chapter with multiple unrelated objectives may need several lessons; the prototype selects and labels one coherent objective instead of claiming complete coverage.

## 3. Release boundaries

The prototype proves one selected objective from a chapter. The chapter launch teaches a substantial source/module set. The course MVP satisfies scope §§40–41 across a complete supported technical course. These are distinct completion claims.

| Capability | Lesson prototype, M4 | Chapter launch, M6 | Course MVP, M7 |
| --- | --- | --- | --- |
| Source/curriculum | Chapter extraction, concept/strategy preview, one coherent lesson | Multiple lessons, prerequisite edges, explicit covered/omitted sections | One supported PDF, chapter-to-chapter ordering and coverage |
| SourceLock | Auditable source, supplemental, inferred-prerequisite, external-example, and uncertain states | Same provenance on all released content | Cross-lesson audit and version history |
| Xecute / What If? | Open a validated concept activity; commit a prediction, manipulate, run, inspect, explain | More activities composed from tested primitives | Additional concept routes and course-specific components |
| Trace | Controlled reference trace synchronized with code/text | Trace My Code for declared single-function exercises; compare after an attempt | Expand only where the supported runtime permits faithful traces |
| Practice / Break It | Concept check, implementation, meaningful failure/debugging, application | Every substantial programming module includes failure analysis and decreasing scaffolding | Mixed practice, integration, realistic constraints |
| Proof / Teach-Back | Fresh unaided task, initially hidden help/source, short causal explanation | Multiple independent checks and a project defense | Module/final assessments, transfer and delayed proof |
| Explanation zoom | Persistent concept layers and focused variants; stable task identity | All five depth profiles with layer-specific representations | Consistent notation/terminology throughout the course |
| Tutor | Current code/run/visual/source context; diagnostic progressive hints | Small prerequisite detour and return; local misconception-aware practice | Richer project, review, connection and challenge behaviors |
| Projects | Small guided application plus an unseen transfer check | **Separate guided build and independent mini-project** for each substantial source/module set | Longer ladder, integrated independent project, written defense |
| Evidence / receipts | Append-only attempts/hints/predictions; basic Mastery Receipt and misconception observations | Course-local misconception states, changed-context review queue | Persistent skill IDs with reviewed course mappings; cross-course evidence remains scoped |
| Retention | Named delayed retrieval task and due date | Simple spaced review and next useful action | Interleaving, old concepts in new projects, multi-week progress |
| Accessibility / language | Keyboard, reduced motion, equivalent textual state, glossary and separate labels | All five depths remain accessible; translation-ready schemas | Supported-language rollout only after translation QA |

### Signature features without separate subsystems

Xecute opens the next validated active sequence; Break It is an exercise kind; What If? is a prediction-plus-experiment interaction; Proof is an assistance policy on an unseen assessment; Teach-Back is a rubric-scored explanation; SourceLock is reviewed provenance; a Mastery Receipt is a view of evidence. Keep these experiences recognizable and contextual without filling the interface with twelve mode buttons.

Reality Mode begins with meaningful constraints in chapter projects. The universal skill graph begins at M7 with a small reviewed canonical concept registry and prerequisite relations in Postgres. Automated cross-source matching, Knowledge Diff, and broad graph navigation belong to later source expansion. No graph database is required.

## 4. Reference learner journey

1. **Start:** choose a chapter, learning goal, and background. Offer Start from fundamentals, an optional 10-15 minute placement assessment, or Explore topics as specified in [LEARNING_PATH.md](LEARNING_PATH.md). Recommendations never lock published lessons or treat skipped material as mastered. Keep time/pace optional with a default. Show supported-material limits beside upload and a clearly labeled pre-reviewed sample for immediate exploration.
2. **Verify:** preview extracted pages, detected concepts, prerequisites, intended visual/practice/project, and the selected objective before costly lesson drafting. Show missing text, uncertain equations, and unsupported sections. At chapter launch allow include/exclude and ordering preferences; advanced merge/split editing can follow demonstrated need.
3. **Prepare:** show real stages such as reading source, planning lesson, and checking exercises. A failed stage can be retried. The pilot also identifies when a lesson is awaiting review.
4. **Learn:** enter through a concrete problem and meaningful action in the first minute where feasible. Use focused reading or a task/workspace split; SourceLock stays available while relevant text, visual state, code, and equations agree.
5. **Try:** commit a prediction, optionally state confidence, manipulate/run, observe, and explain. Implement, Break It, and apply with decreasing scaffolding. Record results and give specific, diagnostic hints.
6. **Demonstrate:** enter Proof with an unseen task and initially hidden source/help. Requesting assistance remains possible and changes evidence classification. Include Teach-Back; show a Mastery Receipt with capabilities, supporting work, assistance, limitations, and gaps.
7. **Return:** resume the exact checkpoint, visual state, and code draft; review a fresh delayed task; choose Continue, Review, Build, or a relevant weak spot without a dense dashboard.

The first-minute interaction goal and standout's five-minute demo timings are experience targets, not measured upload SLAs. An immediate sample must identify its own source; never pass it off as generated from the upload. Show real preparation/review status for fresh content. Start the first validated lesson while later lessons are prepared, without exposing unverified teaching. Measure sample activation, uploaded-source activation, automated generation, and review delay separately.

The primary screen is the lesson. Source and tutor panels open when useful. Show the current objective, next action, and progress with typography and spacing; avoid building a dashboard before the lesson works. Keyboard operation, readable equations, text alternatives for visuals, reduced motion, and visible save/error states are part of the learning experience.

### Reference lesson: binary search

Use an owned or appropriately usable chapter as the source fixture. Keep the project within taught material.

| Checkpoint | Learner action | Evidence |
| --- | --- | --- |
| First encounter | Find a target in a sorted array; compare checks with linear scan | Initial prediction and explanation of avoidable work |
| Predict and trace | Commit the midpoint/retained interval; advance a synchronized trace | Prediction, outcome, and causal explanation |
| Ground and formalize | Inspect the source passage; articulate sorted-input assumption and interval invariant; derive halving cost | Source-linked definition and operation-count reasoning |
| What If? / counterexample | Change target or violate sorting, predict, then inspect failure | Evidence about the sorted-input misconception |
| Implementation | Move from a small scaffold to an implementation from requirements | Deterministic absent, empty, and boundary cases |
| Break It | Reproduce and repair an off-by-one/non-shrinking interval; use learner-code trace at M6 | Failing case, repair, and explanation; assistance retained |
| Guided application | Find an exact timestamp in a sorted log with defined missing-value behavior | Milestone tests and a usable function |
| Proof and Teach-Back | Solve a fresh scenario without the worked solution; explain why the invariant permits discarding candidates | Independent task plus rubric-scored causal explanation |
| Receipt and return | Inspect what is demonstrated and attempt a changed-context check after 3–7 days | Evidence receipt now; retention evidence only after the delayed result |

This is a reference sequence, not a fixed screen template. A question with renamed variables is insufficient transfer. At M6, add a separate independent task such as locating the first threshold crossing in monotonic measurements, after teaching predicate monotonicity and boundary semantics. For non-monotonic data the learner must explain why search is invalid. Do not introduce answer-space search, duplicate-first semantics, or file processing without teaching their prerequisites. Use gradient descent as the second authored reference to test a different entry strategy, equation-linked state, parameter experiment, and sign/step-size misconception.

## 5. Build order and completion gates

Milestones are ordered by dependency. Effort ranges below are planning estimates for one experienced full-time builder, not delivery commitments. Re-estimate after M1 and M3; parsing, teaching quality, and feedback can dominate implementation time.

| Milestone | Deliverable and scope | Acceptance gate | Indicative effort |
| --- | --- | --- | --- |
| **M0 — Define the reference** | Select 3 supported chapter fixtures and 2 rejection fixtures. Author the binary-search lesson and a gradient-descent reference brief with concept plans, expected traces, misconception targets, proof tasks, and the teaching rubric. Choose model/runtime candidates through a small comparison. | A reviewer can explain why every major step exists, which misconception it diagnoses, and what demonstrates transfer. Expected outcomes precede generation. | 2–3 days |
| **M1 — Build the lesson experience** | Render the authored lesson through shared teaching objects. Add one state-driven visual, committed prediction, code/text synchronization, Monaco/Pyodide, source view, accessible fallback, and draft/visual-state saving. Spike bounded learner-code tracing before committing its release scope. | Reference replay is deterministic; controls stay responsive; meaning is preserved without animation; code runs/stops without lost work. Clearly label reference versus learner execution. | 6–9 days |
| **M2 — Ground and persist** | Supabase Auth/private uploads, parser, SourceLock, concept/strategy preview, lesson versions, append-only evidence, owner checks, resume, and deletion. | References resolve; unreadable input is rejected; prediction precedes reveal in the product flow; retries cannot duplicate evidence; cross-account access fails. | 4–6 days |
| **M3 — Generate and review** | Durable source/concept/teaching plans; draft generation; inspectable technical, pedagogical, editorial, accessibility and runtime checks; bounded repair; reviewer preview. | All 3 supported fixtures produce reviewable drafts. Published lessons meet teaching §49; reference solutions pass and known wrong solutions fail; visual states and source support are checked; recovery cannot duplicate publication. | 6–10 days |
| **M4 — Complete the lesson prototype** | Contextual tutor, diagnostic hints, semantic zoom, Break It, What If?, Teach-Back, Proof, guided application, misconception evidence, Mastery Receipt, and delayed-review design. | Fresh upload reaches the complete reviewed experience and satisfies all ten teaching §80 requirements. Independent evidence is distinguishable from assisted work; receipt states unproven capabilities. | 5–8 days |
| **M5 — Pilot and improve** | Observe 5–8 learners on fresh generated lessons, including the second topic. Inspect transfer, misconceptions, friction, delayed retrieval, cost and reviewer effort. | No critical content/privacy/runtime defect; at least 4 of the first 5 complete without navigation help; most improve on matched unseen tasks. Results are directional, not an efficacy claim. | 1–2 weeks including observation |
| **M6 — Launch one complete chapter** | Multiple coherent lessons, prerequisite/detour return path, supported Trace My Code, five depth profiles, separate guided/independent mini-projects, written project defense, misconception-targeted practice, and changed-context review queue. | Meets standout §67 for a substantial source. Learner trace reflects actual captured code, including bugs. Reviewer can trace every task to taught skills; learner can explain, implement, debug, transfer, and inspect the evidence. | Re-estimate after M1/M5 |
| **M7 — Deliver the course MVP** | Bounded one-PDF course, progressive generation, cross-chapter sequencing, mixed practice, project ladder, final assessment, small persistent skill registry and reviewed concept mappings, rule-based adaptation. | All scope §41 criteria demonstrated on a full supported course; teaching/standout standards continue across lessons. Multi-week use and retention are observed; review and compute capacity remain viable. | Re-estimate after M6 |

M0–M4 imply roughly 23–36 builder days before pilot iteration under these assumptions. This estimate includes the richer teaching contract and review work; tracing feasibility, source quality and observed learner needs may change it. A calendar date follows actual staffing and early results. M6/M7 are not fixed-price promises to handle every textbook.

### First implementation tasks

Execute these in order; avoid spending the first sprint on infrastructure without a learning screen.

1. Select the binary-search source; write the mental model, invariant, misconception targets, counterexample, transfer/proof task, expected trace, and known incorrect solutions.
2. Create the minimal Next.js/TypeScript app and versioned source/concept/teaching/exercise schemas with an authored fixture. Establish a lockfile and basic lint/type checks.
3. Build the first-minute problem/prediction/reveal, checkpoint player, and SourceLock reading view before generation.
4. Implement the array state/trace with one replay cursor driving visuals, text, and code; include a text/keyboard equivalent and separate display labels.
5. Build the isolated Python runner, tests, and Stop/restart. Spike real learner tracing, then record the supported subset and gaps.
6. Observe one learner using the reference lesson, then proceed to upload/persistence and generation.

After the shared content and runtime contracts are agreed, source ingestion can proceed alongside player polish. Tutor and progress work can proceed alongside generation validation. Keep one owner for schema changes; do not let each feature invent its own lesson representation.

## 6. Quality and evaluation

### Content publication gate

Each generated lesson gets a compact validation report. Automated checks establish structural and mechanical properties; a subject review establishes whether the teaching and source interpretation are sound during the pilot.

Every released technical lesson must satisfy the ten-part gate in teaching §80: source-grounded explanation; an excellent concept-specific visual when appropriate; prediction before reveal; meaningful manipulation/trace; executable Python where relevant; deterministic verification; failure/debugging; progressive hints; application/transfer; and a proof checkpoint. Optional modalities need a recorded pedagogical reason, not silent omissions.

| Dimension | Pass condition |
| --- | --- |
| Grounding | Every source-backed definition, equation, and substantive explanation has a resolvable passage reference. Quoted text comes from stored extraction. Reviewer checks that the cited passage actually supports the claim. |
| Accuracy | No meaningful technical error, including visual geometry/state, equations, signs, axes, units, and caveats. Unsupported extensions are labeled supplemental. Unreadable required equations block publication. |
| Sequencing | Required concepts are taught earlier or explicitly declared prerequisites. A missing prerequisite has a clear route to review it. |
| Interaction | Prediction is committed before reveal; the action exposes reasoning; object identities, replay, text/code/equation references and accessible fallback agree. |
| Exercise validity | Reference solution passes; representative known-bad solutions fail; expected answers and edge cases are independently checked. Tests run in the supported Python runtime. |
| Learning progression | Practice reduces scaffolding, targets plausible misconceptions, includes failure, and measures transfer through a fresh task. A changed-context delayed retrieval task is planned. |
| Tutor behavior | Initial help guides; citations use provided references; latest failures are reflected; assisted work is not presented as independent mastery. |
| Presentation | Strong concept-specific opening, concise human voice, coherent notation/glossary, no fake realism, useful ending, keyboard/reduced-motion equivalents, and no lost draft or visual state. |

Use the twelve dimensions in teaching §49: **correctness, source fidelity, clarity, intentionality, engagement, visual quality, exercise quality, realism, tutor quality, human voice, transfer, and retention design**. A major lesson requires correctness **5/5** and fidelity, intentionality, exercise quality, and human voice each **at least 4/5**. Normally revise an average below **4.3/5**. For the pilot, adopt 4.3 as the default release threshold; any pedagogically justified exception to an average must be explicitly recorded and cannot waive the hard floors or failed technical checks. Score with evidence, not model self-certification; this rubric is not an externally validated educational measurement.

Add a small anti-slop warning pass for repeated phrases/headings, generic openings, excessive passive spans, trivial distractors, missing source specificity, and visuals without a learning objective. An editorial pass resolves warnings and removes padding; phrase lists and word ranges are review aids, not automatic quality verdicts. Separate technical, pedagogy, editorial, accessibility/localization-readiness, and runtime reports even when one reviewer/model covers several roles.

### Small evaluation corpus

Maintain 3 supported source chapters across two topics: one source used for prompt development and two source treatments held out for release evaluation. Build human-reviewed binary-search and gradient-descent reference lessons; a reference lesson does not make a held-out source available for prompt tuning. Include unreadable/scanned and malformed/encrypted rejection cases. Store expected extraction/concept plans, prerequisites, teaching strategies, misconceptions, traces, units/ranges, reference/wrong solutions, hint/Teach-Back cases and proof tasks. Expand to recursion, graphs, matrices, neural networks, systems and other benchmark topics as those domains become supported, retaining the larger teaching §64 list as the coverage roadmap.

For every generation-system change, run the supported benchmark suite and compare with the accepted version. Scope checks to the affected layer: parser fixtures for extraction, trace fixtures for animation, and paid generations for changes to prompts/models/planning. Cosmetic application changes need no paid corpus run. Before expanding source support, review representative dense, code-heavy, math-heavy and lecture-note inputs; later research/docs/engineering styles each need their own readiness review.

Tag defects using teaching §66: fidelity, prerequisite, explanation, slop, visual, interaction, exercise, verification, tutor, realism, or localization failure. Turn recurring defects into small regression cases. Pedagogical A/B tests, empirical difficulty calibration and aggregate Failure Atlas work follow sufficient usage; record the evidence needed now.

### Learning and operating measures

- **Primary learning signal:** matched unseen-task performance, blank-editor independence, causal Teach-Back, correction of observed misconceptions, and a fresh delayed check after 3–7 days. Record hints, attempts, confidence when requested, and the trust origin of each result.
- **Experience:** time to first meaningful interaction, completion without navigation help, abandonment, excessive hints/unclear instructions, project completion, D1/D7/D30 return, and voluntary second-source use. Early small samples give directional evidence only.
- **Content reliability:** first-pass validation rate, critical defects, source-reference failures, repair count, and review minutes per lesson.
- **Performance:** automated time to validated draft, separate human-review delay, tutor response latency, first Python load, subsequent execution time, and resume/save failures.
- **Economics:** tokens and configured-price cost per accepted lesson, per failed generation, and per learning session; include retries, review, and hosting. Set pilot quotas using M3 measurements before inviting learners.

Do not invent precise mastery percentages, learning efficacy, or revenue targets. Show independent/transfer/retention evidence and unresolved misconceptions. Prototype targets: useful activity within the first minute of an opened ready lesson; ordinary UI transitions roughly 120–300 ms and conceptual transitions roughly 300–900 ms as useful; subsequent small reference runs under 2 seconds and effective Stop within 1 second on declared devices. Preserve responsive controls, pause/replay and lower-power fallbacks. These are test targets, not measured claims; record cold runtime load separately.

## 7. Deliberate deferrals and triggers

| Defer | Reason | Evidence that justifies adding it |
| --- | --- | --- |
| Vector database / embeddings | A chapter and explicit passage links fit bounded context retrieval | Course-wide questions repeatedly miss relevant passages despite section search |
| Graph database | Prerequisites are a small adjacency list | Actual queries and scale exceed normal relational operations |
| General agent framework | Generation is a short, controlled sequence | Real branching workflows cannot be expressed clearly as ordinary functions/jobs |
| Redis / separate workflow platform | Postgres can hold the small durable work queue | Measured queue throughput or workflow recovery needs justify a replacement |
| Autonomous course-wide rewriting | It destabilizes sequence and saved attempts | Local remediation rules consistently fail to help learners |
| Arbitrary generated UI | It complicates correctness, accessibility, and execution | Repeated valuable concepts cannot use the existing primitives |
| Cloud grading and hidden-test secrecy | Self-study feedback works in the browser | Credentials, competitions, secret tests, larger workloads, or supported languages require trusted server execution |
| Automated code-validation service | Browser-based reviewer execution is sufficient for a small pilot | Review becomes a measured bottleneck or unattended publication is required; build isolated validation before removing the gate |
| OCR and layout-heavy ingestion | Extraction quality is a separate substantial problem | Unsupported input is a frequent, valuable pilot need |
| XP, streaks, skill-tree UI | They do not prove understanding | Returning learners need motivation after the core learning loop works |
| Billing, teams, public course sharing | Audience and willingness to pay are untested | A business/access model is chosen and pilot value is established |
| Universal Python debugger | One watched-function trace can prove the interaction | Supported learner work repeatedly needs additional state/constructs and runtime tests establish fidelity |
| Autonomous misconception clustering | Explicit misconception IDs and evidence are actionable | Enough reviewed observations support reliable clustering and intervention comparisons |
| Full translation product | English can validate the teaching loop with translation-ready objects | A requested language has glossary, interaction, equation and technical QA coverage |

### Expansion after M7

| Stage | Scope and defining gate |
| --- | --- |
| **Source flexibility** | Larger books, multiple PDFs/notes, repositories and owned work, research-paper and documentation inputs, Knowledge Diff, conflict attribution, source-change impact updates, and reviewed cross-source skill mappings. Add one source type only after its extraction and teaching benchmarks pass. Reverse/Build Mode reuses the same concept graph with a different path. |
| **Runtime depth** | More languages, multi-file workspaces, SQL, terminal/Git, trusted cloud execution, PyTorch/GPU and richer simulations. Add each for a concrete project that the browser runtime cannot support. |
| **Platform** | Instructor review/editing, useful collaboration, private institution/company onboarding, optional Skill Passport/sharing, offline study packs, and pricing based on observed value. Identity/assessment trust must match any public capability claim. |
| **Evidence-driven refinement** | Empirical difficulty, pedagogy A/B tests, aggregate Failure Atlas, richer adaptation and transfer recommendations. These need sufficient reviewed longitudinal evidence; do not manufacture a data moat from the pilot. |

Optional product polish includes a keyboard command palette, learning timeline, light/dark themes, saved reading annotations, and restrained achievements. None should displace correctness, meaningful interaction, or accessible learning. Marketing should demonstrate the actual source-to-skill flow; demo timings, competitor comparisons and proposed pricing in standout are strategy ideas, not verified market facts or launch promises.

## 8. Reconciliation and traceability

[REQUIREMENTS_MAP.md](REQUIREMENTS_MAP.md) accounts for all 220 numbered sections across the three source documents, including future standards. The following decisions resolve overlap without silently dropping stronger requirements.

| Tension | Decision |
| --- | --- |
| One lesson vs chapter vs course | M4 proves one objective; M6 is the complete chapter release; M7 is the scope §§40–41 course MVP. |
| Projects in standout §§67 and 76 | Apply the stronger chapter-launch standard: separate guided and independent projects at M6; grow their complexity at M7. |
| Five depths vs semantic zoom | One stable concept with typed reasoning/representation layers and five learner profiles by M6; assessment identity remains fixed. |
| Instant interaction vs reviewed teaching | Immediate, honestly labeled reviewed sample; progressive source preview and first validated uploaded lesson. Never imply unreviewed content or substituted samples are ready. |
| Conceptual services / review roles | Ordinary modules and inspectable artifacts inside one app/worker. Several roles can share a model call; no requirement for nine deployed agents. |
| Trace vs Trace My Code | Reference trace at M4; real, bounded learner-function trace at M6 after a runtime spike. Unsupported programs still Run but do not receive a fabricated trace. |
| Proof vs trusted examination | Proof reduces in-product assistance and captures evidence; browser results remain formative/client-reported. Source or hint use changes the evidence state. |
| Mastery and misconception graphs | Preserve evidence/IDs now; use transparent rules and receipts. Add reviewed cross-course mappings at M7 without inferred precision or automatic merging. |
| Translation and accessibility | Separate language from teaching state from the start; accessible alternatives ship with each primitive. Additional languages require their own quality gate. |
| Detailed standards vs broad support | Apply the relevant teaching standard whenever a domain ships; the neural-network, systems, research and engineering examples do not require launching every domain at once. |

Proceed with M0/M1. The first reviewable implementation should demonstrate the authored prediction → trace → code → failure → proof loop with source evidence, before expanding generation volume.
