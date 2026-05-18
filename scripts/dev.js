/* eslint-env node */
import { spawn } from "child_process";
import http from "http";
import path from "path";
import process from "process";

const isWindows = process.platform === "win32";
const apiPort = process.env.PORT || "4000";
const viteBin = path.join(
  process.cwd(),
  "node_modules",
  ".bin",
  isWindows ? "vite.cmd" : "vite",
);

function checkBackend() {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:${apiPort}/api/health`, (res) => {
      res.resume();
      resolve(res.statusCode === 200);
    });

    req.on("error", () => resolve(false));
    req.setTimeout(1000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

const processes = [];

function start(command, args, options = {}) {
  const child = spawn(command, args, {
    cwd: process.cwd(),
    stdio: "inherit",
    ...options,
  });

  processes.push(child);
  return child;
}

function stopAll() {
  for (const child of processes) {
    if (!child.killed) {
      child.kill();
    }
  }
}

function watch(child) {
  child.on("exit", (code) => {
    if (code && code !== 0) {
      stopAll();
      process.exit(code);
    }
  });
}

if (await checkBackend()) {
  console.log(`API server already running on http://localhost:${apiPort}`);
} else {
  watch(start(process.execPath, ["server.js"]));
}

watch(start(viteBin, [], { shell: isWindows }));

process.on("SIGINT", () => {
  stopAll();
  process.exit(0);
});

process.on("SIGTERM", () => {
  stopAll();
  process.exit(0);
});
