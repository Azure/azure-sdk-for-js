// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConfigurationSetting, ConfigurationSettingParam } from "./models.js";
import type { JsonFeatureFlagValue } from "./internal/jsonModels.js";
import { logger } from "./logger.js";

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
   * [More Info](https://learn.microsoft.com/azure/azure-app-configuration/howto-feature-filters-aspnet-core)
   */
  conditions: {
    clientFilters: { name: string; parameters?: Record<string, unknown> }[];
    requirementType?: "All" | "Any";
  };
  /**
   * Description of the feature.
   */
  description?: string;
  /**
   * Boolean flag to say if the feature flag is enabled.
   */
  enabled: boolean;
  /**
   * Display name for the feature to use for display rather than the ID.
   */
  displayName?: string;
}

/**
 * @internal
 */
export const FeatureFlagHelper = {
  /**
   * Takes the FeatureFlag (JSON) and returns a ConfigurationSetting (with the props encodeed in the value).
   */
  toConfigurationSettingParam: (
    featureFlag: ConfigurationSettingParam<FeatureFlagValue>,
  ): ConfigurationSettingParam => {
    logger.info("Encoding FeatureFlag value in a ConfigurationSetting:", featureFlag);
    if (!featureFlag.value) {
      logger.error("FeatureFlag has an unexpected value", featureFlag);
      throw new TypeError(`FeatureFlag has an unexpected value - ${featureFlag.value}`);
    }
    let key = featureFlag.key;
    if (typeof featureFlag.key === "string" && !featureFlag.key.startsWith(featureFlagPrefix)) {
      key = featureFlagPrefix + featureFlag.key;
    }
    const jsonFeatureFlagValue: JsonFeatureFlagValue = {
      id: featureFlag.value.id ?? key.replace(featureFlagPrefix, ""),
      enabled: featureFlag.value.enabled,
      description: featureFlag.value.description,
      conditions: {
        client_filters: featureFlag.value.conditions.clientFilters,
        requirement_type: featureFlag.value.conditions.requirementType ?? "Any",
      },
      display_name: featureFlag.value.displayName,
    };

    const configSetting = {
      ...featureFlag,
      key,
      value: JSON.stringify(jsonFeatureFlagValue),
    };
    return configSetting;
  },
};

/**
 * Takes the ConfigurationSetting as input and returns the ConfigurationSetting<FeatureFlagValue> by parsing the value string.
 */
export function parseFeatureFlag(
  setting: ConfigurationSetting,
): ConfigurationSetting<FeatureFlagValue> {
  logger.info("Parsing the value to return the FeatureFlagValue", setting);
  if (!isFeatureFlag(setting)) {
    logger.error("Invalid FeatureFlag input", setting);
    throw TypeError(
      `Setting with key ${setting.key} is not a valid FeatureFlag, make sure to have the correct content-type and a valid non-null value.`,
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
      id: jsonFeatureFlagValue.id,
      enabled: jsonFeatureFlagValue.enabled ?? false,
      description: jsonFeatureFlagValue.description,
      displayName: jsonFeatureFlagValue.display_name,
      conditions: jsonFeatureFlagValue.conditions
        ? {
            clientFilters: jsonFeatureFlagValue.conditions.client_filters,
            requirementType: jsonFeatureFlagValue.conditions.requirement_type,
          }
        : { clientFilters: [] },
    },
    key,
    contentType: featureFlagContentType,
  };

  return featureflag;
}

/**
 * Lets you know if the ConfigurationSetting is a feature flag.
 *
 * [Checks if the content type is featureFlagContentType `"application/vnd.microsoft.appconfig.ff+json;charset=utf-8"`]
 */
export function isFeatureFlag(
  setting: ConfigurationSetting,
): setting is ConfigurationSetting & Required<Pick<ConfigurationSetting, "value">> {
  return (
    setting && setting.contentType === featureFlagContentType && typeof setting.value === "string"
  );
}
