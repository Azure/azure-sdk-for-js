// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isNode } from "@azure/core-http";

import {
  LocalCryptographyUnsupportedError,
  LocalSupportedAlgorithmName
} from "./localCryptography/models";

import { JsonWebKey } from "./keysModels";
import {
  WrapResult,
  VerifyResult,
  KeyWrapAlgorithm,
  EncryptResult
} from "./cryptographyClientModels";
import { runOperation } from "./localCryptography/runOperation";
import { EncryptionAlgorithm, EncryptOptions } from ".";

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
   * @param algorithm - The algorithm to use.
   * @param plaintext - The text to encrypt.
   */
  public async encrypt(
    algorithm: LocalSupportedAlgorithmName,
    plaintext: Uint8Array,
    options: EncryptOptions
  ): Promise<EncryptResult> {
    if (!isNode) {
      throw new LocalCryptographyUnsupportedError("Encryption is only available in NodeJS");
    }
    const result = (await runOperation(
      this.key,
      "encrypt",
      algorithm,
      Buffer.from(plaintext)
    )) as Buffer;
    const keyID = this.key.kid;
    return {
      result,
      algorithm: algorithm as EncryptionAlgorithm,
      keyID,
      additionalAuthenticatedData: options.additionalAuthenticatedData,
      iv: options.iv,
      tag: options.tag
    };
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
    algorithm: LocalSupportedAlgorithmName,
    key: Uint8Array
  ): Promise<WrapResult> {
    const result = (await runOperation(this.key, "wrapKey", algorithm, Buffer.from(key))) as Buffer;
    const keyID = this.key.kid;
    return { result, algorithm: algorithm as KeyWrapAlgorithm, keyID };
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
    algorithm: LocalSupportedAlgorithmName,
    data: Uint8Array,
    signature: Uint8Array
  ): Promise<VerifyResult> {
    const result = (await runOperation(
      this.key,
      "verify",
      algorithm,
      Buffer.from(data),
      Buffer.from(signature)
    )) as boolean;
    const keyID = this.key.kid;
    return { result, keyID };
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
