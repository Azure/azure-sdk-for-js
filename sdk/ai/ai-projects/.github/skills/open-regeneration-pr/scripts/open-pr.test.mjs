// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(new URL("./open-pr.ps1", import.meta.url));
const pkg = "sdk/ai/ai-projects";

test("commits a maintained snippet and synchronized README together in managed mode", (t) => {
  const root = mkdtempSync(join(tmpdir(), "ai-projects-open-pr-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const git = (...args) => execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
  const files = [
    `${pkg}/generated/models.ts`,
    `${pkg}/src/models.ts`,
    `${pkg}/test/snippets.spec.ts`,
    `${pkg}/README.md`,
    `${pkg}/CHANGELOG.md`,
  ];
  git("init", "--initial-branch=regen-test");
  git("config", "user.name", "Test");
  git("config", "user.email", "test@example.com");
  git("config", "commit.gpgsign", "false");
  for (const file of files) {
    const path = join(root, file);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, "before\n");
  }
  git("add", ".");
  git("commit", "-m", "baseline");
  for (const file of files) {
    writeFileSync(join(root, file), "after\n");
  }

  const output = execFileSync(
    "pwsh",
    [
      "-NoProfile",
      "-File",
      scriptPath,
      "-TspCommit",
      "a".repeat(40),
      "-ManagedAgentSession",
      "-SamplesNoOp",
    ],
    { cwd: join(root, pkg), encoding: "utf8" },
  );

  assert.match(output, /Prepared regeneration commits on regen-test/);
  assert.equal(git("branch", "--show-current"), "regen-test");
  assert.equal(git("status", "--porcelain"), "");
  assert.deepEqual(git("log", "--reverse", "--format=%s", "HEAD~4..HEAD").split("\n"), [
    "[ai-projects] regen: emitter output @ aaaaaaa",
    "[ai-projects] regen: post-emitter edits",
    "[ai-projects] regen: tests for new GA features",
    "[ai-projects] regen: changelog",
  ]);
  assert.deepEqual(git("diff-tree", "--no-commit-id", "--name-only", "-r", "HEAD~1").split("\n"), [
    `${pkg}/README.md`,
    `${pkg}/test/snippets.spec.ts`,
  ]);
});
