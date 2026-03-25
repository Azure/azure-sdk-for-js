// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { describe, it, assert, vi, beforeEach, afterEach } from "vitest";

const { mockFreemem, mockReadFileSync } = vi.hoisted(() => ({
  mockFreemem: vi.fn<() => number>(),
  mockReadFileSync: vi.fn<(path: string, encoding: string) => string>(),
}));

vi.mock("node:fs", async (importOriginal) => {
  const mod = await importOriginal<typeof import("node:fs")>();
  return {
    ...mod,
    readFileSync: mockReadFileSync,
  };
});

vi.mock("node:os", async (importOriginal) => {
  const mod: any = await importOriginal();
  return {
    ...mod,
    default: {
      ...mod.default,
      freemem: mockFreemem,
    },
  };
});

import { getAvailableMemory } from "../../../../src/metrics/utils.js";

describe("getAvailableMemory", () => {
  const originalPlatform = process.platform;

  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(process, "platform", {
      value: originalPlatform,
      configurable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(process, "platform", {
      value: originalPlatform,
      configurable: true,
    });
  });

  it("returns os.freemem() on non-Linux platforms", () => {
    const freeMem = 512 * 1024 * 1024; // 512 MB
    mockFreemem.mockReturnValue(freeMem);

    Object.defineProperty(process, "platform", {
      value: "darwin",
      configurable: true,
    });

    const result = getAvailableMemory();

    assert.strictEqual(result, freeMem, "On non-Linux, available memory should equal os.freemem()");
  });

  it("uses MemAvailable from /proc/meminfo on Linux when present", () => {
    const memAvailableKb = 123456;
    const memInfoContent = [
      "MemTotal:       16384256 kB",
      `MemAvailable:   ${memAvailableKb} kB`,
      "Buffers:         123456 kB",
    ].join("\n");

    Object.defineProperty(process, "platform", {
      value: "linux",
      configurable: true,
    });

    mockReadFileSync.mockReturnValue(memInfoContent);

    const result = getAvailableMemory();

    assert.strictEqual(
      result,
      memAvailableKb * 1024,
      "On Linux, available memory should be derived from MemAvailable in /proc/meminfo",
    );
  });

  it("falls back to os.freemem() on Linux when MemAvailable is not present", () => {
    const freeMem = 256 * 1024 * 1024; // 256 MB
    const memInfoContent = [
      "MemTotal:       16384256 kB",
      "Buffers:         123456 kB",
      "Cached:          654321 kB",
    ].join("\n");

    Object.defineProperty(process, "platform", {
      value: "linux",
      configurable: true,
    });

    mockReadFileSync.mockReturnValue(memInfoContent);
    mockFreemem.mockReturnValue(freeMem);

    const result = getAvailableMemory();

    assert.strictEqual(
      result,
      freeMem,
      "On Linux without MemAvailable, available memory should fall back to os.freemem()",
    );
  });
});
