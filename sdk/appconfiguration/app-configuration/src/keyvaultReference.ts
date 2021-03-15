// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { JsonKeyVaultReference } from "./internal/jsonModels";
import { ConfigurationSetting, ConfigurationSettingParam } from "./models";

export const keyVaultReferenceContentType =
  "application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8";

export interface KeyVaultReferenceParam extends ConfigurationSettingParam {
  keyVaultSecretUri: string;
}

export interface KeyVaultReference extends KeyVaultReferenceParam, ConfigurationSetting {
}

export function isKeyVaultReference(setting: ConfigurationSetting): setting is KeyVaultReference {
  return setting.contentType === keyVaultReferenceContentType;
}

/**
 * @internal
 */
export function deserializeKeyVaultReference(setting: ConfigurationSetting): KeyVaultReference | undefined {
  if (!setting.value) {
    return undefined;
  }

  try {
    const jsonKeyVaultRef = JSON.parse(setting.value) as JsonKeyVaultReference;
    const keyVaultRef: KeyVaultReference = {
      ...setting,
      keyVaultSecretUri: jsonKeyVaultRef.uri
    };

    return keyVaultRef;
  } catch (err) {
    return undefined;
  }
}