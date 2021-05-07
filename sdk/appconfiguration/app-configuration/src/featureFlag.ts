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
    clientFilters: Record<string, unknown>[];
  };
  /**
   * Description of the feature.
   */
  description?: string;
  /**
   * Boolean flag to say if the feature flag is enabled.
   */
  enabled: boolean;
  id: string;
}

export const FeatureFlagHelper = {
  /**
   * Lets you know if the ConfigurationSetting is a featureFlag ConfigurationSetting based on the contentType.
   */
  isFeatureFlagConfigurationSetting: (setting: ConfigurationSetting): boolean =>
    setting.contentType === featureFlagContentType,
  /**
   * Takes the value (string) of a ConfigurationSetting and returns the parsed FeatureFlag value.
   */
  deserializeFeatureFlagValue: (value: string): FeatureFlagValue => {
    let jsonFeatureFlagValue: JsonFeatureFlagValue;
    try {
      jsonFeatureFlagValue = JSON.parse(value) as JsonFeatureFlagValue;
    } catch (err) {
      // best effort - if it doesn't deserialize properly we'll just throw
      throw new Error("");
    }

    const featureflagValue: FeatureFlagValue = {
      ...jsonFeatureFlagValue,
      conditions: { clientFilters: jsonFeatureFlagValue.conditions.client_filters }
    };
    return featureflagValue;
  },
  /**
   * Takes the FeatureFlag value (JSON) and returns a string which is encoded with the props from the FeatureFlag value.
   * This value can be used in the new ConfigurationSetting.
   */
  serializeFeatureFlagValue: (value: FeatureFlagValue): string | undefined => {
    const jsonFeatureFlagValue: JsonFeatureFlagValue = {
      ...value,
      conditions: { client_filters: value.conditions.clientFilters }
    };
    let stringifiedValue: string;
    try {
      stringifiedValue = JSON.stringify(jsonFeatureFlagValue);
    } catch (err) {
      // best effort - if it doesn't serialize properly we'll just throw
      throw new Error("");
    }

    return stringifiedValue;
  }
};
