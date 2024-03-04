// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KeyEncryptionKeyAlgorithm } from "./enums/KeyEncryptionKeyAlgorithm";
import { EncryptionKeyStoreProvider } from "./EncryptionKeyStoreProvider";

export class KeyEncryptionKey {
  private encryptionAlgorithm: KeyEncryptionKeyAlgorithm;

  private static keyEncryptionKeyCache: { [key: string]: KeyEncryptionKey } = {};

  public name: string;

  public path: string;

  public keyStoreProvider: EncryptionKeyStoreProvider;

  constructor(name: string, path: string, keyStoreProvider: EncryptionKeyStoreProvider) {
    this.name = name;
    this.path = path;
    this.keyStoreProvider = keyStoreProvider;
    this.encryptionAlgorithm = KeyEncryptionKeyAlgorithm.RSA_OAEP;
  }

  public static getOrCreate(
    name: string,
    path: string,
    keyStoreProvider: EncryptionKeyStoreProvider,
  ) {
    if (!KeyEncryptionKey.keyEncryptionKeyCache) {
      KeyEncryptionKey.keyEncryptionKeyCache = {};
    }
    const key = JSON.stringify([name, path, keyStoreProvider]);
    if (!KeyEncryptionKey.keyEncryptionKeyCache[key]) {
      KeyEncryptionKey.keyEncryptionKeyCache[key] = new KeyEncryptionKey(
        name,
        path,
        keyStoreProvider,
      );
    }
    return KeyEncryptionKey.keyEncryptionKeyCache[key];
  }

  public async wrapEncryptionKey(plainTextEncryptionKey: Buffer): Promise<Buffer> {
    return await this.keyStoreProvider.wrapKey(
      this.path,
      this.encryptionAlgorithm,
      plainTextEncryptionKey,
    );
  }

  public async unwrapEncryptionKey(wrappedEncryptionKey: Buffer): Promise<Buffer> {
    return await this.keyStoreProvider.unwrapKey(
      this.path,
      this.encryptionAlgorithm,
      wrappedEncryptionKey,
    );
  }
}
