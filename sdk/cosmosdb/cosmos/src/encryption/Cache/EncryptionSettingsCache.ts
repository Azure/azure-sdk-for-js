// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EncryptionSettings } from "../EncryptionSettings";
/**
 * @hidden
 * The cache used to store encryption settings for a container.
 */
export class EncryptionSettingsCache {
  //key is databaseId + '/' + containerId
  private encryptionSettingsCache: Map<string, EncryptionSettings>;

  constructor() {
    this.encryptionSettingsCache = new Map<string, EncryptionSettings>();
  }

  public getEncryptionSettings(key: string): EncryptionSettings | undefined {
    return this.encryptionSettingsCache.get(key);
  }

  public setEncryptionSettings(key: string, encryptionSettings: EncryptionSettings): void {
    this.encryptionSettingsCache.set(key, encryptionSettings);
  }
}
