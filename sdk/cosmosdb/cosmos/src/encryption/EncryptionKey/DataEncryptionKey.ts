// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createHmac } from "crypto";

export abstract class DataEncryptionKey {
  private rootKeyBuffer: Buffer;
  private keySizeInBits = 256;
  private keySizeInBytes = this.keySizeInBits / 8;

  public encryptionKeyBuffer: Buffer;
  public macKeyBuffer: Buffer;
  public ivKeyBuffer: Buffer;
  public name: string;

  constructor(rootKey: Buffer, name: string) {
    if (rootKey.length !== this.keySizeInBytes) {
      throw new Error("Invalid root key size");
    }
    this.rootKeyBuffer = rootKey;
    this.name = name;

    const encryptionKeySalt = `Microsoft SQL Server cell encryption key with encryption algorithm:AEAD_AES_256_CBC_HMAC_SHA256 and key length:${this.keySizeInBits}`;
    const macKeySalt = `Microsoft SQL Server cell MAC key with encryption algorithm:AEAD_AES_256_CBC_HMAC_SHA256 and key length:${this.keySizeInBits}`;
    const ivKeySalt = `Microsoft SQL Server cell IV key with encryption algorithm:AEAD_AES_256_CBC_HMAC_SHA256 and key length:${this.keySizeInBits}`;

    this.encryptionKeyBuffer = this.getHmacWithSha256(encryptionKeySalt, this.rootKeyBuffer);
    this.macKeyBuffer = this.getHmacWithSha256(macKeySalt, this.rootKeyBuffer);
    this.ivKeyBuffer = this.getHmacWithSha256(ivKeySalt, this.rootKeyBuffer);
  }

  private getHmacWithSha256(plainText: string, key: Buffer): Buffer {
    const hmac = createHmac("sha256", key);
    hmac.update(Buffer.from(plainText, "utf16le"));
    return hmac.digest();
  }
}
