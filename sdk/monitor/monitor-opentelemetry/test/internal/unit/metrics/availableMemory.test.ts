// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { describe, it, assert } from "vitest";
import * as os from "node:os";
import { getAvailableMemory } from "../../../../src/metrics/utils.js";

describe("getAvailableMemory", () => {
  it("should return a positive number", () => {
    const result = getAvailableMemory();
    assert.isAbove(result, 0, "Available memory should be greater than 0");
  });

  it("should return a value less than or equal to total memory", () => {
    const result = getAvailableMemory();
    assert.isAtMost(result, os.totalmem(), "Available memory should not exceed total memory");
  });

  it("should return a value close to os.freemem() on non-Linux or at least os.freemem() on Linux", () => {
    const freeMem = os.freemem();
    const result = getAvailableMemory();
    if (process.platform === "linux") {
      // Available memory includes reclaimable memory (cache/buffers),
      // so it should be >= free memory.
      assert.isAtLeast(result, freeMem, "Available memory should be >= free memory on Linux");
    } else {
      // On non-Linux, getAvailableMemory falls back to os.freemem().
      // Allow a small tolerance for memory fluctuations between calls.
      const tolerance = 100 * 1024 * 1024; // 100 MB
      assert.closeTo(result, freeMem, tolerance, "Should approximate os.freemem() on non-Linux");
    }
  });
});

