// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { generateRandomBytes } from "../crypto.js";
import { ProtectedDataEncryptionKey } from "../EncryptionKey/ProtectedDataEncryptionKey.js";
import type { KeyEncryptionKey } from "../KeyEncryptionKey.js";
import { Constants } from "../../common/index.js";
import { createInterval } from "#platform/utils/timers";
import { uint8ArrayToString } from "@azure/core-util";

/**
 * The cache used to store the protected data encryption key.
 * see {@link ProtectedDataEncryptionKey}
 * @hidden
 */
export class ProtectedDataEncryptionKeyCache {
  // key is JSON.stringify([encryptionKeyId, keyEncryptionKey.name, keyEncryptionKey.path, encryptedValue hex])
  private cache: Map<string, [Date, ProtectedDataEncryptionKey]>;
  // interval for clear cache to run
  cacheRefresher: (() => void) | undefined;

  constructor(private cacheTimeToLive: number) {
    this.cache = new Map<string, [Date, ProtectedDataEncryptionKey]>();
    this.clearCacheOnTtlExpiry();
  }

  public get(key: string): ProtectedDataEncryptionKey | undefined {
    if (!this.cache.has(key)) {
      return undefined;
    }
    return this.cache.get(key)![1];
  }

  private set(key: string, protectedDataEncryptionKey: ProtectedDataEncryptionKey): void {
    if (this.cacheTimeToLive === 0) {
      return;
    }
    this.cache.set(key, [new Date(), protectedDataEncryptionKey]);
  }

  private async clearCacheOnTtlExpiry(): Promise<void> {
    this.cacheRefresher = createInterval(async () => {
      const now = new Date();
      for (const key of this.cache.keys()) {
        if (now.getTime() - this.cache.get(key)![0].getTime() > this.cacheTimeToLive) {
          this.cache.delete(key);
        }
      }
    }, Constants.EncryptionCacheRefreshIntervalInMs);
  }

  private async createProtectedDataEncryptionKey(
    name: string,
    keyEncryptionKey: KeyEncryptionKey,
    encryptedValue?: Uint8Array,
  ): Promise<ProtectedDataEncryptionKey> {
    let rawKey: Uint8Array;
    let encryptedKey: Uint8Array;
    if (encryptedValue) {
      rawKey = await keyEncryptionKey.unwrapEncryptionKey(encryptedValue);
      encryptedKey = encryptedValue;
    } else {
      rawKey = await generateRandomBytes(32);
      encryptedKey = await keyEncryptionKey.wrapEncryptionKey(rawKey);
    }
    const newKey = await ProtectedDataEncryptionKey.create(
      name,
      keyEncryptionKey,
      rawKey,
      encryptedKey,
    );
    if (this.cacheTimeToLive !== 0) {
      const key = JSON.stringify([
        name,
        keyEncryptionKey.name,
        keyEncryptionKey.path,
        uint8ArrayToString(encryptedKey, "hex"),
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
    if (this.cacheTimeToLive === 0 || forceRefresh) {
      return this.createProtectedDataEncryptionKey(name, keyEncryptionKey, encryptedValue);
    }

    if (encryptedValue) {
      const key = JSON.stringify([
        name,
        keyEncryptionKey.name,
        keyEncryptionKey.path,
        uint8ArrayToString(encryptedValue, "hex"),
      ]);
      const protectedDataEncryptionKey = this.get(key);
      if (protectedDataEncryptionKey) {
        return protectedDataEncryptionKey;
      }
    }
    return this.createProtectedDataEncryptionKey(name, keyEncryptionKey, encryptedValue);
  }
}
