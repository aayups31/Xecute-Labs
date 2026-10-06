const parentOrigin = "http://127.0.0.1:3000";
let worker, timer, activeId;
function send(data) {
  parent.postMessage({ channel: "xecute-runner", ...data }, parentOrigin);
}
function stop() {
  if (worker) worker.terminate();
  clearTimeout(timer);
  worker = null;
}
addEventListener("message", (event) => {
  if (
    event.source !== parent ||
    event.origin !== parentOrigin ||
    event.data?.channel !== "xecute-runner"
  )
    return;
  const { action, id, code } = event.data;
  if (action === "ping") {
    send({ kind: "ready" });
    return;
  }
  if (action === "stop") {
    stop();
    send({
      id: activeId,
      kind: "stopped",
      text: "Execution stopped. Your code is preserved.",
    });
    return;
  }
  if (
    action !== "run" ||
    typeof code !== "string" ||
    code.length > 30000 ||
    typeof id !== "string"
  )
    return;
  stop();
  activeId = id;
  worker = new Worker("/worker.js");
  worker.onmessage = ({ data }) => {
    if (data.kind === "loaded") {
      clearTimeout(timer);
      timer = setTimeout(() => {
        stop();
        send({
          id,
          kind: "error",
          text: "Execution exceeded 8 seconds. Check for a loop that does not terminate.",
        });
      }, 8000);
    }
    send({ ...data, id });
    if (data.kind === "done" || data.kind === "error") stop();
  };
  worker.onerror = () => {
    stop();
    send({
      id,
      kind: "error",
      text: "Python could not start. Check the runner service and retry.",
    });
  };
  timer = setTimeout(() => {
    stop();
    send({
      id,
      kind: "error",
      text: "Python loading timed out. Retry when runtime files are available.",
    });
  }, 60000);
  worker.postMessage({ code });
});
send({ kind: "ready" });
