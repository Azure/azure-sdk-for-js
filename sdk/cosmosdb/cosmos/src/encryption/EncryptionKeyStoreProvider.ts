// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Constants } from "../common/index.js";
import { createInterval } from "#platform/utils/timers";
import type { EncryptionKeyResolver } from "./EncryptionKeyResolver/index.js";
import type { KeyEncryptionAlgorithm } from "./enums/index.js";
/**
 * Class to store encryption keys in unwrapped form and provide an interface for wrapping and unwrapping the keys.
 */
export class EncryptionKeyStoreProvider {
  public RsaOaepEncryptionAlgorithm: string = "RSA-OAEP";
  // interval for clear cache to run
  cacheRefresher: (() => void) | undefined;

  // cache to store the unwrapped encryption key. Key is the path of the encryption key
  public unwrappedEncryptionKeyCache: { [key: string]: [Date, Uint8Array] };
  public providerName: string;
  constructor(
    private keyEncryptionKeyResolver: EncryptionKeyResolver,
    private cacheTimeToLive: number,
  ) {
    this.keyEncryptionKeyResolver = keyEncryptionKeyResolver;
    this.providerName = keyEncryptionKeyResolver.encryptionKeyResolverName;
    this.unwrappedEncryptionKeyCache = {};
    this.cacheTimeToLive = cacheTimeToLive;
    this.clearCacheOnTtlExpiry();
  }

  public async wrapKey(
    encryptionKeyId: string,
    algorithm: KeyEncryptionAlgorithm,
    key: Uint8Array,
  ): Promise<Uint8Array> {
    return this.keyEncryptionKeyResolver.wrapKey(encryptionKeyId, algorithm, key);
  }

  public async unwrapKey(
    encryptionKeyId: string,
    algorithm: KeyEncryptionAlgorithm,
    wrappedKey: Uint8Array,
  ): Promise<Uint8Array> {
    if (this.cacheTimeToLive === 0) {
      return this.keyEncryptionKeyResolver.unwrapKey(encryptionKeyId, algorithm, wrappedKey);
    }
    if (!this.unwrappedEncryptionKeyCache[encryptionKeyId]) {
      const plainEncryptionKey = await this.keyEncryptionKeyResolver.unwrapKey(
        encryptionKeyId,
        algorithm,
        wrappedKey,
      );
      this.unwrappedEncryptionKeyCache[encryptionKeyId] = [new Date(), plainEncryptionKey];
    }
    return this.unwrappedEncryptionKeyCache[encryptionKeyId][1];
  }

  private async clearCacheOnTtlExpiry(): Promise<void> {
    this.cacheRefresher = createInterval(async () => {
      const now = new Date();
      for (const key in this.unwrappedEncryptionKeyCache) {
        if (
          now.getTime() - this.unwrappedEncryptionKeyCache[key][0].getTime() >
          this.cacheTimeToLive
        ) {
          delete this.unwrappedEncryptionKeyCache[key];
        }
      }
    }, Constants.EncryptionCacheRefreshIntervalInMs);
  }
}
