// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";
import type { ExpressionNode } from "../../../src/serialization/ast/index.js";
import { walkExpressionNode } from "../../../src/serialization/ast/expression-walker.js";

describe("walkExpressionNode", () => {
  it("supports inspection in preorder without changing the input", () => {
    const expression: ExpressionNode = {
      kind: "function-call",
      target: "concat",
      args: [
        { kind: "string", value: "prefix" },
        {
          kind: "property-access",
          base: { kind: "identifier", id: "source" },
          property: "name",
          nullish: true,
        },
      ],
    };
    const original = structuredClone(expression);
    const visited: string[] = [];
    const nodes: ExpressionNode[] = [];
    const result = walkExpressionNode(expression, (node) => {
      visited.push(node.kind);
      nodes.push(node);
    });
    expect(visited).toEqual(["function-call", "string", "property-access", "identifier"]);
    expect(result).toBeUndefined();
    expect(nodes[0]).toBe(expression);
    expect(nodes[1]).toBe(expression.args[0]);
    expect(nodes[2]).toBe(expression.args[1]);
    const member = expression.args[1]!;
    if (member.kind !== "property-access") {
      throw new Error("Expected member access");
    }
    expect(nodes[3]).toBe(member.base);
    expect(expression).toEqual(original);
  });

  it("can skip children without replacing their subtree", () => {
    const expression: ExpressionNode = {
      kind: "object",
      value: {
        name: {
          kind: "array",
          items: [{ kind: "identifier", id: "original" }],
        },
      },
    };
    const child = expression.value.name;
    const visited: string[] = [];
    const result = walkExpressionNode(expression, (node) => {
      visited.push(node.kind);
      if (node.kind === "array") return false;
    });
    expect(visited).toEqual(["object", "array"]);
    expect(result).toBeUndefined();
    expect(expression.value.name).toBe(child);
  });

  it("continues traversal when a visitor returns true", () => {
    const expression: ExpressionNode = {
      kind: "array",
      items: [{ kind: "identifier", id: "source" }],
    };
    const visited: string[] = [];
    expect(
      walkExpressionNode(expression, (node) => {
        visited.push(node.kind);
        return true;
      }),
    ).toBeUndefined();
    expect(visited).toEqual(["array", "identifier"]);
  });

  it("reports item and index bindings only inside loop bodies", () => {
    const expression: ExpressionNode = {
      kind: "for-expression",
      itemVariable: "item",
      indexVariable: "index",
      collection: { kind: "identifier", id: "items" },
      body: {
        kind: "for-expression",
        itemVariable: "inner",
        collection: { kind: "identifier", id: "item" },
        body: {
          kind: "array",
          items: [
            { kind: "identifier", id: "item" },
            { kind: "identifier", id: "index" },
            { kind: "identifier", id: "inner" },
          ],
        },
      },
    };
    const bindings: { identifier: string; boundIdentifiers: string[] }[] = [];
    walkExpressionNode(expression, (node, boundIdentifiers) => {
      if (node.kind === "identifier") {
        bindings.push({
          identifier: node.id,
          boundIdentifiers: [...boundIdentifiers],
        });
      }
    });
    expect(bindings).toEqual([
      { identifier: "items", boundIdentifiers: [] },
      { identifier: "item", boundIdentifiers: ["item", "index"] },
      { identifier: "item", boundIdentifiers: ["item", "index", "inner"] },
      { identifier: "index", boundIdentifiers: ["item", "index", "inner"] },
      { identifier: "inner", boundIdentifiers: ["item", "index", "inner"] },
    ]);
  });
});
