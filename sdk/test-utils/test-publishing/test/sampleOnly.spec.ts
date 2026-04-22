// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { sampleOnly } from "../src/index.js";

describe("sampleOnly", () => {
  it("returns undefined at runtime", () => {
    const result = sampleOnly(() => "this only appears in samples");
    expect(result).toBeUndefined();
  });

  it("does not call the published callback", () => {
    const result = sampleOnly(() => {
      throw new Error("callback should not be called");
    });
    expect(result).toBeUndefined();
  });

  it("works with complex types", () => {
    const result = sampleOnly(() => console.log("sample message"));
    expect(result).toBeUndefined();
  });
});
