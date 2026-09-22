// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EncryptionType } from "../enums/index.js";
import type { DataEncryptionKey } from "../EncryptionKey/index.js";

export class AeadAes256CbcHmacSha256Algorithm {
  constructor(_dataEncryptionKey: DataEncryptionKey, _encryptionType: EncryptionType) {
    throw new Error("Client-side Encryption not supported in browser environment");
  }

  public encrypt(_plainTextBuffer: Buffer): Buffer {
    throw new Error("Client-side Encryption not supported in browser environment");
  }

  public decrypt(_cipherTextBuffer: Buffer): Buffer {
    throw new Error("Client-side Encryption not supported in browser environment");
  }
}

export function randomBytes(_size: number): Buffer {
  throw new Error("Client-side random generator not supported in browser environment");
}
