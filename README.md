# Xecute Labs

Xecute Labs turns technical knowledge into independently executable skill through source-grounded teaching, visual experimentation, Python, debugging, projects, and evidence of learning.

Build in this order: **one excellent lesson → one complete chapter → one technical course**. Every release should already express the teaching philosophy; breadth grows after the learning loop works.

## Run the prototype

Requires Node.js 24 LTS and npm. Install with `npm ci`, then run `npm run dev` and open **http://127.0.0.1:3000**. The same command starts the isolated Python asset/worker service on **127.0.0.1:3001**. Use those exact origins for the local prototype; localhost and other ports are not allowlisted. Both services bind to loopback. Stop them together with Ctrl+C.

No API key is required for the authored lessons. Keep optional `OPENAI_API_KEY` in the ignored `.env` file for later server-side integration. Never prefix secrets with `NEXT_PUBLIC_`. Private PDFs stay in the ignored `PDFs/` folder.

`npm run typecheck`, `npm test` and `npm run build` check the code and production compilation. `npm run test:browser` exercises the app using installed Microsoft Edge on Windows; on other systems run `npx playwright install chromium` first (the test configuration selects bundled Chromium outside Windows). Tests start the development services if they are not already running. `npm start` runs the built app with the local runner after `npm run build`.

See [Build status](BUILD_STATUS.md) for implemented features, local-only boundaries and next steps. This is an early working prototype, not the completed course platform.

## Project documents

- [Project scope](PROJECT_SCOPE.md): the original product vision and requirements.
- [Standout strategy](standout.md): the signature learning experiences and product differentiation.
- [Teaching system](TEACHING_SYSTEM.md): the teaching principles, visual standards, and publication quality gates.
- [Execution plan](EXECUTION_PLAN.md): product interpretation, release boundaries, build order, acceptance criteria, and deferred work.
- [Learning path and placement](LEARNING_PATH.md): race-telemetry curriculum, optional quick-start assessment, open navigation and checkpoint rules.
- [Architecture](ARCHITECTURE.md): system design, content contracts, generation pipeline, storage, execution, and operational boundaries.
- [Requirements map](REQUIREMENTS_MAP.md): coverage and release placement for all 220 numbered sections across the three source documents.

Consolidated planning baseline: September 8, 2026. All three source documents were read in full. The scope defines what to build, the strategy defines how it stands out, and the teaching system defines how it must teach. The plan and architecture reconcile them; these are proposed designs, not completed application functionality. Implementation assumptions and deliberate deferrals are explicit.

Start with milestone M0 in the execution plan, then build the reference lesson player in M1.
