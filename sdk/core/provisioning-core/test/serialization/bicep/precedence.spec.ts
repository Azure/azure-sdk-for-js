// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  type InfraNode,
  type BinaryOperator,
  type ExpressionNode,
  type UnaryOperator,
} from "../../../src/serialization/ast/index.js";
import { describe, expect, it } from "vitest";
import { renderBicepFile } from "../../../src/serialization/bicep/render.js";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function renderExpr(expr: ExpressionNode): string {
  const file: InfraNode = {
    fileName: "test.bicep",
    variables: {
      testVar: {
        bicepIdentifier: "testVar",
        value: expr,
      },
    },
  };
  const result = renderBicepFile(file);
  const match = result.contents.match(/var testVar = (.+)/);
  return match?.[1] ?? "";
}

const id = (name: string): ExpressionNode => ({
  kind: "identifier",
  id: name,
});

const bin = (op: BinaryOperator, left: ExpressionNode, right: ExpressionNode): ExpressionNode => ({
  kind: "binary-operation",
  operator: op,
  left,
  right,
});

const unary = (op: UnaryOperator, argument: ExpressionNode): ExpressionNode => ({
  kind: "unary-operation",
  operator: op,
  argument,
});

const ternary = (
  condition: ExpressionNode,
  trueValue: ExpressionNode,
  falseValue: ExpressionNode,
): ExpressionNode => ({
  kind: "ternary-operation",
  condition,
  trueValue,
  falseValue,
});

const int = (value: number): ExpressionNode => ({
  kind: "integer",
  value: String(value),
});

// ---------------------------------------------------------------------------
// Precedence tests
// ---------------------------------------------------------------------------

describe("Bicep expression precedence", () => {
  it("(a + b) * c — inner add is parenthesized", () => {
    // mul has higher precedence than add, so add inside mul needs parens
    const expr = bin("*", bin("+", id("a"), id("b")), id("c"));
    expect(renderExpr(expr)).toBe("(a + b) * c");
  });

  it("a * b + c — mul is NOT parenthesized", () => {
    // mul has higher precedence than add, so mul inside add doesn't need parens
    const expr = bin("+", bin("*", id("a"), id("b")), id("c"));
    expect(renderExpr(expr)).toBe("a * b + c");
  });

  it("a - b - c — left-associative, no parens needed", () => {
    // left-associative: (a - b) - c
    const expr = bin("-", bin("-", id("a"), id("b")), id("c"));
    expect(renderExpr(expr)).toBe("a - b - c");
  });

  it("a - (b - c) — right sub needs parens", () => {
    // right operand at same precedence gets parenthesized (right-bias +0.5)
    const expr = bin("-", id("a"), bin("-", id("b"), id("c")));
    expect(renderExpr(expr)).toBe("a - (b - c)");
  });

  it("!a && b — unary higher than &&, no parens needed", () => {
    const expr = bin("&&", unary("!", id("a")), id("b"));
    expect(renderExpr(expr)).toBe("!a && b");
  });

  it("a == b ? x : y — ternary at top level, no parens", () => {
    const expr = ternary(bin("==", id("a"), id("b")), id("x"), id("y"));
    expect(renderExpr(expr)).toBe("a == b ? x : y");
  });

  it("(a > b ? x : y) + 1 — ternary inside add needs parens", () => {
    const expr = bin("+", ternary(bin(">", id("a"), id("b")), id("x"), id("y")), int(1));
    expect(renderExpr(expr)).toBe("(a > b ? x : y) + 1");
  });

  it("(a ? b : c) ? x : y — ternary conditions need parens", () => {
    const expr = ternary(ternary(id("a"), id("b"), id("c")), id("x"), id("y"));
    expect(renderExpr(expr)).toBe("(a ? b : c) ? x : y");
  });

  it("a ? b ? c : d : e — ternary true branches do not need parens", () => {
    const expr = ternary(id("a"), ternary(id("b"), id("c"), id("d")), id("e"));
    expect(renderExpr(expr)).toBe("a ? b ? c : d : e");
  });

  it("a ? b : c ? d : e — ternary false branches do not need parens", () => {
    const expr = ternary(id("a"), id("b"), ternary(id("c"), id("d"), id("e")));
    expect(renderExpr(expr)).toBe("a ? b : c ? d : e");
  });

  it.each([
    { base: ternary(id("a"), id("b"), id("c")), expected: "(a ? b : c)" },
    { base: bin("??", id("a"), id("b")), expected: "(a ?? b)" },
    { base: unary("!", id("a")), expected: "(!a)" },
    { base: id("a"), expected: "a" },
    {
      base: {
        kind: "property-access",
        base: id("a"),
        property: "items",
        nullish: false,
      } satisfies ExpressionNode,
      expected: "a.items",
    },
  ])("preserves $expected as an accessor base", ({ base, expected }) => {
    for (const nullish of [false, true]) {
      expect(renderExpr({ kind: "property-access", base, property: "count", nullish })).toBe(
        `${expected}${nullish ? ".?" : "."}count`,
      );
      for (const fromEnd of [false, true]) {
        expect(renderExpr({ kind: "array-access", base, index: int(1), nullish, fromEnd })).toBe(
          `${expected}[${nullish ? "?" : ""}${fromEnd ? "^" : ""}1]`,
        );
      }
    }
    expect(renderExpr({ kind: "instance-function-call", base, name: "method", args: [] })).toBe(
      `${expected}.method()`,
    );
  });

  it("a || b && c — && has higher precedence, no parens on &&", () => {
    const expr = bin("||", id("a"), bin("&&", id("b"), id("c")));
    expect(renderExpr(expr)).toBe("a || b && c");
  });

  it("(a || b) && c — || inside && needs parens", () => {
    const expr = bin("&&", bin("||", id("a"), id("b")), id("c"));
    expect(renderExpr(expr)).toBe("(a || b) && c");
  });

  it.each(["&&", "||"] as const)("ranks ?? below %s on either side", (operator) => {
    expect(renderExpr(bin(operator, bin("??", id("a"), id("b")), id("c")))).toBe(
      `(a ?? b) ${operator} c`,
    );
    expect(renderExpr(bin(operator, id("a"), bin("??", id("b"), id("c"))))).toBe(
      `a ${operator} (b ?? c)`,
    );
    expect(renderExpr(bin("??", bin(operator, id("a"), id("b")), id("c")))).toBe(
      `a ${operator} b ?? c`,
    );
    expect(renderExpr(bin("??", id("a"), bin(operator, id("b"), id("c"))))).toBe(
      `a ?? b ${operator} c`,
    );
  });

  it("a ?? b + c — + has higher precedence, no parens on +", () => {
    const expr = bin("??", id("a"), bin("+", id("b"), id("c")));
    expect(renderExpr(expr)).toBe("a ?? b + c");
  });

  it("a + b == c + d — + has higher precedence on both sides", () => {
    const expr = bin("==", bin("+", id("a"), id("b")), bin("+", id("c"), id("d")));
    expect(renderExpr(expr)).toBe("a + b == c + d");
  });

  it("a * b + c * d — both muls inside add, no parens", () => {
    const expr = bin("+", bin("*", id("a"), id("b")), bin("*", id("c"), id("d")));
    expect(renderExpr(expr)).toBe("a * b + c * d");
  });

  it("-(a + b) — unary neg around add needs parens", () => {
    const expr = unary("-", bin("+", id("a"), id("b")));
    expect(renderExpr(expr)).toBe("-(a + b)");
  });

  it("!a — simple unary, no parens", () => {
    const expr = unary("!", id("a"));
    expect(renderExpr(expr)).toBe("!a");
  });

  it("a / b % c — same precedence, left-associative", () => {
    const expr = bin("%", bin("/", id("a"), id("b")), id("c"));
    expect(renderExpr(expr)).toBe("a / b % c");
  });

  it("a / (b % c) — right operand at same precedence gets parens", () => {
    const expr = bin("/", id("a"), bin("%", id("b"), id("c")));
    expect(renderExpr(expr)).toBe("a / (b % c)");
  });
});
