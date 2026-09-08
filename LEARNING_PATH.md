# Race telemetry learning path and placement

## Confirmed learner and source

The learner reports intermediate-to-advanced Python and C++, beginner vehicle dynamics, and a goal of becoming a simulation software engineer. Math, signals, numerical methods and modelling experience remain unassessed. Programming fluency does not establish physics knowledge; beginner physics does not require beginner programming lessons.

Source: *Analysis Techniques for Racecar Data Acquisition*, second edition, Jorge Segers, SAE International, 2014. The supplied PDF has 537 pages. Inspection so far covers front matter, the complete contents and introductory pages, with visual checks of contents pages. This is an initial curriculum map, not a claim that every chapter, equation or figure has been validated. Printed page 1 is PDF page 20; preserve both page labels in references and verify individual mappings during lesson preparation.

## Entry and navigation

Offer three equally accessible choices: **Start from fundamentals**, **Find my starting point**, and **Explore topics**. Default this learner to vehicle-dynamics foundations with concise programming instructions; let the optional assessment refine that recommendation.

- All published lessons/checkpoints can be opened directly. Prerequisites are advisory, with a short explanation and links to refreshers; no forced unlock tree.
- Show the entire planned outline, but distinguish planned, preparing and available content. An unpublished lesson cannot be represented as ready.
- Jumping changes the current location only. Keep previous drafts and a return link; do not mark bypassed lessons complete or skills mastered.
- Separate navigation/progress labels (not visited, in progress, visited, skipped by choice) from evidence labels (unassessed, needs practice, demonstrated). Completion and delayed retention remain separate.
- A checkpoint can recommend skipping only the concepts it actually assesses. Learners may ignore the recommendation, revisit basics, or retake a fresh variant.
- Explanation depth is independent of progression: an advanced programmer can request a beginner explanation of tire behaviour without resetting the course.

## Quick-start assessment

Target 10-15 minutes, optional and untimed; allow pause and an explicit “I don't know.” Use a small reviewed fixed bank, existing question/code/teach-back components and deterministic routing. No separate adaptive-testing service or opaque learner score.

| Area | Initial task design | Evidence sought |
| --- | --- | --- |
| Units and physical interpretation | Convert a speed and explain velocity versus acceleration | Unit consistency and meaning, not formula recall alone |
| Graphs and calculus | Interpret speed-time slope/area and estimate distance from a tiny sampled trace | Derivative/integral intuition and assumptions |
| Numerical/data handling | Short Python task handling nonuniform timestamps and identifying invalid samples | Numerical reasoning and data checks; no mandatory syntax tutorial |
| Measurement and signals | Explain whether an unexpected spike necessarily indicates a physical event | Distinguish measurement problems from physical hypotheses |
| Vehicle dynamics | Brief braking/cornering prediction with a causal explanation | Starting mental model; “I don't know” leads directly to foundations |

Use approximately eight short items across these areas, including one code task and two brief explanations. Author expected answers, partial-credit rules, assumptions and misconception mappings before publication. Treat self-reported C++ proficiency as background; the initial Python assessment does not certify it.

Routing is per concept: require two independent successful signals for a provisional “ready” recommendation; one signal or ambiguous reasoning remains unassessed. Incorrect evidence suggests a named refresher. Missing or skipped responses mean unknown, not failure. Hints/help remain available and mark the affected evidence assisted; assistance does not support independent skip recommendations. AI-scored explanations carry their evaluation origin and cannot alone establish readiness. These are initial rules to calibrate in the pilot, not a validated psychometric test.

The result shows a recommended entry lesson, reasons tied to responses, optional refreshers and “Start here / Start from fundamentals / Explore anyway.” Do not claim durable mastery from this short diagnostic. Later checkpoints use fresh application tasks, explanations and existing Proof/retention policies.

## Provisional beginner-to-advanced sequence

This is a proposed teaching order based on the book's contents, not necessarily its chapter order. Each stage needs source review, explicit prerequisites and approved activities before release.

| Stage | Book anchors | Practical checkpoint proposal |
| --- | --- | --- |
| 0. Physical and mathematical foundations | Supplemental prerequisites, then chapter 1 | Explain units, motion, forces and modelling assumptions with a small Python experiment |
| 1. Trust and interpret telemetry | Chapters 1-3; selected measurement topics from 19 | Validate a small dataset, inspect channels and justify a lap comparison |
| 2. Longitudinal behaviour | Chapters 4-6 | Analyse acceleration/braking/gearing and compare a simple prediction against data |
| 3. Cornering and tires | Chapters 7-8; prerequisite load-transfer material from 10 | Explain a cornering trace and test a simplified model's assumptions |
| 4. Loads, suspension and aero | Chapters 9-13, with prerequisites ordered locally | Investigate one subsystem through a controlled experiment and explain mismatches |
| 5. Integrated performance analysis | Chapters 14, 16-18; measurement topics from 19 as needed | Build a reproducible analysis with metrics, uncertainty and an evidence-based conclusion |
| 6. Simulation and validation | Chapter 15 plus explicitly supplemental engineering material | Build a bounded simulation, compare predictions with held-out cases and defend its limitations |

First lesson candidate: interpreting a speed trace, checking units/timestamps and calculating distance. Keep one objective and a tiny clearly labelled synthetic dataset until real telemetry is available. Review relevant chapter 2/3 pages before authoring; this candidate is not yet a published lesson.

The career goal extends beyond this book. Proposed supplemental work includes numerical integration and convergence, model verification versus validation, parameter estimation, reproducible experiments, and eventually implementing a tested Python model in C++ with parity checks and profiling. These topics require their own reviewed sources and remain visibly supplemental. “Advanced” means demonstrated scoped capabilities and independent projects, not a promise of complete professional competence from one book.

## Delivery boundaries and checks

M0 authors the diagnostic bank/rubric and one telemetry fixture. M4 implements entry choices, optional fixed assessment, recommendation and direct navigation for available prototype content. M6 adds module checkpoints and the expanded map. M7 supports the reviewed full-book course. Do not move full-book generation or a C++ execution service into the one-lesson prototype. The PDF is available for offline planning now; application input limits still apply until explicitly expanded and tested.

Verify that skipping creates no mastery evidence; unknown answers create no failure; assisted attempts cannot grant independent readiness; recommendations explain their basis; a jump preserves drafts/return location; retakes preserve prior attempts and use fresh variants; unavailable topics show accurate status; and assessment bypass remains usable by keyboard. The book's figures/equations need visual verification during source review, since extracted text alone is insufficient.
