// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { JsonFeatureFlagValue } from "./internal/jsonModels";
import { ConfigurationSetting } from "./models";

/**
 * The prefix for feature flags.
 */
export const featureFlagPrefix = ".appconfig.featureflag/";

/**
 * The content type for a FeatureFlag
 */
export const featureFlagContentType = "application/vnd.microsoft.appconfig.ff+json;charset=utf-8";

export interface FeatureFlagValue {
  /**
   * A Feature filter consistently evaluates the state of a feature flag.
   * Our feature management library supports three types of built-in filters: Targeting, TimeWindow, and Percentage.
   * Custom filters can also be created based on different factors, such as device used, browser types, geographic location, etc.
   *
   * [More Info](https://docs.microsoft.com/en-us/azure/azure-app-configuration/howto-feature-filters-aspnet-core)
   */
  conditions: {
    clientFilters: { name: string; parameters?: Record<string, unknown> }[];
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

export interface FeatureFlag extends Omit<ConfigurationSetting, "value"> {
  value: FeatureFlagValue;
}

export const FeatureFlagHelper = {
  /**
   * Lets you know if the ConfigurationSetting is a featureFlag ConfigurationSetting based on the contentType.
   */
  isFeatureFlagConfigurationSetting: (setting: ConfigurationSetting): boolean =>
    setting.contentType === featureFlagContentType,
  /**
   * Takes the ConfigurationSetting and returns the FeatureFlag.
   */
  fromConfigurationSetting: (setting: ConfigurationSetting): FeatureFlag => {
    let jsonFeatureFlagValue: JsonFeatureFlagValue;
    try {
      if (!setting.value || typeof setting.value !== "string") {
        throw new Error("");
      }
      jsonFeatureFlagValue = JSON.parse(setting.value) as JsonFeatureFlagValue;
      delete jsonFeatureFlagValue.id; // This is the stripped version of "key" - deleting to not allow multiple truths
    } catch (err) {
      // best effort - if it doesn't deserialize properly we'll just throw
      throw new Error("");
    }

    const featureflag: FeatureFlag = {
      ...setting,
      value: {
        ...jsonFeatureFlagValue,
        conditions: { clientFilters: jsonFeatureFlagValue.conditions.client_filters }
      }
      // TODO: Add prefix if doesn't exist
      // TODO: Add contentType if doesn't exist
    };
    return featureflag;
  },
  /**
   * Takes the FeatureFlag (JSON) and returns a ConfigurationSetting (with the props encodeed in the value).
   */
  toConfigurationSetting: (featureFlag: FeatureFlag): ConfigurationSetting => {
    // TODO: Add prefix if doesn't exist
    // TODO: Add contentType if doesn't exist
    const jsonFeatureFlagValue: JsonFeatureFlagValue = {
      ...featureFlag.value,
      conditions: {
        client_filters: featureFlag.value.conditions.clientFilters
      },
      id: featureFlag.key.replace(featureFlagPrefix, "")
    };

    let stringifiedValue: string;
    try {
      stringifiedValue = JSON.stringify(jsonFeatureFlagValue);
    } catch (err) {
      // best effort - if it doesn't serialize properly we'll just throw
      throw new Error("");
    }

    const configSetting = {
      ...featureFlag,
      value: stringifiedValue
    };
    return configSetting;
  }
};
