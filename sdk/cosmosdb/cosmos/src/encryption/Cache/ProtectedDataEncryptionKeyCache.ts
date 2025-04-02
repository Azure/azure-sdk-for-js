// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { randomBytes } from "crypto";
import { ProtectedDataEncryptionKey } from "../EncryptionKey/ProtectedDataEncryptionKey";
import type { KeyEncryptionKey } from "../KeyEncryptionKey";
import { Constants } from "../../common";

/**
 * The cache used to store the protected data encryption key.
 * see {@link ProtectedDataEncryptionKey}
 * @hidden
 */
export class ProtectedDataEncryptionKeyCache {
  // key is JSON.stringify([encryptionKeyId, keyEncryptionKey.name, keyEncryptionKey.path, encryptedValue.toString("hex")])
  private cache: Map<string, [Date, ProtectedDataEncryptionKey]>;
  // interval for clear cache to run
  cacheRefresher: NodeJS.Timeout;

  constructor(private cacheTimeToLive: number) {
    this.cache = new Map<string, [Date, ProtectedDataEncryptionKey]>();
    this.clearCacheOnTtlExpiry();
  }

  public get(key: string): ProtectedDataEncryptionKey | undefined {
    if (!this.cache.has(key)) {
      return undefined;
    }
    return this.cache.get(key)[1];
  }

  private set(key: string, protectedDataEncryptionKey: ProtectedDataEncryptionKey): void {
    if (this.cacheTimeToLive === 0) {
      return;
    }
    this.cache.set(key, [new Date(), protectedDataEncryptionKey]);
  }

  private async clearCacheOnTtlExpiry(): Promise<void> {
    this.cacheRefresher = setInterval(() => {
      const now = new Date();
      for (const key of this.cache.keys()) {
        if (now.getTime() - this.cache.get(key)[0].getTime() > this.cacheTimeToLive) {
          this.cache.delete(key);
        }
      }
    }, Constants.EncryptionCacheRefreshIntervalInMs);
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
      const key = JSON.stringify([
        name,
        keyEncryptionKey.name,
        keyEncryptionKey.path,
        encryptedKey.toString("hex"),
      ]);
      this.set(key, newKey);
    }
    return newKey;
  }

  public async getOrCreate(
    name: string,
    keyEncryptionKey: KeyEncryptionKey,
    encryptedValue?: Uint8Array,
    forceRefresh?: boolean,
  ): Promise<ProtectedDataEncryptionKey> {
    const encryptedValueBuffer = encryptedValue ? Buffer.from(encryptedValue) : undefined;
    if (this.cacheTimeToLive === 0 || forceRefresh) {
      return this.createProtectedDataEncryptionKey(name, keyEncryptionKey, encryptedValueBuffer);
    }

    if (encryptedValueBuffer) {
      const key = JSON.stringify([
        name,
        keyEncryptionKey.name,
        keyEncryptionKey.path,
        encryptedValueBuffer.toString("hex"),
      ]);
      const protectedDataEncryptionKey = this.get(key);
      if (protectedDataEncryptionKey) {
        return protectedDataEncryptionKey;
      }
    }
    return this.createProtectedDataEncryptionKey(name, keyEncryptionKey, encryptedValueBuffer);
  }

  private generateColumnEncryptionKey(): Buffer {
    return randomBytes(32);
  }
}
