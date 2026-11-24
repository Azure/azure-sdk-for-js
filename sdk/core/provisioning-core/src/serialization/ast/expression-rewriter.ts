// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  DeclarableBodyNode,
  DeclarationNode,
  DecoratorsNode,
  ExpressionNode,
  ModuleDeclarationNode,
  OutputDeclarationNode,
  ParameterDeclarationNode,
  ResourceDeclarationNode,
  TypeNode,
  VariableDeclarationNode,
} from "./index.js";

/** An identifier-rooted access chain with its static path and original AST node. */
export interface ExpressionReference {
  readonly identifier: string;
  readonly path: readonly (string | number)[];
  readonly expression: ExpressionNode;
}

export type ExpressionReferenceResolver = (
  reference: ExpressionReference,
) => ExpressionNode | undefined;

function getExpressionReference(expression: ExpressionNode): ExpressionReference | undefined {
  const path: (string | number)[] = [];
  let current = expression;
  for (;;) {
    switch (current.kind) {
      case "identifier":
        return { identifier: current.id, path: path.reverse(), expression };
      case "property-access":
        path.push(current.property);
        current = current.base;
        break;
      case "array-access":
        if (current.index.kind === "integer") {
          path.push(parseInt(current.index.value, 10));
        } else if (current.index.kind === "string") {
          path.push(current.index.value);
        } else return undefined;
        current = current.base;
        break;
      default:
        return undefined;
    }
  }
}

/**
 * Replaces identifier access chains, preserving unchanged branches and ignoring
 * loop-local references. The resolver receives the original expression.
 */
export function rewriteExpressionReferences(
  expression: DeclarableBodyNode,
  resolve: ExpressionReferenceResolver,
): DeclarableBodyNode;
export function rewriteExpressionReferences(
  expression: ExpressionNode,
  resolve: ExpressionReferenceResolver,
): ExpressionNode;
export function rewriteExpressionReferences(
  expression: ExpressionNode,
  resolve: ExpressionReferenceResolver,
): ExpressionNode {
  function rewriteItems(
    items: readonly ExpressionNode[],
    boundIdentifiers: ReadonlySet<string>,
  ): readonly ExpressionNode[] {
    const rewritten = items.map((item) => rewrite(item, boundIdentifiers));
    return rewritten.every((item, index) => item === items[index]) ? items : rewritten;
  }

  function rewrite(node: ExpressionNode, boundIdentifiers: ReadonlySet<string>): ExpressionNode {
    const reference = getExpressionReference(node);
    if (reference !== undefined && !boundIdentifiers.has(reference.identifier)) {
      const replacement = resolve(reference);
      if (replacement !== undefined) return replacement;
    }

    switch (node.kind) {
      case "object": {
        const entries = Object.entries(node.value);
        const rewritten = entries.map(
          ([key, value]) => [key, rewrite(value, boundIdentifiers)] as const,
        );
        return rewritten.every(([, value], index) => value === entries[index]![1])
          ? node
          : { ...node, value: Object.fromEntries(rewritten) };
      }
      case "array": {
        const items = rewriteItems(node.items, boundIdentifiers);
        return items === node.items ? node : { ...node, items };
      }
      case "property-access": {
        const base = rewrite(node.base, boundIdentifiers);
        return base === node.base ? node : { ...node, base };
      }
      case "array-access": {
        const base = rewrite(node.base, boundIdentifiers);
        const index = rewrite(node.index, boundIdentifiers);
        return base === node.base && index === node.index ? node : { ...node, base, index };
      }
      case "function-call": {
        const target =
          typeof node.target === "string" ? node.target : rewrite(node.target, boundIdentifiers);
        const args = rewriteItems(node.args, boundIdentifiers);
        return target === node.target && args === node.args ? node : { ...node, target, args };
      }
      case "instance-function-call": {
        const base = rewrite(node.base, boundIdentifiers);
        const args = rewriteItems(node.args, boundIdentifiers);
        return base === node.base && args === node.args ? node : { ...node, base, args };
      }
      case "binary-operation": {
        const left = rewrite(node.left, boundIdentifiers);
        const right = rewrite(node.right, boundIdentifiers);
        return left === node.left && right === node.right ? node : { ...node, left, right };
      }
      case "unary-operation": {
        const argument = rewrite(node.argument, boundIdentifiers);
        return argument === node.argument ? node : { ...node, argument };
      }
      case "ternary-operation": {
        const condition = rewrite(node.condition, boundIdentifiers);
        const trueValue = rewrite(node.trueValue, boundIdentifiers);
        const falseValue = rewrite(node.falseValue, boundIdentifiers);
        return condition === node.condition &&
          trueValue === node.trueValue &&
          falseValue === node.falseValue
          ? node
          : { ...node, condition, trueValue, falseValue };
      }
      case "if-condition": {
        const condition = rewrite(node.condition, boundIdentifiers);
        const body = rewrite(node.body, boundIdentifiers);
        return condition === node.condition && body === node.body
          ? node
          : { ...node, condition, body };
      }
      case "for-expression": {
        const collection = rewrite(node.collection, boundIdentifiers);
        const loopBindings = new Set(boundIdentifiers);
        loopBindings.add(node.itemVariable);
        if (node.indexVariable !== undefined) {
          loopBindings.add(node.indexVariable);
        }
        const body = rewrite(node.body, loopBindings);
        return collection === node.collection && body === node.body
          ? node
          : { ...node, collection, body };
      }
      case "interpolated-string": {
        const segments = rewriteItems(node.segments, boundIdentifiers);
        return segments === node.segments ? node : { ...node, segments };
      }
      case "identifier":
      case "null":
      case "boolean":
      case "integer":
      case "string":
        return node;
      default: {
        const exhaustive: never = node;
        throw new Error(`Unsupported expression: ${String(exhaustive)}.`);
      }
    }
  }

  return rewrite(expression, new Set());
}

type ExpressionRewriter = (expression: ExpressionNode) => ExpressionNode;

function rewriteArray<T>(items: readonly T[], rewrite: (item: T) => T): readonly T[] {
  const rewritten = items.map(rewrite);
  return rewritten.every((item, index) => item === items[index]) ? items : rewritten;
}

function rewriteDecorators(
  decorators: DecoratorsNode | undefined,
  rewriteExpression: ExpressionRewriter,
): DecoratorsNode | undefined {
  if (decorators === undefined) return undefined;
  let metadata = decorators.metadata;
  if (metadata !== undefined) {
    const entries = Object.entries(metadata);
    const rewritten = entries.map(([key, value]) => [key, rewriteExpression(value)] as const);
    if (rewritten.some(([, value], index) => value !== entries[index]![1])) {
      metadata = Object.fromEntries(rewritten);
    }
  }
  const allowed =
    decorators.allowed === undefined
      ? undefined
      : rewriteArray(decorators.allowed, rewriteExpression);
  if (metadata === decorators.metadata && allowed === decorators.allowed) {
    return decorators;
  }
  return {
    ...decorators,
    ...(metadata === undefined ? {} : { metadata }),
    ...(allowed === undefined ? {} : { allowed }),
  };
}

function rewriteTypeMember<
  T extends {
    readonly valueType: TypeNode;
    readonly decorators?: DecoratorsNode;
  },
>(node: T, rewriteExpression: ExpressionRewriter): T {
  const valueType = rewriteType(node.valueType, rewriteExpression);
  const decorators = rewriteDecorators(node.decorators, rewriteExpression);
  if (valueType === node.valueType && decorators === node.decorators) {
    return node;
  }
  return {
    ...node,
    valueType,
    ...(decorators === undefined ? {} : { decorators }),
  };
}

function rewriteType(node: TypeNode, rewriteExpression: ExpressionRewriter): TypeNode {
  switch (node.kind) {
    case "array-type": {
      const item = rewriteType(node.item, rewriteExpression);
      return item === node.item ? node : { ...node, item };
    }
    case "object-type": {
      const properties = rewriteArray(node.properties, (property) =>
        rewriteTypeMember(property, rewriteExpression),
      );
      const additionalProperties =
        node.additionalProperties === undefined
          ? undefined
          : rewriteTypeMember(node.additionalProperties, rewriteExpression);
      if (properties === node.properties && additionalProperties === node.additionalProperties) {
        return node;
      }
      return {
        ...node,
        properties,
        ...(additionalProperties === undefined ? {} : { additionalProperties }),
      };
    }
    case "object-type-property":
    case "object-type-additional-properties":
    case "union-type-member":
    case "parameterized-type-argument":
      return rewriteTypeMember(node, rewriteExpression);
    case "union-type": {
      const members = rewriteArray(node.members, (member) =>
        rewriteTypeMember(member, rewriteExpression),
      );
      return members === node.members ? node : { ...node, members };
    }
    case "nullable-type": {
      const base = rewriteType(node.base, rewriteExpression);
      return base === node.base ? node : { ...node, base };
    }
    case "parameterized-type-instantiation": {
      const base = rewriteType(node.base, rewriteExpression);
      const args = rewriteArray(node.args, (argument) =>
        rewriteTypeMember(argument, rewriteExpression),
      );
      return base === node.base && args === node.args ? node : { ...node, base, args };
    }
    case "primitive-type":
    case "type-reference":
    case "string-type-literal":
    case "integer-type-literal":
    case "boolean-type-literal":
    case "null-type-literal":
      return node;
    default: {
      const exhaustive: never = node;
      throw new Error(`Unsupported type: ${String(exhaustive)}.`);
    }
  }
}

/**
 * Applies an expression transformation to a declaration's value, default,
 * decorators, and nested type decorators. The callback rewrites each complete
 * expression subtree; recursive expression traversal is its responsibility.
 * Unchanged branches are shared, and the input declaration is not mutated.
 */
export function rewriteDeclarationExpressions(
  node: ResourceDeclarationNode,
  rewriteExpression: ExpressionRewriter,
): ResourceDeclarationNode;
export function rewriteDeclarationExpressions(
  node: ModuleDeclarationNode,
  rewriteExpression: ExpressionRewriter,
): ModuleDeclarationNode;
export function rewriteDeclarationExpressions(
  node: OutputDeclarationNode,
  rewriteExpression: ExpressionRewriter,
): OutputDeclarationNode;
export function rewriteDeclarationExpressions(
  node: ParameterDeclarationNode,
  rewriteExpression: ExpressionRewriter,
): ParameterDeclarationNode;
export function rewriteDeclarationExpressions(
  node: VariableDeclarationNode,
  rewriteExpression: ExpressionRewriter,
): VariableDeclarationNode;
export function rewriteDeclarationExpressions(
  node: DeclarationNode,
  rewriteExpression: ExpressionRewriter,
): DeclarationNode;
export function rewriteDeclarationExpressions(
  node: DeclarationNode,
  rewriteExpression: ExpressionRewriter,
): DeclarationNode {
  if ("value" in node) {
    const value = rewriteExpression(node.value);
    if (
      ("type" in node || "path" in node) &&
      value.kind !== "object" &&
      value.kind !== "if-condition" &&
      value.kind !== "for-expression"
    ) {
      throw new Error(
        `Rewriting declaration "${node.bicepIdentifier}" produced an invalid resource/module body: "${value.kind}".`,
      );
    }
    const valueType =
      "valueType" in node ? rewriteType(node.valueType, rewriteExpression) : undefined;
    const decorators = rewriteDecorators(node.decorators, rewriteExpression);
    if (
      value === node.value &&
      decorators === node.decorators &&
      (!("valueType" in node) || valueType === node.valueType)
    ) {
      return node;
    }
    return {
      ...node,
      value,
      ...(valueType === undefined ? {} : { valueType }),
      ...(decorators === undefined ? {} : { decorators }),
    };
  }
  const defaultValue =
    node.defaultValue === undefined ? undefined : rewriteExpression(node.defaultValue);
  const valueType = rewriteType(node.valueType, rewriteExpression);
  const decorators = rewriteDecorators(node.decorators, rewriteExpression);
  if (
    defaultValue === node.defaultValue &&
    valueType === node.valueType &&
    decorators === node.decorators
  ) {
    return node;
  }
  return {
    ...node,
    valueType,
    ...(defaultValue === undefined ? {} : { defaultValue }),
    ...(decorators === undefined ? {} : { decorators }),
  };
}
