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
const maxPackages = Number(getArg("--maxPackages", "0"));
const skipBuild = getArg("--skipBuild", "false").toLowerCase() === "true";
const emitterVersion = getArg("--emitterVersion", "");
const directoryListFile = getArg("--directoryList", "");
const resultOutputDir = getArg("--resultOutputDir", "");
const regenTimeoutMs = Number(getArg("--regenTimeoutMs", String(30 * 60 * 1000)));

if (!specRepoRoot || !fs.existsSync(specRepoRoot)) {
  console.error(`ERROR: spec repo root not found: ${specRepoRoot}`);
  process.exit(1);
}

function normalizePath(p) {
  return p.replace(/\\/g, "/");
}

function walk(dir, results = []) {
  let entries = [];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return results;
  }

  for (const entry of entries) {
    if (entry.name === "node_modules" || entry.name === ".git" || entry.name.startsWith(".")) {
      continue;
    }

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, results);
    } else if (entry.name === "tspconfig.yaml") {
      results.push(fullPath);
    }
  }

  return results;
}

function getIndent(line) {
  const match = line.match(/^(\s*)/);
  return match ? match[1].length : 0;
}

function stripYamlValue(value) {
  return value
    .trim()
    .replace(/\s+#.*$/, "")
    .replace(/^["']/, "")
    .replace(/["']$/, "")
    .trim();
}

function findBlock(lines, key) {
  const keyPattern = new RegExp(`^\\s*["']?${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']?\\s*:\\s*(?:#.*)?$`);
  const start = lines.findIndex((line) => keyPattern.test(line));
  if (start < 0) return [];

  const baseIndent = getIndent(lines[start]);
  const block = [];
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() && getIndent(line) <= baseIndent) break;
    block.push(line);
  }
  return block;
}

function findScalarInLines(lines, key) {
  const keyPattern = new RegExp(`^\\s*["']?${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']?\\s*:\\s*(.+?)\\s*$`);
  for (const line of lines) {
    const match = line.match(keyPattern);
    if (match) return stripYamlValue(match[1]);
  }
  return "";
}

function findNestedScalar(lines, parentKey, childKey) {
  const parentBlock = findBlock(lines, parentKey);
  if (parentBlock.length === 0) return "";
  return findScalarInLines(parentBlock, childKey);
}

function findParameterDefault(lines, parameterName) {
  const block = findBlock(lines, parameterName);
  if (block.length === 0) return "";
  return findScalarInLines(block, "default");
}

function expandVariables(template, vars) {
  let output = template;
  for (let i = 0; i < 5; i++) {
    const before = output;
    for (const [key, value] of Object.entries(vars)) {
      output = output.split(`{${key}}`).join(value ?? "");
    }
    if (output === before) break;
  }
  return output;
}

function buildSpecIndex() {
  const specDir = path.join(specRepoRoot, "specification");
  const tspconfigs = walk(specDir);
  const index = new Map();
  const skipped = { noEmitter: 0, badPath: 0, parseError: 0 };

  for (const tspConfigPath of tspconfigs) {
    let content = "";
    try {
      content = fs.readFileSync(tspConfigPath, "utf8");
    } catch {
      skipped.parseError++;
      continue;
    }

    const lines = content.split(/\r?\n/);
    const tsBlock = findBlock(lines, "@azure-tools/typespec-ts");
    if (tsBlock.length === 0) {
      skipped.noEmitter++;
      continue;
    }

    const normalizedTspConfig = normalizePath(tspConfigPath);
    const isArm =
      normalizedTspConfig.includes("/resource-manager/") || normalizedTspConfig.includes(".Management/");
    if (!isArm) continue;

    const localSpecPath = normalizePath(path.dirname(tspConfigPath));
    const serviceDir =
      findScalarInLines(tsBlock, "service-dir") || findParameterDefault(lines, "service-dir");
    let packageDir = findScalarInLines(tsBlock, "package-dir");
    const emitterOutputDir = findScalarInLines(tsBlock, "emitter-output-dir");
    const packageName = findNestedScalar(tsBlock, "package-details", "name");

    let sdkRelative = "";
    if (serviceDir && packageDir) {
      sdkRelative = normalizePath(`${serviceDir}/${packageDir}`);
    } else if (emitterOutputDir) {
      const expanded = expandVariables(emitterOutputDir, {
        "service-dir": serviceDir || "",
        "project-root": localSpecPath,
        "output-dir": "",
        "package-dir": packageDir || "",
      });
      const segments = normalizePath(expanded).replace(/^\/+/, "").split("/").filter(Boolean);
      const sdkIndex = segments.indexOf("sdk");
      if (sdkIndex >= 0) {
        sdkRelative = segments.slice(sdkIndex).join("/");
      }
    }

    if (!sdkRelative) {
      skipped.badPath++;
      continue;
    }

    if (!index.has(sdkRelative)) {
      index.set(sdkRelative, {
        tspConfigPath,
        localSpecPath,
        isArm,
        packageName,
      });
    } else {
      const existing = index.get(sdkRelative);
      existing.duplicates = existing.duplicates || [];
      existing.duplicates.push(tspConfigPath);
    }
  }

  const armCount = [...index.values()].filter((entry) => entry.isArm).length;
  const duplicateCount = [...index.values()].filter((entry) => entry.duplicates?.length).length;
  console.log(`Spec index: scanned ${tspconfigs.length} tspconfig.yaml files`);
  console.log(`  Indexed: ${index.size} JS targets (${armCount} ARM, ${index.size - armCount} data-plane)`);
  console.log(
    `  Skipped: ${skipped.noEmitter} no typespec-ts emitter, ${skipped.parseError} parse errors, ${skipped.badPath} unresolvable paths`,
  );
  if (duplicateCount > 0) {
    console.log(`  Warning: ${duplicateCount} SDK targets are emit-targets of multiple specs`);
  }

  return index;
}

function runCommand(cmd, args, cwd, timeoutMs = 600000) {
  return new Promise((resolve) => {
    let output = "";
    let killedByTimeout = false;
    const proc = spawn(cmd, args, { cwd, shell: true });
    const timer = setTimeout(() => {
      killedByTimeout = true;
      try { proc.kill("SIGKILL"); } catch {}
    }, timeoutMs);
    proc.stdout.on("data", (d) => (output += d.toString()));
    proc.stderr.on("data", (d) => (output += d.toString()));
    proc.on("close", (code) => {
      clearTimeout(timer);
      if (killedByTimeout) {
        output += `\n[runner] killed by timeout after ${timeoutMs}ms\n`;
      }
      resolve({ code, output, timedOut: killedByTimeout });
    });
    proc.on("error", (err) => {
      clearTimeout(timer);
      resolve({ code: 1, output: `${output}\n${err.message}`, timedOut: false });
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

function isRetryableGitError(output) {
  return /git clone failed|fatal: early EOF|unable to access|Failed to connect|Could not connect to server|The remote end hung up unexpectedly/.test(
    output,
  );
}

// Sanitize a package directory like "sdk/foo/arm-foo" into a safe filename.
function safeLogName(pkg) {
  return pkg.replace(/[\\/]/g, "__");
}

// Write the full log for a single package to <resultOutputDir>/logs/<phase>/<pkg>.log,
// and also print an ADO-collapsible group with the full log for failed runs so
// developers can read it directly in the pipeline UI without downloading artifacts.
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
  if (!success) {
    // Azure DevOps collapsible group — folded by default.
    console.log(`##[group]${phase} log: ${pkg}`);
    console.log(output);
    console.log("##[endgroup]");
  }
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

function classifyPackages(specIndex) {
  // Find all arm-* directories under sdk/
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

  const existingSdkDirs = new Set(allArmDirs.map((dir) => normalizePath(dir)));
  const packages = [];
  const skipped = [];
  const rescued = [];

  for (const dir of allArmDirs) {
    const name = normalizePath(dir);
    const tspLocationPath = path.join(dir, "tsp-location.yaml");
    const hasTspLocation = fs.existsSync(tspLocationPath);
    let tspLocationProblem = "";

    if (hasTspLocation) {
      const content = fs.readFileSync(tspLocationPath, "utf8");
      if (/^\s*repo\s*:\s*\.\./m.test(content)) {
        tspLocationProblem = "relative repo";
      } else {
        const directoryMatch = content.match(/^\s*directory\s*:\s*(.+?)\s*$/m);
        if (!directoryMatch) {
          tspLocationProblem = "missing 'directory:' field";
        } else {
          const directory = directoryMatch[1].trim();
          const tspConfigFromLocation = path.join(specRepoRoot, directory, "tspconfig.yaml");
          if (!fs.existsSync(tspConfigFromLocation)) {
            tspLocationProblem = `stale path: ${directory}`;
          }
        }
      }
    }

    const specEntry = specIndex.get(name);
    if (specEntry) {
      if (tspLocationProblem) rescued.push({ name, reason: tspLocationProblem });
      packages.push({
        pkg: name,
        pkgDir: path.join(sdkRoot, dir),
        tspConfigPath: specEntry.tspConfigPath,
        localSpecPath: specEntry.localSpecPath,
        source: "spec-index",
      });
    } else if (hasTspLocation && !tspLocationProblem) {
      const content = fs.readFileSync(tspLocationPath, "utf8");
      const directory = content.match(/^\s*directory\s*:\s*(.+?)\s*$/m)[1].trim();
      const localSpecPath = normalizePath(path.join(specRepoRoot, directory));
      packages.push({
        pkg: name,
        pkgDir: path.join(sdkRoot, dir),
        tspConfigPath: path.join(localSpecPath, "tspconfig.yaml"),
        localSpecPath,
        source: "tsp-location",
      });
    } else {
      skipped.push({
        name,
        reason: !hasTspLocation ? "no tsp-location.yaml + not in spec index" : tspLocationProblem,
      });
    }
  }

  const newInSpec = [...specIndex.keys()].filter((sdkDir) => !existingSdkDirs.has(sdkDir)).sort();

  console.log("");
  console.log(`  ✅ Will run: ${packages.length} packages`);
  const bySource = packages.reduce((acc, pkg) => {
    acc[pkg.source] = (acc[pkg.source] || 0) + 1;
    return acc;
  }, {});
  for (const [source, count] of Object.entries(bySource)) {
    console.log(`       via ${source}: ${count}`);
  }

  if (rescued.length > 0) {
    console.log(`  💚 Rescued by spec index (had problematic tsp-location.yaml): ${rescued.length}`);
    for (const item of rescued) console.log(`       [RESCUED] ${item.name} — was: ${item.reason}`);
  }

  if (skipped.length > 0) {
    console.log(`  ❌ Skipped: ${skipped.length} packages`);
    for (const item of skipped) console.log(`       [SKIP] ${item.name} — ${item.reason}`);
  }

  if (newInSpec.length > 0) {
    console.log(`  ℹ️  Spec declares ${newInSpec.length} JS packages with no SDK dir yet (new/un-onboarded):`);
    for (const item of newInSpec) console.log(`       [NEW] ${item}`);
  }
  console.log("");

  return packages;
}

// When --directoryList is provided, read the JSON file and resolve packages
// using spec-index (preferred) or tsp-location.yaml (fallback).
// directoryList entries are "serviceArea/packageName" (e.g. "advisor/arm-advisor").
function classifyFromDirectoryList(directoryListPath, specIndex) {
  console.log(`Reading directory list from: ${directoryListPath}`);
  const entries = JSON.parse(fs.readFileSync(directoryListPath, "utf8"));
  if (!Array.isArray(entries) || entries.length === 0) {
    console.error("ERROR: directoryList is empty or not an array");
    process.exit(1);
  }
  console.log(`  Directory list contains ${entries.length} packages`);

  const packages = [];
  const skipped = [];

  for (const entry of entries) {
    // entry is "serviceArea/packageName", e.g. "advisor/arm-advisor"
    if (entry.includes("..") || path.isAbsolute(entry)) {
      console.error(`ERROR: invalid directory list entry (must be relative): ${entry}`);
      process.exit(1);
    }

    const dir = normalizePath(path.join("sdk", entry));
    const pkgDir = path.join(sdkRoot, "sdk", entry);

    if (!fs.existsSync(pkgDir)) {
      skipped.push({ name: dir, reason: "directory does not exist" });
      continue;
    }

    const specEntry = specIndex.get(dir);
    if (specEntry) {
      packages.push({
        pkg: dir,
        pkgDir,
        tspConfigPath: specEntry.tspConfigPath,
        localSpecPath: specEntry.localSpecPath,
        source: "spec-index",
      });
      continue;
    }

    // Fallback: use tsp-location.yaml
    const tspLocationPath = path.join(pkgDir, "tsp-location.yaml");
    if (fs.existsSync(tspLocationPath)) {
      const content = fs.readFileSync(tspLocationPath, "utf8");
      const directoryMatch = content.match(/^\s*directory\s*:\s*(.+?)\s*$/m);
      if (directoryMatch) {
        const directory = directoryMatch[1].trim();
        const localSpecPath = normalizePath(path.join(specRepoRoot, directory));
        const tspConfigPath = path.join(localSpecPath, "tspconfig.yaml");
        if (fs.existsSync(tspConfigPath)) {
          packages.push({
            pkg: dir,
            pkgDir,
            tspConfigPath,
            localSpecPath,
            source: "tsp-location",
          });
          continue;
        }
      }
    }

    skipped.push({ name: dir, reason: "not in spec-index and no valid tsp-location.yaml" });
  }

  console.log(`  ✅ Will run: ${packages.length} packages`);
  if (skipped.length > 0) {
    console.log(`  ❌ Skipped: ${skipped.length} packages`);
    for (const item of skipped) console.log(`       [SKIP] ${item.name} — ${item.reason}`);
  }
  console.log("");

  return packages;
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

    const maxAttempts = 3;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      if (attempt > 1) await new Promise((resolve) => setTimeout(resolve, 10000 * (attempt - 1)));

      const result = await runCommand(
        "tsp-client",
        ["init", "--update-if-exists", "-c", pkg.tspConfigPath, "--local-spec-repo", pkg.localSpecPath, "--debug"],
        pkg.pkgDir,
        regenTimeoutMs,
      );
      output += `\n===== Attempt ${attempt}/${maxAttempts} =====\n${result.output}`;
      output += `\nExit code: ${result.code}\n`;
      success = result.code === 0;

      // Do not retry on timeout-kill — it will just waste another full timeout.
      if (success || result.timedOut) break;
      if (!isRetryableGitError(result.output)) break;
    }

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
  console.log(`Building ${successPkgs.length} packages with ${maxWorkers} workers`);
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
  const pnpmInstall = await runCommand("pnpm", ["install", "--no-frozen-lockfile"], sdkRoot, 600000);
  if (pnpmInstall.code !== 0) {
    console.log("ERROR: pnpm install failed. Cannot proceed with build verification.");
    console.log(pnpmInstall.output.slice(-1000));
    return { buildResults: [], skipped: true };
  }
  console.log("pnpm install completed");

  // Pre-build fix 4: Build core dependencies first
  console.log("Pre-building core dependencies...");
  const coreFilters = [
    "@azure/core-rest-pipeline", "@azure/core-client", "@azure/core-auth",
    "@azure/core-lro", "@azure/logger", "@azure/core-paging"
  ];
  const coreArgs = ["build"];
  for (const f of coreFilters) { coreArgs.push("--filter", f); }
  const coreBuild = await runCommand("pnpm", coreArgs, sdkRoot, 300000);
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
    const build = await runCommand("pnpm", ["build", "--filter", filterName], sdkRoot, 600000);
    const duration = ((Date.now() - start) / 1000).toFixed(1);
    buildCompleted++;

    if (build.code === 0) {
      console.log(`  ✅ [BUILD ${buildCompleted}/${buildTotal}] ${pkg.pkg} - BUILD OK (${duration}s)`);
      buildResults.push({ pkg: pkg.pkg, success: true, duration, phase: "done", output: build.output });
    } else {
      console.log(`  ❌ [BUILD ${buildCompleted}/${buildTotal}] ${pkg.pkg} - BUILD FAILED (${duration}s)`);
      console.log(`     ${extractError(build.output)}`);
      buildResults.push({ pkg: pkg.pkg, success: false, duration, phase: "pnpm build", output: build.output });
    }
    recordPackageLog("build", pkg.pkg, build.code === 0, build.output);
  }

  for (const pkg of successPkgs) {
    const promise = buildPackage(pkg).then(() => {
      activePromises = activePromises.filter((p) => p !== promise);
    });
    activePromises.push(promise);
    if (activePromises.length >= maxWorkers) await Promise.race(activePromises);
  }
  await Promise.allSettled(activePromises);
  return { buildResults, skipped: false };
}

async function main() {
  detectNestedDuplicateWorkspaces();

  console.log("===== Step 3: Find & filter ARM packages =====");
  const specIndex = buildSpecIndex();
  let packages;

  if (directoryListFile) {
    // Matrix mode: package list provided by GenerateMatrix job
    console.log("(Matrix mode: using --directoryList)");
    packages = classifyFromDirectoryList(directoryListFile, specIndex);
  } else {
    // Single-job mode: scan all ARM packages
    packages = classifyPackages(specIndex);
    if (maxPackages > 0) {
      packages = packages.slice(0, maxPackages);
      console.log(`Limited to first ${maxPackages} packages`);
    }
  }

  console.log(`Processing ${packages.length} packages with ${maxWorkers} workers`);
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
