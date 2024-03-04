// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EncryptionKeyResolver } from "./EncryptionKeyResolver";
import { KeyEncryptionKeyAlgorithm } from "./enums";

export class EncryptionKeyStoreProvider {
  public RsaOaepEncryptionAlgorithm: string = "RSA-OAEP";

  private keyEncryptionKeyResolver: EncryptionKeyResolver;
  // buffer to store the unwrapped encryption key. Key is the path of the encryption key
  private unwrappedEncryptionKeyCache: { [key: string]: Buffer };

  public providerName: string;

  constructor(keyEncryptionKeyResolver: EncryptionKeyResolver, providerName: string) {
    this.keyEncryptionKeyResolver = keyEncryptionKeyResolver;
    this.providerName = providerName;
    this.unwrappedEncryptionKeyCache = {};
  }

  public async wrapKey(
    encryptionKeyId: string,
    algorithm: KeyEncryptionKeyAlgorithm,
    key: Buffer,
  ): Promise<Buffer> {
    const keyEncryptionKey = await this.keyEncryptionKeyResolver.wrapKey(
      encryptionKeyId,
      algorithm,
      key,
    );
    return keyEncryptionKey;
  }

  public async unwrapKey(
    encryptionKeyId: string,
    algorithm: KeyEncryptionKeyAlgorithm,
    wrappedKey: Buffer,
  ): Promise<Buffer> {
    if (!this.unwrappedEncryptionKeyCache[encryptionKeyId]) {
      const plainEncryptionKey = await this.keyEncryptionKeyResolver.unwrapKey(
        encryptionKeyId,
        algorithm,
        wrappedKey,
      );
      this.unwrappedEncryptionKeyCache[encryptionKeyId] = plainEncryptionKey;
    }
    return this.unwrappedEncryptionKeyCache[encryptionKeyId];
  }
}
