// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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