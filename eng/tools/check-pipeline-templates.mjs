// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Guards against duplicated job preludes in the ADO pipeline templates.
 *
 * Azure DevOps does not de-duplicate step templates: if `common.yml` (which runs
 * `UseNode` and `npmAuthenticate`) is included both at job level and from a step
 * template, every one of those steps runs again. This silently cost several
 * redundant `UseNode` / `npmAuthenticate` invocations per job.
 *
 * The rule enforced here: for any job, the step-template graph must reach
 * `steps/use-node-version.yml` at most once via `steps/common.yml`.
 *
 * Usage: node eng/tools/check-pipeline-templates.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const pipelinesDir = path.join(repoRoot, "eng", "pipelines");

const PRELUDE = path.join(pipelinesDir, "templates", "steps", "common.yml");

/** Directories that never contain ADO pipeline definitions. */
const SKIP_DIRS = new Set(["node_modules", ".git", "dist", "dist-esm", "dist-test"]);

/** Collect every *.yml under a directory. */
function listYaml(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listYaml(full));
    // *.template.yml files are scaffolding for generated pipelines; their
    // relative paths resolve from the generated file's location, not their own.
    else if (entry.name.endsWith(".yml") && !entry.name.endsWith(".template.yml")) out.push(full);
  }
  return out;
}

/**
 * Extract `- template: <ref>` references from a file, ignoring commented lines.
 *
 * Returns `{ resolved, missing }`. A reference is only considered resolvable
 * when it targets this repo: refs carrying a repository alias other than
 * `@self` live in another repo, and refs built from template expressions can't
 * be resolved statically, so both are ignored.
 */
function templateRefs(file) {
  const resolved = [];
  const missing = [];
  const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);

  for (const line of lines) {
    if (/^\s*#/.test(line)) continue;
    const match = /^\s*-?\s*template:\s*(\S+)\s*$/.exec(line);
    if (!match) continue;

    const raw = match[1];
    if (raw.includes("${{")) continue; // built at compile time, not statically knowable

    const [ref, alias] = raw.split("@");
    if (alias && alias !== "self") continue; // lives in another repository

    const target = ref.startsWith("/")
      ? path.join(repoRoot, ref.slice(1))
      : path.resolve(path.dirname(file), ref);

    if (fs.existsSync(target)) resolved.push(target);
    else missing.push({ file, ref: raw, target });
  }

  return { resolved, missing };
}

/**
 * How many times expanding `file` reaches the prelude. Cycles are not expected
 * in these templates; a visited set keeps the walk safe regardless.
 */
const preludeCountCache = new Map();
function preludeCount(file, stack = new Set()) {
  if (file === PRELUDE) return 1;
  if (preludeCountCache.has(file)) return preludeCountCache.get(file);
  if (stack.has(file)) return 0;

  stack.add(file);
  let total = 0;
  for (const ref of templateRefs(file).resolved) total += preludeCount(ref, stack);
  stack.delete(file);

  preludeCountCache.set(file, total);
  return total;
}

/** True when expanding `file` reaches `target` (following template includes). */
function reaches(file, target, stack = new Set()) {
  if (file === target) return true;
  if (stack.has(file)) return false;
  stack.add(file);
  const hit = templateRefs(file).resolved.some((ref) => reaches(ref, target, stack));
  stack.delete(file);
  return hit;
}

const failures = [];

// Check 1: no dangling template references.
//
// Pipeline definitions live all over the repo (sdk/*/ci.yml,
// common/tools/*/ci.yml, ...), not just under eng/pipelines, so this scans the
// whole tree. Deleting a "unused" template that is actually referenced from
// outside eng/ is otherwise invisible until the pipeline fails to compile.
for (const file of listYaml(repoRoot)) {
  for (const { ref, target } of templateRefs(file).missing) {
    failures.push(
      `${path.relative(repoRoot, file)} references template "${ref}", which does not exist ` +
        `(looked for ${path.relative(repoRoot, target)}).`,
    );
  }
}

// Check 2: step templates must not pull in the job prelude.
//
// A job/stage file may legitimately include the prelude several times - once
// per job it declares (jobs/ci.yml declares both "Build" and "Analyze", for
// example). Counting those correctly would mean modelling job boundaries, and
// it isn't necessary: once no step template pulls in the prelude, the only
// remaining includes are the explicit per-job ones, which are obvious in review.
const stepsDir = path.join(pipelinesDir, "templates", "steps");

for (const file of listYaml(stepsDir)) {
  if (file === PRELUDE) continue;

  const count = preludeCount(file);
  if (count > 0) {
    failures.push(
      `${path.relative(repoRoot, file)} is a step template but reaches the job prelude ` +
        `(templates/steps/common.yml) ${count} time(s). Include common.yml once, from the ` +
        `job template that consumes this file.`,
    );
  }
}

// Check 3: pipelines that install pnpm must provide a prelude.
//
// The mirror image of check 2. Removing a nested common.yml from a step template
// is only safe if every consuming pipeline supplies the prelude itself -
// otherwise the job silently loses its pinned Node version and, worse, its
// authenticated .npmrc, which install-pnpm.yml needs to npm install -g pnpm.
//
// A pipeline satisfies this by including common.yml, or by wiring up
// use-node-version.yml plus create-authenticated-npmrc.yml directly.
//
// This is file-scoped rather than job-scoped: a multi-job file where only one
// job has a prelude would pass. Modelling job boundaries is the only way to be
// exact, and it isn't worth the fragility - the common failure is a pipeline
// with no prelude at all.
const INSTALL_PNPM = path.join(stepsDir, "install-pnpm.yml");
const USE_NODE = path.join(stepsDir, "use-node-version.yml");

for (const file of listYaml(repoRoot)) {
  if (file.startsWith(stepsDir + path.sep)) continue; // step templates rely on their consumer
  if (!reaches(file, INSTALL_PNPM)) continue;
  if (reaches(file, PRELUDE) || reaches(file, USE_NODE)) continue;

  failures.push(
    `${path.relative(repoRoot, file)} installs pnpm but never includes the job prelude ` +
      `(templates/steps/common.yml). That job would run without a pinned Node version or an ` +
      `authenticated .npmrc.`,
  );
}

if (failures.length > 0) {
  console.error("Pipeline template check failed:\n");
  for (const failure of failures) console.error(`  - ${failure}`);
  console.error(
    "\nNote that ADO does not de-duplicate step templates, so a nested common.yml " +
      "makes UseNode and npmAuthenticate run repeatedly in the same job.",
  );
  process.exit(1);
}

console.log("Pipeline template check passed.");
