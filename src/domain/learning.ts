import type { Check } from "./content";
export type Answer = {
  itemId: string;
  choice: number | null;
  assisted: boolean;
};
export function assess(checks: Check[], answers: Answer[]) {
  return [...new Set(checks.map((c) => c.concept))].map((concept) => {
    const items = checks.filter((c) => c.concept === concept);
    let correct = 0,
      wrong = 0;
    for (const item of items) {
      const answer = answers.find((a) => a.itemId === item.id);
      if (!answer || answer.choice === null || answer.assisted) continue;
      if (answer.choice === item.answer) correct++;
      else wrong++;
    }
    return {
      concept,
      status: wrong
        ? "needs practice"
        : correct >= 2
          ? "ready to try"
          : "unassessed",
      correct,
    };
  });
}
export function trapezoids(times: number[], values: number[]) {
  if (
    times.length < 2 ||
    times.length !== values.length ||
    [...times, ...values].some((n) => !Number.isFinite(n))
  )
    throw new Error("Invalid samples");
  return times.slice(1).map((time, i) => {
    const dt = time - times[i];
    if (dt <= 0) throw new Error("Timestamps must increase");
    return {
      from: times[i],
      to: time,
      mean: (values[i] + values[i + 1]) / 2,
      area: (dt * (values[i] + values[i + 1])) / 2,
    };
  });
}
export function searchTrace(values: number[], target: number) {
  const frames: { low: number; high: number; mid: number; message: string }[] =
    [];
  let low = 0,
    high = values.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    frames.push({
      low,
      high,
      mid,
      message:
        values[mid] === target
          ? `Found ${target} at index ${mid}.`
          : values[mid] < target
            ? `${values[mid]} < ${target}: discard indices ${low} through ${mid}.`
            : `${values[mid]} > ${target}: discard indices ${mid} through ${high}.`,
    });
    if (values[mid] === target) return frames;
    if (values[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  frames.push({
    low,
    high,
    mid: -1,
    message: "The interval is empty. The target is absent.",
  });
  return frames;
}
