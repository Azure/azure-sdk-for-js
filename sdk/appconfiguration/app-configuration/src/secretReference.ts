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

/**
 * @internal
 */
export const SecretReferenceHelper = {
  /**
   * Takes the SecretReference (JSON) and returns a ConfigurationSetting (with the props encodeed in the value).
   */
  toConfigurationSettingParam: (
    secretReference: ConfigurationSettingParam<SecretReferenceValue>
  ): ConfigurationSettingParam => {
    if (!secretReference.value) {
      throw new TypeError(`SecretReference has an unexpected value - ${secretReference.value}`);
    }

    const jsonSecretReferenceValue: JsonSecretReferenceValue = {
      uri: secretReference.value.secretId,
    };

    const configSetting = {
      ...secretReference,
      value: JSON.stringify(jsonSecretReferenceValue),
    };
    return configSetting;
  },
};

/**
 * Takes the ConfigurationSetting as input and returns the ConfigurationSetting<SecretReferenceValue> by parsing the value string.
 */
export function parseSecretReference(
  setting: ConfigurationSetting
): ConfigurationSetting<SecretReferenceValue> {
  if (!isSecretReference(setting)) {
    throw TypeError(
      `Setting with key ${setting.key} is not a valid SecretReference, make sure to have the correct content-type and a valid non-null value.`
    );
  }

  const jsonSecretReferenceValue = JSON.parse(setting.value) as JsonSecretReferenceValue;

  const secretReference: ConfigurationSetting<SecretReferenceValue> = {
    ...setting,
    value: { secretId: jsonSecretReferenceValue.uri },
  };
  return secretReference;
}

/**
 * Lets you know if the ConfigurationSetting is a secret reference.
 *
 * [Checks if the content type is secretReferenceContentType `"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8"`]
 */
export function isSecretReference(
  setting: ConfigurationSetting
): setting is ConfigurationSetting & Required<Pick<ConfigurationSetting, "value">> {
  return (
    setting &&
    setting.contentType === secretReferenceContentType &&
    typeof setting.value === "string"
  );
}
