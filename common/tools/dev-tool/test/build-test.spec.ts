// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import type { Config, ResolvedConfigResult } from "../src/util/resolveTsConfig.ts";
import { configIncludesSrc, runTypeScript } from "../src/commands/run/build-test.ts";
import { updateBackend } from "../src/util/printer.ts";
import * as childProcess from "node:child_process";

vi.mock("node:child_process", () => ({
  spawnSync: vi.fn(),
}));

function makeConfig(overrides: Partial<Config> = {}): Config {
  return {
    compilerOptions: {},
    ...overrides,
  };
}

describe("configIncludesSrc", () => {
  it("returns true when include/files are omitted", () => {
    const resolved: ResolvedConfigResult = {
      config: makeConfig(),
      references: [],
    };

    expect(configIncludesSrc(resolved)).toBe(true);
  });

  it("returns false when include/files are explicitly empty", () => {
    const resolved: ResolvedConfigResult = {
      config: makeConfig({ include: [], files: [] }),
      references: [],
    };

    expect(configIncludesSrc(resolved)).toBe(false);
  });

  it("returns true when a config includes src", () => {
    const resolved: ResolvedConfigResult = {
      config: makeConfig({ include: ["./src/index.ts"] }),
      references: [],
    };

    expect(configIncludesSrc(resolved)).toBe(true);
  });

  it("checks referenced configs for src", () => {
    const resolved: ResolvedConfigResult = {
      config: makeConfig({ include: ["./test/sample.ts"] }),
      references: [
        {
          path: "/ref/tsconfig.json",
          config: makeConfig({ include: ["./src/ref.ts"] }),
        },
      ],
    };

    expect(configIncludesSrc(resolved)).toBe(true);
  });
});

describe("runTypeScript", () => {
  const errorSpy = vi.fn();

  beforeEach(() => {
    errorSpy.mockReset();
    updateBackend({ error: errorSpy });
  });

  afterEach(() => {
    updateBackend({ error: console.error });
  });

  it("returns false and logs the error message when spawn itself fails", async () => {
    vi.mocked(childProcess.spawnSync).mockReturnValue({
      pid: 0,
      output: [],
      stdout: Buffer.from(""),
      stderr: Buffer.from(""),
      status: null,
      signal: null,
      error: new Error("ENOENT: tsc not found"),
    });

    const result = await runTypeScript("tsconfig.json");

    expect(result).toBe(false);
    const logged = errorSpy.mock.calls.flat().join(" ");
    expect(logged).toContain("ENOENT: tsc not found");
  });

  it("returns false and includes the exit code (not [object Object]) when tsc exits nonzero", async () => {
    vi.mocked(childProcess.spawnSync).mockReturnValue({
      pid: 0,
      output: [],
      stdout: Buffer.from(""),
      stderr: Buffer.from(""),
      status: 2,
      signal: null,
    });

    const result = await runTypeScript("tsconfig.json");

    expect(result).toBe(false);
    const logged = errorSpy.mock.calls.flat().join(" ");
    expect(logged).toContain("exit code 2");
    expect(logged).not.toContain("[object Object]");
  });

  it("returns false and includes the signal name when tsc is killed by a signal", async () => {
    vi.mocked(childProcess.spawnSync).mockReturnValue({
      pid: 0,
      output: [],
      stdout: Buffer.from(""),
      stderr: Buffer.from(""),
      status: null,
      signal: "SIGTERM",
    });

    const result = await runTypeScript("tsconfig.json");

    expect(result).toBe(false);
    const logged = errorSpy.mock.calls.flat().join(" ");
    expect(logged).toContain("signal SIGTERM");
    expect(logged).not.toContain("[object Object]");
  });

  it("returns true when tsc succeeds", async () => {
    vi.mocked(childProcess.spawnSync).mockReturnValue({
      pid: 0,
      output: [],
      stdout: Buffer.from(""),
      stderr: Buffer.from(""),
      status: 0,
      signal: null,
    });

    const result = await runTypeScript("tsconfig.json");

    expect(result).toBe(true);
    expect(errorSpy).not.toHaveBeenCalled();
  });
});
