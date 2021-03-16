// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * These interfaces map to the actual JSON representation that's needed when serializing to/from the string .value of a ConfigurationSetting.
 */

/**
 * @internal
 */
export type JsonFeatureFlag = {
  conditions: {
    client_filters: (
      | JsonFeatureFlagTargetingClientFilter
      | JsonFeatureFlagTimeWindowClientFilter
      | JsonFeatureFlagPercentageClientFilter
      | object
    )[];
  };
  description?: string;
  enabled: true;
};

/**
 * @internal
 */
export interface JsonFeatureFlagTargetingClientFilter {
  name: "Microsoft.Targeting";
  parameters: {
    Audience?: {
      Users: string[];
      Groups: {
        Name: string;
        RolloutPercentage: number;
      }[];
    };
    DefaultRolloutPercentage: number;
    [key: string]: any;
  };
}

/**
 * @internal
 */
export interface JsonFeatureFlagTimeWindowClientFilter {
  name: "Microsoft.TimeWindow";
  parameters: {
    Start: string;
    End: string;
    [key: string]: any;
  };
}

/**
 * @internal
 */
export interface JsonFeatureFlagPercentageClientFilter {
  name: "Microsoft.Percentage";
  parameters: {
    [key: string]: any;
  };
}

/**
 * @internal
 */
export function isJsonFeatureFlagTargetingClientFilter(
  clientFilter: any
): clientFilter is JsonFeatureFlagTargetingClientFilter {
  return clientFilter.name === "Microsoft.Targeting";
}

/**
 * @internal
 */
export function isJsonFeatureFlagTimeWindowClientFilter(
  clientFilter: any
): clientFilter is JsonFeatureFlagTimeWindowClientFilter {
  return clientFilter.name === "Microsoft.TimeWindow";
}

/**
 * @internal
 */
export function isJsonFeatureFlagPercentageClientFilter(
  clientFilter: any
): clientFilter is JsonFeatureFlagPercentageClientFilter {
  return clientFilter.name === "Microsoft.Percentage";
}

// keyvault reference

/**
 * @internal
 */
export interface JsonKeyVaultReference {
  uri: string;
}
