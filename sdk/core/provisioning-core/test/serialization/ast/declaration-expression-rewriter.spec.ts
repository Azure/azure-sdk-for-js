// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, expectTypeOf, it } from "vitest";
import type {
  DecoratorsNode,
  ExpressionNode,
  ModuleDeclarationNode,
  ObjectValue,
  OutputDeclarationNode,
  ParameterDeclarationNode,
  ResourceDeclarationNode,
  TypeNode,
  VariableDeclarationNode,
} from "../../../src/serialization/ast/index.js";
import {
  rewriteDeclarationExpressions,
  rewriteExpressionReferences,
} from "../../../src/serialization/ast/expression-rewriter.js";

const reference: ExpressionNode = { kind: "identifier", id: "source" };
const replacement: ExpressionNode = { kind: "identifier", id: "parameter" };
const stringType: TypeNode = { kind: "primitive-type", name: "string" };
const body: ObjectValue = {
  kind: "object",
  value: { name: reference },
};
const decorators: DecoratorsNode = {
  description: "Description",
  secure: true,
  metadata: { detail: reference },
  allowed: [reference],
};

function rewriteReferences(expression: ExpressionNode): ExpressionNode {
  return rewriteExpressionReferences(expression, ({ identifier }) =>
    identifier === "source" ? replacement : undefined,
  );
}

const resource: ResourceDeclarationNode = {
  bicepIdentifier: "resource",
  type: "Contoso.Test/resources",
  apiVersion: "2024-01-01",
  existing: true,
  value: body,
  decorators,
};
const module: ModuleDeclarationNode = {
  bicepIdentifier: "module",
  path: "./module.bicep",
  value: { kind: "if-condition", condition: reference, body },
  decorators,
};
const variable: VariableDeclarationNode = {
  bicepIdentifier: "variable",
  value: reference,
  decorators,
};
const output: OutputDeclarationNode = {
  bicepIdentifier: "output",
  valueType: stringType,
  value: reference,
  decorators,
};
const parameter: ParameterDeclarationNode = {
  bicepIdentifier: "parameter",
  valueType: stringType,
  defaultValue: reference,
  decorators,
};
const declarations = [
  { name: "resource", node: resource },
  { name: "module", node: module },
  { name: "variable", node: variable },
  { name: "output", node: output },
  { name: "parameter", node: parameter },
];

describe("rewriteDeclarationExpressions", () => {
  it.each(declarations)(
    "rewrites expressions in $name declarations without mutation",
    ({ node }) => {
      const original = structuredClone(node);
      const rewritten = rewriteDeclarationExpressions(node, rewriteReferences);
      expect(rewritten).not.toBe(node);
      expect(JSON.stringify(rewritten)).toBe(
        JSON.stringify(node).replaceAll('"id":"source"', '"id":"parameter"'),
      );
      expect(rewritten.decorators!.description).toBe("Description");
      expect(rewritten.decorators!.secure).toBe(true);
      expect(node).toEqual(original);
    },
  );

  it.each(declarations)(
    "returns the original $name declaration for a no-op rewrite",
    ({ node }) => {
      expect(rewriteDeclarationExpressions(node, (expression) => expression)).toBe(node);
      expect(
        rewriteDeclarationExpressions(node, (expression) =>
          rewriteExpressionReferences(expression, () => undefined),
        ),
      ).toBe(node);
    },
  );

  it("preserves the declared output types of all declaration kinds", () => {
    expectTypeOf(
      rewriteDeclarationExpressions(resource, rewriteReferences),
    ).toEqualTypeOf<ResourceDeclarationNode>();
    expectTypeOf(
      rewriteDeclarationExpressions(module, rewriteReferences),
    ).toEqualTypeOf<ModuleDeclarationNode>();
    expectTypeOf(
      rewriteDeclarationExpressions(output, rewriteReferences),
    ).toEqualTypeOf<OutputDeclarationNode>();
    expectTypeOf(
      rewriteDeclarationExpressions(parameter, rewriteReferences),
    ).toEqualTypeOf<ParameterDeclarationNode>();
    expectTypeOf(
      rewriteDeclarationExpressions(variable, rewriteReferences),
    ).toEqualTypeOf<VariableDeclarationNode>();
  });

  it("lets the callback replace a complete expression subtree without visiting its children", () => {
    const calls: ExpressionNode[] = [];
    const node: VariableDeclarationNode = {
      bicepIdentifier: "value",
      value: body,
    };
    const rewritten = rewriteDeclarationExpressions(node, (expression) => {
      calls.push(expression);
      return { kind: "string", value: "replacement" };
    });
    expect(calls).toEqual([body]);
    expect(rewritten.value).toEqual({ kind: "string", value: "replacement" });
    expect(node.value).toBe(body);
  });

  it("rebuilds only changed decorator fields and shares unaffected expressions and types", () => {
    const stable: ExpressionNode = { kind: "string", value: "stable" };
    const metadata = { changed: reference, unchanged: stable };
    const allowed = [stable];
    const node: OutputDeclarationNode = {
      ...output,
      value: stable,
      decorators: { description: "Description", metadata, allowed },
    };
    const result = rewriteDeclarationExpressions(node, rewriteReferences);
    expect(result.value).toBe(stable);
    expect(result.valueType).toBe(node.valueType);
    expect(result.decorators).not.toBe(node.decorators);
    expect(result.decorators!.metadata).not.toBe(metadata);
    expect(result.decorators!.metadata!.unchanged).toBe(stable);
    expect(result.decorators!.metadata!.changed).toBe(replacement);
    expect(result.decorators!.allowed).toBe(allowed);
    expect(metadata.changed).toBe(reference);
  });

  it("does not add absent optional fields when another expression changes", () => {
    const node: OutputDeclarationNode = {
      bicepIdentifier: "output",
      valueType: {
        kind: "object-type",
        properties: [
          {
            kind: "object-type-property",
            key: "detail",
            optional: false,
            valueType: stringType,
          },
        ],
      },
      value: reference,
    };
    const result = rewriteDeclarationExpressions(node, rewriteReferences);
    expect(Object.hasOwn(result, "decorators")).toBe(false);
    expect(result.valueType).toBe(node.valueType);
    expect(Object.hasOwn(result.valueType, "additionalProperties")).toBe(false);

    const parameterWithoutDefault: ParameterDeclarationNode = {
      bicepIdentifier: "parameter",
      valueType: stringType,
      decorators,
    };
    const rewritten = rewriteDeclarationExpressions(parameterWithoutDefault, rewriteReferences);
    expect(Object.hasOwn(rewritten, "defaultValue")).toBe(false);
    expect(Object.hasOwn(rewritten.decorators!, "discriminator")).toBe(false);
  });

  it("skips absent defaults and optional decorator expressions", () => {
    const node: ParameterDeclarationNode = {
      bicepIdentifier: "parameter",
      valueType: stringType,
      decorators: { metadata: { detail: reference } },
    };
    const calls: ExpressionNode[] = [];
    const result = rewriteDeclarationExpressions(node, (expression) => {
      calls.push(expression);
      return rewriteReferences(expression);
    });
    expect(calls).toEqual([reference]);
    expect(Object.hasOwn(result, "defaultValue")).toBe(false);
    expect(Object.hasOwn(result.decorators!, "allowed")).toBe(false);
    expect(result.defaultValue).toBeUndefined();
    expect(result.decorators!.allowed).toBeUndefined();
  });

  it("preserves metadata keys that match object prototype properties", () => {
    const metadata = Object.fromEntries([
      ["__proto__", reference],
      ["constructor", reference],
    ]);
    const result = rewriteDeclarationExpressions(
      {
        ...variable,
        decorators: { metadata },
      },
      rewriteReferences,
    );
    expect(Object.keys(result.decorators!.metadata!)).toEqual(["__proto__", "constructor"]);
    expect(result.decorators!.metadata!.__proto__).toBe(replacement);
    expect(result.decorators!.metadata!.constructor).toBe(replacement);
    expect(Object.getPrototypeOf(result.decorators!.metadata!)).toBe(Object.prototype);
    expect(metadata.__proto__).toBe(reference);
  });

  it("shares untouched properties and additional-properties nodes in a changed type", () => {
    const changedProperty = {
      kind: "object-type-property" as const,
      key: "changed",
      optional: true,
      valueType: stringType,
      decorators,
    };
    const stableProperty = {
      kind: "object-type-property" as const,
      key: "stable",
      optional: false,
      valueType: stringType,
    };
    const additionalProperties = {
      kind: "object-type-additional-properties" as const,
      valueType: stringType,
    };
    const node: ParameterDeclarationNode = {
      bicepIdentifier: "parameter",
      valueType: {
        kind: "object-type",
        properties: [changedProperty, stableProperty],
        additionalProperties,
      },
    };
    const result = rewriteDeclarationExpressions(node, rewriteReferences);
    if (result.valueType.kind !== "object-type") {
      throw new Error("Expected object type");
    }
    expect(result.valueType.properties[0]).not.toBe(changedProperty);
    expect(result.valueType.properties[0]!.optional).toBe(true);
    expect(result.valueType.properties[0]!.valueType).toBe(stringType);
    expect(result.valueType.properties[1]).toBe(stableProperty);
    expect(result.valueType.additionalProperties).toBe(additionalProperties);
    expect(Object.hasOwn(result, "defaultValue")).toBe(false);
    expect(Object.hasOwn(result, "decorators")).toBe(false);
  });

  const objectType: TypeNode = {
    kind: "object-type",
    properties: [
      {
        kind: "object-type-property",
        key: "detail",
        optional: false,
        valueType: stringType,
        decorators,
      },
    ],
    additionalProperties: {
      kind: "object-type-additional-properties",
      valueType: stringType,
      decorators,
    },
  };
  const nestedTypes: TypeNode[] = [
    objectType,
    {
      kind: "object-type-property",
      key: "detail",
      optional: true,
      valueType: objectType,
      decorators,
    },
    {
      kind: "object-type-additional-properties",
      valueType: objectType,
      decorators,
    },
    { kind: "array-type", item: objectType },
    { kind: "union-type-member", valueType: objectType },
    {
      kind: "union-type",
      members: [
        { kind: "union-type-member", valueType: objectType },
        { kind: "union-type-member", valueType: stringType },
      ],
    },
    { kind: "nullable-type", base: objectType },
    { kind: "parameterized-type-argument", valueType: objectType },
    {
      kind: "parameterized-type-instantiation",
      base: objectType,
      args: [
        { kind: "parameterized-type-argument", valueType: objectType },
        { kind: "parameterized-type-argument", valueType: stringType },
      ],
    },
  ];
  it.each(nestedTypes)(
    "rewrites nested decorators under $kind without mutating the type",
    (valueType) => {
      const node: ParameterDeclarationNode = {
        bicepIdentifier: "parameter",
        valueType,
      };
      const original = structuredClone(node);
      const rewritten = rewriteDeclarationExpressions(node, rewriteReferences);
      expect(rewritten.valueType).not.toBe(valueType);
      expect(JSON.stringify(rewritten)).toBe(
        JSON.stringify(node).replaceAll('"id":"source"', '"id":"parameter"'),
      );
      expect(node).toEqual(original);
      expect(rewriteDeclarationExpressions(node, (expression) => expression)).toBe(node);
    },
  );

  const leafTypes: TypeNode[] = [
    stringType,
    { kind: "type-reference", name: "Named" },
    { kind: "string-type-literal", value: "literal" },
    { kind: "integer-type-literal", value: "42" },
    { kind: "boolean-type-literal", value: true },
    { kind: "null-type-literal", value: null },
  ];
  it.each(leafTypes)("leaves $kind intact when only the declaration value changes", (valueType) => {
    const node: OutputDeclarationNode = { ...output, valueType };
    const result = rewriteDeclarationExpressions(node, rewriteReferences);
    expect(result.valueType).toBe(valueType);
  });

  it.each([resource, module])(
    "rejects invalid bodies for $bicepIdentifier declarations",
    (node) => {
      const original = structuredClone(node);
      expect(() =>
        rewriteDeclarationExpressions(node, () => ({
          kind: "integer",
          value: "42",
        })),
      ).toThrow(
        `Rewriting declaration "${node.bicepIdentifier}" produced an invalid resource/module body: "integer".`,
      );
      expect(node).toEqual(original);
    },
  );

  it("preserves nested resource loop/condition bodies and delegates lexical scope to the callback", () => {
    const loopBody: ExpressionNode = {
      kind: "for-expression",
      itemVariable: "source",
      collection: reference,
      body: { kind: "if-condition", condition: reference, body },
    };
    const node: ResourceDeclarationNode = {
      ...resource,
      value: {
        kind: "if-condition",
        condition: reference,
        body: loopBody,
      },
    };
    const result = rewriteDeclarationExpressions(node, rewriteReferences);
    expect(result.value).toEqual({
      kind: "if-condition",
      condition: replacement,
      body: { ...loopBody, collection: replacement },
    });
    expect(result.type).toBe(resource.type);
    expect(result.existing).toBe(true);
  });
});
