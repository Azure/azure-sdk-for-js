// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { EncryptionKeyWrapMetadata } from "../EncryptionKeyWrapMetadata";

export class ClientEncryptionKeyProperties {
  id: string;
  encryptionAlgorithm: string;
  wrappedDataEncryptionKey: Buffer;
  encryptionKeyWrapMetadata: EncryptionKeyWrapMetadata;
  /**
   * @internal
   */
  etag: string;

  constructor(
    id: string,
    encryptionAlgorithm: string,
    etag: string,
    wrappedDataEncryptionKey: Buffer,
    encryptionKeyWrapMetadata: EncryptionKeyWrapMetadata,
  ) {
    this.id = id;
    this.encryptionAlgorithm = encryptionAlgorithm;
    this.etag = etag;
    this.wrappedDataEncryptionKey = wrappedDataEncryptionKey;
    this.encryptionKeyWrapMetadata = encryptionKeyWrapMetadata;
  }
}
