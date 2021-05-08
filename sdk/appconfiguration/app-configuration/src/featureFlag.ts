// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { JsonFeatureFlagValue } from "./internal/jsonModels";
import { ConfigurationSetting, ConfigurationSettingParam } from "./models";

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

export const FeatureFlagHelper = {
  /**
   * Takes the ConfigurationSetting and returns the FeatureFlag.
   */
  fromConfigurationSetting: (
    setting: ConfigurationSetting
  ): ConfigurationSetting<FeatureFlagValue> => {
    if (!isFeatureFlagConfigurationSetting(setting)) {
      throw new Error("Not a feature flag..");
    }
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

    const featureflag: ConfigurationSetting<FeatureFlagValue> = {
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
  toConfigurationSettingParam: (
    featureFlag: ConfigurationSettingParam<FeatureFlagValue>
  ): ConfigurationSettingParam => {
    if (!featureFlag.value) {
      throw new Error("Value is not defined");
    }
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

/**
 * Takes the ConfigurationSetting and returns the FeatureFlag which can be modified and sent using the `AppConfiguration.{add/set}ConfigurationSetting` methods.
 */
export const parseAsFeatureFlag = FeatureFlagHelper.fromConfigurationSetting;

/**
 * Lets you know if the ConfigurationSetting is a feature flag ConfigurationSetting based on the contentType.
 */
export const isFeatureFlagConfigurationSetting = (setting: ConfigurationSetting): boolean => {
  return setting && setting.contentType === featureFlagContentType;
};
