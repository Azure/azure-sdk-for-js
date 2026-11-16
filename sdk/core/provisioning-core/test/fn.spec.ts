// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, expectTypeOf } from "vitest";
import {
  add,
  sub,
  mul,
  div,
  mod,
  neg,
  eq,
  neq,
  gt,
  lt,
  gte,
  lte,
  and,
  or,
  not,
  cond,
  coalesce,
  concat,
  toLower,
  toUpper,
  uniqueString,
  resourceId,
  length,
  first,
  objectKeys,
  json,
  empty,
  contains,
  deployment,
  int,
  min,
  max,
  last,
  indexOf,
  flatten,
  skip,
  reverse,
  intersect,
  union,
  items,
  take,
  substring,
  replace,
  split,
  trim,
  startsWith,
  endsWith,
  base64,
  base64ToJson,
  format,
  lastIndexOf,
  guid,
  subscriptionResourceId,
  extensionResourceId,
  environment,
} from "../src/fn.js";
import type {
  BinaryExpressionNode,
  UnaryExpressionNode,
  TernaryExpressionNode,
  FunctionCallExpressionNode,
  PropertyAccessExpressionNode,
} from "../src/expression/ast-nodes.js";
import { isExpression, unwrapExpression, type Expression } from "../src/expression/expressions.js";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function inner(expr: unknown): any {
  return unwrapExpression(expr as any);
}

// ---------------------------------------------------------------------------
// 1. Free function operators
// ---------------------------------------------------------------------------

describe("free function operators", () => {
  describe("arithmetic", () => {
    it("add returns BinaryExpressionNode with +", () => {
      const node = inner(add(1, 2)) as BinaryExpressionNode;
      expect(node.kind).toBe("binary");
      expect(node.operator).toBe("+");
      expect(node.left).toBe(1);
      expect(node.right).toBe(2);
    });

    it("sub returns BinaryExpressionNode with -", () => {
      const node = inner(sub(10, 3)) as BinaryExpressionNode;
      expect(node.kind).toBe("binary");
      expect(node.operator).toBe("-");
      expect(node.left).toBe(10);
      expect(node.right).toBe(3);
    });

    it("mul returns BinaryExpressionNode with *", () => {
      const node = inner(mul(4, 5)) as BinaryExpressionNode;
      expect(node.kind).toBe("binary");
      expect(node.operator).toBe("*");
      expect(node.left).toBe(4);
      expect(node.right).toBe(5);
    });

    it("div returns BinaryExpressionNode with /", () => {
      const node = inner(div(20, 4)) as BinaryExpressionNode;
      expect(node.kind).toBe("binary");
      expect(node.operator).toBe("/");
      expect(node.left).toBe(20);
      expect(node.right).toBe(4);
    });

    it("mod returns BinaryExpressionNode with %", () => {
      const node = inner(mod(7, 3)) as BinaryExpressionNode;
      expect(node.kind).toBe("binary");
      expect(node.operator).toBe("%");
      expect(node.left).toBe(7);
      expect(node.right).toBe(3);
    });

    it("neg returns UnaryExpressionNode with -", () => {
      const node = inner(neg(42)) as UnaryExpressionNode;
      expect(node.kind).toBe("unary");
      expect(node.operator).toBe("-");
      expect(node.argument).toBe(42);
    });
  });

  describe("comparison", () => {
    it("eq returns BinaryExpressionNode with ==", () => {
      const node = inner(eq("a", "b")) as BinaryExpressionNode;
      expect(node.kind).toBe("binary");
      expect(node.operator).toBe("==");
      expect(node.left).toBe("a");
      expect(node.right).toBe("b");
    });

    it("neq returns BinaryExpressionNode with !=", () => {
      const node = inner(neq(1, 2)) as BinaryExpressionNode;
      expect(node.kind).toBe("binary");
      expect(node.operator).toBe("!=");
    });

    it("gt returns BinaryExpressionNode with >", () => {
      const node = inner(gt(5, 3)) as BinaryExpressionNode;
      expect(node.kind).toBe("binary");
      expect(node.operator).toBe(">");
    });

    it("lt returns BinaryExpressionNode with <", () => {
      const node = inner(lt(1, 9)) as BinaryExpressionNode;
      expect(node.kind).toBe("binary");
      expect(node.operator).toBe("<");
    });

    it("gte returns BinaryExpressionNode with >=", () => {
      const node = inner(gte(5, 5)) as BinaryExpressionNode;
      expect(node.kind).toBe("binary");
      expect(node.operator).toBe(">=");
    });

    it("lte returns BinaryExpressionNode with <=", () => {
      const node = inner(lte(3, 7)) as BinaryExpressionNode;
      expect(node.kind).toBe("binary");
      expect(node.operator).toBe("<=");
    });
  });

  describe("boolean", () => {
    it("and with two operands returns BinaryExpressionNode with &&", () => {
      const node = inner(and(true, false)) as BinaryExpressionNode;
      expect(node.kind).toBe("binary");
      expect(node.operator).toBe("&&");
      expect(node.left).toBe(true);
      expect(node.right).toBe(false);
    });

    it("and folds left with three operands", () => {
      const expr = and(true, false, true);
      const node = inner(expr) as BinaryExpressionNode;
      expect(node.kind).toBe("binary");
      expect(node.operator).toBe("&&");
      expect(node.right).toBe(true);
      // left should be the result of and(true, false) — a proxied Expression
      const leftNode = inner(node.left) as BinaryExpressionNode;
      expect(leftNode.kind).toBe("binary");
      expect(leftNode.operator).toBe("&&");
      expect(leftNode.left).toBe(true);
      expect(leftNode.right).toBe(false);
    });

    it("and with single operand returns an expression", () => {
      const expr = and(true);
      expect(isExpression(expr)).toBe(true);
    });

    it("and with zero arguments throws", () => {
      expect(() => and()).toThrow("and() requires at least one argument");
    });

    it("or with two operands returns BinaryExpressionNode with ||", () => {
      const node = inner(or(true, false)) as BinaryExpressionNode;
      expect(node.kind).toBe("binary");
      expect(node.operator).toBe("||");
    });

    it("or folds left with three operands", () => {
      const expr = or(true, false, true);
      const node = inner(expr) as BinaryExpressionNode;
      expect(node.kind).toBe("binary");
      expect(node.operator).toBe("||");
      expect(node.right).toBe(true);
      const leftNode = inner(node.left) as BinaryExpressionNode;
      expect(leftNode.kind).toBe("binary");
      expect(leftNode.operator).toBe("||");
    });

    it("or with zero arguments throws", () => {
      expect(() => or()).toThrow("or() requires at least one argument");
    });

    it("not returns UnaryExpressionNode with !", () => {
      const node = inner(not(true)) as UnaryExpressionNode;
      expect(node.kind).toBe("unary");
      expect(node.operator).toBe("!");
      expect(node.argument).toBe(true);
    });
  });

  describe("conditional", () => {
    it("cond returns TernaryExpressionNode", () => {
      const node = inner(cond(true, "yes", "no")) as TernaryExpressionNode;
      expect(node.kind).toBe("ternary");
      expect(node.condition).toBe(true);
      expect(node.trueValue).toBe("yes");
      expect(node.falseValue).toBe("no");
    });

    it("coalesce returns BinaryExpressionNode with ??", () => {
      const node = inner(coalesce("a", "b")) as BinaryExpressionNode;
      expect(node.kind).toBe("binary");
      expect(node.operator).toBe("??");
      expect(node.left).toBe("a");
      expect(node.right).toBe("b");
    });
  });

  describe("all operators return Expressions", () => {
    it.each([
      ["add", add(1, 2)],
      ["sub", sub(1, 2)],
      ["mul", mul(1, 2)],
      ["div", div(1, 2)],
      ["mod", mod(1, 2)],
      ["neg", neg(1)],
      ["eq", eq(1, 2)],
      ["neq", neq(1, 2)],
      ["gt", gt(1, 2)],
      ["lt", lt(1, 2)],
      ["gte", gte(1, 2)],
      ["lte", lte(1, 2)],
      ["not", not(true)],
      ["cond", cond(true, 1, 2)],
      ["coalesce", coalesce(1, 2)],
    ])("%s returns an Expression (is Expression)", (_name, expr) => {
      expect(isExpression(expr)).toBe(true);
      expect(inner(expr)).toBeDefined();
    });
  });
});

// ---------------------------------------------------------------------------
// 2. Free function Bicep functions
// ---------------------------------------------------------------------------

describe("free function Bicep functions", () => {
  it("concat returns FunctionCallExpressionNode with operator 'concat'", () => {
    const node = inner(concat("a", "b")) as FunctionCallExpressionNode;
    expect(node.kind).toBe("fn-call");
    expect(node.operator).toBe("concat");
    expect(node.args).toEqual(["a", "b"]);
  });

  it("concat as tagged template literal interleaves strings and expressions", () => {
    const expr = concat("dynamic");
    const node = inner(concat`start${expr}end`) as FunctionCallExpressionNode;
    expect(node.kind).toBe("fn-call");
    expect(node.operator).toBe("concat");
    expect(node.args.length).toBe(3);
    expect(node.args[0]).toBe("start");
    expect(inner(node.args[1]).operator).toBe("concat");
    expect(node.args[2]).toBe("end");
  });

  it("concat as tagged template skips empty leading/trailing strings", () => {
    const expr = concat("x");
    const node = inner(concat`${expr}`) as FunctionCallExpressionNode;
    expect(node.kind).toBe("fn-call");
    expect(node.operator).toBe("concat");
    expect(node.args.length).toBe(1);
  });

  it("concat as tagged template with only static text", () => {
    const node = inner(concat`hello world`) as FunctionCallExpressionNode;
    expect(node.kind).toBe("fn-call");
    expect(node.operator).toBe("concat");
    expect(node.args).toEqual(["hello world"]);
  });

  it("concat as tagged template with multiple expressions", () => {
    const a = concat("a");
    const b = concat("b");
    const node = inner(concat`start${a}mid${b}end`) as FunctionCallExpressionNode;
    expect(node.kind).toBe("fn-call");
    expect(node.operator).toBe("concat");
    expect(node.args.length).toBe(5);
    expect(node.args[0]).toBe("start");
    expect(node.args[2]).toBe("mid");
    expect(node.args[4]).toBe("end");
  });

  it("toLower returns FunctionCallExpressionNode with operator 'toLower'", () => {
    const node = inner(toLower("X")) as FunctionCallExpressionNode;
    expect(node.kind).toBe("fn-call");
    expect(node.operator).toBe("toLower");
    expect(node.args).toEqual(["X"]);
  });

  it("toUpper returns FunctionCallExpressionNode with operator 'toUpper'", () => {
    const node = inner(toUpper("hello")) as FunctionCallExpressionNode;
    expect(node.kind).toBe("fn-call");
    expect(node.operator).toBe("toUpper");
    expect(node.args).toEqual(["hello"]);
  });

  it("uniqueString returns FunctionCallExpressionNode with variadic args", () => {
    const node = inner(uniqueString("a", "b", "c")) as FunctionCallExpressionNode;
    expect(node.kind).toBe("fn-call");
    expect(node.operator).toBe("uniqueString");
    expect(node.args).toEqual(["a", "b", "c"]);
  });

  it("resourceId returns FunctionCallExpressionNode with type and names", () => {
    const node = inner(
      resourceId("Microsoft.Storage/storageAccounts", "mysa"),
    ) as FunctionCallExpressionNode;
    expect(node.kind).toBe("fn-call");
    expect(node.operator).toBe("resourceId");
    expect(node.args).toEqual(["Microsoft.Storage/storageAccounts", "mysa"]);
  });

  it("length returns FunctionCallExpressionNode", () => {
    const node = inner(length("hello")) as FunctionCallExpressionNode;
    expect(node.kind).toBe("fn-call");
    expect(node.operator).toBe("length");
    expect(node.args).toEqual(["hello"]);
  });

  it("first returns FunctionCallExpressionNode", () => {
    const arr = [1, 2, 3];
    const node = inner(first(arr)) as FunctionCallExpressionNode;
    expect(node.kind).toBe("fn-call");
    expect(node.operator).toBe("first");
    expect(node.args).toEqual([arr]);
  });

  // Azure/azure-sdk-for-js#39825 Copilot review PRRT_kwDOBnSy6c6eW0DQ:
  // "Bicep exposes this operation as objectKeys(), not keys()."
  it("objectKeys emits the Bicep objectKeys function", () => {
    const obj = { a: 1 };
    const node = inner(objectKeys(obj)) as FunctionCallExpressionNode;
    expect(node.kind).toBe("fn-call");
    expect(node.operator).toBe("objectKeys");
    expect(node.args).toEqual([obj]);
  });

  it("json returns FunctionCallExpressionNode", () => {
    const node = inner(json('{"a":1}')) as FunctionCallExpressionNode;
    expect(node.kind).toBe("fn-call");
    expect(node.operator).toBe("json");
    expect(node.args).toEqual(['{"a":1}']);
  });

  it("empty returns FunctionCallExpressionNode", () => {
    const node = inner(empty("")) as FunctionCallExpressionNode;
    expect(node.kind).toBe("fn-call");
    expect(node.operator).toBe("empty");
    expect(node.args).toEqual([""]);
  });

  it("contains returns FunctionCallExpressionNode", () => {
    const node = inner(contains("hello world", "hello")) as FunctionCallExpressionNode;
    expect(node.kind).toBe("fn-call");
    expect(node.operator).toBe("contains");
    expect(node.args).toEqual(["hello world", "hello"]);
  });

  it("deployment returns FunctionCallExpressionNode with no args", () => {
    const node = inner(deployment()) as FunctionCallExpressionNode;
    expect(node.kind).toBe("fn-call");
    expect(node.operator).toBe("deployment");
    expect(node.args).toEqual([]);
  });

  it("all Bicep functions return Expressions", () => {
    for (const expr of [
      concat("a"),
      toLower("x"),
      uniqueString("s"),
      resourceId("T", "n"),
      length("x"),
      json("{}"),
      deployment(),
    ]) {
      expect(isExpression(expr)).toBe(true);
    }
  });

  it("guid returns FunctionCallExpressionNode with operator 'guid'", () => {
    const node = inner(guid("a", "b")) as FunctionCallExpressionNode;
    expect(node.kind).toBe("fn-call");
    expect(node.operator).toBe("guid");
    expect(node.args).toEqual(["a", "b"]);
  });

  it("subscriptionResourceId returns FunctionCallExpressionNode with operator 'subscriptionResourceId'", () => {
    const node = inner(subscriptionResourceId("Type", "name1")) as FunctionCallExpressionNode;
    expect(node.kind).toBe("fn-call");
    expect(node.operator).toBe("subscriptionResourceId");
    expect(node.args).toEqual(["Type", "name1"]);
  });

  it("extensionResourceId returns FunctionCallExpressionNode with operator 'extensionResourceId'", () => {
    const node = inner(
      extensionResourceId("baseId", "Type", "name1"),
    ) as FunctionCallExpressionNode;
    expect(node.kind).toBe("fn-call");
    expect(node.operator).toBe("extensionResourceId");
    expect(node.args).toEqual(["baseId", "Type", "name1"]);
  });

  it("environment returns FunctionCallExpressionNode with no args", () => {
    const node = inner(environment()) as FunctionCallExpressionNode;
    expect(node.kind).toBe("fn-call");
    expect(node.operator).toBe("environment");
    expect(node.args).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// 2b. String functions
// ---------------------------------------------------------------------------

describe("free function string functions", () => {
  it("take returns FunctionCallExpressionNode with operator 'take'", () => {
    const node = inner(take("hello", 3)) as FunctionCallExpressionNode;
    expect(node.kind).toBe("fn-call");
    expect(node.operator).toBe("take");
    expect(node.args).toEqual(["hello", 3]);
  });

  it("substring omits optional trailing arguments", () => {
    const whole = inner(substring("hello")) as FunctionCallExpressionNode;
    const remainder = inner(substring("hello", 1)) as FunctionCallExpressionNode;
    const range = inner(substring("hello", 1, 3)) as FunctionCallExpressionNode;

    expect(whole.kind).toBe("fn-call");
    expect(whole.operator).toBe("substring");
    expect(whole.args).toEqual(["hello"]);
    expect(remainder.args).toEqual(["hello", 1]);
    expect(range.kind).toBe("fn-call");
    expect(range.operator).toBe("substring");
    expect(range.args).toEqual(["hello", 1, 3]);
  });

  it("replace returns FunctionCallExpressionNode with operator 'replace'", () => {
    const node = inner(replace("hello", "l", "r")) as FunctionCallExpressionNode;
    expect(node.kind).toBe("fn-call");
    expect(node.operator).toBe("replace");
    expect(node.args).toEqual(["hello", "l", "r"]);
  });

  it("split returns FunctionCallExpressionNode with operator 'split'", () => {
    const node = inner(split("a,b,c", ",")) as FunctionCallExpressionNode;
    expect(node.kind).toBe("fn-call");
    expect(node.operator).toBe("split");
    expect(node.args).toEqual(["a,b,c", ","]);
  });

  it("trim returns FunctionCallExpressionNode with operator 'trim'", () => {
    const node = inner(trim(" hello ")) as FunctionCallExpressionNode;
    expect(node.kind).toBe("fn-call");
    expect(node.operator).toBe("trim");
    expect(node.args).toEqual([" hello "]);
  });

  it("startsWith returns FunctionCallExpressionNode with operator 'startsWith'", () => {
    const node = inner(startsWith("hello", "he")) as FunctionCallExpressionNode;
    expect(node.kind).toBe("fn-call");
    expect(node.operator).toBe("startsWith");
    expect(node.args).toEqual(["hello", "he"]);
  });

  it("endsWith returns FunctionCallExpressionNode with operator 'endsWith'", () => {
    const node = inner(endsWith("hello", "lo")) as FunctionCallExpressionNode;
    expect(node.kind).toBe("fn-call");
    expect(node.operator).toBe("endsWith");
    expect(node.args).toEqual(["hello", "lo"]);
  });

  it("base64 returns FunctionCallExpressionNode with operator 'base64'", () => {
    const node = inner(base64("hello")) as FunctionCallExpressionNode;
    expect(node.kind).toBe("fn-call");
    expect(node.operator).toBe("base64");
    expect(node.args).toEqual(["hello"]);
  });

  it("base64ToJson returns FunctionCallExpressionNode with operator 'base64ToJson'", () => {
    const node = inner(base64ToJson("eyJhIjoxfQ==")) as FunctionCallExpressionNode;
    expect(node.kind).toBe("fn-call");
    expect(node.operator).toBe("base64ToJson");
    expect(node.args).toEqual(["eyJhIjoxfQ=="]);
  });

  it("format returns FunctionCallExpressionNode with operator 'format'", () => {
    const node = inner(format("{0}-{1}", "a", "b")) as FunctionCallExpressionNode;
    expect(node.kind).toBe("fn-call");
    expect(node.operator).toBe("format");
    expect(node.args).toEqual(["{0}-{1}", "a", "b"]);
  });

  it("lastIndexOf returns FunctionCallExpressionNode with operator 'lastIndexOf'", () => {
    const node = inner(lastIndexOf("hello", "l")) as FunctionCallExpressionNode;
    expect(node.kind).toBe("fn-call");
    expect(node.operator).toBe("lastIndexOf");
    expect(node.args).toEqual(["hello", "l"]);
  });
});

// ---------------------------------------------------------------------------
// 4. Property access on expression results (Proxy)
// ---------------------------------------------------------------------------

describe("property access on expression results (Proxy)", () => {
  it("accessing a property on an expression proxy returns PropertyAccessExpressionNode", () => {
    const expr = add(1, 2);
    const prop = (expr as any).someProp;
    expect(isExpression(prop)).toBe(true);

    const node = inner(prop) as PropertyAccessExpressionNode;
    expect(node.kind).toBe("property-access");
    expect(node.property).toBe("someProp");
    expect(node.nullish).toBe(false);
    // base should be the original binary expression node
    const baseNode = node.base as BinaryExpressionNode;
    expect(baseNode.kind).toBe("binary");
    expect(baseNode.operator).toBe("+");
    expect(baseNode.left).toBe(1);
    expect(baseNode.right).toBe(2);
  });

  it("chained property access produces nested PropertyAccessExpressions", () => {
    const expr = add(1, 2);
    const prop = (expr as any).foo.bar;
    const node = inner(prop) as PropertyAccessExpressionNode;
    expect(node.kind).toBe("property-access");
    expect(node.property).toBe("bar");
    const outerBase = node.base as PropertyAccessExpressionNode;
    expect(outerBase.kind).toBe("property-access");
    expect(outerBase.property).toBe("foo");
  });

  it("numeric property access produces ArrayAccessExpressionNode", () => {
    const expr = concat("a", "b");
    const indexed = (expr as any)[0];
    expect(isExpression(indexed)).toBe(true);
    const node = inner(indexed);
    expect(node.kind).toBe("array-access");
    expect(node.index).toBe(0);
  });

  it("property access on function call result works", () => {
    const expr = deployment();
    const prop = (expr as any).properties.template;
    const node = inner(prop) as PropertyAccessExpressionNode;
    expect(node.kind).toBe("property-access");
    expect(node.property).toBe("template");
    const base = node.base as PropertyAccessExpressionNode;
    expect(base.kind).toBe("property-access");
    expect(base.property).toBe("properties");
  });
});

// ---------------------------------------------------------------------------
// 5. Numeric, array, and object functions
// ---------------------------------------------------------------------------

describe("numeric functions", () => {
  it("int returns FunctionCallExpressionNode with operator 'int'", () => {
    const node = inner(int("42")) as FunctionCallExpressionNode;
    expect(node.kind).toBe("fn-call");
    expect(node.operator).toBe("int");
    expect(node.args).toEqual(["42"]);
  });

  it("min returns FunctionCallExpressionNode with operator 'min'", () => {
    const node = inner(min(1, 2, 3)) as FunctionCallExpressionNode;
    expect(node.kind).toBe("fn-call");
    expect(node.operator).toBe("min");
    expect(node.args).toEqual([1, 2, 3]);
  });

  it("max returns FunctionCallExpressionNode with operator 'max'", () => {
    const node = inner(max(1, 2, 3)) as FunctionCallExpressionNode;
    expect(node.kind).toBe("fn-call");
    expect(node.operator).toBe("max");
    expect(node.args).toEqual([1, 2, 3]);
  });
});

describe("array functions", () => {
  it("last returns FunctionCallExpressionNode with operator 'last'", () => {
    const arr = [1, 2, 3];
    const node = inner(last(arr)) as FunctionCallExpressionNode;
    expect(node.kind).toBe("fn-call");
    expect(node.operator).toBe("last");
    expect(node.args).toEqual([arr]);
  });

  it("indexOf returns FunctionCallExpressionNode with operator 'indexOf'", () => {
    const arr = [1, 2, 3];
    const node = inner(indexOf(arr, 2)) as FunctionCallExpressionNode;
    expect(node.kind).toBe("fn-call");
    expect(node.operator).toBe("indexOf");
    expect(node.args).toEqual([arr, 2]);
  });

  it("flatten returns FunctionCallExpressionNode with operator 'flatten'", () => {
    const arr = [[1], [2]];
    const node = inner(flatten(arr)) as FunctionCallExpressionNode;
    expect(node.kind).toBe("fn-call");
    expect(node.operator).toBe("flatten");
    expect(node.args).toEqual([arr]);
  });

  it("skip returns FunctionCallExpressionNode with operator 'skip'", () => {
    const arr = [1, 2, 3];
    const node = inner(skip(arr, 1)) as FunctionCallExpressionNode;
    expect(node.kind).toBe("fn-call");
    expect(node.operator).toBe("skip");
    expect(node.args).toEqual([arr, 1]);
  });

  it("reverse returns FunctionCallExpressionNode with operator 'reverse'", () => {
    const arr = [1, 2, 3];
    const node = inner(reverse(arr)) as FunctionCallExpressionNode;
    expect(node.kind).toBe("fn-call");
    expect(node.operator).toBe("reverse");
    expect(node.args).toEqual([arr]);
  });
});

describe("object functions", () => {
  it("intersect returns FunctionCallExpressionNode with operator 'intersection'", () => {
    const node = inner(intersect({ a: 1 }, { a: 2, b: 3 })) as FunctionCallExpressionNode;
    expect(node.kind).toBe("fn-call");
    expect(node.operator).toBe("intersection");
    expect(node.args).toEqual([{ a: 1 }, { a: 2, b: 3 }]);
  });

  it("union returns FunctionCallExpressionNode with operator 'union'", () => {
    const node = inner(union({ a: 1 }, { b: 2 })) as FunctionCallExpressionNode;
    expect(node.kind).toBe("fn-call");
    expect(node.operator).toBe("union");
    expect(node.args).toEqual([{ a: 1 }, { b: 2 }]);
  });

  it("union accepts arrays with different element types", () => {
    const node = inner(union([1], ["two"])) as FunctionCallExpressionNode;
    expect(node.operator).toBe("union");
    expect(node.args).toEqual([[1], ["two"]]);
  });

  it("types object and array unions by their combined contents", () => {
    interface LeftConfig {
      a: number;
    }
    interface RightConfig {
      b: string;
    }

    expectTypeOf(union({ a: 1 }, { b: "two" })).toEqualTypeOf<
      Expression<{ a: number } & { b: string }>
    >();
    expectTypeOf(union({ a: 1 } as LeftConfig, { b: "two" } as RightConfig)).toEqualTypeOf<
      Expression<LeftConfig & RightConfig>
    >();
    expectTypeOf(union([1], ["two"])).toEqualTypeOf<Expression<(number | string)[]>>();

    const assertInvalidUnionTypes = (): void => {
      // @ts-expect-error union accepts arrays or objects, not scalar values.
      union("first", "second");
      // @ts-expect-error union requires both inputs to be the same container kind.
      union([1], { b: "two" });
    };
    void assertInvalidUnionTypes;
  });

  it("items returns FunctionCallExpressionNode with operator 'items'", () => {
    const obj = { a: 1 };
    const node = inner(items(obj)) as FunctionCallExpressionNode;
    expect(node.kind).toBe("fn-call");
    expect(node.operator).toBe("items");
    expect(node.args).toEqual([obj]);
  });
});
