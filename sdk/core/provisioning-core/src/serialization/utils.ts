// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  DecoratorsNode,
  ExpressionNode,
  ModuleDeclarationNode,
  OutputDeclarationNode,
  ResourceDeclarationNode,
  TypeNode,
  VariableDeclarationNode,
} from "./contract/index.js";

export function collectDependenciesForDeclaration(
  node:
    | ResourceDeclarationNode
    | VariableDeclarationNode
    | OutputDeclarationNode
    | ModuleDeclarationNode,
): Set<string> {
  const identifiers = new Set<string>();
  if ("valueType" in node) {
    collectIdentifierIdsFromType(node.valueType, identifiers);
  }
  collectIdentifierIdsFromExpression(node.value, identifiers);
  collectIdentifierIdsFromDecorators(node.decorators, identifiers);
  return identifiers;
}

function collectIdentifierIdsFromDecorators(
  decorators: DecoratorsNode | undefined,
  identifiers: Set<string>,
): void {
  for (const value of Object.values(decorators?.metadata ?? {})) {
    collectIdentifierIdsFromExpression(value, identifiers);
  }
  for (const value of decorators?.allowed ?? []) {
    collectIdentifierIdsFromExpression(value, identifiers);
  }
}

function collectIdentifierIdsFromType(type: TypeNode, identifiers: Set<string>): void {
  switch (type.kind) {
    case "type-reference":
      identifiers.add(type.name);
      return;
    case "union-type-member":
    case "parameterized-type-argument":
      collectIdentifierIdsFromType(type.valueType, identifiers);
      return;
    case "array-type":
      collectIdentifierIdsFromType(type.item, identifiers);
      return;
    case "object-type-property":
    case "object-type-additional-properties":
      collectIdentifierIdsFromType(type.valueType, identifiers);
      collectIdentifierIdsFromDecorators(type.decorators, identifiers);
      return;
    case "object-type":
      for (const property of type.properties) {
        collectIdentifierIdsFromType(property, identifiers);
      }
      if (type.additionalProperties !== undefined) {
        collectIdentifierIdsFromType(type.additionalProperties, identifiers);
      }
      return;
    case "union-type":
      for (const member of type.members) {
        collectIdentifierIdsFromType(member.valueType, identifiers);
      }
      return;
    case "nullable-type":
      collectIdentifierIdsFromType(type.base, identifiers);
      return;
    case "parameterized-type-instantiation":
      collectIdentifierIdsFromType(type.base, identifiers);
      for (const argument of type.args) {
        collectIdentifierIdsFromType(argument.valueType, identifiers);
      }
      return;
    case "primitive-type":
    case "string-type-literal":
    case "integer-type-literal":
    case "boolean-type-literal":
    case "null-type-literal":
      return;
    default: {
      const exhaustive: never = type;
      throw new Error(`Unsupported type kind: ${(exhaustive as { kind: string }).kind}`);
    }
  }
}

function collectIdentifierIdsFromExpression(
  expr: ExpressionNode,
  out: Set<string>,
  boundIdentifiers: ReadonlySet<string> = new Set(),
): void {
  switch (expr.kind) {
    case "identifier":
      if (!boundIdentifiers.has(expr.id)) out.add(expr.id);
      break;
    case "property-access":
      collectIdentifierIdsFromExpression(expr.base, out, boundIdentifiers);
      break;
    case "array-access":
      collectIdentifierIdsFromExpression(expr.base, out, boundIdentifiers);
      collectIdentifierIdsFromExpression(expr.index, out, boundIdentifiers);
      break;
    case "function-call":
      if (typeof expr.target !== "string") {
        collectIdentifierIdsFromExpression(expr.target, out, boundIdentifiers);
      }
      for (const arg of expr.args) {
        collectIdentifierIdsFromExpression(arg, out, boundIdentifiers);
      }
      break;
    case "instance-function-call":
      collectIdentifierIdsFromExpression(expr.base, out, boundIdentifiers);
      for (const arg of expr.args) {
        collectIdentifierIdsFromExpression(arg, out, boundIdentifiers);
      }
      break;
    case "binary-operation":
      collectIdentifierIdsFromExpression(expr.left, out, boundIdentifiers);
      collectIdentifierIdsFromExpression(expr.right, out, boundIdentifiers);
      break;
    case "unary-operation":
      collectIdentifierIdsFromExpression(expr.argument, out, boundIdentifiers);
      break;
    case "ternary-operation":
      collectIdentifierIdsFromExpression(expr.condition, out, boundIdentifiers);
      collectIdentifierIdsFromExpression(expr.trueValue, out, boundIdentifiers);
      collectIdentifierIdsFromExpression(expr.falseValue, out, boundIdentifiers);
      break;
    case "if-condition":
      collectIdentifierIdsFromExpression(expr.condition, out, boundIdentifiers);
      collectIdentifierIdsFromExpression(expr.body, out, boundIdentifiers);
      break;
    case "for-expression": {
      collectIdentifierIdsFromExpression(expr.collection, out, boundIdentifiers);
      const loopBindings = new Set(boundIdentifiers);
      loopBindings.add(expr.itemVariable);
      if (expr.indexVariable !== undefined) {
        loopBindings.add(expr.indexVariable);
      }
      collectIdentifierIdsFromExpression(expr.body, out, loopBindings);
      break;
    }
    case "interpolated-string":
      for (const segment of expr.segments) {
        collectIdentifierIdsFromExpression(segment, out, boundIdentifiers);
      }
      break;
    case "object":
      for (const value of Object.values(expr.value)) {
        collectIdentifierIdsFromExpression(value, out, boundIdentifiers);
      }
      break;
    case "array":
      for (const item of expr.items) {
        collectIdentifierIdsFromExpression(item, out, boundIdentifiers);
      }
      break;
    case "null":
    case "boolean":
    case "integer":
    case "string":
      break;
  }
}
