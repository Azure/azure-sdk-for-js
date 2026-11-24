// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";
import { isExpression, Resource, Stack } from "../../../src/index.js";
import { symbolicValueExpressionNode } from "../../../src/expression/ast-nodes.js";
import { unwrapExpression, wrapExpression } from "../../../src/expression/expressions.js";
import { createLoopedResource, Loop } from "../../../src/constructs/resource/resource.js";
import type { ExpressionNode } from "../../../src/serialization/ast/index.js";
import {
  restoreExpression,
  type DeclarationReferenceMap,
} from "../../../src/serialization/ast/expression-restorer.js";
import {
  buildExpression,
  type ExpressionNodeInput,
} from "../../../src/serialization/ast/expression-builder.js";
import type { DeclarationSymbolMap } from "../../../src/serialization/symbol-map.js";

describe("restoreExpression", () => {
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

    expect(restoreExpression(node, new Map())).toEqual({
      items: ["value", -7, true, null],
    });
  });

  it.each([Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER])(
    "restores safe integer boundary %s exactly",
    (value) => {
      expect(restoreExpression({ kind: "integer", value: String(value) }, new Map())).toBe(value);
    },
  );

  it.each(["-9007199254740992", "9007199254740993"])(
    "rejects unsafe integer literal %s",
    (value) => {
      expect(() => restoreExpression({ kind: "integer", value }, new Map())).toThrow(
        `Cannot deserialize unsafe integer literal "${value}".`,
      );
    },
  );

  // Azure/azure-sdk-for-js#39825 Copilot review PRRT_kwDOBnSy6c6iHY8W:
  // "Object expression keys are untrusted serialized data. Writing __proto__ into {} mutates the returned object's prototype and drops the own property, corrupting a round trip; construct this dictionary with a null prototype."
  it("preserves __proto__ as an own object-expression key", () => {
    const value = Object.create(null) as Record<string, ExpressionNode>;
    value.__proto__ = { kind: "boolean", value: true };

    const result = restoreExpression({ kind: "object", value }, new Map()) as Record<
      string,
      unknown
    >;

    expect(Object.getPrototypeOf(result)).toBeNull();
    expect(Object.prototype.hasOwnProperty.call(result, "__proto__")).toBe(true);
    expect(result.__proto__).toBe(true);
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

    const result = restoreExpression(node, new Map());

    expect(isExpression(result)).toBe(true);
    expect(buildExpression(result as ExpressionNodeInput)).toEqual(node);
  });

  it("rejects function calls with expression-valued targets", () => {
    const node: ExpressionNode = {
      kind: "function-call",
      target: { kind: "identifier", id: "callable" },
      args: [],
    };

    expect(() => restoreExpression(node, new Map())).toThrow(
      "Cannot deserialize function call with an expression target.",
    );
  });

  it("resolves identifiers to their existing symbol handles", () => {
    const parameter = wrapExpression<string>(symbolicValueExpressionNode("location"));
    const symbols: DeclarationReferenceMap = new Map([["location", parameter]]);

    expect(restoreExpression({ kind: "identifier", id: "location" }, symbols)).toBe(parameter);
    expect(symbols.size).toBe(1);
  });

  it.each([false, true])(
    "preserves instance-call resource receivers (existing: %s)",
    (existing) => {
      const stack = new Stack("instance-call", {
        targetScope: "resourceGroup",
      });
      const account = new Resource(stack, {
        name: "exampleaccount",
        type: "Microsoft.Storage/storageAccounts",
        apiVersion: "2023-05-01",
        existing,
      });
      const node: ExpressionNode = {
        kind: "instance-function-call",
        base: { kind: "identifier", id: "account" },
        name: "listKeys",
        args: [{ kind: "string", value: "2023-05-01" }],
      };
      const symbols: DeclarationReferenceMap = new Map([["account", account]]);
      const result = restoreExpression(node, symbols);

      expect(isExpression(result)).toBe(true);
      if (!isExpression(result)) {
        throw new Error("Expected an expression handle.");
      }
      const restored = unwrapExpression(result);
      expect(restored.kind).toBe("instance-function-call");
      if (restored.kind !== "instance-function-call") {
        throw new Error("Expected an instance call.");
      }
      expect(restored.base.kind).toBe("identifier");
      if (restored.base.kind !== "identifier") {
        throw new Error("Expected an identifier receiver.");
      }
      expect(restored.base.id).toBe(account);
      expect(buildExpression(result, new Map([[account, "renamedAccount"]]))).toEqual({
        ...node,
        base: { kind: "identifier", id: "renamedAccount" },
      });
    },
  );

  it.each([false, true])(
    "preserves symbolic instance-call receivers (resolved expression: %s)",
    (resolved) => {
      const node: ExpressionNode = {
        kind: "instance-function-call",
        base: { kind: "identifier", id: "external" },
        name: "listKeys",
        args: [{ kind: "string", value: "2023-05-01" }],
      };
      const symbols: DeclarationReferenceMap = new Map();
      if (resolved) {
        symbols.set("external", wrapExpression(symbolicValueExpressionNode("external")));
      }

      const result = restoreExpression(node, symbols);

      expect(isExpression(result)).toBe(true);
      expect(buildExpression(result as ExpressionNodeInput)).toEqual(node);
    },
  );

  it("preserves unknown names as symbolic identifiers", () => {
    const node: ExpressionNode = { kind: "identifier", id: "external" };
    const symbols: DeclarationReferenceMap = new Map();
    const result = restoreExpression(node, symbols);

    expect(isExpression(result)).toBe(true);
    if (!isExpression(result)) {
      throw new Error("Expected an expression handle.");
    }
    expect(unwrapExpression(result)).toEqual(node);
    expect(symbols.size).toBe(0);
  });

  it.each([false, true])("preserves property access modifiers (nullish: %s)", (nullish) => {
    const node: ExpressionNode = {
      kind: "property-access",
      base: { kind: "identifier", id: "source" },
      property: "optional",
      nullish,
    };
    const parameter = wrapExpression(symbolicValueExpressionNode("source"));

    for (const symbols of [new Map(), new Map([["source", parameter]])]) {
      const restored = restoreExpression(node, symbols);
      expect(isExpression(restored)).toBe(true);
      if (!isExpression(restored)) throw new Error("Expected an expression");
      expect(buildExpression(restored)).toEqual(node);
    }
  });

  it.each([
    { nullish: false, fromEnd: false },
    { nullish: true, fromEnd: false },
    { nullish: false, fromEnd: true },
    { nullish: true, fromEnd: true },
  ])("preserves array modifiers (nullish: $nullish, fromEnd: $fromEnd)", ({ nullish, fromEnd }) => {
    const stack = new Stack("access-modifiers", {
      targetScope: "resourceGroup",
    });
    const looped = createLoopedResource(Resource, new Loop(["first", "second"]), stack, {
      name: "widget",
      type: "Contoso.Test/widgets",
      apiVersion: "2024-01-01",
    });
    const parameter = wrapExpression(symbolicValueExpressionNode("items"));
    const symbolMaps: DeclarationReferenceMap[] = [
      new Map(),
      new Map([["items", parameter]]),
      new Map([["items", looped]]),
    ];
    const serializationSymbols: DeclarationSymbolMap = new Map([[looped, "items"]]);
    const indexes: ExpressionNode[] = [
      { kind: "integer", value: "1" },
      { kind: "identifier", id: "i" },
      {
        kind: "binary-operation",
        operator: "+",
        left: { kind: "identifier", id: "i" },
        right: { kind: "integer", value: "1" },
      },
    ];

    for (const symbols of symbolMaps) {
      for (const index of indexes) {
        const node: ExpressionNode = {
          kind: "property-access",
          base: {
            kind: "array-access",
            base: { kind: "identifier", id: "items" },
            index,
            nullish,
            fromEnd,
          },
          property: "name",
          nullish: true,
        };
        const restored = restoreExpression(node, symbols);
        expect(isExpression(restored)).toBe(true);
        if (!isExpression(restored)) {
          throw new Error("Expected an expression");
        }
        expect(buildExpression(restored, serializationSymbols)).toEqual(node);
      }
    }
  });

  it("preserves safe resource accesses and the referenced resource identity", () => {
    const stack = new Stack("resource-access", {
      targetScope: "resourceGroup",
    });
    const resource = new Resource(stack, {
      name: "widget",
      type: "Contoso.Test/widgets",
      apiVersion: "2024-01-01",
    });
    const symbols: DeclarationReferenceMap = new Map([["source", resource]]);
    const serializationSymbols: DeclarationSymbolMap = new Map([[resource, "renamedSource"]]);
    const nodes: ExpressionNode[] = [
      {
        kind: "property-access",
        base: { kind: "identifier", id: "source" },
        property: "name",
        nullish: true,
      },
      {
        kind: "property-access",
        base: { kind: "identifier", id: "source" },
        property: "type",
        nullish: true,
      },
      {
        kind: "array-access",
        base: { kind: "identifier", id: "source" },
        index: { kind: "string", value: "has-dash" },
        nullish: true,
        fromEnd: false,
      },
    ];

    for (const node of nodes) {
      const restored = restoreExpression(node, symbols);
      expect(isExpression(restored)).toBe(true);
      if (!isExpression(restored)) throw new Error("Expected an expression");
      expect(buildExpression(restored, serializationSymbols)).toEqual({
        ...node,
        base: { kind: "identifier", id: "renamedSource" },
      });
    }
  });
});
