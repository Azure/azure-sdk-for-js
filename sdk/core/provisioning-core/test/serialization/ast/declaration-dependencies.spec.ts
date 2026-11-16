// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it, vi } from "vitest";
import type {
  DeclarationNode,
  ExpressionNode,
  ParameterDeclarationNode,
  TypeNode,
} from "../../../src/serialization/ast/index.js";
import { collectDependenciesForDeclaration } from "../../../src/serialization/ast/declaration-dependencies.js";
import * as expressionWalker from "../../../src/serialization/ast/expression-walker.js";

describe("collectDependenciesForDeclaration", () => {
  it.each(["resource", "module", "variable", "output", "parameter"] as const)(
    "collects and deduplicates direct references throughout a %s declaration",
    (category) => {
      const value: ExpressionNode = {
        kind: "object",
        value: {
          parent: { kind: "identifier", id: "parent" },
          scope: {
            kind: "function-call",
            target: "resourceGroup",
            args: [{ kind: "identifier", id: "groupName" }],
          },
          source: {
            kind: "property-access",
            base: { kind: "identifier", id: "source" },
            property: "id",
            nullish: true,
          },
        },
      };
      const common = {
        bicepIdentifier: "declaration",
        decorators: {
          description: "notAnIdentifier",
          metadata: {
            source: { kind: "identifier" as const, id: "source" },
            label: { kind: "identifier" as const, id: "label" },
          },
          allowed: [{ kind: "identifier" as const, id: "allowed" }],
        },
      };
      const type: TypeNode = { kind: "primitive-type", name: "object" };
      const node: DeclarationNode =
        category === "parameter"
          ? { ...common, valueType: type, defaultValue: value }
          : category === "output"
            ? { ...common, valueType: type, value }
            : category === "resource"
              ? {
                  ...common,
                  type: "Contoso.Test/widgets",
                  apiVersion: "2024-01-01",
                  existing: true,
                  value,
                }
              : category === "module"
                ? { ...common, path: "./module.bicep", value }
                : { ...common, value };
      const original = structuredClone(node);
      expect(collectDependenciesForDeclaration(node)).toEqual(
        new Set(["parent", "groupName", "source", "label", "allowed"]),
      );
      expect(node).toEqual(original);
    },
  );

  it("does not infer transitive dependencies or interpret property names and literals as identifiers", () => {
    const node: DeclarationNode = {
      bicepIdentifier: "value",
      value: {
        kind: "object",
        value: {
          unrelatedPropertyName: { kind: "string", value: "unrelatedLiteral" },
          reference: {
            kind: "property-access",
            base: { kind: "identifier", id: "direct" },
            property: "notADependency",
            nullish: false,
          },
        },
      },
    };
    expect(collectDependenciesForDeclaration(node)).toEqual(new Set(["direct"]));
  });

  it("handles parameters without defaults while inspecting type and decorator expressions", () => {
    const node: ParameterDeclarationNode = {
      bicepIdentifier: "input",
      valueType: { kind: "type-reference", name: "Named" },
      decorators: {
        metadata: { detail: { kind: "identifier", id: "detail" } },
      },
    };
    expect(collectDependenciesForDeclaration(node)).toEqual(new Set(["Named", "detail"]));
    expect(Object.hasOwn(node, "defaultValue")).toBe(false);
  });

  it("excludes nested loop bindings from defaults without applying them to decorators", () => {
    const node: ParameterDeclarationNode = {
      bicepIdentifier: "input",
      valueType: { kind: "primitive-type", name: "array" },
      defaultValue: {
        kind: "for-expression",
        itemVariable: "item",
        indexVariable: "position",
        collection: { kind: "identifier", id: "items" },
        body: {
          kind: "for-expression",
          itemVariable: "inner",
          collection: {
            kind: "property-access",
            base: { kind: "identifier", id: "item" },
            property: "children",
            nullish: false,
          },
          body: {
            kind: "array",
            items: [
              { kind: "identifier", id: "item" },
              { kind: "identifier", id: "position" },
              { kind: "identifier", id: "inner" },
              { kind: "identifier", id: "outer" },
            ],
          },
        },
      },
      decorators: { allowed: [{ kind: "identifier", id: "item" }] },
    };
    const original = structuredClone(node);
    expect(collectDependenciesForDeclaration(node)).toEqual(new Set(["items", "outer", "item"]));
    expect(node).toEqual(original);
  });

  const decoratedType: TypeNode = {
    kind: "object-type",
    properties: [
      {
        kind: "object-type-property",
        key: "detail",
        valueType: { kind: "type-reference", name: "PropertyType" },
        decorators: {
          metadata: { label: { kind: "identifier", id: "propertyLabel" } },
        },
      },
    ],
    additionalProperties: {
      kind: "object-type-additional-properties",
      valueType: { kind: "type-reference", name: "ExtraType" },
      decorators: { allowed: [{ kind: "identifier", id: "allowedExtra" }] },
    },
  };
  const nestedTypes: TypeNode[] = [
    decoratedType,
    { kind: "array-type", item: decoratedType },
    { kind: "nullable-type", base: decoratedType },
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
    "inspects nested references and decorators in a parameter's $kind",
    (valueType) => {
      const node: ParameterDeclarationNode = {
        bicepIdentifier: "input",
        valueType,
      };
      const expected = new Set(["PropertyType", "propertyLabel", "ExtraType", "allowedExtra"]);
      if (valueType.kind === "parameterized-type-instantiation") {
        expected.add("Container");
      }
      expect(collectDependenciesForDeclaration(node)).toEqual(expected);
    },
  );

  const literalTypes: TypeNode[] = [
    { kind: "primitive-type", name: "string" },
    { kind: "string-type-literal", value: "literal" },
    { kind: "integer-type-literal", value: "1" },
    { kind: "boolean-type-literal", value: true },
    { kind: "null-type-literal", value: null },
  ];
  it.each(literalTypes)("collects no names from $kind and scalar decorators", (valueType) => {
    expect(
      collectDependenciesForDeclaration({
        bicepIdentifier: "input",
        valueType,
        decorators: {
          description: "literal",
          secure: true,
          minLength: 1,
          maxLength: 5,
        },
      }),
    ).toEqual(new Set());
  });

  it("reuses the read-only expression walker for values, defaults and decorators", () => {
    const defaultValue: ExpressionNode = { kind: "identifier", id: "default" };
    const metadataValue: ExpressionNode = {
      kind: "identifier",
      id: "metadata",
    };
    const allowedValue: ExpressionNode = { kind: "identifier", id: "allowed" };
    const walk = vi.spyOn(expressionWalker, "walkDeclarationExpressions");
    const declaration: ParameterDeclarationNode = {
      bicepIdentifier: "input",
      valueType: { kind: "primitive-type", name: "string" },
      defaultValue,
      decorators: {
        metadata: { detail: metadataValue },
        allowed: [allowedValue],
      },
    };
    try {
      expect(collectDependenciesForDeclaration(declaration)).toEqual(
        new Set(["default", "metadata", "allowed"]),
      );
      expect(walk).toHaveBeenCalledTimes(1);
      expect(walk.mock.calls[0]![0]).toBe(declaration);
    } finally {
      walk.mockRestore();
    }
  });

  it("walks computed indexes, call targets, operations and interpolated strings", () => {
    const identifier = (id: string): ExpressionNode => ({
      kind: "identifier",
      id,
    });
    const value: ExpressionNode = {
      kind: "array",
      items: [
        {
          kind: "array-access",
          base: identifier("array"),
          index: identifier("index"),
          fromEnd: true,
          nullish: true,
        },
        {
          kind: "function-call",
          target: identifier("function"),
          args: [identifier("argument")],
        },
        {
          kind: "instance-function-call",
          base: identifier("instance"),
          name: "method",
          args: [identifier("methodArgument")],
        },
        {
          kind: "binary-operation",
          operator: "+",
          left: identifier("left"),
          right: identifier("right"),
        },
        {
          kind: "unary-operation",
          operator: "!",
          argument: identifier("unary"),
        },
        {
          kind: "ternary-operation",
          condition: identifier("condition"),
          trueValue: identifier("yes"),
          falseValue: identifier("no"),
        },
        {
          kind: "if-condition",
          condition: identifier("enabled"),
          body: identifier("body"),
        },
        {
          kind: "interpolated-string",
          segments: [{ kind: "string", value: "literal" }, identifier("segment")],
        },
        { kind: "null", value: null },
        { kind: "boolean", value: true },
        { kind: "integer", value: "1" },
      ],
    };
    expect(collectDependenciesForDeclaration({ bicepIdentifier: "value", value })).toEqual(
      new Set([
        "array",
        "index",
        "function",
        "argument",
        "instance",
        "methodArgument",
        "left",
        "right",
        "unary",
        "condition",
        "yes",
        "no",
        "enabled",
        "body",
        "segment",
      ]),
    );
  });
});
