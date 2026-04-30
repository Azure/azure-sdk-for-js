// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { hmacSha256 } from "#platform/encryption/crypto";

export abstract class DataEncryptionKey {
  private keySizeInBits = 256;
  private keySizeInBytes = this.keySizeInBits / 8;

  public encryptionKeyBuffer!: Uint8Array<ArrayBuffer>;
  public macKeyBuffer!: Uint8Array<ArrayBuffer>;
  public ivKeyBuffer!: Uint8Array<ArrayBuffer>;
  public name: string;

  protected constructor(rootKey: Uint8Array<ArrayBuffer>, name: string) {
    if (rootKey.length !== this.keySizeInBytes) {
      throw new Error("Invalid root key size");
    }
    this.name = name;
  }

  protected async deriveKeys(rootKey: Uint8Array<ArrayBuffer>): Promise<void> {
    const encryptionKeySalt = `Microsoft SQL Server cell encryption key with encryption algorithm:AEAD_AES_256_CBC_HMAC_SHA256 and key length:${this.keySizeInBits}`;
    const macKeySalt = `Microsoft SQL Server cell MAC key with encryption algorithm:AEAD_AES_256_CBC_HMAC_SHA256 and key length:${this.keySizeInBits}`;
    const ivKeySalt = `Microsoft SQL Server cell IV key with encryption algorithm:AEAD_AES_256_CBC_HMAC_SHA256 and key length:${this.keySizeInBits}`;

    this.encryptionKeyBuffer = await this.getHmacWithSha256(encryptionKeySalt, rootKey);
    this.macKeyBuffer = await this.getHmacWithSha256(macKeySalt, rootKey);
    this.ivKeyBuffer = await this.getHmacWithSha256(ivKeySalt, rootKey);
  }

  private async getHmacWithSha256(
    plainText: string,
    key: Uint8Array<ArrayBuffer>,
  ): Promise<Uint8Array<ArrayBuffer>> {
    // Encode as UTF-16LE to match the original behavior
    const textBytes = new Uint8Array(plainText.length * 2);
    for (let i = 0; i < plainText.length; i++) {
      const code = plainText.charCodeAt(i);
      textBytes[i * 2] = code & 0xff;
      textBytes[i * 2 + 1] = (code >> 8) & 0xff;
    }
    return hmacSha256(key, textBytes);
  }
}
