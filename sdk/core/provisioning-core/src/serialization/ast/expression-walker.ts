// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DeclarationNode, DecoratorsNode, ExpressionNode, TypeNode } from "./index.js";

/**
 * Inspects a node; returning false skips its children. boundIdentifiers contains
 * item and index names introduced by enclosing loops, local to loop bodies.
 */
export type ExpressionNodeVisitor = (
  node: ExpressionNode,
  boundIdentifiers: ReadonlySet<string>,
) => boolean | void;

/** Visits original expression nodes in preorder without rebuilding or replacing them. */
export function walkExpressionNode(
  expression: ExpressionNode,
  visitor: ExpressionNodeVisitor,
): void {
  function visit(node: ExpressionNode, boundIdentifiers: ReadonlySet<string>): void {
    if (visitor(node, boundIdentifiers) === false) return;
    switch (node.kind) {
      case "object":
        for (const value of Object.values(node.value)) {
          visit(value, boundIdentifiers);
        }
        break;
      case "array":
        for (const item of node.items) visit(item, boundIdentifiers);
        break;
      case "property-access":
        visit(node.base, boundIdentifiers);
        break;
      case "array-access":
        visit(node.base, boundIdentifiers);
        visit(node.index, boundIdentifiers);
        break;
      case "function-call":
        if (typeof node.target !== "string") {
          visit(node.target, boundIdentifiers);
        }
        for (const argument of node.args) visit(argument, boundIdentifiers);
        break;
      case "instance-function-call":
        visit(node.base, boundIdentifiers);
        for (const argument of node.args) visit(argument, boundIdentifiers);
        break;
      case "binary-operation":
        visit(node.left, boundIdentifiers);
        visit(node.right, boundIdentifiers);
        break;
      case "unary-operation":
        visit(node.argument, boundIdentifiers);
        break;
      case "ternary-operation":
        visit(node.condition, boundIdentifiers);
        visit(node.trueValue, boundIdentifiers);
        visit(node.falseValue, boundIdentifiers);
        break;
      case "if-condition":
        visit(node.condition, boundIdentifiers);
        visit(node.body, boundIdentifiers);
        break;
      case "for-expression": {
        visit(node.collection, boundIdentifiers);
        const loopBindings = new Set(boundIdentifiers);
        loopBindings.add(node.itemVariable);
        if (node.indexVariable !== undefined) {
          loopBindings.add(node.indexVariable);
        }
        visit(node.body, loopBindings);
        break;
      }
      case "interpolated-string":
        for (const segment of node.segments) visit(segment, boundIdentifiers);
        break;
      case "identifier":
      case "null":
      case "boolean":
      case "integer":
      case "string":
        break;
      default: {
        const exhaustive: never = node;
        throw new Error(`Unsupported expression: ${String(exhaustive)}.`);
      }
    }
  }
  visit(expression, new Set());
}

function walkDecoratorExpressions(
  decorators: DecoratorsNode | undefined,
  visitor: ExpressionNodeVisitor,
): void {
  for (const expression of Object.values(decorators?.metadata ?? {})) {
    walkExpressionNode(expression, visitor);
  }
  for (const expression of decorators?.allowed ?? []) {
    walkExpressionNode(expression, visitor);
  }
}

function walkTypeExpressions(type: TypeNode, visitor: ExpressionNodeVisitor): void {
  switch (type.kind) {
    case "array-type":
      walkTypeExpressions(type.item, visitor);
      break;
    case "object-type":
      for (const property of type.properties) {
        walkTypeExpressions(property, visitor);
      }
      if (type.additionalProperties !== undefined) {
        walkTypeExpressions(type.additionalProperties, visitor);
      }
      break;
    case "object-type-property":
    case "object-type-additional-properties":
      walkTypeExpressions(type.valueType, visitor);
      walkDecoratorExpressions(type.decorators, visitor);
      break;
    case "union-type-member":
    case "parameterized-type-argument":
      walkTypeExpressions(type.valueType, visitor);
      break;
    case "union-type":
      for (const member of type.members) walkTypeExpressions(member, visitor);
      break;
    case "nullable-type":
      walkTypeExpressions(type.base, visitor);
      break;
    case "parameterized-type-instantiation":
      walkTypeExpressions(type.base, visitor);
      for (const argument of type.args) walkTypeExpressions(argument, visitor);
      break;
    case "primitive-type":
    case "type-reference":
    case "string-type-literal":
    case "integer-type-literal":
    case "boolean-type-literal":
    case "null-type-literal":
      break;
    default: {
      const exhaustive: never = type;
      throw new Error(`Unsupported type: ${String(exhaustive)}.`);
    }
  }
}

/**
 * Visits original expressions in a declaration's value/default, nested type
 * decorators, then declaration decorators, without rebuilding or mutating nodes.
 * Each expression is walked in preorder; returning false skips that expression's
 * children. Loop bindings do not carry into other expression roots.
 */
export function walkDeclarationExpressions(
  declaration: DeclarationNode,
  visitor: ExpressionNodeVisitor,
): void {
  if ("value" in declaration) {
    walkExpressionNode(declaration.value, visitor);
  } else if (declaration.defaultValue !== undefined) {
    walkExpressionNode(declaration.defaultValue, visitor);
  }
  if ("valueType" in declaration) {
    walkTypeExpressions(declaration.valueType, visitor);
  }
  walkDecoratorExpressions(declaration.decorators, visitor);
}
