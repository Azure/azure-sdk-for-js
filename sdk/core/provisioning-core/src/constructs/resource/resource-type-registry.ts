// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DiscriminatorNames } from "../../shape/shape.js";

/** One discriminator pinned to a fixed value by a concrete flat variant. */
export interface FlatVariantPin {
  readonly discriminator: DiscriminatorNames;
  readonly value: string;
}

/** Pins selecting one concrete flat variant. */
export type FlatVariantSelector = readonly FlatVariantPin[];

/** One concrete variant together with a selector that chooses it. */
export interface FlatVariantSelection<T> {
  readonly variant: T;
  readonly selector: FlatVariantSelector;
}

/** One selector-to-target record stored in a variant registry bucket. */
export interface FlatVariantRegistryEntry<T> {
  readonly selector: FlatVariantSelector;
  readonly target: T;
}

/** One `(resourceType, apiVersion)` registry bucket. */
export type ResourceTypeRegistryEntry<T> =
  | {
      readonly kind: "flat";
      readonly target: T;
    }
  | {
      readonly kind: "variants";
      readonly variants: FlatVariantRegistryEntry<T>[];
    };

export interface ResourceTypeRegistryResolveOptions {
  readonly strict: boolean;
  readonly valueKeyedBy: "js" | "arm";
}

interface VersionedTarget<T> {
  readonly apiVersion: string;
  readonly target: T;
}

/** Registry for versioned resource-type targets with optional variants. */
export class ResourceTypeRegistry<T> {
  readonly #exact = new Map<string, ResourceTypeRegistryEntry<T>>();
  readonly #highest = new Map<string, ResourceTypeRegistryEntry<VersionedTarget<T>>>();

  register(
    resourceType: string,
    apiVersion: string,
    target: T,
    variantSelector?: FlatVariantSelector,
  ): void {
    const selector = variantSelector?.length ? variantSelector : undefined;
    const exactKey = resourceTypeVersionKey(resourceType, apiVersion);
    const exactEntry = this.#exact.get(exactKey);
    const highestEntry = this.#highest.get(resourceType);

    assertMode(exactEntry, selector, exactKey);
    assertMode(highestEntry, selector, resourceType);
    registerExact(this.#exact, exactKey, target, selector);
    this.#updateHighest(resourceType, apiVersion, target, selector);
  }

  resolve(
    resourceType: string,
    apiVersion: string,
    state: Record<string, unknown>,
    options: ResourceTypeRegistryResolveOptions,
  ): T | undefined {
    const exact = resolveEntry(
      this.#exact.get(resourceTypeVersionKey(resourceType, apiVersion)),
      state,
      options.valueKeyedBy,
    );
    if (exact !== undefined || options.strict) return exact;

    const fallback = resolveEntry(this.#highest.get(resourceType), state, options.valueKeyedBy);
    return fallback?.target;
  }

  #updateHighest(
    resourceType: string,
    apiVersion: string,
    target: T,
    selector: FlatVariantSelector | undefined,
  ): void {
    const entry = this.#highest.get(resourceType);
    const versionedTarget = { apiVersion, target };

    if (!entry) {
      this.#highest.set(
        resourceType,
        selector
          ? {
              kind: "variants",
              variants: [{ selector: [...selector], target: versionedTarget }],
            }
          : { kind: "flat", target: versionedTarget },
      );
      return;
    }

    if (entry.kind === "flat") {
      if (apiVersionCompare(apiVersion, entry.target.apiVersion) > 0) {
        this.#highest.set(resourceType, {
          kind: "flat",
          target: versionedTarget,
        });
      }
      return;
    }

    const selectorKey = flatVariantSelectorKey(selector!);
    const priorIndex = entry.variants.findIndex(
      (variant) => flatVariantSelectorKey(variant.selector) === selectorKey,
    );
    const prior = entry.variants[priorIndex];
    if (!prior) {
      entry.variants.push({
        selector: [...selector!],
        target: versionedTarget,
      });
    } else if (apiVersionCompare(apiVersion, prior.target.apiVersion) > 0) {
      entry.variants[priorIndex] = {
        selector: [...selector!],
        target: versionedTarget,
      };
    }
  }
}

function assertMode<T>(
  entry: ResourceTypeRegistryEntry<T> | undefined,
  selector: FlatVariantSelector | undefined,
  key: string,
): void {
  if (!entry) return;
  if (!selector && entry.kind === "variants") {
    throw new Error(`Cannot register flat target for ${key}: variants are already registered.`);
  }
  if (selector && entry.kind === "flat") {
    throw new Error(
      `Cannot register variant target for ${key}: a flat target is already registered.`,
    );
  }
}

function registerExact<T>(
  entries: Map<string, ResourceTypeRegistryEntry<T>>,
  key: string,
  target: T,
  selector: FlatVariantSelector | undefined,
): void {
  const entry = entries.get(key);
  if (!entry) {
    entries.set(
      key,
      selector
        ? {
            kind: "variants",
            variants: [{ selector: [...selector], target }],
          }
        : { kind: "flat", target },
    );
    return;
  }

  if (entry.kind === "flat") {
    if (entry.target !== target) {
      throw new Error(`Conflicting flat target registration for ${key}.`);
    }
    return;
  }

  const selectorKey = flatVariantSelectorKey(selector!);
  const existing = entry.variants.find(
    (variant) => flatVariantSelectorKey(variant.selector) === selectorKey,
  );
  if (existing) {
    if (existing.target !== target) {
      throw new Error(`Conflicting variant target registration for ${key}@${selectorKey}.`);
    }
    return;
  }
  entry.variants.push({ selector: [...selector!], target });
}

function resolveEntry<T>(
  entry: ResourceTypeRegistryEntry<T> | undefined,
  state: Record<string, unknown>,
  valueKeyedBy: "js" | "arm",
): T | undefined {
  if (!entry) return undefined;
  if (entry.kind === "flat") return entry.target;
  return resolveFlatVariant(entry.variants, state, valueKeyedBy);
}

function resourceTypeVersionKey(resourceType: string, apiVersion: string): string {
  return `${resourceType}@${apiVersion}`;
}

/** Compare ARM API versions for best-effort fallback selection. */
function apiVersionCompare(left: string, right: string): number {
  if (left === right) return 0;
  if (right.startsWith(`${left}-`)) return 1;
  if (left.startsWith(`${right}-`)) return -1;
  return left < right ? -1 : 1;
}

/**
 * Stable identity for duplicate detection and version indexes.
 * Pins are sorted in the key because the matched state is flat and selector
 * matching is a conjunction of discriminator/value pairs, independent of
 * hierarchy order. The selector itself is not mutated.
 */
export function flatVariantSelectorKey(selector: FlatVariantSelector): string {
  const pins = selector.map(
    ({ discriminator, value }) => [discriminator.jsName, discriminator.armName, value] as const,
  );
  pins.sort(comparePinTuples);
  return JSON.stringify(pins);
}

function comparePinTuples(
  left: readonly [string, string, string],
  right: readonly [string, string, string],
): number {
  for (let index = 0; index < left.length; index++) {
    if (left[index]! < right[index]!) return -1;
    if (left[index]! > right[index]!) return 1;
  }
  return 0;
}

/** Resolve the first registered selector exactly matched by `state`. */
export function resolveFlatVariant<T>(
  entries: readonly FlatVariantRegistryEntry<T>[],
  state: Record<string, unknown> | undefined,
  valueKeyedBy: "js" | "arm",
): T | undefined {
  if (!state) return undefined;

  for (const entry of entries) {
    if (matchesSelector(entry.selector, state, valueKeyedBy)) {
      return entry.target;
    }
  }
  return undefined;
}

function matchesSelector(
  selector: FlatVariantSelector,
  state: Record<string, unknown>,
  valueKeyedBy: "js" | "arm",
): boolean {
  return selector.every(({ discriminator, value }) => {
    const key = valueKeyedBy === "js" ? discriminator.jsName : discriminator.armName;
    return state[key] === value;
  });
}
