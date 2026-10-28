// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";

import {
  accessExpressionNode,
  arrayAccessExpressionNode,
  functionCallExpressionNode,
  identifierExpressionNode,
  propertyAccessExpressionNode,
  type ExpressionNode,
} from "../../../src/expression/ast-nodes.js";
import { wrapExpression } from "../../../src/expression/expressions.js";
import { fn } from "../../../src/index.js";
import {
  buildExpression,
  moduleOutputExpression,
  type ExpressionNodeInput,
} from "../../../src/serialization/ast/expression-builder.js";

describe("moduleOutputExpression", () => {
  it("builds the module outputs access chain with ordinary property access", () => {
    const expression = moduleOutputExpression("storageModule", "storageId");
    expect(expression).toEqual({
      kind: "property-access",
      base: {
        kind: "property-access",
        base: { kind: "identifier", id: "storageModule" },
        property: "outputs",
        nullish: false,
      },
      property: "storageId",
      nullish: false,
    });
    expect(moduleOutputExpression("storageModule", "storageId")).not.toBe(expression);
  });
});

describe("buildExpression ARM property paths", () => {
  it("builds unstamped property access without changing the input", () => {
    const node = propertyAccessExpressionNode(identifierExpressionNode("widget"), "foo");

    expect(buildExpression(node)).toEqual(node);
    expect(node.property).toBe("foo");
  });

  it("rewrites a stamped access to its single-segment ARM path", () => {
    const base = identifierExpressionNode("widget");
    const node = propertyAccessExpressionNode(base, "foo", {
      armPath: ["fooArm"],
    });
    const lowered = buildExpression(node);

    expect(lowered).toEqual(propertyAccessExpressionNode(base, "fooArm"));
    expect(node.armPath).toEqual(["fooArm"]);
  });

  it.each(["name", "has-dash"])("preserves %s for an empty ARM path", (property) => {
    const base = identifierExpressionNode("widget");
    const stampedBase = propertyAccessExpressionNode(base, "props", {
      armPath: ["properties"],
    });
    const node = propertyAccessExpressionNode(stampedBase, property, {
      armPath: [],
    });
    const lowered = buildExpression(node);
    const expected = accessExpressionNode(
      propertyAccessExpressionNode(base, "properties"),
      property,
    );

    expect(lowered).toEqual(buildExpression(expected));
    expect(node.armPath).toEqual([]);
  });

  it("expands a multi-segment ARM path", () => {
    const base = identifierExpressionNode("widget");
    const node = propertyAccessExpressionNode(base, "enabled", {
      armPath: ["properties", "enabled"],
    });

    expect(buildExpression(node)).toEqual(
      propertyAccessExpressionNode(propertyAccessExpressionNode(base, "properties"), "enabled"),
    );
  });

  it("rewrites a stamped base under an unstamped access", () => {
    const base = identifierExpressionNode("widget");
    const inner = propertyAccessExpressionNode(base, "foo", {
      armPath: ["fooArm"],
    });
    const outer = propertyAccessExpressionNode(inner, "raw");

    expect(buildExpression(outer)).toEqual(
      propertyAccessExpressionNode(propertyAccessExpressionNode(base, "fooArm"), "raw"),
    );
    expect(outer.base).toBe(inner);
    expect(inner.property).toBe("foo");
  });

  it("serializes an unstamped access above a stamped base as an expression", () => {
    const base = identifierExpressionNode("widget");
    const inner = propertyAccessExpressionNode(base, "foo", {
      armPath: ["fooArm"],
    });
    const outer = propertyAccessExpressionNode(inner, "raw");

    expect(buildExpression(outer)).toEqual({
      kind: "property-access",
      base: {
        kind: "property-access",
        base: { kind: "identifier", id: "widget" },
        property: "fooArm",
        nullish: false,
      },
      property: "raw",
      nullish: false,
    });
  });

  it("uses array access for non-identifier ARM path segments", () => {
    const base = identifierExpressionNode("widget");
    const node = propertyAccessExpressionNode(base, "foo", {
      armPath: ["has-dash"],
    });

    expect(buildExpression(node)).toEqual({
      kind: "array-access",
      base,
      index: { kind: "string", value: "has-dash" },
      nullish: false,
      fromEnd: false,
    });
  });

  it("traverses function arguments and array-access bases without mutating them", () => {
    const stamped = propertyAccessExpressionNode(identifierExpressionNode("widget"), "items", {
      armPath: ["properties", "items"],
    });
    const call = functionCallExpressionNode("length", [stamped]);
    const indexed = arrayAccessExpressionNode(stamped, 0);
    const outer = propertyAccessExpressionNode(indexed, "name");

    const expanded = propertyAccessExpressionNode(
      propertyAccessExpressionNode(identifierExpressionNode("widget"), "properties"),
      "items",
    );
    expect(buildExpression(call)).toEqual({
      kind: "function-call",
      target: "length",
      args: [expanded],
    });
    const expectedIndex = {
      kind: "array-access",
      base: expanded,
      index: { kind: "integer", value: "0" },
      nullish: false,
      fromEnd: false,
    };
    expect(buildExpression(indexed)).toEqual(expectedIndex);
    expect(buildExpression(outer)).toEqual({
      kind: "property-access",
      base: expectedIndex,
      property: "name",
      nullish: false,
    });
    expect(call.args[0]).toBe(stamped);
    expect(indexed.base).toBe(stamped);
    expect(outer.base).toBe(indexed);
    expect(stamped.armPath).toEqual(["properties", "items"]);
  });

  it.each([
    { armPath: [] },
    { armPath: ["renamed"] },
    { armPath: ["properties", "renamed"] },
    { armPath: ["has-dash", "renamed"] },
  ])("preserves safe access through ARM path $armPath", ({ armPath }) => {
    const base = identifierExpressionNode("widget");
    const node = propertyAccessExpressionNode(base, "optional", {
      armPath,
      nullish: true,
    });
    const expected = (armPath.length > 0 ? armPath : ["optional"]).reduce<ExpressionNode>(
      (current, segment) => accessExpressionNode(current, segment, { nullish: true }),
      base,
    );

    expect(buildExpression(node)).toEqual(buildExpression(expected));
    expect(node.nullish).toBe(true);
    expect(node.armPath).toEqual(armPath);
  });

  it("preserves safe access above a stamped base", () => {
    const base = identifierExpressionNode("widget");
    const node = propertyAccessExpressionNode(
      propertyAccessExpressionNode(base, "props", {
        armPath: ["properties"],
      }),
      "optional",
      { nullish: true },
    );

    expect(buildExpression(node)).toEqual(
      propertyAccessExpressionNode(propertyAccessExpressionNode(base, "properties"), "optional", {
        nullish: true,
      }),
    );
  });
});

describe("buildExpression", () => {
  it("serializes nested values without a stack or symbol map", () => {
    const value: ExpressionNodeInput = {
      items: ["value", -7, true, null],
      omitted: undefined,
    };

    expect(buildExpression(value)).toEqual({
      kind: "object",
      value: {
        items: {
          kind: "array",
          items: [
            { kind: "string", value: "value" },
            { kind: "integer", value: "-7" },
            { kind: "boolean", value: true },
            { kind: "null", value: null },
          ],
        },
      },
    });
  });

  // Azure/azure-sdk-for-js#39825 Copilot review PRRT_kwDOBnSy6c6kYqF6:
  // "The pre-dispatch check treats any ordinary object with a kind property as an expression node. A valid variable or resource property such as { kind: \"property-access\" } then reaches lowerArmPropertyAccessChain, which dereferences a missing base and throws instead of serializing the object. Guard this lowering pass with isExpressionNode before accessing expression-node fields."
  it("serializes ordinary objects whose kind resembles an expression node", () => {
    expect(buildExpression({ kind: "property-access" })).toEqual({
      kind: "object",
      value: { kind: { kind: "string", value: "property-access" } },
    });
  });

  // Azure/azure-sdk-for-js#39825 Copilot review PRRT_kwDOBnSy6c6iDhrX:
  // "Using in also accepts inherited Object.prototype names, so values such as { kind: \"toString\" } are incorrectly identified as expression nodes. Check for an own key, as the generated primitive-type guard already does."
  it("does not classify inherited object names as expression kinds", () => {
    expect(buildExpression({ kind: "toString" })).toEqual({
      kind: "object",
      value: { kind: { kind: "string", value: "toString" } },
    });
  });

  it("serializes expression proxies recursively", () => {
    expect(buildExpression(fn.add(1, fn.mul(2, 3)))).toEqual({
      kind: "binary-operation",
      operator: "+",
      left: { kind: "integer", value: "1" },
      right: {
        kind: "binary-operation",
        operator: "*",
        left: { kind: "integer", value: "2" },
        right: { kind: "integer", value: "3" },
      },
    });
  });

  it("lowers stamped ARM property paths", () => {
    const expression = wrapExpression(
      propertyAccessExpressionNode(identifierExpressionNode("widget"), "tierName", {
        armPath: ["sku", "tier", "name"],
      }),
    );

    expect(buildExpression(expression)).toEqual({
      kind: "property-access",
      base: {
        kind: "property-access",
        base: {
          kind: "property-access",
          base: { kind: "identifier", id: "widget" },
          property: "sku",
          nullish: false,
        },
        property: "tier",
        nullish: false,
      },
      property: "name",
      nullish: false,
    });
  });

  it("rejects non-integer numbers", () => {
    expect(() => buildExpression(1.5)).toThrow(
      "Bicep serialization currently only supports integer numbers.",
    );
  });

  it.each([Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER])(
    "serializes safe integer boundary %s exactly",
    (value) => {
      expect(buildExpression(value)).toEqual({
        kind: "integer",
        value: String(value),
      });
    },
  );

  it.each([Number.MIN_SAFE_INTEGER - 1, Number.MAX_SAFE_INTEGER + 1])(
    "rejects unsafe integer %s",
    (value) => {
      expect(() => buildExpression(value)).toThrow(
        "Bicep serialization currently only supports safe integer numbers.",
      );
    },
  );

  it("serializes an empty ARM path using the original property name", () => {
    const expression = wrapExpression(
      propertyAccessExpressionNode(identifierExpressionNode("widget"), "createdAt", {
        armPath: [],
      }),
    );

    expect(buildExpression(expression)).toEqual({
      kind: "property-access",
      base: { kind: "identifier", id: "widget" },
      property: "createdAt",
      nullish: false,
    });
  });

  it("lowers stamped paths through nested containers and expression proxies", () => {
    const base = identifierExpressionNode("widget");
    const stamped = propertyAccessExpressionNode(base, "items", {
      armPath: ["properties", "items"],
    });
    const wirePath = propertyAccessExpressionNode(
      propertyAccessExpressionNode(base, "properties"),
      "items",
    );
    const actual = {
      values: [fn.add(wrapExpression(stamped), 1)],
      itemName: propertyAccessExpressionNode(arrayAccessExpressionNode(stamped, 0), "name"),
      call: functionCallExpressionNode("length", [stamped]),
    };
    const expected = {
      values: [fn.add(wrapExpression(wirePath), 1)],
      itemName: propertyAccessExpressionNode(arrayAccessExpressionNode(wirePath, 0), "name"),
      call: functionCallExpressionNode("length", [wirePath]),
    };

    expect(buildExpression(actual)).toEqual(buildExpression(expected));
    expect(stamped.armPath).toEqual(["properties", "items"]);
  });

  it.each(["member", "has-dash"])(
    "preserves safe access when serializing string index %s",
    (index) => {
      const node = arrayAccessExpressionNode(identifierExpressionNode("values"), index, {
        nullish: true,
      });

      expect(buildExpression(node)).toEqual(
        index === "member"
          ? {
              kind: "property-access",
              base: { kind: "identifier", id: "values" },
              property: index,
              nullish: true,
            }
          : {
              kind: "array-access",
              base: { kind: "identifier", id: "values" },
              index: { kind: "string", value: index },
              nullish: true,
              fromEnd: false,
            },
      );
    },
  );

  it.each(["member", "has-dash", "1", ""])(
    "rejects reverse indexing with literal string %j",
    (index) => {
      for (const nullish of [false, true]) {
        const node = arrayAccessExpressionNode(identifierExpressionNode("values"), index, {
          nullish,
          fromEnd: true,
        });

        expect(() => buildExpression(node)).toThrow(
          "Reverse indexing requires an integer index, not a string.",
        );
      }
    },
  );

  it("preserves modifiers on an index whose base has a stamped ARM path", () => {
    const node = arrayAccessExpressionNode(
      propertyAccessExpressionNode(identifierExpressionNode("widget"), "items", {
        armPath: ["properties", "items"],
        nullish: true,
      }),
      1,
      { nullish: true, fromEnd: true },
    );

    expect(buildExpression(node)).toEqual({
      kind: "array-access",
      base: {
        kind: "property-access",
        base: {
          kind: "property-access",
          base: { kind: "identifier", id: "widget" },
          property: "properties",
          nullish: true,
        },
        property: "items",
        nullish: true,
      },
      index: { kind: "integer", value: "1" },
      nullish: true,
      fromEnd: true,
    });
  });
});
