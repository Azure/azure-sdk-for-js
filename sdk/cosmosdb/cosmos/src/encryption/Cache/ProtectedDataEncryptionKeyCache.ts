// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { randomBytes } from "crypto";
import { ProtectedDataEncryptionKey } from "../EncryptionKey/ProtectedDataEncryptionKey";
import { KeyEncryptionKey } from "../KeyEncryptionKey";

export class ProtectedDataEncryptionKeyCache {
  // key is JSON.stringify([encryptionKeyId, keyEncryptionKey.name, encryptedValue.toString("hex")])
  private protectedDataEncryptionKeyCache: Map<string, [Date, ProtectedDataEncryptionKey]>;

  constructor(private cacheTimeToLive: number) {
    this.protectedDataEncryptionKeyCache = new Map<string, [Date, ProtectedDataEncryptionKey]>();
    this.clearCacheOnTtlExpiry(this.cacheTimeToLive);
  }

  public getProtectedDataEncryptionKey(key: string): ProtectedDataEncryptionKey | undefined {
    if (!this.protectedDataEncryptionKeyCache.has(key)) {
      return undefined;
    }
    return this.protectedDataEncryptionKeyCache.get(key)[1];
  }

  private setProtectedDataEncryptionKey(
    key: string,
    protectedDataEncryptionKey: ProtectedDataEncryptionKey,
  ): void {
    if (this.cacheTimeToLive === 0) {
      return;
    }
    this.protectedDataEncryptionKeyCache.set(key, [new Date(), protectedDataEncryptionKey]);
  }

  public async clearCacheOnTtlExpiry(time: number): Promise<void> {
    setInterval(() => {
      const now = new Date();
      for (const key in this.protectedDataEncryptionKeyCache) {
        if (now.getTime() - this.protectedDataEncryptionKeyCache.get(key)[0].getTime() > time) {
          this.protectedDataEncryptionKeyCache.delete(key);
        }
      }
    }, 300000);
  }

  private async createProtectedDataEncryptionKey(
    name: string,
    keyEncryptionKey: KeyEncryptionKey,
    encryptedValue?: Buffer,
  ): Promise<ProtectedDataEncryptionKey> {
    let rawKey: Buffer;
    let encryptedKey: Buffer;

    if (encryptedValue) {
      rawKey = await keyEncryptionKey.unwrapEncryptionKey(encryptedValue);
      encryptedKey = encryptedValue;
    } else {
      rawKey = this.generateColumnEncryptionKey();
      encryptedKey = await keyEncryptionKey.wrapEncryptionKey(rawKey);
    }
    const newKey = new ProtectedDataEncryptionKey(name, keyEncryptionKey, rawKey, encryptedKey);
    if (this.cacheTimeToLive !== 0) {
      const key = JSON.stringify([name, keyEncryptionKey.name, encryptedKey.toString("hex")]);
      this.setProtectedDataEncryptionKey(key, newKey);
    }
    return newKey;
  }

  public async getOrCreateProtectedDataEncryptionKey(
    name: string,
    keyEncryptionKey: KeyEncryptionKey,
    encryptedValue?: Buffer,
    forceRefresh?: boolean,
  ): Promise<ProtectedDataEncryptionKey> {
    if (this.cacheTimeToLive === 0 || forceRefresh) {
      return this.createProtectedDataEncryptionKey(name, keyEncryptionKey, encryptedValue);
    }
    if (encryptedValue) {
      const key = JSON.stringify([name, keyEncryptionKey.name, encryptedValue.toString("hex")]);
      const protectedDataEncryptionKey = this.getProtectedDataEncryptionKey(key);
      if (protectedDataEncryptionKey) {
        return protectedDataEncryptionKey;
      }
    }
    return this.createProtectedDataEncryptionKey(name, keyEncryptionKey, encryptedValue);
  }

  private generateColumnEncryptionKey(): Buffer {
    return randomBytes(32);
  }
}
