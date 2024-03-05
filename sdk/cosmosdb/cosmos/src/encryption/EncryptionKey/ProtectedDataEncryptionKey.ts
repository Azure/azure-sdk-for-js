// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DataEncryptionKey } from "./DataEncryptionKey";
import { KeyEncryptionKey } from "../KeyEncryptionKey";
import { randomBytes } from "crypto";

export class ProtectedDataEncryptionKey extends DataEncryptionKey {
  public keyEncryptionKey: KeyEncryptionKey;

  public encryptedValue: Buffer;

  public name: string;

  private static protectedDataEncryptionKeyCache: {
    [key: string]: [Date, ProtectedDataEncryptionKey];
  } = {};

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

  public static async create(
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

    return newKey;
  }

  public static async getOrCreate(
    name: string,
    keyEncryptionKey: KeyEncryptionKey,
    encryptedValue: Buffer,
    forceRefresh?: boolean,
  ): Promise<ProtectedDataEncryptionKey> {
    const key = JSON.stringify([name, keyEncryptionKey, encryptedValue.toString("hex")]);
    if (this.protectedDataEncryptionKeyCache[key] === undefined || forceRefresh) {
      const protectedKey = await this.create(name, keyEncryptionKey, encryptedValue);
      this.protectedDataEncryptionKeyCache[key] = [new Date(), protectedKey];
    }
    return this.protectedDataEncryptionKeyCache[key][1];
  }

  private static generateColumnEncryptionKey(): Buffer {
    return randomBytes(32);
  }

  public static async clearCacheOnTtlExpiry(time: number): Promise<void> {
    setInterval(() => {
      const now = new Date();
      for (const key in ProtectedDataEncryptionKey.protectedDataEncryptionKeyCache) {
        if (
          now.getTime() -
            ProtectedDataEncryptionKey.protectedDataEncryptionKeyCache[key][0].getTime() >
          time
        ) {
          delete ProtectedDataEncryptionKey.protectedDataEncryptionKeyCache[key];
        }
      }
    }, 300000);
  }
}
