import { test, expect } from "@playwright/test";

test("two subjects share navigation, drafts survive reload, unknown does not mean failure", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "From speed to distance" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Check my reasoning", exact: true }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "B 1–3 seconds" }).click();
  await page.getByRole("button", { name: "Check my reasoning" }).click();
  await expect(page.getByText("Your prediction fits.")).toBeVisible();
  await page.getByRole("button", { name: "03 Implement", exact: true }).click();
  await page
    .getByRole("textbox", { name: "Python code" })
    .fill('print("saved draft")');
  await page.reload();
  await expect(page.getByRole("textbox", { name: "Python code" })).toHaveValue(
    'print("saved draft")',
  );
  await page
    .getByRole("button", {
      name: /Algorithms & reasoning Make the search space smaller/,
    })
    .click();
  await expect(
    page.getByRole("heading", { name: "Make the search space smaller" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Find my starting point" }).click();
  await page.getByRole("button", { name: "See my recommendation" }).click();
  await expect(page.getByText("unassessed", { exact: true })).toHaveCount(2);
  await page.getByRole("button", { name: "Explore freely" }).click();
  await page
    .getByRole("button", {
      name: /Data & physical systems From speed to distance/,
    })
    .click();
  await expect(page.getByRole("textbox", { name: "Python code" })).toHaveValue(
    'print("saved draft")',
  );
  await page.getByRole("button", { name: "04 Reflect", exact: true }).click();
  await expect(page.getByText("not assessed", { exact: true })).toBeVisible();
});

test("real Python executes, fails incorrect checks and stops a runaway program", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "03 Implement", exact: true }).click();
  const editor = page.getByRole("textbox", { name: "Python code" });
  await editor.fill("print(6 * 7)");
  await expect(
    page.getByRole("button", { name: "Run code", exact: true }),
  ).toBeEnabled({ timeout: 20000 });
  await page.getByRole("button", { name: "Run code", exact: true }).click();
  await expect(page.locator(".terminal pre")).toContainText("42", {
    timeout: 60000,
  });
  await expect(page.locator(".terminal pre")).toContainText("Finished.");
  await editor.fill("def distance(times, speeds):\n    return 0");
  await page.getByRole("button", { name: "Run checks" }).click();
  await expect(page.locator(".terminal pre")).toContainText("AssertionError", {
    timeout: 60000,
  });
  await editor.fill(
    "def distance(times, speeds):\n    if len(times) != len(speeds) or len(times) < 2:\n        raise ValueError()\n    total = 0\n    for i in range(1, len(times)):\n        dt = times[i] - times[i-1]\n        if dt <= 0:\n            raise ValueError()\n        total += dt * (speeds[i] + speeds[i-1]) / 2\n    return total",
  );
  await page.getByRole("button", { name: "Run checks" }).click();
  await expect(page.locator(".terminal pre")).toContainText("CHECKS PASSED", {
    timeout: 60000,
  });
  await expect(page.locator(".terminal pre")).toContainText("Finished.");
  await editor.fill('print("loop started")\nwhile True:\n    pass');
  await page.getByRole("button", { name: "Run code", exact: true }).click();
  await expect(page.locator(".terminal pre")).toContainText("loop started");
  await page.getByRole("button", { name: "Stop execution" }).click();
  await expect(page.locator(".terminal pre")).toContainText(
    "Execution stopped",
  );
  await expect(editor).toHaveValue(
    'print("loop started")\nwhile True:\n    pass',
  );
  await page.getByRole("button", { name: "Run code", exact: true }).click();
  await expect(page.locator(".terminal pre")).toContainText(
    "Execution exceeded 8 seconds",
    { timeout: 20000 },
  );
});

test("runner serves only allowlisted static files with no external network access", async ({
  request,
}) => {
  const secret = await request.get("http://127.0.0.1:3001/.env");
  expect(secret.status()).toBe(404);
  const worker = await request.get("http://127.0.0.1:3001/worker.js");
  expect(worker.status()).toBe(200);
  expect(worker.headers()["content-security-policy"]).toContain(
    "connect-src 'self'",
  );
  expect(worker.headers()["content-security-policy"]).toContain(
    "frame-ancestors http://127.0.0.1:3000",
  );
});

test("mobile lesson remains navigable without horizontal overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "From speed to distance" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "02 Experiment", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Change it. Explain what follows." }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
