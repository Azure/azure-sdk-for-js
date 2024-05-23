// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DataEncryptionKey } from "./DataEncryptionKey";
import { KeyEncryptionKey } from "../KeyEncryptionKey";
import { randomBytes } from "crypto";
import { protectedDataEncryptionKeyCache } from "../Cache";

export class ProtectedDataEncryptionKey extends DataEncryptionKey {
  public keyEncryptionKey: KeyEncryptionKey;

  public encryptedValue: Buffer;

  public name: string;

  private constructor(
    name: string,
    keyEncryptionKey: KeyEncryptionKey,
    rawKey: Buffer,
    encryptedKey: Buffer,
  ) {
    super(rawKey, name);
    this.name = name;
    this.keyEncryptionKey = keyEncryptionKey;
    this.encryptedValue = encryptedKey;
  }

  private static async create(
    name: string,
    keyEncryptionKey: KeyEncryptionKey,
    cacheTimeToLive: number,
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
    if (cacheTimeToLive !== 0) {
      const key = JSON.stringify([name, keyEncryptionKey.name, encryptedKey.toString("hex")]);
      protectedDataEncryptionKeyCache.setProtectedDataEncryptionKey(key, newKey, cacheTimeToLive);
    }
    return newKey;
  }

  public static async getOrCreate(
    name: string,
    keyEncryptionKey: KeyEncryptionKey,
    cacheTimeToLive: number,
    encryptedValue?: Buffer,
    forceRefresh?: boolean,
  ): Promise<ProtectedDataEncryptionKey> {
    if (cacheTimeToLive === 0 || forceRefresh) {
      return this.create(name, keyEncryptionKey, cacheTimeToLive, encryptedValue);
    }
    if (encryptedValue) {
      const key = JSON.stringify([name, keyEncryptionKey.name, encryptedValue.toString("hex")]);
      const protectedDataEncryptionKey =
        protectedDataEncryptionKeyCache.getProtectedDataEncryptionKey(key);
      if (protectedDataEncryptionKey) {
        return protectedDataEncryptionKey;
      }
    }
    return this.create(name, keyEncryptionKey, cacheTimeToLive, encryptedValue);
  }

  private static generateColumnEncryptionKey(): Buffer {
    return randomBytes(32);
  }
}
