# Build status

## Implemented: first local prototype

- Next.js/TypeScript learning workspace with a shared validated lesson contract.
- Two independent authored fixtures: sampled-motion integration and binary search. Neither is represented as generated from the private book.
- Open section/subject navigation, prediction with feedback, live reference models and optional small subject-specific placement checks.
- Local browser persistence for versioned code drafts, current sections, predictions, hints, reflections and the most recent 50 execution records. This is device-local activity, not an authoritative mastery record.
- Standard-library Python in a fresh Pyodide worker for every run, inside an iframe on a separate local origin. Stop and execution/load time limits. Locally served pinned runtime assets; bounded output; static file allowlist and restrictive CSP.
- Keyboard-operable controls, text/table equivalents for the visual models, reduced-motion support, responsive layout and modal focus containment.
- Domain tests and browser workflows for persistence, navigation, assessment, actual Python and mobile layout.

## Explicit prototype boundaries

- No API calls or charges yet. The local API key is not used, bundled or sent to GitHub.
- No uploaded-source ingestion, source-grounded generation, AI tutor, Supabase accounts, cloud sync, worker queue or remote deployment yet.
- Hints and assessment keys are shipped to the browser as authored practice material. These are not secure examination/Proof mechanics. Executions and explanations do not grant mastery.
- The placement UI is a four-item subject-specific prototype, not the planned fuller diagnostic. It makes provisional recommendations; repeated exposure cannot establish independent mastery. No diagnostic attempt history is persisted yet.
- Visual controls reset on page reload or subject switch; code/lesson progress persists. Multi-tab conflict handling, canonical append-only evidence and persisted visual state remain follow-up work.
- Python editor is a labelled text editor for this slice; Monaco and faithful learner-code tracing are not implemented. The visual models are reference models independent of learner code.
- The local runtime uses fixed loopback origins/ports and has no authenticated endpoints. Before hosted/authenticated use, configure a separate credential-free runner site, enforce deployment-specific origins and validate its isolation. Different ports do not isolate cookies; do not add authentication cookies to this local topology without revisiting that boundary.
- The private PDF is ignored by Git and is not served as a public app asset. Supplemental simulation topics still require reviewed sources.

## Next increment

1. Persist visual state and diagnostic sessions; harden progress revision/conflict handling.
2. Complete an authored independent transfer task and review rubric for both subjects.
3. Add selected-page source extraction/preview, exact provenance references and content-review fixtures.
4. Add Supabase ownership/persistence and the bounded generation pipeline, then the contextual AI tutor.

The book remains a test source. The reusable platform contracts and teaching controls must continue to work across subjects.
