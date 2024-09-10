// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DataEncryptionKey } from "./DataEncryptionKey";
import { KeyEncryptionKey } from "../KeyEncryptionKey";

/**
 * A wrapper class around `DataEncryptionKey` that stores it in a protected form.
 * The `ProtectedDataEncryptionKey` class extends `DataEncryptionKey` and holds both the raw key and its encrypted form.
 * It also includes information about the `KeyEncryptionKey` used to encrypt the data encryption key.
 */
export class ProtectedDataEncryptionKey extends DataEncryptionKey {
  public keyEncryptionKey: KeyEncryptionKey;

  public encryptedValue: Buffer;

  public name: string;

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
