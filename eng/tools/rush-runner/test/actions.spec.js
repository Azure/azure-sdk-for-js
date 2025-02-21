// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import { afterEach, assert, describe, it, vi } from "vitest";
import { executeActions } from "../src/actions.js";
import { spawnNode } from "../src/spawn.js";
import { getBaseDir } from "../src/env.js";
import { join as pathJoin } from "node:path";

const baseDir = getBaseDir();

vi.mock("../src/spawn.js", async () => {
  return {
    spawnNode: vi.fn(),
  };
});

describe("executeActions", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should pass global actions directly to rush", () => {
    executeActions("unlink", [], [], "");
    assert.deepEqual(vi.mocked(spawnNode).mock.calls, [
      [baseDir, "common/scripts/install-run-rush.js", "unlink"],
    ]);
  });

  it("should run build commands for affected packages", () => {
    executeActions("build", ["appconfiguration"], [], "azure-app-configuration");
    assert.deepEqual(vi.mocked(spawnNode).mock.calls, [
      [
        baseDir,
        "common/scripts/install-run-rush.js",
        "build",
        "--from",
        "@azure/app-configuration",
      ],
    ]);
  });

  it("should run lint in appropriate folders", () => {
    executeActions("lint", ["appconfiguration"], [], "azure-app-configuration");
    const packageDir = pathJoin(baseDir, "sdk/appconfiguration/app-configuration");
    const executeScript = pathJoin(baseDir, "common/scripts/install-run-rushx.js");
    assert.deepEqual(vi.mocked(spawnNode).mock.calls, [[packageDir, executeScript, "lint"]]);
  });

  it("should handle arbitrary rush commands", () => {
    executeActions("foo", ["appconfiguration"], [], "azure-app-configuration");
    assert.deepEqual(vi.mocked(spawnNode).mock.calls, [
      [baseDir, "common/scripts/install-run-rush.js", "foo", "--to", "@azure/app-configuration"],
    ]);
  });

  it("should pass through arguments for rush", () => {
    const rushArgs = ["--verbose", "-p max"];
    executeActions("build", ["appconfiguration"], rushArgs, "azure-app-configuration");
    assert.deepEqual(vi.mocked(spawnNode).mock.calls, [
      [
        baseDir,
        "common/scripts/install-run-rush.js",
        "build",
        "--from",
        "@azure/app-configuration",
        ...rushArgs,
      ],
    ]);
  });

  it("should return a non-zero return when a command fails", () => {
    vi.mocked(spawnNode).mockReturnValueOnce(1);
    const resultCode = executeActions("build", ["appconfiguration"], [], "azure-app-configuration");
    assert.strictEqual(resultCode, 1);
  });

  it("should return a non-zero return when one of many commands fails", () => {
    vi.mocked(spawnNode).mockReturnValueOnce(0).mockReturnValueOnce(1).mockReturnValueOnce(0);
    const resultCode = executeActions(
      "lint",
      ["appconfiguration", "storage", "keyvault"],
      [],
      "azure-app-configuration,azure-storage-blob,azure-keyvault-keys",
    );
    assert.strictEqual(resultCode, 1);
  });
});
