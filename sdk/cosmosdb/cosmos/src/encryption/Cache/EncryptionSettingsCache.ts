// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EncryptionSettings } from "../EncryptionSettings";
/**
 * The cache used to store encryption settings for a container.
 * @hidden
 */
export class EncryptionSettingsCache {
  // key is databaseId + '/' + containerId
  private encryptionSettingsCache: Map<string, EncryptionSettings>;
  private static instance: EncryptionSettingsCache;

  private constructor() {
    this.encryptionSettingsCache = new Map<string, EncryptionSettings>();
  }

  public static getInstance(): EncryptionSettingsCache {
    if (!EncryptionSettingsCache.instance) {
      EncryptionSettingsCache.instance = new EncryptionSettingsCache();
    }
    return EncryptionSettingsCache.instance;
  }

  getEncryptionSettings(key: string): EncryptionSettings | undefined {
    return this.encryptionSettingsCache.get(key);
  }

  setEncryptionSettings(key: string, encryptionSettings: EncryptionSettings): void {
    this.encryptionSettingsCache.set(key, encryptionSettings);
  }
}
