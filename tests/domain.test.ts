import { test } from "node:test";
import assert from "node:assert/strict";
import { lessons, lessonSchema } from "../src/domain/content";
import { assess, searchTrace, trapezoids } from "../src/domain/learning";

test("both subjects use the same validated contract", () => {
  assert.equal(lessons.length, 2);
  for (const lesson of lessons)
    assert.ok(lessonSchema.safeParse(lesson).success);
  assert.equal(
    lessonSchema.safeParse({
      ...lessons[0],
      visual: { ...lessons[0].visual, times: [0, 0] },
    }).success,
    false,
  );
});
test("integration respects uneven intervals and input validation", () => {
  assert.equal(
    trapezoids([0, 1, 3], [0, 10, 20]).reduce((s, p) => s + p.area, 0),
    35,
  );
  assert.equal(
    trapezoids([0, 1, 3, 4, 6], [0, 10, 20, 20, 0]).reduce(
      (s, p) => s + p.area,
      0,
    ),
    75,
  );
  assert.throws(() => trapezoids([0, 0], [1, 2]));
  assert.throws(() => trapezoids([0, 1], [1]));
  assert.throws(() => trapezoids([0, NaN], [1, 2]));
});
test("unknown, assisted and duplicate answers do not grant readiness", () => {
  const checks = lessons[0].checks;
  assert.ok(assess(checks, []).every((r) => r.status === "unassessed"));
  const assisted = checks.map((c) => ({
    itemId: c.id,
    choice: c.answer,
    assisted: true,
  }));
  assert.ok(assess(checks, assisted).every((r) => r.status === "unassessed"));
  const one = {
    itemId: checks[0].id,
    choice: checks[0].answer,
    assisted: false,
  };
  assert.equal(assess(checks, [one, one])[0].status, "unassessed");
  assert.ok(
    assess(
      checks,
      checks.map((c) => ({ itemId: c.id, choice: c.answer, assisted: false })),
    ).every((r) => r.status === "ready to try"),
  );
});
test("search trace terminates and preserves possible target across intervals", () => {
  const values = [3, 7, 12, 18, 25, 31, 42, 56, 70];
  for (const target of [...values, -1, 99, 26]) {
    const trace = searchTrace(values, target);
    assert.ok(trace.length <= 5);
    const expected = values.indexOf(target);
    if (expected >= 0) {
      assert.equal(trace.at(-1)!.mid, expected);
      assert.ok(trace.every((f) => f.low <= expected && f.high >= expected));
    } else assert.equal(trace.at(-1)!.mid, -1);
  }
  assert.equal(searchTrace([], 1)[0].mid, -1);
});
