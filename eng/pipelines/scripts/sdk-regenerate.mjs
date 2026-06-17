#!/usr/bin/env node
// Sole script for sdk-regenerate.yml. The YAML dispatches to one of the
// subcommands at the bottom of this file.

import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { parseArgs } from "node:util";

const SDK_ROOT = process.cwd();
const EMITTER_PACKAGE_NAME = "@azure-tools/typespec-ts";
const EMITTER_PACKAGE_JSON_PATH = path.join(SDK_ROOT, "eng/emitter-package.json");
const EMITTER_OVERRIDES_JSON_PATH = path.join(SDK_ROOT, "eng/emitter-overrides.json");
const TYPESPEC_SYNC_SCRIPT = path.join(SDK_ROOT, "eng/common/scripts/TypeSpec-Project-Sync.ps1");
const TYPESPEC_GENERATE_SCRIPT = path.join(
  SDK_ROOT,
  "eng/common/scripts/TypeSpec-Project-Generate.ps1",
);
const RELEASE_TOOLS_DIR = "eng/tools/js-sdk-release-tools";
const DEV_VERSION_SENTINEL = "dev"; // Special --input value meaning "resolve the npm next tag" (dev emitter builds).

// ─────────────────────────────────────────────────────────────────────────────
// Command-line argument parsing
// ─────────────────────────────────────────────────────────────────────────────

const options = {
  // Parameters configurable when running the pipeline manually
  input:          { type: "string", default: "" },
  skipBuild:      { type: "string", default: "false" },
  filter:         { type: "string", default: "arm-*" },
  specRepoBranch: { type: "string", default: "main" },
  prPushMode:     { type: "string", default: "api.md and changelog" },
  branch:         { type: "string", default: "" },
  // ADO built-in variables and job outputs passed in by the YAML
  emitterVersion: { type: "string", default: "" },
  specRepoRoot:   { type: "string", default: "" },
  directoryList:  { type: "string", default: "" },
  sourceRepo:     { type: "string", default: "" },
  targetBranch:   { type: "string", default: "main" },
  buildId:        { type: "string", default: "" },
  buildNumber:    { type: "string", default: "" },
  buildUrl:       { type: "string", default: "" },
  definitionName: { type: "string", default: "" },
  outDir:         { type: "string", default: "" },
};

const {
  values,
  positionals,
} = parseArgs({ options, allowPositionals: true });

const subcommandName = positionals[0];

// ─────────────────────────────────────────────────────────────────────────────
// Tiny helpers
// ─────────────────────────────────────────────────────────────────────────────

/** Run a command and capture stdout+stderr into one string. Never rejects. */
function runCommandCapturing(command, commandArgs, workingDirectory) {
  return new Promise((resolve) => {
    let combinedOutput = "";
    const child = spawn(command, commandArgs, { cwd: workingDirectory });
    child.stdout.on("data", (chunk) => (combinedOutput += chunk));
    child.stderr.on("data", (chunk) => (combinedOutput += chunk));
    child.on("close", (exitCode) => resolve({ exitCode, output: combinedOutput }));
    child.on("error", (err) =>
      resolve({ exitCode: 1, output: combinedOutput + `\nspawn error: ${err.message}` }),
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
  const flags = [isOutput ? "isOutput=true" : null, isSecret ? "issecret=true" : null]
    .filter(Boolean)
    .join(";");
  const prefix = flags ? `;${flags}` : "";
  console.log(`##vso[task.setvariable variable=${name}${prefix}]${value}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// Subcommand: resolve-emitter
// Resolve --input to a concrete npm version. "dev" means: use the npm `next`
// dist-tag, which points to the dev emitter build selected by the publisher.
// ─────────────────────────────────────────────────────────────────────────────

async function runResolveEmitter() {
  const input = values.input.trim().toLowerCase();
  const isScheduled = (process.env.BUILD_REASON || "").toLowerCase() === "schedule";

  let resolvedEmitterVersion;
  let shouldRun = true;
  if (input === DEV_VERSION_SENTINEL) {
    resolvedEmitterVersion = await resolveNextEmitterVersion();
    if (isScheduled) {
      const lastBuilt = await getLastBuiltEmitterVersionFromTag();
      if (resolvedEmitterVersion === lastBuilt) {
        console.log(`Version ${resolvedEmitterVersion} already built – skipping.`);
        shouldRun = false;
      }
    }
  } else {
    resolvedEmitterVersion = input;
  }

  console.log(`Emitter version: ${resolvedEmitterVersion}; shouldRun=${shouldRun}`);
  setPipelineVariable("emitterVersion", resolvedEmitterVersion, { isOutput: true });
  setPipelineVariable("shouldRun", String(shouldRun), { isOutput: true });
}

async function getLastBuiltEmitterVersionFromTag() {
  const definitionId = (process.env.SYSTEM_DEFINITIONID || "").trim();
  const org = (process.env.SYSTEM_COLLECTIONURI || "").trim();
  const project = (process.env.SYSTEM_TEAMPROJECT || "").trim();
  if (!definitionId || !org || !project) return "";

  const { exitCode: runExit, output: runOutput } = await runCommandCapturing(
    "az",
    [
      "pipelines",
      "runs",
      "list",
      "--pipeline-id",
      definitionId,
      "--result",
      "succeeded",
      "--top",
      "1",
      "--query",
      "[0].id",
      "--output",
      "tsv",
      "--org",
      org,
      "--project",
      project,
    ],
    process.cwd(),
  );
  const lastBuildId = runExit === 0 ? runOutput.trim() : "";
  if (!lastBuildId) return "";

  const { exitCode: tagExit, output: tagOutput } = await runCommandCapturing(
    "az",
    [
      "pipelines",
      "build",
      "tag",
      "list",
      "--build-id",
      lastBuildId,
      "--org",
      org,
      "--project",
      project,
      "--output",
      "tsv",
    ],
    process.cwd(),
  );
  if (tagExit !== 0) return "";

  const emitterTag = tagOutput.split(/\r?\n/).find((t) => t.startsWith("emitter_"));
  return emitterTag ? emitterTag.replace("emitter_", "") : "";
}

async function resolveNextEmitterVersion() {
  const { exitCode, output } = await runCommandCapturing(
    "npm",
    ["view", EMITTER_PACKAGE_NAME, "dist-tags.next"],
    process.cwd(),
  );
  const nextVersion = output.trim();
  if (exitCode !== 0) {
    console.error(`##[error]npm view failed while resolving ${EMITTER_PACKAGE_NAME} next tag`);
    console.error(extractLastNonEmptyLines(output, 20));
    process.exit(1);
  }
  if (!nextVersion) {
    console.error(`##[error]npm next tag is empty for ${EMITTER_PACKAGE_NAME}`);
    process.exit(1);
  }

  console.log(`Emitter version from npm next tag: ${nextVersion}`);
  return nextVersion;
}

// ─────────────────────────────────────────────────────────────────────────────
// Subcommand: regenerate-emitter
// Pin eng/emitter-package.json + emitter-package-lock.json to the resolved
// emitter version. Setup publishes the result as emitter_artifacts.
// ─────────────────────────────────────────────────────────────────────────────

function runRegenerateEmitter() {
  const emitterVersion = values.emitterVersion;
  if (!emitterVersion) {
    console.error("ERROR: --emitterVersion is required");
    process.exit(2);
  }
  installGlobalCliTools();
  regenerateEmitterPackageFiles(emitterVersion);
}

function installGlobalCliTools() {
  runShell("npm install -g @azure-tools/typespec-client-generator-cli pnpm");
  // Dev emitter has peer-dep drift; tolerate it for every npm call on this agent.
  runShell("npm config set legacy-peer-deps true");
}

// `tsp-client generate-config-files` updates eng/emitter-package.json, pins
// every emitter peerDependency to the version in the emitter's own
// devDependencies (this auto-pins @typespec/xml so the runtime require() in
// typespec-client-generator-core resolves), and regenerates the lockfile.
// Extra forced versions live in eng/emitter-overrides.json (optional).
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
    SDK_ROOT,
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
    "clone",
    "--depth",
    "1",
    "--branch",
    branch,
    "https://github.com/Azure/azure-rest-api-specs.git",
    cloneDir,
  ]);
}

// ─────────────────────────────────────────────────────────────────────────────
// Subcommand: shard
// Runs once per matrix shard. Phases:
//   install tools + clone spec repo → regenerate (fan-out) → build (turbo,
//   batched) → changelog (fan-out).
// ─────────────────────────────────────────────────────────────────────────────

async function runShard() {
  const specRepoBranch = values.specRepoBranch;
  const specRepoCloneDir = values.specRepoRoot;
  const directoryListFile = values.directoryList;
  const perPackageConcurrency = 4;
  const turboBuildConcurrency = 4;
  const skipBuild = values.skipBuild.toLowerCase() === "true";
  // "all" (refresh) mode regenerates against each package's pinned spec commit
  // so the api-version stays identical to the existing SDK and the diff reflects
  // only emitter changes. Giving Sync no local spec makes it honor
  // tsp-location.yaml's commit instead of the spec repo's branch HEAD.
  const refreshMode = values.prPushMode === "all";
  const localSpecRepoDir = refreshMode ? null : specRepoCloneDir;

  if (!refreshMode && !specRepoCloneDir) {
    console.error("ERROR: --specRepoRoot is required");
    process.exit(2);
  }
  requireReadablePath("--directoryList", directoryListFile);

  installGlobalCliTools();
  preinstallReleaseTools();
  // shallowCloneSpecRepo creates --specRepoRoot; skip it in refresh mode where
  // Sync sparse-clones each package's pinned commit on its own.
  if (!refreshMode) shallowCloneSpecRepo(specRepoBranch, specRepoCloneDir);

  const shardPackages = loadShardPackages(directoryListFile);
  console.log(`Shard packages: ${shardPackages.length}`);

  const regenerationOutcomes = await regenerateAll(
    shardPackages,
    perPackageConcurrency,
    localSpecRepoDir,
  );
  const successfullyRegenerated = regenerationOutcomes.filter((p) => p.success);

  const buildOutcome =
    skipBuild || successfullyRegenerated.length === 0
      ? { skipped: true, builtPackages: [], failedPackages: [] }
      : await buildRegeneratedPackages(
          shardPackages,
          successfullyRegenerated,
          turboBuildConcurrency,
        );

  const changelogOutcomes = buildOutcome.skipped
    ? []
    : await generateChangelogsForBuilt(
        successfullyRegenerated,
        buildOutcome.builtPackages,
        perPackageConcurrency,
      );

  const shardSummary = composeShardSummary({
    shardPackages,
    regenerationOutcomes,
    buildOutcome,
    changelogOutcomes,
  });

  console.log("\n========== SHARD SUMMARY ==========\n" + JSON.stringify(shardSummary, null, 2));

  // DO NOT exit 1 on per-package regen/build failures — that would skip the
  // push step in git-push-changes.yml (gated on succeeded()), losing the
  // successful packages' changes. Failures are visible in the SHARD SUMMARY
  // log above and in the ADO build view.
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

async function regenerateAll(packages, concurrency, localSpecRepoDir) {
  console.log(`\n===== Regenerate (concurrency=${concurrency}) =====`);
  const outcomes = [];
  const completedCount = { value: 0 };
  await runWithConcurrency(packages, concurrency, async (pkg) => {
    outcomes.push(
      await regenerateOnePackage(pkg, localSpecRepoDir, completedCount, packages.length),
    );
  });
  return outcomes;
}

async function regenerateOnePackage(pkg, localSpecRepoDir, completedCount, totalPackageCount) {
  const startedAtMs = Date.now();

  // typespec-ts emitter rewrites CHANGELOG.md from a template, wiping years of
  // release history. Snapshot before generate, restore before update-changelog
  // runs (Phase 3) so it can prepend the new section to the full history.
  const changelogPath = path.join(pkg.packageDir, "CHANGELOG.md");
  const savedChangelog = fs.existsSync(changelogPath)
    ? fs.readFileSync(changelogPath, "utf8")
    : null;

  const syncResult = await runCommandCapturing(
    "pwsh",
    ["-File", TYPESPEC_SYNC_SCRIPT, pkg.packageDir, ...(localSpecRepoDir ? [localSpecRepoDir] : [])],
    SDK_ROOT,
  );
  let combinedLog = `===== TypeSpec-Project-Sync =====\n${syncResult.output}\nExit: ${syncResult.exitCode}\n`;
  let success = syncResult.exitCode === 0;

  if (success) {
    const generateResult = await runCommandCapturing(
      "pwsh",
      ["-File", TYPESPEC_GENERATE_SCRIPT, pkg.packageDir],
      SDK_ROOT,
    );
    combinedLog += `\n===== TypeSpec-Project-Generate =====\n${generateResult.output}\nExit: ${generateResult.exitCode}\n`;
    success = generateResult.exitCode === 0;
  }

  if (savedChangelog !== null) fs.writeFileSync(changelogPath, savedChangelog);

  const durationSeconds = ((Date.now() - startedAtMs) / 1000).toFixed(1);
  completedCount.value += 1;
  console.log(
    `  ${success ? "✅" : "❌"} [${completedCount.value}/${totalPackageCount}] ${pkg.sdkPath} (${durationSeconds}s)`,
  );
  logCollapsedGroup(`regen log: ${pkg.sdkPath}`, combinedLog);

  const errorTail = success ? null : extractLastNonEmptyLines(combinedLog, 25);
  return { ...pkg, success, errorTail };
}

function extractLastNonEmptyLines(text, lineCount) {
  return text
    .split("\n")
    .map((line) => line.replace(/\s+$/, ""))
    .filter(Boolean)
    .slice(-lineCount)
    .join("\n");
}

// ── Phase 2: build ──────────────────────────────────────────────────────────

async function buildRegeneratedPackages(allPackages, successfullyRegenerated, turboConcurrency) {
  console.log(`\n===== Build (pnpm turbo, concurrency=${turboConcurrency}) =====`);

  // Stale TempTypeSpecFiles/<svc>/package.json pin unpublished dev emitter
  // versions, causing pnpm install to 401 from the internal feed.
  removeStaleTempTypespecDirs(allPackages);

  const installResult = await runCommandCapturing(
    "pnpm",
    ["install", "--no-frozen-lockfile"],
    SDK_ROOT,
  );
  if (installResult.exitCode !== 0) {
    logCollapsedGroup("pnpm install output", installResult.output.slice(-2000));
    return { skipped: true, builtPackages: [], failedPackages: [] };
  }

  const turboFilters = successfullyRegenerated.flatMap((pkg) => [
    "--filter",
    `${pkg.npmPackageName}...`,
  ]);
  const buildResult = await runCommandCapturing(
    "pnpm",
    ["turbo", "build", ...turboFilters, "--token", "1", `--concurrency=${turboConcurrency}`],
    SDK_ROOT,
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
  const packagesNeedingChangelog = successfullyRegenerated.filter((p) =>
    builtSdkPathSet.has(p.sdkPath),
  );
  if (packagesNeedingChangelog.length === 0) return [];

  console.log(`\n===== Changelog (${packagesNeedingChangelog.length} packages) =====`);
  const outcomes = [];
  await runWithConcurrency(packagesNeedingChangelog, concurrency, async (pkg) => {
    outcomes.push(await generateChangelogForOnePackage(pkg));
  });
  return outcomes;
}

async function generateChangelogForOnePackage(pkg) {
  // Invoke update-changelog bin directly (avoids backslash issues in the
  // PowerShell wrapper script on Linux agents).
  const result = await runCommandCapturing(
    "npm",
    [
      "--prefix",
      RELEASE_TOOLS_DIR,
      "exec",
      "--no",
      "--",
      "update-changelog",
      "--sdkRepoPath",
      SDK_ROOT,
      "--packagePath",
      pkg.packageDir,
    ],
    SDK_ROOT,
  );

  const { hasBreakingChanges, breakingChangesText } = extractBreakingChangesFromChangelog(
    pkg.packageDir,
  );

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
    const changelogTop = fs
      .readFileSync(changelogPath, "utf8")
      .split("\n")
      .slice(0, 200)
      .join("\n");
    const firstVersionHeadingIndex = changelogTop.indexOf("\n## ");
    const secondVersionHeadingIndex =
      firstVersionHeadingIndex >= 0
        ? changelogTop.indexOf("\n## ", firstVersionHeadingIndex + 1)
        : -1;
    const topUnreleasedSection =
      firstVersionHeadingIndex < 0
        ? changelogTop
        : changelogTop.slice(
            0,
            secondVersionHeadingIndex > 0 ? secondVersionHeadingIndex : changelogTop.length,
          );

    const breakingChangesMatch = topUnreleasedSection.match(
      /^###\s+Breaking Changes\b[^\n]*\n([\s\S]*?)(?=\n###\s|\n##\s|$)/m,
    );
    return breakingChangesMatch
      ? { hasBreakingChanges: true, breakingChangesText: breakingChangesMatch[1].trim() }
      : empty;
  } catch {
    return empty;
  }
}

// ── Compose shard outputs ───────────────────────────────────────────────────

function composeShardSummary({
  shardPackages,
  regenerationOutcomes,
  buildOutcome,
  changelogOutcomes,
}) {
  const regenerationFailures = regenerationOutcomes
    .filter((o) => !o.success)
    .map((o) => ({ pkg: o.sdkPath, errorTail: o.errorTail }));

  return {
    packages: shardPackages.map((p) => p.sdkPath),
    regeneration: {
      total: shardPackages.length,
      success: regenerationOutcomes.length - regenerationFailures.length,
      failed: regenerationFailures.length,
      failures: regenerationFailures,
    },
    build: buildOutcome.skipped
      ? null
      : {
          total: buildOutcome.builtPackages.length + buildOutcome.failedPackages.length,
          success: buildOutcome.builtPackages.length,
          failed: buildOutcome.failedPackages.length,
          failures: buildOutcome.failedPackages.map((sdkPath) => ({ pkg: sdkPath })),
        },
    changelog: buildOutcome.skipped
      ? null
      : {
          total: changelogOutcomes.length,
          generated: changelogOutcomes.filter((o) => o.success).length,
          failed: changelogOutcomes.filter((o) => !o.success).map((o) => o.pkg),
          withBreaking: changelogOutcomes.filter((o) => o.success && o.hasBreaking).length,
          breakingPackages: changelogOutcomes
            .filter((o) => o.success && o.hasBreaking)
            .map((o) => ({ pkg: o.pkg, breakingText: o.breakingText })),
        },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Subcommand: create-pr
// Opens a PR from the per-build branch into the trigger branch. Body is
// minimal; per-package outcomes live in the ADO build log + Files-changed.
// AUTH_TOKEN comes from the YAML env block ($(azuresdk-github-pat)).
// ─────────────────────────────────────────────────────────────────────────────

function runCreatePr() {
  const [repoOwner, repoName] = (values.sourceRepo || "").split("/");
  if (!repoOwner || !repoName) {
    console.error("ERROR: --sourceRepo must be 'owner/name'");
    process.exit(2);
  }
  // $(Build.SourceBranch) comes through as 'refs/heads/<branch>'; strip the
  // prefix. (We can't use $(Build.SourceBranchName) — it loses slashes in
  // branch names like 'feature/break-check'.)
  const baseBranch = values.targetBranch.replace(/^refs\/heads\//, "");
  const headBranchName = resolveHeadBranchName(
    values.branch.trim(),
    values.buildId,
  );
  const emitterVersion = values.emitterVersion;
  const buildNumber = values.buildNumber;
  const buildUrl = values.buildUrl;
  const pipelineName = values.definitionName;

  const authToken = process.env.AUTH_TOKEN || "";
  if (!authToken) {
    console.error(
      "##[error]AUTH_TOKEN env var is empty. The YAML must set AUTH_TOKEN: $(azuresdk-github-pat).",
    );
    process.exit(1);
  }

  const prTitle = `TypeSpec regeneration: emitter ${emitterVersion}`;
  const prBody = [
    `_Generated by \`${pipelineName}\` build [${buildNumber}](${buildUrl})._`,
    `_Emitter version: \`${emitterVersion}\`._`,
    "",
    "Per-package outcomes (regenerated / built / breaking changes) are in the ADO build log.",
  ].join("\n");

  runPwshFile("eng/common/scripts/Submit-PullRequest.ps1", [
    "-RepoOwner",
    repoOwner,
    "-RepoName",
    repoName,
    "-BaseBranch",
    baseBranch,
    "-PROwner",
    repoOwner,
    "-PRBranch",
    headBranchName,
    "-AuthToken",
    authToken,
    "-PRTitle",
    prTitle,
    "-PRBody",
    prBody,
  ]);
}

function resolveHeadBranchName(headBranchOverride, buildId) {
  return headBranchOverride.toLowerCase() === "auto"
    ? `sdk-regenerate-${buildId}`
    : headBranchOverride;
}

// ─────────────────────────────────────────────────────────────────────────────
// Subcommand: build-matrix
// Wraps eng/common/scripts/New-RegenerateMatrix.ps1 with fixed arguments.
// ─────────────────────────────────────────────────────────────────────────────

function runBuildMatrix() {
  const outDir = values.outDir;
  if (!outDir) {
    console.error("ERROR: --outDir is required");
    process.exit(2);
  }
  runPwshFile("eng/common/scripts/New-RegenerateMatrix.ps1", [
    "-OutputDirectory",
    outDir,
    "-OutputVariableName",
    "matrix",
    "-JobCount",
    "10",
    "-MinimumPerJob",
    "10",
    "-OnlyTypeSpec",
    "true",
    "-DirectoryFilterPattern",
    values.filter,
  ]);
}

// ─────────────────────────────────────────────────────────────────────────────
// stage-pr: prepare the working tree for the PR push
// ─────────────────────────────────────────────────────────────────────────────

// Files staged before the PR push, keyed by --prPushMode:
//   api.md and changelog → break-check deltas only (*.api.md + CHANGELOG.md).
//   all            → the whole regenerated sdk/ tree (full SDK refresh),
//                    minus transient TempTypeSpecFiles output.
const PR_STAGE_PATHSPECS = {
  "api.md and changelog": ["sdk/*/*/review/*.api.md", "sdk/*/*/CHANGELOG.md"],
  all: ["sdk/", ":(exclude)sdk/**/TempTypeSpecFiles/**"],
};

// `git stash` away everything that wasn't explicitly staged: git-push-changes.yml
// commits with `git commit -am`, whose `-a` would otherwise sweep in untracked
// output and workspace churn.
async function runStagePr() {
  const mode = values.prPushMode || "api.md and changelog";
  const pathspecs = PR_STAGE_PATHSPECS[mode] ?? PR_STAGE_PATHSPECS["api.md and changelog"];
  console.log(`Staging PR changes (mode: ${mode}): ${pathspecs.join(" ")}`);

  // Tolerate non-zero exits (e.g. `git stash` when there is nothing to stash)
  // so a partially-successful shard still pushes its successful packages.
  for (const gitArgs of [
    ["add", "-A", ...pathspecs],
    ["stash", "--keep-index", "--include-untracked"],
    ["stash", "drop"],
  ]) {
    const { exitCode, output } = await runCommandCapturing("git", gitArgs, SDK_ROOT);
    console.log(`+ git ${gitArgs.join(" ")}\n${output}exit: ${exitCode}`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Dispatcher
// ─────────────────────────────────────────────────────────────────────────────

const SUBCOMMANDS = {
  "resolve-emitter": runResolveEmitter,
  "regenerate-emitter": runRegenerateEmitter,
  "build-matrix": runBuildMatrix,
  shard: runShard,
  "stage-pr": runStagePr,
  "create-pr": runCreatePr,
};

const subcommandHandler = SUBCOMMANDS[subcommandName];
if (!subcommandHandler) {
  console.error(`Usage: sdk-regenerate.mjs <${Object.keys(SUBCOMMANDS).join("|")}> [...args]`);
  process.exit(2);
}
Promise.resolve()
  .then(() => subcommandHandler())
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
