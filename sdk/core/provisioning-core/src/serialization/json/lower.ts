// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * ARM state-shape conversion.
 *
 * lowerState maps JS property names to ARM paths, restores flattened
 * nesting, and encodes terminal values using the supplied model shape.
 * raiseState performs the inverse conversion for deserialization.
 * Both follow nested model, array, and record shapes and preserve unknown
 * keys. Property-access expression lowering lives in expression.ts.
 */

import {
  isTerminalValueShape,
  type ModelShape,
  type ValueShape,
  resolveModelShape,
} from "../../shape/shape.js";
import { isExpression } from "../../expression/expressions.js";
import { isExpressionNode } from "../../expression/ast-nodes.js";
import { decodeWireValue, encodeWireValue } from "./encoding.js";

const MISSING = Symbol("missing");

function assertNeverValueShape(shape: never): never {
  throw new Error(`Unhandled value shape: ${String(shape)}`);
}

// ---------------------------------------------------------------------------
// State lowering
// ---------------------------------------------------------------------------

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== "object") return false;
  // Expression proxies are opaque values (despite a null prototype) — they
  // must not be treated as cloneable plain objects.
  if (isExpression(value)) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

/**
 * Recursively rewrite a raw state object into its ARM wire shape. Keys
 * not present in `shape.byJsName` pass through unchanged. Multi-
 * segment ARM paths (from `@flattenProperty`) re-nest objects; nested
 * models, arrays-of-models and records-of-models recurse via
 * `target`. Empty ARM paths fall back to the JS property name.
 *
 * Collisions where two JS-side keys map to overlapping ARM paths merge
 * when both sides are compatible objects; non-object / object collisions
 * throw.
 */
export function lowerState(
  state: Record<string, unknown>,
  shape: ModelShape,
  visited: WeakSet<object> = new WeakSet(),
): Record<string, unknown> {
  if (visited.has(state)) {
    throw new Error("Cycle detected while lowering ARM state.");
  }
  visited.add(state);
  try {
    const out: Record<string, unknown> = Object.create(null);
    // Select the variant once, from the state we're about to lower —
    // every key below is looked up against that one concrete shape.
    const flat = resolveModelShape(shape, state, "js");

    for (const [jsKey, rawValue] of Object.entries(state)) {
      const propShape = flat?.byJsName[jsKey];
      const path = propShape?.armPath.length ? propShape.armPath : [jsKey];
      const loweredValue = lowerValue(rawValue, propShape?.value, visited, path);

      if (!propShape) {
        // Passthrough: key not in shape (e.g. CDK-internal, or emitter
        // didn't include it).
        assignPath(out, [jsKey], loweredValue);
        continue;
      }

      assignPath(out, path, loweredValue);
    }

    return out;
  } finally {
    visited.delete(state);
  }
}

function lowerValue(
  value: unknown,
  shape: ValueShape | undefined,
  visited: WeakSet<object>,
  path: readonly string[],
): unknown {
  if (value === null || value === undefined) return value;
  if (isExpression(value) || isExpressionNode(value)) return value;

  if (!shape) {
    return value;
  }

  if (isTerminalValueShape(shape)) {
    if ("encoding" in shape && shape.encoding) {
      return encodeWireValue(value, shape.encoding, path);
    }
    return value;
  }

  switch (shape.kind) {
    case "deferred":
      if (!isPlainObject(value)) return value;
      // `lowerState` resolves the variant itself, per property, using
      // `value` as the discriminator source.
      return lowerState(value, shape.value(), visited);
    case "array":
      if (!Array.isArray(value)) return value;
      return value.map((item, index) =>
        lowerValue(item, shape.element, visited, [...path, String(index)]),
      );
    case "record": {
      if (!isPlainObject(value)) return value;
      const out: Record<string, unknown> = Object.create(null);
      for (const [k, v] of Object.entries(value)) {
        defineOwn(out, k, lowerValue(v, shape.value, visited, [...path, k]));
      }
      return out;
    }
    case "tuple":
      if (!Array.isArray(value)) return value;
      return value.map((item, index) =>
        lowerValue(item, shape.values[index], visited, [...path, String(index)]),
      );
    default:
      return assertNeverValueShape(shape);
  }
}

/**
 * Write `value` into `target` at the given ARM path, deep-merging with
 * existing object values. Throws on non-object/object or
 * object/non-object collisions.
 */
function assignPath(
  target: Record<string, unknown>,
  path: readonly string[],
  value: unknown,
): void {
  if (path.length === 0) return;

  let cursor = target;
  for (let i = 0; i < path.length - 1; i++) {
    const seg = path[i]!;
    const existing = Object.prototype.hasOwnProperty.call(cursor, seg) ? cursor[seg] : undefined;
    if (existing === undefined) {
      const next: Record<string, unknown> = Object.create(null);
      defineOwn(cursor, seg, next);
      cursor = next;
    } else if (isPlainObject(existing)) {
      cursor = existing;
    } else {
      throw new Error(
        `ARM path collision at "${path.slice(0, i + 1).join(".")}": expected object, got ${typeof existing}.`,
      );
    }
  }

  const leafKey = path[path.length - 1]!;
  const existingLeaf = Object.prototype.hasOwnProperty.call(cursor, leafKey)
    ? cursor[leafKey]
    : undefined;
  if (existingLeaf === undefined) {
    defineOwn(cursor, leafKey, value);
    return;
  }

  if (isPlainObject(existingLeaf) && isPlainObject(value)) {
    defineOwn(
      cursor,
      leafKey,
      deepMerge(existingLeaf as Record<string, unknown>, value as Record<string, unknown>, path),
    );
    return;
  }

  throw new Error(
    `ARM path collision at "${path.join(".")}": cannot merge ${typeof existingLeaf} with ${typeof value}.`,
  );
}

function deepMerge(
  a: Record<string, unknown>,
  b: Record<string, unknown>,
  prefix: readonly string[],
): Record<string, unknown> {
  const out: Record<string, unknown> = Object.create(null);
  for (const [key, value] of Object.entries(a)) defineOwn(out, key, value);
  for (const [k, v] of Object.entries(b)) {
    const existing = Object.prototype.hasOwnProperty.call(out, k) ? out[k] : undefined;
    if (existing === undefined) {
      defineOwn(out, k, v);
      continue;
    }
    if (isPlainObject(existing) && isPlainObject(v)) {
      defineOwn(
        out,
        k,
        deepMerge(existing as Record<string, unknown>, v as Record<string, unknown>, [
          ...prefix,
          k,
        ]),
      );
      continue;
    }
    throw new Error(
      `ARM path collision at "${[...prefix, k].join(".")}": cannot merge ${typeof existing} with ${typeof v}.`,
    );
  }
  return out;
}

function defineOwn(target: Record<string, unknown>, key: string, value: unknown): void {
  Object.defineProperty(target, key, {
    value,
    enumerable: true,
    configurable: true,
    writable: true,
  });
}

// ---------------------------------------------------------------------------
// State raising (inverse of lowerState)
// ---------------------------------------------------------------------------

/**
 * Inverse of `lowerState`: walks a wire-shape state object and lifts
 * values at each property entry's `armPath` back onto the flat
 * `jsName` key. Recurses into nested model / array / record values via
 * `target`. Empty ARM paths fall back to the JS property name.
 *
 * ARM-shape keys that consumed a nested object entirely (single-segment
 * paths carrying a model `target`) pop that segment from the source
 * so leftovers at intermediate nodes don't silently leak into the
 * output. For multi-segment paths (`@flattenProperty`), only the leaf
 * is extracted; intermediate shared objects may survive as their own
 * top-level entries if the shape also declares a jsName for them.
 *
 * Keys present in the state but not consumed by any property entry
 * pass through unchanged (preserving the "unknown key" escape hatch
 * documented in `lowerState`).
 */
export function raiseState(
  state: Record<string, unknown>,
  shape: ModelShape,
  visited: WeakSet<object> = new WeakSet(),
): Record<string, unknown> {
  if (visited.has(state)) {
    throw new Error("Cycle detected while raising ARM state.");
  }
  visited.add(state);
  try {
    // Wire-shaped input, so the variant is selected against ARM keys.
    const flat = resolveModelShape(shape, state, "arm");
    if (!flat) return structuredCloneLike(state, new WeakSet());

    // Clone into a mutable working copy so we can prune consumed paths.
    const working: Record<string, unknown> = structuredCloneLike(state, new WeakSet());
    const out: Record<string, unknown> = Object.create(null);
    const consumedTopLevel = new Set<string>();

    for (const [jsName, propShape] of Object.entries(flat.byJsName)) {
      const path = propShape.armPath.length > 0 ? propShape.armPath : [jsName];
      const extracted = extractPath(working, path);
      if (extracted === MISSING) continue;

      const raised = raiseValue(extracted, propShape.value, visited, path);
      defineOwn(out, jsName, raised);

      consumedTopLevel.add(path[0]!);
    }

    // Passthrough: anything left in `working` that wasn't consumed by a
    // shape-driven extraction and doesn't collide with an already-
    // placed jsName.
    for (const [k, v] of Object.entries(working)) {
      if (consumedTopLevel.has(k)) {
        // Top-level segment was touched by at least one armPath. If
        // residue remains (e.g. sibling properties the shape didn't
        // cover), surface it under the original ARM key so it's not
        // silently dropped.
        if (isPlainObject(v) && Object.keys(v).length === 0) continue;
        if (v === undefined) continue;
      }
      if (Object.prototype.hasOwnProperty.call(out, k)) continue;
      defineOwn(out, k, v);
    }

    return out;
  } finally {
    visited.delete(state);
  }
}

function raiseValue(
  value: unknown,
  shape: ValueShape | undefined,
  visited: WeakSet<object>,
  path: readonly string[],
): unknown {
  if (value === null || value === undefined) return value;
  if (isExpression(value) || isExpressionNode(value)) return value;
  if (!shape) return value;

  if (isTerminalValueShape(shape)) {
    if ("encoding" in shape && shape.encoding) {
      return decodeWireValue(value, shape.encoding, path);
    }
    return value;
  }

  switch (shape.kind) {
    case "deferred":
      if (!isPlainObject(value)) return value;
      // `raiseState` selects the variant itself, against ARM keys.
      return raiseState(value, shape.value(), visited);
    case "array":
      if (!Array.isArray(value)) return value;
      return value.map((item, index) =>
        raiseValue(item, shape.element, visited, [...path, String(index)]),
      );
    case "record": {
      if (!isPlainObject(value)) return value;
      const out: Record<string, unknown> = Object.create(null);
      for (const [k, v] of Object.entries(value)) {
        defineOwn(out, k, raiseValue(v, shape.value, visited, [...path, k]));
      }
      return out;
    }
    case "tuple":
      if (!Array.isArray(value)) return value;
      return value.map((item, index) =>
        raiseValue(item, shape.values[index], visited, [...path, String(index)]),
      );
    default:
      return assertNeverValueShape(shape);
  }
}

/**
 * Walk `obj` along `path`, returning the leaf value and pruning it
 * from the tree. Empty intermediate objects are left in place (caller
 * decides how to treat residue).
 *
 * Returns `MISSING` when any segment is absent or not a plain object.
 */
function extractPath(obj: Record<string, unknown>, path: readonly string[]): unknown {
  if (path.length === 0) return obj;

  let cursor: Record<string, unknown> = obj;
  for (let i = 0; i < path.length - 1; i++) {
    const seg = path[i]!;
    const next = Object.prototype.hasOwnProperty.call(cursor, seg) ? cursor[seg] : undefined;
    if (!isPlainObject(next)) return MISSING;
    cursor = next;
  }

  const leafKey = path[path.length - 1]!;
  if (!Object.prototype.hasOwnProperty.call(cursor, leafKey)) return MISSING;
  const value = cursor[leafKey];
  delete cursor[leafKey];
  return value;
}

/**
 * Shallow-clone recursively enough to avoid mutating caller state.
 * We only copy plain objects; arrays and other values are shared
 * (raiseValue handles arrays via `.map` so mutation is contained).
 */
function structuredCloneLike(
  value: Record<string, unknown>,
  seen: WeakSet<object>,
): Record<string, unknown> {
  if (seen.has(value)) {
    // Preserve the cycle for downstream detection in raiseState.
    return value;
  }
  seen.add(value);
  const out: Record<string, unknown> = Object.create(null);
  for (const [k, v] of Object.entries(value)) {
    defineOwn(
      out,
      k,
      isExpression(v) || isExpressionNode(v)
        ? v
        : isPlainObject(v)
          ? structuredCloneLike(v, seen)
          : v,
    );
  }
  return out;
}
