#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const { runCommand, extractError, recordPackageLog } = require("./lib/command-runner");
const {
  cleanupNestedDuplicateWorkspaces,
  scaffoldWarpConfigs,
  patchMissingDependencies,
  detectNestedDuplicateWorkspaces,
} = require("./lib/emitter-workarounds");
const { normalizePath } = require("./lib/utils");

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

const updateChangelogScript = path.join(sdkRoot, "eng", "scripts", "update-changelog-content.ps1");
const typeSpecSyncScript = path.join(sdkRoot, "eng", "common", "scripts", "TypeSpec-Project-Sync.ps1");
const typeSpecGenerateScript = path.join(sdkRoot, "eng", "common", "scripts", "TypeSpec-Project-Generate.ps1");

// Run `update-changelog --sdkRepoPath <repo> --packagePath <pkg>` for a single
// package. Returns { success, hasBreaking, hasChanges, output }. Never throws;
// any failure is recorded and the caller decides what to do.
async function runUpdateChangelog(packageRelPath) {
  if (!fs.existsSync(updateChangelogScript)) {
    return { success: false, hasBreaking: false, hasChanges: false, output: "(update-changelog-content.ps1 not found)" };
  }
  const packageAbsPath = path.join(sdkRoot, packageRelPath);
  const result = await runCommand(
    "pwsh",
    [
      "-File",
      updateChangelogScript,
      "-SdkRepoPath",
      sdkRoot,
      "-PackagePath",
      packageAbsPath,
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
function classifySdkDirs(sdkDirs) {
  const packages = [];
  const skippedNoTspLocation = [];

  for (const dir of sdkDirs) {
    const r = resolvePackageFromTspLocation(dir);
    if (r.ok) packages.push(r.package);
    else skippedNoTspLocation.push({ name: normalizePath(dir), reason: r.reason });
  }

  return { packages, skippedNoTspLocation };
}

function logClassificationSummary(packages, skippedNoTspLocation, options = {}) {
  const {
    includeResolvedMessage = false,
    skippedLabel = "packages without a usable tsp-location.yaml",
    showOnboardingNote = false,
  } = options;
  console.log("");
  console.log(`  ✅ Will run: ${packages.length} packages${includeResolvedMessage ? " (resolved via tsp-location.yaml)" : ""}`);
  if (skippedNoTspLocation.length > 0) {
    console.log(`  ⚠️  Skipped: ${skippedNoTspLocation.length} ${skippedLabel}`);
    if (showOnboardingNote) {
      console.log("     (these are surfaced in the PR description for follow-up on-boarding)");
    }
    for (const item of skippedNoTspLocation) console.log(`       [SKIP] ${item.name} — ${item.reason}`);
  }
  console.log("");
}

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
  const classified = classifySdkDirs(allArmDirs);
  logClassificationSummary(classified.packages, classified.skippedNoTspLocation, {
    includeResolvedMessage: true,
    skippedLabel: "arm-* packages without a usable tsp-location.yaml",
    showOnboardingNote: true,
  });
  return classified;
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

  const sdkDirs = [];
  const skippedBeforeResolve = [];

  for (const entry of entries) {
    if (entry.includes("..") || path.isAbsolute(entry)) {
      console.error(`ERROR: invalid directory list entry (must be relative): ${entry}`);
      process.exit(1);
    }

    const sdkDir = normalizePath(path.join("sdk", entry));
    if (!fs.existsSync(path.join(sdkRoot, sdkDir))) {
      skippedBeforeResolve.push({ name: sdkDir, reason: "directory does not exist" });
      continue;
    }
    sdkDirs.push(sdkDir);
  }

  const classified = classifySdkDirs(sdkDirs);
  const skippedNoTspLocation = [...skippedBeforeResolve, ...classified.skippedNoTspLocation];
  logClassificationSummary(classified.packages, skippedNoTspLocation);
  return { packages: classified.packages, skippedNoTspLocation };
}

async function runWithConcurrency(items, limit, worker) {
  const effectiveLimit = limit > 0 ? limit : 1;
  let activePromises = [];

  for (const item of items) {
    const promise = Promise.resolve(worker(item)).then(() => {
      activePromises = activePromises.filter((p) => p !== promise);
    });
    activePromises.push(promise);
    if (activePromises.length >= effectiveLimit) await Promise.race(activePromises);
  }

  await Promise.allSettled(activePromises);
}

async function runRegenerateForPackage(pkg, context) {
  const start = Date.now();
  let output = "";

  output += `Package dir   : ${pkg.pkgDir}\n`;
  output += `Spec source   : ${pkg.source}\n`;
  output += `local-spec    : ${context.specRepoRoot}\n`;
  output += `sync script   : ${context.typeSpecSyncScript}\n`;
  output += `generate script: ${context.typeSpecGenerateScript}\n`;

  const sync = await runCommand("pwsh", ["-File", context.typeSpecSyncScript, pkg.pkgDir, context.specRepoRoot], context.sdkRoot);
  output += `\n===== TypeSpec-Project-Sync.ps1 =====\n${sync.output}\nExit code: ${sync.code}\n`;
  if (sync.code !== 0) {
    const completed = ++context.completedCounter.value;
    const duration = ((Date.now() - start) / 1000).toFixed(1);
    console.log(`  ❌ [${completed}/${context.totalPackages}] ${pkg.pkg} - FAILED (${duration}s)`);
    console.log(`     ${extractError(output)}`);
    recordPackageLog({ phase: "regenerate", pkg: pkg.pkg, success: false, output, resultOutputDir: context.resultOutputDir });
    return { pkg: pkg.pkg, success: false, duration, output };
  }

  const generate = await runCommand("pwsh", ["-File", context.typeSpecGenerateScript, pkg.pkgDir], context.sdkRoot);
  output += `\n===== TypeSpec-Project-Generate.ps1 =====\n${generate.output}\nExit code: ${generate.code}\n`;
  const success = generate.code === 0;
  const duration = ((Date.now() - start) / 1000).toFixed(1);
  const completed = ++context.completedCounter.value;

  if (success) {
    console.log(`  ✅ [${completed}/${context.totalPackages}] ${pkg.pkg} - SUCCESS (${duration}s)`);
  } else {
    console.log(`  ❌ [${completed}/${context.totalPackages}] ${pkg.pkg} - FAILED (${duration}s)`);
    console.log(`     ${extractError(output)}`);
  }

  recordPackageLog({ phase: "regenerate", pkg: pkg.pkg, success, output, resultOutputDir: context.resultOutputDir });
  return { pkg: pkg.pkg, success, duration, output };
}

async function regenerateAll(packages) {
  console.log("===== Step 4: Regeneration (TypeSpec-Project-Sync + TypeSpec-Project-Generate) =====");

  const results = [];
  const context = {
    sdkRoot,
    specRepoRoot,
    typeSpecSyncScript,
    typeSpecGenerateScript,
    resultOutputDir,
    completedCounter: { value: 0 },
    totalPackages: packages.length,
  };

  await runWithConcurrency(packages, maxWorkers, async (pkg) => {
    results.push(await runRegenerateForPackage(pkg, context));
  });

  console.log("##[section]All per-package regenerate logs complete");
  return results;
}

async function runBuildForPackage(pkg, context) {
  const pkgDir = path.join(context.sdkRoot, pkg.pkg);
  let filterName = pkg.pkg;
  try {
    const packageJson = JSON.parse(fs.readFileSync(path.join(pkgDir, "package.json"), "utf8"));
    if (packageJson.name) filterName = packageJson.name;
  } catch {}

  const start = Date.now();
  const build = await runCommand("pnpm", ["turbo", "build", "--filter", `${filterName}...`, "--token", "1"], context.sdkRoot);
  const duration = ((Date.now() - start) / 1000).toFixed(1);
  const completed = ++context.completedCounter.value;

  let result;
  if (build.code === 0) {
    console.log(`  ✅ [BUILD ${completed}/${context.buildTotal}] ${pkg.pkg} - BUILD OK (${duration}s)`);
    const cl = await context.runUpdateChangelog(pkg.pkg);
    const changelog = { success: cl.success, hasBreaking: cl.hasBreaking, hasChanges: cl.hasChanges };
    if (cl.success) {
      const marker = cl.hasBreaking ? "⚠️ breaking" : cl.hasChanges ? "changes" : "no changes";
      console.log(`     changelog: ${marker}`);
    } else {
      console.log("     changelog: FAILED (see log)");
    }
    recordPackageLog({ phase: "changelog", pkg: pkg.pkg, success: cl.success, output: cl.output, resultOutputDir: context.resultOutputDir });
    result = { pkg: pkg.pkg, success: true, duration, phase: "done", output: build.output, changelog };
  } else {
    console.log(`  ❌ [BUILD ${completed}/${context.buildTotal}] ${pkg.pkg} - BUILD FAILED (${duration}s)`);
    console.log(`     ${extractError(build.output)}`);
    result = { pkg: pkg.pkg, success: false, duration, phase: "pnpm turbo build", output: build.output, changelog: null };
  }

  recordPackageLog({ phase: "build", pkg: pkg.pkg, success: build.code === 0, output: build.output, resultOutputDir: context.resultOutputDir });
  return result;
}

async function buildAll(regenResults) {
  const successPkgs = regenResults.filter((result) => result.success);
  if (skipBuild || successPkgs.length === 0) {
    if (skipBuild) console.log("Build verification skipped (SkipBuild=true)");
    return { buildResults: [], skipped: true };
  }

  console.log("");
  console.log("===== Step 5: Build Verification (pnpm turbo build --filter ... --token 1) =====");
  console.log(`Building ${successPkgs.length} packages with ${buildWorkers} workers`);
  console.log("");

  console.log("Cleaning up nested duplicate workspace directories...");
  const nestedRemoved = cleanupNestedDuplicateWorkspaces(sdkRoot);
  if (nestedRemoved === 0) {
    console.log("  No nested duplicate workspaces found.");
  }

  console.log("Scaffolding missing config/tsconfig files...");
  scaffoldWarpConfigs(sdkRoot);

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

  const buildResults = [];
  const context = {
    sdkRoot,
    resultOutputDir,
    buildTotal: successPkgs.length,
    completedCounter: { value: 0 },
    runUpdateChangelog,
  };

  await runWithConcurrency(successPkgs, buildWorkers, async (pkg) => {
    buildResults.push(await runBuildForPackage(pkg, context));
  });

  console.log("##[section]All per-package build logs complete");
  return { buildResults, skipped: false };
}

function buildResultSummary({
  packages,
  skippedNoTspLocation,
  regenResults,
  regenSuccess,
  regenFail,
  buildResults,
  buildSkipped,
  buildOk,
  buildFail,
}) {
  return {
    emitterVersion,
    directoryList: directoryListFile || null,
    packages: packages.map((p) => p.pkg),
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
}

async function main() {
  detectNestedDuplicateWorkspaces(sdkRoot);

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
  console.log("--- Regeneration (TypeSpec-Project-Sync + TypeSpec-Project-Generate) ---");
  console.log(`Total: ${packages.length} | Success: ${regenSuccess} | Failed: ${regenFail}`);
  console.log(`Success Rate: ${packages.length === 0 ? "0.0" : ((regenSuccess * 100) / packages.length).toFixed(1)}%`);

  if (!buildSkipped && regenSuccess > 0) {
    console.log("");
    console.log("--- Build Verification (pnpm turbo build) ---");
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
    const resultSummary = buildResultSummary({
      packages,
      skippedNoTspLocation,
      regenResults,
      regenSuccess,
      regenFail,
      buildResults,
      buildSkipped,
      buildOk,
      buildFail,
    });

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
