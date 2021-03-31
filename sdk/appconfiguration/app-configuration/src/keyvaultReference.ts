// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { JsonKeyVaultReference } from "./internal/jsonModels";
import { ConfigurationSetting, ConfigurationSettingParam } from "./models";

/**
 * content-type for the secret reference.
 */
export const secretReferenceContentType =
  "application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8";

/**
 * Necessary fields for updating or creating a new secret reference.
 */
export interface SecretReferenceParam extends ConfigurationSettingParam {
  /**
   * Id for the secret reference.
   */
  secretId: string;
}

/**
 * SecretReference represents a configuration setting that references as KeyVault secret.
 *
 * Secret references have "application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8" content-type.
 */
export interface SecretReference extends SecretReferenceParam, ConfigurationSetting {}

/**
 * This helper method tells you if the given setting is a SecretReference configuration setting.
 */
export function isSecretReference(setting: ConfigurationSetting): setting is SecretReference {
  return setting.contentType === secretReferenceContentType;
}

/**
 * @internal
 */
export function deserializeSecretReference(
  setting: ConfigurationSetting
): SecretReference | undefined {
  if (!setting.value) {
    return undefined;
  }

  try {
    const jsonKeyVaultRef = JSON.parse(setting.value) as JsonKeyVaultReference;
    const keyVaultRef: SecretReference = {
      ...setting,
      secretId: jsonKeyVaultRef.uri
    };

    return keyVaultRef;
  } catch (err) {
    return undefined;
  }
}

export function serializeSecretReference(_setting: SecretReference): ConfigurationSetting {
  throw new Error("Not implemented");
}
