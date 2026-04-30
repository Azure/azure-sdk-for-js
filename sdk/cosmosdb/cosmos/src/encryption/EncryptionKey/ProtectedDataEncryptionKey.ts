// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataEncryptionKey } from "./DataEncryptionKey.js";
import type { KeyEncryptionKey } from "../KeyEncryptionKey.js";

/**
 * A wrapper class around `DataEncryptionKey` that stores it in a protected form.
 * The `ProtectedDataEncryptionKey` class extends `DataEncryptionKey` and holds both the raw key and its encrypted form.
 * It also includes information about the `KeyEncryptionKey` used to encrypt the data encryption key.
 * @hidden
 */
export class ProtectedDataEncryptionKey extends DataEncryptionKey {
  public keyEncryptionKey: KeyEncryptionKey;
  public encryptedValue: Uint8Array;

  private constructor(
    name: string,
    keyEncryptionKey: KeyEncryptionKey,
    rawKey: Uint8Array,
    encryptedKey: Uint8Array,
  ) {
    super(rawKey, name);
    this.keyEncryptionKey = keyEncryptionKey;
    this.encryptedValue = encryptedKey;
  }

  public static async create(
    name: string,
    keyEncryptionKey: KeyEncryptionKey,
    rawKey: Uint8Array,
    encryptedKey: Uint8Array,
  ): Promise<ProtectedDataEncryptionKey> {
    const key = new ProtectedDataEncryptionKey(name, keyEncryptionKey, rawKey, encryptedKey);
    await key.deriveKeys(rawKey);
    return key;
  }
}
