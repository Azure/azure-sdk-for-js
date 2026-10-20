// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Global resource shape registry keyed by ARM `type` + `apiVersion`.
 *
 * Generated resource modules register their shape at module load so
 * the deserialization path can look up the shape of an imported
 * resource (which only carries `type` and `apiVersion` on the wire)
 * and raise its raw ARM-shape state back into JS-ergonomic form.
 *
 * A `(type, apiVersion)` pair is either flat or has a flat list of concrete
 * variant shapes. Each variant carries an ordered selector, such as
 * `[name=signin]` or `[kind=cat, breed=siamese]`. The registry does not build a
 * parallel discriminator tree.
 */

import type { FlatModelShape } from "./shape.js";
import {
  ResourceTypeRegistry,
  type FlatVariantSelector,
} from "../constructs/resource/resource-type-registry.js";

const registry = new ResourceTypeRegistry<FlatModelShape>();

export interface ShapeResolveOptions {
  /** Require an exact API version. Defaults to `true`. */
  readonly strict?: boolean;
  /** Naming used by the supplied state. Defaults to `"js"`. */
  readonly valueKeyedBy?: "js" | "arm";
}

/**
 * Register a {@link FlatModelShape} for a resource type + apiVersion
 * pair. Called at module load by generated resource modules (typically
 * through {@link Resource.registerShape}).
 *
 * For normal (non-discriminated) resources, pass a flat model shape
 * directly. Re-registering the *same* shape object (e.g. due to
 * module-graph re-entry in test harnesses) is a silent no-op.
 *
 * For a concrete resource variant, pass its ordered `variantSelector`. Several
 * selectors may register the same shape when one class claims multiple values.
 * Duplicate selectors with different shapes throw.
 */
export function registerShape(
  type: string,
  apiVersion: string,
  shape: FlatModelShape,
  variantSelector?: FlatVariantSelector,
): void {
  registry.register(type, apiVersion, shape, variantSelector);
}

/**
 * Look up the {@link FlatModelShape} registered for
 * `type + apiVersion`. Variant selectors are matched against `state` using the
 * requested naming. Every pin must match exactly; the first matching selector
 * wins.
 *
 * Returns `undefined` when no shape is known, or when the entry is
 * discriminated but `state` does not expose the discriminator value
 * (or the value isn't a registered variant). Callers that get
 * `undefined` should treat the resource state as opaque (passthrough).
 *
 * For non-discriminated resources `state` is ignored. API-version fallback is
 * disabled by default and must be explicitly requested with `strict: false`.
 */
export function getShape(
  type: string,
  apiVersion: string,
  state: Record<string, unknown>,
  options: ShapeResolveOptions = {},
): FlatModelShape | undefined {
  return registry.resolve(type, apiVersion, state, {
    strict: options.strict ?? true,
    valueKeyedBy: options.valueKeyedBy ?? "js",
  });
}
