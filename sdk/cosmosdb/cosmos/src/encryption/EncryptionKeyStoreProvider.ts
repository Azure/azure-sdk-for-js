// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EncryptionKeyResolver } from "./EncryptionKeyResolver";
import { KeyEncryptionKeyAlgorithm } from "./enums";
/**
 * Class to store encryption keys in unwrapped form and provide an interface for wrapping and unwrapping the keys.
 */
export class EncryptionKeyStoreProvider {
  public RsaOaepEncryptionAlgorithm: string = "RSA-OAEP";

  // cache to store the unwrapped encryption key. Key is the path of the encryption key
  public unwrappedEncryptionKeyCache: { [key: string]: [Date, Buffer] };

  constructor(
    private keyEncryptionKeyResolver: EncryptionKeyResolver,
    public providerName: string,
    private cacheTimeToLive: number,
  ) {
    this.keyEncryptionKeyResolver = keyEncryptionKeyResolver;
    this.providerName = providerName;
    this.unwrappedEncryptionKeyCache = {};
    this.cacheTimeToLive = cacheTimeToLive;
    this.clearCacheOnTtlExpiry();
  }

  public async wrapKey(
    encryptionKeyId: string,
    algorithm: KeyEncryptionKeyAlgorithm,
    key: Buffer,
  ): Promise<Buffer> {
    const keyEncryptionKey = await this.keyEncryptionKeyResolver.wrapKey(
      encryptionKeyId,
      algorithm,
      key,
    );
    return keyEncryptionKey;
  }

  public async unwrapKey(
    encryptionKeyId: string,
    algorithm: KeyEncryptionKeyAlgorithm,
    wrappedKey: Buffer,
  ): Promise<Buffer> {
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
    setInterval(() => {
      const now = new Date();
      for (const key in this.unwrappedEncryptionKeyCache) {
        if (
          now.getTime() - this.unwrappedEncryptionKeyCache[key][0].getTime() >
          this.cacheTimeToLive
        ) {
          delete this.unwrappedEncryptionKeyCache[key];
        }
      }
    }, 300000);
  }
}
