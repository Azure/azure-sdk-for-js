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
    const proc = spawn(cmd, args, { cwd, shell: true, timeout: timeoutMs });
    proc.stdout.on("data", (d) => (output += d.toString()));
    proc.stderr.on("data", (d) => (output += d.toString()));
    proc.on("close", (code) => resolve({ code, output }));
    proc.on("error", (err) => resolve({ code: 1, output: `${output}\n${err.message}` }));
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

  return "Unknown error";
}

function isRetryableGitError(output) {
  return /git clone failed|fatal: early EOF|unable to access|Failed to connect|Could not connect to server|The remote end hung up unexpectedly/.test(
    output,
  );
}

function detectNestedDuplicateWorkspaces() {
  const packageJsonPaths = execSync(
    'find sdk -path "*/node_modules/*" -prune -o -path "sdk/*/*/sdk/*/*/package.json" -print',
    { encoding: "utf8" },
  )
    .trim()
    .split("\n")
    .filter(Boolean);

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
  const allArmDirs = execSync('find sdk -path "*/node_modules/*" -prune -o -type d -name "arm-*" -print', {
    encoding: "utf8",
  })
    .trim()
    .split("\n")
    .filter(Boolean)
    .sort();

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

async function regenerateAll(packages) {
  console.log("===== Step 4: Regeneration (tsp-client init --update-if-exists) =====");
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
      );
      output += `\n===== Attempt ${attempt}/${maxAttempts} =====\n${result.output}`;
      output += `\nExit code: ${result.code}\n`;
      success = result.code === 0;

      if (success || !isRetryableGitError(result.output)) break;
    }

    const duration = ((Date.now() - start) / 1000).toFixed(1);
    completed++;
    if (success) {
      console.log(`  ✅ [${completed}/${packages.length}] ${pkg.pkg} - SUCCESS (${duration}s)`);
    } else {
      console.log(`  ❌ [${completed}/${packages.length}] ${pkg.pkg} - FAILED (${duration}s)`);
      console.log(`     ${extractError(output)}`);
    }
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

  console.log("Running pnpm install at repo root...");
  const pnpmInstall = await runCommand("pnpm", ["install", "--no-frozen-lockfile"], sdkRoot, 600000);
  if (pnpmInstall.code !== 0) {
    console.log("ERROR: pnpm install failed. Cannot proceed with build verification.");
    console.log(pnpmInstall.output.slice(-1000));
    return { buildResults: [], skipped: true };
  }
  console.log("pnpm install completed");

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
  let packages = classifyPackages(specIndex);

  if (maxPackages > 0) {
    packages = packages.slice(0, maxPackages);
    console.log(`Limited to first ${maxPackages} packages`);
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

  if (regenFail > 0 || buildFail > 0) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
