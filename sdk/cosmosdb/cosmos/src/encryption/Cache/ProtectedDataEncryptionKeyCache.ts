// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ProtectedDataEncryptionKey } from "../EncryptionKey/ProtectedDataEncryptionKey";

export class ProtectedDataEncryptionKeyCache {
  private static instance: ProtectedDataEncryptionKeyCache;
  // key is JSON.stringify([encryptionKeyId, keyEncryptionKey, encryptedValue.toString("hex")])
  private protectedDataEncryptionKeyCache: Map<string, [Date, ProtectedDataEncryptionKey]>;

  private constructor() {
    this.protectedDataEncryptionKeyCache = new Map<string, [Date, ProtectedDataEncryptionKey]>();
  }

  public static getInstance(): ProtectedDataEncryptionKeyCache {
    if (!ProtectedDataEncryptionKeyCache.instance) {
      ProtectedDataEncryptionKeyCache.instance = new ProtectedDataEncryptionKeyCache();
    }
    return ProtectedDataEncryptionKeyCache.instance;
  }

  public getProtectedDataEncryptionKey(key: string): ProtectedDataEncryptionKey | undefined {
    if (!this.protectedDataEncryptionKeyCache.has(key)) {
      return undefined;
    }
    return this.protectedDataEncryptionKeyCache.get(key)[1];
  }
  public setProtectedDataEncryptionKey(
    key: string,
    protectedDataEncryptionKey: ProtectedDataEncryptionKey,
    cacheTimeToLive: number,
  ): void {
    if (cacheTimeToLive === 0) {
      return;
    }
    this.protectedDataEncryptionKeyCache.set(key, [new Date(), protectedDataEncryptionKey]);
    this.clearCacheOnTtlExpiry(cacheTimeToLive);
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
  public clearCache(): void {
    this.protectedDataEncryptionKeyCache.clear();
  }
}
