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
  EncryptParameters,
  SignOptions,
  VerifyOptions,
  DecryptParameters
} from "./cryptographyClientModels";
import { LocalSupportedAlgorithmName } from "./localCryptography/models";
import { KeyVaultCryptographyClient } from "./keyVaultCryptographyClient";

/**
 * A client used to perform cryptographic operations on an Azure Key vault key
 * or a local {@link JsonWebKey}.
 */
export class CryptographyClient {
  /**
   * Constructs a new instance of the Cryptography client for the given key
   *
   * Example usage:
   * ```ts
   * import { KeyClient, CryptographyClient } from "@azure/keyvault-keys";
   * import { DefaultAzureCredential } from "@azure/identity";
   *
   * let vaultUrl = `https://<MY KEYVAULT HERE>.vault.azure.net`;
   * let credentials = new DefaultAzureCredential();
   *
   * let keyClient = new KeyClient(vaultUrl, credentials);
   * let keyVaultKey = await keyClient.getKey("MyKey");
   *
   * let client = new CryptographyClient(keyVaultKey.id, credentials);
   * // or
   * let client = new CryptographyClient(keyVaultKey, credentials);
   * ```
   * @param key - The key to use during cryptography tasks. You can also pass the identifier of the key i.e its url here.
   * @param credential - An object that implements the `TokenCredential` interface used to authenticate requests to the service. Use the \@azure/identity package to create a credential that suits your needs.
   * @param pipelineOptions - Pipeline options used to configure Key Vault API requests.
   *                          Omit this parameter to use the default pipeline configuration.
   */
  constructor(
    key: string | KeyVaultKey,
    credential: TokenCredential,
    pipelineOptions?: CryptographyClientOptions
  );
  /**
   * Constructs a new instance of the Cryptography client for the given key in local mode.
   *
   * Example usage:
   * ```ts
   * import { CryptographyClient } from "@azure/keyvault-keys";
   *
   * const jsonWebKey: JsonWebKey = {
   *   // ...
   * };
   * const client = new CryptographyClient(jsonWebKey);
   * ```
   * @param key - The JsonWebKey to use during cryptography operations.
   */
  constructor(key: JsonWebKey);
  /**
   * Internal constructor implementation for either local or Key Vault backed keys.
   * @param key - The key to use during cryptography tasks.
   * @param credential - Teh credential to use when constructing a Key Vault Cryptography client.
   */
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
      this.concreteClient = {
        kind: "local",
        client: new LocalCryptographyClient(key)
      };
    }
  }

  /**
   * Checks whether the client is instantiated in Local or KeyVault model.
   * A local mode client will only contain a {@link JsonWebKey}.
   * A KeyVault client will contain either a {@link KeyVaultKey} or a string representing an identifier to the key.
   * @param key - The key to check for mode.
   * @internal
   */
  private isRemote(key: string | KeyVaultKey | JsonWebKey): key is string | KeyVaultKey {
    if (typeof key === "string" || (key as KeyVaultKey)?.key) {
      return true;
    }
    return false;
  }

  /**
   * Encrypts the given plaintext with the specified encryption parameters.
   * Depending on the algorithm set in the encryption parameters, the set of possible encryption parameters will change.
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(keyVaultKey, credentials);
   * let result = await client.encrypt({ algorithm: "RSA1_5", plaintext: Buffer.from("My Message")});
   * let result = await client.encrypt({ algorithm: "A256GCM", plaintext: Buffer.from("My Message"), additionalAuthenticatedData: Buffer.from("My authenticated data")});
   * ```
   * @param encryptParameters - The encryption parameters, keyed on the encryption algorithm chosen.
   * @param options - Additional options.
   */
  public async encrypt(
    encryptParameters: EncryptParameters,
    options?: EncryptOptions
  ): Promise<EncryptResult>;
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
    options?: EncryptOptions
  ): Promise<EncryptResult>;
  public async encrypt(
    ...args:
      | [EncryptParameters, EncryptOptions?]
      | [EncryptionAlgorithm, Uint8Array, EncryptOptions?]
  ): Promise<EncryptResult> {
    const [parameters, options] = this.disambiguateEncryptArguments(args);

    if (this.concreteClient.kind === "remote") {
      return this.concreteClient.client.encrypt(parameters, options);
    } else {
      if (!isLocallySupported(parameters.algorithm)) {
        throw new Error(
          `Algorithm ${parameters.algorithm} is not supported for a local JsonWebKey.`
        );
      }
      return this.concreteClient.client.encrypt(parameters, options);
    }
  }

  private disambiguateEncryptArguments(
    args: [EncryptParameters, EncryptOptions?] | [string, Uint8Array, EncryptOptions?]
  ): [EncryptParameters, EncryptOptions?] {
    if (typeof args[0] === "string") {
      // Sample shape: ["RSA1_5", buffer, options]
      return [
        {
          algorithm: args[0],
          plaintext: args[1]
        } as EncryptParameters,
        args[2]
      ];
    } else {
      // Sample shape: [{ algorithm: "RSA1_5", plaintext: buffer }, options]
      return [args[0], args[1] as EncryptOptions];
    }
  }

  /**
   * Decrypts the given ciphertext with the specified decryption parameters.
   * Depending on the algorithm used in the decryption parameters, the set of possible decryption parameters will change.
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(keyVaultKey, credentials);
   * let result = await client.decrypt({ algorithm: "RSA1_5", ciphertext: encryptedBuffer });
   * let result = await client.decrypt({ algorithm: "A256GCM", iv: ivFromEncryptResult, authenticationTag: tagFromEncryptResult });
   * ```
   * @param decryptParameters - The decryption parameters.
   * @param options - Additional options.
   */
  public async decrypt(
    decryptParameters: DecryptParameters,
    options?: DecryptOptions
  ): Promise<DecryptResult>;
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
    options?: DecryptOptions
  ): Promise<DecryptResult>;
  public async decrypt(
    ...args:
      | [DecryptParameters, DecryptOptions?]
      | [EncryptionAlgorithm, Uint8Array, DecryptOptions?]
  ): Promise<DecryptResult> {
    const [parameters, options] = this.disambiguateDecryptArguments(args);
    if (this.concreteClient.kind === "remote") {
      return this.concreteClient.client.decrypt(parameters, options);
    } else {
      throw new Error("Decrypting using a local JsonWebKey is not supported.");
    }
  }

  private disambiguateDecryptArguments(
    args: [DecryptParameters, DecryptOptions?] | [string, Uint8Array, DecryptOptions?]
  ): [DecryptParameters, DecryptOptions?] {
    if (typeof args[0] === "string") {
      // Sample shape: ["RSA1_5", encryptedBuffer, options]
      return [
        {
          algorithm: args[0],
          ciphertext: args[1]
        } as DecryptParameters,
        args[2]
      ];
    } else {
      // Sample shape: [{ algorithm: "RSA1_5", ciphertext: encryptedBuffer }, options]
      return [args[0], args[1] as DecryptOptions];
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
        throw new Error(`Algorithm ${algorithm} is not supported for a local JsonWebKey.`);
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
      throw new Error("Unwrapping a key using a local JsonWebKey is not supported.");
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
      throw new Error("Signing a digest using a local JsonWebKey is not supported.");
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
      throw new Error("Verifying a digest using a local JsonWebKey is not supported.");
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
      throw new Error("Signing data using a local JsonWebKey is not supported.");
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
        throw new Error(`Algorithm ${algorithm} is not supported for a local JsonWebKey.`);
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
   * Will be empty if called on a local key.
   */
  get vaultUrl(): string {
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
