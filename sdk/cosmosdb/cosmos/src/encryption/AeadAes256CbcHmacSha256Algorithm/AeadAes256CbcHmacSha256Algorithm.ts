// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EncryptionType } from "../enums/index.js";
import {
  hmacSha256,
  aes256CbcEncrypt,
  aes256CbcDecrypt,
  generateRandomBytes,
} from "#platform/encryption/crypto";
import type { DataEncryptionKey } from "../EncryptionKey/index.js";

export class AeadAes256CbcHmacSha256Algorithm {
  private algoVersion = 0x1;
  private blockSizeInBytes = 16;
  private encryptionType: EncryptionType;
  private dataEncryptionKey: DataEncryptionKey;
  private version: Uint8Array<ArrayBuffer>;
  private versionSize: Uint8Array<ArrayBuffer>;
  private keySizeInBytes: number;
  private minimumCipherTextLength: number;

  constructor(dataEncryptionKey: DataEncryptionKey, encryptionType: EncryptionType) {
    this.dataEncryptionKey = dataEncryptionKey;
    this.encryptionType = encryptionType;
    this.version = new Uint8Array([this.algoVersion]);
    this.versionSize = new Uint8Array([1]);
    this.keySizeInBytes = 32;
    this.minimumCipherTextLength = 1 + 2 * this.blockSizeInBytes + this.keySizeInBytes;
  }

  public async encrypt(plainTextBuffer: Uint8Array<ArrayBuffer>): Promise<Uint8Array<ArrayBuffer>> {
    let iv: Uint8Array<ArrayBuffer>;
    if (this.encryptionType === EncryptionType.RANDOMIZED) {
      iv = await generateRandomBytes(16);
    } else {
      const fullHmac = await hmacSha256(this.dataEncryptionKey.ivKeyBuffer, plainTextBuffer);
      iv = fullHmac.slice(0, this.blockSizeInBytes);
    }
    const cipherTextBuffer = await aes256CbcEncrypt(
      this.dataEncryptionKey.encryptionKeyBuffer,
      iv,
      plainTextBuffer,
    );
    const authTagBuffer = await this.generateAuthenticationTag(iv, cipherTextBuffer);
    return concat([new Uint8Array([this.algoVersion]), authTagBuffer, iv, cipherTextBuffer]);
  }

  public async decrypt(
    cipherTextBuffer: Uint8Array<ArrayBuffer>,
  ): Promise<Uint8Array<ArrayBuffer>> {
    if (cipherTextBuffer.length < this.minimumCipherTextLength) {
      throw new Error("Invalid cipher text length");
    }
    if (cipherTextBuffer[0] !== this.algoVersion) {
      throw new Error("Invalid cipher text version");
    }
    const authTagStartIndex = 1;
    const authTagLength = this.keySizeInBytes;
    const ivStartIndex = authTagStartIndex + authTagLength;
    const ivLength = this.blockSizeInBytes;
    const cipherTextStartIndex = ivStartIndex + ivLength;

    const authenticationTag = cipherTextBuffer.slice(
      authTagStartIndex,
      authTagStartIndex + authTagLength,
    );
    const iv = cipherTextBuffer.slice(ivStartIndex, ivStartIndex + ivLength);
    const cipherText = cipherTextBuffer.slice(cipherTextStartIndex);

    await this.validateAuthenticationTag(authenticationTag, iv, cipherText);

    return aes256CbcDecrypt(this.dataEncryptionKey.encryptionKeyBuffer, iv, cipherText);
  }

  private async generateAuthenticationTag(
    iv: Uint8Array<ArrayBuffer>,
    cipherTextBuffer: Uint8Array<ArrayBuffer>,
  ): Promise<Uint8Array<ArrayBuffer>> {
    const buffer = concat([this.version, iv, cipherTextBuffer, this.versionSize]);
    return hmacSha256(this.dataEncryptionKey.macKeyBuffer, buffer);
  }

  private async validateAuthenticationTag(
    authenticationTag: Uint8Array<ArrayBuffer>,
    iv: Uint8Array<ArrayBuffer>,
    cipherText: Uint8Array<ArrayBuffer>,
  ): Promise<void> {
    const expectedAuthTag = await this.generateAuthenticationTag(iv, cipherText);
    if (!uint8ArrayEquals(authenticationTag, expectedAuthTag)) {
      throw new Error("Invalid authentication tag");
    }
  }
}

function concat(arrays: Uint8Array<ArrayBuffer>[]): Uint8Array<ArrayBuffer> {
  const totalLength = arrays.reduce((sum, arr) => sum + arr.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const arr of arrays) {
    result.set(arr, offset);
    offset += arr.length;
  }
  return result;
}

function uint8ArrayEquals(a: Uint8Array<ArrayBuffer>, b: Uint8Array<ArrayBuffer>): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a[i]! ^ b[i]!;
  }
  return result === 0;
}
