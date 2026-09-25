// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Global registry mapping a resource class's registry key to its
 * constructor.
 *
 * Populated at module load by each class's `static {}` initializer
 * (via {@link Resource.register}). The deserializer reads this
 * registry to construct the correct class instance — preserving
 * identity, prototype methods, and constructor-initialized child
 * collections — instead of materialising a base `Resource`.
 *
 * Each `type@apiVersion` entry is either one flat constructor or a flat list
 * of concrete constructors paired with ordered variant selectors. A selector
 * can contain singleton `name`, model discriminators such as `kind`, and
 * nested discriminator segments.
 *
 * Resolution has two modes:
 *
 * - **Best-effort (default).** Exact `(type, apiVersion)` first, then
 *   falls back to the highest registered `apiVersion` for the same
 *   selector. Enables
 *   deserializing older JSON against a newer package version without
 *   losing typed handles.
 * - **Strict** (opt-in via `{ strict: true }`). Exact match only;
 *   returns `undefined` for any apiVersion the package doesn't ship.
 *
 * The shared registry tracks the highest `apiVersion` per `(type, selector)`.
 * Best-effort lookups consult it in O(1); no scanning is needed.
 *
 * Keyed on a process-global symbol so multiple copies of `@azure/provisioning-core`
 * in the same realm share one registry, mirroring the cross-realm
 * strategy used by {@link isResource}'s brand symbol.
 */

import type { Resource } from "./resource.js";
import { ResourceTypeRegistry, type FlatVariantSelector } from "./resource-type-registry.js";

/**
 * A `Resource` class that's eligible to live in the registry.
 *
 * - The construct signature uses `any` for both `context` and `props`
 *   because concrete classes narrow these (child resources require a
 *   specific parent class as context; each resource has its own `Props`
 *   shape). TypeScript's parameter contravariance would reject any
 *   concrete parameter types here. The deserializer is the sole caller
 *   of resolved constructors and forwards already-correct values it
 *   built from the wire document.
 * - The two static fields `resourceType` and `apiVersion` form the
 *   registry key and are always present on emitter-generated classes
 *   (and on the hand-maintained `ResourceGroup`).
 * - The generic `T` propagates the instance type — used by the query
 *   API (`stack.getResources(KeyVault)` → `KeyVault[]`) to narrow
 *   return types without needing a separate descriptor object.
 */
export type ResourceCtor<T extends Resource = Resource> = {
  new (context: any, props: any, options?: any): T;
  readonly resourceType: string;
  readonly apiVersion: string;
};

/**
 * Options controlling how {@link resolveResource} handles
 * apiVersion mismatches.
 */
export interface ResolveOptions {
  /**
   * When `true`, only an exact `(resourceType, apiVersion)` match is
   * returned; the best-effort fallback to the highest registered
   * version for the type is skipped. Defaults to `false`.
   */
  readonly strict?: boolean;
}

const REGISTRY_SYMBOL = Symbol.for("@azure/provisioning-core.resourceRegistry");

interface RegistryHost {
  [REGISTRY_SYMBOL]?: ResourceTypeRegistry<ResourceCtor>;
}

function getRegistry(): ResourceTypeRegistry<ResourceCtor> {
  const host = globalThis as unknown as RegistryHost;
  let registry = host[REGISTRY_SYMBOL];
  if (registry === undefined) {
    registry = new ResourceTypeRegistry<ResourceCtor>();
    host[REGISTRY_SYMBOL] = registry;
  }
  return registry;
}

/**
 * Register `ctor` as the canonical class for its
 * `(resourceType, apiVersion[, variantSelector])` key.
 *
 * Pass an ordered selector for variants; omit it for ordinary resources.
 * Re-registering the same constructor for the
 * same key is a silent no-op so module-graph re-entry (test
 * harnesses, dual-format builds) is safe. Registering a *different*
 * constructor for an existing key throws — that's a genuine conflict
 * (e.g. two packages claiming the same ARM type).
 *
 * A `(resourceType, apiVersion)` pair is either entirely flat or entirely
 * variant-based. Attempting to mix both modes throws,
 * preserving the invariant the deserializer relies on.
 */
export function registerResource(ctor: ResourceCtor, variantSelector?: FlatVariantSelector): void {
  getRegistry().register(ctor.resourceType, ctor.apiVersion, ctor, variantSelector);
}

/**
 * Resolve the registered class for a wire resource.
 *
 * Default is best-effort:
 *  1. Try the exact `(type, apiVersion)` entry and match its selectors
 *     against ARM-side keys in `state`.
 *  2. On miss, retry with the highest registered version of each selector.
 *
 * Pass `{ strict: true }` to skip step 2 and require an exact match.
 *
 * Returns `undefined` when nothing matches — callers (notably the
 * deserializer) then fall back to constructing a base `Resource`.
 */
export function resolveResource(
  type: string,
  apiVersion: string,
  state?: Record<string, unknown>,
  options?: ResolveOptions,
): ResourceCtor | undefined {
  return getRegistry().resolve(type, apiVersion, state ?? {}, {
    strict: options?.strict ?? false,
    valueKeyedBy: "arm",
  });
}
