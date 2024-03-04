// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EncryptionType, EncryptionAlgorithm } from "./enums";

export class ClientEncryptionIncludedPath {
  public path: string;

  public clientEncryptionKeyId: string;

  public encryptionType: EncryptionType;

  public encryptionAlgorithm: EncryptionAlgorithm;

  constructor(
    path: string,
    clientEncryptionKeyId: string,
    encryptionType: EncryptionType,
    encryptionAlgortihm: EncryptionAlgorithm,
  ) {
    this.path = path;
    this.clientEncryptionKeyId = clientEncryptionKeyId;
    this.encryptionType = encryptionType;
    this.encryptionAlgorithm = encryptionAlgortihm;
  }
}
