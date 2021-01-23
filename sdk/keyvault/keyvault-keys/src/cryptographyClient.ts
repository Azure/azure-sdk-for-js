// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-http";
import { isLocallySupported } from "./localCryptography/algorithms";
import { LocalCryptographyClient } from "./localCryptographyClient";
import { JsonWebKey, KeyVaultKey, CryptographyClientOptions } from "./keysModels";
import {
  EncryptionAlgorithm,
  KeyWrapAlgorithm,
  WrapResult,
  UnwrapResult,
  DecryptResult,
  SignatureAlgorithm,
  SignResult,
  VerifyResult,
  EncryptResult,
  EncryptOptions,
  DecryptOptions,
  WrapKeyOptions,
  UnwrapKeyOptions,
  SignOptions,
  VerifyOptions
} from "./cryptographyClientModels";
import {
  LocalCryptographyUnsupportedError,
  LocalSupportedAlgorithmName
} from "./localCryptography/models";
import { KeyVaultCryptographyClient } from "./keyVaultCryptographyClient";

/**
 * A client used to perform cryptographic operations with wither Azure Key vault keys
 * or a local {@link JsonWebKey}.
 */
export class CryptographyClient {
  constructor(key: JsonWebKey);
  constructor(
    key: string | KeyVaultKey,
    credential: TokenCredential,
    pipelineOptions?: CryptographyClientOptions
  );
  constructor(
    key: string | KeyVaultKey | JsonWebKey,
    credential?: TokenCredential,
    pipelineOptions: CryptographyClientOptions = {}
  ) {
    if (this.isRemote(key)) {
      this.concreteClient = {
        kind: "remote",
        client: new KeyVaultCryptographyClient(key, credential!, pipelineOptions)
      };
    } else {
      this.concreteClient = { kind: "local", client: new LocalCryptographyClient(key) };
    }
  }

  private isRemote(key: string | KeyVaultKey | JsonWebKey): key is string | KeyVaultKey {
    if (typeof key === "string" || (key as KeyVaultKey).name) {
      return true;
    }
    return false;
  }

  /**
   * Encrypts the given plaintext with the specified cryptography algorithm
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(keyVaultKey, credentials);
   * let result = await client.encrypt("RSA1_5", Buffer.from("My Message"));
   * ```
   * @param algorithm - The algorithm to use.
   * @param plaintext - The text to encrypt.
   * @param options - Additional options.
   */
  public async encrypt(
    algorithm: EncryptionAlgorithm,
    plaintext: Uint8Array,
    options: EncryptOptions = {}
  ): Promise<EncryptResult> {
    if (this.concreteClient.kind === "remote") {
      return this.concreteClient.client.encrypt(algorithm, plaintext, options);
    } else {
      if (!isLocallySupported(algorithm)) {
        throw new LocalCryptographyUnsupportedError(
          `Encryption algorithm ${algorithm} is not supported for a local JsonWebToken`
        );
      }
      return this.concreteClient.client.encrypt(
        algorithm as LocalSupportedAlgorithmName,
        plaintext
      );
    }
  }

  /**
   * Decrypts the given ciphertext with the specified cryptography algorithm
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(keyVaultKey, credentials);
   * let result = await client.decrypt("RSA1_5", encryptedBuffer);
   * ```
   * @param algorithm - The algorithm to use.
   * @param ciphertext - The text to decrypt.
   * @param options - Additional options.
   */

  public async decrypt(
    algorithm: EncryptionAlgorithm,
    ciphertext: Uint8Array,
    options: DecryptOptions = {}
  ): Promise<DecryptResult> {
    if (this.concreteClient.kind === "remote") {
      return this.concreteClient.client.decrypt(algorithm, ciphertext, options);
    } else {
      // Todo: this need to be higher level / public API if not already?
      throw new LocalCryptographyUnsupportedError(
        "Decryption of a local JsonWebKey is not supported"
      );
    }
  }

  /**
   * Wraps the given key using the specified cryptography algorithm
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(keyVaultKey, credentials);
   * let result = await client.wrapKey("RSA1_5", keyToWrap);
   * ```
   * @param algorithm - The encryption algorithm to use to wrap the given key.
   * @param key - The key to wrap.
   * @param options - Additional options.
   */
  public async wrapKey(
    algorithm: KeyWrapAlgorithm,
    key: Uint8Array,
    options: WrapKeyOptions = {}
  ): Promise<WrapResult> {
    if (this.concreteClient.kind === "remote") {
      return this.concreteClient.client.wrapKey(algorithm, key, options);
    } else {
      if (!isLocallySupported(algorithm)) {
        throw new LocalCryptographyUnsupportedError(
          `Encryption algorithm ${algorithm} is not supported for a local JsonWebToken`
        );
      }
      return this.concreteClient.client.wrapKey(algorithm as LocalSupportedAlgorithmName, key);
    }
  }

  /**
   * Unwraps the given wrapped key using the specified cryptography algorithm
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(keyVaultKey, credentials);
   * let result = await client.unwrapKey("RSA1_5", keyToUnwrap);
   * ```
   * @param algorithm - The decryption algorithm to use to unwrap the key.
   * @param encryptedKey - The encrypted key to unwrap.
   * @param options - Additional options.
   */
  public async unwrapKey(
    algorithm: KeyWrapAlgorithm,
    encryptedKey: Uint8Array,
    options: UnwrapKeyOptions = {}
  ): Promise<UnwrapResult> {
    if (this.concreteClient.kind === "remote") {
      return this.concreteClient.client.unwrapKey(algorithm, encryptedKey, options);
    } else {
      // Todo: this need to be higher level / public API if not already?
      throw new LocalCryptographyUnsupportedError(
        "Unwrapping of a local JsonWebKey is not supported"
      );
    }
  }

  /**
   * Cryptographically sign the digest of a message
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(keyVaultKey, credentials);
   * let result = await client.sign("RS256", digest);
   * ```
   * @param algorithm - The signing algorithm to use.
   * @param digest - The digest of the data to sign.
   * @param options - Additional options.
   */
  public async sign(
    algorithm: SignatureAlgorithm,
    digest: Uint8Array,
    options: SignOptions = {}
  ): Promise<SignResult> {
    if (this.concreteClient.kind === "remote") {
      return this.concreteClient.client.sign(algorithm, digest, options);
    } else {
      // Todo: this need to be higher level / public API if not already?
      throw new LocalCryptographyUnsupportedError("Signing a local JsonWebKey is not supported");
    }
  }

  /**
   * Verify the signed message digest
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(keyVaultKey, credentials);
   * let result = await client.verify("RS256", signedDigest, signature);
   * ```
   * @param algorithm - The signing algorithm to use to verify with.
   * @param digest - The digest to verify.
   * @param signature - The signature to verify the digest against.
   * @param options - Additional options.
   */
  public async verify(
    algorithm: SignatureAlgorithm,
    digest: Uint8Array,
    signature: Uint8Array,
    options: VerifyOptions = {}
  ): Promise<VerifyResult> {
    if (this.concreteClient.kind === "remote") {
      return this.concreteClient.client.verify(algorithm, digest, signature, options);
    } else {
      // Todo: this need to be higher level / public API if not already?
      throw new LocalCryptographyUnsupportedError("Verifying a local JsonWebKey is not supported");
    }
  }

  /**
   * Cryptographically sign a block of data
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(keyVaultKey, credentials);
   * let result = await client.signData("RS256", message);
   * ```
   * @param algorithm - The signing algorithm to use.
   * @param data - The data to sign.
   * @param options - Additional options.
   */
  public async signData(
    algorithm: SignatureAlgorithm,
    data: Uint8Array,
    options: SignOptions = {}
  ): Promise<SignResult> {
    if (this.concreteClient.kind === "remote") {
      return this.concreteClient.client.signData(algorithm, data, options);
    } else {
      // Todo: this need to be higher level / public API if not already?
      throw new LocalCryptographyUnsupportedError("Verifying a local JsonWebKey is not supported");
    }
  }

  /**
   * Verify the signed block of data
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(keyVaultKey, credentials);
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
    options: VerifyOptions = {}
  ): Promise<VerifyResult> {
    if (this.concreteClient.kind === "remote") {
      return this.concreteClient.client.verifyData(algorithm, data, signature, options);
    } else {
      if (!isLocallySupported(algorithm)) {
        throw new LocalCryptographyUnsupportedError(
          `Encryption algorithm ${algorithm} is not supported for a local JsonWebToken`
        );
      }
      return this.concreteClient.client.verifyData(
        algorithm as LocalSupportedAlgorithmName,
        data,
        signature
      );
    }
  }

  /**
   * The base URL to the vault.
   * Will be undefined if called on a local key.
   */
  get vaultUrl(): string | undefined {
    return this.concreteClient.client.vaultUrl;
  }

  /**
   * The ID of the key used to perform cryptographic operations for the client.
   */
  get keyId(): string | undefined {
    return this.concreteClient.client.keyId;
  }

  private readonly concreteClient:
    | { kind: "remote"; client: KeyVaultCryptographyClient }
    | { kind: "local"; client: LocalCryptographyClient };
}
