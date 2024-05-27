// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EncryptionType } from "../enums";
import { createCipheriv, randomBytes, createHmac, createDecipheriv } from "crypto";
import { DataEncryptionKey } from "../EncryptionKey";

export class AeadAes256CbcHmacSha256Algorithm {
  private algoVersion = 0x1;
  private blockSizeInBytes = 16;
  private encryptionType: EncryptionType;
  private dataEncryptionKey: DataEncryptionKey;
  private version: Buffer;
  private versionSize: Buffer;
  private keySizeInBytes: number;
  private minimumCipherTextLength: number;

  constructor(dataEncryptionKey: DataEncryptionKey, encryptionType: EncryptionType) {
    this.dataEncryptionKey = dataEncryptionKey;
    this.encryptionType = encryptionType;
    this.version = Buffer.from([this.algoVersion]);
    this.versionSize = Buffer.from([1]);
    this.keySizeInBytes = 32;
    this.minimumCipherTextLength = 1 + 2 * this.blockSizeInBytes + this.keySizeInBytes;
  }

  public encrypt(plainTextBuffer: Buffer): Buffer {
    let iv: Buffer;
    // create initialization vector
    if (this.encryptionType === EncryptionType.RANDOMIZED) {
      iv = randomBytes(16);
    } else {
      const ivHmac = createHmac("sha256", this.dataEncryptionKey.ivKeyBuffer);
      ivHmac.update(plainTextBuffer);
      iv = ivHmac.digest().slice(0, this.blockSizeInBytes);
    }
    // create cipher text
    const cipher = createCipheriv("aes-256-cbc", this.dataEncryptionKey.encryptionKeyBuffer, iv);
    const cipherTextBuffer = Buffer.concat([cipher.update(plainTextBuffer), cipher.final()]);
    const authTagBuffer = this.generateAuthenticationTag(iv, cipherTextBuffer);
    return Buffer.concat([Buffer.from([this.algoVersion]), authTagBuffer, iv, cipherTextBuffer]);
  }

  public decrypt(cipherTextBuffer: Buffer): Buffer {
    if (cipherTextBuffer.length < this.minimumCipherTextLength) {
      throw new Error("Invalid cipher text length");
    }
    if (cipherTextBuffer[0] !== this.algoVersion) {
      throw new Error("Invalid cipher text version");
    }
    let authTagStartIndex = 1;
    let authTagLength = this.keySizeInBytes;
    let ivStartIndex = authTagStartIndex + authTagLength;
    let ivLength = this.blockSizeInBytes;
    let cipherTextStartIndex = ivStartIndex + ivLength;
    let cipherTextLength = cipherTextBuffer.length - cipherTextStartIndex;

    let authenticationTag = cipherTextBuffer.slice(
      authTagStartIndex,
      authTagStartIndex + authTagLength,
    );
    let iv = cipherTextBuffer.slice(ivStartIndex, ivStartIndex + ivLength);
    let cipherText = cipherTextBuffer.slice(
      cipherTextStartIndex,
      cipherTextStartIndex + cipherTextLength,
    );

    this.validateAuthenticationTag(authenticationTag, iv, cipherText);

    let result: Buffer;

    const decipher = createDecipheriv(
      "aes-256-cbc",
      this.dataEncryptionKey.encryptionKeyBuffer,
      iv,
    );
    const decrypted = decipher.update(cipherText);
    result = Buffer.concat([decrypted, decipher.final()]);
    return result;
  }

  private generateAuthenticationTag(iv: Buffer, cipherTextBuffer: Buffer): Buffer {
    const hmac = createHmac("sha256", this.dataEncryptionKey.macKeyBuffer);
    const buffer = Buffer.concat([this.version, iv, cipherTextBuffer, this.versionSize]);
    return hmac.update(buffer).digest();
  }
  private validateAuthenticationTag(authenticationTag: Buffer, iv: Buffer, cipherText: Buffer) {
    const expectedAuthTag = this.generateAuthenticationTag(iv, cipherText);
    if (!authenticationTag.equals(expectedAuthTag)) {
      throw new Error("Invalid authentication tag");
    }
  }
}
