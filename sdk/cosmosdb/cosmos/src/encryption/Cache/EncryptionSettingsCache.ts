// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientEncryptionPolicy } from "../ClientEncryptionPolicy";
import { EncryptionSettings } from "../EncryptionSettings";
import { EncryptionSettingForProperty } from "../EncryptionSettingForProperty";
/**
 * The cache used to store encryption settings for a container.
 * @hidden
 */
export class EncryptionSettingsCache {
  // key is databaseRid + '/' + containerRid
  private encryptionSettingsCache: Map<string, EncryptionSettings>;

  public constructor() {
    this.encryptionSettingsCache = new Map<string, EncryptionSettings>();
  }

  public async createAndSetEncryptionSettings(
    id: string,
    containerRid: string,
    partitionKeyPaths: string[],
    clientEncryptionPolicy: ClientEncryptionPolicy,
  ): Promise<EncryptionSettings> {
    const encryptionSettings = new EncryptionSettings(id, containerRid, partitionKeyPaths);
    if (!clientEncryptionPolicy) return null;
    encryptionSettings.validatePolicyFormatVersion(clientEncryptionPolicy, partitionKeyPaths);

    for (const includedPath of clientEncryptionPolicy.includedPaths) {
      const encryptionSettingForProperty = new EncryptionSettingForProperty(includedPath);
      encryptionSettings.pathsToEncrypt.push(includedPath.path);
      encryptionSettings.setEncryptionProperty(includedPath.path, encryptionSettingForProperty);
    }
    this.setEncryptionSettings(id, encryptionSettings);
    return encryptionSettings;
  }

  public getEncryptionSettings(key: string): EncryptionSettings | undefined {
    return this.encryptionSettingsCache.get(key);
  }

  public setEncryptionSettings(key: string, encryptionSettings: EncryptionSettings): void {
    this.encryptionSettingsCache.set(key, encryptionSettings);
  }
}
