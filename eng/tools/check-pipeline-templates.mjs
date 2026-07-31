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

/** Collect every *.yml under a directory. */
function listYaml(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listYaml(full));
    else if (entry.name.endsWith(".yml")) out.push(full);
  }
  return out;
}

/**
 * Extract `- template: <ref>` references from a file, ignoring commented lines.
 * Returns absolute paths for refs that resolve inside eng/pipelines.
 */
function templateRefs(file) {
  const refs = [];
  const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
  for (const line of lines) {
    if (/^\s*#/.test(line)) continue;
    const match = /^\s*-?\s*template:\s*(\S+)\s*$/.exec(line);
    if (!match) continue;
    // Strip a repository alias suffix such as "@self".
    const ref = match[1].split("@")[0];
    const resolved = ref.startsWith("/")
      ? path.join(repoRoot, ref.slice(1))
      : path.resolve(path.dirname(file), ref);
    if (fs.existsSync(resolved)) refs.push(resolved);
  }
  return refs;
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
  for (const ref of templateRefs(file)) total += preludeCount(ref, stack);
  stack.delete(file);

  preludeCountCache.set(file, total);
  return total;
}

const failures = [];

for (const file of listYaml(pipelinesDir)) {
  if (file === PRELUDE) continue;

  // Only step templates are checked. A job/stage file may legitimately include
  // the prelude several times - once per job it declares (jobs/ci.yml declares
  // both "Build" and "Analyze", for example). Counting those correctly would
  // mean modelling job boundaries, and it isn't necessary: once no step
  // template pulls in the prelude, the only remaining includes are the explicit
  // per-job ones, which are obvious in review.
  if (path.dirname(file) !== path.join(pipelinesDir, "templates", "steps")) continue;

  const count = preludeCount(file);
  if (count > 0) {
    failures.push(
      `${path.relative(repoRoot, file)} is a step template but reaches the job prelude ` +
        `(templates/steps/common.yml) ${count} time(s). Include common.yml once, from the ` +
        `job template that consumes this file.`,
    );
  }
}

if (failures.length > 0) {
  console.error("Pipeline template prelude check failed:\n");
  for (const failure of failures) console.error(`  - ${failure}`);
  console.error(
    "\nADO does not de-duplicate step templates, so a nested common.yml makes " +
      "UseNode and npmAuthenticate run repeatedly in the same job.",
  );
  process.exit(1);
}

console.log("Pipeline template prelude check passed.");
