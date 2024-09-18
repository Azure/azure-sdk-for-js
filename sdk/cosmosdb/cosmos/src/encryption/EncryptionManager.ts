// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProtectedDataEncryptionKeyCache } from "./Cache/ProtectedDataEncryptionKeyCache";
import { KeyEncryptionKeyCache } from "./Cache/KeyEncryptionKeyCache";
import { EncryptionSettingsCache } from "./Cache/EncryptionSettingsCache";
import { ClientEncryptionKeyPropertiesCache } from "./Cache/ClientEncryptionKeyPropertiesCache";
import { EncryptionKeyStoreProvider } from "./EncryptionKeyStoreProvider";
import { Constants } from "../common/constants";
import { EncryptionKeyResolver } from "./EncryptionKeyResolver";
import { EncryptionTimeToLive } from "./EncryptionTimeToLive";
/**
 * Cache manager for encryption related caches.
 * @hidden
 */
export class EncryptionManager {
  public cacheTimeToLive: EncryptionTimeToLive;
  public encryptionKeyStoreProvider: EncryptionKeyStoreProvider;
  public protectedDataEncryptionKeyCache: ProtectedDataEncryptionKeyCache;
  public keyEncryptionKeyCache: KeyEncryptionKeyCache;
  public encryptionSettingsCache: EncryptionSettingsCache;
  public clientEncryptionKeyPropertiesCache: ClientEncryptionKeyPropertiesCache;

  constructor(
    encryptionKeyResolver: EncryptionKeyResolver,
    encryptionKeyResolverName: string,
    cacheTimeToLive?: EncryptionTimeToLive,
  ) {
    this.cacheTimeToLive =
      cacheTimeToLive !== undefined
        ? cacheTimeToLive
        : EncryptionTimeToLive.FromHours(Constants.DefaultEncryptionCacheTimeToLive);
    const cacheTtlInMs = this.getCacheTtlInMilliseconds();
    this.encryptionKeyStoreProvider = new EncryptionKeyStoreProvider(
      encryptionKeyResolver,
      encryptionKeyResolverName,
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
  private getCacheTtlInMilliseconds(): number {
    if (this.cacheTimeToLive === EncryptionTimeToLive.NoTtl()) {
      return 0;
    } else {
      return Number(this.cacheTimeToLive);
    }
  }
}
