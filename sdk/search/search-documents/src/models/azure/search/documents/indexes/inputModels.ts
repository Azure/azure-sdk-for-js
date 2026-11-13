// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  RandomScoringParameters,
  ScoringFunctionInterpolation,
  ScoringFunctionUnion,
  ScoringProfile,
  SearchIndex,
} from "./models.js";

/**
 * Assigns pseudo-random scores without a field or boost, replacing text and vector scores.
 * The profile must contain only this function and cannot specify text weights.
 */
export interface RandomScoringFunction {
  /** Selects pseudo-random scoring. */
  type: "random";
  /** Optional seeded scoring configuration. */
  parameters?: RandomScoringParameters;
  /** Optional interpolation configuration. */
  interpolation?: ScoringFunctionInterpolation;
}

/** Scoring functions accepted as input, including November preview random scoring. */
export type ScoringFunctionInput = ScoringFunctionUnion | RandomScoringFunction;

/** A scoring profile input that accepts November preview scoring functions. */
export interface ScoringProfileInput extends Omit<ScoringProfile, "functions"> {
  /** Functions used to compute document scores. */
  functions?: ScoringFunctionInput[];
}

/** An index input that preserves legacy models while accepting random scoring. */
export interface SearchIndexInput extends Omit<SearchIndex, "scoringProfiles"> {
  /** Scoring profiles to configure on the index. */
  scoringProfiles?: ScoringProfileInput[];
}

export function randomScoringFunctionSerializer(
  item: RandomScoringFunction,
): Record<string, unknown> {
  return {
    type: item.type,
    interpolation: item.interpolation,
    random: item.parameters ? { seedParameter: item.parameters.seedParameter } : undefined,
  };
}

export function randomScoringFunctionDeserializer(
  item: Record<string, unknown>,
): RandomScoringFunction {
  const parameters = item["random"] as RandomScoringParameters | undefined;
  return {
    type: "random",
    interpolation: item["interpolation"] as ScoringFunctionInterpolation | undefined,
    parameters: parameters ? { seedParameter: parameters.seedParameter } : undefined,
  };
}
