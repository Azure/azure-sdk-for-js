// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Constants } from "../common";
import type { EncryptionKeyResolver } from "./EncryptionKeyResolver";
import type { KeyEncryptionAlgorithm } from "./enums";
/**
 * Class to store encryption keys in unwrapped form and provide an interface for wrapping and unwrapping the keys.
 */
export class EncryptionKeyStoreProvider {
  public RsaOaepEncryptionAlgorithm: string = "RSA-OAEP";
  // interval for clear cache to run
  cacheRefresher: NodeJS.Timeout;

  // cache to store the unwrapped encryption key. Key is the path of the encryption key
  public unwrappedEncryptionKeyCache: { [key: string]: [Date, Buffer] };
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
    key: Buffer,
  ): Promise<Buffer> {
    const uInt8ArrayKey = new Uint8Array(key);
    const wrappedEncryptionKey = await this.keyEncryptionKeyResolver.wrapKey(
      encryptionKeyId,
      algorithm,
      uInt8ArrayKey,
    );
    return Buffer.from(wrappedEncryptionKey);
  }

  public async unwrapKey(
    encryptionKeyId: string,
    algorithm: KeyEncryptionAlgorithm,
    wrappedKey: Buffer,
  ): Promise<Buffer> {
    if (this.cacheTimeToLive === 0) {
      const res = await this.keyEncryptionKeyResolver.unwrapKey(
        encryptionKeyId,
        algorithm,
        wrappedKey,
      );
      return Buffer.from(res);
    }
    if (!this.unwrappedEncryptionKeyCache[encryptionKeyId]) {
      const wrappedKeyUint8Array = new Uint8Array(wrappedKey);
      const plainEncryptionKey = await this.keyEncryptionKeyResolver.unwrapKey(
        encryptionKeyId,
        algorithm,
        wrappedKeyUint8Array,
      );
      const plainEncryptionKeyBuffer = Buffer.from(plainEncryptionKey);
      this.unwrappedEncryptionKeyCache[encryptionKeyId] = [new Date(), plainEncryptionKeyBuffer];
    }
    return this.unwrappedEncryptionKeyCache[encryptionKeyId][1];
  }

  private async clearCacheOnTtlExpiry(): Promise<void> {
    this.cacheRefresher = setInterval(() => {
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
