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
const DEV_VERSION_SENTINEL = "dev";

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

/** Run `pwsh -NoProfile -File <script> <...args>`; abort on non-zero exit. */
function runPwshFile(scriptRelPath, scriptArgs) {
  const script = path.join(SDK_ROOT, scriptRelPath);
  runShellNoEcho("pwsh", ["-NoProfile", "-File", script, ...scriptArgs], SDK_ROOT);
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
// The sentinel value "dev" means: look up the current `dev` dist-tag of
// @azure-tools/typespec-ts. Any other value is used verbatim as the version.
// ─────────────────────────────────────────────────────────────────────────────
async function runResolveEmitter() {
  const rawInputVersion = getFlag("--input", "");
  const normalizedInput = rawInputVersion.trim().toLowerCase();

  let resolvedEmitterVersion;
  if (normalizedInput === DEV_VERSION_SENTINEL) {
    const { exitCode, output } = await runCommandCapturing(
      "npm", ["view", EMITTER_PACKAGE_NAME, "dist-tags.dev"], process.cwd());
    resolvedEmitterVersion = output.trim();
    if (exitCode !== 0 || !resolvedEmitterVersion) {
      console.error("##[error]npm view returned empty dev tag");
      process.exit(1);
    }
  } else {
    resolvedEmitterVersion = rawInputVersion.trim();
  }

  console.log(`Emitter version: ${resolvedEmitterVersion}`);
  setPipelineVariable("emitterVersion", resolvedEmitterVersion, { isOutput: true });
}

// ─────────────────────────────────────────────────────────────────────────────
// Subcommand: prepare
// Per-agent setup. Two modes:
//   --mode emitter  Setup job: regenerate eng/emitter-package.json + lock so
//                   the Setup-stage commit pins the resolved emitter version.
//   --mode shard    Matrix shard: install per-shard tools + shallow-clone the
//                   spec repo. Does NOT touch emitter-package* (those are
//                   already on the PR branch from the Setup-stage commit).
// ─────────────────────────────────────────────────────────────────────────────

function runPrepare() {
  const mode = getFlag("--mode");
  installGlobalCliTools();

  // 'full' = emitter + shard combined; used when CreatePullRequest=false (no
  // separate Setup-stage commit, so each shard must regen emitter-package itself).
  const wantsEmitter = mode === "emitter" || mode === "full";
  const wantsShard   = mode === "shard"   || mode === "full";

  if (!wantsEmitter && !wantsShard) {
    console.error("ERROR: --mode must be 'emitter', 'shard', or 'full'");
    process.exit(2);
  }

  if (wantsEmitter) {
    const emitterVersion = getFlag("--emitterVersion");
    if (!emitterVersion) {
      console.error("ERROR: --emitterVersion is required for --mode emitter/full");
      process.exit(2);
    }
    regenerateEmitterPackageFiles(emitterVersion);
  }

  if (wantsShard) {
    const specRepoBranch = getFlag("--specRepoBranch", "main");
    const specRepoCloneDir = getFlag("--specRepoRoot");
    if (!specRepoCloneDir) {
      console.error("ERROR: --specRepoRoot is required for --mode shard/full");
      process.exit(2);
    }
    preinstallReleaseTools();
    shallowCloneSpecRepo(specRepoBranch, specRepoCloneDir);
  }
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
  const perPackageConcurrency = 4;
  const turboBuildConcurrency = 4;
  const skipBuild = getFlag("--skipBuild", "false").toLowerCase() === "true";

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

  // Reset files outside sdk/ that may have been touched by tool installs so
  // git-push-changes.yml commits only the regenerated SDK output. The PR
  // branch already has the resolved emitter-package* from the Setup commit.
  discardNonSdkChanges();

  console.log("\n========== SHARD SUMMARY ==========\n" + JSON.stringify(shardSummary, null, 2));

  // DO NOT exit 1 on per-package regen/build failures — that would skip the
  // push step in git-push-changes.yml (gated on succeeded()), losing the
  // successful packages' changes. Failures are visible in the SHARD SUMMARY
  // log above and in the ADO build view.
}

function discardNonSdkChanges() {
  const filesToReset = [
    "eng/emitter-package.json",
    "eng/emitter-package-lock.json",
    "pnpm-lock.yaml",
  ];
  for (const file of filesToReset) {
    spawnSync("git", ["checkout", "HEAD", "--", file], { cwd: SDK_ROOT });
  }
  // Stage everything so git-push-changes.yml's `commit -am` picks up new
  // files too (the -a flag alone only auto-stages modified/deleted tracked
  // files; regen can create brand-new files like new review/*.api.md).
  spawnSync("git", ["add", "-A"], { cwd: SDK_ROOT });
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

  // typespec-ts emitter rewrites CHANGELOG.md from a template, wiping years of
  // release history. Snapshot before generate, restore before update-changelog
  // runs (Phase 3) so it can prepend the new section to the full history.
  const changelogPath = path.join(pkg.packageDir, "CHANGELOG.md");
  const savedChangelog = fs.existsSync(changelogPath)
    ? fs.readFileSync(changelogPath, "utf8")
    : null;

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

  if (savedChangelog !== null) fs.writeFileSync(changelogPath, savedChangelog);

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

// ─────────────────────────────────────────────────────────────────────────────
// Subcommand: create-pr
// Opens a PR from the per-build branch (every shard pushed into it via
// git-push-changes.yml) into the target base branch. Body is intentionally
// minimal — per-package outcomes (regenerated/built/breaking) live in the
// ADO build log + the PR's Files-changed view (CHANGELOG.md diffs).
// Matches the autorest.go / .NET regen pipelines.
// ─────────────────────────────────────────────────────────────────────────────

function runCreatePr() {
  const [sourceRepoOwner, sourceRepoName] = (getFlag("--sourceRepo") || "").split("/");
  const targetRepoOwner = getFlag("--targetOwner") || sourceRepoOwner;
  const targetRepoName  = getFlag("--targetName")  || sourceRepoName;
  const baseBranch      = getFlag("--targetBranch", "main");
  const headBranchName  = resolveHeadBranchName(getFlag("--branch", "").trim(), getFlag("--buildId", ""));
  const emitterVersion  = getFlag("--emitterVersion", "");
  const buildNumber     = getFlag("--buildNumber", "");
  const buildUrl        = getFlag("--buildUrl", "");
  const pipelineName    = getFlag("--definitionName", "");

  const isTargetingFork = targetRepoOwner !== sourceRepoOwner || targetRepoName !== sourceRepoName;
  const pushToken = selectPushToken(isTargetingFork, targetRepoOwner, targetRepoName);

  const prTitle = `TypeSpec regeneration: emitter ${emitterVersion}`;
  const prBody = [
    `_Generated by \`${pipelineName}\` build [${buildNumber}](${buildUrl})._`,
    `_Emitter version: \`${emitterVersion}\`._`,
    "",
    "Per-package outcomes (regenerated / built / breaking changes) are in the ADO build log.",
  ].join("\n");

  runPwshFile("eng/common/scripts/Submit-PullRequest.ps1", [
    "-RepoOwner",  targetRepoOwner,  "-RepoName", targetRepoName,
    "-BaseBranch", baseBranch,
    "-PROwner",    targetRepoOwner,  "-PRBranch", headBranchName,
    "-AuthToken",  pushToken,
    "-PRTitle",    prTitle,
    "-PRBody",     prBody,
  ]);
}

function selectPushToken(isTargetingFork, targetOwner, targetName) {
  const token = isTargetingFork
    ? (process.env.FORK_TOKEN || "")
    : (process.env.GH_TOKEN_VAL || process.env.GH_TOKEN || "");
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
  return headBranchOverride.toLowerCase() === "auto" ? `sdk-regenerate-${buildId}` : headBranchOverride;
}

// ─────────────────────────────────────────────────────────────────────────────
// Subcommand: build-matrix
// Wraps eng/common/scripts/New-RegenerateMatrix.ps1 with the argument
// forwarding the YAML needs.
// ─────────────────────────────────────────────────────────────────────────────

function runBuildMatrix() {
  const outDir = getFlag("--outDir");
  if (!outDir) {
    console.error("ERROR: --outDir is required");
    process.exit(2);
  }
  runPwshFile("eng/common/scripts/New-RegenerateMatrix.ps1", [
    "-OutputDirectory",        outDir,
    "-OutputVariableName",     "matrix",
    "-JobCount",               "10",
    "-MinimumPerJob",          "10",
    "-OnlyTypeSpec",           "true",
    "-DirectoryFilterPattern", getFlag("--filter", "arm-*"),
  ]);
}

// ─────────────────────────────────────────────────────────────────────────────
// Subcommands: setup-pr-branch
// CreatePullRequest=true plumbing. Two modes:
//   base   – Setup job: fetch the PR target branch and reset prBranch to it.
//   switch – Shard job: copy this script outside the working tree (the PR
//            branch is based on main and does NOT contain feature/break-check's
//            pipeline source), add the fork remote, and check out prBranch.
//            Token comes from env PUSH_TOKEN so it never hits a command line.
// ─────────────────────────────────────────────────────────────────────────────

function runSetupPrBranch() {
  const mode      = getFlag("--mode");
  const prBranch  = getFlag("--prBranch");

  // ALWAYS self-copy to $AGENT_TEMPDIRECTORY before any git work — the upcoming
  // checkout swaps the working tree to origin/main, which on the PR branch path
  // does NOT contain this script. The temp copy is what every later step calls
  // (see $(shardScriptInvoke) in sdk-regenerate.yml).
  const tempDir = process.env.AGENT_TEMPDIRECTORY;
  if (tempDir) fs.copyFileSync(__filename, path.join(tempDir, path.basename(__filename)));

  if (mode === "base") {
    runShell(`git fetch origin ${getFlag("--targetBranch")} --depth=1`);
    runShell(`git checkout -B ${prBranch} FETCH_HEAD`);
    return;
  }
  if (mode === "switch") {
    const remote = `https://x-access-token:${process.env.PUSH_TOKEN}@github.com/${getFlag("--targetOwner")}/${getFlag("--targetName")}.git`;
    runShellNoEcho("git", ["remote", "add", "azure-sdk-fork", remote]);
    runShell(`git fetch azure-sdk-fork ${prBranch} --depth=1`);
    runShell(`git checkout -B ${prBranch} azure-sdk-fork/${prBranch}`);
    return;
  }
  console.error(`ERROR: --mode must be 'base' or 'switch' (got '${mode}')`);
  process.exit(2);
}

// ─────────────────────────────────────────────────────────────────────────────
// Dispatcher
// ─────────────────────────────────────────────────────────────────────────────

const SUBCOMMANDS = {
  "resolve-emitter": runResolveEmitter,
  "build-matrix":    runBuildMatrix,
  "setup-pr-branch": runSetupPrBranch,
  "prepare":         runPrepare,
  "shard":           runShard,
  "create-pr":       runCreatePr,
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
