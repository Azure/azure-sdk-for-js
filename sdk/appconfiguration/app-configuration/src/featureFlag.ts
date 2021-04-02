// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  isJsonFeatureFlagPercentageClientFilter,
  isJsonFeatureFlagTargetingClientFilter,
  isJsonFeatureFlagTimeWindowClientFilter,
  JsonFeatureFlag,
  JsonFeatureFlagPercentageClientFilter,
  JsonFeatureFlagTargetingClientFilter,
  JsonFeatureFlagTimeWindowClientFilter
} from "./internal/jsonModels";
import { isObjectWithProperties } from "./internal/typeguards";
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
      | Record<string, unknown>
    )[];
  };
  /**
   * Description of the feature.
   */
  description?: string;
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
    audience: {
      users: string[];
      groups: {
        name: string;
        rolloutPercentage: number;
      }[];
      defaultRolloutPercentage: number;
    };
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
    /**
     * Start time of the time window.
     * Expected UTCString - Example: "Wed, 01 May 2021 13:59:59 GMT"
     *
     * UTCString can be obtained from `new Date().toUTCString()`.
     * Use `Date.parse()` to parse the UTCString as Date.
     */
    start: string;
    /**
     * End time of the time window.
     * Expected UTCString - Example: "Wed, 05 May 2021 13:59:59 GMT"
     *
     * UTCString can be obtained from `new Date().toUTCString()`.
     * Use `Date.parse()` to parse the UTCString as Date.
     */
    end: string;
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
   * Value is expected to be from 0 to 100. SDK doesn't validate the value.
   */
  parameters: {
    value: number;
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
  clientFilter: unknown
): clientFilter is FeatureFlagTargetingClientFilter {
  return (
    isObjectWithProperties(clientFilter, ["name"]) && clientFilter.name === "Microsoft.Targeting"
  );
}

/**
 * This helper method tells you if the given client filter has the name "Microsoft.TimeWindow".
 */
function isFeatureFlagTimeWindowClientFilter(
  clientFilter: unknown
): clientFilter is FeatureFlagTimeWindowClientFilter {
  return (
    isObjectWithProperties(clientFilter, ["name"]) && clientFilter.name === "Microsoft.TimeWindow"
  );
}

/**
 * This helper method tells you if the given client filter has the name "Microsoft.Percentage".
 */
function isFeatureFlagPercentageClientFilter(
  clientFilter: unknown
): clientFilter is FeatureFlagPercentageClientFilter {
  return (
    isObjectWithProperties(clientFilter, ["name"]) && clientFilter.name === "Microsoft.Percentage"
  );
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
  obj: unknown
): obj is FeatureFlagType<T> {
  switch (type) {
    case "targeting":
      return isFeatureFlagTargetingClientFilter(obj);
    case "timeWindow":
      return isFeatureFlagTimeWindowClientFilter(obj);
    case "percentage":
      return isFeatureFlagPercentageClientFilter(obj);
    default:
      return false;
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
  featureFlag.enabled = Boolean(jsonFeatureFlag.enabled);
  featureFlag.description = jsonFeatureFlag.description;

  return setting;
}

export function serializeFeatureFlagParam(setting: FeatureFlagParam): ConfigurationSettingParam {
  const value: JsonFeatureFlag & { id: string } = {
    id: setting.key.replace(featureFlagPrefix, ""),
    description: setting.description,
    enabled: setting.enabled,
    conditions: convertToJsonConditions(setting.conditions)
  };
  const configurationSetting: ConfigurationSettingParam = {
    key: setting.key,
    label: setting.label,
    contentType: setting.contentType,
    etag: setting.etag,
    tags: setting.tags,
    value: JSON.stringify(value)
  };
  return configurationSetting;
}

/**
 * @internal
 */
export function convertJsonConditions(
  conditions: JsonFeatureFlag["conditions"]
): FeatureFlag["conditions"] {
  const clientFilters = !conditions.client_filters
    ? []
    : conditions.client_filters.map((jsonFilter) => {
        if (isJsonFeatureFlagTargetingClientFilter(jsonFilter)) {
          const filter: FeatureFlagTargetingClientFilter = {
            name: jsonFilter.name,
            parameters: {
              audience: {
                groups:
                  jsonFilter.parameters.Audience.Groups.map((grp) => ({
                    name: grp.Name,
                    rolloutPercentage: grp.RolloutPercentage
                  })) || [],
                users: jsonFilter.parameters.Audience.Users || [],
                defaultRolloutPercentage: jsonFilter.parameters.Audience.DefaultRolloutPercentage
              }
            }
          };

          return filter;
        } else if (isJsonFeatureFlagTimeWindowClientFilter(jsonFilter)) {
          const filter: FeatureFlagTimeWindowClientFilter = {
            name: jsonFilter.name,
            parameters: {
              start: jsonFilter.parameters.Start,
              end: jsonFilter.parameters.End
            }
          };

          return filter;
        } else if (isJsonFeatureFlagPercentageClientFilter(jsonFilter)) {
          const filter: FeatureFlagPercentageClientFilter = {
            name: jsonFilter.name,
            parameters: {
              value: jsonFilter.parameters.Value
            }
          };
          return filter;
        } else {
          return jsonFilter;
        }
      });

  return {
    clientFilters
  };
}

/**
 * @internal
 */
export function convertToJsonConditions(
  conditions: FeatureFlag["conditions"]
): JsonFeatureFlag["conditions"] {
  const client_filters = conditions.clientFilters.map((filter) => {
    if (isFeatureFlagTargetingClientFilter(filter)) {
      const jsonFilter: JsonFeatureFlagTargetingClientFilter = {
        name: filter.name,
        parameters: {
          Audience: {
            Groups:
              filter.parameters.audience?.groups.map((grp) => ({
                Name: grp.name,
                RolloutPercentage: grp.rolloutPercentage
              })) || [],
            Users: filter.parameters.audience?.users || [],
            DefaultRolloutPercentage: filter.parameters.audience.defaultRolloutPercentage
          }
        }
      };

      return jsonFilter;
    } else if (isFeatureFlagTimeWindowClientFilter(filter)) {
      const jsonFilter: JsonFeatureFlagTimeWindowClientFilter = {
        name: filter.name,
        parameters: {
          Start: filter.parameters.start,
          End: filter.parameters.end
        }
      };

      return jsonFilter;
    } else if (isFeatureFlagPercentageClientFilter(filter)) {
      const jsonFilter: JsonFeatureFlagPercentageClientFilter = {
        name: filter.name,
        parameters: {
          Value: filter.parameters.value
        }
      };
      return jsonFilter;
    } else {
      return filter;
    }
  });

  return {
    client_filters
  };
}
