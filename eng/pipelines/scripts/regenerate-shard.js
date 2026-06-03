#!/usr/bin/env node
// Per-shard regeneration worker for sdk-regenerate.yml.
//
// For one matrix shard, this script:
//   1. Resolves every SDK directory in the shard to its package name and the
//      tsp-location.yaml that owns it.
//   2. Runs the shared `TypeSpec-Project-Sync.ps1` + `TypeSpec-Project-Generate.ps1`
//      per package (concurrency = --maxWorkers). The spec is taken from the
//      pre-cloned azure-rest-api-specs at --specRepoRoot via `-LocalSpecRepoPath`.
//   3. Runs a single `pnpm turbo build --filter @azure/<pkg>...` invocation
//      spanning every successfully-regenerated package, with turbo handling
//      the dep graph + per-task parallelism.
//   4. Runs `eng/scripts/update-changelog-content.ps1` per built package,
//      scrapes the resulting CHANGELOG.md for an unreleased "### Breaking Changes"
//      heading, and records the signal.
//   5. Emits result.json (regen / build / changelog counts and failure lists)
//      consumed by the Summary stage.
//
// Intentionally minimal: every workaround for emitter bugs (nested workspaces,
// missing warp configs, missing transitive deps) has been removed per mentor
// review on PR #38604 — those belong as upstream fixes in autorest.typescript.

const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

function arg(name, def = "") {
  const i = process.argv.indexOf(name);
  return i >= 0 && i + 1 < process.argv.length ? process.argv[i + 1] : def;
}

const sdkRoot = process.cwd();
const specRepoRoot = arg("--specRepoRoot");
const directoryListFile = arg("--directoryList");
const resultOutputDir = arg("--resultOutputDir");
const maxWorkers = Number(arg("--maxWorkers", "2")) || 1;
const buildConcurrency = Number(arg("--buildConcurrency", "2")) || 1;
const skipBuild = arg("--skipBuild", "false").toLowerCase() === "true";

if (!specRepoRoot || !fs.existsSync(specRepoRoot)) {
  console.error(`ERROR: spec repo root not found: ${specRepoRoot}`);
  process.exit(1);
}
if (!directoryListFile || !fs.existsSync(directoryListFile)) {
  console.error(`ERROR: directory list not found: ${directoryListFile}`);
  process.exit(1);
}

const tspSync = path.join(sdkRoot, "eng/common/scripts/TypeSpec-Project-Sync.ps1");
const tspGenerate = path.join(sdkRoot, "eng/common/scripts/TypeSpec-Project-Generate.ps1");
const updateChangelog = path.join(sdkRoot, "eng/scripts/update-changelog-content.ps1");

function run(cmd, args, cwd) {
  return new Promise((resolve) => {
    let out = "";
    const p = spawn(cmd, args, { cwd, shell: true });
    p.stdout.on("data", (d) => (out += d));
    p.stderr.on("data", (d) => (out += d));
    p.on("close", (code) => resolve({ code, out }));
    p.on("error", (e) => resolve({ code: 1, out: out + `\nspawn error: ${e.message}` }));
  });
}

function logGroup(title, body) {
  console.log(`##[group]${title}`);
  console.log(body);
  console.log("##[endgroup]");
}

// Resolve one SDK dir (relative path under sdkRoot) to {pkg, pkgDir, packageName}.
// Skips entries without a usable tsp-location.yaml — the matrix filter already
// excludes those, but we double-check here.
function resolvePackage(rel) {
  const pkgDir = path.join(sdkRoot, "sdk", rel);
  if (!fs.existsSync(path.join(pkgDir, "tsp-location.yaml"))) return null;
  let packageName = `sdk/${rel}`;
  try {
    const pj = JSON.parse(fs.readFileSync(path.join(pkgDir, "package.json"), "utf8"));
    if (pj.name) packageName = pj.name;
  } catch {
    /* package.json may be missing for never-generated packages */
  }
  return { pkg: `sdk/${rel}`, pkgDir, packageName };
}

async function withConcurrency(items, limit, worker) {
  const active = new Set();
  for (const it of items) {
    const p = Promise.resolve(worker(it)).finally(() => active.delete(p));
    active.add(p);
    if (active.size >= limit) await Promise.race(active);
  }
  await Promise.allSettled(active);
}

async function regenerateOne(pkg, counter, total) {
  const start = Date.now();
  const sync = await run("pwsh", ["-File", tspSync, pkg.pkgDir, specRepoRoot], sdkRoot);
  let output = `===== TypeSpec-Project-Sync =====\n${sync.out}\nExit: ${sync.code}\n`;
  if (sync.code !== 0) {
    const dur = ((Date.now() - start) / 1000).toFixed(1);
    counter.value++;
    console.log(`  ❌ [${counter.value}/${total}] ${pkg.pkg} - sync FAILED (${dur}s)`);
    logGroup(`regen log: ${pkg.pkg}`, output);
    return { ...pkg, success: false, output };
  }
  const gen = await run("pwsh", ["-File", tspGenerate, pkg.pkgDir], sdkRoot);
  output += `\n===== TypeSpec-Project-Generate =====\n${gen.out}\nExit: ${gen.code}\n`;
  const success = gen.code === 0;
  const dur = ((Date.now() - start) / 1000).toFixed(1);
  counter.value++;
  console.log(`  ${success ? "✅" : "❌"} [${counter.value}/${total}] ${pkg.pkg} - ${success ? "OK" : "FAILED"} (${dur}s)`);
  logGroup(`regen log: ${pkg.pkg}`, output);
  return { ...pkg, success, output };
}

async function changelogOne(pkg) {
  if (!fs.existsSync(updateChangelog)) {
    return { pkg: pkg.pkg, success: false, hasBreaking: false, output: "(update-changelog-content.ps1 not found)" };
  }
  const res = await run(
    "pwsh",
    ["-File", updateChangelog, "-SdkRepoPath", sdkRoot, "-PackagePath", pkg.pkgDir],
    sdkRoot,
  );
  let hasBreaking = false;
  try {
    const cl = path.join(pkg.pkgDir, "CHANGELOG.md");
    if (fs.existsSync(cl)) {
      const head = fs.readFileSync(cl, "utf8").split("\n").slice(0, 200).join("\n");
      // Only inspect the top (unreleased) section, ending at the next "## " version heading.
      const firstVersion = head.indexOf("\n## ");
      const nextVersion = firstVersion >= 0 ? head.indexOf("\n## ", firstVersion + 1) : -1;
      const top = firstVersion >= 0 ? head.slice(0, nextVersion > 0 ? nextVersion : head.length) : head;
      hasBreaking = /^###\s+Breaking Changes\b/m.test(top);
    }
  } catch {
    /* best-effort */
  }
  logGroup(`changelog log: ${pkg.pkg}`, res.out);
  return { pkg: pkg.pkg, success: res.code === 0, hasBreaking, output: res.out };
}

async function main() {
  const entries = JSON.parse(fs.readFileSync(directoryListFile, "utf8"));
  const packages = entries.map(resolvePackage).filter(Boolean);
  console.log(`Shard packages: ${packages.length}`);

  // --- Regenerate ---
  console.log(`\n===== Regenerate (concurrency=${maxWorkers}) =====`);
  const regen = [];
  const counter = { value: 0 };
  await withConcurrency(packages, maxWorkers, async (p) => regen.push(await regenerateOne(p, counter, packages.length)));

  const regenOk = regen.filter((r) => r.success);

  // --- Build (one turbo invocation) ---
  let buildOk = [];
  let buildFail = [];
  let buildSkipped = skipBuild || regenOk.length === 0;
  if (!buildSkipped) {
    console.log(`\n===== Build (pnpm turbo, concurrency=${buildConcurrency}) =====`);
    const install = await run("pnpm", ["install", "--no-frozen-lockfile"], sdkRoot);
    if (install.code !== 0) {
      console.log("pnpm install failed");
      logGroup("pnpm install output", install.out.slice(-2000));
      buildSkipped = true;
    } else {
      const filters = regenOk.flatMap((p) => ["--filter", `${p.packageName}...`]);
      const build = await run(
        "pnpm",
        ["turbo", "build", ...filters, "--token", "1", `--concurrency=${buildConcurrency}`],
        sdkRoot,
      );
      logGroup("turbo build output", build.out.slice(-4000));
      // Coarse signal only: turbo's exit code reflects the whole batch. Per-task
      // logs are surfaced in the group above; matches Go / .NET regen pipelines.
      if (build.code === 0) {
        buildOk = regenOk.map((p) => p.pkg);
      } else {
        buildFail = regenOk.map((p) => p.pkg);
      }
    }
  }

  // --- Changelog (only for successfully-built packages) ---
  const builtPackages = regenOk.filter((p) => buildOk.includes(p.pkg));
  let changelogResults = [];
  if (!buildSkipped && builtPackages.length > 0) {
    console.log(`\n===== Changelog (${builtPackages.length} packages) =====`);
    await withConcurrency(builtPackages, maxWorkers, async (p) => changelogResults.push(await changelogOne(p)));
  }

  // --- Result + diff/patch ---
  const summary = {
    packages: packages.map((p) => p.pkg),
    regeneration: {
      total: packages.length,
      success: regenOk.length,
      failed: packages.length - regenOk.length,
      failures: regen.filter((r) => !r.success).map((r) => r.pkg),
    },
    build: buildSkipped
      ? null
      : {
          total: regenOk.length,
          success: buildOk.length,
          failed: buildFail.length,
          failures: buildFail,
        },
    changelog: buildSkipped
      ? null
      : {
          total: changelogResults.length,
          generated: changelogResults.filter((r) => r.success).length,
          failed: changelogResults.filter((r) => !r.success).map((r) => r.pkg),
          withBreaking: changelogResults.filter((r) => r.success && r.hasBreaking).length,
          breakingPackages: changelogResults.filter((r) => r.success && r.hasBreaking).map((r) => r.pkg),
        },
  };

  if (resultOutputDir) {
    fs.mkdirSync(resultOutputDir, { recursive: true });
    fs.writeFileSync(path.join(resultOutputDir, "result.json"), JSON.stringify(summary, null, 2));
  }

  console.log("\n========== SHARD SUMMARY ==========");
  console.log(JSON.stringify(summary, null, 2));

  // Fail the step when any package failed to regenerate or build, so the
  // shard job is visibly red in ADO (not just the Summary stage).
  const buildFailed = summary.build ? summary.build.failed : 0;
  if (summary.regeneration.failed > 0 || buildFailed > 0) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
