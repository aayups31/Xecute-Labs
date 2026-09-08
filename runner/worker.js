importScripts("/runtime/pyodide.js");
onmessage = async ({ data }) => {
  let outputLength = 0;
  function output(text) {
    if (outputLength >= 12000) return;
    const bounded = String(text).slice(0, 12000 - outputLength);
    outputLength += bounded.length;
    postMessage({ kind: "output", text: bounded });
  }
  try {
    const python = await loadPyodide({
      indexURL: "/runtime/",
      stdout: output,
      stderr: output,
    });
    postMessage({ kind: "loaded" });
    await python.runPythonAsync(data.code);
    if (outputLength >= 12000) output("");
    postMessage({
      kind: "done",
      text:
        outputLength >= 12000
          ? "Finished. Output limited to 12,000 characters."
          : "Finished.",
    });
  } catch (error) {
    postMessage({ kind: "error", text: String(error).slice(-6000) });
  }
};
