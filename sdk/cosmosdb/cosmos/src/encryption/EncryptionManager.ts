// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProtectedDataEncryptionKeyCache } from "./Cache/ProtectedDataEncryptionKeyCache";
import { KeyEncryptionKeyCache } from "./Cache/KeyEncryptionKeyCache";
import { EncryptionSettingsCache } from "./Cache/EncryptionSettingsCache";
import { ClientEncryptionKeyPropertiesCache } from "./Cache/ClientEncryptionKeyPropertiesCache";
import { EncryptionKeyStoreProvider } from "./EncryptionKeyStoreProvider";
import { Constants } from "../common/constants";
import type { EncryptionKeyResolver } from "./EncryptionKeyResolver";
/**
 * Cache manager for encryption related caches.
 * @hidden
 */
export class EncryptionManager {
  public cacheTimeToLive: number;
  public encryptionKeyStoreProvider: EncryptionKeyStoreProvider;
  public protectedDataEncryptionKeyCache: ProtectedDataEncryptionKeyCache;
  public keyEncryptionKeyCache: KeyEncryptionKeyCache;
  public encryptionSettingsCache: EncryptionSettingsCache;
  public clientEncryptionKeyPropertiesCache: ClientEncryptionKeyPropertiesCache;

  constructor(encryptionKeyResolver: EncryptionKeyResolver, cacheTimeToLive?: number) {
    this.cacheTimeToLive =
      cacheTimeToLive !== undefined
        ? cacheTimeToLive
        : Constants.DefaultEncryptionCacheTimeToLiveInSeconds;
    const cacheTtlInMs = this.getCacheTTlInMs();
    this.encryptionKeyStoreProvider = new EncryptionKeyStoreProvider(
      encryptionKeyResolver,
      cacheTtlInMs,
    );
    this.protectedDataEncryptionKeyCache = new ProtectedDataEncryptionKeyCache(cacheTtlInMs);
    this.keyEncryptionKeyCache = new KeyEncryptionKeyCache();
    this.encryptionSettingsCache = new EncryptionSettingsCache();
    this.clientEncryptionKeyPropertiesCache = new ClientEncryptionKeyPropertiesCache();
  }

  /**
   * Converts the EncryptionTimeToLive instance to a number (milliseconds).
   */
  private getCacheTTlInMs(): number {
    const millisecondsPerSecond = 1000;
    return Number(this.cacheTimeToLive * millisecondsPerSecond);
  }
}
