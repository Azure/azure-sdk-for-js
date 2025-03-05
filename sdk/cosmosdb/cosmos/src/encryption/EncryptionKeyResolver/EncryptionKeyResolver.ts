// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Provides an interface for key resolver for different key providers.
 * All resolvers should implement this interface.
 */
export interface EncryptionKeyResolver {
  /**
   * Wraps the input key using the key encryption key.
   * @param encryptionKeyId - Identifier of the customer managed key to be used for wrapping.
   * @param algorithm - Algorithm to be used for wrapping.
   * @param key - Data Encryption Key to be wrapped.
   * @returns Wrapped key.
   */
  wrapKey(encryptionKeyId: string, algorithm: string, unwrappedKey: Buffer): Promise<Buffer>;
  /**
   * Unwraps the input wrapped key using the key encryption key.
   * @param encryptionKeyId - Identifier of the customer managed key to be used for unwrapping.
   * @param algorithm - Algorithm to be used for unwrapping.
   * @param wrappedKey - wrapped Data Encryption key.
   * @returns Unwrapped Key.
   */
  unwrapKey(encryptionKeyId: string, algorithm: string, wrappedKey: Buffer): Promise<Buffer>;
}
