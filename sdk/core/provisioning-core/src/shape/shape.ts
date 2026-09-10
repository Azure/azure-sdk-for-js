// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Runtime types for ARM shape information.
 *
 * A `ModelShape` is generated once per emitted Model and describes how
 * to map JS-ergonomic property names + structure to the underlying ARM
 * wire shape. The shapes are consumed by the serialization `lowerState`
 * pass (and its inverse `raiseState`) which rewrites state keys and
 * re-nests `@flattenProperty` paths just before serialization /
 * after deserialization.
 *
 * These types are public runtime contract; generated code imports them
 * by reference via the type registry.
 *
 * Nested-shape thunks ({@link DeferredShape}) defer dereferencing the
 * inner shape constant until use, so mutually-referential or
 * self-referential models can be emitted without initialization-order
 * problems.
 *
 * A model shape comes in two flavors:
 *   - `FlatModelShape` ({@link FlatModelShape}): the common case —
 *     one shape per concrete model.
 *   - `DiscriminatedModelShape` ({@link DiscriminatedModelShape}): a
 *     name-discriminated variant group. ARM permits multiple resources
 *     to share an ARM `type` + `apiVersion` pair and disambiguate via a
 *     fixed field — e.g. `Microsoft.ApiManagement/service/portalsettings@2024-05-01`
 *     has three variants with `name: 'signin' | 'signup' | 'delegation'`
 *     and distinct `properties` shapes. The same machinery applies to
 *     nested models that use a `@discriminator` field.
 */

/** The standard single-model shape. */
export interface FlatModelShape {
  /**
   * Tag for tag-dispatched discrimination on {@link NavShape} and
   * {@link ModelShape}. Always `"flatModel"`.
   */
  readonly kind: "flatModel";
  /**
   * Map, keyed by JS-side (client-facing) property name, of how that
   * property maps to the ARM wire shape. Property names not present in
   * this map are assumed to be pass-through (identity mapping).
   */
  readonly byJsName: { readonly [jsName: string]: PropertyShape };
}

/**
 * The two names a discriminator field goes by.
 *
 * Usually identical — ARM discriminators are `type`, `name`, `kind` and
 * service teams rarely rename them — but a `@clientName` on the field
 * makes them differ, and the two are looked up in different keyspaces:
 * JS-side state is keyed by {@link jsName}, wire JSON by
 * {@link armName}. Carrying both is what lets a discriminated shape
 * resolve in either direction.
 */
export interface DiscriminatorNames {
  /** Client-facing name, as authored in TypeScript and held in state. */
  readonly jsName: string;
  /** Wire-level name, as it appears in an ARM template or response. */
  readonly armName: string;
}

/**
 * A name-discriminated group of variants that share one parent key
 * (an ARM `(type, apiVersion)` at the registry level, or a parent
 * model's `@discriminator` field elsewhere). The `discriminator` names
 * the field whose value selects a variant.
 */
export interface DiscriminatedModelShape {
  readonly kind: "discriminatedModel";
  /** Names of the field used to select a variant. */
  readonly discriminator: DiscriminatorNames;
  /**
   * Map from discriminator value (e.g. `"signin"`) to the shape for
   * that variant. A value with no entry here doesn't end resolution —
   * {@link resolveModelShape} infers the variant from the payload's
   * structure instead.
   *
   * Entries may be:
   *  - a {@link FlatModelShape} — the terminal, common case;
   *  - a {@link DeferredShape} — breaks emit-order / cyclic-reference
   *    hazards, exactly as {@link PropertyShape.target} does;
   *  - a nested {@link DiscriminatedModelShape} — a variant that is
   *    itself a discriminated base on a *different* field. TypeSpec
   *    permits this (`@discriminator("kind") model Pet`, then
   *    `@discriminator("breed") model Cat extends Pet`), so selecting
   *    a concrete shape may take more than one hop. See
   *    {@link resolveModelShape}.
   *
   * Note that a hierarchy re-using the *same* discriminator field at
   * every level (abstract intermediates) is flattened by the emitter
   * into a single level here — only a change of discriminator field
   * produces a nested entry.
   */
  readonly byValue: {
    readonly [value: string]: ModelShape | DeferredShape<ModelShape>;
  };
}

/** A single model's shape — either flat or discriminated. */
export type ModelShape = FlatModelShape | DiscriminatedModelShape;

/**
 * What `registerShape` stores in the global registry, keyed by
 * `(armType, apiVersion)`. Same structural type as {@link ModelShape};
 * the alias documents intent at the registry boundary.
 */
export type ResourceShape = ModelShape;

/** A single property's shape entry. */
export interface PropertyShape {
  /**
   * ARM wire path from the owning model's root to this property.
   * Single-segment for direct properties; multi-segment for properties
   * hoisted through one or more `@flattenProperty` wrappers.
   */
  readonly armPath: readonly string[];

  /**
   * Where this property's value points to when the value needs its own
   * recursion (a nested model, an array, or a record). Undefined for
   * leaf values (scalars, enums, literals, plain arrays/records of
   * scalars).
   */
  readonly target?: NestedShape;

  /**
   * `@encode` metadata. Wire-only — the user-facing TS type stays as
   * the source scalar; serialization (`lowerState`) reads this to
   * convert the source-typed value into its encoded wire form, and
   * deserialization (`raiseState`) reads it to convert back.
   *
   * Undefined when the source property has no `@encode` decorator.
   */
  readonly encoding?: PropertyEncoding;

  /**
   * `true` when ARM treats this property as server-set (visible in GET
   * responses but rejected on PUT). Omitted (i.e. `undefined`/`false`)
   * for writable properties.
   *
   * Currently consumed by the `Resource` constructor's deployment-context
   * inheritance to skip readonly properties (notably `location` on many
   * child resources where the field exists in the read model only).
   */
  readonly readOnly?: boolean;
}

/**
 * Wire-encoding metadata mirroring TypeSpec's `@encode` decorator.
 *
 * The user-facing TS type for an encoded property stays as the source
 * scalar (e.g. a `Date` for `utcDateTime`, an ISO8601 string or number
 * for `duration`, a `Uint8Array` for `bytes`). The serializer reads
 * this metadata to encode the value to its wire form, and the
 * deserializer to decode it back.
 */
export interface PropertyEncoding {
  /**
   * The encoding name from `@encode`, e.g. `"rfc3339"`, `"rfc7231"`,
   * `"unixTimestamp"`, `"ISO8601"`, `"seconds"`, `"milliseconds"`,
   * `"base64"`, `"base64url"`. Undefined when `@encode` was used with
   * only an explicit target type (rare).
   */
  readonly encoding?: string;

  /** Wire-side scalar kind that the encoded value serializes as. */
  readonly wireKind: "string" | "int" | "number" | "boolean";

  /**
   * Source TypeSpec scalar name walked up to the closest known std
   * scalar (e.g. `"duration"`, `"utcDateTime"`, `"offsetDateTime"`,
   * `"bytes"`). Falls back to the leaf scalar name when no known std
   * ancestor is found.
   */
  readonly sourceKind: string;
}

/**
 * Deferred reference to a shape value. The thunk is called on
 * dereference so the actual shape lookup is deferred.
 *
 * **Why this exists instead of embedding the shape directly.**
 *
 * Model shapes frequently reference each other — a model's properties
 * can point to other models, and ARM types include both self-
 * referential (tree-like) and mutually-referential (cyclic) structures.
 * If we embedded a {@link ModelShape} value directly inside another
 * model shape's `target` field, both shapes would need to be fully
 * initialized when the parent is constructed. That's impossible
 * whenever:
 *
 *   - A model references itself, e.g. `TreeNode { children: TreeNode[] }`.
 *   - Two models reference each other, e.g. `A { b?: B }` and `B { a?: A }`.
 *   - Two modules each define shapes that reference shapes from the other.
 *
 * In all three cases the second constant is in the Temporal Dead Zone
 * when the first one's literal evaluates, and the runtime throws
 * `ReferenceError: Cannot access ... before initialization`.
 *
 * Wrapping the reference in a thunk solves it. The closure captures
 * the *binding name*, not its current value. The lookup happens later
 * when the thunk is called — by which time the module graph has
 * finished evaluating and both shapes are fully constructed.
 *
 * Only the model variant of {@link NestedShape} carries a reference —
 * container shapes (`array`, `record`) are eager because they don't
 * reference any module-level binding directly; the inner reference
 * deeper down handles cycle-breaking.
 */
export interface DeferredShape<T> {
  readonly kind: "deferred";
  readonly value: () => T;
}

/** An array-of-T property/container shape. */
export interface ArrayShape {
  readonly kind: "array";
  readonly element: NestedShape;
}

/** A `Record<string, T>` property/container shape. */
export interface RecordShape {
  readonly kind: "record";
  readonly value: NestedShape;
}

/**
 * What a property's value (or a container's element/value) points to
 * for the purpose of recursive lowering / raising. Either a deferred
 * reference to a model shape, or an eager container shape whose
 * element/value itself is a {@link NestedShape}.
 *
 * Absent entirely on {@link PropertyShape.target} when the value is a
 * leaf (scalar / enum / literal).
 */
export type NestedShape = DeferredShape<ModelShape> | ArrayShape | RecordShape;

// ---------------------------------------------------------------------------
// Constructor helpers
// ---------------------------------------------------------------------------

/** Build a {@link FlatModelShape} from a property map. */
export const createFlatModelShape = (byJsName: Record<string, PropertyShape>): FlatModelShape => ({
  kind: "flatModel",
  byJsName,
});

/**
 * Build a {@link DiscriminatedModelShape}.
 *
 * Pass a bare string when the field goes by the same name on both
 * sides, which is the overwhelmingly common case; pass a
 * {@link DiscriminatorNames} pair when a `@clientName` makes them
 * differ.
 */
export const createDiscriminatedModelShape = (
  discriminator: string | DiscriminatorNames,
  byValue: Record<string, ModelShape | DeferredShape<ModelShape>>,
): DiscriminatedModelShape => ({
  kind: "discriminatedModel",
  discriminator:
    typeof discriminator === "string"
      ? { jsName: discriminator, armName: discriminator }
      : discriminator,
  byValue,
});

/**
 * Build a {@link DeferredShape}. The thunk is called on dereference; defer
 * the actual shape lookup so that mutually-referential constants can
 * be emitted in any order.
 */
export const createDeferredShape = <T>(value: () => T): DeferredShape<T> => ({
  kind: "deferred",
  value,
});

/** Build an {@link ArrayShape}. */
export const createArrayShape = (element: NestedShape): ArrayShape => ({
  kind: "array",
  element,
});

/** Build a {@link RecordShape}. */
export const createRecordShape = (value: NestedShape): RecordShape => ({
  kind: "record",
  value,
});

// ---------------------------------------------------------------------------
// Helpers used by the runtime proxy + lowering pass
// ---------------------------------------------------------------------------

/**
 * Runtime navigation position for a typed proxy. Either:
 *   - a {@link ModelShape} — we're at a model's properties, whether or
 *     not its variant is known,
 *   - an {@link ArrayShape} or {@link RecordShape} — we're at a
 *     container that hasn't yet been indexed,
 *   - `undefined` — the current position is untyped (leaf, unknown, or
 *     the proxy was created without a shape).
 *
 * Proxies carry a `NavShape` through each access so they can stamp and
 * resolve the correct shape on deeper navigation.
 *
 * Navigation never sits at a {@link DeferredShape} — refs are resolved
 * eagerly as soon as the proxy encounters them.
 */
export type NavShape = ModelShape | ArrayShape | RecordShape | undefined;

/**
 * Resolve a {@link ModelShape} to the single concrete variant that
 * applies to `value`.
 *
 * Resolution is iterative, not a single step, because a variant may
 * itself be a discriminated group keyed on a *different* field (see
 * {@link DiscriminatedModelShape.byValue}). Each hop reads its own
 * discriminator out of the same `value`, so
 * `{ kind: "cat", breed: "siamese" }` resolves through `Pet` → `Cat`
 * → `Siamese`. {@link DeferredShape} entries are dereferenced in
 * place, and flat model shapes are returned as-is.
 *
 * When a hop's discriminator can't be read — it is absent, is not a
 * string (the *expression-valued* case), or names an unknown variant —
 * the variant is instead **inferred from the value's structure** by
 * {@link selectVariant}. That inference is sound rather than a guess:
 * ARM would reject a payload that doesn't match the variant its
 * discriminator selects, so a concrete payload determines the variant
 * even when the discriminator itself is only known at deploy time.
 *
 * Bicep takes the same position — a discriminator it can't evaluate at
 * compile time downgrades type checking for that object (diagnostic
 * `BCP225`) rather than failing the build.
 *
 * Returns `undefined` when `shape` is `undefined`, when there is no
 * `value` to infer from, or when the `byValue` graph is cyclic
 * (defensive; the emitter does not produce cycles here).
 *
 * @param shape - The shape to resolve. Flat shapes are returned
 *   unchanged, so callers can pass either kind without checking.
 * @param value - The object this shape describes, used both to read
 *   discriminators and to infer a variant when they can't be read.
 *   Omit it when no value exists (an `Expression<T>` proxy, say) and
 *   discriminated shapes will resolve to `undefined`.
 * @param valueKeyedBy - Which naming **`value`'s own keys** use — not
 *   the shape's. A {@link FlatModelShape} is the mapping *between* the
 *   two sides (one property is `secretVersion` in TypeScript and
 *   `version` on the wire), so inference has to read both sides in the
 *   same naming or nothing matches:
 *
 *   - `"js"` — client-facing names, as authored in TypeScript and held
 *     in a resource's state. These are
 *     {@link FlatModelShape.byJsName}'s own keys. Passed by
 *     `lowerState`, on state about to be serialized.
 *   - `"arm"` — wire names, as they appear in an ARM template or a
 *     service response. These are the first segment of each
 *     {@link PropertyShape.armPath}. Passed by `raiseState`, on JSON
 *     just parsed off the wire.
 *
 *   Has no effect when the discriminator resolves normally, and no
 *   effect at all for models whose properties map 1:1.
 */
export function resolveModelShape(
  shape: ModelShape | undefined,
  value: Record<string, unknown> | undefined,
  valueKeyedBy: "js" | "arm" = "js",
): FlatModelShape | undefined {
  let current: ModelShape | DeferredShape<ModelShape> | undefined = shape;
  const seen = new Set<ModelShape | DeferredShape<ModelShape>>();

  while (current !== undefined) {
    if (seen.has(current)) return undefined;
    seen.add(current);

    if (current.kind === "deferred") {
      current = current.value();
      continue;
    }
    if (current.kind === "flatModel") return current;

    const group: DiscriminatedModelShape = current;
    // Read the discriminator under the same naming as `value`'s own
    // keys: JS-side state holds it under the client name, wire JSON
    // under the ARM name. The two coincide for almost every ARM
    // discriminator, but a `@clientName` on the field makes them
    // differ, and reading the wrong one silently downgrades exact
    // dispatch to structural inference below.
    const names = group.discriminator;
    const key = value?.[valueKeyedBy === "js" ? names.jsName : names.armName];
    const next = typeof key === "string" ? group.byValue[key] : undefined;
    if (next === undefined) {
      return value ? selectVariant(group, value, valueKeyedBy) : undefined;
    }
    current = next;
  }

  return undefined;
}

/**
 * Infer which variant of `group` a value belongs to by structure.
 *
 * Every variant is scored by how many of the value's keys it declares,
 * descending into nested objects and containers so that variants which
 * are indistinguishable at the top level can still be told apart. CDN's
 * delivery-rule actions are exactly that case: all nine variants
 * declare `{ name, parameters }` and differ only inside `parameters`.
 *
 * The highest score wins; ties keep the earliest variant in `byValue`
 * order, which is stable emitter output. A tie means the tied variants
 * declare the same keys for the data given, and the emitter guarantees
 * that keys shared across variants map identically — so either choice
 * produces the same wire mapping for everything actually present.
 */
function selectVariant(
  group: DiscriminatedModelShape,
  value: Record<string, unknown>,
  valueKeyedBy: "js" | "arm",
): FlatModelShape | undefined {
  let best: FlatModelShape | undefined;
  let bestScore = -1;

  for (const variant of flattenVariants(group, new Set())) {
    const score = scoreShape(variant, value, valueKeyedBy, new WeakSet());
    if (score > bestScore) {
      bestScore = score;
      best = variant;
    }
  }

  return best;
}

/** How many of `value`'s keys, recursively, `shape` accounts for. */
function scoreShape(
  shape: FlatModelShape,
  value: Record<string, unknown>,
  valueKeyedBy: "js" | "arm",
  visiting: WeakSet<object>,
): number {
  if (visiting.has(value)) return 0;
  visiting.add(value);

  const byKey = getShapePropertiesMap(shape, valueKeyedBy);
  let score = 0;

  for (const [key, sub] of Object.entries(value)) {
    const prop = byKey.get(key);
    if (!prop) continue;
    score += 1;
    score += scoreNested(sub, prop.target, valueKeyedBy, visiting);
  }

  visiting.delete(value);
  return score;
}

/**
 * Score one level deeper, through a property's target. Containers are
 * sampled at their first entry — enough to discriminate, and bounded
 * regardless of how large the value is.
 */
function scoreNested(
  value: unknown,
  target: NestedShape | undefined,
  valueKeyedBy: "js" | "arm",
  visiting: WeakSet<object>,
): number {
  if (!target || value === null || typeof value !== "object") return 0;

  if (target.kind === "array") {
    if (!Array.isArray(value) || value.length === 0) return 0;
    return scoreNested(value[0], target.element, valueKeyedBy, visiting);
  }

  if (target.kind === "record") {
    if (Array.isArray(value)) return 0;
    const first = Object.values(value)[0];
    if (first === undefined) return 0;
    return scoreNested(first, target.value, valueKeyedBy, visiting);
  }

  if (Array.isArray(value)) return 0;
  const nested = resolveModelShape(target.value(), value as Record<string, unknown>, valueKeyedBy);
  if (!nested) return 0;
  return scoreShape(nested, value as Record<string, unknown>, valueKeyedBy, visiting);
}

const shapePropertiesCache = new WeakMap<
  FlatModelShape,
  Map<"js" | "arm", Map<string, PropertyShape>>
>();

/**
 * A shape's properties as a map, keyed by the name they go by in the
 * requested naming. Pass the same naming the value uses and the two
 * line up, which is what lets {@link scoreShape} compare them.
 *
 * Memoized per (shape, naming): scoring calls this once per candidate
 * variant per level, so rebuilding would be wasteful.
 *
 * @param shape - The shape whose properties to map.
 * @param keyedBy - Which name to key by. Note this describes the *map
 *   being built*, not an incoming value — unlike the `valueKeyedBy`
 *   parameter the callers thread through.
 */
function getShapePropertiesMap(
  shape: FlatModelShape,
  keyedBy: "js" | "arm",
): Map<string, PropertyShape> {
  let byNaming = shapePropertiesCache.get(shape);
  if (!byNaming) {
    byNaming = new Map();
    shapePropertiesCache.set(shape, byNaming);
  }
  let byKey = byNaming.get(keyedBy);
  if (byKey) return byKey;

  byKey = new Map<string, PropertyShape>();
  for (const [jsName, prop] of Object.entries(shape.byJsName)) {
    // `armPath[0]` rather than the whole path: that is the top-level
    // wire key, even for properties hoisted through `@flattenProperty`.
    const key = keyedBy === "js" ? jsName : prop.armPath[0];
    // First writer wins, so a hoisted property never shadows the
    // wrapper it was hoisted through.
    if (key !== undefined && !byKey.has(key)) byKey.set(key, prop);
  }
  byNaming.set(keyedBy, byKey);
  return byKey;
}

/**
 * Flatten a group to the concrete flat shapes underneath it,
 * dereferencing thunks and descending through nested groups.
 */
function flattenVariants(
  group: DiscriminatedModelShape,
  seen: Set<DiscriminatedModelShape>,
): FlatModelShape[] {
  if (seen.has(group)) return [];
  seen.add(group);

  const out: FlatModelShape[] = [];
  for (const key of Object.keys(group.byValue)) {
    let entry: ModelShape | DeferredShape<ModelShape> | undefined = group.byValue[key];
    if (entry?.kind === "deferred") entry = entry.value();
    if (entry === undefined) continue;
    if (entry.kind === "flatModel") out.push(entry);
    else out.push(...flattenVariants(entry, seen));
  }
  return out;
}

/**
 * Navigate `nav` one step deeper using `segment`. For string segments
 * (`.foo`) at a model position, returns the property's shape entry as
 * `stamp` and advances `next` into the property's target. For numeric
 * segments (`[i]`) or string keys at a record position, peels one
 * container layer; `stamp` is always `undefined`.
 *
 * Returns `{ stamp: undefined, next: undefined }` when the step can't
 * be resolved (unknown property, out-of-shape access, etc.) — the
 * access is treated as passthrough.
 *
 * @param nav - Where navigation currently sits.
 * @param segment - The member name or array index being accessed.
 * @param value - The value sitting at `nav`, when the caller has one.
 *   Consulted only at a {@link DiscriminatedModelShape} position, to
 *   select the variant via {@link resolveModelShape}. Always read with
 *   `"js"` naming, since navigation follows client-facing property
 *   names. Callers with no value — an `Expression<T>` proxy, for
 *   instance — omit it and get passthrough for discriminated
 *   positions, which is the honest answer when the variant is
 *   unknowable.
 */
export function navigateShape(
  nav: NavShape,
  segment: string | number,
  value?: unknown,
): { readonly stamp: PropertyShape | undefined; readonly next: NavShape } {
  if (typeof segment === "number") {
    return { stamp: undefined, next: peelContainer(nav) };
  }
  if (isModelShape(nav)) {
    const flat = resolveModelShape(nav, asRecord(value));
    const stamp = flat?.byJsName[segment];
    if (!stamp) return { stamp: undefined, next: undefined };
    return { stamp, next: derefTarget(stamp.target) };
  }
  // String segment against a container — treat as a record key access.
  if (nav && nav.kind === "record") {
    return { stamp: undefined, next: derefTarget(nav.value) };
  }
  return { stamp: undefined, next: undefined };
}

function asRecord(value: unknown): Record<string, unknown> | undefined {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined;
}

function isModelShape(nav: NavShape): nav is ModelShape {
  return nav !== undefined && (nav.kind === "flatModel" || nav.kind === "discriminatedModel");
}

/**
 * Peel one container layer off `nav`. Returns `undefined` for
 * non-containers (caller treats the step as passthrough).
 */
function peelContainer(nav: NavShape): NavShape {
  if (!nav || isModelShape(nav)) return undefined;
  if (nav.kind === "array") return derefTarget(nav.element);
  return derefTarget(nav.value);
}

/**
 * Convert a {@link NestedShape} — where a property *points* — into a
 * {@link NavShape} — where navigation now *is*.
 *
 * The only real work is forcing a {@link DeferredShape} thunk; the
 * resolved model becomes the new position whether or not it is
 * discriminated, since {@link navigateShape} can look up properties on
 * either. Container shapes pass through unchanged, pending an index
 * step.
 *
 * Deliberately *not* named `resolve*` — that prefix belongs to
 * {@link resolveModelShape}, which picks a variant and is a much
 * heavier operation.
 */
function derefTarget(t: NestedShape | undefined): NavShape {
  if (!t) return undefined;
  if (t.kind === "deferred") return t.value();
  return t;
}
