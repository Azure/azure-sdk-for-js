// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientEncryptionIncludedPath } from "./ClientEncryptionIncludedPath";
import { ClientEncryptionKeyProperties } from "./ClientEncryptionKey";
import { EncryptionAlgorithm, EncryptionType } from "./enums";
import { EncryptionKeyStoreProvider } from "./EncryptionKeyStoreProvider";
import { AeadAes256CbcHmacSha256Algorithm } from "./AeadAes256CbcHmacSha256Algorithm";
import { KeyEncryptionKey } from "./KeyEncryptionKey";
import { ProtectedDataEncryptionKey } from "./EncryptionKey";
import { protectedDataEncryptionKeyCache } from "./Cache";

export class EncryptionSettingForProperty {
  encryptionKeyId: string;
  encryptionType: EncryptionType;
  encryptionAlgorithm: EncryptionAlgorithm;

  constructor(clientEncryptionIncludedPath: ClientEncryptionIncludedPath) {
    this.encryptionKeyId = clientEncryptionIncludedPath.clientEncryptionKeyId;
    this.encryptionType = clientEncryptionIncludedPath.encryptionType;
    this.encryptionAlgorithm = clientEncryptionIncludedPath.encryptionAlgorithm;
  }

  public async buildEncryptionAlgorithm(
    clientEncryptionKeyProperties: ClientEncryptionKeyProperties,
    encryptionKeyStoreProvider: EncryptionKeyStoreProvider,
    cacheTimeToLive?: number,
  ): Promise<AeadAes256CbcHmacSha256Algorithm> {
    const protectedDataEncryptionKey = await this.buildProtectedDataEncryptionKey(
      clientEncryptionKeyProperties,
      encryptionKeyStoreProvider,
      cacheTimeToLive,
    );
    const encryptionAlgorithm = new AeadAes256CbcHmacSha256Algorithm(
      protectedDataEncryptionKey,
      this.encryptionType,
    );

    return encryptionAlgorithm;
  }

  private async buildProtectedDataEncryptionKey(
    clientEncryptionKeyProperties: ClientEncryptionKeyProperties,
    encryptionKeyStoreProvider: EncryptionKeyStoreProvider,
    cacheTimeToLive?: number,
  ): Promise<ProtectedDataEncryptionKey> {
    const keyEncryptionKey = KeyEncryptionKey.getOrCreate(
      clientEncryptionKeyProperties.encryptionKeyWrapMetadata.name,
      clientEncryptionKeyProperties.encryptionKeyWrapMetadata.value,
      encryptionKeyStoreProvider,
    );
    const key = JSON.stringify([
      this.encryptionKeyId,
      keyEncryptionKey.name,
      clientEncryptionKeyProperties.wrappedDataEncryptionKey.toString("hex"),
    ]);

    let protectedDataEncryptionKey =
      protectedDataEncryptionKeyCache.getProtectedDataEncryptionKey(key);
    // console.log(`protectedDataEncryptionKey: ${protectedDataEncryptionKey}`);
    if (protectedDataEncryptionKey === undefined) {
      protectedDataEncryptionKey = await ProtectedDataEncryptionKey.getOrCreate(
        this.encryptionKeyId,
        keyEncryptionKey,
        cacheTimeToLive,
        clientEncryptionKeyProperties.wrappedDataEncryptionKey,
      );
    }

    return protectedDataEncryptionKey;
  }
}
