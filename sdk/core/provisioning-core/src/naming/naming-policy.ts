// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ExpressionOrValue } from "../expression/expressions.js";
import { concat, subscription, toLower, uniqueString } from "../fn.js";
import { MOST_RESTRICTIVE, type ResourceNamingRules } from "./naming-rules.js";

export interface NamingContext {
  readonly type: string;
  readonly rules: ResourceNamingRules;
  readonly label?: string | undefined;
}

/**
 * Strategy for generating Azure resource names when a resource is created
 * without an explicit `name`.
 *
 * Implement this interface to provide a custom naming convention. Two
 * built-in implementations are provided:
 *
 * - {@link DefaultNamingPolicy} — workload-based names with abbreviations,
 *   ordinals, and `uniqueString()` for globally-scoped resources.
 * - {@link namingRequiredPolicy} — a singleton that throws if a resource
 *   doesn't provide an explicit `name`.
 */
export interface NamingPolicy {
  generateName(context: NamingContext): ExpressionOrValue<string>;
}

export interface NamingPolicyOptions {
  readonly workload: string;
  readonly environment?: string | undefined;
  readonly region?: string | undefined;
}

/**
 * Default workload-based naming policy.
 *
 * Generates names by composing the resource type abbreviation, workload,
 * environment, region, label, and an ordinal suffix for repeated types.
 * Global-scope resources get a `uniqueString(subscription().subscriptionId)`
 * suffix to ensure uniqueness.
 */
export class DefaultNamingPolicy implements NamingPolicy {
  readonly #options: NamingPolicyOptions;
  readonly #ordinals = new Map<string, number>();

  constructor(options: NamingPolicyOptions) {
    this.#options = options;
  }

  generateName(context: NamingContext): ExpressionOrValue<string> {
    const ordinal = this.#ordinals.get(context.type) ?? 0;
    this.#ordinals.set(context.type, ordinal + 1);

    const rules = context.rules;
    const sep = rules.validCharacters.hyphens ? "-" : "";

    const sanitize = (segment: string): string => {
      let value = segment;
      if (!rules.validCharacters.hyphens) value = value.replace(/-/gu, "");
      if (!rules.validCharacters.underscores) value = value.replace(/_/gu, "");
      if (!rules.validCharacters.periods) value = value.replace(/\./gu, "");
      value = value.replace(/[^A-Za-z0-9._-]/gu, "");
      return rules.validCharacters.uppercase ? value : value.toLowerCase();
    };

    const segments: string[] = [];
    if (rules.abbreviation) {
      segments.push(sanitize(rules.abbreviation));
    }
    segments.push(sanitize(this.#options.workload));
    if (this.#options.environment) {
      segments.push(sanitize(this.#options.environment));
    }
    if (this.#options.region) {
      segments.push(sanitize(this.#options.region));
    }
    if (context.label) {
      segments.push(sanitize(context.label));
    }
    const ordinalSuffix = ordinal > 0 ? String(ordinal + 1) : "";
    const base = segments.filter(Boolean).join(sep);

    const truncateWithOrdinal = (available: number): string => {
      const ordinalPrefix = ordinalSuffix ? sep : "";
      const baseLimit = Math.max(0, available - ordinalPrefix.length - ordinalSuffix.length);
      return `${base.slice(0, baseLimit)}${ordinalPrefix}${ordinalSuffix}`;
    };

    if (rules.scope === "global") {
      // Bicep uniqueString() always returns 13 characters. Reserve that suffix
      // and the ordinal before truncating so repeated resources stay unique.
      const uniqueSuffixLength = 13;
      const prefix = truncateWithOrdinal(rules.maxLength - sep.length - uniqueSuffixLength);
      const full = concat(prefix + sep, uniqueString(subscription().subscriptionId));
      return rules.validCharacters.uppercase ? full : toLower(full);
    }

    // Non-global scope: no uniqueString needed, plain string is fine
    const truncated = truncateWithOrdinal(rules.maxLength);
    return rules.validCharacters.uppercase ? truncated : truncated.toLowerCase();
  }
}

/**
 * Naming policy that requires every resource to provide an explicit `name`.
 *
 * Throws an error when asked to generate a name. Use this on a stack to
 * disable auto-naming entirely.
 */
export const namingRequiredPolicy: NamingPolicy = {
  generateName(context: NamingContext): ExpressionOrValue<string> {
    throw new Error(
      `Resource of type '${context.type}' requires an explicit 'name' ` +
        `(the stack uses 'namingRequiredPolicy').`,
    );
  },
};

/**
 * Resolves the Azure resource name for a resource instance.
 *
 * - If `name` is explicitly provided (string or expression), it is used
 *   as-is — the naming policy does not transform it.
 * - Otherwise, the active naming policy generates a name.
 */
export function resolveResourceName(
  policy: NamingPolicy,
  name: ExpressionOrValue<string> | undefined,
  type: string,
  namingRules: ResourceNamingRules | undefined,
): ExpressionOrValue<string> {
  if (name !== undefined) {
    return name;
  }
  return policy.generateName({
    type,
    rules: namingRules ?? MOST_RESTRICTIVE,
  });
}
