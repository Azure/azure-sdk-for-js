// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RegExpParser } from "@eslint-community/regexpp";
import type { ExpressionOrValue } from "../expression/expressions.js";
import { isExpression, unwrapExpression } from "../expression/expressions.js";
import { concat, subscription, toLower, uniqueString } from "../fn.js";
import { DEFAULT_NAMING_RULES, type ResourceNamingRules } from "./naming-rules.js";
import { assertValidResourceName } from "./name-validation.js";

export interface NamingContext {
  readonly type: string;
  readonly rules: ResourceNamingRules;
  /** Required name segments relative to the actual declaration parent. */
  readonly nameSegments?: number | undefined;
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
  /** Produces a candidate; resource construction validates the returned name. */
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
 * suffix to reduce name collisions; Azure name availability is not checked.
 */
export class DefaultNamingPolicy implements NamingPolicy {
  readonly #options: NamingPolicyOptions;
  readonly #ordinals = new Map<string, number>();
  readonly #names = new Map<string, Set<string>>();

  constructor(options: NamingPolicyOptions) {
    this.#options = options;
  }

  generateName(context: NamingContext): ExpressionOrValue<string> {
    const rules = context.rules;
    const nameSegments = context.nameSegments ?? rules.nameSegments ?? 1;
    if (!Number.isSafeInteger(nameSegments) || nameSegments < 1) {
      throw new Error("Resource naming segment count must be a positive safe integer.");
    }
    if (nameSegments > 1) {
      throw new Error(
        `Resource '${context.type}' requires an explicit ${nameSegments}-segment name including its undeclared ancestors.`,
      );
    }
    const ordinal = this.#ordinals.get(context.type) ?? 0;
    const alphabet = getNamingAlphabet(rules);
    const sep = rules.separator ?? (alphabet.includes("-") ? "-" : "");
    if ([...sep].some((character) => !alphabet.includes(character))) {
      throw new Error(
        `Cannot generate a compliant name for '${context.type}': separator '${sep}' is incompatible with its naming rules.`,
      );
    }
    const sanitize = (segment: string): string => {
      return [...segment]
        .map((character) => (alphabet.includes(character) ? character : character.toLowerCase()))
        .filter((character) => alphabet.includes(character))
        .join("");
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
    let base = segments.filter(Boolean).join(sep);
    const startingAlphabet = getNamingAlphabet(rules, "start");
    const endingAlphabet = getNamingAlphabet(rules, "end");
    const padding = startingAlphabet[0];
    if (padding === undefined || endingAlphabet.length === 0) {
      throw new Error(
        `Cannot generate a compliant name for '${context.type}': no supported generation alphabet. Provide an explicit name.`,
      );
    }
    if (base.length > 0 && !startingAlphabet.includes(base[0]!)) {
      base = padding + base;
    }
    // This is a convention budget when TypeSpec supplies no maximum, not a
    // constraint imposed on explicit names.
    const maxLength = rules.maxLength ?? Math.max(24, rules.minLength ?? 0);
    const minLength = rules.minLength ?? 1;

    const truncateWithOrdinal = (available: number): string => {
      const ordinalPrefix = ordinalSuffix ? sep : "";
      const baseLimit = available - ordinalPrefix.length - ordinalSuffix.length;
      if (baseLimit < 1) {
        throw new Error(
          `Cannot generate a compliant name for '${context.type}': maximum length ${maxLength} cannot accommodate the required suffixes. Provide an explicit name.`,
        );
      }
      return `${base.slice(0, baseLimit)}${ordinalPrefix}${ordinalSuffix}`;
    };

    let name: ExpressionOrValue<string>;
    if (rules.scope === "global") {
      // Bicep uniqueString() always returns 13 characters. Reserve that suffix
      // and the ordinal before truncating so repeated resources stay unique.
      const uniqueSuffixLength = 13;
      const prefixBudget = maxLength - sep.length - uniqueSuffixLength;
      base = base.padEnd(Math.max(1, minLength - sep.length - uniqueSuffixLength), padding);
      let prefix = truncateWithOrdinal(prefixBudget);
      if (sep && prefix.endsWith(sep)) {
        prefix = prefix.slice(0, -sep.length).padEnd(1, padding);
      }
      prefix = prefix.padEnd(Math.max(1, minLength - sep.length - uniqueSuffixLength), padding);
      name = concat(prefix + sep, uniqueString(subscription().subscriptionId));
      if (!alphabet.includes("A")) name = toLower(name);
    } else {
      base = base.padEnd(minLength, padding);
      let truncated = truncateWithOrdinal(maxLength);
      if (!endingAlphabet.includes(truncated.at(-1)!)) {
        truncated = truncated.slice(0, -1) + endingAlphabet[0]!;
      }
      name = truncated;
    }

    const key = JSON.stringify(name, (_key, value: unknown) =>
      isExpression(value) ? unwrapExpression(value) : value,
    );
    const names = this.#names.get(context.type) ?? new Set<string>();
    if (names.has(key)) {
      throw new Error(
        `Cannot generate a distinct name for '${context.type}' within its naming rules. Provide an explicit name.`,
      );
    }
    names.add(key);
    this.#names.set(context.type, names);
    this.#ordinals.set(context.type, ordinal + 1);
    return name;
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
 * Generates and validates a name at the resource construction boundary.
 * Explicit constructor names are validated before declaration registration.
 */
export function generateResourceName(
  policy: NamingPolicy,
  type: string,
  namingRules: ResourceNamingRules | undefined,
  nameSegments: number | undefined,
): ExpressionOrValue<string> {
  const rules = namingRules ?? DEFAULT_NAMING_RULES;
  const generated = policy.generateName({
    type,
    rules,
    nameSegments: nameSegments ?? rules.nameSegments,
  });
  assertValidResourceName(generated, type, rules, {
    generated: true,
  });
  return generated;
}

/** A candidate character atom and its minimum repetition count. */
interface PatternToken {
  readonly characters: RegExp;
  readonly min: number;
}

const NAME_ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._";
const patternParser = new RegExpParser();

/**
 * Selects generation tokens from a parsed regex AST. Shapes outside the
 * workload-based convention remain usable for literal-name validation.
 */
function getPatternTokens(regex: string): readonly PatternToken[] | undefined {
  const pattern = patternParser.parsePattern(regex);
  if (pattern.alternatives.length !== 1) return undefined;
  const elements = pattern.alternatives[0]!.elements;
  const start = elements[0];
  const end = elements.at(-1);
  if (start?.type !== "Assertion" || start.kind !== "start") return undefined;
  const anchored = end?.type === "Assertion" && end.kind === "end";
  const body = elements.slice(1, anchored ? -1 : undefined);
  const [head, tail] = body;
  // Prefer the separator-free sublanguage of repeated hyphen-separated classes.
  if (
    body.length === 2 &&
    head?.type === "Quantifier" &&
    head.min === 1 &&
    head.max === Infinity &&
    head.element.type === "CharacterClass" &&
    tail?.type === "Quantifier" &&
    tail.min === 0 &&
    tail.max === Infinity &&
    (tail.element.type === "Group" || tail.element.type === "CapturingGroup") &&
    tail.element.alternatives.length === 1
  ) {
    const repeated = tail.element.alternatives[0]!.elements;
    const [separator, part] = repeated;
    if (
      repeated.length === 2 &&
      separator?.type === "Character" &&
      separator.value === 45 &&
      part?.type === "Quantifier" &&
      part.min === 1 &&
      part.max === Infinity &&
      part.element.raw === head.element.raw
    ) {
      return [
        { characters: new RegExp(`^(?:${head.element.raw})$`), min: 1 },
        ...(anchored ? [] : [{ characters: /^.$/, min: 0 }]),
      ];
    }
  }
  if (!anchored) return undefined;
  const tokens: PatternToken[] = [];
  for (const element of body) {
    if (element.type === "Quantifier" && element.max === 0) continue;
    const atom = element.type === "Quantifier" ? element.element : element;
    if (
      atom.type !== "Character" &&
      atom.type !== "CharacterClass" &&
      atom.type !== "CharacterSet"
    ) {
      return undefined;
    }
    tokens.push({
      characters: new RegExp(`^(?:${atom.raw})$`),
      min: element.type === "Quantifier" ? element.min : 1,
    });
    if (tokens.length > 128) return undefined;
  }
  return tokens;
}

/**
 * Selects candidate characters for sanitization, padding, and boundary repair.
 * Candidates are not a validity guarantee; the complete name is still checked.
 */
function getNamingAlphabet(rules: ResourceNamingRules, boundary?: "start" | "end"): string {
  const alphabet =
    rules.pattern !== undefined
      ? NAME_ALPHABET
      : "abcdefghijklmnopqrstuvwxyz0123456789" + (rules.separator ?? "");
  if (rules.pattern === undefined || rules.pattern.regex === "") {
    return alphabet;
  }
  const tokens = getPatternTokens(rules.pattern.regex);
  if (tokens === undefined) return alphabet.replace(/[A-Z._-]/g, "");
  const ordered = boundary === "end" ? [...tokens].reverse() : tokens;
  const firstRequired = ordered.findIndex((token) => token.min > 0);
  const candidates =
    boundary === undefined || firstRequired < 0 ? ordered : ordered.slice(0, firstRequired + 1);
  return [...alphabet]
    .filter((character) => candidates.some((token) => token.characters.test(character)))
    .join("");
}
