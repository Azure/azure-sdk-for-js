// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { EncryptionKeyResolverName, KeyEncryptionKeyAlgorithm } from "./enums";

export class EncryptionKeyWrapMetadata {
  public type: EncryptionKeyResolverName;

  public name: string;

  public value: string;

  public algorithm: KeyEncryptionKeyAlgorithm;

  constructor(
    type: EncryptionKeyResolverName,
    name: string,
    value: string,
    algorithm: KeyEncryptionKeyAlgorithm,
  ) {
    this.type = type;
    this.name = name;
    this.value = value;
    this.algorithm = algorithm;
  }
}
