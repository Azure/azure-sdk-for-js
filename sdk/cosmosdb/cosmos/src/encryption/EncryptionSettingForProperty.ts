// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientEncryptionIncludedPath } from "./ClientEncryptionIncludedPath";
import { ClientEncryptionKeyProperties } from "./ClientEncryptionKey";
import { EncryptionAlgorithm, EncryptionType } from "./enums";
import { AeadAes256CbcHmacSha256Algorithm } from "./AeadAes256CbcHmacSha256Algorithm";
import { ProtectedDataEncryptionKey } from "./EncryptionKey";
import { EncryptionManager } from "./EncryptionManager";

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
    encryptionManager: EncryptionManager,
  ): Promise<AeadAes256CbcHmacSha256Algorithm> {
    const protectedDataEncryptionKey = await this.buildProtectedDataEncryptionKey(
      clientEncryptionKeyProperties,
      encryptionManager,
    );
    const encryptionAlgorithm = new AeadAes256CbcHmacSha256Algorithm(
      protectedDataEncryptionKey,
      this.encryptionType,
    );

    return encryptionAlgorithm;
  }

  private async buildProtectedDataEncryptionKey(
    clientEncryptionKeyProperties: ClientEncryptionKeyProperties,
    encryptionManager: EncryptionManager,
  ): Promise<ProtectedDataEncryptionKey> {
    const keyEncryptionKey = encryptionManager.keyEncryptionKeyCache.getOrCreateKeyEncryptionKey(
      clientEncryptionKeyProperties.encryptionKeyWrapMetadata.name,
      clientEncryptionKeyProperties.encryptionKeyWrapMetadata.value,
      encryptionManager.encryptionKeyStoreProvider,
    );

    let protectedDataEncryptionKey =
      await encryptionManager.protectedDataEncryptionKeyCache.getOrCreateProtectedDataEncryptionKey(
        this.encryptionKeyId,
        keyEncryptionKey,
        clientEncryptionKeyProperties.wrappedDataEncryptionKey,
      );

    return protectedDataEncryptionKey;
  }
}
