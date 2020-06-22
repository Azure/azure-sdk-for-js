// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isNode } from "@azure/core-http";

import { LocalCryptographyUnsupportedError } from "./localCryptography/models";
import { LocalSupportedAlgorithmName } from "./localCryptography/algorithms";

import { JsonWebKey } from "./keysModels";
import {
  WrapResult,
  VerifyResult,
  KeyWrapAlgorithm,
  EncryptResult
} from "./cryptographyClientModels";
import { runOperation } from "./localCryptography/runOperation";
import { EncryptionAlgorithm } from ".";

/**
 * A client used to perform local cryptographic operations with JSON Web Keys.
 */
export class LocalCryptographyClient {
  /**
   * Encrypts the given plaintext with the specified cryptography algorithm
   *
   * Example usage:
   * ```ts
   * let client = new LocalCryptographyClient(jsonWebKey);
   * let result = await client.encrypt("RSA1_5", Buffer.from("My Message"));
   * ```
   * @param {LocalSupportedAlgorithmName} algorithm The algorithm to use.
   * @param {Uint8Array} plaintext The text to encrypt.
   */
  public async encrypt(
    algorithm: LocalSupportedAlgorithmName,
    plaintext: Uint8Array
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
    return { result, algorithm: algorithm as EncryptionAlgorithm, keyID };
  }

  /**
   * Wraps the given key using the specified cryptography algorithm
   *
   * Example usage:
   * ```ts
   * let client = new LocalCryptographyClient(jsonWebKey);
   * let result = await client.wrapKey("RSA1_5", keyToWrap);
   * ```
   * @param {LocalSupportedAlgorithmName} algorithm The encryption algorithm to use to wrap the given key.
   * @param {Uint8Array} key The key to wrap.
   * @param {EncryptOptions} [options] Additional options.
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
   * @param {KeySignatureAlgorithm} algorithm The algorithm to use to verify with.
   * @param {Uint8Array} data The signed block of data to verify.
   * @param {Uint8Array} signature The signature to verify the block against.
   * @param {EncryptOptions} [options] Additional options.
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
   * Constructs a new instance of the Local Cryptography client for the given key.
   *
   * Example usage:
   * ```ts
   * import { LocalCryptographyClient } from "@azure/keyvault-keys";
   *
   * const jsonWebKey: JsonWebKey = {
   *   // ...
   * };
   * const client = new LocalCryptographyClient(jsonWebKey);
   * ```
   * @param key The JsonWebKey to use during cryptography operations.
   * @memberof CryptographyClient
   */
  constructor(key: JsonWebKey) {
    this.key = key;
  }
}
