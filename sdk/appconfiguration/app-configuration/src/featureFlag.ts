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

/**
 * Value of a feature flag
 */
export interface FeatureFlagValue {
  /**
   * Id for the feature flag.
   */
  id?: string;
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
    if (!isFeatureFlag(setting)) {
      throw new TypeError(
        `Setting with key ${setting.key} is not a valid feature flag, make sure to have the correct content-type and a valid non-null value.`
      );
    }

    const jsonFeatureFlagValue = JSON.parse(setting.value) as JsonFeatureFlagValue;

    let key = setting.key;
    if (typeof setting.key === "string" && !setting.key.startsWith(featureFlagPrefix)) {
      key = featureFlagPrefix + setting.key;
    }
    const featureflag: ConfigurationSetting<FeatureFlagValue> = {
      ...setting,
      value: {
        ...jsonFeatureFlagValue,
        conditions: { clientFilters: jsonFeatureFlagValue.conditions.client_filters }
      },
      key,
      contentType: featureFlagContentType
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
      throw new TypeError(`FeatureFlag has an unexpected value - ${featureFlag.value}`);
    }
    let key = featureFlag.key;
    if (typeof featureFlag.key === "string" && !featureFlag.key.startsWith(featureFlagPrefix)) {
      key = featureFlagPrefix + featureFlag.key;
    }
    const jsonFeatureFlagValue: JsonFeatureFlagValue = {
      id: featureFlag.value.id ?? key.replace(featureFlagPrefix, ""),
      ...featureFlag.value,
      conditions: {
        client_filters: featureFlag.value.conditions.clientFilters
      }
    };

    const configSetting = {
      ...featureFlag,
      key,
      value: JSON.stringify(jsonFeatureFlagValue)
    };
    return configSetting;
  }
};

/**
 * Takes the ConfigurationSetting as input and returns the ConfigurationSetting<FeatureFlagValue> by parsing the value string.
 */
export const parseFeatureFlag = FeatureFlagHelper.fromConfigurationSetting;

/**
 * Lets you know if the ConfigurationSetting is a feature flag.
 *
 * [Checks if the content type is featureFlagContentType `"application/vnd.microsoft.appconfig.ff+json;charset=utf-8"`]
 */
export function isFeatureFlag(
  setting: ConfigurationSetting
): setting is ConfigurationSetting & Required<Pick<ConfigurationSetting, "value">> {
  return (
    setting && setting.contentType === featureFlagContentType && typeof setting.value === "string"
  );
}
