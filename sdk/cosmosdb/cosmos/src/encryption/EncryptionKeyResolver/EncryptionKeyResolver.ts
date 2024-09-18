// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Provides an interface for key resolver for different key providers.
 * All resolvers should implement this interface.
 */
export interface EncryptionKeyResolver {
  /**
   * Wraps the input key using the key encryption key.
   * @param encryptionKeyId - Identifier of the key to be used for wrapping.
   * @param algorithm - Algorithm to be used for wrapping.
   * @param key - Key to be wrapped.
   * @returns Wrapped key.
   */
  wrapKey(encryptionKeyId: string, algorithm: string, key: Buffer): Promise<Buffer>;
  /**
   * Unwraps the input wrapped key using the key encryption key.
   * @param encryptionKeyId - Identifier of the key to be used for unwrapping.
   * @param algorithm - Algorithm to be used for unwrapping.
   * @param wrappedKey - Unwrapped key.
   */
  unwrapKey(encryptionKeyId: string, algorithm: string, wrappedKey: Buffer): Promise<Buffer>;
}
