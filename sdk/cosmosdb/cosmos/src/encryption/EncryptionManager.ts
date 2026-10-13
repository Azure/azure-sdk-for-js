// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProtectedDataEncryptionKeyCache } from "./Cache/ProtectedDataEncryptionKeyCache.js";
import { KeyEncryptionKeyCache } from "./Cache/KeyEncryptionKeyCache.js";
import { EncryptionSettingsCache } from "./Cache/EncryptionSettingsCache.js";
import { ClientEncryptionKeyPropertiesCache } from "./Cache/ClientEncryptionKeyPropertiesCache.js";
import { EncryptionKeyStoreProvider } from "./EncryptionKeyStoreProvider.js";
import { Constants } from "../common/constants.js";
import type { EncryptionKeyResolver } from "./EncryptionKeyResolver/index.js";
import type { ClientEncryptionOptions } from "./ClientEncryptionOptions.js";
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
  public readonly encryptedValueFormat: "legacy" | "authenticatedType";
  public readonly legacyValueReadPolicy: "allow" | "reject";

  constructor(
    encryptionKeyResolver: EncryptionKeyResolver,
    cacheTimeToLive?: number,
    experimental?: ClientEncryptionOptions["experimental"],
  ) {
    if (
      experimental !== undefined &&
      (experimental === null || typeof experimental !== "object" || Array.isArray(experimental))
    ) {
      throw new Error("ClientEncryptionOptions.experimental must be an options object.");
    }
    const encryptedValueFormat = experimental?.encryptedValueFormat;
    if (
      encryptedValueFormat !== undefined &&
      encryptedValueFormat !== "legacy" &&
      encryptedValueFormat !== "authenticatedType"
    ) {
      throw new Error(
        'ClientEncryptionOptions.experimental.encryptedValueFormat must be "legacy" or "authenticatedType".',
      );
    }
    const legacyValueReadPolicy = experimental?.legacyValueReadPolicy;
    if (
      legacyValueReadPolicy !== undefined &&
      legacyValueReadPolicy !== "allow" &&
      legacyValueReadPolicy !== "reject"
    ) {
      throw new Error(
        'ClientEncryptionOptions.experimental.legacyValueReadPolicy must be "allow" or "reject".',
      );
    }
    this.encryptedValueFormat = encryptedValueFormat ?? "legacy";
    this.legacyValueReadPolicy =
      legacyValueReadPolicy ??
      (this.encryptedValueFormat === "authenticatedType" ? "reject" : "allow");
    if (this.encryptedValueFormat === "legacy" && this.legacyValueReadPolicy === "reject") {
      throw new Error(
        'ClientEncryptionOptions.experimental.legacyValueReadPolicy "reject" requires encryptedValueFormat "authenticatedType".',
      );
    }
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
