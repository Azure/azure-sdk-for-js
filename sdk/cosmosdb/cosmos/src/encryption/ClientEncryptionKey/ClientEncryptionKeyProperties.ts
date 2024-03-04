// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { EncryptionKeyWrapMetadata } from "../EncryptionKeyWrapMetadata";

export class ClientEncryptionKeyProperties {
  id: string;
  encryptionAlgorithm: string;
  wrappedDataEncryptionKey: Buffer;
  encryptionKeyWrapMetadata: EncryptionKeyWrapMetadata;

  constructor(
    id: string,
    encryptionAlgorithm: string,
    wrappedDataEncryptionKey: Buffer,
    encryptionKeyWrapMetadata: EncryptionKeyWrapMetadata,
  ) {
    this.id = id;
    this.encryptionAlgorithm = encryptionAlgorithm;
    this.wrappedDataEncryptionKey = wrappedDataEncryptionKey;
    this.encryptionKeyWrapMetadata = encryptionKeyWrapMetadata;
  }
}
