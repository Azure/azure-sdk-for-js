// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  isJsonFeatureFlagPercentageClientFilter,
  isJsonFeatureFlagTargetingClientFilter,
  isJsonFeatureFlagTimeWindowClientFilter,
  JsonFeatureFlag
} from "./internal/jsonModels";
import { ConfigurationSetting, ConfigurationSettingParam } from "./models";

/**
 * The prefix for feature flags.
 */
export const featureFlagPrefix = ".appconfig.featureflag/";

/**
 * The content type for a FeatureFlag
 */
export const featureFlagContentType = "application/vnd.microsoft.appconfig.ff+json;charset=utf-8";

/**
 * Necessary fields for updating or creating a new feature flag.
 */
export interface FeatureFlagParam extends ConfigurationSettingParam {
  /**
   * A Feature filter consistently evaluates the state of a feature flag.
   * Our feature management library supports three types of built-in filters: Targeting, TimeWindow, and Percentage.
   * Custom filters can also be created based on different factors, such as device used, browser types, geographic location, etc.
   *
   * [More Info](https://docs.microsoft.com/en-us/azure/azure-app-configuration/howto-feature-filters-aspnet-core)
   */
  conditions: {
    clientFilters: (
      | FeatureFlagTargetingClientFilter
      | FeatureFlagTimeWindowClientFilter
      | FeatureFlagPercentageClientFilter
      | object
    )[];
  };
  /**
   * Description of the feature.
   */
  description?: string;
  /**
   * Display name for the feature to use for display rather than the ID.
   */
  displayName: string;
  /**
   * Boolean flag to say if the feature flag is enabled.
   */
  enabled: boolean;
}

/**
 * FeatureFlag represents a configuration setting that stores a feature flag value.
 *
 * [More Info](https://docs.microsoft.com/azure/azure-app-configuration/concept-feature-management)
 */
export interface FeatureFlag extends FeatureFlagParam, ConfigurationSetting {}

/**
 * Targeting Client filter for the feature flag configuration setting.
 *
 * [More Info](https://docs.microsoft.com/en-us/azure/azure-app-configuration/howto-feature-filters-aspnet-core)
 */
export interface FeatureFlagTargetingClientFilter {
  /**
   * The name of the feature filter.
   */
  name: "Microsoft.Targeting";
  /**
   * Parameters that can be passed in the filter.
   */
  parameters: {
    // TODO: can we hoist these values up directly into the filter, rather than having this 'parameters' intermediary.
    audience: {
      users: string[];
      groups: {
        name: string;
        rolloutPercentage: number;
      }[];
    };
    defaultRolloutPercentage: number;

    // [key: string]: any;
  };
}

/**
 * Time window Client filter for the feature flag configuration setting.
 *
 * [More Info](https://docs.microsoft.com/en-us/azure/azure-app-configuration/howto-feature-filters-aspnet-core)
 */
export interface FeatureFlagTimeWindowClientFilter {
  /**
   * The name of the feature filter.
   */
  name: "Microsoft.TimeWindow";
  /**
   * Parameters that can be passed in the filter.
   */
  parameters: {
    start: string;
    end: string;
    // [key: string]: any;
  };
}

/**
 * Percentage Client filter for the feature flag configuration setting.
 *
 * [More Info](https://docs.microsoft.com/en-us/azure/azure-app-configuration/howto-feature-filters-aspnet-core)
 */
export interface FeatureFlagPercentageClientFilter {
  /**
   * The name of the feature filter.
   */
  name: "Microsoft.Percentage";
  /**
   * Parameters that can be passed in the filter.
   */
  parameters: {
    [key: string]: any;
  };
}

/**
 * FeatureFlag represents a configuration setting that stores a feature flag value.
 * [More Info](https://docs.microsoft.com/azure/azure-app-configuration/concept-feature-management)
 *
 * This helper method tells you if the given setting is a feature flag.
 */
export function isFeatureFlag(setting: ConfigurationSetting | FeatureFlag): setting is FeatureFlag {
  return setting.contentType === featureFlagContentType;
}

/**
 * This helper method tells you if the given client filter has the name "Microsoft.Targeting".
 */
function isFeatureFlagTargetingClientFilter(
  clientFilter: any
): clientFilter is FeatureFlagTargetingClientFilter {
  return clientFilter.name === "Microsoft.Targeting";
}

/**
 * This helper method tells you if the given client filter has the name "Microsoft.TimeWindow".
 */
function isFeatureFlagTimeWindowClientFilter(
  clientFilter: any
): clientFilter is FeatureFlagTimeWindowClientFilter {
  return clientFilter.name === "Microsoft.TimeWindow";
}

/**
 * This helper method tells you if the given client filter has the name "Microsoft.Percentage".
 */
function isFeatureFlagPercentageClientFilter(
  clientFilter: any
): clientFilter is FeatureFlagPercentageClientFilter {
  return clientFilter.name === "Microsoft.Percentage";
}

/**
 * Type of FeatureFlag based on the client filters.
 */
export type FeatureFlagType<
  T extends "targeting" | "timeWindow" | "percentage"
> = T extends "targeting"
  ? FeatureFlagTargetingClientFilter
  : T extends "timeWindow"
  ? FeatureFlagTimeWindowClientFilter
  : T extends "percentage"
  ? FeatureFlagPercentageClientFilter
  : never;

/**
 * This helper method tells you if the given client filter is a FeatureFlagClientFilter.
 */
export function isFeatureFlagClientFilter<T extends "targeting" | "timeWindow" | "percentage">(
  type: T,
  obj: any
): obj is FeatureFlagType<T> {
  switch (type) {
    case "targeting":
      return isFeatureFlagTargetingClientFilter(obj);
    case "timeWindow":
      return isFeatureFlagTimeWindowClientFilter(obj);
    case "percentage":
      return isFeatureFlagPercentageClientFilter(obj);
    default:
      throw new Error(`Invalid feature flag filter type ${type}`);
  }
}

export function deserializeFeatureFlag(setting: ConfigurationSetting): FeatureFlag | undefined {
  if (!isFeatureFlag(setting) || !setting.value) {
    return undefined;
  }

  let jsonFeatureFlag: JsonFeatureFlag;

  try {
    jsonFeatureFlag = JSON.parse(setting.value) as JsonFeatureFlag;
  } catch (err) {
    // best effort - if it doesn't deserialize properly we'll just let it "degrade"
    // to be treated as a ConfigurationSetting.
    return undefined;
  }

  // update (in-place) the feature flag specific properties
  const featureFlag = setting as Omit<FeatureFlag, keyof ConfigurationSetting>;
  featureFlag.conditions = convertJsonConditions(jsonFeatureFlag.conditions);
  featureFlag.enabled = jsonFeatureFlag.enabled;
  featureFlag.description = jsonFeatureFlag.description;

  return setting;
}

export function serializeFeatureFlag(_setting: FeatureFlag): ConfigurationSetting {
  throw new Error("Not implemented");
}

/**
 * @internal
 */
export function convertJsonConditions(
  conditions: JsonFeatureFlag["conditions"]
): FeatureFlag["conditions"] {
  const clientFilters = conditions.client_filters.map((jsonFilter) => {
    if (isJsonFeatureFlagTargetingClientFilter(jsonFilter)) {
      // try not to slice any unknown attributes
      const filter: FeatureFlagTargetingClientFilter = {
        name: jsonFilter.name,
        parameters: {
          audience: {
            groups:
              jsonFilter.parameters.Audience?.Groups.map((grp) => ({
                name: grp.Name,
                rolloutPercentage: grp.RolloutPercentage
              })) || [],
            users: jsonFilter.parameters.Audience?.Users || []
          },
          defaultRolloutPercentage: jsonFilter.parameters.DefaultRolloutPercentage
        }
      };

      return filter;
    } else if (isJsonFeatureFlagTimeWindowClientFilter(jsonFilter)) {
      // try not to slice any unknown attributes
      const filter: FeatureFlagTimeWindowClientFilter = {
        name: jsonFilter.name,
        parameters: {
          start: jsonFilter.parameters.Start,
          end: jsonFilter.parameters.End
        }
      };

      return filter;
    } else if (isJsonFeatureFlagPercentageClientFilter(jsonFilter)) {
      // TODO: this is only working because I left the filter so unspecified in the type. Need to do
      // a little more research into what that filter's actual type is.
      return jsonFilter;
    } else {
      return jsonFilter as object;
    }
  });

  return {
    clientFilters
  };
}
