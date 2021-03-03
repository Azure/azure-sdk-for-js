// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  DecryptOptions,
  DecryptParameters,
  DecryptResult,
  EncryptOptions,
  EncryptParameters,
  EncryptResult,
  KeyOperation,
  KeyWrapAlgorithm,
  SignatureAlgorithm,
  SignOptions,
  SignResult,
  UnwrapKeyOptions,
  UnwrapResult,
  VerifyOptions,
  VerifyResult,
  WrapKeyOptions,
  WrapResult
} from "..";

/**
 * A union type representing the names of all of the locally supported algorithms.
 */
export type LocalSupportedAlgorithmName =
  | "RSA1_5"
  | "RSA-OAEP"
  | "PS256"
  | "RS256"
  | "PS384"
  | "RS384"
  | "PS512"
  | "RS512";

export class LocalCryptographyUnsupportedError extends Error {}

/**
 * Represents an object that can perform cryptography operations.
 * @internal
 */
export interface CryptographyProvider {
  /**
   * Encrypts the given plaintext with the specified encryption parameters.
   * @internal
   *
   * @param encryptParameters - The encryption parameters, keyed on the encryption algorithm chosen.
   * @param options - Additional options.
   */
  encrypt(encryptParameters: EncryptParameters, options: EncryptOptions): Promise<EncryptResult>;

  /**
   * Decrypts the given ciphertext with the specified decryption parameters.
   * @internal
   *
   * @param decryptParameters - The decryption parameters.
   * @param options - Additional options.
   */
  decrypt(decryptParameters: DecryptParameters, options: DecryptOptions): Promise<DecryptResult>;

  /**
   * Returns true if the provider supports this specific crypto algorithm.
   * @internal
   *
   * @param algorithm - The algorithm to use.
   */
  supportsAlgorithm(algorithm: string): boolean;

  /**
   * Returns true if the provider supports this specific crypto operation.
   * @internal
   *
   * @param opertion - The key operation to use.
   */
  supportsOperation(opertion: KeyOperation): boolean;

  /**
   * Wraps the given key using the specified cryptography algorithm
   * @internal
   *
   * @param algorithm - The encryption algorithm to use to wrap the given key.
   * @param keyToWrap - The key to wrap.
   * @param options - Additional options.
   */
  wrapKey(
    algorithm: KeyWrapAlgorithm,
    keyToWrap: Uint8Array,
    options: WrapKeyOptions
  ): Promise<WrapResult>;

  /**
   * Unwraps the given wrapped key using the specified cryptography algorithm
   * @internal
   *
   * @param algorithm - The decryption algorithm to use to unwrap the key.
   * @param encryptedKey - The encrypted key to unwrap.
   * @param options - Additional options.
   */
  unwrapKey(
    algorithm: KeyWrapAlgorithm,
    encryptedKey: Uint8Array,
    options: UnwrapKeyOptions
  ): Promise<UnwrapResult>;

  /**
   * Cryptographically sign the digest of a message
   * @internal
   *
   * @param algorithm - The signing algorithm to use.
   * @param digest - The digest of the data to sign.
   * @param options - Additional options.
   */
  sign(
    algorithm: SignatureAlgorithm,
    digest: Uint8Array,
    options: SignOptions
  ): Promise<SignResult>;

  /**
   * Verify the signed message digest
   * @internal
   *
   * @param algorithm - The signing algorithm to use to verify with.
   * @param digest - The digest to verify.
   * @param signature - The signature to verify the digest against.
   * @param options - Additional options.
   */
  verify(
    algorithm: SignatureAlgorithm,
    digest: Uint8Array,
    signature: Uint8Array,
    options: VerifyOptions
  ): Promise<VerifyResult>;
}
