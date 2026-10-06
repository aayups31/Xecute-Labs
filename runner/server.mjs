import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
const files = {
  "/": ["index.html", "text/html"],
  "/bridge.js": ["bridge.js", "text/javascript"],
  "/worker.js": ["worker.js", "text/javascript"],
  ...Object.fromEntries(
    [
      "pyodide.js",
      "pyodide.asm.js",
      "pyodide.asm.wasm",
      "python_stdlib.zip",
      "pyodide-lock.json",
    ].map((name) => [
      "/runtime/" + name,
      [
        "../node_modules/pyodide/" + name,
        name.endsWith(".js")
          ? "text/javascript"
          : name.endsWith(".wasm")
            ? "application/wasm"
            : "application/octet-stream",
      ],
    ]),
  ),
};
createServer(async (req, res) => {
  const path = new URL(req.url, "http://127.0.0.1:3001").pathname;
  if (!files[path] || req.method !== "GET") {
    res.writeHead(404);
    res.end();
    return;
  }
  try {
    const [file, mime] = files[path];
    const content = await readFile(
      fileURLToPath(new URL(file, import.meta.url)),
    );
    res.writeHead(200, {
      "Content-Type": mime,
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "no-referrer",
      "Content-Security-Policy":
        "default-src 'none'; script-src 'self' 'wasm-unsafe-eval'; worker-src 'self'; connect-src 'self'; frame-ancestors http://127.0.0.1:3000; base-uri 'none'; form-action 'none'",
    });
    res.end(content);
  } catch {
    res.writeHead(500);
    res.end("Runtime file unavailable. Run npm ci.");
  }
}).listen(3001, "127.0.0.1", () =>
  console.log("Isolated Python runner: http://127.0.0.1:3001"),
);
