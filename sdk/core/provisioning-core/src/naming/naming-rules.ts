// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export interface ResourceNamingValidCharacters {
  readonly uppercase: boolean;
  readonly hyphens: boolean;
  readonly underscores: boolean;
  readonly periods: boolean;
}

export interface ResourceNamingRules {
  readonly abbreviation: string;
  readonly minLength: number;
  readonly maxLength: number;
  readonly validCharacters: ResourceNamingValidCharacters;
  readonly scope: "global" | "resourceGroup" | "subscription";
}

export const MOST_RESTRICTIVE: ResourceNamingRules = {
  abbreviation: "",
  minLength: 1,
  maxLength: 24,
  validCharacters: {
    uppercase: false,
    hyphens: false,
    underscores: false,
    periods: false,
  },
  scope: "global",
};
