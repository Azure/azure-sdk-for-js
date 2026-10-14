import { describe, expect, it } from "vitest";

import {
  accessExpressionNode,
  arrayAccessExpressionNode,
  functionCallExpressionNode,
  identifierExpressionNode,
  propertyAccessExpressionNode,
} from "../../../src/expression/ast-nodes.js";
import { wrapExpression } from "../../../src/expression/expressions.js";
import { fn } from "@azure/provisioning-core";
import {
  lowerArmPropertyAccessChain,
  serializeExpression,
  type SerializableValue,
} from "../../../src/serialization/json/expression.js";

describe("lowerArmPropertyAccessChain", () => {
  it("passes through unstamped property access unchanged", () => {
    const node = propertyAccessExpressionNode(identifierExpressionNode("widget"), "foo");

    expect(lowerArmPropertyAccessChain(node)).toBe(node);
  });

  it("rewrites a stamped access to its single-segment ARM path", () => {
    const base = identifierExpressionNode("widget");
    const node = propertyAccessExpressionNode(base, "foo", ["fooArm"]);
    const lowered = lowerArmPropertyAccessChain(node);

    expect(lowered).toEqual(propertyAccessExpressionNode(base, "fooArm"));
    expect(lowerArmPropertyAccessChain(lowered)).toBe(lowered);
    expect(node.armPath).toEqual(["fooArm"]);
  });

  it.each(["name", "has-dash"])("preserves %s for an empty ARM path", (property) => {
    const base = identifierExpressionNode("widget");
    const stampedBase = propertyAccessExpressionNode(base, "props", ["properties"]);
    const node = propertyAccessExpressionNode(stampedBase, property, []);
    const lowered = lowerArmPropertyAccessChain(node);
    const expected = accessExpressionNode(
      propertyAccessExpressionNode(base, "properties"),
      property,
    );

    expect(lowered).toEqual(expected);
    expect(lowerArmPropertyAccessChain(lowered)).toBe(lowered);
    expect(node.armPath).toEqual([]);
  });

  it("expands a multi-segment ARM path", () => {
    const base = identifierExpressionNode("widget");
    const node = propertyAccessExpressionNode(base, "enabled", ["properties", "enabled"]);

    expect(lowerArmPropertyAccessChain(node)).toEqual(
      propertyAccessExpressionNode(propertyAccessExpressionNode(base, "properties"), "enabled"),
    );
  });

  it("rewrites a stamped base under an unstamped access", () => {
    const base = identifierExpressionNode("widget");
    const inner = propertyAccessExpressionNode(base, "foo", ["fooArm"]);
    const outer = propertyAccessExpressionNode(inner, "raw");

    expect(lowerArmPropertyAccessChain(outer)).toEqual(
      propertyAccessExpressionNode(propertyAccessExpressionNode(base, "fooArm"), "raw"),
    );
    expect(outer.base).toBe(inner);
    expect(inner.property).toBe("foo");
  });

  it("serializes an unstamped access above a stamped base as an expression", () => {
    const base = identifierExpressionNode("widget");
    const inner = propertyAccessExpressionNode(base, "foo", ["fooArm"]);
    const outer = propertyAccessExpressionNode(inner, "raw");

    expect(serializeExpression(outer)).toEqual({
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
    const node = propertyAccessExpressionNode(base, "foo", ["has-dash"]);

    expect(lowerArmPropertyAccessChain(node)).toEqual(arrayAccessExpressionNode(base, "has-dash"));
  });

  it("leaves function arguments and array-access bases for the serializer to traverse", () => {
    const stamped = propertyAccessExpressionNode(identifierExpressionNode("widget"), "items", [
      "properties",
      "items",
    ]);
    const call = functionCallExpressionNode("length", [stamped]);
    const indexed = arrayAccessExpressionNode(stamped, 0);
    const outer = propertyAccessExpressionNode(indexed, "name");

    expect(lowerArmPropertyAccessChain(call)).toBe(call);
    expect(lowerArmPropertyAccessChain(indexed)).toBe(indexed);
    expect(lowerArmPropertyAccessChain(outer)).toBe(outer);
    expect(stamped.armPath).toEqual(["properties", "items"]);
  });
});

describe("serializeExpression", () => {
  it("serializes nested values without a stack or symbol map", () => {
    const value: SerializableValue = {
      items: ["value", -7, true, null],
      omitted: undefined,
    };

    expect(serializeExpression(value)).toEqual({
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

  it("serializes expression proxies recursively", () => {
    expect(serializeExpression(fn.add(1, fn.mul(2, 3)))).toEqual({
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
      propertyAccessExpressionNode(identifierExpressionNode("widget"), "tierName", [
        "sku",
        "tier",
        "name",
      ]),
    );

    expect(serializeExpression(expression)).toEqual({
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
    expect(() => serializeExpression(1.5)).toThrow(
      "Bicep serialization currently only supports integer numbers.",
    );
  });

  it("serializes an empty ARM path using the original property name", () => {
    const expression = wrapExpression(
      propertyAccessExpressionNode(identifierExpressionNode("widget"), "createdAt", []),
    );

    expect(serializeExpression(expression)).toEqual({
      kind: "property-access",
      base: { kind: "identifier", id: "widget" },
      property: "createdAt",
      nullish: false,
    });
  });

  it("lowers stamped paths through nested containers and expression proxies", () => {
    const base = identifierExpressionNode("widget");
    const stamped = propertyAccessExpressionNode(base, "items", ["properties", "items"]);
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

    expect(serializeExpression(actual)).toEqual(serializeExpression(expected));
    expect(stamped.armPath).toEqual(["properties", "items"]);
  });
});
