// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { JsonSecretReferenceValue } from "./internal/jsonModels";
import { ConfigurationSetting, ConfigurationSettingParam } from "./models";

/**
 * content-type for the secret reference.
 */
export const secretReferenceContentType =
  "application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8";

/**
 * Necessary fields for updating or creating a new secret reference.
 */
export interface SecretReferenceValue {
  /**
   * Id for the secret reference.
   */
  secretId: string;
}

export const SecretReferenceHelper = {
  /**
   * Takes the ConfigurationSetting and returns the FeatureFlag.
   */
  fromConfigurationSetting: (
    setting: ConfigurationSetting
  ): ConfigurationSetting<SecretReferenceValue> => {
    if (!isSecretReference(setting)) {
      throw new Error("Not a SecretReference..");
    }
    let jsonSecretReferenceValue: JsonSecretReferenceValue;
    try {
      if (!setting.value || typeof setting.value !== "string") {
        throw new Error("");
      }
      jsonSecretReferenceValue = JSON.parse(setting.value) as JsonSecretReferenceValue;
    } catch (err) {
      // best effort - if it doesn't deserialize properly we'll just throw
      throw new Error("");
    }

    const featureflag: ConfigurationSetting<SecretReferenceValue> = {
      ...setting,
      value: { secretId: jsonSecretReferenceValue.uri }
    };
    return featureflag;
  },
  /**
   * Takes the FeatureFlag (JSON) and returns a ConfigurationSetting (with the props encodeed in the value).
   */
  toConfigurationSettingParam: (
    secretReference: ConfigurationSettingParam<SecretReferenceValue>
  ): ConfigurationSettingParam => {
    if (!secretReference.value) {
      throw new Error("Value is not defined");
    }

    const jsonSecretReferenceValue: JsonSecretReferenceValue = {
      uri: secretReference.value.secretId
    };

    let stringifiedValue: string;
    try {
      stringifiedValue = JSON.stringify(jsonSecretReferenceValue);
    } catch (err) {
      // best effort - if it doesn't serialize properly we'll just throw
      throw new Error("");
    }

    const configSetting = {
      ...secretReference,
      value: stringifiedValue
    };
    return configSetting;
  }
};

/**
 * Takes the ConfigurationSetting as input and returns the ConfigurationSetting<SecretReferenceValue> by parsing the value string.
 */
export const parseSecretReference = SecretReferenceHelper.fromConfigurationSetting;

/**
 * Lets you know if the ConfigurationSetting is a secret reference.
 *
 * [Checks if the content type is secretReferenceContentType `"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8"`]
 */
export const isSecretReference = (setting: ConfigurationSetting): boolean => {
  return setting && setting.contentType === secretReferenceContentType;
};
