// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isResourceDeclaration, isLoopedResource, isLoopedResourceOf } from "./resource-utils.js";
import { deref } from "./resource-proxy.js";
import type { ProvisioningComponent } from "../provisioning-component.js";
import type { LoopedResource, Resource } from "./resource.js";
import type { ResourceCtor } from "./resource-registry.js";

// ---------------------------------------------------------------------------
// Query result types
// ---------------------------------------------------------------------------

/** Options accepted by the `Stack` resource queries. */
export interface QueryOptions {
  /**
   * Whether to walk the stack's entire subtree (default `true`) or only its
   * **direct children** (`false`).
   */
  readonly recursive?: boolean;
}

// ---------------------------------------------------------------------------
// Query engine (module-private)
// ---------------------------------------------------------------------------
// Imports only brand guards (`resource-utils`) — which do not import
// `ProvisioningComponent`/`Stack` at runtime — plus types (type-only), so there is no
// import cycle.

/**
 * Collect the resource declarations beneath `root` (the root itself is never
 * included). `recursive` descends the whole subtree via `visit`; otherwise
 * only `root`'s direct children are considered. `wantLooped` selects the
 * looped declarations (`Ctor.fromLoop(...)`) vs. the scalar ones.
 */
function collectResourcesUnder(
  root: ProvisioningComponent,
  wantLooped: boolean,
  recursive: boolean,
): (Resource | LoopedResource<Resource>)[] {
  const result: (Resource | LoopedResource<Resource>)[] = [];
  const consider = (node: ProvisioningComponent) => {
    if (!isResourceDeclaration(node)) return;
    const r = node.self as Resource | LoopedResource<Resource>;
    if (isLoopedResource(r) === wantLooped) result.push(r);
  };
  for (const child of root.children) {
    if (recursive) child.visit(consider);
    else consider(child);
  }
  return result;
}

// ---------------------------------------------------------------------------
// Engine entry points — thin, loosely-typed; `Stack` supplies the public
// typed overloads and delegates here.
// ---------------------------------------------------------------------------

/** Scalar (un-looped) resource declarations. */
export function getResources(
  root: ProvisioningComponent,
  typeOrOptions?: ResourceCtor<Resource> | QueryOptions,
  maybeOptions?: QueryOptions,
): Resource[] {
  const isCtor = typeof typeOrOptions === "function";
  const type = isCtor ? (typeOrOptions as ResourceCtor<Resource>) : undefined;
  const options = (isCtor ? maybeOptions : typeOrOptions) as QueryOptions | undefined;
  const recursive = options?.recursive ?? true;
  const found = collectResourcesUnder(root, false, recursive) as Resource[];
  return type === undefined ? found : found.filter((r) => r instanceof type);
}

/** Loop-expanded resource declarations (`Ctor.fromLoop(...)`). */
export function getLoopedResources(
  root: ProvisioningComponent,
  typeOrOptions?: ResourceCtor<Resource> | QueryOptions,
  maybeOptions?: QueryOptions,
): LoopedResource<Resource>[] {
  const isCtor = typeof typeOrOptions === "function";
  const type = isCtor ? (typeOrOptions as ResourceCtor<Resource>) : undefined;
  const options = (isCtor ? maybeOptions : typeOrOptions) as QueryOptions | undefined;
  const recursive = options?.recursive ?? true;
  const found = collectResourcesUnder(root, true, recursive) as LoopedResource<Resource>[];
  return type === undefined ? found : found.filter((r) => isLoopedResourceOf(r, type));
}

/**
 * First scalar resource of `type` whose literal name equals `name`, or
 * `undefined`. `deref` resolves the name's expression proxy to its literal
 * (a `Resource`'s `name` is an `Expression`, so `r.name === name` is always
 * false without it).
 */
export function getResource<T extends Resource>(
  root: ProvisioningComponent,
  type: ResourceCtor<T>,
  name: string,
  options?: QueryOptions,
): T | undefined {
  for (const r of getResources(root, type, options)) {
    if (deref((r as Resource).name) === name) return r as T;
  }
  return undefined;
}
