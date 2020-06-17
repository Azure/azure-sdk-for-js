// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isNode } from "@azure/core-http";

import { LocalCryptographyUnsupportedError, EncryptResult } from "./localCryptography/models";
import { encrypt } from "./localCryptography/encrypt";
import { convertJWKtoPEM } from "./localCryptography/conversions";
import { LocalSupportedAlgorithmName } from "./localCryptography/algorithms";

import { JsonWebKey } from "./keysModels";
import { decrypt } from "./localCryptography/decrypt";

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
   * @param {EncryptionAlgorithm} algorithm The algorithm to use.
   * @param {Uint8Array} plaintext The text to encrypt.
   */
  public async encrypt(
    algorithm: LocalSupportedAlgorithmName,
    plaintext: Uint8Array
  ): Promise<EncryptResult> {
    if (!isNode) {
      throw new LocalCryptographyUnsupportedError("Encryption is only available in NodeJS");
    }
    if (this.key.keyOps && !this.key.keyOps.includes("encrypt")) {
      throw new Error("Key does not support the encrypt operation");
    }

    const keyPEM = convertJWKtoPEM(this.key);
    const keyID = this.key.kid;

    const encrypted = encrypt(this.key.kty!, keyPEM, algorithm, plaintext);
    return { result: encrypted, algorithm, keyID };
  }

  /**
   * Encrypts the given plaintext with the specified cryptography algorithm
   *
   * Example usage:
   * ```ts
   * let client = new LocalCryptographyClient(jsonWebKey);
   * let result = await client.decrypt("RSA1_5", uint8Array);
   * ```
   * @param {EncryptionAlgorithm} algorithm The algorithm to use.
   * @param {Uint8Array} plaintext The text to encrypt.
   */
  public async decrypt(
    algorithm: LocalSupportedAlgorithmName,
    plaintext: Uint8Array
  ): Promise<EncryptResult> {
    if (!isNode) {
      throw new LocalCryptographyUnsupportedError("Decryption is only available in NodeJS");
    }
    if (this.key.keyOps && !this.key.keyOps.includes("decrypt")) {
      throw new Error("Key does not support the decrypt operation");
    }

    const keyPEM = convertJWKtoPEM(this.key);
    const keyID = this.key.kid;

    const encrypted = decrypt(this.key.kty!, keyPEM, algorithm, plaintext);
    return { result: encrypted, algorithm, keyID };
  }

  /**
   * Constructs a new instance of the Local Cryptography client for the given key
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
  constructor(public key: JsonWebKey) {}
}
