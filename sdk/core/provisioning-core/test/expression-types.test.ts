import { describe, it, expect } from "vitest";
import type { Expression, ExpressionOrValue, InputOf } from "../src/expression/expressions.js";

type Assert<T extends true> = T;
type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;

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
    type _Required = Assert<Equal<Projected["required"], Expression<string>>>;
    type _Optional = Assert<Equal<Projected["optional"], Expression<string>>>;
    type _Nullable = Assert<Equal<Projected["nullable"], Expression<string | null>>>;
    type _ExplicitUndefined = Assert<Equal<Projected["explicitUndefined"], Expression<string>>>;
    expect(true).toBe(true);
  });

  it("does not change input omission or explicit unsetting", () => {
    const omitted: OptionalDataInput = { required: "value" };
    const unset: OptionalDataInput = {
      required: "value",
      optional: undefined,
    };
    type _WholeExpressionIsInput = Assert<
      Expression<OptionalData> extends OptionalDataInput ? true : false
    >;
    expect(omitted.required).toBe("value");
    expect(unset.optional).toBeUndefined();
  });
});
