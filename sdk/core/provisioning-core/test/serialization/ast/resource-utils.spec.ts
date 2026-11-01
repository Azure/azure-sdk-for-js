// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it, vi } from "vitest";
import type {
  DeclarableBodyNode,
  ExpressionNode,
  ObjectValue,
  ResourceDeclarationNode,
} from "../../../src/serialization/ast/index.js";
import {
  getResourceArmParentIdentifier,
  getResourceBody,
  removeResourceScope,
  updateResourceBody,
} from "../../../src/serialization/ast/resource-utils.js";

const name: ExpressionNode = { kind: "string", value: "child" };
const scope: ExpressionNode = {
  kind: "function-call",
  target: "resourceGroup",
  args: [],
};
const parent: ExpressionNode = { kind: "identifier", id: "parent" };
const object: ObjectValue = {
  kind: "object",
  value: { name, scope, parent },
};
const condition: ExpressionNode = { kind: "identifier", id: "enabled" };
const collection: ExpressionNode = { kind: "identifier", id: "items" };

function conditional(body: ExpressionNode): DeclarableBodyNode {
  return { kind: "if-condition", condition, body };
}

function loop(body: ExpressionNode): DeclarableBodyNode {
  return {
    kind: "for-expression",
    itemVariable: "item",
    indexVariable: "index",
    collection,
    body,
  };
}

function resource(value: DeclarableBodyNode): ResourceDeclarationNode {
  return {
    bicepIdentifier: "child",
    type: "Contoso.Test/parents/children",
    apiVersion: "2024-01-01",
    existing: true,
    decorators: { description: "Existing child", batchSize: 2 },
    value,
  };
}

const bodies = [
  { description: "object", body: object },
  { description: "condition", body: conditional(object) },
  { description: "loop", body: loop(object) },
  { description: "loop and condition", body: loop(conditional(object)) },
  { description: "condition and loop", body: conditional(loop(object)) },
];

describe("resource AST bodies", () => {
  it.each(bodies)("gets the original object beneath $description wrappers", ({ body }) => {
    expect(getResourceBody(body)).toBe(object);
  });

  it.each(bodies)(
    "transforms the object beneath $description wrappers without mutation",
    ({ body }) => {
      const original = structuredClone(body);
      const updatedObject: ObjectValue = {
        kind: "object",
        value: { ...object.value, name: { kind: "string", value: "updated" } },
      };
      const transform = vi.fn(() => updatedObject);
      const updated = updateResourceBody(body, transform);

      expect(transform).toHaveBeenCalledExactlyOnceWith(object);
      expect(getResourceBody(updated)).toBe(updatedObject);
      expect(updated).toEqual(
        body.kind === "object"
          ? updatedObject
          : {
              ...body,
              body:
                body.body.kind === "object" ? updatedObject : { ...body.body, body: updatedObject },
            },
      );
      expect(body).toEqual(original);
    },
  );

  it.each(bodies)("removes only scope from a $description resource", ({ body }) => {
    const declaration = resource(body);
    const original = structuredClone(declaration);
    const updated = removeResourceScope(declaration);

    expect(updated).toEqual({
      ...declaration,
      value: updateResourceBody(body, () => ({
        kind: "object",
        value: { name, parent },
      })),
    });
    expect(getResourceBody(updated.value).value).toEqual({ name, parent });
    expect(updated.decorators).toBe(declaration.decorators);
    expect(declaration).toEqual(original);
  });

  it("preserves a resource with no scope field", () => {
    const declaration = resource({
      kind: "object",
      value: { name, parent },
    });
    expect(removeResourceScope(declaration)).toEqual(declaration);
    expect(getResourceArmParentIdentifier(declaration)).toBe("parent");
  });

  it.each([
    conditional({ kind: "string", value: "invalid" }),
    loop({ kind: "array", items: [] }),
    loop(conditional({ kind: "integer", value: "1" })),
  ])("rejects an invalid wrapped body ($kind)", (body) => {
    expect(() => getResourceBody(body)).toThrow("Invalid resource body");
    const transform = vi.fn((value: ObjectValue) => value);
    expect(() => updateResourceBody(body, transform)).toThrow("Invalid resource body");
    expect(transform).not.toHaveBeenCalled();
  });
});

describe("ARM parent identifiers", () => {
  it("does not treat scope as a parent", () => {
    expect(
      getResourceArmParentIdentifier(resource({ kind: "object", value: { scope } })),
    ).toBeUndefined();
  });

  it.each([
    { description: "direct", parent },
    {
      description: "static index",
      parent: {
        kind: "array-access",
        base: parent,
        index: { kind: "integer", value: "0" },
        nullish: false,
        fromEnd: false,
      } satisfies ExpressionNode,
    },
    {
      description: "dynamic index",
      parent: {
        kind: "array-access",
        base: parent,
        index: { kind: "identifier", id: "index" },
        nullish: true,
        fromEnd: true,
      } satisfies ExpressionNode,
    },
  ])("reads a $description parent beneath wrappers", ({ parent: parentExpression }) => {
    const body: ObjectValue = {
      kind: "object",
      value: { parent: parentExpression },
    };
    expect(getResourceArmParentIdentifier(resource(loop(conditional(body))))).toBe("parent");
  });

  it.each([
    { kind: "string", value: "parent" },
    { kind: "property-access", base: parent, property: "id", nullish: false },
    {
      kind: "array-access",
      base: { kind: "function-call", target: "parents", args: [] },
      index: { kind: "integer", value: "0" },
      nullish: false,
      fromEnd: false,
    },
  ] satisfies ExpressionNode[])(
    "rejects an unsupported $kind parent expression",
    (parentExpression) => {
      expect(() =>
        getResourceArmParentIdentifier(
          resource({
            kind: "object",
            value: { parent: parentExpression },
          }),
        ),
      ).toThrow('Unsupported ARM parent expression for "child".');
    },
  );
});
