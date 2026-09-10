// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  type Expression,
  type ExpressionOrValue,
  createBinaryExpression,
  wrapExpression,
  createFunctionCallExpression,
  createTernaryExpression,
  createUnaryExpression,
  isExpression,
} from "./expression/expressions.js";

// ---------------------------------------------------------------------------
// Arithmetic operators
// ---------------------------------------------------------------------------
export function add(
  left: ExpressionOrValue<number>,
  right: ExpressionOrValue<number>,
): Expression<number> {
  return createBinaryExpression<number>("+", left, right);
}

export function sub(
  left: ExpressionOrValue<number>,
  right: ExpressionOrValue<number>,
): Expression<number> {
  return createBinaryExpression<number>("-", left, right);
}

export function mul(
  left: ExpressionOrValue<number>,
  right: ExpressionOrValue<number>,
): Expression<number> {
  return createBinaryExpression<number>("*", left, right);
}

export function div(
  left: ExpressionOrValue<number>,
  right: ExpressionOrValue<number>,
): Expression<number> {
  return createBinaryExpression<number>("/", left, right);
}

export function mod(
  left: ExpressionOrValue<number>,
  right: ExpressionOrValue<number>,
): Expression<number> {
  return createBinaryExpression<number>("%", left, right);
}

export function neg(value: ExpressionOrValue<number>): Expression<number> {
  return createUnaryExpression<number>("-", value);
}

// ---------------------------------------------------------------------------
// Comparison operators
// ---------------------------------------------------------------------------

export function eq(
  left: ExpressionOrValue<unknown>,
  right: ExpressionOrValue<unknown>,
): Expression<boolean> {
  return createBinaryExpression<boolean>("==", left, right);
}

export function neq(
  left: ExpressionOrValue<unknown>,
  right: ExpressionOrValue<unknown>,
): Expression<boolean> {
  return createBinaryExpression<boolean>("!=", left, right);
}

export function gt(
  left: ExpressionOrValue<unknown>,
  right: ExpressionOrValue<unknown>,
): Expression<boolean> {
  return createBinaryExpression<boolean>(">", left, right);
}

export function lt(
  left: ExpressionOrValue<unknown>,
  right: ExpressionOrValue<unknown>,
): Expression<boolean> {
  return createBinaryExpression<boolean>("<", left, right);
}

export function gte(
  left: ExpressionOrValue<unknown>,
  right: ExpressionOrValue<unknown>,
): Expression<boolean> {
  return createBinaryExpression<boolean>(">=", left, right);
}

export function lte(
  left: ExpressionOrValue<unknown>,
  right: ExpressionOrValue<unknown>,
): Expression<boolean> {
  return createBinaryExpression<boolean>("<=", left, right);
}

// ---------------------------------------------------------------------------
// Boolean operators
// ---------------------------------------------------------------------------

/**
 * Logical AND.  Accepts 1 … N operands and folds left:
 * `and(a, b, c)` → `(a && b) && c`
 *
 * A single operand is returned as an `Expression<boolean>` (identity).
 */
export function and(...conditions: ExpressionOrValue<boolean>[]): Expression<boolean> {
  if (conditions.length === 0) {
    throw new Error("and() requires at least one argument");
  }
  if (conditions.length === 1) {
    const c = conditions[0];
    if (isExpression(c)) return c as Expression<boolean>;
    return wrapExpression({
      kind: "unary",
      operator: "!",
      argument: { kind: "unary", operator: "!", argument: c },
    }) as Expression<boolean>;
  }
  let result: ExpressionOrValue<boolean> = conditions[0]!;
  for (let i = 1; i < conditions.length; i++) {
    result = createBinaryExpression<boolean>("&&", result, conditions[i]!);
  }
  return result as Expression<boolean>;
}

/**
 * Logical OR.  Accepts 1 … N operands and folds left:
 * `or(a, b, c)` → `(a || b) || c`
 */
export function or(...conditions: ExpressionOrValue<boolean>[]): Expression<boolean> {
  if (conditions.length === 0) {
    throw new Error("or() requires at least one argument");
  }
  if (conditions.length === 1) {
    const c = conditions[0];
    if (isExpression(c)) return c as Expression<boolean>;
    return wrapExpression({
      kind: "unary",
      operator: "!",
      argument: { kind: "unary", operator: "!", argument: c },
    }) as Expression<boolean>;
  }
  let result: ExpressionOrValue<boolean> = conditions[0]!;
  for (let i = 1; i < conditions.length; i++) {
    result = createBinaryExpression<boolean>("||", result, conditions[i]!);
  }
  return result as Expression<boolean>;
}

export function not(value: ExpressionOrValue<boolean>): Expression<boolean> {
  return createUnaryExpression<boolean>("!", value);
}

// ---------------------------------------------------------------------------
// Conditional operators
// ---------------------------------------------------------------------------

export function cond<T>(
  condition: ExpressionOrValue<boolean>,
  trueValue: ExpressionOrValue<T>,
  falseValue: ExpressionOrValue<T>,
): Expression<T> {
  return createTernaryExpression<T>(condition, trueValue, falseValue);
}

export function coalesce<T>(
  left: ExpressionOrValue<T>,
  right: ExpressionOrValue<T>,
): Expression<T> {
  return createBinaryExpression<T>("??", left, right);
}

// ---------------------------------------------------------------------------
// String functions
// ---------------------------------------------------------------------------

// Detects the `[TemplateStringsArray, ...values]` shape produced by a
// tagged-template call. Used by `concat` to support both `concat("a", "b")`
// and `` concat`a${x}b` `` forms.
function isTemplateLiteralArgs(
  args: readonly unknown[],
): args is [TemplateStringsArray, ...unknown[]] {
  return Array.isArray(args[0]) && "raw" in (args[0] as any) && Array.isArray((args[0] as any).raw);
}

// Interleaves a tagged-template's static `strings` with its dynamic `values`,
// dropping empty leading/trailing static segments so the resulting array is
// suitable as `concat()` arguments.
function interleaveTemplateLiteralArgs(
  strings: TemplateStringsArray,
  values: readonly ExpressionOrValue<string>[],
): ExpressionOrValue<string>[] {
  const result: ExpressionOrValue<string>[] = [];
  for (let i = 0; i < strings.length; i++) {
    const s = strings[i]!;
    if (s !== "") {
      result.push(s);
    }
    if (i < values.length) {
      result.push(values[i]!);
    }
  }
  return result;
}

export function concat(
  strings: TemplateStringsArray,
  ...values: ExpressionOrValue<string>[]
): Expression<string>;
export function concat(...values: ExpressionOrValue<string>[]): Expression<string>;
export function concat(
  ...args: [TemplateStringsArray, ...ExpressionOrValue<string>[]] | ExpressionOrValue<string>[]
): Expression<string> {
  if (isTemplateLiteralArgs(args)) {
    const [strings, ...values] = args;
    return createFunctionCallExpression<string>(
      "concat",
      interleaveTemplateLiteralArgs(strings, values),
    );
  }
  return createFunctionCallExpression<string>("concat", args as ExpressionOrValue<string>[]);
}

export function take(
  value: ExpressionOrValue<string>,
  count: ExpressionOrValue<number>,
): Expression<string> {
  return createFunctionCallExpression<string>("take", [value, count]);
}

export function toLower(value: ExpressionOrValue<string>): Expression<string> {
  return createFunctionCallExpression<string>("toLower", [value]);
}

export function toUpper(value: ExpressionOrValue<string>): Expression<string> {
  return createFunctionCallExpression<string>("toUpper", [value]);
}

export function substring(
  value: ExpressionOrValue<string>,
  start?: ExpressionOrValue<number>,
  count?: ExpressionOrValue<number>,
): Expression<string> {
  const args: ExpressionOrValue<string | number>[] = [value];
  if (start !== undefined) args.push(start);
  if (count !== undefined) args.push(count);
  return createFunctionCallExpression<string>("substring", args);
}

export function replace(
  value: ExpressionOrValue<string>,
  oldValue: ExpressionOrValue<string>,
  newValue: ExpressionOrValue<string>,
): Expression<string> {
  return createFunctionCallExpression<string>("replace", [value, oldValue, newValue]);
}

export function split(
  value: ExpressionOrValue<string>,
  delimiter: ExpressionOrValue<string>,
): Expression<string[]> {
  return createFunctionCallExpression<string[]>("split", [value, delimiter]);
}

export function join(
  values: ExpressionOrValue<unknown[]>,
  delimiter: ExpressionOrValue<string>,
): Expression<string> {
  return createFunctionCallExpression<string>("join", [values, delimiter]);
}

export function readEnvironmentVariable(
  name: ExpressionOrValue<string>,
  defaultValue?: ExpressionOrValue<string>,
): Expression<string> {
  return createFunctionCallExpression<string>(
    "readEnvironmentVariable",
    defaultValue === undefined ? [name] : [name, defaultValue],
  );
}

export function trim(value: ExpressionOrValue<string>): Expression<string> {
  return createFunctionCallExpression<string>("trim", [value]);
}

export function startsWith(
  value: ExpressionOrValue<string>,
  prefix: ExpressionOrValue<string>,
): Expression<boolean> {
  return createFunctionCallExpression<boolean>("startsWith", [value, prefix]);
}

export function endsWith(
  value: ExpressionOrValue<string>,
  suffix: ExpressionOrValue<string>,
): Expression<boolean> {
  return createFunctionCallExpression<boolean>("endsWith", [value, suffix]);
}

export function base64(value: ExpressionOrValue<string>): Expression<string> {
  return createFunctionCallExpression<string>("base64", [value]);
}

export function base64ToJson(value: ExpressionOrValue<string>): Expression<unknown> {
  return createFunctionCallExpression<unknown>("base64ToJson", [value]);
}

export function format(
  formatString: ExpressionOrValue<string>,
  ...values: ExpressionOrValue<unknown>[]
): Expression<string> {
  return createFunctionCallExpression<string>("format", [formatString, ...values]);
}

export function lastIndexOf(
  value: ExpressionOrValue<string>,
  searchString: ExpressionOrValue<string>,
): Expression<number> {
  return createFunctionCallExpression<number>("lastIndexOf", [value, searchString]);
}

// ---------------------------------------------------------------------------
// Unique / ID functions
// ---------------------------------------------------------------------------

export function uniqueString(...values: ExpressionOrValue<string>[]): Expression<string> {
  return createFunctionCallExpression<string>("uniqueString", values);
}

export function guid(...values: ExpressionOrValue<string>[]): Expression<string> {
  return createFunctionCallExpression<string>("guid", values);
}

export function resourceId(
  type: ExpressionOrValue<string>,
  ...names: ExpressionOrValue<string>[]
): Expression<string> {
  return createFunctionCallExpression<string>("resourceId", [type, ...names]);
}

export function subscriptionResourceId(
  type: ExpressionOrValue<string>,
  ...names: ExpressionOrValue<string>[]
): Expression<string> {
  return createFunctionCallExpression<string>("subscriptionResourceId", [type, ...names]);
}

export function extensionResourceId(
  baseId: ExpressionOrValue<string>,
  type: ExpressionOrValue<string>,
  ...names: ExpressionOrValue<string>[]
): Expression<string> {
  return createFunctionCallExpression<string>("extensionResourceId", [baseId, type, ...names]);
}

// ---------------------------------------------------------------------------
// Numeric functions
// ---------------------------------------------------------------------------

export function int(value: ExpressionOrValue<unknown>): Expression<number> {
  return createFunctionCallExpression<number>("int", [value]);
}

export function min(...values: ExpressionOrValue<number>[]): Expression<number> {
  return createFunctionCallExpression<number>("min", values);
}

export function max(...values: ExpressionOrValue<number>[]): Expression<number> {
  return createFunctionCallExpression<number>("max", values);
}

// ---------------------------------------------------------------------------
// Array / collection functions
// ---------------------------------------------------------------------------

export function length(value: ExpressionOrValue<unknown>): Expression<number> {
  return createFunctionCallExpression<number>("length", [value]);
}

export function empty(value: ExpressionOrValue<unknown>): Expression<boolean> {
  return createFunctionCallExpression<boolean>("empty", [value]);
}

export function first<T>(arr: ExpressionOrValue<T[]>): Expression<T> {
  return createFunctionCallExpression<T>("first", [arr]);
}

export function last<T>(arr: ExpressionOrValue<T[]>): Expression<T> {
  return createFunctionCallExpression<T>("last", [arr]);
}

export function contains(
  container: ExpressionOrValue<unknown>,
  value: ExpressionOrValue<unknown>,
): Expression<boolean> {
  return createFunctionCallExpression<boolean>("contains", [container, value]);
}

export function indexOf<T>(
  arr: ExpressionOrValue<T[]>,
  value: ExpressionOrValue<T>,
): Expression<number> {
  return createFunctionCallExpression<number>("indexOf", [arr, value]);
}

export function flatten<T>(arr: ExpressionOrValue<T[][]>): Expression<T[]> {
  return createFunctionCallExpression<T[]>("flatten", [arr]);
}

export function intersect<T, U>(
  a: ExpressionOrValue<T>,
  b: ExpressionOrValue<U>,
): Expression<T & U> {
  return createFunctionCallExpression<T & U>("intersection", [a, b]);
}

export function union<T, U>(a: ExpressionOrValue<T>, b: ExpressionOrValue<U>): Expression<T | U> {
  return createFunctionCallExpression<T | U>("union", [a, b]);
}

export function skip<T>(
  arr: ExpressionOrValue<T[]>,
  count: ExpressionOrValue<number>,
): Expression<T[]> {
  return createFunctionCallExpression<T[]>("skip", [arr, count]);
}

export function reverse<T>(arr: ExpressionOrValue<T[]>): Expression<T[]> {
  return createFunctionCallExpression<T[]>("reverse", [arr]);
}

// ---------------------------------------------------------------------------
// Object functions
// ---------------------------------------------------------------------------

export function json(value: ExpressionOrValue<string>): Expression<unknown> {
  return createFunctionCallExpression<unknown>("json", [value]);
}

export function keys(obj: ExpressionOrValue<object>): Expression<string[]> {
  return createFunctionCallExpression<string[]>("keys", [obj]);
}

export function objectValues(obj: ExpressionOrValue<object>): Expression<unknown[]> {
  return createFunctionCallExpression<unknown[]>("values", [obj]);
}

export function items(obj: ExpressionOrValue<object>): Expression<unknown[]> {
  return createFunctionCallExpression<unknown[]>("items", [obj]);
}

// ---------------------------------------------------------------------------
// Scope functions
// ---------------------------------------------------------------------------

/**
 * Typed shape of Bicep's `subscription()` runtime function. Only the
 * properties currently surfaced are listed; extend as needed.
 */
export interface SubscriptionScope {
  readonly subscriptionId: string;
  readonly tenantId: string;
}

/**
 * Typed shape of Bicep's `resourceGroup()` runtime function. Only the
 * properties currently surfaced are listed; extend as needed.
 */
export interface ResourceGroupScope {
  readonly name: string;
  readonly location: string;
  readonly id: string;
}

/**
 * Typed shape of Bicep's `tenant()` runtime function. Only the properties
 * currently surfaced are listed; extend as needed.
 */
export interface TenantScope {
  readonly tenantId: string;
  readonly id: string;
}

/**
 * Typed shape of Bicep's `managementGroup()` runtime function. Only the
 * properties currently surfaced are listed; extend as needed.
 */
export interface ManagementGroupScope {
  readonly name: string;
  readonly id: string;
}

/**
 * Bicep `subscription()` / `subscription(subscriptionId)`.
 *
 * - Zero-arg form returns details about the current subscription.
 * - One-arg form returns a scope object for setting `scope:` on a module
 *   or extension resource.
 */
export function subscription(): Expression<SubscriptionScope>;
export function subscription(
  subscriptionId: ExpressionOrValue<string>,
): Expression<SubscriptionScope>;
export function subscription(
  subscriptionId?: ExpressionOrValue<string>,
): Expression<SubscriptionScope> {
  return createFunctionCallExpression<SubscriptionScope>(
    "subscription",
    subscriptionId === undefined ? [] : [subscriptionId],
  );
}

/**
 * Bicep `resourceGroup()` / `resourceGroup(name)` /
 * `resourceGroup(subscriptionId, name)`.
 *
 * - Zero-arg form returns details about the current resource group.
 * - One- and two-arg forms return a scope object for setting `scope:` on a
 *   module or extension resource.
 */
export function resourceGroup(): Expression<ResourceGroupScope>;
export function resourceGroup(name: ExpressionOrValue<string>): Expression<ResourceGroupScope>;
export function resourceGroup(
  subscriptionId: ExpressionOrValue<string>,
  name: ExpressionOrValue<string>,
): Expression<ResourceGroupScope>;
export function resourceGroup(
  ...args: ExpressionOrValue<string>[]
): Expression<ResourceGroupScope> {
  return createFunctionCallExpression<ResourceGroupScope>("resourceGroup", args);
}

/**
 * Bicep `tenant()`. Returns details about the current tenant (or a scope
 * object when placed in `scope:`). Takes no arguments.
 */
export function tenant(): Expression<TenantScope> {
  return createFunctionCallExpression<TenantScope>("tenant", []);
}

/**
 * Bicep `managementGroup()` / `managementGroup(identifier)`.
 *
 * - Zero-arg form is only valid in management-group-scope deployments and
 *   returns details about the current management group.
 * - One-arg form returns a scope object for setting `scope:` on a module
 *   or extension resource.
 */
export function managementGroup(): Expression<ManagementGroupScope>;
export function managementGroup(
  identifier: ExpressionOrValue<string>,
): Expression<ManagementGroupScope>;
export function managementGroup(
  identifier?: ExpressionOrValue<string>,
): Expression<ManagementGroupScope> {
  return createFunctionCallExpression<ManagementGroupScope>(
    "managementGroup",
    identifier === undefined ? [] : [identifier],
  );
}

/** Bicep `deployment()`. Returns information about the current deployment. */
export function deployment(): Expression<unknown> {
  return createFunctionCallExpression<unknown>("deployment", []);
}

/** Bicep `environment()`. Returns information about the Azure environment. */
export function environment(): Expression<unknown> {
  return createFunctionCallExpression<unknown>("environment", []);
}
