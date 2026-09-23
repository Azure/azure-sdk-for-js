// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert/strict";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";
import { changedFiles, readTree, writeTree } from "./trees.mjs";

test("writes only planned TypeScript files and preserves unrelated assets", () => {
  const root = mkdtempSync(path.join(os.tmpdir(), "ai-projects-customize-tree-"));
  try {
    writeFileSync(path.join(root, "old.ts"), "export interface Old {}");
    writeFileSync(path.join(root, "asset.txt"), "preserved");
    const previous = readTree(root);
    const next = new Map([["nested/new.mts", "export interface Added { value?: string }"]]);
    writeTree(root, previous, next);
    assert.equal(existsSync(path.join(root, "old.ts")), false);
    assert.equal(readFileSync(path.join(root, "asset.txt"), "utf8"), "preserved");
    assert.deepEqual(readTree(root), next);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("rejects escaping paths before writing any source", () => {
  const root = mkdtempSync(path.join(os.tmpdir(), "ai-projects-customize-tree-"));
  try {
    const next = new Map([
      ["safe.ts", "export interface Added {}"],
      ["../escape.ts", "unsafe"],
    ]);
    assert.throws(() => writeTree(root, new Map(), next), /Unsafe customization path/);
    assert.equal(existsSync(path.join(root, "safe.ts")), false);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("counts additions, modifications and removals rather than only existing files", () => {
  const before = new Map([
    ["a.ts", "old"],
    ["b.ts", "same"],
    ["removed.ts", "gone"],
  ]);
  const after = new Map([
    ["a.ts", "new"],
    ["b.ts", "same"],
    ["added.ts", "added"],
  ]);
  assert.deepEqual(changedFiles(before, after).sort(), ["a.ts", "added.ts", "removed.ts"]);
});
