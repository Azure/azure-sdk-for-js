// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Stack, fn } from "@azure/provisioning-core";
import { deserialize, serialize } from "../src/serialization/index.js";
import { describe, expect, it } from "vitest";

describe("deployment parameters", () => {
  it("round-trips structurally equal object and array defaults", () => {
    const stack = new Stack("parameter-roundtrip");
    stack.parameters.add("objectParam", "object", {
      defaultValue: {
        config: { enabled: true },
        region: fn.toLower("WESTUS"),
      },
      allowed: [
        {
          config: { enabled: true },
          region: fn.toLower("WESTUS"),
        },
      ],
    });
    stack.parameters.add("arrayParam", "array", {
      defaultValue: [{ name: "alpha" }],
      allowed: [[{ name: "alpha" }]],
    });

    expect(() => deserialize(JSON.stringify(serialize(stack)))).not.toThrow();
  });

  it("rejects a structurally different object default", () => {
    const stack = new Stack("invalid-parameter");

    expect(() =>
      stack.parameters.add("objectParam", "object", {
        defaultValue: { mode: "two" },
        allowed: [{ mode: "one" }] as readonly Record<string, unknown>[],
      }),
    ).toThrow("default value must be one of its allowed values");
  });
});
