# Project Scope — AI-Native Interactive Learning Platform

## 1. Project Vision

Build an AI-native learning platform that transforms textbooks, PDFs, lecture notes, technical references, and other educational material into a structured, self-paced, hands-on course.

The platform is focused on:

- Computer Science
- Programming
- Artificial Intelligence
- Machine Learning
- Data Science
- Computational learning applied to other domains such as engineering, finance, science, economics, and related technical fields

The core idea is not simply to summarize a PDF or generate quizzes.

The goal is to convert source material into a complete learning experience inspired by platforms such as:

- Boot.dev
- freeCodeCamp
- Codecademy
- Duolingo

The platform should teach learners by combining:

- Source-grounded reading
- Simple explanations
- Visual intuition
- Smooth animations
- Interactive diagrams
- Graphs and simulations
- Coding exercises
- Debugging exercises
- Progressive practice
- Guided projects
- Independent projects
- AI tutoring
- Assessment
- Adaptive mastery tracking

The experience should feel like learning from a high-quality instructor and an interactive lab at the same time.

---

# 2. Core Problem

Traditional technical learning often requires the learner to combine several disconnected tools and resources.

A typical workflow looks like:

1. Read a textbook
2. Search online when something is confusing
3. Watch videos
4. Open an IDE separately
5. Find practice problems
6. Search for project ideas
7. Ask an AI assistant for help
8. Manually track progress
9. Figure out whether they actually understand the material

This creates several problems:

- Textbooks can be dense and difficult to follow
- Learners often do not know what information is important
- Explanations are rarely adapted to the learner
- Reading is passive
- Practice is often disconnected from the source material
- Projects may be too easy, too difficult, or irrelevant
- Learners struggle to connect theory to real-world industry work
- AI tutors often provide answers without understanding the curriculum
- There is no reliable progression from understanding to mastery
- Learners frequently jump between too many resources

The platform solves this by turning the source material itself into a structured interactive learning environment.

---

# 3. Core Product Promise

> Upload what you want to learn. Get a personalized course that teaches it through reading, explanation, visualization, practice, coding, projects, and assessment.

The generated course should answer six questions for every important concept:

1. **What is it?**
2. **Why does it matter?**
3. **How does it work?**
4. **What does it look like visually or in data?**
5. **How do I use or implement it?**
6. **Can I solve something with it independently?**

---

# 4. Target Users

## Primary Users

### Computer Science Students
Learners studying:

- Algorithms
- Data structures
- Operating systems
- Compilers
- Computer architecture
- Networks
- Databases
- Software engineering
- Programming languages

### AI / ML Learners
Learners studying:

- Machine learning
- Deep learning
- Reinforcement learning
- NLP
- Computer vision
- Generative AI
- LLMs
- Agents
- Optimization
- Probability
- Linear algebra for ML

### Self-Taught Programmers
Learners using:

- Programming books
- Documentation
- PDFs
- Online notes
- Technical manuals

## Secondary Users

### Domain Learners Who Want Computational Skills

The source material may come from another technical field:

- Engineering
- Finance
- Economics
- Physics
- Biology
- Motorsport
- Robotics
- Statistics
- Operations research

The platform should identify the natural computational skills associated with the field and create a course that combines domain knowledge with programming, data analysis, simulation, optimization, or ML where appropriate.

Example:

**Race engineering textbook**

may become:

- Vehicle dynamics
- Telemetry analysis
- Python
- Data processing
- Simulation
- Optimization
- Strategy modelling
- ML applications

The platform should never force AI or programming into material where it does not naturally belong.

---

# 5. Input Sources

Initial supported inputs:

- PDF textbooks
- Course notes
- Lecture slides exported as PDF
- Technical handbooks
- Research notes
- Technical documentation exported as PDF

Future supported sources:

- Multiple PDFs
- Lecture notes + textbook combined
- Research papers
- Documentation websites
- GitHub repositories
- Syllabi
- Problem sheets
- Course assignments
- Markdown files
- EPUB books

---

# 6. Course Generation Pipeline

The system should not treat a PDF as a single block of text.

It should convert the source into a structured educational representation.

## Pipeline

```text
Source Material
      ↓
Document Parsing
      ↓
Section / Chapter Detection
      ↓
Concept Extraction
      ↓
Prerequisite Detection
      ↓
Concept Graph
      ↓
Course Structure
      ↓
Lesson Generation
      ↓
Practice Generation
      ↓
Project Generation
      ↓
Assessment Generation
      ↓
Adaptive Learner Model
```

---

# 7. Source Grounding

Every generated lesson must remain connected to the original source.

The platform should clearly separate:

- **Original source material**
- **AI explanation**
- **AI-generated examples**
- **AI-generated visualizations**
- **AI-generated practice**

The learner should always be able to see where a lesson came from.

## Source Mapping

Each lesson should include:

- Original chapter
- Original section
- Relevant page range
- Relevant passage or extracted reading
- Source references for equations, definitions, and concepts

Example:

```text
Source:
Chapter 4 — Vehicle Speed
Pages 112–118

Original Reading
────────────────
[Relevant textbook passage]

Simplified Explanation
──────────────────────
[AI explanation]

Visual Intuition
────────────────
[Interactive graph / animation]

Practice
────────────────
[Generated exercises]
```

The learner should never feel like the AI is inventing a separate course unrelated to the book.

## Premium Course Quality Standard

Generated teaching should aim to feel comparable to a polished paid course platform rather than an AI response pasted into a webpage.

This means:

- Topics may span multiple pages or checkpoints
- Difficult concepts should be revisited from multiple angles
- Explanations should use multiple examples when necessary
- Visual intuition should precede formalism when helpful
- Practice should be integrated throughout the topic, not only placed at the end
- Learners should frequently predict, answer, manipulate, code, or explain
- Lessons should avoid long uninterrupted walls of text
- Concepts should be revisited later through spaced repetition and application
- Exercises should increase in difficulty gradually
- Projects should build on concepts learned earlier
- Every course should feel intentionally designed rather than automatically generated

The standard should be:

> Thorough enough to replace a strong paid course, but paced and presented clearly enough that it never feels overwhelming.

---

# 8. Course Structure

Each generated course should be split into:

- Modules
- Lessons
- Concepts
- Practice sets
- Projects
- Assessments

Example:

```text
Course
│
├── Module 1
│   ├── Lesson 1
│   ├── Lesson 2
│   ├── Practice
│   └── Mini Assessment
│
├── Module 2
│   ├── Lesson 1
│   ├── Lesson 2
│   ├── Guided Project
│   └── Assessment
│
└── Final Module
    ├── Integration Lessons
    ├── Independent Project
    └── Final Assessment
```

---

# 9. Lesson Experience

Each lesson should use a consistent learning loop, but the experience should never feel like one giant AI-generated page.

A single topic may be split across several short screens, steps, or checkpoints so the learner can move through the material comfortably.

The platform should prioritize:

- Short, focused learning steps
- Clear visual hierarchy
- One main idea at a time
- Multiple checkpoints within larger topics
- Smooth transitions between reading, explanation, visualization, practice, and coding
- Enough depth to fully teach the topic without overwhelming the learner

A topic should take as many steps as necessary to teach properly.

The goal is not to minimize lesson length.

The goal is to make every step feel easy to follow while still being thorough enough to match the quality of a strong paid learning platform.

## Recommended Learning Loop

```text
Read
  ↓
Understand
  ↓
Visualize
  ↓
Predict
  ↓
Practice
  ↓
Implement
  ↓
Debug
  ↓
Apply
  ↓
Recall
```

Not every lesson requires every step, but the system should use the appropriate combination.

---

# 10. Reading Experience

The original source should remain part of the experience.

The learner should be able to:

- Read the relevant original section
- Highlight text
- View key definitions
- View equations
- Jump to original page
- Compare original text with simplified explanation
- Ask the tutor about a specific paragraph
- Mark passages as confusing
- Save important sections

The platform should avoid replacing the original book completely.

Instead, it should make the original material easier to understand.

---

# 11. Teaching and Explanations

Generated explanations should prioritize:

- Simplicity
- Intuition
- Correctness
- Progressive depth
- Real examples
- Minimal unnecessary jargon
- Completeness
- Strong pedagogy
- Clear pacing
- Adaptation to the learner's preferred level

The learner should be able to control how deeply and technically the platform explains material.

## Adjustable Teaching Depth

The course should include an adjustable explanation-depth setting.

Suggested levels:

### Level 1 — Explain Like I'm 5
Use extremely simple language, analogies, intuition, minimal notation, and small examples.

The learner should be able to understand the idea even with almost no prior background.

### Level 2 — Beginner
Explain the concept simply but include correct terminology, basic formulas, and introductory examples.

### Level 3 — Standard
Teach at the level of a strong university course or high-quality paid learning platform.

This should be the default for many learners.

### Level 4 — Advanced
Use more formal terminology, derivations, deeper theory, edge cases, and implementation details.

### Level 5 — Expert / Beyond the Book
Teach at the level of the source material or deeper when useful.

This may include:

- More rigorous mathematics
- Alternative formulations
- Research or industry context
- More advanced implementations
- Limitations and tradeoffs
- Connections to related concepts
- Material beyond the uploaded source when clearly marked as supplemental

The learner should be able to change this setting at any time without regenerating the entire course.

The same concept may therefore be re-explained differently depending on the selected depth.

## Explanation Levels

The system may progressively explain the same idea at different depths:

### Level 1 — Intuition
Explain the idea in plain language.

### Level 2 — Mechanism
Explain how it works.

### Level 3 — Mathematical / Technical Detail
Show formulas, algorithms, architecture, or implementation details.

### Level 4 — Application
Show where it is used.

### Level 5 — Industry Context
Explain how professionals use the concept.

The learner should be able to ask:

- Explain this more simply
- Give me another example
- Show me visually
- Show me mathematically
- Show me in code
- Show me where this is used in industry

---

# 12. Visual Learning

Visual teaching should be a core feature rather than decoration.

The platform should choose the easiest visual representation for the concept.

Possible formats:

- Animated diagrams
- Graphs
- Interactive plots
- Timelines
- Trees
- Graph traversal animations
- Memory diagrams
- Tensor diagrams
- Neural network visualizations
- Loss landscapes
- Data distributions
- Vector visualizations
- Geometry
- State machines
- Flow diagrams
- System architecture diagrams
- Simulation controls
- Step-by-step algorithm execution

## Example

For binary search:

- Show the array visually
- Highlight midpoint
- Animate discarded half
- Let learner choose next step

For gradient descent:

- Show loss curve
- Show optimization path
- Allow changing learning rate
- Animate convergence or divergence

For neural networks:

- Show activations
- Show weights
- Show forward pass
- Show backpropagation
- Allow learner to manipulate values

For race telemetry:

- Plot speed
- Plot throttle
- Plot brake pressure
- Highlight braking zones
- Compare laps interactively

---

# 13. Visual Component System

Instead of generating arbitrary UI each time, the platform should eventually maintain a library of reusable interactive primitives.

Possible components:

```text
ArrayVisualizer
LinkedListVisualizer
TreeVisualizer
GraphVisualizer
AlgorithmTracer
MemoryVisualizer
StackVisualizer
QueueVisualizer

FunctionPlot
DistributionPlot
VectorField
GeometryCanvas
Timeline
StateMachine
FlowDiagram

NeuralNetworkVisualizer
TensorVisualizer
LossSurfaceExplorer
OptimizationVisualizer
ModelTrainingVisualizer

DataTable
TelemetryPlot
SignalVisualizer
SimulationCanvas
```

The AI selects and configures the correct component.

Future versions may allow AI-generated sandboxed visual components when no existing primitive fits.

---

# 14. Practice System

Practice should be highly relevant to:

- The original source
- The current lesson
- The learner's level
- The target field
- Real-world use

Practice should not consist only of multiple-choice questions.

## Exercise Types

### Concept Checks
- Multiple choice
- True / false
- Short answer
- Explain in your own words

### Prediction Questions
Ask the learner what will happen before running an example.

### Calculation Problems
Relevant mathematical problems.

### Code Completion
Fill in missing code.

### Coding Exercises
Implement functions or algorithms.

### Debugging Exercises
Fix broken code.

### Code Tracing
Predict program output or execution path.

### Data Analysis
Analyze datasets.

### Interpretation
Explain graphs, outputs, telemetry, or model behavior.

### Design Questions
Choose architecture or algorithm.

### Open-Ended Challenges
Solve a problem without scaffolding.

---

# 15. Progressive Difficulty

Practice should increase gradually.

Example progression:

```text
Level 1 — Recognize
"What does this function do?"

Level 2 — Predict
"What will happen if this value changes?"

Level 3 — Modify
"Change this implementation."

Level 4 — Implement
"Write the missing function."

Level 5 — Debug
"Find the issue in this implementation."

Level 6 — Apply
"Use this concept in a new problem."

Level 7 — Integrate
"Combine several concepts."

Level 8 — Build
"Create a real project."
```

Difficulty should adapt based on learner performance.

---

# 16. In-House Coding Environment

The platform should provide a built-in code editor and execution environment.

## Initial Stack

### Editor
- Monaco Editor

### Python Execution
- Pyodide
- Web Worker isolation

### Features
- Syntax highlighting
- Run code
- Submit code
- Test output
- Error messages
- Hidden tests
- Visible tests
- Reset solution
- Starter code
- Multiple attempts
- Hints

Future capabilities:

- Multiple files
- Terminal
- C++
- Java
- JavaScript
- Rust
- SQL
- Cloud sandboxes
- Persistent workspaces
- GPU execution
- PyTorch projects

---

# 17. Code Evaluation

Code correctness should not rely entirely on an LLM.

The system should use:

- Unit tests
- Hidden tests
- Edge cases
- Output validation
- Performance constraints when relevant

The AI tutor should explain failure, but deterministic tests should determine correctness when possible.

Example:

```text
✓ Basic case
✓ Empty input
✓ Duplicate values
✗ Large input
```

The tutor may then explain:

> Your solution is correct for small inputs, but the current implementation is O(n²). Try thinking about whether repeated scanning is necessary.

---

# 18. AI Tutor

The tutor is a core feature.

It should understand:

- Current course
- Original PDF
- Current lesson
- Learner's progress
- Learner's previous attempts
- Current code
- Test failures
- Known weak concepts
- Prerequisites
- Project state

## Tutor Principles

The tutor should:

- Teach instead of immediately solving
- Give progressive hints
- Ask guiding questions
- Explain concepts simply
- Reference the source material
- Point the learner to relevant reading
- Understand learner mistakes
- Adapt explanation style
- Help debug code
- Help connect theory to implementation

## Hint Ladder

Example:

### Hint 1
Conceptual nudge.

### Hint 2
Point toward the relevant part of the approach.

### Hint 3
Point toward the relevant code section.

### Hint 4
Show pseudocode or partial implementation.

### Final Help
Reveal full explanation only when necessary.

---

# 19. Assessment System

Assessment should measure actual understanding, not only completion.

## Assessment Types

### Lesson Checks
Short checks after concepts.

### Module Assessments
Mix of:

- Theory
- Coding
- Debugging
- Interpretation
- Application

### Practical Assessments
Build or analyze something.

### Final Assessment
Comprehensive evaluation across the course.

Assessment should include:

- Unseen problems
- Integration of multiple concepts
- Limited scaffolding
- Realistic tasks

---

# 20. Learner Mastery Model

The platform should track mastery by concept.

Example:

```text
Binary Search         92%
Recursion             78%
Dynamic Programming   61%
Graph Traversal       84%
Complexity Analysis   55%
```

Mastery should be influenced by:

- Practice accuracy
- Difficulty
- Number of attempts
- Hint usage
- Time since last practice
- Assessment performance
- Project performance

The system should identify:

- Strong concepts
- Weak concepts
- Forgotten concepts
- Missing prerequisites

---

# 21. Adaptive Learning

The platform should adapt the course based on the learner.

If the learner struggles with a concept because of missing prerequisites, the platform should insert remediation.

Example:

```text
Current Topic:
Gradient Descent

Missing Prerequisite:
Partial Derivatives

Generated Detour:
20-minute calculus refresher

Then return to:
Gradient Descent
```

Different learners may get different course paths from the same book.

---

# 22. Tutor Assessments

The tutor should periodically evaluate whether the learner can explain a concept without assistance.

Possible format:

> Explain why binary search requires a sorted collection.

The tutor assesses:

- Correctness
- Completeness
- Misconceptions
- Clarity

It should then either:

- Mark concept as understood
- Ask a follow-up
- Give a corrective explanation
- Schedule more practice

---

# 23. Guided Projects

Courses should include tutorial-style projects.

These are structured projects where the learner is taught how to build something step by step.

Each guided project should:

- Use concepts already taught
- Relate directly to the source material
- Produce something real
- Teach project structure
- Include milestones
- Include tests
- Include explanation
- Include debugging moments

Example for machine learning:

```text
Guided Project:
Build Logistic Regression From Scratch

1. Load dataset
2. Normalize features
3. Implement sigmoid
4. Implement loss
5. Compute gradients
6. Train model
7. Visualize decision boundary
8. Evaluate accuracy
```

---

# 24. Independent Projects

The learner should also complete projects with much less guidance.

These should validate whether knowledge can transfer beyond a tutorial.

Example:

```text
Independent Project:
Build a Spam Classifier

Requirements:
- Choose preprocessing method
- Implement training pipeline
- Evaluate model
- Explain metrics
- Analyze failure cases
```

The system provides:

- Requirements
- Dataset
- Constraints
- Evaluation criteria

But not step-by-step instructions.

The tutor may provide hints if requested.

---

# 25. Industry-Relevant Projects

Projects should not be random toy exercises when a real-world equivalent exists.

The system should attempt to understand:

- What industry uses the concept
- What professionals build with it
- What type of tasks appear in internships and entry-level roles

Examples:

## Algorithms
Instead of only implementing a graph traversal:

- Build route finding
- Dependency resolution
- Social graph analysis

## Machine Learning
Instead of only classifying MNIST:

- Forecasting
- Recommendation
- Fraud detection
- Anomaly detection
- Ranking

## Finance
- Portfolio backtester
- Risk analysis
- Factor modelling
- Time-series analysis

## Motorsport
- Telemetry analyzer
- Tyre degradation model
- Pit strategy simulator
- Lap-time model

## Systems
- Memory allocator
- Shell
- Cache simulator
- Scheduler

---

# 26. Project Progression

Courses should contain a hierarchy of projects.

```text
Micro Exercise
      ↓
Mini Project
      ↓
Guided Project
      ↓
Semi-Guided Project
      ↓
Independent Project
      ↓
Capstone
```

This allows the learner to progressively move from following instructions to working independently.

---

# 27. Capstone Project

A complete course should ideally end with a capstone that integrates the major skills learned.

The capstone should:

- Require several course concepts
- Be realistic
- Be portfolio-worthy where possible
- Include clear requirements
- Include evaluation
- Require learner decisions
- Allow multiple valid approaches

The AI tutor should help without taking control of the project.

---

# 28. Course Personalization

Before generating a course, the learner may specify:

- Current experience
- Programming languages known
- Math background
- Goal
- Desired depth / explanation level
- Available time
- Target industry
- Desired pace

Example:

```text
Background:
Computer Science student

Goal:
F1 simulation engineer

Time:
3 × 30 min per week

Depth:
Practical + technical

Programming:
Python, C++
```

The generated course may then prioritize:

- Relevant sections
- Required prerequisites
- Appropriate coding depth
- Industry applications

---

# 29. Course Modes

Potential modes:

### Full Course
Teach most of the source material.

### Exam Mode
Focus on syllabus and likely assessed concepts.

### Career Mode
Focus on concepts relevant to a target role.

### Project Mode
Teach only what is needed to build a specific project.

### Fast Track
Focus on core concepts.

### Deep Dive
Include theory, derivations, advanced practice, and projects.

---

# 30. UI / UX Design Principles

The interface should be clean, minimal, modern, and calm.

It should not look like a generic AI product.

Avoid:

- Large rounded AI-style cards everywhere
- Excessive gradients
- Dense dashboards
- Too many boxes on one screen
- Cluttered sidebars
- Repeated labels and metadata
- Chatbot-first layouts
- Overly decorative elements
- Visual noise
- Information overload

The product should feel closer to a premium learning environment than an AI dashboard.

## Core UI Principles

### Minimal
Only show what the learner needs at the current step.

### Spacious
Use whitespace deliberately.

The interface should feel breathable and never cramped.

### Focused
A learner should always know:

- What they are learning
- What they need to do next
- How far they have progressed

### Progressive Disclosure
Advanced controls, explanations, source details, tutor tools, and extra information should appear only when useful.

### Not Blocky
Avoid turning every piece of information into a card.

Use:

- Typography
- Spacing
- Dividers
- Inline interactions
- Side-by-side layouts
- Full-width learning canvases
- Smooth transitions

rather than stacking rectangular containers.

### Smooth
Transitions between:

- Reading
- Explanation
- Animation
- Practice
- Code
- Assessment

should feel seamless.

Animations should be smooth, purposeful, and subtle.

### Responsive
The learning experience should work well across:

- Desktop
- Laptop
- Tablet

Mobile may initially support reading, review, tutor, and progress, while full coding experiences can remain desktop-first.

## Suggested Learning Layout

A lesson may dynamically switch between layouts.

### Reading Mode

```text
┌──────────────────────────────────────────────┐
│ Lesson title                  Progress 42%   │
│                                              │
│ Original Reading                            │
│                                              │
│ [source content]                            │
│                                              │
│ [Continue]                                  │
└──────────────────────────────────────────────┘
```

### Explain Mode

```text
┌──────────────────────────────────────────────┐
│ Why this matters                            │
│                                              │
│ Clear explanation                           │
│                                              │
│ Interactive visual / graph / animation      │
│                                              │
│ [Try it]                                    │
└──────────────────────────────────────────────┘
```

### Practice Mode

```text
┌──────────────────────────┬───────────────────┐
│ Task                     │ Workspace         │
│                          │                   │
│ Prompt / hints           │ Code / visual    │
│                          │                   │
└──────────────────────────┴───────────────────┘
```

The UI should adapt to the learning activity rather than forcing every lesson into the same rigid page.

---

# 31. Progress and Motivation

The experience should feel rewarding without becoming overly gamified.

Possible features:

- Course progress
- Module completion
- Mastery bars
- Streaks
- XP
- Skill tree
- Concept graph
- Project milestones
- Achievements
- Review queue

Gamification should support learning rather than distract from it.

## Progress Tracker

The learner should always have a lightweight view of progress.

Possible views:

- Overall course completion
- Module completion
- Current lesson progress
- Concept mastery
- Practice accuracy
- Project completion
- Review queue
- Weekly learning activity

Example:

```text
Course Progress      38%
████████░░░░░░░░░░░░

Current Module       72%
██████████████░░░░░░

Mastered Concepts    14 / 31
Projects             2 / 5
```

The progress system should reward mastery rather than simply time spent.

## Achievements

Achievements can make the experience more fun without becoming childish.

Examples:

- First Lesson Completed
- First Coding Challenge Passed
- First Project Completed
- 10 Concepts Mastered
- Debugger — Fix 10 Broken Programs
- No-Hint Win — Solve a Hard Exercise Without Hints
- Perfect Module Assessment
- 7-Day Learning Streak
- First Independent Project
- Course Completed
- Mastery 90%+

Domain-specific achievements may also be generated.

Example for an ML course:

- Gradient Descent Mastered
- First Neural Network
- Overfitting Detective
- Model Debugger

Example for algorithms:

- Binary Search Speedrun
- Graph Explorer
- Dynamic Programming Survivor

## Skill Tree

A learner may optionally view the course as a skill tree or concept graph.

Completed concepts unlock connected concepts.

This gives a visual sense of progression without forcing gamification into the lesson itself.

## XP and Levels

Optional XP can reward:

- Completing lessons
- Solving harder exercises
- Passing without hints
- Reviewing old concepts
- Completing projects
- Improving assessment scores

XP should never replace mastery as the actual learning metric.

## Streaks

Streaks can encourage consistency but should remain low-pressure.

Missing a day should not make the learner feel punished or cause significant progress loss.

The platform should optimize for returning to learning, not compulsive usage.

---

# 32. Spaced Repetition

Important concepts should reappear over time.

Examples:

- Old concept appears inside a new coding exercise
- Short review problem after several days
- Mixed-topic assessment
- Previous prerequisite used in a project

The goal is long-term retention rather than immediate completion.

---

# 33. Knowledge Graph

Each course should eventually contain a concept graph.

Example:

```text
Arrays
  ↓
Searching
  ↓
Binary Search
  ↓
Divide and Conquer
  ↓
Complexity Analysis
```

For ML:

```text
Linear Algebra
      ↓
Linear Models
      ↓
Loss Functions
      ↓
Optimization
      ↓
Neural Networks
      ↓
Backpropagation
```

The graph supports:

- Prerequisite inference
- Course sequencing
- Adaptive remediation
- Mastery tracking
- Course personalization

---

# 34. Cross-Domain Computational Learning

A major long-term capability is turning non-CS material into computational learning.

The system should identify:

1. Domain concepts
2. Mathematical requirements
3. Relevant computational methods
4. Data requirements
5. Algorithms
6. Simulation opportunities
7. AI / ML opportunities where natural
8. Industry projects

Example:

```text
Engineering Book
      ↓
Physics
      ↓
Numerical Methods
      ↓
Python
      ↓
Simulation
      ↓
Data Analysis
      ↓
Optimization
      ↓
ML where appropriate
```

---

# 35. Quality Requirements

Generated content must prioritize:

- Correctness
- Source grounding
- Relevance
- Progressive difficulty
- Clear explanations
- Appropriate prerequisites
- Useful visualizations
- Valid coding tasks
- Valid tests
- Real-world applicability

The system should avoid:

- Hallucinated textbook claims
- Fake citations
- Irrelevant exercises
- Repetitive quizzes
- Giving away solutions too quickly
- Impossible projects
- Exercises testing concepts not yet taught

---

# 36. Evaluation Layer

A serious version of the platform should evaluate its own generated course content.

Possible checks:

### Lesson Validation
- Is the explanation grounded in the source?
- Does it teach the intended concept?
- Does it require unknown prerequisites?

### Exercise Validation
- Is the task solvable?
- Does the solution match the concept?
- Do the tests work?
- Are edge cases covered?

### Difficulty Validation
- Is this harder than the previous exercise?
- Is it appropriate for current mastery?

### Project Validation
- Does the project use taught concepts?
- Is scope realistic?
- Is it relevant to the field?

---

# 37. Initial Technical Architecture

## Frontend
- Next.js
- TypeScript
- React
- Monaco Editor

## Styling / UI
- Tailwind CSS or equivalent
- Smooth motion / animations
- React animation libraries
- Canvas / SVG / D3 where appropriate

## Backend
- Next.js API routes or dedicated backend
- OpenAI API
- Course generation pipeline
- Tutor logic
- Assessment logic

## Database
- Supabase / PostgreSQL

Store:

- Users
- Sources
- Courses
- Modules
- Lessons
- Concepts
- Exercises
- Attempts
- Projects
- Assessments
- Mastery state
- Tutor interactions

## Storage
- Supabase Storage or object storage

Store:

- PDFs
- Generated assets
- Datasets
- Project files

## Code Execution
### V1
- Pyodide
- Web Workers

### Future
- Judge0
- Isolated cloud sandboxes
- GPU execution

---

# 38. AI Responsibilities

The AI layer may handle:

- PDF understanding
- Concept extraction
- Curriculum generation
- Prerequisite inference
- Lesson generation
- Explanation simplification
- Example generation
- Practice generation
- Project generation
- Hint generation
- Tutor interactions
- Open-ended assessment
- Visualization selection
- Learner adaptation

The AI should not be solely responsible for deterministic code correctness.

---

# 39. Recommended AI Architecture

Expose internal functions such as:

```text
parse_source()
extract_concepts()
build_concept_graph()
generate_course()
generate_lesson()
generate_exercise()
generate_project()
generate_assessment()
generate_hint()
evaluate_written_answer()
adapt_course()
```

This makes the AI provider replaceable later.

---

# 40. Initial MVP Scope

The MVP should remain narrow enough to build and test.

## Supported Material
- One PDF
- Technical / CS content

## Supported Languages
- Python only

## Course Content
- Modules
- Lessons
- Source-grounded explanations
- Original reading
- Practice
- Projects
- Assessments

## Learning Features
- Simplified explanation
- Source mapping
- Generated examples
- Basic interactive visuals
- Monaco editor
- Pyodide execution
- Unit tests
- Progressive hints
- Mastery tracking

## Practice
- Concept questions
- Coding
- Debugging
- Output prediction
- Application questions

## Projects
- One guided project
- One independent project

## Tutor
- Context-aware lesson help
- Code debugging
- Progressive hints

---

# 41. MVP Success Criteria

The MVP succeeds if a learner can upload a technical PDF and receive a course that:

1. Has a logical structure
2. Correctly represents the source
3. Is easier to understand than reading the PDF alone
4. Includes useful visual explanations
5. Provides executable coding exercises
6. Progressively increases difficulty
7. Gives helpful hints without immediately solving
8. Includes at least one meaningful guided project
9. Includes at least one meaningful independent project
10. Produces measurable learner progress
11. Feels clean, minimal, and uncluttered
12. Does not feel like a generic AI-generated interface
13. Supports explanation depth from ELI5 to expert
14. Splits complex topics into multiple well-paced checkpoints when needed
15. Feels comparable in teaching quality to a strong paid course platform

The most important internal test:

> Would a learner choose this course over reading the PDF, opening an IDE separately, searching for exercises, and asking an AI assistant in another tab?

---

# 42. Long-Term Product Direction

The long-term product evolves from:

> PDF → generated course

into:

> Knowledge → personalized mastery path

Potential future inputs:

```text
Textbook
Lecture Notes
Slides
Documentation
Research Papers
GitHub Repository
Syllabus
Assignments
```

These combine into:

```text
Knowledge Graph
      ↓
Learner Model
      ↓
Adaptive Curriculum
      ↓
Interactive Learning Environment
```

The final product becomes an AI-native learning system capable of teaching computational skills from almost any technical knowledge source.

---

# 43. Product Identity

The project should not be positioned merely as:

> "Chat with your PDF"

or:

> "AI PDF course generator"

The stronger identity is:

> **An AI-native interactive learning environment that turns technical knowledge into hands-on mastery.**

Possible product statement:

> **Upload what you want to learn. We turn it into a personalized course where you read, visualize, code, experiment, debug, build, and prove you understand it.**

Alternative:

> **Learn any technical field by actually building with it.**

---

# 44. Guiding Product Principles

1. **The source remains the source of truth.**
2. **Understanding comes before memorization.**
3. **Visualize whenever visualization improves intuition.**
4. **Practice must test the concept that was actually taught.**
5. **Difficulty should increase progressively.**
6. **Coding should be executed, not merely discussed.**
7. **Projects should reflect real applications.**
8. **The tutor should guide before revealing.**
9. **Assessment should measure transfer, not recall alone.**
10. **Learning should become more independent over time.**
11. **AI should adapt the course to the learner.**
12. **The platform should reduce learning friction, not create another workload.**

---

# 45. North-Star Experience

A learner uploads a difficult technical book.

Instead of seeing:

> 600 pages remaining

they see:

```text
Course Generated

Estimated pace:
3 × 30 minutes/week

Module 1
✓ Introduction
✓ Core Concepts
○ Interactive Lesson
○ Coding Exercise

Your mastery:
███████░░░ 72%

Next:
27-minute lesson
```

They open a lesson.

They can:

- Read the original material
- See a simple explanation
- Watch or manipulate a visualization
- Answer a prediction question
- Write code
- Run tests
- Debug mistakes
- Ask the tutor
- Complete practice
- Build a project
- Demonstrate mastery

At the end, they have not merely "finished a book."

They can actually use what the book taught.

---

# 46. Immediate Build Goal

The first complete prototype should prove one workflow:

> Upload one CS / ML PDF chapter and turn it into a genuinely useful interactive lesson with source-grounded teaching, one visualization, progressive practice, executable Python, tutor hints, assessment, and a small project.

Once that loop is excellent, scale it from:

```text
1 lesson
→ 1 chapter
→ 1 book
→ multiple source types
→ multiple computational domains
```

The project should optimize for quality of learning before breadth of supported content.