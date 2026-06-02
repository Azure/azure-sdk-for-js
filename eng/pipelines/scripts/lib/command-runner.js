const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

function tsPrefix(startMs) {
  const now = new Date();
  const hh = String(now.getUTCHours()).padStart(2, "0");
  const mm = String(now.getUTCMinutes()).padStart(2, "0");
  const ss = String(now.getUTCSeconds()).padStart(2, "0");
  const ms = String(now.getUTCMilliseconds()).padStart(3, "0");
  const elapsedSec = ((Date.now() - startMs) / 1000).toFixed(1).padStart(6, " ");
  return `[${hh}:${mm}:${ss}.${ms}Z +${elapsedSec}s] `;
}

function makeLineStamper(startMs, onLine) {
  let buf = "";
  function flushLine(line) {
    onLine(tsPrefix(startMs) + line + "\n");
  }
  return {
    push(chunk) {
      buf += chunk;
      let idx;
      while ((idx = buf.indexOf("\n")) >= 0) {
        const line = buf.slice(0, idx).replace(/\r$/, "");
        buf = buf.slice(idx + 1);
        flushLine(line);
      }
    },
    end() {
      if (buf.length > 0) {
        flushLine(buf);
        buf = "";
      }
    },
  };
}

function runCommand(cmd, args, cwd) {
  return new Promise((resolve) => {
    const startMs = Date.now();
    let output = "";
    let lastOutputMs = Date.now();
    const proc = spawn(cmd, args, { cwd, shell: true });

    const appendLine = (line) => {
      output += line;
      lastOutputMs = Date.now();
    };
    const stdoutStamper = makeLineStamper(startMs, appendLine);
    const stderrStamper = makeLineStamper(startMs, appendLine);

    output += `${tsPrefix(startMs)}$ ${cmd} ${args.join(" ")}  (cwd=${cwd})\n`;

    const HEARTBEAT_INTERVAL_MS = 30 * 1000;
    let lastResourceSnapshot = null;

    function collectDescendants(rootPid) {
      const all = new Set();
      const stack = [rootPid];
      while (stack.length) {
        const pid = stack.pop();
        if (all.has(pid)) continue;
        all.add(pid);
        let taskDir;
        try {
          taskDir = fs.readdirSync(`/proc/${pid}/task`);
        } catch {
          continue;
        }
        for (const tid of taskDir) {
          let childrenStr;
          try {
            childrenStr = fs.readFileSync(`/proc/${pid}/task/${tid}/children`, "utf8");
          } catch {
            continue;
          }
          for (const c of childrenStr.split(/\s+/)) {
            const n = Number(c);
            if (Number.isInteger(n) && n > 0 && !all.has(n)) stack.push(n);
          }
        }
      }
      return [...all];
    }

    function readPidStat(pid) {
      try {
        const stat = fs.readFileSync(`/proc/${pid}/stat`, "utf8");
        const rparen = stat.lastIndexOf(")");
        const tail = stat.slice(rparen + 2).split(" ");
        const utime = Number(tail[11]);
        const stime = Number(tail[12]);
        return utime + stime;
      } catch {
        return 0;
      }
    }

    function readPidRssKb(pid) {
      try {
        const status = fs.readFileSync(`/proc/${pid}/status`, "utf8");
        const m = status.match(/VmRSS:\s*(\d+)\s*kB/);
        return m ? Number(m[1]) : 0;
      } catch {
        return 0;
      }
    }

    function readProcSnapshot(rootPid) {
      try {
        const pids = collectDescendants(rootPid);
        let totalJiffies = 0;
        let totalRssKb = 0;
        for (const pid of pids) {
          totalJiffies += readPidStat(pid);
          totalRssKb += readPidRssKb(pid);
        }
        const nowMs = Date.now();
        let cpuPct = null;
        if (lastResourceSnapshot) {
          const dJiffies = totalJiffies - lastResourceSnapshot.totalJiffies;
          const dMs = nowMs - lastResourceSnapshot.nowMs;
          const clkTck = 100;
          if (dMs > 0) cpuPct = Math.round((dJiffies * 1000) / (clkTck * dMs) * 100);
        }
        lastResourceSnapshot = { totalJiffies, nowMs };
        return {
          cpuPct,
          rssMB: Math.round(totalRssKb / 1024),
          procCount: pids.length,
        };
      } catch {
        return null;
      }
    }

    const heartbeatTimer = setInterval(() => {
      const silentSec = Math.round((Date.now() - lastOutputMs) / 1000);
      const snap = readProcSnapshot(proc.pid);
      const parts = [`silent ${silentSec}s`];
      if (snap) {
        if (snap.cpuPct !== null) parts.push(`CPU ${snap.cpuPct}%`);
        parts.push(`RSS ${snap.rssMB}MB`);
        parts.push(`procs ${snap.procCount}`);
      }
      output += `${tsPrefix(startMs)}[heartbeat] still running (${parts.join(", ")})\n`;
    }, HEARTBEAT_INTERVAL_MS);

    proc.stdout.on("data", (d) => {
      stdoutStamper.push(d.toString());
    });
    proc.stderr.on("data", (d) => {
      stderrStamper.push(d.toString());
    });
    proc.on("close", (code) => {
      stdoutStamper.end();
      stderrStamper.end();
      clearInterval(heartbeatTimer);
      resolve({ code, output });
    });
    proc.on("error", (err) => {
      stdoutStamper.end();
      stderrStamper.end();
      clearInterval(heartbeatTimer);
      output += `${tsPrefix(startMs)}[runner] spawn error: ${err.message}\n`;
      resolve({ code: 1, output });
    });
  });
}

function extractError(output) {
  const lines = output.split("\n");
  const specMissing = lines.filter((l) => /tspconfig\.yaml not found/.test(l)).slice(0, 1);
  if (specMissing.length > 0) return specMissing[0].trim();

  const compileErrs = lines.filter((l) => /\.tsp:\d+:\d+ - error /.test(l)).slice(0, 3);
  if (compileErrs.length > 0) {
    return compileErrs
      .map((line) => {
        const match = line.match(/- (error .+)$/);
        return match ? match[1].trim() : line.trim();
      })
      .join(" | ");
  }

  const npmErrs = lines.filter((l) => /^npm error/.test(l) && l.trim() !== "npm error").slice(0, 2);
  if (npmErrs.length > 0) return npmErrs.map((l) => l.trim()).join(" | ");

  const gitErrs = lines.filter((l) => /fatal:|git clone failed/.test(l)).slice(0, 2);
  if (gitErrs.length > 0) return gitErrs.map((l) => l.trim()).join(" | ");

  const buildErrs = lines.filter((l) => /Invalid config|warp build threw|does not exist|Cannot find/.test(l)).slice(0, 2);
  if (buildErrs.length > 0) return buildErrs.map((l) => l.trim()).join(" | ");

  const generalErrs = lines.filter((l) => /Failed to generate|Error:/.test(l) && !/tsp-client-config\.yaml/.test(l)).slice(0, 2);
  if (generalErrs.length > 0) return generalErrs.map((l) => l.trim()).join(" | ");

  const lastLines = lines.filter((l) => l.trim().length > 0).slice(-3);
  if (lastLines.length > 0) return lastLines.map((l) => l.trim()).join(" | ");

  return "Unknown error";
}

function safeLogName(pkg) {
  return pkg.replace(/[\\/]/g, "__");
}

function recordPackageLog({ phase, pkg, success, output, resultOutputDir }) {
  if (resultOutputDir) {
    try {
      const logDir = path.join(resultOutputDir, "logs", phase);
      fs.mkdirSync(logDir, { recursive: true });
      const logFile = path.join(logDir, `${safeLogName(pkg)}.log`);
      fs.writeFileSync(logFile, output);
    } catch (err) {
      console.log(`  Warning: failed to write log for ${pkg}: ${err.message}`);
    }
  }
  const status = success ? "OK" : "FAILED";
  console.log(`##[group]${phase} log [${status}]: ${pkg}`);
  console.log(output);
  console.log("##[endgroup]");
}

module.exports = {
  runCommand,
  extractError,
  recordPackageLog,
};
