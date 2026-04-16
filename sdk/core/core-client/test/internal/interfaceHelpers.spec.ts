// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import type { ParameterPath } from "../../src/interfaces.js";
import { getPathStringFromParameter } from "../../src/interfaceHelpers.js";

describe("interfaceHelpers coverage", () => {
  it("should fall back to mapper.serializedName when parameterPath is an object", () => {
    const result = getPathStringFromParameter({
      parameterPath: { a: "a" } as ParameterPath,
      mapper: {
        serializedName: "fallbackName",
        type: { name: "Composite" },
      },
    });
    assert.strictEqual(result, "fallbackName");
  });
});
