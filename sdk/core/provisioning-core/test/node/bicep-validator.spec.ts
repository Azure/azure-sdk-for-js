// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { execFileSync } from "node:child_process";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type * as validatorModule from "../scripts/test/bicep-validator.js";

vi.mock("node:child_process", () => ({ execFileSync: vi.fn() }));

describe("Bicep CLI discovery", () => {
  let validator: typeof validatorModule;
  const exec = vi.mocked(execFileSync);

  beforeEach(async () => {
    vi.resetModules();
    exec.mockReset();
    validator = await import("../scripts/test/bicep-validator.js");
  });

  it("shares successful discovery across resolution and validation calls without skipping builds", () => {
    const cli = validator.resolveBicepCli();

    expect(validator.resolveBicepCli()).toBe(cli);
    expect(validator.tryResolveBicepCli()).toBe(cli);
    validator.validateBicepEntryFiles(["first.bicep"]);
    validator.validateBicepEntryFiles(["second.bicep"]);

    expect(exec).toHaveBeenCalledTimes(3);
    expect(exec).toHaveBeenNthCalledWith(1, cli.command, cli.versionArgs, {
      stdio: ["ignore", "ignore", "ignore"],
    });
    expect(exec).toHaveBeenNthCalledWith(2, cli.command, cli.buildArgs("first.bicep"), {
      stdio: ["ignore", "ignore", "pipe"],
    });
    expect(exec).toHaveBeenNthCalledWith(3, cli.command, cli.buildArgs("second.bicep"), {
      stdio: ["ignore", "ignore", "pipe"],
    });
  });

  it("caches a successful fallback without probing earlier candidates again", () => {
    exec.mockImplementationOnce(() => {
      throw new Error("First candidate unavailable");
    });
    exec.mockImplementationOnce(() => {
      throw new Error("Second candidate unavailable");
    });
    const cli = validator.resolveBicepCli();

    expect(cli.command).toBe("bicep");
    expect(validator.resolveBicepCli()).toBe(cli);
    expect(validator.tryResolveBicepCli()).toBe(cli);
    expect(exec).toHaveBeenCalledTimes(3);
  });

  it("retries discovery after failure so a newly available CLI can be found", () => {
    exec.mockImplementation(() => {
      throw new Error("CLI unavailable");
    });

    expect(() => validator.resolveBicepCli()).toThrow("Bicep CLI is required for validation");
    expect(validator.tryResolveBicepCli()).toBeUndefined();
    expect(exec).toHaveBeenCalledTimes(8);

    exec.mockReset();
    const cli = validator.resolveBicepCli();
    expect(validator.tryResolveBicepCli()).toBe(cli);
    expect(exec).toHaveBeenCalledTimes(1);
  });

  it("still reports compiler failures when using the cached CLI", () => {
    validator.resolveBicepCli();
    exec.mockImplementationOnce(() => {
      throw new Error("Compiler diagnostic");
    });

    expect(() => validator.validateBicepEntryFiles(["invalid.bicep"])).toThrow(
      "Bicep compilation failed for 'invalid.bicep'.\nCompiler diagnostic",
    );
    expect(exec).toHaveBeenCalledTimes(2);
  });
});
