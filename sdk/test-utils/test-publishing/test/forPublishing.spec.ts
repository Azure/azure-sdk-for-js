// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { forPublishing } from "../src/index.js";

describe("forPublishing", () => {
  it("returns the test value at runtime", () => {
    let callbackCalled = false;
    const result = forPublishing("test-value", () => {
      callbackCalled = true;
      return "published-value";
    });
    expect(result).toBe("test-value");
    expect(callbackCalled).toBe(false);
  });

  it("preserves type safety with complex objects", () => {
    interface Config {
      retryCount: number;
      timeout: number;
    }

    const testConfig: Config = { retryCount: 0, timeout: 100 };

    const result = forPublishing(testConfig, () => ({ retryCount: 3, timeout: 30000 }));
    expect(result).toEqual({ retryCount: 0, timeout: 100 });
  });

  it("works with undefined and null values", () => {
    expect(forPublishing(undefined, () => "sample")).toBeUndefined();
    expect(forPublishing(null, () => null)).toBeNull();
  });

  it("does not call the published callback", () => {
    const result = forPublishing("test", () => {
      throw new Error("callback should not be called");
    });
    expect(result).toBe("test");
  });
});
