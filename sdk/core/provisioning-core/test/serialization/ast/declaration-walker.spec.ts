// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";
import type {
  DeclarationNode,
  ExpressionNode,
  ParameterDeclarationNode,
  TypeNode,
} from "../../../src/serialization/ast/index.js";
import {
  walkDeclarationExpressions,
  walkExpressionNode,
} from "../../../src/serialization/ast/expression-walker.js";
import { rewriteDeclarationExpressions } from "../../../src/serialization/ast/expression-rewriter.js";

const reference: ExpressionNode = { kind: "identifier", id: "value" };
const metadata: ExpressionNode = { kind: "identifier", id: "metadata" };
const allowed: ExpressionNode = { kind: "identifier", id: "allowed" };
const stringType: TypeNode = { kind: "primitive-type", name: "string" };
const decorators = {
  description: "not-an-expression",
  metadata: { detail: metadata },
  allowed: [allowed],
};
const declarations: { name: string; node: DeclarationNode }[] = [
  {
    name: "resource",
    node: {
      bicepIdentifier: "resource",
      type: "Contoso.Test/widgets",
      apiVersion: "2024-01-01",
      existing: false,
      value: { kind: "object", value: { name: reference } },
      decorators,
    },
  },
  {
    name: "module",
    node: {
      bicepIdentifier: "module",
      path: "./module.bicep",
      value: {
        kind: "if-condition",
        condition: reference,
        body: { kind: "object", value: {} },
      },
      decorators,
    },
  },
  {
    name: "variable",
    node: { bicepIdentifier: "variable", value: reference, decorators },
  },
  {
    name: "output",
    node: {
      bicepIdentifier: "output",
      valueType: stringType,
      value: reference,
      decorators,
    },
  },
  {
    name: "parameter",
    node: {
      bicepIdentifier: "parameter",
      valueType: stringType,
      defaultValue: reference,
      decorators,
    },
  },
];

function freeze(value: unknown): void {
  if (value === null || typeof value !== "object") return;
  Object.freeze(value);
  for (const child of Object.values(value)) freeze(child);
}

describe("walkDeclarationExpressions", () => {
  it.each(declarations)(
    "visits original expressions in a frozen $name declaration without changing its shape",
    ({ node }) => {
      const original = structuredClone(node);
      freeze(node);
      const visited: ExpressionNode[] = [];
      expect(
        walkDeclarationExpressions(node, (expression) => {
          visited.push(expression);
        }),
      ).toBeUndefined();
      expect(visited.filter((expression) => expression.kind === "identifier")).toEqual([
        reference,
        metadata,
        allowed,
      ]);
      expect(visited.find((expression) => expression === reference)).toBe(reference);
      expect(visited.find((expression) => expression === metadata)).toBe(metadata);
      expect(visited.find((expression) => expression === allowed)).toBe(allowed);
      expect(node).toEqual(original);
    },
  );

  const decoratedType: TypeNode = {
    kind: "object-type",
    properties: [
      {
        kind: "object-type-property",
        key: "detail",
        valueType: stringType,
        decorators: { metadata: { detail: metadata } },
      },
    ],
    additionalProperties: {
      kind: "object-type-additional-properties",
      valueType: stringType,
      decorators: { allowed: [allowed] },
    },
  };
  const nestedTypes: TypeNode[] = [
    decoratedType,
    { kind: "array-type", item: decoratedType },
    { kind: "nullable-type", base: decoratedType },
    { kind: "object-type-property", key: "nested", valueType: decoratedType },
    { kind: "object-type-additional-properties", valueType: decoratedType },
    { kind: "union-type-member", valueType: decoratedType },
    {
      kind: "union-type",
      members: [{ kind: "union-type-member", valueType: decoratedType }],
    },
    { kind: "parameterized-type-argument", valueType: decoratedType },
    {
      kind: "parameterized-type-instantiation",
      base: { kind: "type-reference", name: "Container" },
      args: [{ kind: "parameterized-type-argument", valueType: decoratedType }],
    },
  ];
  it.each(nestedTypes)(
    "visits expressions in nested $kind decorators, not type names",
    (valueType) => {
      const node: ParameterDeclarationNode = {
        bicepIdentifier: "input",
        valueType,
      };
      freeze(node);
      const visited: ExpressionNode[] = [];
      walkDeclarationExpressions(node, (expression) => {
        visited.push(expression);
      });
      expect(visited).toEqual([metadata, allowed]);
      const rewrittenVisits: ExpressionNode[] = [];
      expect(
        rewriteDeclarationExpressions(node, (expression) => {
          walkExpressionNode(expression, (child) => {
            rewrittenVisits.push(child);
          });
          return expression;
        }),
      ).toBe(node);
      expect(rewrittenVisits).toEqual(visited);
      expect(Object.hasOwn(node, "defaultValue")).toBe(false);
      expect(Object.hasOwn(node, "decorators")).toBe(false);
    },
  );

  it.each<TypeNode>([
    stringType,
    { kind: "type-reference", name: "Named" },
    { kind: "string-type-literal", value: "literal" },
    { kind: "integer-type-literal", value: "1" },
    { kind: "boolean-type-literal", value: true },
    { kind: "null-type-literal", value: null },
  ])("does not visit $kind or scalar decorator values as expressions", (valueType) => {
    const visited: ExpressionNode[] = [];
    walkDeclarationExpressions(
      {
        bicepIdentifier: "input",
        valueType,
        decorators: {
          description: "description",
          secure: true,
          minValue: 0,
          maxLength: 10,
        },
      },
      (expression) => {
        visited.push(expression);
      },
    );
    expect(visited).toEqual([]);
  });

  it("skips one expression's children without skipping other fields or declarations", () => {
    const node: ParameterDeclarationNode = {
      bicepIdentifier: "input",
      valueType: decoratedType,
      defaultValue: { kind: "array", items: [reference] },
      decorators,
    };
    const visited: ExpressionNode[] = [];
    walkDeclarationExpressions(node, (expression) => {
      visited.push(expression);
      if (expression.kind === "array") return false;
      return undefined;
    });
    expect(visited).toEqual([node.defaultValue, metadata, allowed, metadata, allowed]);
  });

  it("keeps loop bindings local to the body, not collection or decorator roots", () => {
    const identifier = (id: string): ExpressionNode => ({
      kind: "identifier",
      id,
    });
    const bindings: { id: string; bound: string[] }[] = [];
    walkDeclarationExpressions(
      {
        bicepIdentifier: "loop",
        valueType: stringType,
        defaultValue: {
          kind: "for-expression",
          itemVariable: "item",
          indexVariable: "index",
          collection: identifier("item"),
          body: {
            kind: "array",
            items: [identifier("item"), identifier("index")],
          },
        },
        decorators: {
          metadata: { item: identifier("item") },
          allowed: [identifier("index")],
        },
      },
      (expression, bound) => {
        if (expression.kind === "identifier") {
          bindings.push({ id: expression.id, bound: [...bound] });
        }
      },
    );
    expect(bindings).toEqual([
      { id: "item", bound: [] },
      { id: "item", bound: ["item", "index"] },
      { id: "index", bound: ["item", "index"] },
      { id: "item", bound: [] },
      { id: "index", bound: [] },
    ]);
  });
});
