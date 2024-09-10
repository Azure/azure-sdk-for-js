// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { EncryptionKeyResolverName, KeyEncryptionKeyAlgorithm } from "./enums";

/**
 * Metadata used to wrap/unwrap data encryption key using a customer managed key
 */
export class EncryptionKeyWrapMetadata {
  /** Identifier of the key resolver */
  public type: EncryptionKeyResolverName;
  /** Identifier of customer managed key */
  public name: string;
  /** Path to customer managed key */
  public value: string;
  /** Algorithm to be used for wrapping/unwrapping the data encryption key */
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
