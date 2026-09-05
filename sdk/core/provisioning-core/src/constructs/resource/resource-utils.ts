// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  RESOURCE_BRAND,
  RESOURCE_DECLARATION_BRAND,
  LOOPED_RESOURCE_BRAND,
} from "./resource-proxy.js";
import type { Resource, ResourceDeclaration, LoopedResource } from "./resource.js";
import type { ResourceCtor } from "./resource-registry.js";

/**
 * Cross-realm-safe brand guards for resource declarations.
 *
 * These live in a standalone module — importing only the brand **symbols**
 * (from `resource-proxy.ts`) and `resource.ts` **types** — so tree-walking
 * utilities (e.g. the query layer, `ProvisioningComponent`) can identify resources
 * WITHOUT a runtime import of `resource.ts`, which `extends ProvisioningComponent` and
 * would otherwise create an eval-time import cycle
 * (`ProvisioningComponent` → `query` → `resource` → `ProvisioningComponent`).
 *
 * The public guard API is these standalone functions (`isResource`,
 * `isResourceDeclaration`, `isLoopedResource`, `isResourceOf`,
 * `isLoopedResourceOf`) — there are no class-static guards, so a subclass
 * like `Secret` never inherits a misleading `Secret.isResource(...)`.
 */

/** Is `x` a scalar {@link Resource} (not a looped declaration)? */
export function isResource(x: unknown): x is Resource {
  return (
    typeof x === "object" && x !== null && (x as Record<symbol, unknown>)[RESOURCE_BRAND] === true
  );
}

/**
 * Is `x` a Bicep resource declaration — either a scalar {@link Resource} or
 * a {@link LoopedResource}?
 */
export function isResourceDeclaration(x: unknown): x is ResourceDeclaration {
  return (
    typeof x === "object" &&
    x !== null &&
    (x as Record<symbol, unknown>)[RESOURCE_DECLARATION_BRAND] === true
  );
}

/** Is `x` a {@link LoopedResource} (`Ctor.fromLoop(...)`)? */
export function isLoopedResource(x: unknown): x is LoopedResource<Resource> {
  return (
    typeof x === "object" &&
    x !== null &&
    (x as Record<symbol, unknown>)[LOOPED_RESOURCE_BRAND] === true
  );
}

/**
 * Type guard: is `x` an instance of the resource class `ctor`?
 * Narrows `x` to the class's instance type, so callers can access
 * subclass-specific accessors (e.g. `kv.secrets`) inside the guarded
 * block.
 *
 * Accepts any value (`unknown`), like the other brand guards. A
 * `LoopedResource<T>` is not a `Resource`, so `instanceof ctor` returns
 * `false` for it — the narrowing is safe. `instanceof` alone is sufficient
 * (and stricter than a brand + ARM-type-string check: a base-`Resource`
 * impostor carrying the same `type`/`apiVersion` is correctly rejected), so
 * no `isResource` pre-check is needed.
 *
 * Matches scalar resource **declarations** (from a constructor / query /
 * collection). It does NOT match a `parent.at(i)` element reference of a
 * looped declaration: that proxy intentionally keeps `LoopedResource`'s
 * prototype (no `getPrototypeOf` trap), so `instanceof` is `false` for it
 * even though its ARM reads work. If we ever need cross-realm subclass
 * matching (per-subclass `Symbol.for` brands, mirroring the base
 * `RESOURCE_BRAND`), this is the one place to swap.
 */
export function isResourceOf<T extends Resource>(x: unknown, ctor: ResourceCtor<T>): x is T {
  return x instanceof ctor;
}

/**
 * Type guard: is `x` a {@link LoopedResource} whose wrapped resource class is
 * `ctor` (i.e. a `LoopedResource<T>` produced by `T.fromLoop(...)`)? Narrows
 * `x` to `LoopedResource<T>`, the looped analogue of {@link isResourceOf}.
 *
 * Matches on the declaration's `wrappedCtor` identity — the concrete subclass
 * passed to `fromLoop` — so `isLoopedResourceOf(x, StorageAccount)`
 * replaces the `x.wrappedCtor === StorageAccount` checks scattered across the
 * query / collection layers.
 */
export function isLoopedResourceOf<T extends Resource>(
  x: unknown,
  ctor: ResourceCtor<T>,
): x is LoopedResource<T> {
  return isLoopedResource(x) && (x.wrappedCtor as unknown) === ctor;
}
