# Requirements coverage

Consolidated baseline: September 8, 2026. All three source documents were read in full: **46 project-scope sections, 84 standout sections, and 90 teaching-system sections (220 total)**. This map accounts for every numbered top-level section; subsections inherit their parent section's placement unless the delivery notes distinguish them.

The sources have complementary roles: [PROJECT_SCOPE.md](PROJECT_SCOPE.md) defines product breadth, [standout.md](standout.md) defines differentiation, and [TEACHING_SYSTEM.md](TEACHING_SYSTEM.md) defines teaching standards. The [execution plan](EXECUTION_PLAN.md) reconciles release boundaries; the [architecture](ARCHITECTURE.md) implements them with one codebase/worker, typed teaching objects, a browser runtime, and evidence in Postgres.

**Delivery labels:** M0–M4 = one-lesson prototype; M5 = pilot; M6 = complete chapter launch; M7 = technical-course MVP. **Expansion** follows M7 with a specific supported source/runtime/domain and its QA. **Optional** means explicitly non-blocking product polish. This is planning coverage, not a claim that functionality is implemented. Standards apply whenever the relevant capability ships; deferring a domain does not waive its teaching standard.

## PROJECT_SCOPE.md

| Sections | Requirement group | Delivery and design |
| --- | --- | --- |
| 1–4 | Vision, problem, promise, audience | M0 learning objectives and first learner; M4 independently useful skill. Broader technical domains follow domain-specific fixtures. |
| 5–7 | Inputs, generation, source grounding and paid-course quality | M2 private chapter ingestion/SourceLock; M3 inspectable plans and quality gate. Larger/multiple source types are expansion. |
| 8–10 | Course, checkpoint lesson and reading experience | M1 lesson player/original passages; M6 chapter outline; M7 course. Rich saved annotations/bookmarks are optional later reading tools. |
| 11 | Explanation depth and representations | M4 typed semantic zoom; M6 all five profiles; concept, exercise and progress identity stay fixed. |
| 12–13 | Visual learning and primitive library | M1 excellent array trace with prediction/control; add equation-linked optimization with the second topic. Larger library grows with supported curricula. |
| 14–17 | Practice, difficulty, coding and deterministic evaluation | M1/M4 varied executable practice, tests and Break It. Browser tests are formative; extra languages and confidential execution are runtime expansion. |
| 18–22 | Tutor, assessment, mastery, adaptation and teach-back | M4 context, diagnostic hints, Proof, Teach-Back, evidence and receipts; M6 targeted detours/review; M7 mixed/contextual adaptation. |
| 23–27 | Guided/independent projects, authenticity, progression, capstone | M4 small application; M6 separate guided build/independent mini-project with decisions; M7 integrated ladder/defense; larger capstones require supported runtime. |
| 28–29 | Personalization and course modes | Goal/background/time preferences now; depth by M6. Multiple routes, Reverse/Build/Exam/Career modes expand after core course quality. |
| 30–32 | UX, progress, motivation, spaced repetition | M1 accessible activity-specific workspace; M4 evidence and named retrieval; M6 due reviews/return loop. XP, streaks and achievement UI optional. |
| 33–34 | Concept graph and cross-domain computation | Local prerequisite edges now; M7 reviewed persistent concepts/mappings. Cross-domain computational enrichment expands naturally, without forced AI. |
| 35–36 | Quality and evaluation | M0 fixtures; M3 technical/pedagogical/editorial/accessibility/runtime publication gates; M5 learner observation. |
| 37–39 | Technical architecture and AI responsibilities | Shared TypeScript schemas, Next.js, Supabase, explicit AI functions, durable worker and isolated Pyodide. No generalized service/provider framework. |
| 40–41 | Complete MVP scope and success | M7 validates every criterion on a supported complete course; M6 already has both project types and five depth profiles. A lesson demo is not the course MVP. |
| 42 | Long-term knowledge-to-mastery direction | Source and runtime expansion reuse the compiler, evidence, skill mappings and safe teaching components. |
| 43–46 | Identity, principles, north star, immediate build | M4 chapter-to-one-objective prototype; M6 chapter; M7 course. Use actual independent performance as the outcome. |

## standout.md

| Sections | Requirement group | Delivery and design |
| --- | --- | --- |
| 0–3 | Product thesis, alternatives, laws and signature loop | M0/M4 cognitive action and executable skill guide the product. Pilot comparison is with learners' actual PDF/AI/IDE workflow. |
| 4 | Learning compiler and source/concept/exercise/visual/project IR | M1–M3 typed plans and teaching objects; nested JSONB initially, with stable IDs and explicit verification. |
| 5 | Xecute Mode | M4 contextual entry into a validated active sequence for a supported concept. Arbitrary instant labs are not a launch promise. |
| 6 | Misconception Graph | M4 authored misconception targets/observations; M6 evidence-derived states and interventions; richer graph UI and learned diagnosis later. |
| 7–11 | Proof, Teach-Back, Break It, What If?, Trace | M4 all core behaviors with a reference trace. M6 adds bounded real learner tracing. Shared exercise/visual components implement the modes. |
| 12–13 | Reality Mode and project ladder | Honest small examples in M4; authentic constraints and separate guided/independent projects at M6; larger projects at M7/runtime expansion. |
| 14 | Bring Your Own Work | Source expansion for repositories/notebooks/datasets/assignments, with ownership and runtime support; no repository integrations in the prototype. |
| 15 | SourceLock | M2/M3 separate material kind, provenance and review; support must be checked beyond reference existence. |
| 16–19 | Universal graph, detours, reverse learning and course modes | M6 smallest validated detour/return; M7 reviewed persistent registry/mappings; broad cross-source identity and alternate route modes expand later. |
| 20–25 | Semantic zoom, multi-angle explanation, confidence, hint budget, tutor context/modes | M4 semantic layers, optional committed confidence, cumulative assistance and current code/visual context; M6 five profiles; additional tutor intents reuse the same orchestration. |
| 26–28 | Mastery Receipts, Skill Passport and project defense | M4 receipt from evidence; M6 written project defense; public passport is platform expansion with explicit trust limits and user sharing control. |
| 29–31 | Pre-publication QA, benchmark suite and Failure Atlas | M0/M3 human-reviewed fixtures and checks; store failure taxonomy now. Aggregate atlas needs sufficient reviewed observations later. |
| 32–35 | Visual system, learner-code tracing, comparison and authenticity | M1 one tested semantic-state primitive; M6 bounded Trace My Code and post-attempt comparison; library and richer realism grow with tasks. |
| 36–40 | Mixed practice, changed-context reviews, Knowledge Diff, multi-source synthesis, versioning | Immutable versions now; M6 reviews; M7 mixed practice. Source expansion adds diff/conflict/affected-lesson updates with versioned mappings. |
| 41–47 | Lab workspace, design, motion, command palette, timeline, motivation and return | M1 activity-specific accessible layout/state; M6 Continue/Review/Build/weak spot. Palette/timeline/themes/achievements are optional polish. |
| 48–51 | Configuration, scope preview, first-minute value and progressive readiness | M2/M3 source/concept preview before costly drafting; M4 meaningful ready-lesson opening and labeled instant sample. Fresh-source latency and review delay stay honest. |
| 52–54 | Transfer recommendations, research learning and documentation onboarding | M7 prerequisite-based next steps; research/docs onboarding are source/domain expansion with contribution/evidence/reproduction or operational-task standards. |
| 55–59 | Creators, useful collaboration, accessibility, offline and AI transparency | Accessibility and explainable provenance/evidence from M1–M4. Creator tools, collaboration and offline packs are later platform capabilities. |
| 60–63 | Conceptual architecture, event model, difficulty calibration and adaptive objective | M2 append-only evidence; M6 rule-based interventions; later empirical difficulty/sequence calibration. Conceptual services remain modules. Optimize learning, not time spent. |
| 64–65 | Competitive matrix and potential advantages | Treat as strategy hypotheses, not verified competitor facts. Invest in evaluated compiler quality, trusted primitives, misconceptions and learning outcomes. |
| 66–68 | Non-goals, narrow launch and five-minute demo | M4 single lesson; M6 substantive chapter with both projects. Demo timings are presentation goals, not an upload SLA or evidence of achieved speed. |
| 69–71 | Lesson quality, anti-slop and outcome metrics | M3 publication rubric/editorial pass; M5 independent transfer, misconception correction, retention, friction and second-source use. |
| 72–75 | Pricing, positioning, landing page and emotional goals | Outcome-first language now; show the actual lesson interaction when marketing ships. Pricing/tiers wait for value/usage evidence; no billing work in the prototype. |
| 76–78 | Roadmap, engineering order and feature-review questions | M4 lesson → M6 chapter → M7 course → source/runtime/platform expansion. Features must add observable learning value and reliable reuse. |
| 79–83 | Long-term differentiation, ultimate vision, filter and signature stack | All twelve signatures have an explicit initial form or expansion stage. Long-term breadth does not add prototype infrastructure. |

## TEACHING_SYSTEM.md

| Sections | Requirement group | Delivery and design |
| --- | --- | --- |
| 0–3 | North star, deliberate authorship, teaching laws, voice/anti-slop | M0 reference design; M3 editorial/pedagogical gates; all lessons prioritize independent capability and specific feedback. |
| 4–8 | Cognitive sequence, pacing, concept router, explanations and semantic depth | M1/M3 plan metadata and concept-specific composition; passive-span/length heuristics allow reasoned exceptions. M6 five profiles with stable semantic layers. |
| 9–14 | Visual purpose, animation continuity, neural reference, component selection and cognition | M1 deterministic state, prediction and meaningful controls. Neural-network standard applies when that topic ships; no requirement for the whole primitive catalog in V0. |
| 15–19 | Example ladder, counterexamples, math, code and algorithm pedagogy | M0/M4 explicit example purpose, invariant/assumptions, numerical/trace checks, decreasing scaffolds, debugging and real transfer. |
| 20–24 | Systems, ML, engineering, analytics and research standards | Algorithms/compact ML first. Each additional route must teach observable state, assumptions/units, real data or research evidence as applicable, backed by its own fixtures. |
| 25 | Fidelity, supplements and disagreements | M2/M3 SourceLock preserves meaning/caveats and origin; future multiple sources retain disagreements and attribution. |
| 26–29 | Misconceptions, exercise design, hints and tutor behaviors | M4 diagnostic tags, evidence origins, plausible distractors, structured written rubrics and restrained current-work help; M6 targeted intervention. |
| 30–34 | Authenticity, project ladder, defense, assessment and Proof | M4 failure/application/unseen proof; M6 distinct projects with learner decisions and written defense; M7 integration. Formative evidence stays explicit. |
| 35–37 | Retention, evidence-based sequencing and minimal detours | Delayed task designed in M4; M6 fresh-context review/detour/return; M7 interleaving and rule-based course adaptation. |
| 38–39 | Localization and accessibility | Locale-neutral logic, glossary, separate labels, keyboard/text/reduced-motion/math equivalents now. Translation, RTL and locale rollout require additional QA later. |
| 40–42 | Engagement, human voice and anti-template rule | M1 cognitive participation; M3 warning linter and editor; varied concept-specific openings, no template-generated filler or gamified clicking. |
| 43–46 | Planning metadata, teaching schema, generation stages and review roles | M1–M3 inspectable source/concept/teaching artifacts and QA. Roles may share calls; state remains typed and reviewed without extra services. |
| 47–49 | QA categories, anti-slop checks and exact shipping rubric | M3 correctness 5/5; fidelity/intentionality/exercise quality/human voice ≥4; normally mean ≥4.3. Hard checks cannot be averaged away. |
| 50–52 | Gradient, binary-search and neural-network exemplars | Binary-search and gradient references in M0/M5; learner trace at M6. Neural-network synchronized forward/backward teaching accompanies later supported ML depth. |
| 53–58 | Course coherence, running examples, friction, struggle, confidence and scalable composition | M4 optional confidence and proportionate help; M6 glossary/notation/example continuity; fixed primitives with adaptive composition, not a universal lesson script. |
| 59–61 | Mechanical verification, translation-safe and accessible animation | M1/M3 semantic state, expected traces, localizable labels, accessible snapshots and deterministic checks where possible. |
| 62–65 | Metrics, teaching experiments, benchmarks and human review | M0/M5 initial references/learner observations. Expand benchmark/source-style review with support; A/B testing waits for meaningful sample sizes. |
| 66–67 | Failure taxonomy and professional editing | M3 categorized QA findings, targeted repair and final editorial review tied to a content hash. Recurring failures become regressions. |
| 68–70 | First minute, meaningful ending and fading scaffolding | M1 active opening; M4 receipt/gaps/next action; M6/M7 progressively independent projects and mixed work. |
| 71–72 | Natural computational enrichment and useful information density | Keep code/trace/equation views calm but capable now; additional domains follow their natural computational path rather than forced ML. |
| 73–78 | Synchronized text/equation/code, performance, visual correctness and delight | M1 one semantic replay cursor and valid state correspondence; M6 actual watched learner state; controls/performance/fallbacks tested. |
| 79–80 | Product anti-goals and ten-element MVP teaching standard | Every released relevant lesson passes teaching §80. One excellent primitive/lesson precedes breadth. |
| 81–86 | Professional quality, thinking, visual value, source specificity, workflow advantage and final checklist | M3/M5 publication and learner gates explicitly review these dimensions; technical truth, meaningful action and accessible teaching are required. |
| 87–89 | Teaching promise, constitution and final standard | Continuous governing criteria: deliberate sequence, precise explanation, real action, useful struggle, evidence, transfer and retention. |

## Deliberate interpretation decisions

- Apply teaching §80 to the first released lesson, and the stronger standout §67 project requirement to the first substantial chapter release. Whole-course breadth remains M7.
- SourceLock needs reviewed support; Proof and receipts express formative evidence, not secret-test integrity or certification.
- First-minute value may come from a labeled reviewed sample while uploaded content is prepared. It cannot come from quietly substituting a sample or publishing raw output.
- Trace My Code has a bounded declared subset and an M1 feasibility gate; a reference animation must never masquerade as learner execution.
- Graphs begin as IDs, edges and evidence. The M7 persistent registry is reviewed; automatic cross-source alignment, aggregate analytics and learned adaptation remain later.
- The full benchmark/domain/language lists define expansion standards. Each supported addition must satisfy them; they do not require implementing every subject, runtime or language before the first lesson.

Change this map alongside the execution plan when a source requirement or release boundary changes. A feature without an initial implementation, an explicit later stage, or a justified exclusion is an unresolved planning gap.
