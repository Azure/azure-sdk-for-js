// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, assert, describe, it } from "vitest";

import { getModifiedFilesSinceTag } from "../src/verifyPackages.js";

/**
 * @param {string} cwd
 * @param {string[]} args
 */
function runGit(cwd, ...args) {
  return spawnSync("git", args, { cwd, encoding: "utf8" });
}

/**
 * @param {string} cwd
 * @param {string[]} args
 */
function git(cwd, ...args) {
  const result = runGit(cwd, ...args);
  assert.strictEqual(
    result.status,
    0,
    `git ${args.join(" ")} failed:\n${result.stderr || result.stdout}`,
  );
  return result.stdout.trim();
}

describe("getModifiedFilesSinceTag git integration", () => {
  /** @type {string | undefined} */
  let tempDir;

  afterEach(() => {
    if (tempDir) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  it("does not corrupt merge-base traversal when the release commit is already local", () => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "ci-runner-tag-fetch-"));
    const remoteDir = path.join(tempDir, "remote.git");
    const seedDir = path.join(tempDir, "seed");
    const corruptedDir = path.join(tempDir, "corrupted");
    const safeDir = path.join(tempDir, "safe");

    git(tempDir, "init", "--bare", "--initial-branch=main", remoteDir);
    fs.mkdirSync(seedDir);
    git(seedDir, "init", "--initial-branch=main");
    git(seedDir, "config", "user.name", "CI Runner Test");
    git(seedDir, "config", "user.email", "ci-runner-test@example.com");

    const packageDir = path.join(seedDir, "pkg");
    fs.mkdirSync(packageDir);
    fs.writeFileSync(path.join(packageDir, "data.txt"), "base\n");
    git(seedDir, "add", ".");
    git(seedDir, "commit", "-m", "base");
    const mergeBase = git(seedDir, "rev-parse", "HEAD");

    fs.writeFileSync(path.join(packageDir, "data.txt"), "target\n");
    git(seedDir, "commit", "-am", "target");
    const targetCommit = git(seedDir, "rev-parse", "HEAD");
    git(seedDir, "tag", "-a", "release", "-m", "release");

    git(seedDir, "switch", "-c", "source", mergeBase);
    fs.writeFileSync(path.join(packageDir, "data.txt"), "source\n");
    git(seedDir, "commit", "-am", "source");
    git(seedDir, "remote", "add", "origin", remoteDir);
    git(seedDir, "push", "origin", "main", "source", "refs/tags/release");

    git(seedDir, "switch", "--orphan", "hidden");
    fs.mkdirSync(packageDir, { recursive: true });
    fs.writeFileSync(path.join(packageDir, "data.txt"), "hidden\n");
    git(seedDir, "add", ".");
    git(seedDir, "commit", "-m", "hidden release");
    const hiddenCommit = git(seedDir, "rev-parse", "HEAD");
    git(seedDir, "tag", "-a", "hidden-release", "-m", "hidden release");
    git(seedDir, "push", "origin", "refs/tags/hidden-release");

    git(tempDir, "clone", "--no-local", "--no-tags", remoteDir, corruptedDir);
    git(corruptedDir, "switch", "--detach", "origin/source");
    assert.strictEqual(runGit(corruptedDir, "diff", "origin/main...HEAD").status, 0);

    git(corruptedDir, "fetch", "--no-tags", "--depth=1", remoteDir, "refs/tags/release");
    const shallowPath = path.resolve(
      corruptedDir,
      git(corruptedDir, "rev-parse", "--git-path", "shallow"),
    );
    assert.match(fs.readFileSync(shallowPath, "utf8"), new RegExp(targetCommit));
    const corruptedDiff = runGit(corruptedDir, "diff", "origin/main...HEAD");
    assert.strictEqual(corruptedDiff.status, 128);
    assert.match(corruptedDiff.stderr, /no merge base/i);

    git(tempDir, "clone", "--no-local", "--no-tags", remoteDir, safeDir);
    git(safeDir, "switch", "--detach", "origin/source");
    assert.deepStrictEqual(
      getModifiedFilesSinceTag("release", path.join(safeDir, "pkg"), {
        repositoryDir: safeDir,
        repositoryUrl: remoteDir,
      }),
      ["pkg/data.txt"],
    );
    assert.strictEqual(fs.existsSync(path.join(safeDir, ".git", "shallow")), false);
    assert.strictEqual(runGit(safeDir, "diff", "origin/main...HEAD").status, 0);

    assert.notStrictEqual(runGit(safeDir, "cat-file", "-e", hiddenCommit).status, 0);
    assert.deepStrictEqual(
      getModifiedFilesSinceTag("hidden-release", path.join(safeDir, "pkg"), {
        repositoryDir: safeDir,
        repositoryUrl: remoteDir,
      }),
      ["pkg/data.txt"],
    );
    assert.strictEqual(runGit(safeDir, "cat-file", "-e", hiddenCommit).status, 0);
    assert.strictEqual(fs.existsSync(path.join(safeDir, ".git", "shallow")), false);
  });
});
