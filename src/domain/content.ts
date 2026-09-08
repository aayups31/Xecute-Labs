import { z } from "zod";

const checkSchema = z.object({
  id: z.string(),
  concept: z.string(),
  prompt: z.string(),
  options: z.array(z.string()).min(2),
  answer: z.number().int().nonnegative(),
  explanation: z.string(),
});
export const lessonSchema = z
  .object({
    schemaVersion: z.literal(1),
    id: z.string(),
    revision: z.number().int().positive(),
    subject: z.string(),
    title: z.string(),
    subtitle: z.string(),
    duration: z.string(),
    objective: z.string(),
    prerequisites: z.array(z.string()),
    provenance: z.literal("authored_sample"),
    sourceNote: z.string(),
    introduction: z.string(),
    insight: z.string(),
    visual: z.discriminatedUnion("kind", [
      z.object({
        kind: z.literal("sampled-series"),
        times: z.array(z.number()),
        values: z.array(z.number()),
        xLabel: z.string(),
        yLabel: z.string(),
      }),
      z.object({
        kind: z.literal("binary-search"),
        values: z.array(z.number()),
        target: z.number(),
      }),
    ]),
    prediction: checkSchema,
    checks: z.array(checkSchema),
    exercise: z.object({
      prompt: z.string(),
      starter: z.string(),
      hints: z.array(z.string()),
      tests: z.string(),
    }),
  })
  .superRefine((lesson, ctx) => {
    for (const check of [lesson.prediction, ...lesson.checks]) {
      if (check.answer >= check.options.length)
        ctx.addIssue({ code: "custom", message: "Answer outside options" });
    }
    if (
      lesson.visual.kind === "sampled-series" &&
      (lesson.visual.times.length !== lesson.visual.values.length ||
        lesson.visual.times.length < 2 ||
        lesson.visual.times.some((t, i, a) => i > 0 && t <= a[i - 1]))
    )
      ctx.addIssue({
        code: "custom",
        message: "Series requires paired samples and strictly increasing times",
      });
    if (
      lesson.visual.kind === "binary-search" &&
      lesson.visual.values.some((n, i, a) => i > 0 && n <= a[i - 1])
    )
      ctx.addIssue({
        code: "custom",
        message: "Search sample must be strictly sorted",
      });
  });
export type Lesson = z.infer<typeof lessonSchema>;
export type Check = z.infer<typeof checkSchema>;

export const lessons: Lesson[] = [
  lessonSchema.parse({
    schemaVersion: 1,
    id: "sampled-motion",
    revision: 1,
    subject: "Data & physical systems",
    title: "From speed to distance",
    subtitle: "Read a signal. Build a model. Test your assumptions.",
    duration: "20–30 min",
    objective:
      "Estimate distance from unevenly sampled speed data and explain the interpolation assumption.",
    prerequisites: ["Speed and distance units", "Python lists and loops"],
    provenance: "authored_sample",
    sourceNote:
      "Original Xecute teaching fixture using synthetic data. This lesson is not extracted from, or certified against, your uploaded book. Values describe an illustrative motion trace, not a measured racecar.",
    introduction:
      "A sensor records speed at a handful of moments. Your task is to reconstruct how far something travelled between them. The catch: the samples are not evenly spaced.",
    insight:
      "Distance is the area under a speed–time curve. Join adjacent samples with straight lines and each interval becomes a trapezoid. Its area is the average of the two speeds multiplied by elapsed time. This estimates the real distance; it is exact only for the assumed piecewise-linear speed.",
    visual: {
      kind: "sampled-series",
      times: [0, 1, 3, 4, 6],
      values: [0, 10, 20, 20, 0],
      xLabel: "Time (s)",
      yLabel: "Speed (m/s)",
    },
    prediction: {
      id: "motion-predict",
      concept: "integration",
      prompt: "Which interval contributes more distance?",
      options: ["0–1 seconds", "1–3 seconds", "They contribute equally"],
      answer: 1,
      explanation:
        "The 1–3 s interval lasts longer and has a higher average speed: 15 m/s × 2 s = 30 m, compared with 5 m in the first interval.",
    },
    checks: [
      {
        id: "motion-units",
        concept: "units",
        prompt: "A constant speed of 36 km/h is how many metres per second?",
        options: ["10 m/s", "36 m/s", "129.6 m/s"],
        answer: 0,
        explanation: "Divide by 3.6: 36 × 1000 / 3600 = 10 m/s.",
      },
      {
        id: "motion-units-2",
        concept: "units",
        prompt:
          "Speed is in m/s and elapsed time is in milliseconds. Before multiplying, what must you do?",
        options: [
          "Multiply elapsed time by 1000",
          "Divide elapsed time by 1000",
          "Nothing",
        ],
        answer: 1,
        explanation: "Convert milliseconds into seconds by dividing by 1000.",
      },
      {
        id: "motion-area",
        concept: "integration",
        prompt:
          "Speed rises linearly from 4 to 8 m/s over 3 seconds. What distance is covered?",
        options: ["12 m", "18 m", "24 m"],
        answer: 1,
        explanation: "The mean speed is 6 m/s. Over 3 s that is 18 m.",
      },
      {
        id: "motion-area-2",
        concept: "integration",
        prompt:
          "Can the sampled values alone tell you the exact motion between samples?",
        options: [
          "Yes, always",
          "Only if samples are one second apart",
          "No; interpolation adds an assumption",
        ],
        answer: 2,
        explanation:
          "Multiple curves can pass through the same samples and enclose different areas.",
      },
    ],
    exercise: {
      prompt:
        "Implement distance(times, speeds). Use each interval’s actual duration. Reject mismatched lengths, fewer than two samples, and non-increasing timestamps with ValueError.",
      starter:
        "def distance(times, speeds):\n    # Estimate area using adjacent samples.\n    # Validate lengths and timestamp order.\n    total = 0.0\n    return total\n\nprint(distance([0, 1, 3], [0, 10, 20]))",
      hints: [
        "Work with pairs: sample i−1 and sample i.",
        "Each contribution is (speeds[i−1] + speeds[i]) / 2 × (times[i] − times[i−1]).",
        "Check lengths first, then reject every interval whose elapsed time is zero or negative.",
      ],
      tests:
        '\nassert abs(distance([0, 1, 3], [0, 10, 20]) - 35) < 1e-8, "Uneven intervals should give 35 m"\nassert abs(distance([0, 2, 5], [4, 4, 4]) - 20) < 1e-8, "Constant speed should give 20 m"\nassert abs(distance([0, 1, 3, 4, 6], [0, 10, 20, 20, 0]) - 75) < 1e-8, "Full trace should give 75 m"\nfor t, v in [([0], [1]), ([0, 0], [1, 2]), ([2, 1], [1, 2]), ([0, 1], [1])]:\n    try:\n        distance(t, v)\n    except ValueError:\n        pass\n    else:\n        raise AssertionError("Invalid samples must raise ValueError")\nprint("CHECKS PASSED: examples and invalid-input cases")',
    },
  }),
  lessonSchema.parse({
    schemaVersion: 1,
    id: "binary-search",
    revision: 1,
    subject: "Algorithms & reasoning",
    title: "Make the search space smaller",
    subtitle: "Follow an invariant, not a memorized recipe.",
    duration: "20–30 min",
    objective:
      "Implement binary search on sorted distinct values and explain why each step preserves the possible answer.",
    prerequisites: ["Python functions", "Indexing and comparisons"],
    provenance: "authored_sample",
    sourceNote:
      "Original Xecute teaching fixture. The sorted array, questions and exercises are authored examples independent of the telemetry sample.",
    introduction:
      "You need to find a value in a sorted array. Looking at the middle gives you more than a comparison: it tells you which half cannot possibly contain the answer.",
    insight:
      "Maintain an inclusive interval [low, high]. If the target exists, it must be inside that interval. A midpoint comparison excludes the midpoint and one side. The interval must shrink after every unsuccessful comparison; stop when low exceeds high.",
    visual: {
      kind: "binary-search",
      values: [3, 7, 12, 18, 25, 31, 42, 56, 70],
      target: 42,
    },
    prediction: {
      id: "search-predict",
      concept: "invariants",
      prompt:
        "The middle value is 25 and the target is 42. What can you discard?",
      options: [
        "25 and everything to its left",
        "Everything to the right of 25",
        "Only the first value",
      ],
      answer: 0,
      explanation:
        "In a sorted array, every value at or left of 25 is smaller than 42. None can be the target.",
    },
    checks: [
      {
        id: "search-order",
        concept: "invariants",
        prompt:
          "Can this binary-search algorithm safely search an unsorted array?",
        options: [
          "Yes, if the target is present",
          "No, the elimination rule relies on order",
          "Yes, if the array is short",
        ],
        answer: 1,
        explanation:
          "Without sorted order, a midpoint comparison does not justify discarding either side.",
      },
      {
        id: "search-boundary",
        concept: "invariants",
        prompt:
          "With inclusive bounds, the target is greater than values[mid]. Which update guarantees progress?",
        options: ["low = mid", "high = mid − 1", "low = mid + 1"],
        answer: 2,
        explanation:
          "The midpoint has already been ruled out. Keeping it can prevent progress on a small interval.",
      },
      {
        id: "search-empty",
        concept: "boundaries",
        prompt: "When low > high, what does the interval contain?",
        options: ["No candidates", "One candidate", "The whole array"],
        answer: 0,
        explanation:
          "The inclusive interval is empty, so the target is absent.",
      },
      {
        id: "search-single",
        concept: "boundaries",
        prompt:
          "When low == high, should an inclusive-bound search still compare that value?",
        options: ["No", "Yes"],
        answer: 1,
        explanation:
          "One candidate remains and has not necessarily been tested.",
      },
    ],
    exercise: {
      prompt:
        "Implement find(values, target). Return its index or −1 if absent. Assume values are sorted and distinct. Handle empty and single-item arrays.",
      starter:
        "def find(values, target):\n    low, high = 0, len(values) - 1\n    # Keep narrowing the possible interval.\n    return -1\n\nprint(find([3, 7, 12, 18, 25], 18))",
      hints: [
        "Use while low <= high for inclusive bounds.",
        "Compute mid = (low + high) // 2 and compare values[mid] to target.",
        "After ruling out the midpoint, use low = mid + 1 or high = mid - 1. Return -1 only after the loop.",
      ],
      tests:
        '\nfor values, target, expected in [([], 1, -1), ([7], 7, 0), ([7], 3, -1), ([1, 4], 4, 1), ([1, 4], 2, -1), ([3, 7, 12, 18, 25], 18, 3), ([3, 7, 12, 18, 25], 3, 0), ([3, 7, 12, 18, 25], 25, 4)]:\n    assert find(values, target) == expected, f"Failed values={values}, target={target}"\nprint("CHECKS PASSED: present, absent and boundary cases")',
    },
  }),
];
