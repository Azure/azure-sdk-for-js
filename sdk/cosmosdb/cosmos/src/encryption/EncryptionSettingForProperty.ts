// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ClientEncryptionIncludedPath } from "./ClientEncryptionIncludedPath";
import type { ClientEncryptionKeyProperties } from "./ClientEncryptionKey";
import type { EncryptionAlgorithm, EncryptionType } from "./enums";
import { AeadAes256CbcHmacSha256Algorithm } from "./AeadAes256CbcHmacSha256Algorithm";
import type { ProtectedDataEncryptionKey } from "./EncryptionKey";
import type { EncryptionManager } from "./EncryptionManager";

/**
 * Represents the encryption setting for a specific property in an item.
 * @hidden
 */
export class EncryptionSettingForProperty {
  // client encryption key id.
  encryptionKeyId: string;
  // encryption type - Deterministic/Randomized.
  encryptionType: EncryptionType;
  // encryption algorithm - AEAD_AES_256_CBC_HMAC_SHA256
  encryptionAlgorithm: EncryptionAlgorithm;

  constructor(clientEncryptionIncludedPath: ClientEncryptionIncludedPath) {
    this.encryptionKeyId = clientEncryptionIncludedPath.clientEncryptionKeyId;
    this.encryptionType = clientEncryptionIncludedPath.encryptionType;
    this.encryptionAlgorithm = clientEncryptionIncludedPath.encryptionAlgorithm;
  }

  public async buildEncryptionAlgorithm(
    clientEncryptionKeyProperties: ClientEncryptionKeyProperties,
    encryptionManager: EncryptionManager,
    forceRefresh?: boolean,
  ): Promise<AeadAes256CbcHmacSha256Algorithm> {
    const protectedDataEncryptionKey = await this.buildProtectedDataEncryptionKey(
      clientEncryptionKeyProperties,
      encryptionManager,
      forceRefresh,
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
    forceRefresh?: boolean,
  ): Promise<ProtectedDataEncryptionKey> {
    const keyEncryptionKey = encryptionManager.keyEncryptionKeyCache.getOrCreate(
      clientEncryptionKeyProperties.encryptionKeyWrapMetadata.name,
      clientEncryptionKeyProperties.encryptionKeyWrapMetadata.value,
      encryptionManager.encryptionKeyStoreProvider,
    );
    const protectedDataEncryptionKey =
      await encryptionManager.protectedDataEncryptionKeyCache.getOrCreate(
        this.encryptionKeyId,
        keyEncryptionKey,
        clientEncryptionKeyProperties.wrappedDataEncryptionKey,
        forceRefresh,
      );

    return protectedDataEncryptionKey;
  }
}
