// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import { afterEach, assert, describe, it, vi } from "vitest";
import { executeActions } from "../src/actions.js";
import { spawnPnpmRun, spawnPnpm } from "../src/spawn.js";
import { verifyPackages } from "../src/verifyPackages.js";
import { getBaseDir } from "../src/env.js";
import { join as pathJoin } from "node:path";

const baseDir = getBaseDir();

vi.mock("../src/spawn.js", async () => {
  return {
    spawnPnpmRun: vi.fn(),
    spawnPnpm: vi.fn(),
  };
});

vi.mock("../src/verifyPackages.js", async () => {
  return {
    verifyPackages: vi.fn(),
  };
});

describe("executeActions", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should pass global actions directly to", () => {
    executeActions("purge", [], [], "");
    assert.deepEqual(vi.mocked(spawnPnpm).mock.calls, [[baseDir, "purge"]]);
  });

  it("should run build commands for affected packages", () => {
    executeActions("build", ["appconfiguration"], [], "azure-app-configuration");
    assert.deepEqual(vi.mocked(spawnPnpm).mock.calls, [
      [baseDir, "build", "--filter", "...@azure/app-configuration..."],
    ]);
  });

  it("should run lint in appropriate folders", () => {
    executeActions("lint", ["appconfiguration"], [], "azure-app-configuration");
    const packageDir = pathJoin(baseDir, "sdk/appconfiguration/app-configuration");
    assert.deepEqual(vi.mocked(spawnPnpmRun).mock.calls, [[packageDir, "lint"]]);
  });

  it("should run test for those impacted by non-restricted package", () => {
    executeActions("test:node", ["core", "communication"], [], "azure-communication-identity");
    assert.deepEqual(vi.mocked(spawnPnpm).mock.calls, [
      [
        baseDir,
        "test:node",
        "--filter",
        "@azure/communication-identity",
        "--filter",
        "@azure-rest/synapse-access-control",
        "--filter",
        "@azure/arm-resources",
        "--filter",
        "@azure/identity",
        "--filter",
        "@azure/service-bus",
        "--filter",
        "@azure/template",
      ],
    ]);
  });

  it("should handle arbitrary run commands", () => {
    executeActions("foo", ["appconfiguration"], [], "azure-app-configuration");
    assert.deepEqual(vi.mocked(spawnPnpm).mock.calls, [
      [baseDir, "foo", "--filter", "@azure/app-configuration..."],
    ]);
  });

  it("should pass through arguments", () => {
    const runArgs = ["--logLevel", "info"];
    executeActions("build", ["appconfiguration"], runArgs, "azure-app-configuration");
    assert.deepEqual(vi.mocked(spawnPnpm).mock.calls, [
      [baseDir, "build", "--filter", "...@azure/app-configuration...", ...runArgs],
    ]);
  });

  it("should return a non-zero return when a command fails", () => {
    vi.mocked(spawnPnpm).mockReturnValueOnce(1);
    const resultCode = executeActions("build", ["appconfiguration"], [], "azure-app-configuration");
    assert.strictEqual(resultCode, 1);
  });

  it("should return a non-zero return when one of many commands fails", () => {
    vi.mocked(spawnPnpmRun).mockReturnValueOnce(0).mockReturnValueOnce(1).mockReturnValueOnce(0);
    const resultCode = executeActions(
      "lint",
      ["appconfiguration", "storage", "keyvault"],
      [],
      "azure-app-configuration,azure-storage-blob,azure-keyvault-keys",
    );
    assert.strictEqual(resultCode, 1);
  });

  it("should route check-package-version to verifyPackages function", () => {
    vi.mocked(verifyPackages).mockReturnValueOnce(0);
    const resultCode = executeActions(
      "check-package-version",
      ["appconfiguration"],
      [],
      "azure-app-configuration",
    );
    assert.strictEqual(resultCode, 0);
    assert.strictEqual(vi.mocked(verifyPackages).mock.calls.length, 1);
    assert.deepEqual(vi.mocked(verifyPackages).mock.calls[0][0], ["@azure/app-configuration"]);
  });
});
