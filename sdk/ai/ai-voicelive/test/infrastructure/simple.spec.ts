// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";

describe("Simple Infrastructure Test", () => {
  it("should run basic test", () => {
    expect(1 + 1).toBe(2);
  });

  it("should handle async operations", async () => {
    const result = await Promise.resolve(42);
    expect(result).toBe(42);
  });
});
