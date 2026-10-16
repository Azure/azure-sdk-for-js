// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const assert = require("node:assert/strict");
const { createHash } = require("node:crypto");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");
const baseline = require("./triage-baseline.json");
const root = path.resolve(__dirname, "../../..");
const read = (name) =>
  readFileSync(path.join(root, ".github", "workflows", name), "utf8").replace(/\r\n/g, "\n");
const hash = (text) => createHash("sha256").update(text).digest("hex");

test("triage source is byte-equivalent to main except opt-in run-title metadata", () => {
  const source = read("issue-triage.md").replace(/^run-name: .*\n\n/m, "");
  assert.equal(
    hash(source),
    baseline.sourceHash,
    `Triage source changed from ${baseline.commit}. Review compatibility before updating this baseline.`,
  );
});

test("all generated triage execution, permissions, tools, jobs, and prompts match main", () => {
  const lock = read("issue-triage.lock.yml")
    .replace(/"frontmatter_hash":"[a-f0-9]+"/, '"frontmatter_hash":"metadata-only"')
    .replace(/^run-name: .*$/m, 'run-name: "Agentic Triage"');
  assert.equal(
    hash(lock),
    baseline.lockHash,
    "Generated triage execution changed; investigation must remain isolated.",
  );
});

test("opt-in correlation affects only the display title and is disabled by default", () => {
  const source = read("issue-triage.md");
  assert.match(
    source,
    /^run-name: .*vars\.ENABLE_ISSUE_INVESTIGATION == 'true'.*\|\| 'Agentic Triage'/m,
  );
  assert.equal((source.match(/ENABLE_ISSUE_INVESTIGATION/g) || []).length, 1);
  const router = read("issue-investigation-handoff.yml");
  assert.match(router, /workflow_run:\n\s+workflows: \[Agentic Triage\]\n\s+types: \[completed\]/);
  assert.match(router, /vars\.ENABLE_ISSUE_INVESTIGATION == 'true'/);
  assert.doesNotMatch(source, /dispatch-workflow:|investigation_handoff:|safe_outputs:/);
});

test("observer failure cannot become a dependency or conclusion of the source run", () => {
  const lock = read("issue-triage.lock.yml");
  const jobs = [...lock.slice(lock.indexOf("\njobs:\n")).matchAll(/^  ([a-z_]+):$/gm)].map(
    (match) => match[1],
  );
  assert.deepEqual(jobs, [
    "activation",
    "agent",
    "conclusion",
    "detection",
    "mention_owners",
    "safe_outputs",
  ]);
  assert.doesNotMatch(lock, /actions: write|investigation_handoff|completed-triage\.cjs/);
});

test("observer never checks out or executes downloaded source-run artifacts", () => {
  const router = read("issue-investigation-handoff.yml");
  assert.match(router, /ref: \$\{\{ github\.sha \}\}/);
  assert.match(router, /require\('\.\/eng\/tools\/issue-investigation\/completed-triage\.cjs'\)/);
  assert.doesNotMatch(router, /head_sha\s*\}\}|run-id:.*github\.run_id/);
});
