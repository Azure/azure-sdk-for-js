// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, expectTypeOf } from "vitest";
import type { Expression, ExpressionOrValue, InputOf } from "../src/expression/expressions.js";

interface OptionalData {
  required: string;
  optional?: string;
  nullable?: string | null;
  explicitUndefined: string | undefined;
}

interface OptionalDataInput extends InputOf<OptionalData> {
  required: ExpressionOrValue<string>;
  optional?: ExpressionOrValue<string> | undefined;
  nullable?: ExpressionOrValue<string | null> | undefined;
}

describe("Expression<T>", () => {
  it("projects symbolic object properties without undefined", () => {
    type Projected = Expression<OptionalData>;
    expectTypeOf<Projected["required"]>().toEqualTypeOf<Expression<string>>();
    expectTypeOf<Projected["optional"]>().toEqualTypeOf<Expression<string>>();
    expectTypeOf<Projected["nullable"]>().toEqualTypeOf<Expression<string | null>>();
    expectTypeOf<Projected["explicitUndefined"]>().toEqualTypeOf<Expression<string>>();
  });

  it("does not change input omission or explicit unsetting", () => {
    const omitted: OptionalDataInput = { required: "value" };
    const unset: OptionalDataInput = {
      required: "value",
      optional: undefined,
    };
    expectTypeOf<Expression<OptionalData>>().toExtend<OptionalDataInput>();
    expect(omitted.required).toBe("value");
    expect(unset.optional).toBeUndefined();
  });
});
