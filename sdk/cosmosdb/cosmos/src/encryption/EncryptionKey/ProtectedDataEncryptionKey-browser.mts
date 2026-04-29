// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataEncryptionKey } from "#platform/encryption/EncryptionKey/DataEncryptionKey";

/**
 * @hidden
 * Client-side Encryption not supported in browser environment.
 */
export class ProtectedDataEncryptionKey extends DataEncryptionKey {
  public keyEncryptionKey: unknown;
  public encryptedValue: Uint8Array;

  public constructor(
    _name: string,
    _keyEncryptionKey: unknown,
    _rawKey: Uint8Array,
    _encryptedKey: Uint8Array,
  ) {
    super(_rawKey, _name);
    throw new Error("Client-side Encryption not supported in browser environment");
  }
}
