#!/usr/bin/env node
// regenerate-shard.js — single entry point for sdk-regenerate.yml.
//
// All non-orchestration work lives here, modelled on autorest.go's
// sdk_regenerate.py. The YAML only checks out, installs node, and dispatches
// to one of these subcommands:
//
//   resolve-emitter  — resolve EmitterVersion param (or npm dev dist-tag).
//   prepare          — patch eng/emitter-package.json, regen lock, install
//                      js-sdk-release-tools, shallow-clone the spec repo.
//   shard            — for one matrix shard, run TypeSpec-Project-{Sync,Generate}.ps1
//                      per pkg (concurrency=--maxWorkers), one `pnpm turbo build`
//                      over the regen-OK set, `npm exec update-changelog` per
//                      built pkg, scrape CHANGELOG.md for "### Breaking Changes".
//                      Writes result.json + changes.patch.
//   aggregate        — walk per-shard result.json files, write
//                      aggregated-results.json + pr-body.md.
//   apply-patches    — pick push token, 3-way apply per-shard changes.patch
//                      onto target branch, emit ADO setvariables for
//                      git-push-changes.yml.
//
// Per mentor review on PR #38604: no per-emitter-bug workarounds — those
// belong upstream in Azure/autorest.typescript (see UPSTREAM-ISSUES.md).

const { spawn, spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const arg = (name, def = "") => {
  const i = process.argv.indexOf(name);
  return i >= 0 && i + 1 < process.argv.length ? process.argv[i + 1] : def;
};
const run = (cmd, args, cwd) => new Promise((resolve) => {
  let out = "";
  const p = spawn(cmd, args, { cwd, shell: true });
  p.stdout.on("data", (d) => (out += d));
  p.stderr.on("data", (d) => (out += d));
  p.on("close", (code) => resolve({ code, out }));
  p.on("error", (e) => resolve({ code: 1, out: out + `\nspawn error: ${e.message}` }));
});
// Streams output to the agent log AND exits non-zero on failure.
function sh(cmdline, cwd) {
  console.log(`+ ${cmdline}`);
  const r = spawnSync(cmdline, { cwd: cwd || process.cwd(), shell: true, stdio: "inherit" });
  if (r.status !== 0) { console.error(`##[error]exit ${r.status}: ${cmdline}`); process.exit(r.status || 1); }
}
// Like sh() but does not echo the command line (use for secret-containing args).
function shQuiet(cmd, args, cwd) {
  const r = spawnSync(cmd, args, { cwd: cwd || process.cwd(), stdio: "inherit" });
  if (r.status !== 0) { console.error(`##[error]exit ${r.status}: ${cmd}`); process.exit(r.status || 1); }
}
const logGroup = (title, body) => console.log(`##[group]${title}\n${body}\n##[endgroup]`);
async function withConcurrency(items, limit, worker) {
  const active = new Set();
  for (const it of items) {
    const p = Promise.resolve(worker(it)).finally(() => active.delete(p));
    active.add(p);
    if (active.size >= limit) await Promise.race(active);
  }
  await Promise.allSettled(active);
}
function walk(dir, fn) {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, fn); else fn(p);
  }
}

// ─── Subcommand: resolve-emitter ────────────────────────────────────────────
// Normalize the user-supplied EmitterVersion param; if blank/sentinel, look up
// the current @azure-tools/typespec-ts dev dist-tag. Emits an ADO output var
// `emitterVersion` consumed by every downstream job.
async function runResolveEmitter() {
  const raw = arg("--input", "");
  const norm = raw.trim().toLowerCase();
  let v;
  if (!norm || ["empty", "latest", "auto", "dev"].includes(norm)) {
    const r = await run("npm", ["view", "@azure-tools/typespec-ts", "dist-tags.dev"], process.cwd());
    v = r.out.trim();
    if (r.code !== 0 || !v) { console.error("##[error]npm view returned empty dev tag"); process.exit(1); }
  } else { v = raw.trim(); }
  console.log(`Emitter version: ${v}`);
  console.log(`##vso[task.setvariable variable=emitterVersion;isOutput=true]${v}`);
}

// ─── Subcommand: prepare ────────────────────────────────────────────────────
// Patch eng/emitter-package.json with the resolved emitter version, regenerate
// the lock file, pre-install js-sdk-release-tools (POSIX path, avoids the
// Windows-backslash bug in update-changelog-content.ps1), and shallow-clone the
// spec repo for TypeSpec-Project-Sync to copy from.
function runPrepare() {
  const sdkRoot = process.cwd();
  const emitterVersion = arg("--emitterVersion");
  const specRepoBranch = arg("--specRepoBranch", "main");
  const specRepoRoot = arg("--specRepoRoot");
  if (!emitterVersion || !specRepoRoot) { console.error("ERROR: --emitterVersion and --specRepoRoot are required"); process.exit(2); }

  sh("npm install -g @azure-tools/typespec-client-generator-cli pnpm");
  // Persist legacy-peer-deps to ~/.npmrc so it applies to every later npm call
  // on this agent (tsp-client generate-lock-file *and* the npm ci inside
  // TypeSpec-Project-Generate.ps1, where dev-emitter peer-dep drift blows up).
  sh("npm config set legacy-peer-deps true");

  const p = path.join(sdkRoot, "eng/emitter-package.json");
  const j = JSON.parse(fs.readFileSync(p, "utf8"));
  j.dependencies["@azure-tools/typespec-ts"] = emitterVersion;
  // Inject peer-deps that dev typespec-client-generator-core imports at runtime
  // but main's emitter-package.json does not yet declare. Tracked upstream in
  // eng/pipelines/UPSTREAM-ISSUES.md §1.
  const v = j.dependencies["@typespec/events"] || "0.82.0";
  j.dependencies["@typespec/xml"] = j.dependencies["@typespec/xml"] || v;
  j.dependencies["@typespec/sse"] = j.dependencies["@typespec/sse"] || v;
  fs.writeFileSync(p, JSON.stringify(j, null, 2) + "\n");

  sh("tsp-client generate-lock-file", sdkRoot);
  sh("npm --prefix eng/tools/js-sdk-release-tools ci", sdkRoot);
  shQuiet("git", ["clone", "--depth", "1", "--branch", specRepoBranch,
    "https://github.com/Azure/azure-rest-api-specs.git", specRepoRoot]);
}

// ─── Subcommand: apply-patches ──────────────────────────────────────────────
// Pick the right push token (FORK_TOKEN env var if targeting a fork, else
// GH_TOKEN_VAL from the org GitHub App), 3-way apply every per-shard
// changes.patch onto the target branch, drop conflicted files to
// failed-patches.txt, and emit ADO vars consumed by git-push-changes.yml.
function runApplyPatches() {
  const sdkRoot = process.cwd();
  const [srcOwner, srcName] = (arg("--sourceRepo") || "").split("/");
  const owner = arg("--targetOwner") || srcOwner;
  const name = arg("--targetName") || srcName;
  const targetBranch = arg("--targetBranch", "main");
  const branchOverride = arg("--branch", "").trim();
  const buildId = arg("--buildId", "");
  const workspace = arg("--workspace");
  const failedPatchesFile = arg("--failedPatchesFile");

  const isFork = owner !== srcOwner || name !== srcName;
  const pushToken = isFork ? (process.env.FORK_TOKEN || "") : (process.env.GH_TOKEN_VAL || "");
  if (isFork && !pushToken) {
    console.error(`##[error]Targeting fork ${owner}/${name} but no PAT was provided. Set ForkTokenVariableName to an ADO secret variable holding a GitHub PAT (repo scope).`);
    process.exit(1);
  }
  console.log(`Targeting ${isFork ? "fork" : "source repo"}: ${owner}/${name}`);

  const blc = branchOverride.toLowerCase();
  const branch = (!branchOverride || blc === "empty" || blc === "auto")
    ? `sdk-regenerate-${buildId}` : branchOverride;

  // Quiet: don't echo the URL with the embedded token.
  shQuiet("git", ["remote", "set-url", "origin",
    `https://x-access-token:${pushToken}@github.com/${owner}/${name}.git`], sdkRoot);
  sh(`git fetch origin ${targetBranch} --depth=1`, sdkRoot);
  sh(`git checkout -B ${branch} FETCH_HEAD`, sdkRoot);

  fs.writeFileSync(failedPatchesFile, "");
  const patches = [];
  walk(workspace, (f) => { if (path.basename(f) === "changes.patch" && fs.statSync(f).size > 0) patches.push(f); });
  patches.sort();
  for (const p of patches) {
    console.log(`Applying ${p}`);
    const r = spawnSync("git", ["apply", "--3way", p], { cwd: sdkRoot, stdio: "inherit" });
    if (r.status === 0) continue;
    const conflicts = (spawnSync("git", ["diff", "--name-only", "--diff-filter=U"],
      { cwd: sdkRoot, encoding: "utf8" }).stdout || "").split("\n").map((s) => s.trim()).filter(Boolean);
    for (const f of conflicts) {
      spawnSync("git", ["checkout", "HEAD", "--", f], { cwd: sdkRoot });
      spawnSync("git", ["rm", "-f", f], { cwd: sdkRoot });
      fs.appendFileSync(failedPatchesFile, f + "\n");
    }
  }
  // Never push the temporary emitter patches into the PR.
  spawnSync("git", ["checkout", "--",
    "eng/emitter-package.json", "eng/emitter-package-lock.json"], { cwd: sdkRoot });

  console.log(`##vso[task.setvariable variable=PRBranchName]${branch}`);
  console.log(`##vso[task.setvariable variable=TargetRepoOwner]${owner}`);
  console.log(`##vso[task.setvariable variable=TargetRepoName]${name}`);
  console.log(`##vso[task.setvariable variable=PushToken;issecret=true]${pushToken}`);
}

// ─── Subcommand: shard ──────────────────────────────────────────────────────
async function runShard() {
  const sdkRoot = process.cwd();
  const specRepoRoot = arg("--specRepoRoot");
  const directoryListFile = arg("--directoryList");
  const resultOutputDir = arg("--resultOutputDir");
  const maxWorkers = Number(arg("--maxWorkers", "2")) || 1;
  const buildConcurrency = Number(arg("--buildConcurrency", "2")) || 1;
  const skipBuild = arg("--skipBuild", "false").toLowerCase() === "true";
  const pushMode = arg("--pushMode", "api-md");

  for (const [name, val] of [["--specRepoRoot", specRepoRoot], ["--directoryList", directoryListFile]]) {
    if (!val || !fs.existsSync(val)) { console.error(`ERROR: ${name} not found: ${val}`); process.exit(1); }
  }

  const tspSync = path.join(sdkRoot, "eng/common/scripts/TypeSpec-Project-Sync.ps1");
  const tspGenerate = path.join(sdkRoot, "eng/common/scripts/TypeSpec-Project-Generate.ps1");
  // js-sdk-release-tools is pre-installed by the YAML "Prepare" step. We invoke
  // update-changelog directly (forward-slash --prefix) — bypasses the Windows-only
  // backslash bug in eng/scripts/update-changelog-content.ps1.
  const releaseToolsPrefix = "eng/tools/js-sdk-release-tools";

  function resolvePackage(rel) {
    const pkgDir = path.join(sdkRoot, "sdk", rel);
    if (!fs.existsSync(path.join(pkgDir, "tsp-location.yaml"))) return null;
    let packageName = `sdk/${rel}`;
    try { packageName = JSON.parse(fs.readFileSync(path.join(pkgDir, "package.json"), "utf8")).name || packageName; } catch {}
    return { pkg: `sdk/${rel}`, pkgDir, packageName };
  }

  async function regenerateOne(pkg, counter, total) {
    const start = Date.now();
    const sync = await run("pwsh", ["-File", tspSync, pkg.pkgDir, specRepoRoot], sdkRoot);
    let output = `===== TypeSpec-Project-Sync =====\n${sync.out}\nExit: ${sync.code}\n`;
    let success = sync.code === 0;
    if (success) {
      const gen = await run("pwsh", ["-File", tspGenerate, pkg.pkgDir], sdkRoot);
      output += `\n===== TypeSpec-Project-Generate =====\n${gen.out}\nExit: ${gen.code}\n`;
      success = gen.code === 0;
    }
    const dur = ((Date.now() - start) / 1000).toFixed(1);
    counter.value++;
    console.log(`  ${success ? "✅" : "❌"} [${counter.value}/${total}] ${pkg.pkg} (${dur}s)`);
    logGroup(`regen log: ${pkg.pkg}`, output);
    // Last 25 non-empty lines of output as the human-readable failure reason.
    const errorTail = success ? null
      : output.split("\n").map((l) => l.replace(/\s+$/, "")).filter(Boolean).slice(-25).join("\n");
    return { ...pkg, success, output, errorTail };
  }

  async function changelogOne(pkg) {
    const res = await run("npm",
      ["--prefix", releaseToolsPrefix, "exec", "--no", "--",
       "update-changelog", "--sdkRepoPath", sdkRoot, "--packagePath", pkg.pkgDir],
      sdkRoot);
    let hasBreaking = false, breakingText = "";
    try {
      const cl = path.join(pkg.pkgDir, "CHANGELOG.md");
      if (fs.existsSync(cl)) {
        // Inspect only the top (unreleased) section, before the next "## " version heading.
        const full = fs.readFileSync(cl, "utf8");
        const head = full.split("\n").slice(0, 200).join("\n");
        const i1 = head.indexOf("\n## "), i2 = i1 >= 0 ? head.indexOf("\n## ", i1 + 1) : -1;
        const top = i1 >= 0 ? head.slice(0, i2 > 0 ? i2 : head.length) : head;
        // Extract "### Breaking Changes" section up to next "### " heading.
        const m = top.match(/^###\s+Breaking Changes\b[^\n]*\n([\s\S]*?)(?=\n###\s|\n##\s|$)/m);
        if (m) { hasBreaking = true; breakingText = m[1].trim(); }
      }
    } catch {
      /* best-effort */
    }
    logGroup(`changelog log: ${pkg.pkg}`, res.out);
    return { pkg: pkg.pkg, success: res.code === 0, hasBreaking, breakingText, output: res.out };
  }

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
  let buildOk = [], buildFail = [];
  let buildSkipped = skipBuild || regenOk.length === 0;
  if (!buildSkipped) {
    console.log(`\n===== Build (pnpm turbo, concurrency=${buildConcurrency}) =====`);
    // tsp-client leaves a `TempTypeSpecFiles/<svc>/package.json` in every
    // package whose TypeSpec-Project-Sync ran — INCLUDING packages whose
    // Generate later failed. pnpm workspace install will try to fetch the dev
    // @azure-tools/typespec-ts pinned in there from the internal Azure feed
    // and 401 — wiping the whole shard's build. The directory is just an
    // intermediate copy of the spec, the actual SDK output is at the package
    // root, so deleting it for *all* packages (regen-OK and regen-failed) is
    // safe and required.
    for (const p of packages) {
      const tmp = path.join(p.pkgDir, "TempTypeSpecFiles");
      if (fs.existsSync(tmp)) fs.rmSync(tmp, { recursive: true, force: true });
    }
    const install = await run("pnpm", ["install", "--no-frozen-lockfile"], sdkRoot);
    if (install.code !== 0) {
      logGroup("pnpm install output", install.out.slice(-2000));
      buildSkipped = true;
    } else {
      const filters = regenOk.flatMap((p) => ["--filter", `${p.packageName}...`]);
      const build = await run("pnpm",
        ["turbo", "build", ...filters, "--token", "1", `--concurrency=${buildConcurrency}`], sdkRoot);
      logGroup("turbo build output", build.out.slice(-4000));
      // Coarse signal only: turbo's exit code reflects the whole batch (matches Go/.NET regen pipelines).
      (build.code === 0 ? buildOk : buildFail).push(...regenOk.map((p) => p.pkg));
    }
  }

  // --- Changelog (only for successfully-built packages) ---
  const builtPackages = regenOk.filter((p) => buildOk.includes(p.pkg));
  const cl = [];
  if (!buildSkipped && builtPackages.length > 0) {
    console.log(`\n===== Changelog (${builtPackages.length} packages) =====`);
    await withConcurrency(builtPackages, maxWorkers, async (p) => cl.push(await changelogOne(p)));
  }

  const summary = {
    packages: packages.map((p) => p.pkg),
    regeneration: {
      total: packages.length, success: regenOk.length, failed: packages.length - regenOk.length,
      failures: regen.filter((r) => !r.success).map((r) => ({ pkg: r.pkg, errorTail: r.errorTail })),
    },
    build: buildSkipped ? null : { total: regenOk.length, success: buildOk.length, failed: buildFail.length, failures: buildFail.map((p) => ({ pkg: p })) },
    changelog: buildSkipped ? null : {
      total: cl.length, generated: cl.filter((r) => r.success).length,
      failed: cl.filter((r) => !r.success).map((r) => r.pkg),
      withBreaking: cl.filter((r) => r.success && r.hasBreaking).length,
      breakingPackages: cl.filter((r) => r.success && r.hasBreaking).map((r) => ({ pkg: r.pkg, breakingText: r.breakingText })),
    },
  };

  if (resultOutputDir) {
    fs.mkdirSync(resultOutputDir, { recursive: true });
    fs.writeFileSync(path.join(resultOutputDir, "result.json"), JSON.stringify(summary, null, 2));
    // Capture the diff that CreatePR will 3-way apply later.
    const diffArgs = pushMode === "api-md"
      ? ["diff", "--binary", "--", ":(glob)sdk/**/review/*.api.md", ":(glob)sdk/**/CHANGELOG.md"]
      : ["diff", "--binary", "--", "sdk/"];
    const d = spawnSync("git", diffArgs, { cwd: sdkRoot, encoding: "buffer", maxBuffer: 256 * 1024 * 1024 });
    if (d.status === 0) fs.writeFileSync(path.join(resultOutputDir, "changes.patch"), d.stdout);
    else console.log(`git diff failed (exit ${d.status}); skipping patch`);
  }

  console.log("\n========== SHARD SUMMARY ==========\n" + JSON.stringify(summary, null, 2));
  // Make the shard job visibly red in ADO (not just the Summary stage) when any pkg fails.
  if (summary.regeneration.failed > 0 || (summary.build && summary.build.failed > 0)) process.exit(1);
}

// ─── Subcommand: aggregate ──────────────────────────────────────────────────

function runAggregate() {
  const workspace = arg("--workspace"), outDir = arg("--outDir");
  const emitterVersion = arg("--emitterVersion"), pushMode = arg("--pushMode", "api-md");
  const buildNumber = arg("--buildNumber"), buildUrl = arg("--buildUrl"), definitionName = arg("--definitionName");
  const failedPatchesFile = arg("--failedPatchesFile");
  if (!workspace || !outDir) { console.error("ERROR: --workspace and --outDir are required"); process.exit(2); }

  const agg = {
    emitterVersion,
    regeneration: { total: 0, success: 0, failed: 0, failures: [] },
    build: { total: 0, success: 0, failed: 0, failures: [] },
    changelog: { total: 0, generated: 0, failed: [], withBreaking: 0, breakingPackages: [] },
  };
  walk(workspace, (f) => {
    if (path.basename(f) !== "result.json") return;
    const r = JSON.parse(fs.readFileSync(f, "utf8"));
    for (const k of ["regeneration", "build"]) {
      if (!r[k]) continue;
      agg[k].total += r[k].total; agg[k].success += r[k].success; agg[k].failed += r[k].failed;
      agg[k].failures.push(...(r[k].failures || []));
    }
    if (r.changelog) {
      agg.changelog.total += r.changelog.total; agg.changelog.generated += r.changelog.generated;
      agg.changelog.withBreaking += r.changelog.withBreaking;
      agg.changelog.failed.push(...(r.changelog.failed || []));
      agg.changelog.breakingPackages.push(...(r.changelog.breakingPackages || []));
    }
  });
  // Normalize failure entries (older shape was just strings; new shape is {pkg, errorTail}).
  const norm = (x) => (typeof x === "string" ? { pkg: x } : x);
  agg.regeneration.failures = agg.regeneration.failures.map(norm);
  agg.build.failures = agg.build.failures.map(norm);
  agg.changelog.breakingPackages = agg.changelog.breakingPackages.map(norm);
  // De-dupe by pkg, keeping the first entry (which has errorTail/breakingText).
  const dedupe = (arr) => Array.from(new Map(arr.map((x) => [x.pkg, x])).values()).sort((a, b) => a.pkg.localeCompare(b.pkg));
  agg.regeneration.failures = dedupe(agg.regeneration.failures);
  agg.build.failures = dedupe(agg.build.failures);
  agg.changelog.breakingPackages = dedupe(agg.changelog.breakingPackages);

  console.log("===== AGGREGATED SUMMARY =====");
  console.log(`Emitter      : ${agg.emitterVersion}`);
  console.log(`Regenerated  : ${agg.regeneration.success}/${agg.regeneration.total}  (failed: ${agg.regeneration.failed})`);
  console.log(`Built        : ${agg.build.success}/${agg.build.total}  (failed: ${agg.build.failed})`);
  console.log(`Changelogs   : ${agg.changelog.generated}/${agg.changelog.total}  (breaking: ${agg.changelog.withBreaking})`);
  if (agg.changelog.breakingPackages.length) {
    console.log("\nBreaking packages:");
    agg.changelog.breakingPackages.forEach((p) => console.log(`  - ${p.pkg}`));
  }

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "aggregated-results.json"), JSON.stringify(agg, null, 2));

  const header = [
    `_Generated by \`${definitionName}\` build [${buildNumber}](${buildUrl})._`,
    `_Emitter version: \`${agg.emitterVersion}\`. Push mode: \`${pushMode}\`._`, "",
  ];

  // ─── pr-body.md (PR description) ─────────────────────────────────────────
  const body = [...header,
    "## Regeneration summary",
    `- Regenerated: **${agg.regeneration.success}/${agg.regeneration.total}**`,
    `- Built OK:    **${agg.build.success}/${agg.build.total}**`,
    `- Changelog generated: **${agg.changelog.generated}/${agg.changelog.total}**`,
    `- Packages with breaking changes: **${agg.changelog.withBreaking}**`, "",
    "See `eng/regen-reports/REGEN-SUMMARY.md` for the full per-package list and",
    "`eng/regen-reports/BREAKING-CHANGES.md` for breaking-change details.",
  ];
  if (failedPatchesFile && fs.existsSync(failedPatchesFile)) {
    const drops = fs.readFileSync(failedPatchesFile, "utf8").split("\n").map((s) => s.trim()).filter(Boolean);
    if (drops.length) body.push("", `## Files dropped due to upstream conflicts (${drops.length})`,
      ...drops.map((f) => `- \`${f}\``));
  }
  fs.writeFileSync(path.join(outDir, "pr-body.md"), body.join("\n"));

  // ─── REGEN-SUMMARY.md (committed) — per-package status + error tails ────
  const summaryMd = [...header,
    "# Regeneration report", "",
    "| Stage | Success | Failed | Total |",
    "|---|---|---|---|",
    `| Regenerate | ${agg.regeneration.success} | ${agg.regeneration.failed} | ${agg.regeneration.total} |`,
    `| Build      | ${agg.build.success} | ${agg.build.failed} | ${agg.build.total} |`,
    `| Changelog  | ${agg.changelog.generated} | ${agg.changelog.failed.length} | ${agg.changelog.total} |`,
  ];
  if (agg.regeneration.failures.length) {
    summaryMd.push("", `## ❌ Regenerate failures (${agg.regeneration.failures.length})`,
      "_Almost always upstream: stale `tsp-location.yaml`, or a broken spec on `azure-rest-api-specs/main`._");
    for (const f of agg.regeneration.failures) {
      summaryMd.push("", `### \`${f.pkg}\``);
      if (f.errorTail) summaryMd.push("```", f.errorTail, "```");
    }
  }
  if (agg.build.failures.length) {
    summaryMd.push("", `## ❌ Build failures (${agg.build.failures.length})`,
      ...agg.build.failures.map((f) => `- \`${f.pkg}\``));
  }
  if (agg.changelog.failed.length) {
    summaryMd.push("", `## ⚠ Changelog generation failures (${agg.changelog.failed.length})`,
      ...agg.changelog.failed.map((p) => `- \`${p}\``));
  }
  fs.writeFileSync(path.join(outDir, "REGEN-SUMMARY.md"), summaryMd.join("\n") + "\n");

  // ─── BREAKING-CHANGES.md (committed) — the headline artifact ────────────
  const breakingMd = [...header,
    "# Breaking changes", "",
    `**${agg.changelog.breakingPackages.length}** package(s) reported \`### Breaking Changes\` in their CHANGELOG.md.`, "",
  ];
  if (agg.changelog.breakingPackages.length === 0) {
    breakingMd.push("_No breaking changes detected in this regeneration._ 🎉");
  } else {
    for (const b of agg.changelog.breakingPackages) {
      breakingMd.push(`## \`${b.pkg}\``, "",
        (b.breakingText && b.breakingText.trim()) || "_(no detail captured; see the package CHANGELOG.md)_", "");
    }
  }
  fs.writeFileSync(path.join(outDir, "BREAKING-CHANGES.md"), breakingMd.join("\n"));
  // Don't exit non-zero on regen/build failures — we still want a PR for the
  // packages that DID succeed, with the failure list embedded in the reports.
}

// ─── Dispatcher ─────────────────────────────────────────────────────────────
const sub = process.argv[2];
const wrap = (fn) => Promise.resolve().then(fn).catch((e) => { console.error(e); process.exit(1); });
switch (sub) {
  case "resolve-emitter": wrap(runResolveEmitter); break;
  case "prepare":         runPrepare(); break;
  case "shard":           wrap(runShard); break;
  case "aggregate":       runAggregate(); break;
  case "apply-patches":   runApplyPatches(); break;
  default:
    console.error("Usage: regenerate-shard.js <resolve-emitter|prepare|shard|aggregate|apply-patches> [...args]");
    process.exit(2);
}
