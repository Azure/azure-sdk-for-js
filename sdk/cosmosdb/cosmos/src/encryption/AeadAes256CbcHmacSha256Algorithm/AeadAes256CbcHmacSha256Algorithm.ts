// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EncryptionType } from "../enums/index.js";
import {
  createCipheriv,
  randomBytes,
  createHmac,
  createDecipheriv,
  timingSafeEqual,
} from "node:crypto";
import type { DataEncryptionKey } from "../EncryptionKey/index.js";

export class AeadAes256CbcHmacSha256Algorithm {
  private readonly algoVersion = 0x1;
  private readonly authenticatedTypeVersion = 0x2;
  private blockSizeInBytes = 16;
  private encryptionType: EncryptionType;
  private dataEncryptionKey: DataEncryptionKey;
  private versionSize: Buffer;
  private keySizeInBytes: number;
  private minimumCipherTextLength: number;

  constructor(dataEncryptionKey: DataEncryptionKey, encryptionType: EncryptionType) {
    this.dataEncryptionKey = dataEncryptionKey;
    this.encryptionType = encryptionType;
    this.versionSize = Buffer.from([1]);
    this.keySizeInBytes = 32;
    this.minimumCipherTextLength = 1 + 2 * this.blockSizeInBytes + this.keySizeInBytes;
  }

  public encrypt(plainTextBuffer: Buffer, typeMarker?: number): Buffer {
    const version = typeMarker === undefined ? this.algoVersion : this.authenticatedTypeVersion;
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
    const authTagBuffer = this.generateAuthenticationTag(iv, cipherTextBuffer, version, typeMarker);
    return Buffer.concat([Buffer.from([version]), authTagBuffer, iv, cipherTextBuffer]);
  }

  public decrypt(cipherTextBuffer: Buffer, typeMarker?: number): Buffer {
    if (
      cipherTextBuffer.length < this.minimumCipherTextLength ||
      (cipherTextBuffer.length - 1 - this.keySizeInBytes - this.blockSizeInBytes) %
        this.blockSizeInBytes !==
        0
    ) {
      throw new Error("Invalid cipher text length");
    }
    const version = cipherTextBuffer[0];
    if (version !== this.algoVersion && version !== this.authenticatedTypeVersion) {
      throw new Error("Invalid cipher text version");
    }
    const authTagStartIndex = 1;
    const authTagLength = this.keySizeInBytes;
    const ivStartIndex = authTagStartIndex + authTagLength;
    const ivLength = this.blockSizeInBytes;
    const cipherTextStartIndex = ivStartIndex + ivLength;
    const cipherTextLength = cipherTextBuffer.length - cipherTextStartIndex;

    const authenticationTag = cipherTextBuffer.slice(
      authTagStartIndex,
      authTagStartIndex + authTagLength,
    );
    const iv = cipherTextBuffer.slice(ivStartIndex, ivStartIndex + ivLength);
    const cipherText = cipherTextBuffer.slice(
      cipherTextStartIndex,
      cipherTextStartIndex + cipherTextLength,
    );

    this.validateAuthenticationTag(authenticationTag, iv, cipherText, version, typeMarker);

    const decipher = createDecipheriv(
      "aes-256-cbc",
      this.dataEncryptionKey.encryptionKeyBuffer,
      iv,
    );
    const decrypted = decipher.update(cipherText);
    const result = Buffer.concat([decrypted, decipher.final()]);
    return result;
  }

  private generateAuthenticationTag(
    iv: Buffer,
    cipherTextBuffer: Buffer,
    version: number,
    typeMarker?: number,
  ): Buffer {
    const hmac = createHmac("sha256", this.dataEncryptionKey.macKeyBuffer);
    const versionBuffer = Buffer.from([version]);
    let buffer: Buffer;
    if (version === this.authenticatedTypeVersion) {
      if (
        typeMarker === undefined ||
        !Number.isInteger(typeMarker) ||
        typeMarker < 0 ||
        typeMarker > 255
      ) {
        throw new Error("A one-byte type marker is required for authenticated type encryption");
      }
      buffer = Buffer.concat([
        versionBuffer,
        Buffer.from([typeMarker]),
        iv,
        cipherTextBuffer,
        this.versionSize,
      ]);
    } else {
      buffer = Buffer.concat([versionBuffer, iv, cipherTextBuffer, this.versionSize]);
    }
    return hmac.update(buffer).digest();
  }
  private validateAuthenticationTag(
    authenticationTag: Buffer,
    iv: Buffer,
    cipherText: Buffer,
    version: number,
    typeMarker?: number,
  ): void {
    const expectedAuthTag = this.generateAuthenticationTag(iv, cipherText, version, typeMarker);
    if (!timingSafeEqual(authenticationTag, expectedAuthTag)) {
      throw new Error("Invalid authentication tag");
    }
  }
}
