// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  EXPRESSION_BRAND,
  isExpression,
  unwrapExpression,
  type Expression,
  type ExpressionOrValue,
} from "../../expression/expressions.js";
import {
  accessExpressionNode,
  arrayAccessExpressionNode,
  identifierExpressionNode,
  isExpressionNode,
  type ArrayAccessIndex,
  type ExpressionNode,
} from "../../expression/ast-nodes.js";
import type { PropertySegment } from "../../types.js";
import type { LoopedResource, Resource, ResourceDeclaration } from "./resource.js";
import { navigateShape, type FlatModelShape, type NavShape } from "../../shape/shape.js";
import { getShape } from "../../shape/shape-registry.js";

export const RAW_RESOURCE_HANDLE = Symbol("raw-resource-handle");
export const RESOURCE_BRAND = Symbol.for("@azure/provisioning-core.Resource");

/**
 * Brand present on every `LoopedResource` instance. Lives here (rather than
 * on the `LoopedResource` class) so tree-walking utilities can brand-check
 * for looped declarations without a runtime import of `resource.ts` — which
 * would create an eval-time import cycle (`resource.ts` extends `ProvisioningComponent`).
 * Use {@link isLoopedResource} in normal code.
 */
export const LOOPED_RESOURCE_BRAND = Symbol.for("@azure/provisioning-core.LoopedResource");

/**
 * Brand present on every `ResourceDeclaration` instance (both scalar
 * `Resource` and looped `LoopedResource`). Use
 * {@link isResourceDeclaration} instead of a direct
 * brand check.
 */
export const RESOURCE_DECLARATION_BRAND = Symbol.for(
  "@azure/provisioning-core.ResourceDeclaration",
);

/**
 * Present on indexed resource proxies (see {@link createIndexedResourceProxy}).
 * Reading it off any resource-like value returns the stored index expression
 * for indexed proxies, and `undefined` for plain outer proxies. The base
 * `Resource` constructor probes for it on the `context` argument to detect
 * `parents.at(i)` / `parents.current()` being passed as a child parent
 * context; other consumers may probe it for their own purposes (the proxy
 * itself doesn't imply any parent-child relationship — the index is simply
 * what identifies which element of a looped declaration this proxy refers
 * to).
 */
export const PROXY_INDEX_REF = Symbol.for("@azure/provisioning-core.PROXY_INDEX_REF");

/**
 * Present on indexed resource proxies. Reading it returns the underlying
 * outer-proxy resource that the indexed proxy wraps. Used by the base
 * `Resource` constructor to normalize `this.parent` back to the raw parent
 * (so tree walks and symbol-map lookups continue to work) while
 * `PROXY_INDEX_REF` carries the "which index" information onto `state`.
 */
export const INDEXED_PROXY_TARGET = Symbol.for("@azure/provisioning-core.INDEXED_PROXY_TARGET");

/**
 * State-object key under which the base `Resource` constructor records the
 * index expression when the `context` argument is an indexed proxy (i.e.,
 * `parent.at(i)` / `parent.current()`). The serializer reads this key
 * from the child's raw state to emit `parent: parentSym[<index>]` instead
 * of the bare `parent: parentSym` form. Kept as a shared const so writer
 * (`resource.ts`) and reader (`serialize.ts`) never drift.
 *
 * Lives on the **child**, not the parent: siblings under the same parent
 * can be created via different indexed proxies (e.g. `new Child(p.at(0), …)`
 * and `new Child(p.at(1), …)` both resolve `.parent` to the same raw parent,
 * so the index that distinguishes them must be recorded per-child).
 */
export const STATE_PARENT_INDEX = "parentIndex" as const;

/**
 * Canonical string key for an array-access index. Used to match a child's
 * recorded `state.parentIndex` against an indexed proxy's index when
 * resolving per-element child accessors — e.g. `parent.at(0).secrets` must
 * only see children created via `parent.at(0)`, not those under other
 * indices.
 *
 * `undefined` (a scalar parent, or a child with no recorded index) maps to
 * `undefined`, so scalar authoring keeps matching scalar children only.
 * Otherwise the key is a deterministic, collision-free encoding of the
 * index's node shape. Equality is **structural**, not semantic — `sym[i+1]`
 * and `sym[1+i]` produce different keys — which is acceptable for authoring
 * (nobody hand-writes equivalent-but-different index expressions).
 */
export function indexKey(index: ArrayAccessIndex | undefined): string | undefined {
  if (index === undefined) return undefined;
  return serializeIndex(index);
}

function serializeIndex(index: ArrayAccessIndex): string {
  if (typeof index === "number") return `n:${index}`;
  if (typeof index === "string") return `s:${index}`;
  return serializeIndexNode(index);
}

// TODO(serializer-in-core): once the serializer lives in core, replace this
// bespoke walker with a shared canonicalization — e.g.
// `stableStringify(canonicalize(index))` where `canonicalize` is the pure,
// context-free lowering the serializer already uses. That ties match-equality
// to render-equality (two indices match iff they'd emit the same Bicep) and
// removes this duplicate traversal of the `ExpressionNode` union. Note: this
// runs at authoring time (before `serialize()`, no symbol map), so only the
// context-free part of lowering can be reused — fine for the index subset that
// actually occurs (literals, loop `symbolic-value`, arithmetic over those).
function serializeIndexNode(node: ExpressionNode): string {
  switch (node.kind) {
    case "symbolic-value":
      return `sym(${node.path})`;
    case "identifier":
      return `id(${typeof node.id === "string" ? node.id : "@res"})`;
    case "property-access":
      return `prop(${serializeIndexNode(node.base)}.${node.property})`;
    case "array-access":
      return `arr(${serializeIndexNode(node.base)}[${serializeIndex(node.index)}])`;
    case "binary":
      return `bin(${node.operator},${serializeOperand(node.left)},${serializeOperand(node.right)})`;
    case "unary":
      return `un(${node.operator},${serializeOperand(node.argument)})`;
    case "ternary":
      return `tern(${serializeOperand(node.condition)},${serializeOperand(node.trueValue)},${serializeOperand(node.falseValue)})`;
    case "fn-call":
      return `fn(${node.operator},${node.args.map(serializeOperand).join(",")})`;
    case "instance-function-call":
      return `ifn(${serializeIndexNode(node.base)}.${node.name}(${node.args.map(serializeOperand).join(",")}))`;
    case "interpolated-string":
      return `istr(${node.segments.map(serializeOperand).join(",")})`;
  }
}

function serializeOperand(operand: unknown): string {
  if (isExpressionNode(operand)) return serializeIndexNode(operand);
  return `v:${JSON.stringify(operand)}`;
}

// ---------------------------------------------------------------------------
// Property proxy internal types
// ---------------------------------------------------------------------------

/**
 * A single step in a property proxy's walk from the root resource. Each step
 * carries the path segment (member name or array index) and the ARM
 * `PropertyShape` stamp's `armPath` for that step (if known). The parallel `path`/`stamps`
 * arrays this replaces could drift in length; a single array of steps makes
 * the invariant structural.
 */
interface PropertyStep {
  readonly segment: PropertySegment;
  readonly armPath?: readonly string[] | undefined;
}

/**
 * The identity a member-proxy needs to lower into a Bicep expression and to
 * back reads/writes. Bundles the three roles that were previously passed
 * positionally to {@link createResourceMemberProxy}:
 *
 * - `resource` — the tree-registered declaration that supplies BOTH the
 *   symbol root (`identifierExpressionNode(resource)`) and the ARM shape
 *   source (`getResourceShape`). For a scalar resource this is the outer
 *   resource proxy; for an indexed looped element it is the raw
 *   `LoopedResource` declaration (the tree citizen), NOT the ephemeral
 *   `.at(i)` handle — that handle isn't in the component tree, so it can't
 *   resolve to a Bicep symbol.
 * - `root` — the raw backing object that stores assigned values, used by
 *   `deref(...)` and nested writes.
 * - `index` — optional array index. When set, the emitted expression roots
 *   at `resource[index]` instead of `resource`, so `many.at(i).prop.blob`
 *   serializes as `sym[i].prop.blob`. Populated for `.at(i)` / `.current()`
 *   handles by {@link createIndexedResourceProxy}.
 */
export interface ResourceProxySource {
  readonly resource: Resource;
  readonly root: Record<string, unknown>;
  readonly index?: ArrayAccessIndex;
}

interface PropertyProxyState extends ResourceProxySource {
  // The member/index path from the root resource to the current proxied value,
  // each entry paired with its wire `armPath` stamp (if known).
  readonly steps: readonly PropertyStep[];
  // Current ARM shape navigation state. `undefined` at any level means
  // "untyped from here down"; subsequent accesses are passthrough.
  readonly nav?: NavShape;
}

function stepsToPath(steps: readonly PropertyStep[]): readonly PropertySegment[] {
  return steps.map((s) => s.segment);
}

const PROPERTY_PROXY_STATE = Symbol("property-proxy-state");

function isPropertyProxy(
  value: unknown,
): value is { readonly [PROPERTY_PROXY_STATE]: PropertyProxyState } {
  return (
    typeof value === "object" &&
    value !== null &&
    Reflect.get(value as object, PROPERTY_PROXY_STATE) !== undefined
  );
}

function getPropertyProxyState(value: {
  readonly [PROPERTY_PROXY_STATE]: PropertyProxyState;
}): PropertyProxyState {
  return value[PROPERTY_PROXY_STATE];
}

// ---------------------------------------------------------------------------
// Deref
// ---------------------------------------------------------------------------

export type Deref<T> = T extends Expression<infer U> ? U : T;

export function deref<T>(value: T): Deref<T> {
  if (isPropertyProxy(value)) {
    const state = getPropertyProxyState(value);
    return getValueAtPath(state.root, stepsToPath(state.steps)) as Deref<T>;
  }

  if (isResourceHandle(value)) {
    return unwrapResourceHandle(value) as Deref<T>;
  }

  return value as Deref<T>;
}

// ---------------------------------------------------------------------------
// Path helpers
// ---------------------------------------------------------------------------

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function getValueAtPath(root: Record<string, unknown>, path: readonly PropertySegment[]): unknown {
  let current: unknown = root;

  for (const segment of path) {
    if (typeof current !== "object" || current === null) {
      return undefined;
    }

    current = (current as Record<string, unknown>)[String(segment)];
  }

  return current;
}

function setValueAtPath(
  root: Record<string, unknown>,
  path: readonly PropertySegment[],
  value: unknown,
): void {
  let current: Record<string, unknown> = root;

  for (let index = 0; index < path.length - 1; index += 1) {
    const segment = String(path[index]);
    const nextSegment = path[index + 1];
    const existing = current[segment];

    if (typeof existing === "object" && existing !== null) {
      current = existing as Record<string, unknown>;
      continue;
    }

    const container = (typeof nextSegment === "number" ? [] : {}) as Record<string, unknown>;
    current[segment] = container;
    current = container;
  }

  current[String(path[path.length - 1])] = value;
}

// ---------------------------------------------------------------------------
// Expression construction
// ---------------------------------------------------------------------------

function createMemberAccessPathExpression(
  resource: Resource,
  steps: readonly PropertyStep[],
  index?: ArrayAccessIndex,
): ExpressionNode {
  let current: ExpressionNode = identifierExpressionNode(resource);
  if (index !== undefined) {
    current = arrayAccessExpressionNode(current, index);
  }
  for (const { segment, armPath } of steps) {
    current = accessExpressionNode(current, segment, armPath);
  }
  return current;
}

// ---------------------------------------------------------------------------
// Value normalization
// ---------------------------------------------------------------------------

export function normalizeAssignedValue(value: unknown, currentResource?: Resource): unknown {
  if (isPropertyProxy(value)) {
    const state = getPropertyProxyState(value);
    if (currentResource && state.resource === currentResource) {
      // Same-resource proxy → inline raw value (avoids self-references)
      return getValueAtPath(state.root, stepsToPath(state.steps));
    }
    return createMemberAccessPathExpression(state.resource, state.steps, state.index);
  }

  if (isResourceHandle(value)) {
    return identifierExpressionNode(value);
  }

  if (isExpression(value)) {
    return unwrapExpression(value);
  }

  if (isExpressionNode(value)) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => normalizeAssignedValue(item, currentResource));
  }

  if (isPlainObject(value)) {
    return normalizeObjectValue(value as Record<string, unknown>, currentResource);
  }

  return value;
}

function normalizeObjectValue(
  obj: Record<string, unknown>,
  currentResource?: Resource,
): Record<string, unknown> {
  const entries = Object.entries(obj);
  const result: Record<string, unknown> = {};

  for (const [key, value] of entries) {
    if (isPropertyProxy(value)) {
      const state = getPropertyProxyState(value);
      if (currentResource && state.resource === currentResource) {
        // Same-resource → inline raw value (avoids self-references)
        result[key] = getValueAtPath(state.root, stepsToPath(state.steps));
        continue;
      }
    }

    result[key] = normalizeAssignedValue(value, currentResource);
  }

  return result;
}

// ---------------------------------------------------------------------------
// Property proxy
// ---------------------------------------------------------------------------

function toPropertySegment(property: string): PropertySegment {
  return /^\d+$/u.test(property) ? Number(property) : property;
}

function getPropertyProxyTarget(state: PropertyProxyState): object {
  const currentValue = getValueAtPath(state.root, stepsToPath(state.steps));

  if (typeof currentValue === "object" && currentValue !== null) {
    return currentValue;
  }

  return {};
}

function createPropertyProxy(state: PropertyProxyState): unknown {
  // Always use a fresh empty target — avoids Proxy invariant violations
  // when the stored value has non-configurable properties (e.g. EXPRESSION_BRAND).
  const target = {};

  return new Proxy(target, {
    has(proxyTarget, property) {
      if (property === PROPERTY_PROXY_STATE || property === EXPRESSION_BRAND) {
        return true;
      }

      const backing = getPropertyProxyTarget(state);
      if (Reflect.has(backing, property)) return true;
      return Reflect.has(proxyTarget, property);
    },

    ownKeys() {
      const backing = getPropertyProxyTarget(state);
      return Reflect.ownKeys(backing).filter((k): k is string => typeof k === "string");
    },

    getOwnPropertyDescriptor(_proxyTarget, property) {
      const backing = getPropertyProxyTarget(state);
      if (typeof property === "string" && Object.prototype.hasOwnProperty.call(backing, property)) {
        return { enumerable: true, configurable: true, writable: true };
      }
      return undefined;
    },

    get(proxyTarget, property, receiver) {
      if (property === PROPERTY_PROXY_STATE) {
        return state;
      }

      if (property === EXPRESSION_BRAND) {
        return createMemberAccessPathExpression(state.resource, state.steps, state.index);
      }

      if (property === Symbol.toPrimitive) {
        return () => `[ResourceMember ${stepsToPath(state.steps).map(String).join(".")}]`;
      }

      if (typeof property !== "string") {
        return Reflect.get(proxyTarget, property, receiver);
      }

      if (property === "toString") {
        return () => `[ResourceMember ${stepsToPath(state.steps).map(String).join(".")}]`;
      }

      if (property === "valueOf") {
        return () => createMemberAccessPathExpression(state.resource, state.steps, state.index);
      }

      if (property === "then") {
        return undefined;
      }

      const segment = toPropertySegment(property);
      // Pass the value at the current position so a discriminated nav
      // can select its variant (see `resolveModelShape`).
      const step = navigateShape(
        state.nav,
        segment,
        getValueAtPath(state.root, stepsToPath(state.steps)),
      );
      const nextArmPath = step.stamp?.armPath;
      const nextNav = step.next;

      return createPropertyProxy({
        ...state,
        steps: [...state.steps, { segment, armPath: nextArmPath }],
        nav: nextNav,
      });
    },

    set(_proxyTarget, property, value) {
      if (typeof property !== "string") {
        return false;
      }

      // A looped element (`parent.at(i)`) yields member proxies stamped with
      // an index. Writing through one would mutate the shared for-loop body,
      // which is not valid Bicep — `sym[i].prop = ...` cannot be expressed.
      if (state.index !== undefined) {
        throwLoopedElementWriteError();
      }

      setValueAtPath(
        state.root,
        [...stepsToPath(state.steps), toPropertySegment(property)],
        normalizeAssignedValue(value, state.resource),
      );

      return true;
    },
  });
}

// ---------------------------------------------------------------------------
// Resource member proxy
// ---------------------------------------------------------------------------

function isNonEnumerableOwnProperty(target: object, property: string): boolean {
  const descriptor = Reflect.getOwnPropertyDescriptor(target, property);
  return descriptor?.enumerable === false;
}

function hasOwnOrPrototypeProperty(target: object, property: string): boolean {
  let current: object | null = target;

  while (current !== null) {
    if (Object.prototype.hasOwnProperty.call(current, property)) {
      return true;
    }
    current = Object.getPrototypeOf(current);
  }

  return false;
}

export function createResourceMemberProxy<TValue>(
  source: ResourceProxySource,
  path: readonly PropertySegment[],
): Expression<TValue> & TValue {
  // Seed nav from the resource's shape (if any). Walk the existing
  // path, transitioning nav at each step so every segment is stamped
  // correctly. Pre-existing callers pass paths they built manually, so
  // we treat unknown navigations as passthrough.
  const rootShape = getResourceShape(source.resource);
  let nav: NavShape = rootShape;
  const steps: PropertyStep[] = [];
  for (const segment of path) {
    const step = navigateShape(nav, segment, getValueAtPath(source.root, stepsToPath(steps)));
    steps.push({ segment, armPath: step.stamp?.armPath });
    nav = step.next;
  }

  return createPropertyProxy({
    ...source,
    steps,
    nav,
  }) as Expression<TValue> & TValue;
}

function getResourceShape(resource: Resource): FlatModelShape | undefined {
  // Look up by (armType, apiVersion), letting the registry resolve
  // any discriminated variant from the instance's own state (typically
  // the hardcoded `name` literal each variant class sets).
  const state = (resource as unknown as { [RAW_RESOURCE_HANDLE]: Record<string, unknown> })[
    RAW_RESOURCE_HANDLE
  ];
  return getShape(resource.type, resource.apiVersion, state);
}

// ---------------------------------------------------------------------------
// Resource-level proxy
// ---------------------------------------------------------------------------

export function createResourceProxy<
  TType extends string,
  TResource extends Resource<TType> & object,
>(resource: TResource): TResource {
  function getBackingResourceData(target: TResource): Record<string, unknown> {
    return Reflect.get(target, RAW_RESOURCE_HANDLE) as Record<string, unknown>;
  }

  const proxy = new Proxy(resource, {
    ownKeys(target) {
      return Array.from(
        new Set([
          ...Reflect.ownKeys(target),
          ...Reflect.ownKeys(getBackingResourceData(target)).filter(
            (key) => key !== RAW_RESOURCE_HANDLE,
          ),
        ]),
      );
    },

    getOwnPropertyDescriptor(target, property) {
      const targetDescriptor = Reflect.getOwnPropertyDescriptor(target, property);
      if (targetDescriptor !== undefined) {
        return targetDescriptor;
      }

      const backing = getBackingResourceData(target);
      if (Object.prototype.hasOwnProperty.call(backing, property)) {
        return { enumerable: true, configurable: true, writable: true };
      }

      return undefined;
    },

    get(target, property, receiver) {
      if (typeof property !== "string") {
        return Reflect.get(target, property, receiver);
      }

      if (property === "then") {
        return Reflect.get(target, property, receiver);
      }

      if (
        hasOwnOrPrototypeProperty(target, property) ||
        isNonEnumerableOwnProperty(target, property)
      ) {
        return Reflect.get(target, property, receiver);
      }

      const segment = toPropertySegment(property);
      const rootState = unwrapResourceHandle(proxy) as Record<string, unknown>;
      const rootShape = getResourceShape(target);
      const step = navigateShape(rootShape, segment, rootState);
      const armPath = step.stamp?.armPath;
      const nav = step.next;

      return createPropertyProxy({
        resource: proxy,
        root: rootState,
        steps: [{ segment, armPath }],
        nav,
      });
    },

    set(target, property, value, receiver) {
      if (typeof property !== "string") {
        return Reflect.set(target, property, value, receiver);
      }

      if (
        hasOwnOrPrototypeProperty(target, property) ||
        isNonEnumerableOwnProperty(target, property)
      ) {
        return Reflect.set(target, property, value, receiver);
      }

      setValueAtPath(
        unwrapResourceHandle(proxy) as Record<string, unknown>,
        [toPropertySegment(property)],
        normalizeAssignedValue(value, proxy),
      );
      return true;
    },
  });

  return proxy;
}

// ---------------------------------------------------------------------------
// Resource handle detection
// ---------------------------------------------------------------------------

function isResourceHandle(value: unknown): value is Resource {
  return (
    typeof value === "object" &&
    value !== null &&
    (value as Record<symbol, unknown>)[RESOURCE_BRAND] === true
  );
}

export function unwrapResourceHandle<T extends ResourceDeclaration>(resource: T): T {
  const maybeRaw = Reflect.get(resource as object, RAW_RESOURCE_HANDLE);

  if (maybeRaw === undefined) {
    return resource;
  }

  return maybeRaw as T;
}

// ---------------------------------------------------------------------------
// Indexed resource proxy — for `LoopedResource.at(i)` / `.current()`
// ---------------------------------------------------------------------------

/**
 * Returns a passthrough proxy over `resource` that carries an "index"
 * expression alongside the wrapped resource. Two purposes:
 *
 * 1. **Property reads** — ARM getters on the underlying `Resource` funnel
 *    through `this.expr(...)`. The indexed proxy intercepts `expr` and
 *    threads `resourceIndexExpression` into the member proxy so that reads
 *    render as `sym[index].<path>` on the wire. Direct data-property reads
 *    like `.type` / `.apiVersion` / `.condition` / `.existing` fall through
 *    unchanged (they are authoring/type metadata, not ARM reads).
 *
 * 2. **Child parent context** — passing `parents.at(0)` as the first
 *    argument to a child constructor must (a) let the child register into
 *    the raw parent's tree, and (b) record the index so the serializer can
 *    emit `parent: parentSym[i]`.
 *    This proxy passes framework members (`children`, `deploymentContext`,
 *    `_localDeploymentContext`, `hasDeploymentContext`, `.parent`, `.self`,
 *    ...) through unchanged so the base `Resource` constructor's
 *    interaction with `context` works exactly as it would with the raw
 *    parent. `PROXY_INDEX_REF` and `INDEXED_PROXY_TARGET` expose the
 *    index and the raw target to the base `Resource` constructor.
 *
 * The `index` can be a literal number, a literal string, or any expression
 * (typically a loop's `.index` symbolic value). It is unwrapped from any
 * `Expression<T>` proxy at construction time so downstream code stores a
 * primitive or an `ExpressionNode`, never an `Expression` proxy.
 *
 * **The indexed proxy is an ephemeral wrapper, not a tree node.** A fresh
 * proxy is minted per `.at(i)` call and is not stored in
 * any `parent.children` array; only the raw outer resource proxy
 * participates in the ProvisioningComponent tree. When a child is created with an
 * indexed proxy as context, the `ProvisioningComponent` constructor briefly
 * assigns the indexed proxy as the parent, but the base `Resource` constructor then overwrites
 * `this.parent` back to the raw parent (via `INDEXED_PROXY_TARGET`) so the
 * tree only ever references raw resource proxies. The indexed wrapper is
 * garbage-collectable once the child ctor returns; its sole job is to
 * carry the index through construction into `state.parentIndex`.
 */
/**
 * Static type an indexed proxy exposes, derived from the declaration it
 * wraps. A `LoopedResource<T>` narrows to `T` — the concrete resource
 * type — so `parent.at(i)` exposes the full ARM and child-accessor
 * surface, resolved element-scoped at runtime. Any scalar {@link Resource}
 * yields itself.
 */
export type IndexedProxyOf<D extends ResourceDeclaration> =
  D extends LoopedResource<infer T> ? T : D;

function throwLoopedElementWriteError(): never {
  throw new Error(
    "Cannot assign to a property of a looped resource declaration. Individual loop iterations cannot be mutated. Set the property in the declaration passed to `fromLoop(loop, ...)`",
  );
}

export function createIndexedResourceProxy<D extends ResourceDeclaration>(
  resource: D,
  index: ExpressionOrValue<number>,
): IndexedProxyOf<D> {
  const resourceIndexExpression: ArrayAccessIndex = isExpression(index)
    ? unwrapExpression(index as Expression<number>)
    : index;
  const root = unwrapResourceHandle(resource) as unknown as Record<string, unknown>;

  // A looped declaration (`LoopedResource`) exposes the concrete subclass
  // ctor it wraps via `wrappedCtor`; its prototype carries the subclass's
  // ARM accessors (`.sku`, `.properties.*`, `.id`, `.name`). The `get` trap
  // below walks this prototype to resolve those reads rooted at
  // `sym[index]`. A scalar `Resource` has no `wrappedCtor` — it already
  // carries those accessors on its own prototype, so `subclassProto` stays
  // `undefined` and lookups resolve via the target's own chain.
  const subclassProto = (resource as { readonly wrappedCtor?: { readonly prototype: object } })
    .wrappedCtor?.prototype;

  return new Proxy(resource as object, {
    // Deliberately NO `getPrototypeOf` trap. Exposing the subclass
    // prototype here would make `proxy instanceof Subclass` report `true`,
    // invoking subclass getters/methods against the bare `LoopedResource`
    // target (which lacks the subclass's own instance slots). Property
    // reads and writes don't need it: the `get`/`set` traps below have
    // their own `subclassProto` fallbacks that run accessors with
    // `this = receiver` (the proxy) so `this.expr(...)` and child accessors
    // resolve element-scoped.
    get(target, property, receiver) {
      // Reveal-only symbols consulted by the base `Resource` constructor
      // and by serialization; both are marker keys with no runtime prototype
      // representation on plain resources.
      if (property === PROXY_INDEX_REF) return resourceIndexExpression;
      if (property === INDEXED_PROXY_TARGET) return target;

      // Intercept the single funnel for ARM reads. `this.expr(...path)` is
      // the getter body used by every generated ARM property (`.name`,
      // `.id`, `.properties.*`, etc.). Route it through
      // `createResourceMemberProxy` with our `resourceIndexExpression` so
      // the whole emitted expression roots at `sym[index]` instead of `sym`.
      if (property === "expr") {
        return function boundIndexedExpr(...path: readonly PropertySegment[]): unknown {
          return createResourceMemberProxy(
            {
              resource: target as Resource,
              root,
              index: resourceIndexExpression,
            },
            path,
          );
        };
      }

      // Block ARM property writes on a looped element. Every generated ARM
      // setter (`set sku`, `set properties`, `set name`, …) funnels through
      // `this.setProperty(...)`, so intercepting that single method turns
      // `parent.at(i).sku = ...` into a clear error. Singleton child setters
      // construct children (`new Child(this, ...)` / `removeChild`) rather
      // than calling `setProperty`, so they keep working — creating a child
      // parented to element `i` is valid.
      if (property === "setProperty") {
        return throwLoopedElementWriteError;
      }

      // First try the target's own chain. Two subtleties:
      //
      // 1. Getters (`.type`, `.apiVersion`, `.children`, `.parent`, …) must
      //    run with `this = target` so they see the raw resource's own
      //    properties — including class private fields (`#…`). Passing the
      //    proxy as `receiver` would cause private-field access inside a
      //    getter to fail because the proxy has no such slot.
      // 2. Methods (e.g. a subclass's `registerBlobService(...)`) need
      //    `this = target` for the same reason — private fields again — so
      //    we return a bound wrapper. This means `ctx.method === ctx.method`
      //    yields `false` between reads; acceptable trade-off given no
      //    caller relies on function identity on an indexed proxy.
      if (property in target) {
        const value = Reflect.get(target, property, target);
        return typeof value === "function" ? value.bind(target) : value;
      }

      // Fall through to `subclassProto` for subclass-specific getters
      // (e.g. `.id`, `.name`, `.sku`) when wrapping a `LoopedResource`.
      // Getters must run with `this = receiver` (the proxy) so their
      // `this.expr(...)` calls hit our intercept above, yielding an
      // expression rooted at `sym[index]`. Methods bind to `target` to
      // stay consistent with the passthrough branch above.
      if (subclassProto !== undefined) {
        let proto: object | null = subclassProto;
        while (proto !== null && proto !== Object.prototype) {
          const descriptor = Object.getOwnPropertyDescriptor(proto, property);
          if (descriptor !== undefined) {
            if (descriptor.get !== undefined) {
              return descriptor.get.call(receiver);
            }
            const value = descriptor.value;
            return typeof value === "function" ? value.bind(target) : value;
          }
          proto = Object.getPrototypeOf(proto);
        }
      }

      return undefined;
    },

    // Route writes to a subclass setter (e.g. a singleton `set blobService`,
    // or an ARM property setter) with `this = receiver` (the proxy) so the
    // setter body runs element-scoped — a singleton setter's
    // `new Child(this, value)` stamps the proxy's index, and its
    // `new ChildResourceCollection(this, Child)` detaches only the existing
    // child at this index. Falls back to a plain write on the raw target.
    set(target, property, value, receiver) {
      if (subclassProto !== undefined) {
        let proto: object | null = subclassProto;
        while (proto !== null && proto !== Object.prototype) {
          const descriptor = Object.getOwnPropertyDescriptor(proto, property);
          if (descriptor !== undefined) {
            if (descriptor.set !== undefined) {
              descriptor.set.call(receiver, value);
              return true;
            }
            break;
          }
          proto = Object.getPrototypeOf(proto);
        }
      }
      return Reflect.set(target, property, value, target);
    },
  }) as IndexedProxyOf<D>;
}
