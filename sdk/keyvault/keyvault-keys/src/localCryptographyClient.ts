// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  LocalCryptographyUnsupportedError,
  LocalSupportedAlgorithmName
} from "./localCryptography/models";

import { JsonWebKey } from "./keysModels";
import {
  WrapResult,
  VerifyResult,
  KeyWrapAlgorithm,
  EncryptResult,
  EncryptParameters,
  WrapKeyOptions,
  SignatureAlgorithm
} from "./cryptographyClientModels";
import { EncryptOptions, VerifyOptions } from ".";
import { findLocalProvider } from "./localCryptography/providers";
import { isNode } from "@azure/core-http";

/**
 * A client used to perform local cryptographic operations with JSON Web Keys.
 * @internal
 */
export class LocalCryptographyClient {
  constructor(key: JsonWebKey) {
    this.key = key;
  }

  /**
   * Encrypts the given plaintext with the specified cryptography algorithm
   *
   * Example usage:
   * ```ts
   * let client = new LocalCryptographyClient(jsonWebKey);
   * let result = await client.encrypt("RSA1_5", Buffer.from("My Message"));
   * ```
   * @param encryptParameters - The encryption parameters.
   * @param options - Additional options.
   */
  public async encrypt(
    encryptParameters: EncryptParameters,
    options: EncryptOptions = {}
  ): Promise<EncryptResult> {
    const provider = findLocalProvider(encryptParameters.algorithm as LocalSupportedAlgorithmName);

    if (!isNode) {
      throw new LocalCryptographyUnsupportedError("Encryption is only available in NodeJS");
    }
    return provider.encrypt(this.key, encryptParameters, options);
  }

  /**
   * Wraps the given key using the specified cryptography algorithm
   *
   * Example usage:
   * ```ts
   * let client = new LocalCryptographyClient(jsonWebKey);
   * let result = await client.wrapKey("RSA1_5", keyToWrap);
   * ```
   * @param algorithm - The encryption algorithm to use to wrap the given key.
   * @param key - The key to wrap.
   * @param options - Additional options.
   */
  public async wrapKey(
    algorithm: KeyWrapAlgorithm,
    key: Uint8Array,
    options: WrapKeyOptions
  ): Promise<WrapResult> {
    const provider = findLocalProvider(algorithm as LocalSupportedAlgorithmName);

    if (!isNode) {
      throw new LocalCryptographyUnsupportedError("Encryption is only available in NodeJS");
    }
    return provider.wrapKey(this.key, algorithm, key, options);
  }

  /**
   * Verify the signed block of data
   *
   * Example usage:
   * ```ts
   * let client = new LocalCryptographyClient(jsonWebKey, credentials);
   * let result = await client.verifyData("RS256", signedMessage, signature);
   * ```
   * @param algorithm - The algorithm to use to verify with.
   * @param data - The signed block of data to verify.
   * @param signature - The signature to verify the block against.
   * @param options - Additional options.
   */
  public async verifyData(
    algorithm: SignatureAlgorithm,
    data: Uint8Array,
    signature: Uint8Array,
    options: VerifyOptions
  ): Promise<VerifyResult> {
    const provider = findLocalProvider(algorithm as LocalSupportedAlgorithmName);

    if (!isNode) {
      throw new LocalCryptographyUnsupportedError("Encryption is only available in NodeJS");
    }

    return provider.verifyData(this.key, algorithm, data, signature, options);
  }

  /**
   * A JSON Web Key, used for the local cryptography operations.
   */
  public key: JsonWebKey;

  /**
   * The base URL to the vault.
   * Since this is a local cryptography client the vaultUrl is empty.
   */
  public readonly vaultUrl: string = "";

  /**
   * The ID of the key used to perform cryptographic operations for the client.
   */
  public get keyId(): string | undefined {
    return this.key?.kid;
  }
}
