// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import { afterEach, assert, describe, it, vi } from "vitest";
import { executeActions } from "../src/actions.js";
import { spawnNpx, spawnNpmRun } from "../src/spawn.js";
import { getBaseDir } from "../src/env.js";
import { join as pathJoin } from "node:path";

const baseDir = getBaseDir();

vi.mock("../src/spawn.js", async () => {
  return {
    spawnNpx: vi.fn(),
    spawnNpmRun: vi.fn(),
  };
});

describe("executeActions", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should pass global actions directly to", () => {
    executeActions("unlink", [], [], "");
    assert.deepEqual(vi.mocked(spawnNpx).mock.calls, [[baseDir, "turbo", "run", "unlink"]]);
  });

  it("should run build commands for affected packages", () => {
    executeActions("build", ["appconfiguration"], [], "azure-app-configuration");
    assert.deepEqual(vi.mocked(spawnNpx).mock.calls, [
      [baseDir, "turbo", "run", "build", "--filter=...@azure/app-configuration"],
    ]);
  });

  it("should run lint in appropriate folders", () => {
    executeActions("lint", ["appconfiguration"], [], "azure-app-configuration");
    const packageDir = pathJoin(baseDir, "sdk/appconfiguration/app-configuration");
    assert.deepEqual(vi.mocked(spawnNpmRun).mock.calls, [[packageDir, "lint"]]);
  });

  it("should handle arbitrary run commands", () => {
    executeActions("foo", ["appconfiguration"], [], "azure-app-configuration");
    assert.deepEqual(vi.mocked(spawnNpx).mock.calls, [
      [baseDir, "turbo", "run", "foo", "--filter=@azure/app-configuration..."],
    ]);
  });

  it("should pass through arguments for rush", () => {
    const rushArgs = ["--verbose", "-p max"];
    executeActions("build", ["appconfiguration"], rushArgs, "azure-app-configuration");
    assert.deepEqual(vi.mocked(spawnNpx).mock.calls, [
      [baseDir, "turbo", "run", "build", "--filter=...@azure/app-configuration", ...rushArgs],
    ]);
  });

  it("should return a non-zero return when a command fails", () => {
    vi.mocked(spawnNpx).mockReturnValueOnce(1);
    const resultCode = executeActions("build", ["appconfiguration"], [], "azure-app-configuration");
    assert.strictEqual(resultCode, 1);
  });

  it("should return a non-zero return when one of many commands fails", () => {
    vi.mocked(spawnNpmRun).mockReturnValueOnce(0).mockReturnValueOnce(1).mockReturnValueOnce(0);
    const resultCode = executeActions(
      "lint",
      ["appconfiguration", "storage", "keyvault"],
      [],
      "azure-app-configuration,azure-storage-blob,azure-keyvault-keys",
    );
    assert.strictEqual(resultCode, 1);
  });
});
