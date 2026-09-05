// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BinaryOperator, UnaryOperator } from "../bicep.js";
import type { Resource } from "../constructs/resource/resource.js";
import type { PropertySegment } from "../types.js";

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
  readonly nullish: false;
  /**
   * Optional ARM wire-path segments. When present, the serialization
   * lowering pass rewrites this single access into a chain that walks
   * these segments (handling renames + `@flattenProperty` hoisting).
   * Untyped / hand-built expressions leave this `undefined` and pass
   * through unchanged.
   */
  readonly armPath?: readonly string[];
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
  readonly nullish: false;
  readonly fromEnd: false;
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

/**
 * Tests whether a value is a raw `ExpressionNode` data object (one of the
 * AST node kinds defined above). Returns false for `Expression<T>` proxies;
 * use `isExpression` from `./expressions.js` for that.
 *
 * Once narrowed, branch on `node.kind` to handle each variant — TypeScript's
 * discriminated-union narrowing gives full per-variant typing automatically.
 */
export function isExpressionNode(value: unknown): value is ExpressionNode {
  return (
    typeof value === "object" &&
    value !== null &&
    "kind" in value &&
    typeof (value as { kind: unknown }).kind === "string" &&
    (value as { kind: string }).kind in EXPRESSION_NODE_KINDS
  );
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
  armPath?: readonly string[],
): PropertyAccessExpressionNode<TValue> {
  return armPath
    ? {
        kind: "property-access",
        base,
        property,
        nullish: false,
        armPath,
      }
    : { kind: "property-access", base, property, nullish: false };
}

export function arrayAccessExpressionNode<TValue = unknown>(
  base: ExpressionNode,
  index: ArrayAccessIndex,
): ArrayAccessExpressionNode<TValue> {
  return { kind: "array-access", base, index, nullish: false, fromEnd: false };
}

export function instanceFunctionCallExpressionNode<TValue = unknown>(
  base: ExpressionNode,
  name: string,
  args: readonly unknown[],
): InstanceFunctionCallExpressionNode<TValue> {
  return { kind: "instance-function-call", base, name, args };
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
  armPath?: readonly string[],
): PropertyAccessExpressionNode | ArrayAccessExpressionNode {
  return typeof member === "number" || !isIdentifierSegment(member)
    ? arrayAccessExpressionNode(base, member)
    : propertyAccessExpressionNode(base, member, armPath);
}
