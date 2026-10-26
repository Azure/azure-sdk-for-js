// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { asDiscriminator, ParameterCollection, type ExpressionOrValue } from "../src/index.js";
import { describe, expect, expectTypeOf, it } from "vitest";

type RuleInput =
  | {
      kind: "cache";
      cacheKind: ExpressionOrValue<"long" | "short">;
      days: ExpressionOrValue<number>;
    }
  | {
      kind: "redirect";
      url: ExpressionOrValue<string>;
    };

describe("documentation snippets", () => {
  const kindParam = new ParameterCollection().add("ruleKind", "string", {
    allowed: ["cache"],
  });
  const widget: { properties: { primaryRule?: RuleInput } } = {
    properties: {},
  };

  it("AsDiscriminator", () => {
    widget.properties.primaryRule = {
      kind: asDiscriminator(kindParam),
      cacheKind: "long",
      days: 7,
    };
  });

  it("preserves the expression and checks the selected variant", () => {
    expect(asDiscriminator(kindParam)).toBe(kindParam);
    expectTypeOf(asDiscriminator(kindParam)).toEqualTypeOf<"cache">();

    const rule: RuleInput = {
      kind: asDiscriminator(kindParam),
      cacheKind: "long",
      days: 7,
    };
    expectTypeOf(rule.kind).toEqualTypeOf<"cache">();
    expectTypeOf(rule.days).toEqualTypeOf<ExpressionOrValue<number>>();
    // @ts-expect-error The redirect variant's property is not available.
    expect(rule.url).toBeUndefined();

    const invalidVariant: RuleInput = {
      kind: asDiscriminator(kindParam),
      cacheKind: "long",
      days: 7,
      // @ts-expect-error Redirect properties cannot be assigned to a cache rule.
      url: "https://example.com",
    };
    const invalidDays: RuleInput = {
      kind: asDiscriminator(kindParam),
      cacheKind: "long",
      // @ts-expect-error Cache rule days must be numeric.
      days: "seven",
    };
    const invalidCacheKind: RuleInput = {
      kind: asDiscriminator(kindParam),
      // @ts-expect-error The selected variant retains its literal property type.
      cacheKind: "forever",
      days: 7,
    };
    expect(invalidVariant.kind).toBe(kindParam);
    expect(invalidDays.kind).toBe(kindParam);
    expect(invalidCacheKind.kind).toBe(kindParam);
  });
});
