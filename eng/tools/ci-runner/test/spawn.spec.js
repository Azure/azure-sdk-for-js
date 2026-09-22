// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import { afterEach, assert, beforeEach, describe, it, vi } from "vitest";
import { spawnSync } from "node:child_process";
import { spawnPnpm } from "../src/spawn.js";

vi.mock("node:child_process", () => {
  return {
    spawnSync: vi.fn(),
  };
});

describe("spawnWithLog (via spawnPnpm)", () => {
  /** @type {import("vitest").MockInstance} */
  let errorSpy;
  /** @type {import("vitest").MockInstance} */
  let logSpy;

  beforeEach(() => {
    errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.mocked(spawnSync).mockReset();
  });

  it("returns the numeric exit status when the process exits normally", () => {
    vi.mocked(spawnSync).mockReturnValue(
      /** @type {any} */ ({ status: 0, signal: null, error: undefined }),
    );

    const result = spawnPnpm("cwd", "build");

    assert.strictEqual(result, 0);
    assert.strictEqual(errorSpy.mock.calls.length, 0);
    assert.ok(
      logSpy.mock.calls.some((c) => String(c[0]).includes("exited with code 0, signal none")),
    );
  });

  it("returns the numeric exit status for a non-zero exit", () => {
    vi.mocked(spawnSync).mockReturnValue(
      /** @type {any} */ ({ status: 1, signal: null, error: undefined }),
    );

    const result = spawnPnpm("cwd", "build");

    assert.strictEqual(result, 1);
  });

  it("logs the spawn error and returns 1 when the process fails to spawn", () => {
    const error = new Error("spawn pnpm ENOENT");
    vi.mocked(spawnSync).mockReturnValue(
      /** @type {any} */ ({ status: null, signal: null, error }),
    );

    const result = spawnPnpm("cwd", "build");

    assert.strictEqual(result, 1);
    assert.ok(
      errorSpy.mock.calls.some((c) => String(c[0]).includes("Failed to spawn")),
      "should log a failed-to-spawn message",
    );
  });

  it("logs the terminating signal and returns 1 when killed by a signal", () => {
    vi.mocked(spawnSync).mockReturnValue(
      /** @type {any} */ ({ status: null, signal: "SIGTERM", error: undefined }),
    );

    const result = spawnPnpm("cwd", "build");

    assert.strictEqual(result, 1);
    assert.ok(
      errorSpy.mock.calls.some((c) => String(c[0]).includes("terminated by signal SIGTERM")),
      "should log the terminating signal",
    );
    assert.ok(
      logSpy.mock.calls.some((c) => String(c[0]).includes("signal SIGTERM")),
      "should include the signal in the exit log line",
    );
  });

  it("adds an out-of-memory hint when killed by SIGKILL", () => {
    vi.mocked(spawnSync).mockReturnValue(
      /** @type {any} */ ({ status: null, signal: "SIGKILL", error: undefined }),
    );

    const result = spawnPnpm("cwd", "build");

    assert.strictEqual(result, 1);
    assert.ok(
      errorSpy.mock.calls.some((c) => String(c[0]).includes("out-of-memory")),
      "should hint at an out-of-memory kill for SIGKILL",
    );
  });
});
