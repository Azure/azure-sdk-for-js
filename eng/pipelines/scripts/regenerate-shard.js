#!/usr/bin/env node
// Sole script for sdk-regenerate.yml. The YAML only checks out, installs node,
// and dispatches to one of the subcommands at the bottom of this file.
// Per-emitter-bug workarounds do NOT live here; see UPSTREAM-ISSUES.md.

const { spawn, spawnSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");

const SDK_ROOT = process.cwd();
const EMITTER_PACKAGE_NAME = "@azure-tools/typespec-ts";
const EMITTER_PACKAGE_JSON_PATH = path.join(SDK_ROOT, "eng/emitter-package.json");
const EMITTER_OVERRIDES_JSON_PATH = path.join(SDK_ROOT, "eng/emitter-overrides.json");
const TYPESPEC_SYNC_SCRIPT = path.join(SDK_ROOT, "eng/common/scripts/TypeSpec-Project-Sync.ps1");
const TYPESPEC_GENERATE_SCRIPT = path.join(SDK_ROOT, "eng/common/scripts/TypeSpec-Project-Generate.ps1");
const RELEASE_TOOLS_DIR = "eng/tools/js-sdk-release-tools";
const DEV_VERSION_SENTINELS = new Set(["", "empty", "latest", "auto", "dev"]);

// ─────────────────────────────────────────────────────────────────────────────
// Tiny helpers
// ─────────────────────────────────────────────────────────────────────────────

/** Read a --name value from process.argv (returns defaultValue if absent). */
function getFlag(flagName, defaultValue = "") {
  const flagIndex = process.argv.indexOf(flagName);
  return flagIndex >= 0 && flagIndex + 1 < process.argv.length
    ? process.argv[flagIndex + 1]
    : defaultValue;
}

/** Run a command and capture stdout+stderr into one string. Never rejects. */
function runCommandCapturing(command, commandArgs, workingDirectory) {
  return new Promise((resolve) => {
    let combinedOutput = "";
    const child = spawn(command, commandArgs, { cwd: workingDirectory })
    child.stdout.on("data", (chunk) => (combinedOutput += chunk));
    child.stderr.on("data", (chunk) => (combinedOutput += chunk));
    child.on("close", (exitCode) => resolve({ exitCode, output: combinedOutput }));
    child.on("error", (err) =>
      resolve({ exitCode: 1, output: combinedOutput + `\nspawn error: ${err.message}` })
    );
  });
}

/** Run a shell command line; stream to agent log; abort on non-zero exit. */
function runShell(commandLine, workingDirectory) {
  console.log(`+ ${commandLine}`);
  const result = spawnSync(commandLine, {
    cwd: workingDirectory || process.cwd(),
    shell: true,
    stdio: "inherit",
  });
  if (result.status !== 0) {
    console.error(`##[error]exit ${result.status}: ${commandLine}`);
    process.exit(result.status || 1);
  }
}

/** Like runShell but DOES NOT echo the command line. Use when args carry secrets. */
function runShellNoEcho(command, commandArgs, workingDirectory) {
  const result = spawnSync(command, commandArgs, {
    cwd: workingDirectory || process.cwd(),
    stdio: "inherit",
  });
  if (result.status !== 0) {
    console.error(`##[error]exit ${result.status}: ${command}`);
    process.exit(result.status || 1);
  }
}

/** Run `worker(item)` over `items` with at most `concurrency` in flight. */
async function runWithConcurrency(items, concurrency, worker) {
  const inFlight = new Set();
  for (const item of items) {
    const task = Promise.resolve(worker(item)).finally(() => inFlight.delete(task));
    inFlight.add(task);
    if (inFlight.size >= concurrency) await Promise.race(inFlight);
  }
  await Promise.allSettled(inFlight);
}

/** Recursive readdir — calls visitor(absolutePath) for every file under rootDir. */
function walkFiles(rootDir, visitor) {
  if (!fs.existsSync(rootDir)) return;
  for (const entry of fs.readdirSync(rootDir, { withFileTypes: true })) {
    const fullPath = path.join(rootDir, entry.name);
    if (entry.isDirectory()) walkFiles(fullPath, visitor);
    else visitor(fullPath);
  }
}

/** Wrap a chunk of output in an ADO collapsible log group. */
function logCollapsedGroup(title, body) {
  console.log(`##[group]${title}\n${body}\n##[endgroup]`);
}

/** Emit an ADO `setvariable` log command. */
function setPipelineVariable(name, value, { isOutput = false, isSecret = false } = {}) {
  const flags = [
    isOutput ? "isOutput=true" : null,
    isSecret ? "issecret=true" : null,
  ].filter(Boolean).join(";");
  const prefix = flags ? `;${flags}` : "";
  console.log(`##vso[task.setvariable variable=${name}${prefix}]${value}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// Subcommand: resolve-emitter
// Resolve the EmitterVersion pipeline parameter to a concrete npm version.
// Sentinel values ("", "empty", "latest", "auto", "dev") mean: look up the
// current `dev` dist-tag of @azure-tools/typespec-ts.
// ─────────────────────────────────────────────────────────────────────────────

async function runResolveEmitter() {
  const rawInputVersion = getFlag("--input", "");
  const normalizedInputVersion = rawInputVersion.trim().toLowerCase();

  let resolvedEmitterVersion;
  if (DEV_VERSION_SENTINELS.has(normalizedInputVersion)) {
    resolvedEmitterVersion = await fetchLatestEmitterDevVersion();
  } else {
    resolvedEmitterVersion = rawInputVersion.trim();
  }

  console.log(`Emitter version: ${resolvedEmitterVersion}`);
  setPipelineVariable("emitterVersion", resolvedEmitterVersion, { isOutput: true });
}

async function fetchLatestEmitterDevVersion() {
  const { exitCode, output } = await runCommandCapturing(
    "npm",
    ["view", "@azure-tools/typespec-ts", "dist-tags.dev"],
    process.cwd()
  );
  const version = output.trim();
  if (exitCode !== 0 || !version) {
    console.error("##[error]npm view returned empty dev tag");
    process.exit(1);
  }
  return version;
}

// ─────────────────────────────────────────────────────────────────────────────
// Subcommand: prepare
// Per-agent setup before any shard work runs.
// ─────────────────────────────────────────────────────────────────────────────

function runPrepare() {
  const emitterVersion = getFlag("--emitterVersion");
  const specRepoBranch = getFlag("--specRepoBranch", "main");
  const specRepoCloneDir = getFlag("--specRepoRoot");
  if (!emitterVersion || !specRepoCloneDir) {
    console.error("ERROR: --emitterVersion and --specRepoRoot are required");
    process.exit(2);
  }

  installGlobalCliTools();
  regenerateEmitterPackageFiles(emitterVersion);
  preinstallReleaseTools();
  shallowCloneSpecRepo(specRepoBranch, specRepoCloneDir);
}

function installGlobalCliTools() {
  runShell("npm install -g @azure-tools/typespec-client-generator-cli pnpm");
  // Dev emitter has peer-dep drift; tolerate it for every npm call on this agent.
  runShell("npm config set legacy-peer-deps true");
}

// Mirrors azure-sdk-for-net's archetype-typespec-emitter.yml — `tsp-client
// generate-config-files` (a) updates eng/emitter-package.json with the resolved
// emitter version, (b) pins every peerDependency of the emitter to the version
// listed in the emitter's own devDependencies (this auto-pins @typespec/xml so
// the runtime require() in typespec-client-generator-core resolves), and
// (c) regenerates emitter-package-lock.json. Any extra forced versions live in
// eng/emitter-overrides.json (committed, optional).
function regenerateEmitterPackageFiles(emitterVersion) {
  const emitterPackageJsonPath = downloadEmitterPackageJsonFromNpm(emitterVersion);
  const overridesFlag = fs.existsSync(EMITTER_OVERRIDES_JSON_PATH)
    ? `--overrides "${EMITTER_OVERRIDES_JSON_PATH}"`
    : "";
  runShell(
    `tsp-client generate-config-files ` +
    `--package-json "${emitterPackageJsonPath}" ` +
    `--emitter-package-json-path "${EMITTER_PACKAGE_JSON_PATH}" ` +
    overridesFlag,
    SDK_ROOT
  );
}

function downloadEmitterPackageJsonFromNpm(emitterVersion) {
  const stagingDir = fs.mkdtempSync(path.join(os.tmpdir(), "tsp-emitter-"));
  runShell(`npm pack ${EMITTER_PACKAGE_NAME}@${emitterVersion}`, stagingDir);
  const tarball = fs.readdirSync(stagingDir).find((name) => name.endsWith(".tgz"));
  if (!tarball) {
    console.error(`##[error]npm pack did not produce a tarball in ${stagingDir}`);
    process.exit(1);
  }
  runShell(`tar -xf "${tarball}" -C "${stagingDir}"`, stagingDir);
  return path.join(stagingDir, "package", "package.json");
}

function preinstallReleaseTools() {
  // Pre-install js-sdk-release-tools once so every shard's update-changelog reuses the same node_modules.
  runShell(`npm --prefix ${RELEASE_TOOLS_DIR} ci`, SDK_ROOT);
}

function shallowCloneSpecRepo(branch, cloneDir) {
  runShellNoEcho("git", [
    "clone", "--depth", "1", "--branch", branch,
    "https://github.com/Azure/azure-rest-api-specs.git", cloneDir,
  ]);
}

// ─────────────────────────────────────────────────────────────────────────────
// Subcommand: shard
// Heavy lifter — runs once per matrix shard.
// Phases: regenerate (fan-out) → build (turbo, batched) → changelog (fan-out).
// ─────────────────────────────────────────────────────────────────────────────

async function runShard() {
  const specRepoCloneDir = getFlag("--specRepoRoot");
  const directoryListFile = getFlag("--directoryList");
  const shardResultDir = getFlag("--resultOutputDir");
  const perPackageConcurrency = parsePositiveInt(getFlag("--maxWorkers", "2"));
  const turboBuildConcurrency = parsePositiveInt(getFlag("--buildConcurrency", "2"));
  const skipBuild = getFlag("--skipBuild", "false").toLowerCase() === "true";
  const patchScope = getFlag("--pushMode", "api-md");

  requireReadablePath("--specRepoRoot", specRepoCloneDir);
  requireReadablePath("--directoryList", directoryListFile);

  const shardPackages = loadShardPackages(directoryListFile);
  console.log(`Shard packages: ${shardPackages.length}`);

  const regenerationOutcomes = await regenerateAll(shardPackages, perPackageConcurrency, specRepoCloneDir);
  const successfullyRegenerated = regenerationOutcomes.filter((p) => p.success);

  const buildOutcome = (skipBuild || successfullyRegenerated.length === 0)
    ? { skipped: true, builtPackages: [], failedPackages: [] }
    : await buildRegeneratedPackages(shardPackages, successfullyRegenerated, turboBuildConcurrency);

  const changelogOutcomes = buildOutcome.skipped
    ? []
    : await generateChangelogsForBuilt(successfullyRegenerated, buildOutcome.builtPackages, perPackageConcurrency);

  const shardSummary = composeShardSummary({
    shardPackages,
    regenerationOutcomes,
    buildOutcome,
    changelogOutcomes,
  });

  if (shardResultDir) {
    writeShardSummaryAndPatch(shardResultDir, shardSummary, patchScope);
  }

  console.log("\n========== SHARD SUMMARY ==========\n" + JSON.stringify(shardSummary, null, 2));

  const anyFailure =
    shardSummary.regeneration.failed > 0 || (shardSummary.build && shardSummary.build.failed > 0);
  if (anyFailure) process.exit(1);
}

function parsePositiveInt(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

function requireReadablePath(flagName, value) {
  if (!value || !fs.existsSync(value)) {
    console.error(`ERROR: ${flagName} not found: ${value}`);
    process.exit(1);
  }
}

function loadShardPackages(directoryListFile) {
  const relativePackagePaths = JSON.parse(fs.readFileSync(directoryListFile, "utf8"));
  return relativePackagePaths.map(buildPackageDescriptor).filter(Boolean);
}

function buildPackageDescriptor(sdkRelativePath) {
  const packageDir = path.join(SDK_ROOT, "sdk", sdkRelativePath);
  if (!fs.existsSync(path.join(packageDir, "tsp-location.yaml"))) return null;
  let npmPackageName = `sdk/${sdkRelativePath}`;
  try {
    const packageJson = JSON.parse(fs.readFileSync(path.join(packageDir, "package.json"), "utf8"));
    if (packageJson.name) npmPackageName = packageJson.name;
  } catch {
    // package.json may not exist yet on first regen
  }
  return { sdkPath: `sdk/${sdkRelativePath}`, packageDir, npmPackageName };
}

// ── Phase 1: regenerate ─────────────────────────────────────────────────────

async function regenerateAll(packages, concurrency, specRepoCloneDir) {
  console.log(`\n===== Regenerate (concurrency=${concurrency}) =====`);
  const outcomes = [];
  const completedCount = { value: 0 };
  await runWithConcurrency(packages, concurrency, async (pkg) => {
    outcomes.push(await regenerateOnePackage(pkg, specRepoCloneDir, completedCount, packages.length));
  });
  return outcomes;
}

async function regenerateOnePackage(pkg, specRepoCloneDir, completedCount, totalPackageCount) {
  const startedAtMs = Date.now();

  const syncResult = await runCommandCapturing(
    "pwsh", ["-File", TYPESPEC_SYNC_SCRIPT, pkg.packageDir, specRepoCloneDir], SDK_ROOT);
  let combinedLog = `===== TypeSpec-Project-Sync =====\n${syncResult.output}\nExit: ${syncResult.exitCode}\n`;
  let success = syncResult.exitCode === 0;

  if (success) {
    const generateResult = await runCommandCapturing(
      "pwsh", ["-File", TYPESPEC_GENERATE_SCRIPT, pkg.packageDir], SDK_ROOT);
    combinedLog += `\n===== TypeSpec-Project-Generate =====\n${generateResult.output}\nExit: ${generateResult.exitCode}\n`;
    success = generateResult.exitCode === 0;
  }

  const durationSeconds = ((Date.now() - startedAtMs) / 1000).toFixed(1);
  completedCount.value += 1;
  console.log(`  ${success ? "✅" : "❌"} [${completedCount.value}/${totalPackageCount}] ${pkg.sdkPath} (${durationSeconds}s)`);
  logCollapsedGroup(`regen log: ${pkg.sdkPath}`, combinedLog);

  const errorTail = success ? null : extractLastNonEmptyLines(combinedLog, 25);
  return { ...pkg, success, errorTail };
}

function extractLastNonEmptyLines(text, lineCount) {
  return text.split("\n")
    .map((line) => line.replace(/\s+$/, ""))
    .filter(Boolean)
    .slice(-lineCount)
    .join("\n");
}

// ── Phase 2: build ──────────────────────────────────────────────────────────

async function buildRegeneratedPackages(allPackages, successfullyRegenerated, turboConcurrency) {
  console.log(`\n===== Build (pnpm turbo, concurrency=${turboConcurrency}) =====`);

  // Stale TempTypeSpecFiles/<svc>/package.json pin unpublished dev versions of
  // @azure-tools/typespec-ts. pnpm install would then 401 from the internal
  // feed and skip the whole shard build. See UPSTREAM-ISSUES.md §9.
  removeStaleTempTypespecDirs(allPackages);

  const installResult = await runCommandCapturing("pnpm", ["install", "--no-frozen-lockfile"], SDK_ROOT);
  if (installResult.exitCode !== 0) {
    logCollapsedGroup("pnpm install output", installResult.output.slice(-2000));
    return { skipped: true, builtPackages: [], failedPackages: [] };
  }

  const turboFilters = successfullyRegenerated.flatMap((pkg) => ["--filter", `${pkg.npmPackageName}...`]);
  const buildResult = await runCommandCapturing(
    "pnpm",
    ["turbo", "build", ...turboFilters, "--token", "1", `--concurrency=${turboConcurrency}`],
    SDK_ROOT
  );
  logCollapsedGroup("turbo build output", buildResult.output.slice(-4000));

  // Turbo's exit code reflects the whole batch — per-pkg attribution isn't
  // worth it (matches Go/.NET regen pipelines).
  const regeneratedSdkPaths = successfullyRegenerated.map((p) => p.sdkPath);
  return buildResult.exitCode === 0
    ? { skipped: false, builtPackages: regeneratedSdkPaths, failedPackages: [] }
    : { skipped: false, builtPackages: [], failedPackages: regeneratedSdkPaths };
}

function removeStaleTempTypespecDirs(packages) {
  for (const pkg of packages) {
    const tempDir = path.join(pkg.packageDir, "TempTypeSpecFiles");
    if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

// ── Phase 3: changelog ──────────────────────────────────────────────────────

async function generateChangelogsForBuilt(successfullyRegenerated, builtSdkPaths, concurrency) {
  const builtSdkPathSet = new Set(builtSdkPaths);
  const packagesNeedingChangelog = successfullyRegenerated.filter((p) => builtSdkPathSet.has(p.sdkPath));
  if (packagesNeedingChangelog.length === 0) return [];

  console.log(`\n===== Changelog (${packagesNeedingChangelog.length} packages) =====`);
  const outcomes = [];
  await runWithConcurrency(packagesNeedingChangelog, concurrency, async (pkg) => {
    outcomes.push(await generateChangelogForOnePackage(pkg));
  });
  return outcomes;
}

async function generateChangelogForOnePackage(pkg) {
  // Invoking the bin directly bypasses eng/scripts/update-changelog-content.ps1's
  // Windows backslash bug (UPSTREAM-ISSUES.md §3).
  const result = await runCommandCapturing("npm", [
    "--prefix", RELEASE_TOOLS_DIR, "exec", "--no", "--",
    "update-changelog", "--sdkRepoPath", SDK_ROOT, "--packagePath", pkg.packageDir,
  ], SDK_ROOT);

  const { hasBreakingChanges, breakingChangesText } = extractBreakingChangesFromChangelog(pkg.packageDir);

  logCollapsedGroup(`changelog log: ${pkg.sdkPath}`, result.output);
  return {
    pkg: pkg.sdkPath,
    success: result.exitCode === 0,
    hasBreaking: hasBreakingChanges,
    breakingText: breakingChangesText,
  };
}

function extractBreakingChangesFromChangelog(packageDir) {
  const empty = { hasBreakingChanges: false, breakingChangesText: "" };
  const changelogPath = path.join(packageDir, "CHANGELOG.md");
  if (!fs.existsSync(changelogPath)) return empty;

  try {
    const changelogTop = fs.readFileSync(changelogPath, "utf8").split("\n").slice(0, 200).join("\n");
    const firstVersionHeadingIndex = changelogTop.indexOf("\n## ");
    const secondVersionHeadingIndex = firstVersionHeadingIndex >= 0
      ? changelogTop.indexOf("\n## ", firstVersionHeadingIndex + 1)
      : -1;
    const topUnreleasedSection = firstVersionHeadingIndex < 0
      ? changelogTop
      : changelogTop.slice(0, secondVersionHeadingIndex > 0 ? secondVersionHeadingIndex : changelogTop.length);

    const breakingChangesMatch = topUnreleasedSection.match(
      /^###\s+Breaking Changes\b[^\n]*\n([\s\S]*?)(?=\n###\s|\n##\s|$)/m
    );
    return breakingChangesMatch
      ? { hasBreakingChanges: true, breakingChangesText: breakingChangesMatch[1].trim() }
      : empty;
  } catch {
    return empty;
  }
}

// ── Compose shard outputs ───────────────────────────────────────────────────

function composeShardSummary({ shardPackages, regenerationOutcomes, buildOutcome, changelogOutcomes }) {
  const regenerationFailures = regenerationOutcomes
    .filter((o) => !o.success)
    .map((o) => ({ pkg: o.sdkPath, errorTail: o.errorTail }));

  const summary = {
    packages: shardPackages.map((p) => p.sdkPath),
    regeneration: {
      total: shardPackages.length,
      success: regenerationOutcomes.length - regenerationFailures.length,
      failed: regenerationFailures.length,
      failures: regenerationFailures,
    },
    build: buildOutcome.skipped ? null : {
      total: buildOutcome.builtPackages.length + buildOutcome.failedPackages.length,
      success: buildOutcome.builtPackages.length,
      failed: buildOutcome.failedPackages.length,
      failures: buildOutcome.failedPackages.map((sdkPath) => ({ pkg: sdkPath })),
    },
    changelog: buildOutcome.skipped ? null : {
      total: changelogOutcomes.length,
      generated: changelogOutcomes.filter((o) => o.success).length,
      failed: changelogOutcomes.filter((o) => !o.success).map((o) => o.pkg),
      withBreaking: changelogOutcomes.filter((o) => o.success && o.hasBreaking).length,
      breakingPackages: changelogOutcomes
        .filter((o) => o.success && o.hasBreaking)
        .map((o) => ({ pkg: o.pkg, breakingText: o.breakingText })),
    },
  };
  return summary;
}

function writeShardSummaryAndPatch(shardResultDir, shardSummary, patchScope) {
  fs.mkdirSync(shardResultDir, { recursive: true });
  fs.writeFileSync(path.join(shardResultDir, "result.json"), JSON.stringify(shardSummary, null, 2));

  const gitDiffArgs = patchScope === "api-md"
    ? ["diff", "--binary", "--",
       ":(glob)sdk/**/review/*.api.md",
       ":(glob)sdk/**/CHANGELOG.md"]
    : ["diff", "--binary", "--", "sdk/"];
  const gitDiffResult = spawnSync("git", gitDiffArgs, {
    cwd: SDK_ROOT, encoding: "buffer", maxBuffer: 256 * 1024 * 1024,
  });
  if (gitDiffResult.status === 0) {
    fs.writeFileSync(path.join(shardResultDir, "changes.patch"), gitDiffResult.stdout);
  } else {
    console.log(`git diff failed (exit ${gitDiffResult.status}); skipping patch`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Subcommand: aggregate
// Walks all shards' result.json files and writes:
//   aggregated-results.json   machine-readable
//   pr-body.md                PR description
// Does NOT exit non-zero on regen/build failures — we still want the PR for
// whatever DID succeed, with the failure list embedded in pr-body.md.
// ─────────────────────────────────────────────────────────────────────────────

function runAggregate() {
  const shardArtifactsRoot = getFlag("--workspace");
  const outDir = getFlag("--outDir");
  const emitterVersion = getFlag("--emitterVersion");
  const patchScope = getFlag("--pushMode", "api-md");
  const buildNumber = getFlag("--buildNumber");
  const buildUrl = getFlag("--buildUrl");
  const pipelineName = getFlag("--definitionName");
  const droppedFilesListPath = getFlag("--failedPatchesFile");

  if (!shardArtifactsRoot || !outDir) {
    console.error("ERROR: --workspace and --outDir are required");
    process.exit(2);
  }

  const aggregated = aggregateShardResults(shardArtifactsRoot, emitterVersion);
  printAggregateSummaryToLog(aggregated);

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(
    path.join(outDir, "aggregated-results.json"),
    JSON.stringify(aggregated, null, 2)
  );

  const droppedConflictFiles = loadDroppedConflictFiles(droppedFilesListPath);
  const pullRequestBody = renderPullRequestBody({
    aggregated,
    pipelineName,
    buildNumber,
    buildUrl,
    patchScope,
    droppedConflictFiles,
  });
  fs.writeFileSync(path.join(outDir, "pr-body.md"), pullRequestBody);
}

function aggregateShardResults(shardArtifactsRoot, emitterVersion) {
  const aggregated = {
    emitterVersion,
    regeneration: { total: 0, success: 0, failed: 0, failures: [] },
    build:        { total: 0, success: 0, failed: 0, failures: [] },
    changelog:    { total: 0, generated: 0, failed: [], withBreaking: 0, breakingPackages: [] },
  };

  walkFiles(shardArtifactsRoot, (filePath) => {
    if (path.basename(filePath) !== "result.json") return;
    const shardResult = JSON.parse(fs.readFileSync(filePath, "utf8"));
    for (const stageName of ["regeneration", "build"]) {
      if (!shardResult[stageName]) continue;
      aggregated[stageName].total   += shardResult[stageName].total;
      aggregated[stageName].success += shardResult[stageName].success;
      aggregated[stageName].failed  += shardResult[stageName].failed;
      aggregated[stageName].failures.push(...(shardResult[stageName].failures || []));
    }
    if (shardResult.changelog) {
      aggregated.changelog.total        += shardResult.changelog.total;
      aggregated.changelog.generated    += shardResult.changelog.generated;
      aggregated.changelog.withBreaking += shardResult.changelog.withBreaking;
      aggregated.changelog.failed.push(...(shardResult.changelog.failed || []));
      aggregated.changelog.breakingPackages.push(...(shardResult.changelog.breakingPackages || []));
    }
  });

  aggregated.regeneration.failures      = dedupeByPkgAndSort(aggregated.regeneration.failures);
  aggregated.build.failures             = dedupeByPkgAndSort(aggregated.build.failures);
  aggregated.changelog.breakingPackages = dedupeByPkgAndSort(aggregated.changelog.breakingPackages);
  return aggregated;
}

function dedupeByPkgAndSort(entries) {
  const normalized = entries.map((entry) => (typeof entry === "string" ? { pkg: entry } : entry));
  return Array.from(new Map(normalized.map((entry) => [entry.pkg, entry])).values())
    .sort((a, b) => a.pkg.localeCompare(b.pkg));
}

function printAggregateSummaryToLog(aggregated) {
  console.log("===== AGGREGATED SUMMARY =====");
  console.log(`Emitter      : ${aggregated.emitterVersion}`);
  console.log(`Regenerated  : ${aggregated.regeneration.success}/${aggregated.regeneration.total}  (failed: ${aggregated.regeneration.failed})`);
  console.log(`Built        : ${aggregated.build.success}/${aggregated.build.total}  (failed: ${aggregated.build.failed})`);
  console.log(`Changelogs   : ${aggregated.changelog.generated}/${aggregated.changelog.total}  (breaking: ${aggregated.changelog.withBreaking})`);
  if (aggregated.changelog.breakingPackages.length) {
    console.log("\nBreaking packages:");
    aggregated.changelog.breakingPackages.forEach((pkg) => console.log(`  - ${pkg.pkg}`));
  }
}

function loadDroppedConflictFiles(droppedFilesListPath) {
  if (!droppedFilesListPath || !fs.existsSync(droppedFilesListPath)) return [];
  return fs.readFileSync(droppedFilesListPath, "utf8")
    .split("\n").map((line) => line.trim()).filter(Boolean);
}

function renderPullRequestBody({ aggregated, pipelineName, buildNumber, buildUrl, patchScope, droppedConflictFiles }) {
  const lines = [
    `_Generated by \`${pipelineName}\` build [${buildNumber}](${buildUrl})._`,
    `_Emitter version: \`${aggregated.emitterVersion}\`. Push mode: \`${patchScope}\`._`,
    "",
    "## Regeneration summary",
    `- Regenerated: **${aggregated.regeneration.success}/${aggregated.regeneration.total}**`,
    `- Built OK:    **${aggregated.build.success}/${aggregated.build.total}**`,
    `- Changelog generated: **${aggregated.changelog.generated}/${aggregated.changelog.total}**`,
    `- Packages with breaking changes: **${aggregated.changelog.withBreaking}**`,
    "",
    "See the **regen_summary** build artifact for `aggregated-results.json` " +
      "(machine-readable counts + per-package failure details and breaking-change excerpts).",
  ];

  appendMarkdownPackageList(lines, "❌ Regenerate failures", aggregated.regeneration.failures);
  appendMarkdownPackageList(lines, "❌ Build failures",      aggregated.build.failures);
  appendMarkdownPackageList(lines, "⚠ Packages with breaking changes", aggregated.changelog.breakingPackages);
  appendMarkdownFileList(lines, "Files dropped due to upstream conflicts", droppedConflictFiles);

  return lines.join("\n");
}

function appendMarkdownPackageList(lines, sectionTitle, entries) {
  if (!entries.length) return;
  lines.push("", `## ${sectionTitle} (${entries.length})`, ...entries.map((e) => `- \`${e.pkg}\``));
}

function appendMarkdownFileList(lines, sectionTitle, files) {
  if (!files.length) return;
  lines.push("", `## ${sectionTitle} (${files.length})`, ...files.map((f) => `- \`${f}\``));
}

// ─────────────────────────────────────────────────────────────────────────────
// Subcommand: apply-patches
// Runs only when CreatePullRequest=true. Picks the push token, 3-way applies
// every shard's changes.patch, then re-aggregates so pr-body.md reflects any
// conflict drops.
// ─────────────────────────────────────────────────────────────────────────────

function runApplyPatches() {
  const [sourceRepoOwner, sourceRepoName] = (getFlag("--sourceRepo") || "").split("/");
  const targetRepoOwner = getFlag("--targetOwner") || sourceRepoOwner;
  const targetRepoName  = getFlag("--targetName")  || sourceRepoName;
  const baseBranch      = getFlag("--targetBranch", "main");
  const headBranchOverride = getFlag("--branch", "").trim();
  const buildId         = getFlag("--buildId", "");
  const shardArtifactsRoot = getFlag("--workspace");
  const droppedFilesListPath = getFlag("--failedPatchesFile");
  const outDir = getFlag("--outDir");

  const isTargetingFork = targetRepoOwner !== sourceRepoOwner || targetRepoName !== sourceRepoName;
  const pushToken = selectPushToken(isTargetingFork, targetRepoOwner, targetRepoName);
  const headBranchName = resolveHeadBranchName(headBranchOverride, buildId);

  console.log(`Targeting ${isTargetingFork ? "fork" : "source repo"}: ${targetRepoOwner}/${targetRepoName}`);

  repointOriginAndCheckoutBranch(targetRepoOwner, targetRepoName, pushToken, baseBranch, headBranchName);
  applyAllShardPatches(shardArtifactsRoot, droppedFilesListPath);
  discardLocalEmitterPackageEdits();

  // Re-aggregate so pr-body.md picks up the conflict drops.
  if (outDir) runAggregate();

  setPipelineVariable("PRBranchName",     headBranchName);
  setPipelineVariable("TargetRepoOwner",  targetRepoOwner);
  setPipelineVariable("TargetRepoName",   targetRepoName);
  setPipelineVariable("PushToken", pushToken, { isSecret: true });
}

function selectPushToken(isTargetingFork, targetOwner, targetName) {
  const token = isTargetingFork
    ? (process.env.FORK_TOKEN || "")
    : (process.env.GH_TOKEN_VAL || "");
  if (isTargetingFork && !token) {
    console.error(
      `##[error]Targeting fork ${targetOwner}/${targetName} but no PAT was provided. ` +
      `Set ForkTokenVariableName to an ADO secret variable holding a GitHub PAT (repo scope).`
    );
    process.exit(1);
  }
  return token;
}

function resolveHeadBranchName(headBranchOverride, buildId) {
  const overrideLower = headBranchOverride.toLowerCase();
  const isAutoBranch = !headBranchOverride || overrideLower === "empty" || overrideLower === "auto";
  return isAutoBranch ? `sdk-regenerate-${buildId}` : headBranchOverride;
}

function repointOriginAndCheckoutBranch(targetOwner, targetName, pushToken, baseBranch, headBranchName) {
  runShellNoEcho("git", [
    "remote", "set-url", "origin",
    `https://x-access-token:${pushToken}@github.com/${targetOwner}/${targetName}.git`,
  ], SDK_ROOT);
  runShell(`git fetch origin ${baseBranch} --depth=1`, SDK_ROOT);
  runShell(`git checkout -B ${headBranchName} FETCH_HEAD`, SDK_ROOT);
}

function applyAllShardPatches(shardArtifactsRoot, droppedFilesListPath) {
  fs.writeFileSync(droppedFilesListPath, "");
  const shardPatchFiles = collectShardPatchFiles(shardArtifactsRoot);
  for (const patchFile of shardPatchFiles) {
    console.log(`Applying ${patchFile}`);
    const applyResult = spawnSync("git", ["apply", "--3way", patchFile], { cwd: SDK_ROOT, stdio: "inherit" });
    if (applyResult.status === 0) continue;
    dropConflictedFiles(droppedFilesListPath);
  }
}

function collectShardPatchFiles(shardArtifactsRoot) {
  const patchFiles = [];
  walkFiles(shardArtifactsRoot, (filePath) => {
    if (path.basename(filePath) === "changes.patch" && fs.statSync(filePath).size > 0) {
      patchFiles.push(filePath);
    }
  });
  return patchFiles.sort();
}

function dropConflictedFiles(droppedFilesListPath) {
  // We'd rather PR a clean subset than ship a half-merged tree.
  const conflictedFilesResult = spawnSync(
    "git", ["diff", "--name-only", "--diff-filter=U"],
    { cwd: SDK_ROOT, encoding: "utf8" }
  );
  const conflictedFiles = (conflictedFilesResult.stdout || "")
    .split("\n").map((line) => line.trim()).filter(Boolean);
  for (const conflictedFile of conflictedFiles) {
    spawnSync("git", ["checkout", "HEAD", "--", conflictedFile], { cwd: SDK_ROOT });
    spawnSync("git", ["rm", "-f", conflictedFile], { cwd: SDK_ROOT });
    fs.appendFileSync(droppedFilesListPath, conflictedFile + "\n");
  }
}

function discardLocalEmitterPackageEdits() {
  // The xml/sse peer-dep injection in prepare() must never land in the PR.
  spawnSync(
    "git",
    ["checkout", "--", "eng/emitter-package.json", "eng/emitter-package-lock.json"],
    { cwd: SDK_ROOT }
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Dispatcher
// ─────────────────────────────────────────────────────────────────────────────

const SUBCOMMANDS = {
  "resolve-emitter": runResolveEmitter,
  "prepare":         runPrepare,
  "shard":           runShard,
  "aggregate":       runAggregate,
  "apply-patches":   runApplyPatches,
};

const subcommandName = process.argv[2];
const subcommandHandler = SUBCOMMANDS[subcommandName];
if (!subcommandHandler) {
  console.error(`Usage: regenerate-shard.js <${Object.keys(SUBCOMMANDS).join("|")}> [...args]`);
  process.exit(2);
}
Promise.resolve()
  .then(() => subcommandHandler())
  .catch((err) => { console.error(err); process.exit(1); });
