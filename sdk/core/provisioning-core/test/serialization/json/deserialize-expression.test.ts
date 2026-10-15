// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";
import { isExpression, Resource, Stack } from "@azure/provisioning-core";
import { symbolicValueExpressionNode } from "../../../src/expression/ast-nodes.js";
import { unwrapExpression, wrapExpression } from "../../../src/expression/expressions.js";
import { createLoopedResource, Loop } from "../../../src/constructs/resource/resource.js";
import type { ExpressionNode } from "../../../src/serialization/contract/index.js";
import {
  deserializeDependsOnExpression,
  deserializeExpression,
  serializeExpression,
  type DeserializationSymbolMap,
  type SerializableValue,
} from "../../../src/serialization/json/expression.js";

describe("deserializeExpression", () => {
  it("restores nested literal values without a stack", () => {
    const node: ExpressionNode = {
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
    };

    expect(deserializeExpression(node, new Map())).toEqual({
      items: ["value", -7, true, null],
    });
  });

  it("reconstructs function calls and arithmetic without executing them", () => {
    const node: ExpressionNode = {
      kind: "function-call",
      target: "concat",
      args: [
        { kind: "string", value: "prefix-" },
        {
          kind: "binary-operation",
          operator: "+",
          left: { kind: "integer", value: "1" },
          right: { kind: "integer", value: "2" },
        },
      ],
    };

    const result = deserializeExpression(node, new Map());

    expect(isExpression(result)).toBe(true);
    expect(serializeExpression(result as SerializableValue)).toEqual(node);
  });

  it("resolves identifiers to their existing symbol handles", () => {
    const parameter = wrapExpression<string>(symbolicValueExpressionNode("location"));
    const symbols: DeserializationSymbolMap = new Map([["location", parameter]]);

    expect(deserializeExpression({ kind: "identifier", id: "location" }, symbols)).toBe(parameter);
    expect(symbols.size).toBe(1);
  });

  it("preserves unknown names as symbolic identifiers", () => {
    const node: ExpressionNode = { kind: "identifier", id: "external" };
    const symbols: DeserializationSymbolMap = new Map();
    const result = deserializeExpression(node, symbols);

    expect(isExpression(result)).toBe(true);
    if (!isExpression(result)) throw new Error("Expected an expression handle.");
    expect(unwrapExpression(result)).toEqual(node);
    expect(symbols.size).toBe(0);
  });
});

describe("deserializeDependsOnExpression", () => {
  it("preserves scalar and looped resource identity and dependency order", () => {
    const stack = new Stack("dependencies", { targetScope: "resourceGroup" });
    const scalar = new Resource(stack, {
      name: "scalar",
      type: "Contoso.Test/widgets",
      apiVersion: "2024-01-01",
    });
    const looped = createLoopedResource(Resource, new Loop(["first", "second"]), stack, {
      name: "looped",
      type: "Contoso.Test/widgets",
      apiVersion: "2024-01-01",
    });
    const symbols: DeserializationSymbolMap = new Map();
    symbols.set("scalar", scalar);
    symbols.set("looped", looped);
    const dependencies = deserializeDependsOnExpression(
      {
        kind: "array",
        items: [
          { kind: "identifier", id: "looped" },
          { kind: "identifier", id: "scalar" },
        ],
      },
      symbols,
      "consumer",
    );

    expect(dependencies).toHaveLength(2);
    expect(dependencies[0]).toBe(looped);
    expect(dependencies[1]).toBe(scalar);
    expect(symbols.size).toBe(2);
  });

  it("accepts an empty dependency array", () => {
    expect(
      deserializeDependsOnExpression({ kind: "array", items: [] }, new Map(), "consumer"),
    ).toEqual([]);
  });

  it("rejects a non-array value", () => {
    expect(() =>
      deserializeDependsOnExpression({ kind: "identifier", id: "source" }, new Map(), "consumer"),
    ).toThrow('Resource "consumer" has an invalid "dependsOn" value; expected an array.');
  });

  it("rejects a non-identifier array element", () => {
    expect(() =>
      deserializeDependsOnExpression(
        { kind: "array", items: [{ kind: "string", value: "source" }] },
        new Map(),
        "consumer",
      ),
    ).toThrow(
      'Resource "consumer" has an invalid "dependsOn" reference; expected a resource identifier.',
    );
  });

  it.each([false, true])("rejects unresolved or non-resource symbols (present: %s)", (present) => {
    const symbols: DeserializationSymbolMap = new Map();
    if (present) {
      symbols.set("source", wrapExpression(symbolicValueExpressionNode("source")));
    }

    expect(() =>
      deserializeDependsOnExpression(
        { kind: "array", items: [{ kind: "identifier", id: "source" }] },
        symbols,
        "consumer",
      ),
    ).toThrow(
      present
        ? 'Resource "consumer" references non-resource symbol "source" in "dependsOn".'
        : 'Resource "consumer" references unknown resource "source" in "dependsOn".',
    );
  });
});
