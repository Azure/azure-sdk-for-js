// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KeyEncryptionKeyAlgorithm } from "./enums/KeyEncryptionKeyAlgorithm";
import { EncryptionKeyStoreProvider } from "./EncryptionKeyStoreProvider";
/**
 * A wrapper class containing the info about the client encryption key and key store provider to wrap and unwrap the key.
 */
export class KeyEncryptionKey {
  private encryptionAlgorithm: KeyEncryptionKeyAlgorithm;

  public name: string;

  public path: string;

  public keyStoreProvider: EncryptionKeyStoreProvider;

  constructor(name: string, path: string, keyStoreProvider: EncryptionKeyStoreProvider) {
    this.name = name;
    this.path = path;
    this.keyStoreProvider = keyStoreProvider;
    this.encryptionAlgorithm = KeyEncryptionKeyAlgorithm.RSA_OAEP;
  }

  public async wrapEncryptionKey(plainTextEncryptionKey: Buffer): Promise<Buffer> {
    return this.keyStoreProvider.wrapKey(
      this.path,
      this.encryptionAlgorithm,
      plainTextEncryptionKey,
    );
  }

  public async unwrapEncryptionKey(wrappedEncryptionKey: Buffer): Promise<Buffer> {
    return this.keyStoreProvider.unwrapKey(
      this.path,
      this.encryptionAlgorithm,
      wrappedEncryptionKey,
    );
  }
}
