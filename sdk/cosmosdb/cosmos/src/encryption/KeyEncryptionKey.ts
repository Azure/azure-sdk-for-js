// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KeyEncryptionKeyAlgorithm } from "./enums/KeyEncryptionKeyAlgorithm";
import { EncryptionKeyStoreProvider } from "./EncryptionKeyStoreProvider";
import { keyEncryptionKeyCache } from "./Cache";
/**
 * @internal
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

  public static getOrCreate(
    name: string,
    path: string,
    keyStoreProvider: EncryptionKeyStoreProvider,
  ): KeyEncryptionKey {
    // console.log(`Cache: ${JSON.stringify(keyEncryptionKeyCache.keyEncryptionKeyCache)}`);
    const key = JSON.stringify([name, path]);
    // console.log(
    //   `KeyEncryptionKeyCache.getKey34: ${JSON.stringify(keyEncryptionKeyCache.getKeyEncryptionKey(key))}`,
    // );
    if (!keyEncryptionKeyCache.getKeyEncryptionKey(key)) {
      // console.log(`keyEncryptionKeyCache.setKeyEncryptionKey(${key})`);
      keyEncryptionKeyCache.setKeyEncryptionKey(
        key,
        new KeyEncryptionKey(name, path, keyStoreProvider),
      );
    }

    // console.log(`Cache41: ${JSON.stringify(keyEncryptionKeyCache.keyEncryptionKeyCache)}`);
    // console.log(
    //   `KeyEncryptionKeyCache.getKey: ${JSON.stringify(keyEncryptionKeyCache.getKeyEncryptionKey(key))}`,
    // );
    return keyEncryptionKeyCache.getKeyEncryptionKey(key);
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
