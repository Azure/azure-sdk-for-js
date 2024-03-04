// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DataEncryptionKey } from "./DataEncryptionKey";
import { KeyEncryptionKey } from "../KeyEncryptionKey";
import { randomBytes } from "crypto";

export class ProtectedDataEncryptionKey extends DataEncryptionKey {
  public keyEncryptionKey: KeyEncryptionKey;

  public encryptedValue: Buffer;

  public name: string;

  private static protectedDataEncryptionKeyCache: { [key: string]: ProtectedDataEncryptionKey } =
    {};

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
  ): Promise<ProtectedDataEncryptionKey> {
    const key = JSON.stringify([name, keyEncryptionKey, encryptedValue.toString("hex")]);
    if (this.protectedDataEncryptionKeyCache[key] === undefined) {
      const protectedKey = await this.create(name, keyEncryptionKey, encryptedValue);
      this.protectedDataEncryptionKeyCache[key] = protectedKey;
    }
    return this.protectedDataEncryptionKeyCache[key];
  }

  private static generateColumnEncryptionKey(): Buffer {
    return randomBytes(32);
  }
}
