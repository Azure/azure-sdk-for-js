// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";
import type { ExpressionNode } from "../../../src/serialization/ast/index.js";
import { rewriteExpressionReferences } from "../../../src/serialization/ast/expression-rewriter.js";

describe("rewriteExpressionReferences", () => {
  it("resolves a complete access chain once using the original expression", () => {
    const expression: ExpressionNode = {
      kind: "array-access",
      base: {
        kind: "property-access",
        base: { kind: "identifier", id: "source" },
        property: "items",
        nullish: true,
      },
      index: { kind: "integer", value: "1" },
      nullish: true,
      fromEnd: true,
    };
    let calls = 0;
    const replacement: ExpressionNode = {
      kind: "identifier",
      id: "sourceItems",
    };
    const result = rewriteExpressionReferences(expression, (reference) => {
      calls++;
      expect(reference.identifier).toBe("source");
      expect(reference.path).toEqual(["items", 1]);
      expect(reference.expression).toBe(expression);
      return replacement;
    });
    expect(result).toBe(replacement);
    expect(calls).toBe(1);
    expect(expression.base).toMatchObject({ nullish: true });
    expect(expression.fromEnd).toBe(true);
  });

  it("returns the original tree when no references change", () => {
    const expression: ExpressionNode = {
      kind: "object",
      value: {
        items: { kind: "array", items: [{ kind: "identifier", id: "local" }] },
        literal: { kind: "string", value: "value" },
      },
    };
    expect(rewriteExpressionReferences(expression, () => undefined)).toBe(expression);
  });

  it("rebuilds changed ancestors and shares untouched branches", () => {
    const reference: ExpressionNode = { kind: "identifier", id: "source" };
    const literal: ExpressionNode = { kind: "string", value: "unchanged" };
    const expression: ExpressionNode = {
      kind: "object",
      value: { items: { kind: "array", items: [reference] }, literal },
    };
    const original = structuredClone(expression);
    const result = rewriteExpressionReferences(expression, ({ identifier }) =>
      identifier === "source" ? { kind: "identifier", id: "parameter" } : undefined,
    );
    expect(result).not.toBe(expression);
    if (result.kind !== "object") throw new Error("Expected object");
    expect(result.value.items).not.toBe(expression.value.items);
    expect(result.value.literal).toBe(literal);
    expect(result.value.items).toEqual({
      kind: "array",
      items: [{ kind: "identifier", id: "parameter" }],
    });
    expect(expression).toEqual(original);
  });

  it("rewrites shared references according to each occurrence's loop scope", () => {
    const reference: ExpressionNode = { kind: "identifier", id: "source" };
    const index: ExpressionNode = { kind: "identifier", id: "position" };
    const expression: ExpressionNode = {
      kind: "array",
      items: [
        reference,
        {
          kind: "for-expression",
          itemVariable: "source",
          indexVariable: "position",
          collection: reference,
          body: { kind: "array", items: [reference, index] },
        },
        index,
      ],
    };
    const result = rewriteExpressionReferences(expression, ({ identifier }) => ({
      kind: "identifier",
      id: `${identifier}Parameter`,
    }));
    expect(result).toEqual({
      ...expression,
      items: [
        { kind: "identifier", id: "sourceParameter" },
        {
          ...expression.items[1],
          collection: { kind: "identifier", id: "sourceParameter" },
          body: { kind: "array", items: [reference, index] },
        },
        { kind: "identifier", id: "positionParameter" },
      ],
    });
    if (result.kind !== "array" || result.items[1]!.kind !== "for-expression") {
      throw new Error("Expected loop");
    }
    expect(result.items[1]!.body).toBe(
      expression.items[1]!.kind === "for-expression" ? expression.items[1]!.body : undefined,
    );
  });

  it("visits all expression forms, including computed indexes and function targets", () => {
    const reference: ExpressionNode = { kind: "identifier", id: "source" };
    const expression: ExpressionNode = {
      kind: "array",
      items: [
        { kind: "function-call", target: reference, args: [reference] },
        { kind: "function-call", target: "length", args: [reference] },
        {
          kind: "instance-function-call",
          base: reference,
          name: "method",
          args: [reference],
        },
        {
          kind: "property-access",
          base: reference,
          property: "name",
          nullish: true,
        },
        {
          kind: "array-access",
          base: reference,
          index: reference,
          nullish: true,
          fromEnd: true,
        },
        {
          kind: "binary-operation",
          operator: "+",
          left: reference,
          right: reference,
        },
        { kind: "unary-operation", operator: "!", argument: reference },
        {
          kind: "ternary-operation",
          condition: reference,
          trueValue: reference,
          falseValue: reference,
        },
        { kind: "if-condition", condition: reference, body: reference },
        {
          kind: "interpolated-string",
          segments: [{ kind: "string", value: "prefix" }, reference],
        },
        { kind: "null", value: null },
        { kind: "boolean", value: true },
        { kind: "integer", value: "1" },
      ],
    };
    const original = structuredClone(expression);
    const replacement: ExpressionNode = { kind: "identifier", id: "parameter" };
    const result = rewriteExpressionReferences(expression, (entry) =>
      entry.path.length === 0 ? replacement : undefined,
    );
    const expected = JSON.stringify(expression).replaceAll('"id":"source"', '"id":"parameter"');
    expect(JSON.stringify(result)).toBe(expected);
    expect(expression).toEqual(original);
  });
});
