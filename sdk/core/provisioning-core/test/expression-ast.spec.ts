// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";
import {
  accessExpressionNode,
  arrayAccessExpressionNode,
  identifierExpressionNode,
  isExpressionNode,
  propertyAccessExpressionNode,
} from "../src/expression/ast-nodes.js";
import { normalizeAssignedValue } from "../src/constructs/resource/resource-proxy.js";

describe("member access nodes", () => {
  const base = identifierExpressionNode("source");

  it("defaults to ordinary member access", () => {
    expect(propertyAccessExpressionNode(base, "name")).toEqual({
      kind: "property-access",
      base,
      property: "name",
      nullish: false,
    });
    expect(arrayAccessExpressionNode(base, 1)).toEqual({
      kind: "array-access",
      base,
      index: 1,
      nullish: false,
      fromEnd: false,
    });
  });

  it.each([false, true])("recognizes nullish: %s", (nullish) => {
    const property = propertyAccessExpressionNode(base, "name", { nullish });
    expect(isExpressionNode(property)).toBe(true);
    expect(normalizeAssignedValue(property)).toBe(property);

    for (const fromEnd of [false, true]) {
      const indexed = arrayAccessExpressionNode(property, 1, {
        nullish,
        fromEnd,
      });
      expect(isExpressionNode(indexed)).toBe(true);
      expect(normalizeAssignedValue(indexed)).toBe(indexed);
    }
  });

  it.each(["name", "has-dash", 1])("preserves safe access for member %s", (member) => {
    const node = accessExpressionNode(base, member, { nullish: true });
    expect(node.nullish).toBe(true);
    expect(isExpressionNode(node)).toBe(true);
  });

  it.each([undefined, null, 0, "true"])("rejects non-boolean modifiers: %s", (invalid) => {
    expect(
      isExpressionNode({
        ...propertyAccessExpressionNode(base, "name"),
        nullish: invalid,
      }),
    ).toBe(false);
    for (const flag of ["nullish", "fromEnd"]) {
      expect(
        isExpressionNode({
          ...arrayAccessExpressionNode(base, 1),
          [flag]: invalid,
        }),
      ).toBe(false);
    }
  });
});
