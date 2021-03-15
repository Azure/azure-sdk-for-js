// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isJsonFeatureFlagPercentageClientFilter, isJsonFeatureFlagTargetingClientFilter, isJsonFeatureFlagTimeWindowClientFilter, JsonFeatureFlag } from "./internal/jsonModels";
import { ConfigurationSetting, ConfigurationSettingParam } from "./models";

/**
 * The prefix for feature flags.
 */
export const featureFlagPrefix = ".appconfig.featureflag/";

/**
 * The content type for a FeatureFlag
 */
export const featureFlagContentType = "application/vnd.microsoft.appconfig.ff+json;charset=utf-8";

export interface FeatureFlagParam extends ConfigurationSettingParam {
  // TODO: can we hoist 'clientFilters' higher and avoid this sub-field? Need to talk to team.
  conditions: {     
    clientFilters: (
      | FeatureFlagTargetingClientFilter
      | FeatureFlagTimeWindowClientFilter
      | FeatureFlagPercentageClientFilter
      | object
    )[];
  };
  description?: string;
  displayName: string;
  enabled: boolean;
};

export interface FeatureFlag extends FeatureFlagParam, ConfigurationSetting {}

export interface FeatureFlagTargetingClientFilter {
  name: "Microsoft.Targeting";
  parameters: {     // TODO: can we hoist these values up directly into the filter, rather than having this 'parameters' intermediary.
    audience: {
      users: string[];
      groups: {
        name: string;
        rolloutPercentage: number;
      }[];
    };
    defaultRolloutPercentage: number;

    // here to avoid potential slicing of underlying attributes as objects expand
    // in the future.
    [key: string]: any;
  };
}

export interface FeatureFlagTimeWindowClientFilter {
  name: "Microsoft.TimeWindow";
  parameters: {
    start: string;
    end: string;
    [key: string]: any;
  };
}

export interface FeatureFlagPercentageClientFilter {
  name: "Microsoft.Percentage";
  parameters: {
    [key: string]: any;
  };
}

export function isFeatureFlag(
  setting: ConfigurationSetting | FeatureFlag
): setting is FeatureFlag {
  return setting.contentType === featureFlagContentType;
}

/**
 * @internal
 */
 export function isFeatureFlagTargetingClientFilter(clientFilter: any): clientFilter is FeatureFlagTargetingClientFilter {
  return clientFilter.name === "Microsoft.Targeting";
}

/**
 * @internal
 */
export function isFeatureFlagTimeWindowClientFilter(clientFilter: any): clientFilter is FeatureFlagTimeWindowClientFilter {
  return clientFilter.name === "Microsoft.TimeWindow";
}

  /**
 * @internal
 */
export function isFeatureFlagPercentageClientFilter(clientFilter: any): clientFilter is FeatureFlagPercentageClientFilter {
    return clientFilter.name === "Microsoft.Percentage";
}

export function deserializeFeatureFlag(setting: ConfigurationSetting): FeatureFlag | undefined {
  if (!isFeatureFlag(setting) || !setting.value) {
    return undefined;
  }

  let jsonFeatureFlag: JsonFeatureFlag

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
  throw new Error("Not implemented")
}

/**
 * @internal
 */
export function convertJsonConditions(conditions: JsonFeatureFlag['conditions']): FeatureFlag['conditions'] {
  const clientFilters = conditions.client_filters.map((jsonFilter) => {
    if (isJsonFeatureFlagTargetingClientFilter(jsonFilter)) {
      // try not to slice any unknown attributes
      const filter: FeatureFlagTargetingClientFilter = {
        name: jsonFilter.name,
        parameters: {
          audience: {
            groups: jsonFilter.parameters.Audience?.Groups.map((grp) => ({
              name: grp.Name,
              rolloutPercentage: grp.RolloutPercentage
            })) || [],
            users: jsonFilter.parameters.Audience?.Users || [],
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