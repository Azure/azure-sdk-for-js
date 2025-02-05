// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ClientEncryptionPolicy } from "../ClientEncryptionPolicy";
import { EncryptionSettings } from "../EncryptionSettings";
import { EncryptionSettingForProperty } from "../EncryptionSettingForProperty";
/**
 * The cache used to store encryption settings for a container.
 * see {@link EncryptionSettings}
 * @hidden
 */
export class EncryptionSettingsCache {
  // key is databaseRid + '/' + containerRid
  private cache: Map<string, EncryptionSettings>;

  public constructor() {
    this.cache = new Map<string, EncryptionSettings>();
  }

  public async create(
    id: string,
    containerRid: string,
    partitionKeyPaths: string[],
    clientEncryptionPolicy: ClientEncryptionPolicy,
  ): Promise<EncryptionSettings> {
    const encryptionSettings = new EncryptionSettings(id, containerRid, partitionKeyPaths);
    if (!clientEncryptionPolicy) return;

    for (const includedPath of clientEncryptionPolicy.includedPaths) {
      const encryptionSettingForProperty = new EncryptionSettingForProperty(includedPath);
      encryptionSettings.pathsToEncrypt.push(includedPath.path);
      encryptionSettings.setEncryptionSettingForProperty(
        includedPath.path,
        encryptionSettingForProperty,
      );
    }
    this.set(id, encryptionSettings);
    return encryptionSettings;
  }

  public get(key: string): EncryptionSettings | undefined {
    return this.cache.get(key);
  }

  public set(key: string, encryptionSettings: EncryptionSettings): void {
    this.cache.set(key, encryptionSettings);
  }
}
