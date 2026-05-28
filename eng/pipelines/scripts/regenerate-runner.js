#!/usr/bin/env node

const { execSync, spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

function getArg(name, defaultValue = "") {
  const index = process.argv.indexOf(name);
  if (index < 0 || index + 1 >= process.argv.length) return defaultValue;
  return process.argv[index + 1];
}

const sdkRoot = process.cwd();
const specRepoRoot = getArg("--specRepoRoot");
const maxWorkers = Number(getArg("--maxWorkers", "4"));
const buildWorkers = Number(getArg("--buildWorkers", "1"));
const maxPackages = Number(getArg("--maxPackages", "0"));
const skipBuild = getArg("--skipBuild", "false").toLowerCase() === "true";
const emitterVersion = getArg("--emitterVersion", "");
const directoryListFile = getArg("--directoryList", "");
const resultOutputDir = getArg("--resultOutputDir", "");
// No per-process timeout: aligned with azure-sdk-for-net / azure-sdk-for-go
// regeneration scripts, which rely on the ADO job-level timeout
// (timeoutInMinutes, default 60min) and let individual tsp-client / pnpm
// invocations run to completion. If a single package hangs, the whole shard
// will eventually be killed by ADO — that's the accepted trade-off.

if (!specRepoRoot || !fs.existsSync(specRepoRoot)) {
  console.error(`ERROR: spec repo root not found: ${specRepoRoot}`);
  process.exit(1);
}

function normalizePath(p) {
  return p.replace(/\\/g, "/");
}

// Per-package spec lookup goes through each SDK's tsp-location.yaml only.
// We deliberately do NOT scan the cloned spec repo to discover tspconfigs:
// (1) the matrix-stage filter `-OnlyTypeSpec true` already keeps only packages
//     that have tsp-location.yaml on the SDK side, so any spec-index "rescue"
//     would never fire; (2) reviewers (mentor comment #3) want the regeneration
//     contract to be exactly "what tsp-location.yaml points at", with the small
//     set of packages that lack tsp-location.yaml surfaced in the PR description
//     so the spec/SDK team can on-board them properly.
//
// Helper: parse `directory:` (and optionally `commit:`/`repo:`) out of a
// tsp-location.yaml. Returns null if the file is missing the directory field
// or has an obviously-broken value.
function readTspLocation(tspLocationPath) {
  let content;
  try {
    content = fs.readFileSync(tspLocationPath, "utf8");
  } catch {
    return { error: "read failed" };
  }
  if (/^\s*repo\s*:\s*\.\./m.test(content)) {
    return { error: "relative repo" };
  }
  const directoryMatch = content.match(/^\s*directory\s*:\s*(.+?)\s*$/m);
  if (!directoryMatch) {
    return { error: "missing 'directory:' field" };
  }
  const directory = directoryMatch[1].trim();
  const commitMatch = content.match(/^\s*commit\s*:\s*(.+?)\s*$/m);
  const repoMatch = content.match(/^\s*repo\s*:\s*(.+?)\s*$/m);
  return {
    directory,
    commit: commitMatch ? commitMatch[1].trim() : "",
    repo: repoMatch ? repoMatch[1].trim() : "",
  };
}

function tsPrefix(startMs) {
  const now = new Date();
  const hh = String(now.getUTCHours()).padStart(2, "0");
  const mm = String(now.getUTCMinutes()).padStart(2, "0");
  const ss = String(now.getUTCSeconds()).padStart(2, "0");
  const ms = String(now.getUTCMilliseconds()).padStart(3, "0");
  const elapsedSec = ((Date.now() - startMs) / 1000).toFixed(1).padStart(6, " ");
  return `[${hh}:${mm}:${ss}.${ms}Z +${elapsedSec}s] `;
}

// Wrap a streaming chunk handler so every completed line is prefixed with a
// real timestamp + elapsed-seconds marker. Partial lines (no trailing newline)
// are buffered until the next chunk so we never break mid-line. This makes
// downloaded per-package logs actually useful for diagnosing slow phases —
// instead of relying on ADO's coarse, flush-time stamps.
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

    const appendLine = (line) => { output += line; lastOutputMs = Date.now(); };
    const stdoutStamper = makeLineStamper(startMs, appendLine);
    const stderrStamper = makeLineStamper(startMs, appendLine);

    // Header line so the log shows exactly when the command was launched.
    output += `${tsPrefix(startMs)}$ ${cmd} ${args.join(" ")}  (cwd=${cwd})\n`;

    // Heartbeat: while the child is alive, every HEARTBEAT_INTERVAL_MS print a
    // timestamped progress line showing how long it's been silent and the
    // child process's current CPU / RSS. This makes tsp-compile's silent
    // multi-minute compile phase observable in the log instead of looking
    // like a hang. We deliberately do NOT touch lastOutputMs here — heartbeats
    // are runner-side metadata, not real child output.
    const HEARTBEAT_INTERVAL_MS = 30 * 1000;
    let lastResourceSnapshot = null;
    // Walk the process tree rooted at `rootPid` (the shell wrapper spawned by
     // shell:true), summing CPU jiffies and RSS across all descendants. We have
     // to do this because spawn(..., { shell: true }) makes proc.pid point to
     // /bin/sh, not the actual tsp / node / npx worker that's doing the work —
     // so reading just proc.pid yields CPU 0% / RSS 2MB even when tsp compile
     // is burning a CPU core. We use /proc/<pid>/task/<tid>/children (a
     // space-separated list of direct child pids) to walk recursively.
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
        } catch { continue; }
        for (const tid of taskDir) {
          let childrenStr;
          try {
            childrenStr = fs.readFileSync(`/proc/${pid}/task/${tid}/children`, "utf8");
          } catch { continue; }
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
      } catch { return 0; }
    }

    function readPidRssKb(pid) {
      try {
        const status = fs.readFileSync(`/proc/${pid}/status`, "utf8");
        const m = status.match(/VmRSS:\s*(\d+)\s*kB/);
        return m ? Number(m[1]) : 0;
      } catch { return 0; }
    }

    function readProcSnapshot(rootPid) {
      // Sum CPU jiffies + RSS over the whole process tree rooted at rootPid.
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
          const clkTck = 100; // standard on Linux
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

    proc.stdout.on("data", (d) => { stdoutStamper.push(d.toString()); });
    proc.stderr.on("data", (d) => { stderrStamper.push(d.toString()); });
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

  // Fallback: show last meaningful lines
  const lastLines = lines.filter((l) => l.trim().length > 0).slice(-3);
  if (lastLines.length > 0) return lastLines.map((l) => l.trim()).join(" | ");

  return "Unknown error";
}

// Sanitize a package directory like "sdk/foo/arm-foo" into a safe filename.
function safeLogName(pkg) {
  return pkg.replace(/[\\/]/g, "__");
}

// Write the full log for a single package to <resultOutputDir>/logs/<phase>/<pkg>.log,
// and ALWAYS emit an ADO-collapsible group (##[group]) with the full log so
// every package's run — success or failure — is folded by default and can be
// expanded on demand from the ADO UI. Failures are still easy to find via the
// inline "❌ [N/M] FAILED" lines and the SUMMARY section at the end.
function recordPackageLog(phase, pkg, success, output) {
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

// Comment #5 (mentor): replace the custom breaking-change-detector.js with the
// official @azure-tools/js-sdk-release-tools `update-changelog` CLI. That tool
// uses typescript-codegen-breaking-change-detector internally and writes a
// CHANGELOG.md section (### Breaking Changes / ### Features Added / ...). It
// compares against the latest npm-published version, which is a better
// regression baseline than git HEAD for "candidate emitter" runs.
const CHANGELOG_TOOL_DIR = "eng/tools/js-sdk-release-tools";
let changelogToolReady = false;

async function installChangelogTool() {
  if (changelogToolReady) return true;
  const toolDirAbs = path.join(sdkRoot, CHANGELOG_TOOL_DIR);
  if (!fs.existsSync(path.join(toolDirAbs, "package.json"))) {
    console.log(`WARNING: ${CHANGELOG_TOOL_DIR}/package.json not found; skipping changelog generation.`);
    return false;
  }
  console.log(`Installing ${CHANGELOG_TOOL_DIR} dependencies for update-changelog...`);
  const install = await runCommand("npm", ["--prefix", CHANGELOG_TOOL_DIR, "ci"], sdkRoot);
  if (install.code !== 0) {
    console.log(`WARNING: npm ci for ${CHANGELOG_TOOL_DIR} failed; skipping changelog generation.`);
    console.log(install.output.slice(-1000));
    return false;
  }
  changelogToolReady = true;
  console.log("update-changelog tool installed.");
  return true;
}

// Run `update-changelog --sdkRepoPath <repo> --packagePath <pkg>` for a single
// package. Returns { success, hasBreaking, hasChanges, output }. Never throws;
// any failure is recorded and the caller decides what to do.
async function runUpdateChangelog(packageRelPath) {
  if (!changelogToolReady) {
    return { success: false, hasBreaking: false, hasChanges: false, output: "(changelog tool not installed)" };
  }
  const result = await runCommand(
    "npm",
    [
      "--prefix",
      CHANGELOG_TOOL_DIR,
      "exec",
      "--no",
      "--",
      "update-changelog",
      "--sdkRepoPath",
      sdkRoot,
      "--packagePath",
      path.join(sdkRoot, packageRelPath),
    ],
    sdkRoot
  );
  const success = result.code === 0;
  // Detect breaking by scanning the package's CHANGELOG.md for an unreleased
  // "### Breaking Changes" heading. update-changelog rewrites the top section
  // in place; we look only at the first ~200 lines to avoid matching old
  // entries.
  let hasBreaking = false;
  let hasChanges = false;
  try {
    const changelogPath = path.join(sdkRoot, packageRelPath, "CHANGELOG.md");
    if (fs.existsSync(changelogPath)) {
      const head = fs.readFileSync(changelogPath, "utf8").split("\n").slice(0, 200).join("\n");
      // Stop at the second "## " (next released version) so we only inspect
      // the top entry.
      const firstVersion = head.indexOf("\n## ");
      const top = firstVersion >= 0 ? head.slice(0, head.indexOf("\n## ", firstVersion + 1) > 0 ? head.indexOf("\n## ", firstVersion + 1) : head.length) : head;
      hasBreaking = /^###\s+Breaking Changes\b/m.test(top);
      hasChanges = /^###\s+(Features Added|Breaking Changes|Bugs Fixed|Other Changes)\b/m.test(top);
    }
  } catch (err) {
    // best-effort detection — don't fail the whole package because we couldn't
    // parse the changelog
  }
  return { success, hasBreaking, hasChanges, output: result.output };
}

// Recursively delete nested duplicate workspace directories of the form
// sdk/X/Y/sdk/X/Y created by tsp-client when emitter-output-dir is misresolved.
// These break pnpm install because two workspaces share the same package name.
function cleanupNestedDuplicateWorkspaces(root) {
  const nestedPattern = /^sdk[/\\][^/\\]+[/\\][^/\\]+[/\\]sdk[/\\]/;
  function findNested(dir, results) {
    let entries;
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return results; }
    for (const entry of entries) {
      if (entry.name === "node_modules" || entry.name === ".git") continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        findNested(full, results);
      } else if (entry.name === "package.json") {
        const rel = normalizePath(path.relative(root, full));
        if (nestedPattern.test(rel)) results.push(full);
      }
    }
    return results;
  }
  const packageJsonPaths = findNested(path.join(root, "sdk"), []);
  if (packageJsonPaths.length === 0) return 0;

  // Delete the inner duplicate "sdk" folder so the outer workspace stays.
  // Example: sdk/azurestackhci/arm-azurestackhci/sdk -> delete this whole inner sdk
  const innerSdkRoots = new Set();
  for (const pkgJson of packageJsonPaths) {
    const rel = normalizePath(path.relative(root, pkgJson));
    const segments = rel.split("/");
    const innerIndex = segments.indexOf("sdk", 1);
    if (innerIndex > 0) {
      const innerSdkRel = segments.slice(0, innerIndex + 1).join("/");
      innerSdkRoots.add(path.join(root, innerSdkRel));
    }
  }
  for (const innerSdk of innerSdkRoots) {
    try {
      fs.rmSync(innerSdk, { recursive: true, force: true });
      console.log(`  Removed nested duplicate workspace: ${path.relative(root, innerSdk)}`);
    } catch (err) {
      console.log(`  Warning: failed to remove ${innerSdk}: ${err.message}`);
    }
  }
  return innerSdkRoots.size;
}

// ============ Pre-build workaround helpers ============
// These work around bugs in the dev emitter where generated packages are missing
// config files or dependencies needed for the new warp build system.

function cleanupTempTypeSpecFiles(root) {
  // TempTypeSpecFiles contain package.json with name "typescript-emitter-package"
  // which causes turbo "duplicate workspace" errors
  const sdkDir = path.join(root, "sdk");
  let removed = 0;
  function scan(dir, depth) {
    if (depth > 4) return;
    let entries;
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      if (!e.isDirectory() || e.name === "node_modules" || e.name === ".git") continue;
      const full = path.join(dir, e.name);
      if (e.name === "TempTypeSpecFiles") {
        fs.rmSync(full, { recursive: true, force: true });
        removed++;
      } else {
        scan(full, depth + 1);
      }
    }
  }
  scan(sdkDir, 0);
  if (removed > 0) console.log(`  Removed ${removed} TempTypeSpecFiles directories`);
}

function scaffoldWarpConfigs(root) {
  // The dev emitter generates warp.config.yml referencing config/tsconfig.src.*.json
  // but doesn't create those files. We scaffold them here.
  const sdkDir = path.join(root, "sdk");
  let count = 0;
  function scan(dir, depth) {
    if (depth > 3) return;
    let entries;
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      if (!e.isDirectory() || e.name === "node_modules" || e.name === ".git") continue;
      const full = path.join(dir, e.name);
      const warpPath = path.join(full, "warp.config.yml");
      if (fs.existsSync(warpPath)) {
        const configDir = path.join(full, "config");
        // Calculate relative path depth to eng/tsconfigs
        const rel = path.relative(configDir, path.join(root, "eng", "tsconfigs")).replace(/\\/g, "/");
        const targets = {
          "tsconfig.src.browser.json": `${rel}/src.browser.json`,
          "tsconfig.src.cjs.json": `${rel}/src.cjs.json`,
          "tsconfig.src.esm.json": `${rel}/src.esm.json`,
          "tsconfig.src.react-native.json": `${rel}/src.react-native.json`,
        };
        let needed = false;
        for (const file of Object.keys(targets)) {
          if (!fs.existsSync(path.join(configDir, file))) { needed = true; break; }
        }
        if (needed) {
          fs.mkdirSync(configDir, { recursive: true });
          for (const [file, ext] of Object.entries(targets)) {
            const fp = path.join(configDir, file);
            if (!fs.existsSync(fp)) {
              fs.writeFileSync(fp, JSON.stringify({ extends: ext, include: ["../src/index.ts"] }, null, 2) + "\n");
            }
          }
          count++;
        }
      } else if (depth < 2) {
        scan(full, depth + 1);
      }
    }
  }
  scan(sdkDir, 0);
  if (count > 0) console.log(`  Scaffolded config/ for ${count} packages`);
}

function patchMissingDependencies(root, successPkgs) {
  // The dev emitter sometimes generates code importing @azure/logger etc.
  // without adding them to package.json dependencies. Also patches missing
  // devDependencies for warp build targets (e.g., react-native).
  const knownVersions = {
    "@azure/logger": "^1.2.0",
    "@azure/core-util": "^1.12.0",
    "@azure/core-lro": "^3.1.0",
    "@azure/core-paging": "^1.6.2",
    "@azure/abort-controller": "^2.1.2",
  };
  const knownDevDeps = {
    "react-native": "catalog:testing",
  };
  let count = 0;

  for (const pkg of successPkgs) {
    const pkgDir = path.join(root, pkg.pkg);
    const pkgJsonPath = path.join(pkgDir, "package.json");
    if (!fs.existsSync(pkgJsonPath)) continue;

    // Scan .ts files for @azure/* imports
    const srcDir = path.join(pkgDir, "src");
    const imports = new Set();
    function scanTs(dir) {
      let entries;
      try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
      for (const e of entries) {
        const full = path.join(dir, e.name);
        if (e.isDirectory()) { scanTs(full); continue; }
        if (!e.name.endsWith(".ts")) continue;
        try {
          const content = fs.readFileSync(full, "utf8");
          const matches = content.matchAll(/from\s+"(@azure[^"]+)"/g);
          for (const m of matches) imports.add(m[1]);
        } catch {}
      }
    }
    scanTs(srcDir);

    const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, "utf8"));
    let patched = false;

    // Patch missing runtime dependencies
    const deps = pkgJson.dependencies || {};
    for (const imp of imports) {
      if (!deps[imp] && knownVersions[imp]) {
        deps[imp] = knownVersions[imp];
        patched = true;
      }
    }
    pkgJson.dependencies = deps;

    // Patch missing devDependencies for warp targets
    const warpPath = path.join(pkgDir, "warp.config.yml");
    if (fs.existsSync(warpPath)) {
      const warpContent = fs.readFileSync(warpPath, "utf8");
      const devDeps = pkgJson.devDependencies || {};
      for (const [dep, ver] of Object.entries(knownDevDeps)) {
        if (warpContent.includes(dep) && !devDeps[dep]) {
          devDeps[dep] = ver;
          patched = true;
        }
      }
      pkgJson.devDependencies = devDeps;
    }

    if (patched) {
      fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2) + "\n");
      count++;
    }
  }
  if (count > 0) console.log(`  Patched dependencies in ${count} packages`);
}

function detectNestedDuplicateWorkspaces() {
  // Find package.json files at nested paths like sdk/a/b/sdk/c/d/package.json
  const nestedPattern = /^sdk[/\\][^/\\]+[/\\][^/\\]+[/\\]sdk[/\\]/;
  function findNested(dir, results) {
    let entries;
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return results; }
    for (const entry of entries) {
      if (entry.name === "node_modules" || entry.name === ".git") continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        findNested(full, results);
      } else if (entry.name === "package.json") {
        const rel = normalizePath(path.relative(sdkRoot, full));
        if (nestedPattern.test(rel)) results.push(rel);
      }
    }
    return results;
  }
  const packageJsonPaths = findNested(path.join(sdkRoot, "sdk"), []);

  if (packageJsonPaths.length === 0) {
    console.log("Pre-flight: no nested duplicate workspaces found.");
    return;
  }

  console.log("Pre-flight: nested duplicate workspace directories found:");
  for (const packageJsonPath of packageJsonPaths) {
    console.log(`  - ${path.dirname(packageJsonPath)}`);
  }
  throw new Error("Nested duplicate workspaces will make pnpm/turbo fail. Remove them before running the pipeline.");
}

// Resolve one SDK directory's spec location from its tsp-location.yaml.
// Returns { ok: true, package } if the SDK has a usable tsp-location.yaml,
// or { ok: false, reason } if it should be reported as skipped in the PR.
function resolvePackageFromTspLocation(sdkDir) {
  const dir = normalizePath(sdkDir);
  const pkgDir = path.join(sdkRoot, sdkDir);
  const tspLocationPath = path.join(pkgDir, "tsp-location.yaml");
  if (!fs.existsSync(tspLocationPath)) {
    return { ok: false, reason: "no tsp-location.yaml" };
  }
  const parsed = readTspLocation(tspLocationPath);
  if (parsed.error) {
    return { ok: false, reason: parsed.error };
  }
  const localSpecPath = normalizePath(path.join(specRepoRoot, parsed.directory));
  const tspConfigPath = path.join(localSpecPath, "tspconfig.yaml");
  if (!fs.existsSync(tspConfigPath)) {
    return { ok: false, reason: `stale path: ${parsed.directory} (tspconfig.yaml not in cloned spec)` };
  }
  return {
    ok: true,
    package: {
      pkg: dir,
      pkgDir,
      tspConfigPath,
      localSpecPath,
      source: "tsp-location",
      tspLocationDirectory: parsed.directory,
      tspLocationCommit: parsed.commit,
      tspLocationRepo: parsed.repo,
    },
  };
}

// Single-job mode: scan sdk/ for arm-* dirs and resolve each via tsp-location.yaml.
// Returns { packages, skippedNoTspLocation } — packages without a usable
// tsp-location.yaml are surfaced for the PR description, not silently dropped.
function classifyPackages() {
  function findArmDirs(dir, results) {
    let entries;
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return results; }
    for (const entry of entries) {
      if (entry.name === "node_modules" || entry.name === ".git") continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name.startsWith("arm-")) {
          results.push(normalizePath(path.relative(sdkRoot, full)));
        } else {
          findArmDirs(full, results);
        }
      }
    }
    return results;
  }
  const allArmDirs = findArmDirs(path.join(sdkRoot, "sdk"), []).sort();

  const packages = [];
  const skippedNoTspLocation = [];

  for (const dir of allArmDirs) {
    const r = resolvePackageFromTspLocation(dir);
    if (r.ok) packages.push(r.package);
    else skippedNoTspLocation.push({ name: normalizePath(dir), reason: r.reason });
  }

  console.log("");
  console.log(`  ✅ Will run: ${packages.length} packages (resolved via tsp-location.yaml)`);
  if (skippedNoTspLocation.length > 0) {
    console.log(`  ⚠️  Skipped: ${skippedNoTspLocation.length} arm-* packages without a usable tsp-location.yaml`);
    console.log(`     (these are surfaced in the PR description for follow-up on-boarding)`);
    for (const item of skippedNoTspLocation) console.log(`       [SKIP] ${item.name} — ${item.reason}`);
  }
  console.log("");

  return { packages, skippedNoTspLocation };
}

// Matrix mode: caller passes a directoryList JSON (entries like
// "advisor/arm-advisor"). We resolve each entry the same way as single-job
// mode (tsp-location.yaml only). When matrix gen runs with `-OnlyTypeSpec
// true`, every entry in the list will already have tsp-location.yaml — the
// skipped list normally stays empty here. The list is still computed (and
// emitted) so an edge-case (e.g. yaml gets deleted between matrix-gen and
// shard run) is visible in result.json.
function classifyFromDirectoryList(directoryListPath) {
  console.log(`Reading directory list from: ${directoryListPath}`);
  const entries = JSON.parse(fs.readFileSync(directoryListPath, "utf8"));
  if (!Array.isArray(entries) || entries.length === 0) {
    console.error("ERROR: directoryList is empty or not an array");
    process.exit(1);
  }
  console.log(`  Directory list contains ${entries.length} packages`);

  const packages = [];
  const skippedNoTspLocation = [];

  for (const entry of entries) {
    if (entry.includes("..") || path.isAbsolute(entry)) {
      console.error(`ERROR: invalid directory list entry (must be relative): ${entry}`);
      process.exit(1);
    }

    const sdkDir = normalizePath(path.join("sdk", entry));
    if (!fs.existsSync(path.join(sdkRoot, sdkDir))) {
      skippedNoTspLocation.push({ name: sdkDir, reason: "directory does not exist" });
      continue;
    }
    const r = resolvePackageFromTspLocation(sdkDir);
    if (r.ok) packages.push(r.package);
    else skippedNoTspLocation.push({ name: sdkDir, reason: r.reason });
  }

  console.log(`  ✅ Will run: ${packages.length} packages`);
  if (skippedNoTspLocation.length > 0) {
    console.log(`  ⚠️  Skipped: ${skippedNoTspLocation.length} packages without a usable tsp-location.yaml`);
    for (const item of skippedNoTspLocation) console.log(`       [SKIP] ${item.name} — ${item.reason}`);
  }
  console.log("");

  return { packages, skippedNoTspLocation };
}

async function regenerateAll(packages) {
  console.log("===== Step 4: Regeneration (tsp-client init --update-if-exists) =====");

  // Set npm config to avoid ERESOLVE errors during tsp-client's internal npm install
  try {
    execSync("npm config set legacy-peer-deps true", { encoding: "utf8" });
    console.log("Set npm legacy-peer-deps=true to avoid ERESOLVE conflicts");
  } catch (e) {
    console.log("Warning: failed to set npm config:", e.message);
  }

  const results = [];
  let completed = 0;
  let activePromises = [];

  async function processPackage(pkg) {
    const start = Date.now();
    let output = "";
    let success = false;

    output += `Package dir   : ${pkg.pkgDir}\n`;
    output += `Spec source   : ${pkg.source}\n`;
    output += `tsp-config    : ${pkg.tspConfigPath}\n`;
    output += `local-spec    : ${pkg.localSpecPath}\n`;

    if (!fs.existsSync(pkg.tspConfigPath)) {
      output += `ERROR: tspconfig.yaml not found at ${pkg.tspConfigPath} (spec may have been renamed/deleted)\n`;
      completed++;
      const duration = ((Date.now() - start) / 1000).toFixed(1);
      console.log(`  ❌ [${completed}/${packages.length}] ${pkg.pkg} - FAILED (${duration}s)`);
      console.log(`     ${extractError(output)}`);
      recordPackageLog("regenerate", pkg.pkg, false, output);
      results.push({ pkg: pkg.pkg, success: false, duration, output });
      return;
    }

    // Use `tsp-client init --update-if-exists` with the latest main spec from
    // the locally cloned azure-rest-api-specs repo. The emitter runs against
    // whatever api-version the spec's tspconfig.yaml declares by default, so
    // the diff reflects the combined (emitter + spec-evolution) signal.
    // (api-version pinning machinery was removed after the A/B test in PR
    // #38604 showed it didn't materially reduce breaking-change noise — only
    // 1 package differed between pinned and unpinned runs out of 95.)
    // Single attempt, no retry — aligned with azure-sdk-for-net / azure-sdk-for-go.
    const tspClientArgs = ["init", "--update-if-exists", "-c", pkg.tspConfigPath, "--local-spec-repo", pkg.localSpecPath, "--debug"];
    output += `tsp-client    : init --local-spec-repo (latest main)\n`;

    const result = await runCommand("tsp-client", tspClientArgs, pkg.pkgDir);
    output += `\n${result.output}`;
    output += `\nExit code: ${result.code}\n`;
    success = result.code === 0;

    const duration = ((Date.now() - start) / 1000).toFixed(1);
    completed++;
    if (success) {
      console.log(`  ✅ [${completed}/${packages.length}] ${pkg.pkg} - SUCCESS (${duration}s)`);
    } else {
      console.log(`  ❌ [${completed}/${packages.length}] ${pkg.pkg} - FAILED (${duration}s)`);
      console.log(`     ${extractError(output)}`);
    }
    recordPackageLog("regenerate", pkg.pkg, success, output);
    results.push({ pkg: pkg.pkg, success, duration, output });
  }

  for (const pkg of packages) {
    const promise = processPackage(pkg).then(() => {
      activePromises = activePromises.filter((p) => p !== promise);
    });
    activePromises.push(promise);
    if (activePromises.length >= maxWorkers) await Promise.race(activePromises);
  }
  await Promise.allSettled(activePromises);

  // Same ADO group-collapse sentinel as in buildAll. Most of the time the
  // next phase's banner "===== Step 5 =====" already triggers ADO to close
  // the last regenerate group, but when build is skipped (--skipBuild, or
  // all regens failed) the last regenerate group would otherwise be stuck
  // in "open / not collapsible" state.
  console.log("##[section]All per-package regenerate logs complete");

  return results;
}

async function buildAll(regenResults) {
  const successPkgs = regenResults.filter((result) => result.success);
  if (skipBuild || successPkgs.length === 0) {
    if (skipBuild) console.log("Build verification skipped (SkipBuild=true)");
    return { buildResults: [], skipped: true };
  }

  console.log("");
  console.log("===== Step 5: Build Verification (pnpm build --filter) =====");
  console.log(`Building ${successPkgs.length} packages with ${buildWorkers} workers`);
  console.log("");

  // Pre-build fix 1: Clean up TempTypeSpecFiles to avoid turbo "duplicate workspace" errors
  console.log("Cleaning up TempTypeSpecFiles directories...");
  cleanupTempTypeSpecFiles(sdkRoot);

  // Pre-build fix 1b: Clean up nested duplicate workspaces created by tsp-client
  // (e.g. sdk/foo/arm-foo/sdk/foo/arm-foo/package.json), which would otherwise
  // make pnpm install reject the whole workspace.
  console.log("Cleaning up nested duplicate workspace directories...");
  const nestedRemoved = cleanupNestedDuplicateWorkspaces(sdkRoot);
  if (nestedRemoved === 0) {
    console.log("  No nested duplicate workspaces found.");
  }

  // Pre-build fix 2: Scaffold missing config/tsconfig files for warp-enabled packages
  console.log("Scaffolding missing config/tsconfig files...");
  scaffoldWarpConfigs(sdkRoot);

  // Pre-build fix 3: Patch missing dependencies in package.json
  console.log("Checking for missing dependencies in generated packages...");
  patchMissingDependencies(sdkRoot, successPkgs);

  console.log("Running pnpm install at repo root...");
  const pnpmInstall = await runCommand("pnpm", ["install", "--no-frozen-lockfile"], sdkRoot);
  if (pnpmInstall.code !== 0) {
    console.log("ERROR: pnpm install failed. Cannot proceed with build verification.");
    console.log(pnpmInstall.output.slice(-1000));
    return { buildResults: [], skipped: true };
  }
  console.log("pnpm install completed");

  // Install the official changelog tool once for the whole shard, so each
  // successful build can immediately run update-changelog.
  await installChangelogTool();

  // Pre-build fix 4: Build core dependencies first
  console.log("Pre-building core dependencies...");
  const coreFilters = [
    "@azure/core-rest-pipeline", "@azure/core-client", "@azure/core-auth",
    "@azure/core-lro", "@azure/logger", "@azure/core-paging"
  ];
  const coreArgs = ["build"];
  for (const f of coreFilters) { coreArgs.push("--filter", f); }
  const coreBuild = await runCommand("pnpm", coreArgs, sdkRoot);
  if (coreBuild.code !== 0) {
    console.log("WARNING: Core dependencies build had issues:");
    console.log(coreBuild.output.slice(-2000));
  } else {
    console.log("Core dependencies built");
  }

  const buildResults = [];
  let buildCompleted = 0;
  let activePromises = [];
  const buildTotal = successPkgs.length;

  async function buildPackage(pkg) {
    const pkgDir = path.join(sdkRoot, pkg.pkg);
    let filterName = pkg.pkg;
    try {
      const packageJson = JSON.parse(fs.readFileSync(path.join(pkgDir, "package.json"), "utf8"));
      if (packageJson.name) filterName = packageJson.name;
    } catch {}

    const start = Date.now();
    const build = await runCommand("pnpm", ["build", "--filter", filterName], sdkRoot);
    const duration = ((Date.now() - start) / 1000).toFixed(1);
    buildCompleted++;

    let changelog = null;
    if (build.code === 0) {
      console.log(`  ✅ [BUILD ${buildCompleted}/${buildTotal}] ${pkg.pkg} - BUILD OK (${duration}s)`);
      // Comment #5: run the official update-changelog for every package whose
      // build succeeded. Changelog failures are logged but never demote the
      // build status — the regen+build matrix is the gate, the changelog is a
      // signal.
      const cl = await runUpdateChangelog(pkg.pkg);
      changelog = { success: cl.success, hasBreaking: cl.hasBreaking, hasChanges: cl.hasChanges };
      if (cl.success) {
        const marker = cl.hasBreaking ? "⚠️ breaking" : cl.hasChanges ? "changes" : "no changes";
        console.log(`     changelog: ${marker}`);
      } else {
        console.log(`     changelog: FAILED (see log)`);
      }
      recordPackageLog("changelog", pkg.pkg, cl.success, cl.output);
      buildResults.push({ pkg: pkg.pkg, success: true, duration, phase: "done", output: build.output, changelog });
    } else {
      console.log(`  ❌ [BUILD ${buildCompleted}/${buildTotal}] ${pkg.pkg} - BUILD FAILED (${duration}s)`);
      console.log(`     ${extractError(build.output)}`);
      buildResults.push({ pkg: pkg.pkg, success: false, duration, phase: "pnpm build", output: build.output, changelog: null });
    }
    recordPackageLog("build", pkg.pkg, build.code === 0, build.output);
  }

  for (const pkg of successPkgs) {
    const promise = buildPackage(pkg).then(() => {
      activePromises = activePromises.filter((p) => p !== promise);
    });
    activePromises.push(promise);
    if (activePromises.length >= buildWorkers) await Promise.race(activePromises);
  }
  await Promise.allSettled(activePromises);

  // ADO logging quirk: a ##[group] only renders as a collapsible block when
  // there is following non-group content as an anchor. Without this sentinel
  // the very last build package's group stays in "open" state and the user
  // cannot collapse it. Emitting a ##[section] line acts as a hard boundary
  // and forces ADO to close (and thus make collapsible) all preceding groups.
  console.log("##[section]All per-package build logs complete");

  return { buildResults, skipped: false };
}

async function main() {
  detectNestedDuplicateWorkspaces();

  console.log("===== Step 3: Resolve spec paths via tsp-location.yaml =====");
  let packages;
  let skippedNoTspLocation;

  if (directoryListFile) {
    // Matrix mode: package list provided by GenerateMatrix job
    console.log("(Matrix mode: using --directoryList)");
    ({ packages, skippedNoTspLocation } = classifyFromDirectoryList(directoryListFile));
  } else {
    // Single-job mode: scan all ARM packages
    ({ packages, skippedNoTspLocation } = classifyPackages());
    if (maxPackages > 0) {
      packages = packages.slice(0, maxPackages);
      console.log(`Limited to first ${maxPackages} packages`);
    }
  }

  console.log(`Processing ${packages.length} packages with ${maxWorkers} regen workers`);
  console.log(`Build workers: ${buildWorkers}`);
  console.log("");

  const regenResults = await regenerateAll(packages);
  const { buildResults, skipped: buildSkipped } = await buildAll(regenResults);

  const regenSuccess = regenResults.filter((result) => result.success).length;
  const regenFail = regenResults.filter((result) => !result.success).length;
  const buildOk = buildResults.filter((result) => result.success).length;
  const buildFail = buildResults.filter((result) => !result.success).length;

  console.log("");
  console.log("========== SUMMARY ==========");
  if (emitterVersion) console.log(`Emitter: @azure-tools/typespec-ts@${emitterVersion}`);
  console.log("");
  console.log("--- Regeneration (tsp-client init --update-if-exists) ---");
  console.log(`Total: ${packages.length} | Success: ${regenSuccess} | Failed: ${regenFail}`);
  console.log(`Success Rate: ${packages.length === 0 ? "0.0" : ((regenSuccess * 100) / packages.length).toFixed(1)}%`);

  if (!buildSkipped && regenSuccess > 0) {
    console.log("");
    console.log("--- Build Verification (pnpm build) ---");
    console.log(`Total: ${regenSuccess} | Build OK: ${buildOk} | Build Failed: ${buildFail}`);
    console.log(`Build Pass Rate: ${((buildOk * 100) / regenSuccess).toFixed(1)}%`);
  }

  if (regenFail > 0) {
    console.log("");
    console.log("Regeneration failures:");
    for (const result of regenResults.filter((r) => !r.success)) {
      console.log(`  - ${result.pkg}: ${extractError(result.output)}`);
    }
  }
  if (buildFail > 0) {
    console.log("");
    console.log("Build failures:");
    for (const result of buildResults.filter((r) => !r.success)) {
      console.log(`  - ${result.pkg} (failed at ${result.phase}): ${extractError(result.output)}`);
    }
  }
  console.log("=============================");

  // Write result summary as JSON for artifact collection in matrix mode
  if (resultOutputDir) {
    const resultSummary = {
      emitterVersion,
      directoryList: directoryListFile || null,
      packages: packages.map((p) => p.pkg),
      // Comment #3: packages without a usable tsp-location.yaml are surfaced
      // here so the Summary stage can list them in the PR description for
      // on-boarding follow-up by the spec/SDK team.
      skippedNoTspLocation: skippedNoTspLocation || [],
      regeneration: {
        total: packages.length,
        success: regenSuccess,
        failed: regenFail,
        failures: regenResults.filter((r) => !r.success).map((r) => ({
          pkg: r.pkg,
          error: extractError(r.output),
        })),
      },
      build: buildSkipped ? null : {
        total: regenSuccess,
        success: buildOk,
        failed: buildFail,
        failures: buildResults.filter((r) => !r.success).map((r) => ({
          pkg: r.pkg,
          phase: r.phase,
          error: extractError(r.output),
        })),
      },
      // Comment #5: changelog signal sourced from the official update-changelog
      // tool. `breakingPackages` is the simple actionable list reviewers care
      // about — they can read each package's CHANGELOG.md in the PR diff for
      // detail.
      changelog: buildSkipped ? null : (() => {
        const withChangelog = buildResults.filter((r) => r.success && r.changelog);
        const generated = withChangelog.filter((r) => r.changelog.success);
        const breaking = generated.filter((r) => r.changelog.hasBreaking);
        const changes = generated.filter((r) => r.changelog.hasChanges);
        const failed = withChangelog.filter((r) => !r.changelog.success).map((r) => r.pkg);
        return {
          total: withChangelog.length,
          generated: generated.length,
          failed: failed.length,
          withChanges: changes.length,
          withBreaking: breaking.length,
          breakingPackages: breaking.map((r) => r.pkg),
          failedPackages: failed,
        };
      })(),
    };

    if (!fs.existsSync(resultOutputDir)) {
      fs.mkdirSync(resultOutputDir, { recursive: true });
    }
    const resultFile = path.join(resultOutputDir, "result.json");
    fs.writeFileSync(resultFile, JSON.stringify(resultSummary, null, 2));
    console.log(`Result summary written to: ${resultFile}`);
  }

  if (regenFail > 0 || buildFail > 0) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
