// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientEncryptionIncludedPath } from "./ClientEncryptionIncludedPath";
import { ClientEncryptionKeyProperties } from "./ClientEncryptionKey";
import { EncryptionAlgorithm, EncryptionType } from "./enums";
import { EncryptionKeyStoreProvider } from "./EncryptionKeyStoreProvider";
import { AeadAes256CbcHmacSha256Algorithm } from "./AeadAes256CbcHmacSha256Algorithm";
import { KeyEncryptionKey } from "./KeyEncryptionKey";
import { ProtectedDataEncryptionKey } from "./EncryptionKey";

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
    encryptionType: EncryptionType,
    clientEncryptionKeyProperties: ClientEncryptionKeyProperties,
    encryptionKeyStoreProvider: EncryptionKeyStoreProvider,
  ): Promise<AeadAes256CbcHmacSha256Algorithm> {
    const protectedDataEncryptionKey = await this.buildProtectedDataEncryptionKey(
      clientEncryptionKeyProperties,
      encryptionKeyStoreProvider,
    );
    const encryptionAlgorithm = new AeadAes256CbcHmacSha256Algorithm(
      protectedDataEncryptionKey,
      encryptionType,
    );

    return encryptionAlgorithm;
  }

  private async buildProtectedDataEncryptionKey(
    clientEncryptionKeyProperties: ClientEncryptionKeyProperties,
    encryptionKeyStoreProvider: EncryptionKeyStoreProvider,
  ): Promise<ProtectedDataEncryptionKey> {
    const keyEncryptionKey = KeyEncryptionKey.getOrCreate(
      clientEncryptionKeyProperties.encryptionKeyWrapMetadata.name,
      clientEncryptionKeyProperties.encryptionKeyWrapMetadata.value,
      encryptionKeyStoreProvider,
    );
    const protectedDataEncryptionKey = await ProtectedDataEncryptionKey.getOrCreate(
      this.encryptionKeyId,
      keyEncryptionKey,
      clientEncryptionKeyProperties.wrappedDataEncryptionKey,
    );
    return protectedDataEncryptionKey;
  }
  //TODO: in class calling these functions, implement methods to get the latest clientEncryptionKeyProperties if any thing goes wrong. EncryptionProcessor in our case.
}
