// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { JsonKeyVaultReference } from "./internal/jsonModels";
import { ConfigurationSetting, ConfigurationSettingParam } from "./models";

export const secretReferenceContentType =
  "application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8";

export interface SecretReferenceParam extends ConfigurationSettingParam {
  secretId: string;
}

export interface SecretReference extends SecretReferenceParam, ConfigurationSetting {
}

export function isSecretReference(setting: ConfigurationSetting): setting is SecretReference {
  return setting.contentType === secretReferenceContentType;
}

/**
 * @internal
 */
export function deserializeSecretReference(setting: ConfigurationSetting): SecretReference | undefined {
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