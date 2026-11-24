// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export interface ResourceNamingRules {
  readonly abbreviation: string;
  readonly minLength?: number;
  readonly maxLength?: number;
  readonly pattern?: {
    readonly regex: string;
    readonly message?: string;
  };
  /** Default relative name segments in the generated resource hierarchy. */
  readonly nameSegments?: number;
  readonly separator?: string;
  /** Name uniqueness domain, not deployment scope. */
  readonly scope: "global" | "resourceGroup" | "subscription" | "parent";
}

export const DEFAULT_NAMING_RULES: ResourceNamingRules = {
  abbreviation: "",
  separator: "",
  scope: "global",
};
