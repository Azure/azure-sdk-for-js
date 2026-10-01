// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Resource } from "../constructs/resource/resource.js";
import type { BinaryOperator, UnaryOperator } from "../serialization/contract/index.js";
import type { PropertySegment } from "../types.js";

export type { BinaryOperator, UnaryOperator };

// ---------------------------------------------------------------------------
// Expression node interfaces (the raw discriminated union members)
// ---------------------------------------------------------------------------

// Note: every interface declares a phantom `TValue` (when otherwise it wouldn't
// need one). `TValue` is *not* used in any field of any interface — but its
// presence in the variant *type-parameter slot* is what allows
// `ExpressionNode<T>` to thread `T` through to each variant, which in turn is
// what lets `ExpressionBrand<T>` carry inference-visible `T` across project-
// reference boundaries. Removing `TValue` and making `ExpressionNode<T>` a
// fully-phantom alias breaks `coalesce<T>(...)` inference and the
// `as DeploymentParameter<...>` cast in cross-project consumers (e.g. `demo`).

export interface FunctionCallExpressionNode<_TValue = unknown, TOperator extends string = string> {
  readonly kind: "fn-call";
  readonly operator: TOperator;
  readonly args: readonly unknown[];
}

export interface SymbolicValueExpressionNode<_TValue = unknown, TPath extends string = string> {
  readonly kind: "symbolic-value";
  readonly path: TPath;
}

export interface IdentifierExpressionNode<_TValue = unknown> {
  readonly kind: "identifier";
  readonly id: string | Resource;
}

export interface PropertyAccessExpressionNode<_TValue = unknown> {
  readonly kind: "property-access";
  readonly base: ExpressionNode;
  readonly property: string;
  readonly nullish: boolean;
  /**
   * Optional ARM wire-path segments. When present, the serialization
   * lowering pass rewrites this single access into a chain that walks
   * these segments (handling renames + `@flattenProperty` hoisting).
   * Untyped / hand-built expressions leave this `undefined` and pass
   * through unchanged.
   */
  readonly armPath?: readonly string[] | undefined;
}

export interface ArrayAccessExpressionNode<_TValue = unknown> {
  readonly kind: "array-access";
  readonly base: ExpressionNode;
  /**
   * The index into the array. A literal `number`/`string` lowers to an
   * integer/string array-access (or a property-access for identifier-like
   * strings) at serialize time. Any {@link ExpressionNode} is serialized
   * recursively into the wire array-access's `index` slot — e.g. a looped
   * `.at(loop.index)` stores the unwrapped `symbolic-value` node (emitting
   * `sym[i]`), and a computed offset stores a `binary` / `fn-call` node
   * (`sym[i + 1]`). `Expression<T>` proxies are always unwrapped to their
   * raw node before landing here, per the "state holds normalized raw
   * nodes" invariant — so a proxy is never stored directly.
   */
  readonly index: ArrayAccessIndex;
  readonly nullish: boolean;
  readonly fromEnd: boolean;
}

export interface BinaryExpressionNode<_TValue = unknown> {
  readonly kind: "binary";
  readonly operator: BinaryOperator;
  readonly left: unknown;
  readonly right: unknown;
}

export interface UnaryExpressionNode<_TValue = unknown> {
  readonly kind: "unary";
  readonly operator: UnaryOperator;
  readonly argument: unknown;
}

export interface TernaryExpressionNode<_TValue = unknown> {
  readonly kind: "ternary";
  readonly condition: unknown;
  readonly trueValue: unknown;
  readonly falseValue: unknown;
}

export interface InstanceFunctionCallExpressionNode<_TValue = unknown> {
  readonly kind: "instance-function-call";
  readonly base: ExpressionNode;
  readonly name: string;
  readonly args: readonly unknown[];
}

export interface InterpolatedStringExpressionNode<_TValue = unknown> {
  readonly kind: "interpolated-string";
  readonly segments: readonly unknown[];
}

// ---------------------------------------------------------------------------
// ExpressionNode union
// ---------------------------------------------------------------------------

// `T` is threaded through every variant. See the long comment above the node
// interfaces for why this matters.
export type ExpressionNode<T = unknown> =
  | FunctionCallExpressionNode<T>
  | SymbolicValueExpressionNode<T>
  | IdentifierExpressionNode<T>
  | PropertyAccessExpressionNode<T>
  | ArrayAccessExpressionNode<T>
  | BinaryExpressionNode<T>
  | UnaryExpressionNode<T>
  | TernaryExpressionNode<T>
  | InstanceFunctionCallExpressionNode<T>
  | InterpolatedStringExpressionNode<T>;

/**
 * The index stored on an {@link ArrayAccessExpressionNode}: a literal
 * `number` or `string`, or a raw {@link ExpressionNode} evaluated at
 * serialize time (e.g. a loop's `symbolic-value` index, or a `binary` /
 * `fn-call` node for a computed offset). `Expression<T>` proxies are
 * unwrapped to their raw node before being stored, so the proxy type is
 * intentionally absent here.
 */
export type ArrayAccessIndex = number | string | ExpressionNode;

// Typed as `Record<ExpressionNode["kind"], true>` so adding a new variant to
// `ExpressionNode` forces a compile error here until the new kind is listed.
const EXPRESSION_NODE_KINDS: Record<ExpressionNode["kind"], true> = {
  "fn-call": true,
  "symbolic-value": true,
  identifier: true,
  "property-access": true,
  "array-access": true,
  binary: true,
  unary: true,
  ternary: true,
  "instance-function-call": true,
  "interpolated-string": true,
};

/** Tests whether a value structurally matches a raw expression AST node. */
export function isExpressionNode(value: unknown): value is ExpressionNode {
  if (
    typeof value !== "object" ||
    value === null ||
    !Object.prototype.hasOwnProperty.call(value, "kind") ||
    typeof (value as { kind: unknown }).kind !== "string"
  ) {
    return false;
  }
  const node = value as Record<string, unknown>;
  if (!Object.prototype.hasOwnProperty.call(EXPRESSION_NODE_KINDS, node.kind as string)) {
    return false;
  }
  switch (node.kind) {
    case "fn-call":
      return typeof node.operator === "string" && Array.isArray(node.args);
    case "symbolic-value":
      return typeof node.path === "string";
    case "identifier":
      return typeof node.id === "string" || typeof node.id === "object";
    case "property-access":
      return (
        isExpressionNode(node.base) &&
        typeof node.property === "string" &&
        typeof node.nullish === "boolean"
      );
    case "array-access":
      return (
        isExpressionNode(node.base) &&
        "index" in node &&
        typeof node.nullish === "boolean" &&
        typeof node.fromEnd === "boolean"
      );
    case "binary":
      return typeof node.operator === "string" && "left" in node && "right" in node;
    case "unary":
      return typeof node.operator === "string" && "argument" in node;
    case "ternary":
      return "condition" in node && "trueValue" in node && "falseValue" in node;
    case "instance-function-call":
      return (
        isExpressionNode(node.base) && typeof node.name === "string" && Array.isArray(node.args)
      );
    case "interpolated-string":
      return Array.isArray(node.segments);
    default:
      return false;
  }
}

// ---------------------------------------------------------------------------
// Factory functions
// ---------------------------------------------------------------------------

export function functionCallExpressionNode<TValue = unknown, TOperator extends string = string>(
  operator: TOperator,
  args: readonly unknown[],
): FunctionCallExpressionNode<TValue, TOperator> {
  return { kind: "fn-call", operator, args };
}

export function symbolicValueExpressionNode<TValue = unknown, TPath extends string = string>(
  path: TPath,
): SymbolicValueExpressionNode<TValue, TPath> {
  return { kind: "symbolic-value", path };
}

export function identifierExpressionNode<TValue = unknown>(
  identifier: string | Resource,
): IdentifierExpressionNode<TValue> {
  return { kind: "identifier", id: identifier };
}

export function propertyAccessExpressionNode<TValue = unknown>(
  base: ExpressionNode,
  property: string,
  options: Partial<Pick<PropertyAccessExpressionNode, "armPath" | "nullish">> = {},
): PropertyAccessExpressionNode<TValue> {
  return {
    kind: "property-access",
    base,
    property,
    nullish: options.nullish ?? false,
    ...(options.armPath === undefined ? {} : { armPath: options.armPath }),
  };
}

export function arrayAccessExpressionNode<TValue = unknown>(
  base: ExpressionNode,
  index: ArrayAccessIndex,
  options: Partial<Pick<ArrayAccessExpressionNode, "nullish" | "fromEnd">> = {},
): ArrayAccessExpressionNode<TValue> {
  return {
    kind: "array-access",
    base,
    index,
    nullish: options.nullish ?? false,
    fromEnd: options.fromEnd ?? false,
  };
}

export function binaryExpressionNode<TValue = unknown>(
  operator: BinaryOperator,
  left: unknown,
  right: unknown,
): BinaryExpressionNode<TValue> {
  return { kind: "binary", operator, left, right };
}

export function unaryExpressionNode<TValue = unknown>(
  operator: UnaryOperator,
  argument: unknown,
): UnaryExpressionNode<TValue> {
  return { kind: "unary", operator, argument };
}

export function ternaryExpressionNode<TValue = unknown>(
  condition: unknown,
  trueValue: unknown,
  falseValue: unknown,
): TernaryExpressionNode<TValue> {
  return {
    kind: "ternary",
    condition,
    trueValue,
    falseValue,
  };
}

export function instanceFunctionCallExpressionNode<TValue = unknown>(
  base: ExpressionNode,
  name: string,
  args: readonly unknown[],
): InstanceFunctionCallExpressionNode<TValue> {
  return {
    kind: "instance-function-call",
    base,
    name,
    args,
  };
}

export function interpolatedStringExpressionNode<TValue = unknown>(
  segments: readonly unknown[],
): InterpolatedStringExpressionNode<TValue> {
  return { kind: "interpolated-string", segments };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isIdentifierSegment(segment: string): boolean {
  return /^[A-Za-z_][A-Za-z0-9_]*$/u.test(segment);
}

export function accessExpressionNode(
  base: ExpressionNode,
  member: PropertySegment,
  options: Partial<Pick<PropertyAccessExpressionNode, "armPath" | "nullish">> = {},
): PropertyAccessExpressionNode | ArrayAccessExpressionNode {
  return typeof member === "number" || !isIdentifierSegment(member)
    ? arrayAccessExpressionNode(base, member, options)
    : propertyAccessExpressionNode(base, member, options);
}
