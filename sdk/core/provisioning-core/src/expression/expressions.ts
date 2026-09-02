// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BinaryOperator, UnaryOperator } from "../bicep.js";
import { navigateShape, type NavShape } from "../shape/shape.js";
import {
  arrayAccessExpressionNode,
  functionCallExpressionNode,
  propertyAccessExpressionNode,
  type ExpressionNode,
} from "./ast-nodes.js";

// ---------------------------------------------------------------------------
// Brand symbol (runtime + type-only)
// ---------------------------------------------------------------------------

/**
 * Runtime symbol key storing the underlying `ExpressionNode` on proxies.
 * Internal to the package — consumers should use `isExpression()` and
 * `unwrapExpression()` instead of accessing this directly.
 */
export const EXPRESSION_BRAND: unique symbol = Symbol("expression-brand");

/** Declared symbol type used in the `Expression<T>` interface for branding. */
declare const __expressionBrand: unique symbol;

// ---------------------------------------------------------------------------
// Public opaque Expression<T> type
// ---------------------------------------------------------------------------

// Internal branding interface backing `Expression<T>`.
// Not exported; consumers see only the `Expression<T>` type alias.
export interface ExpressionBrand<out T> {
  readonly [__expressionBrand]: ExpressionNode<T>;
}

// Prevents TypeScript from simplifying `Expression<primitive>` down to
// just `ExpressionBrand<primitive>` — keeps the alias name visible in hovers.
// Symbol-keyed so it stays hidden from IntelliSense.
declare const __expressionTag: unique symbol;
export interface ExpressionTag {
  readonly [__expressionTag]?: never;
}

/**
 * An opaque deploy-time expression wrapping type `T`.
 *
 * For object types, properties of `T` are accessible as `Expression<T[K]>`.
 * For array types, numeric indices return `Expression<element>` and
 * `.length` is an `Expression<number>`.
 *
 * Function-typed keys on `T` are intentionally NOT surfaced — an
 * `Expression<(...)=>R>` isn't callable at the type level or meaningful
 * at emit time. When bicep-level array/object methods are needed
 * (concat, union, etc.), they are added explicitly via dedicated helper
 * types (e.g. a future `ArrayExpression<T>`), not reflectively derived.
 *
 * `NonNullable<T>` is applied at the input boundary, so
 * `Expression<R | undefined>` yields the same structural surface as
 * `Expression<R>` — otherwise the `| undefined` union would distribute
 * and collapse the object branch into `mapped | {}`, erasing the
 * index signature / member projection.
 */
export type Expression<T = unknown> = ExpressionBrand<T> &
  ExpressionTag &
  ExpressionShape<NonNullable<T>>;

export type ExpressionShape<T> = T extends readonly (infer U)[]
  ? {
      readonly length: Expression<number>;
      readonly [index: number]: Expression<U>;
    }
  : T extends object
    ? {
        readonly [K in keyof T as T[K] extends (...a: any[]) => any ? never : K]-?: Expression<
          T[K]
        >;
      }
    : {};

// ---------------------------------------------------------------------------
// Input-side types — optional-brand trick
// ---------------------------------------------------------------------------

/**
 * Carries an *optional* Expression brand on an Input-shaped interface.
 *
 * This is the asymmetric-brand trick that makes the Input type system
 * work without discriminated unions:
 *
 * - Every generated `*Input` interface extends `InputOf<Raw>` and therefore
 *   inherits the optional brand. Plain literal values (e.g. `{ foo: 1 }`)
 *   trivially satisfy it because the brand property is absent, which is
 *   permitted by an optional field.
 * - `Expression<Raw>` carries a *required* brand of the same shape.
 *   Required-fields-satisfy-optional is part of TS structural assignability,
 *   so any `Expression<Raw>` is assignable where an `InputOf<Raw>`
 *   (and thus any `*Input` that extends it) is expected.
 *
 * Net effect: a single `MInput` parameter accepts both literals and
 * whole-subtree `Expression<M>` replacements — no `MInput | Expression<M>`
 * union is needed in the generated signatures. Callers that want to
 * inspect whether a value is a literal or expression use `isExpression()`.
 */
export interface InputOf<out Raw> {
  readonly [__expressionBrand]?: ExpressionNode<Raw>;
}

/**
 * Writable input form for an array container.
 *
 * Accepts literal `T[]`, another `InputArray<T>`, or `Expression<Raw>`.
 * Deliberately NOT a subtype of `T[]` — passing a CDK-backed array to
 * an API that expects a plain `Array<T>` fails at compile time, which
 * is the correct signal (the value may actually be a Proxy wrapping an
 * `ExpressionNode`, not a real JS array).
 */
export interface InputArray<T, Raw = readonly T[]> extends InputOf<Raw> {
  length: number | Expression<number>;
  [index: number]: T;
}

/** Writable input form for a `Record<string, V>` container. */
export interface InputRecord<V, Raw = Record<string, V>> extends InputOf<Raw> {
  [key: string]: V;
}

// ---------------------------------------------------------------------------
// ExpressionOrValue
// ---------------------------------------------------------------------------

/**
 * Accepts either a plain value `T` or an `Expression<T>` substitution.
 *
 * Use this on scalar/leaf Input sites (primitives, enums, literal-only
 * unions) where a full `InputOf<...>` structural extension doesn't apply.
 * The result is a simple discriminated union; call `isExpression()` to
 * branch on the runtime shape.
 */
export type ExpressionOrValue<T> = T | Expression<T>;

/**
 * Expression brand without the auto-generated mapped properties.
 *
 * Use this instead of `Expression<T>` when `T` is an object type AND you
 * provide a hand-written interface with explicit getters/setters. This avoids
 * the intersection conflict where `Expression<T>`'s readonly mapped fields
 * prevent plain values from being assigned via the hand-written setters.
 */
// TODO: this is only used by hand written provisioning packages now, remove it once we
// have these packages emitted from the codegen
export type BrandedExpression<T> = ExpressionBrand<T> & ExpressionTag;

// ---------------------------------------------------------------------------
// Discriminator escape hatch
// ---------------------------------------------------------------------------

/**
 * Asserts that a deploy-time expression resolves to a specific literal,
 * so it can be used where a discriminator is expected.
 *
 * Discriminator properties on a `@discriminator` model are typed as bare
 * literals (`kind: "cache"`) rather than `ExpressionOrValue<"cache">`.
 * That is deliberate: TypeScript only treats a property as a discriminant
 * when its type is a *unit* type in every constituent of the union, and a
 * single widened arm disables narrowing for the whole union — completions
 * then offer every variant's properties and excess-property checking
 * degrades to "allowed if the property exists in any variant".
 *
 * When the discriminator genuinely isn't known until deployment, wrap the
 * expression with this to state which variant you mean:
 *
 * ```ts
 * widget.properties.primaryRule = {
 *   kind: asDiscriminator(kindParam),
 *   cacheKind: "long",
 *   days: 7,
 * };
 * ```
 *
 * Every other property is still fully checked — only the discriminator's
 * type safety is waived. Note that the runtime cannot dispatch on a
 * non-literal discriminator, so serialization falls back to structural
 * variant inference; prefer a literal wherever possible.
 *
 * The literal is inferred from the expression's own type argument. If the
 * expression is loosely typed (`Expression<string>`), name the variant
 * explicitly: `asDiscriminator<"cache">(param)`.
 */
export function asDiscriminator<L extends string>(value: ExpressionOrValue<L>): L {
  return value as L;
}

// ---------------------------------------------------------------------------
// Unwrap + type guards
// ---------------------------------------------------------------------------

// Two distinct concepts, two distinct guards:
//
//   - `isExpression(x)`     — "is `x` a typed `Expression<T>` handle
//                             (the value-level, proxy-backed form)?"
//   - `isExpressionNode(x)` — "is `x` a raw `ExpressionNode` data object
//                             (one of the AST kinds)?"
//
// These are *disjoint* — a value is either a wrapped Expression handle or a
// raw AST node, never both. To check the AST kind of either form, narrow
// via the discriminated `kind` field:
//
//   if (isExpression(value)) {
//     const node = unwrapExpression(value);
//     if (node.kind === "fn-call") { /* node: FunctionCallExpressionNode */ }
//   }
//   if (isExpressionNode(value)) {
//     if (value.kind === "binary") { /* value: BinaryExpressionNode */ }
//   }

/**
 * Extracts the underlying `ExpressionNode` from an `Expression<T>` value.
 *
 * `Expression<T>` is the public, typed handle for a deploy-time expression
 * (backed by a Proxy at runtime); `ExpressionNode` is the raw AST node that
 * the proxy wraps. Use this to walk / inspect / serialize the underlying
 * tree without reaching for the brand symbol directly.
 */
export function unwrapExpression<T>(expr: Expression<T>): ExpressionNode<T> {
  return (expr as unknown as { [EXPRESSION_BRAND]: ExpressionNode<T> })[EXPRESSION_BRAND];
}

/**
 * Tests whether a value is an `Expression<T>` — the typed, branded handle
 * for a deploy-time expression (proxy-backed). Returns false for raw
 * `ExpressionNode` data; use {@link isExpressionNode} from `./ast-nodes.js`
 * for that.
 */
export function isExpression(value: unknown): value is Expression<unknown> {
  return typeof value === "object" && value !== null && EXPRESSION_BRAND in value;
}

// ---------------------------------------------------------------------------
// Expression proxy factory
// ---------------------------------------------------------------------------

export function wrapExpression<T = unknown>(
  expression: ExpressionNode,
  nav?: NavShape,
): Expression<T> {
  return new Proxy(Object.create(null) as Expression<T>, {
    get(_target, prop, _receiver) {
      if (prop === EXPRESSION_BRAND) {
        return expression;
      }

      if (prop === Symbol.toPrimitive || prop === "toString") {
        return () => "[Expression]";
      }

      if (prop === "valueOf") {
        return () => expression;
      }

      // Avoid being treated as a thenable / Promise
      if (prop === "then") {
        return undefined;
      }

      if (typeof prop === "symbol") {
        return undefined;
      }

      // Numeric string → array access.
      if (/^\d+$/u.test(prop)) {
        const index = Number(prop);
        const step = navigateShape(nav, index);
        return wrapExpression(
          arrayAccessExpressionNode(expression as ExpressionNode, index),
          step.next,
        );
      }

      // String property → property access. Consult the current nav
      // shape; stamp the access with the wire armPath if an entry
      // exists, otherwise pass through unchanged. Container navs
      // (record/array) yield no stamp but still peel a layer.
      const step = navigateShape(nav, prop);
      return wrapExpression(
        propertyAccessExpressionNode(expression as ExpressionNode, prop, step.stamp?.armPath),
        step.next,
      );
    },

    has(_target, prop) {
      return prop === EXPRESSION_BRAND;
    },

    ownKeys() {
      return [];
    },

    getOwnPropertyDescriptor(_target, prop) {
      if (prop === EXPRESSION_BRAND) {
        return {
          configurable: true,
          enumerable: false,
          value: expression,
        };
      }
      return undefined;
    },
  });
}

export function wrapExpressionOver<TObject extends object, TValue = unknown>(
  target: TObject,
  expression: ExpressionNode,
): TObject & Expression<TValue> {
  return new Proxy(target as TObject & Expression<TValue>, {
    get(backing, prop, receiver) {
      if (prop === EXPRESSION_BRAND) {
        return expression;
      }

      if (prop === Symbol.toPrimitive || prop === "toString") {
        return () => "[Expression]";
      }

      if (prop === "valueOf") {
        return () => expression;
      }

      if (prop === "then") {
        return undefined;
      }

      if (Reflect.has(backing, prop)) {
        return Reflect.get(backing, prop, receiver);
      }

      if (typeof prop === "symbol") {
        return undefined;
      }

      if (/^\d+$/u.test(prop)) {
        return wrapExpression(
          arrayAccessExpressionNode(expression as ExpressionNode, Number(prop)),
        );
      }

      return wrapExpression(propertyAccessExpressionNode(expression as ExpressionNode, prop));
    },

    has(backing, prop) {
      return prop === EXPRESSION_BRAND || Reflect.has(backing, prop);
    },

    ownKeys(backing) {
      const keys = Reflect.ownKeys(backing);
      if (!keys.includes(EXPRESSION_BRAND)) {
        keys.push(EXPRESSION_BRAND);
      }
      return keys;
    },

    getOwnPropertyDescriptor(backing, prop) {
      if (prop === EXPRESSION_BRAND) {
        return {
          configurable: true,
          enumerable: false,
          value: expression,
        };
      }
      return Reflect.getOwnPropertyDescriptor(backing, prop);
    },
  });
}

// ---------------------------------------------------------------------------
// Proxied-expression factories (return Expression<T>)
// ---------------------------------------------------------------------------

export function createBinaryExpression<T>(
  op: BinaryOperator,
  left: unknown,
  right: unknown,
): Expression<T> {
  return wrapExpression({ kind: "binary", operator: op, left, right });
}

export function createUnaryExpression<T>(op: UnaryOperator, argument: unknown): Expression<T> {
  return wrapExpression({ kind: "unary", operator: op, argument });
}

export function createTernaryExpression<T>(
  condition: unknown,
  trueValue: unknown,
  falseValue: unknown,
): Expression<T> {
  return wrapExpression({
    kind: "ternary",
    condition,
    trueValue,
    falseValue,
  });
}

export function createFunctionCallExpression<T>(name: string, args: unknown[]): Expression<T> {
  return wrapExpression(functionCallExpressionNode(name, args));
}
