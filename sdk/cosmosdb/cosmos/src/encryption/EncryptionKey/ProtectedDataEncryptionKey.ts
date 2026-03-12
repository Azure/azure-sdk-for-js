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

  public encryptedValue: Buffer;

  public constructor(
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
}
