// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EncryptionType } from "../enums/index.js";
import type { DataEncryptionKey } from "../EncryptionKey/index.js";

export class AeadAes256CbcHmacSha256Algorithm {
  constructor(_dataEncryptionKey: DataEncryptionKey, _encryptionType: EncryptionType) {
    throw new Error("Client-side Encryption not supported in browser environment");
  }

  public encrypt(_plainTextBuffer: Uint8Array): Uint8Array {
    throw new Error("Client-side Encryption not supported in browser environment");
  }

  public decrypt(_cipherTextBuffer: Uint8Array): Uint8Array {
    throw new Error("Client-side Encryption not supported in browser environment");
  }
}

export function randomBytes(_size: number): Uint8Array {
  throw new Error("Client-side random generator not supported in browser environment");
}
