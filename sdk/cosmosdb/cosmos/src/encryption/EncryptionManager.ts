// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ProtectedDataEncryptionKeyCache } from "./Cache/ProtectedDataEncryptionKeyCache";
import { KeyEncryptionKeyCache } from "./Cache/KeyEncryptionKeyCache";
import { EncryptionSettingsCache } from "./Cache/EncryptionSettingsCache";
import { ClientEncryptionKeyPropertiesCache } from "./Cache/ClientEncryptionKeyPropertiesCache";
import { EncryptionKeyStoreProvider } from "./EncryptionKeyStoreProvider";
import { Constants } from "../common/constants";
import { EncryptionKeyResolver } from "./EncryptionKeyResolver";
import { EncryptionTimeToLive } from "./EncryptionTimeToLive";
/**
 * @hidden
 * Cache manager for encryption related caches.
 */
export class EncryptionManager {
  public cacheTimeToLive: number;
  public encryptionKeyStoreProvider: EncryptionKeyStoreProvider;
  public protectedDataEncryptionKeyCache: ProtectedDataEncryptionKeyCache;
  public keyEncryptionKeyCache: KeyEncryptionKeyCache;
  public encryptionSettingsCache: EncryptionSettingsCache;
  public clientEncryptionKeyPropertiesCache: ClientEncryptionKeyPropertiesCache;

  constructor(
    encryptionKeyResolver: EncryptionKeyResolver,
    encryptionKeyResolverName: string,
    cacheTimeToLive?: number,
  ) {
    this.cacheTimeToLive =
      cacheTimeToLive !== undefined
        ? cacheTimeToLive
        : EncryptionTimeToLive.FromHours(Constants.DefaultEncryptionCacheTimeToLive);
    this.encryptionKeyStoreProvider = new EncryptionKeyStoreProvider(
      encryptionKeyResolver,
      encryptionKeyResolverName,
      this.cacheTimeToLive,
    );
    this.protectedDataEncryptionKeyCache = new ProtectedDataEncryptionKeyCache(
      this.cacheTimeToLive,
    );
    this.keyEncryptionKeyCache = new KeyEncryptionKeyCache();
    this.encryptionSettingsCache = new EncryptionSettingsCache();
    this.clientEncryptionKeyPropertiesCache = new ClientEncryptionKeyPropertiesCache();
  }
}
