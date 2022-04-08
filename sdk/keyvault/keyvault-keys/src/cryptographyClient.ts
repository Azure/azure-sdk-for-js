// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions, TokenCredential } from "@azure/core-http";
import {
  JsonWebKey,
  KeyVaultKey,
  CryptographyClientOptions,
  GetKeyOptions,
  KeyOperation,
  KnownKeyOperations,
} from "./keysModels";
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
  DecryptParameters,
  CryptographyClientKey,
  AesCbcEncryptParameters,
  AesCbcEncryptionAlgorithm,
} from "./cryptographyClientModels";
import { RemoteCryptographyProvider } from "./cryptography/remoteCryptographyProvider";
import { randomBytes } from "./cryptography/crypto";
import { CryptographyProvider, CryptographyProviderOperation } from "./cryptography/models";
import { RsaCryptographyProvider } from "./cryptography/rsaCryptographyProvider";
import { AesCryptographyProvider } from "./cryptography/aesCryptographyProvider";
import { tracingClient } from "./tracing";

/**
 * A client used to perform cryptographic operations on an Azure Key vault key
 * or a local {@link JsonWebKey}.
 */
export class CryptographyClient {
  /**
   * The key the CryptographyClient currently holds.
   */
  private key: CryptographyClientKey;

  /**
   * The remote provider, which would be undefined if used in local mode.
   */
  private remoteProvider?: RemoteCryptographyProvider;

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
    if (typeof key === "string") {
      // Key URL for remote-local operations.
      this.key = {
        kind: "identifier",
        value: key,
      };
      this.remoteProvider = new RemoteCryptographyProvider(key, credential!, pipelineOptions);
    } else if ("name" in key) {
      // KeyVault key for remote-local operations.
      this.key = {
        kind: "KeyVaultKey",
        value: key,
      };
      this.remoteProvider = new RemoteCryptographyProvider(key, credential!, pipelineOptions);
    } else {
      // JsonWebKey for local-only operations.
      this.key = {
        kind: "JsonWebKey",
        value: key,
      };
    }
  }

  /**
   * The base URL to the vault. If a local {@link JsonWebKey} is used vaultUrl will be empty.
   */
  get vaultUrl(): string {
    return this.remoteProvider?.vaultUrl || "";
  }

  /**
   * The ID of the key used to perform cryptographic operations for the client.
   */
  get keyID(): string | undefined {
    if (this.key.kind === "identifier") {
      return this.key.value;
    } else if (this.key.kind === "KeyVaultKey") {
      return this.key.value.id;
    } else {
      return this.key.value.kid;
    }
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
  public encrypt(
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
   * @deprecated Use `encrypt({ algorithm, plaintext }, options)` instead.
   */
  public encrypt(
    algorithm: EncryptionAlgorithm,
    plaintext: Uint8Array,
    options?: EncryptOptions
  ): Promise<EncryptResult>;
  public encrypt(
    ...args:
      | [EncryptParameters, EncryptOptions?]
      | [EncryptionAlgorithm, Uint8Array, EncryptOptions?]
  ): Promise<EncryptResult> {
    const [parameters, options] = this.disambiguateEncryptArguments(args);
    return tracingClient.withSpan("CryptographyClient.encrypt", options, async (updatedOptions) => {
      this.ensureValid(await this.fetchKey(updatedOptions), KnownKeyOperations.Encrypt);
      this.initializeIV(parameters);
      const provider = await this.getProvider("encrypt", parameters.algorithm, updatedOptions);
      try {
        return provider.encrypt(parameters, updatedOptions);
      } catch (error) {
        if (this.remoteProvider) {
          return this.remoteProvider.encrypt(parameters, updatedOptions);
        }
        throw error;
      }
    });
  }

  private initializeIV(parameters: EncryptParameters): void {
    // For AES-GCM the service **must** generate the IV, so we only populate it for AES-CBC
    const algorithmsRequiringIV: AesCbcEncryptionAlgorithm[] = [
      "A128CBC",
      "A128CBCPAD",
      "A192CBC",
      "A192CBCPAD",
      "A256CBC",
      "A256CBCPAD",
    ];

    if (parameters.algorithm in algorithmsRequiringIV) {
      try {
        const cbcParams = parameters as AesCbcEncryptParameters;
        if (!cbcParams.iv) {
          cbcParams.iv = randomBytes(16);
        }
      } catch (e) {
        throw new Error(
          `Unable to initialize IV for algorithm ${parameters.algorithm}. You may pass a valid IV to avoid this error. Error: ${e.message}`
        );
      }
    }
  }

  /**
   * Standardizes the arguments of multiple overloads into a single shape.
   * @param args - The encrypt arguments
   */
  private disambiguateEncryptArguments(
    args: [EncryptParameters, EncryptOptions?] | [string, Uint8Array, EncryptOptions?]
  ): [EncryptParameters, EncryptOptions] {
    if (typeof args[0] === "string") {
      // Sample shape: ["RSA1_5", buffer, options]
      return [
        {
          algorithm: args[0],
          plaintext: args[1],
        } as EncryptParameters,
        args[2] || {},
      ];
    } else {
      // Sample shape: [{ algorithm: "RSA1_5", plaintext: buffer }, options]
      return [args[0], (args[1] || {}) as EncryptOptions];
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
   * @deprecated Use `decrypt({ algorithm, ciphertext }, options)` instead.
   */
  public decrypt(
    algorithm: EncryptionAlgorithm,
    ciphertext: Uint8Array,
    options?: DecryptOptions
  ): Promise<DecryptResult>;
  public decrypt(
    ...args:
      | [DecryptParameters, DecryptOptions?]
      | [EncryptionAlgorithm, Uint8Array, DecryptOptions?]
  ): Promise<DecryptResult> {
    const [parameters, options] = this.disambiguateDecryptArguments(args);

    return tracingClient.withSpan("CryptographyClient.decrypt", options, async (updatedOptions) => {
      this.ensureValid(await this.fetchKey(updatedOptions), KnownKeyOperations.Decrypt);
      const provider = await this.getProvider("decrypt", parameters.algorithm, updatedOptions);
      try {
        return provider.decrypt(parameters, updatedOptions);
      } catch (error) {
        if (this.remoteProvider) {
          return this.remoteProvider.decrypt(parameters, updatedOptions);
        }
        throw error;
      }
    });
  }

  /**
   * Standardizes the arguments of multiple overloads into a single shape.
   * @param args - The decrypt arguments
   */
  private disambiguateDecryptArguments(
    args: [DecryptParameters, DecryptOptions?] | [string, Uint8Array, DecryptOptions?]
  ): [DecryptParameters, DecryptOptions] {
    if (typeof args[0] === "string") {
      // Sample shape: ["RSA1_5", encryptedBuffer, options]
      return [
        {
          algorithm: args[0],
          ciphertext: args[1],
        } as DecryptParameters,
        args[2] || {},
      ];
    } else {
      // Sample shape: [{ algorithm: "RSA1_5", ciphertext: encryptedBuffer }, options]
      return [args[0], (args[1] || {}) as DecryptOptions];
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
  public wrapKey(
    algorithm: KeyWrapAlgorithm,
    key: Uint8Array,
    options: WrapKeyOptions = {}
  ): Promise<WrapResult> {
    return tracingClient.withSpan("CryptographyClient.wrapKey", options, async (updatedOptions) => {
      this.ensureValid(await this.fetchKey(updatedOptions), KnownKeyOperations.WrapKey);
      const provider = await this.getProvider("wrapKey", algorithm, updatedOptions);
      try {
        return provider.wrapKey(algorithm, key, updatedOptions);
      } catch (err) {
        if (this.remoteProvider) {
          return this.remoteProvider.wrapKey(algorithm, key, options);
        }
        throw err;
      }
    });
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
  public unwrapKey(
    algorithm: KeyWrapAlgorithm,
    encryptedKey: Uint8Array,
    options: UnwrapKeyOptions = {}
  ): Promise<UnwrapResult> {
    return tracingClient.withSpan(
      "CryptographyClient.unwrapKey",
      options,
      async (updatedOptions) => {
        this.ensureValid(await this.fetchKey(updatedOptions), KnownKeyOperations.UnwrapKey);
        const provider = await this.getProvider("unwrapKey", algorithm, updatedOptions);
        try {
          return provider.unwrapKey(algorithm, encryptedKey, updatedOptions);
        } catch (err) {
          if (this.remoteProvider) {
            return this.remoteProvider.unwrapKey(algorithm, encryptedKey, options);
          }
          throw err;
        }
      }
    );
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
  public sign(
    algorithm: SignatureAlgorithm,
    digest: Uint8Array,
    options: SignOptions = {}
  ): Promise<SignResult> {
    return tracingClient.withSpan("CryptographyClient.sign", options, async (updatedOptions) => {
      this.ensureValid(await this.fetchKey(updatedOptions), KnownKeyOperations.Sign);
      const provider = await this.getProvider("sign", algorithm, updatedOptions);
      try {
        return provider.sign(algorithm, digest, updatedOptions);
      } catch (err) {
        if (this.remoteProvider) {
          return this.remoteProvider.sign(algorithm, digest, updatedOptions);
        }
        throw err;
      }
    });
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
  public verify(
    algorithm: SignatureAlgorithm,
    digest: Uint8Array,
    signature: Uint8Array,
    options: VerifyOptions = {}
  ): Promise<VerifyResult> {
    return tracingClient.withSpan("CryptographyClient.verify", options, async (updatedOptions) => {
      this.ensureValid(await this.fetchKey(updatedOptions), KnownKeyOperations.Verify);
      const provider = await this.getProvider("verify", algorithm, updatedOptions);
      try {
        return provider.verify(algorithm, digest, signature, updatedOptions);
      } catch (err) {
        if (this.remoteProvider) {
          return this.remoteProvider.verify(algorithm, digest, signature, updatedOptions);
        }
        throw err;
      }
    });
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
  public signData(
    algorithm: SignatureAlgorithm,
    data: Uint8Array,
    options: SignOptions = {}
  ): Promise<SignResult> {
    return tracingClient.withSpan(
      "CryptographyClient.signData",
      options,
      async (updatedOptions) => {
        this.ensureValid(await this.fetchKey(updatedOptions), KnownKeyOperations.Sign);
        const provider = await this.getProvider("signData", algorithm, updatedOptions);
        try {
          return provider.signData(algorithm, data, updatedOptions);
        } catch (err) {
          if (this.remoteProvider) {
            return this.remoteProvider.signData(algorithm, data, options);
          }
          throw err;
        }
      }
    );
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
  public verifyData(
    algorithm: SignatureAlgorithm,
    data: Uint8Array,
    signature: Uint8Array,
    options: VerifyOptions = {}
  ): Promise<VerifyResult> {
    return tracingClient.withSpan(
      "CryptographyClient.verifyData",
      options,
      async (updatedOptions) => {
        this.ensureValid(await this.fetchKey(updatedOptions), KnownKeyOperations.Verify);
        const provider = await this.getProvider("verifyData", algorithm, updatedOptions);
        try {
          return provider.verifyData(algorithm, data, signature, updatedOptions);
        } catch (err) {
          if (this.remoteProvider) {
            return this.remoteProvider.verifyData(algorithm, data, signature, updatedOptions);
          }
          throw err;
        }
      }
    );
  }

  /**
   * Retrieves the {@link JsonWebKey} from the Key Vault.
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(keyVaultKey, credentials);
   * let result = await client.getKeyMaterial();
   * ```
   */
  private async getKeyMaterial(options: GetKeyOptions): Promise<JsonWebKey> {
    const key = await this.fetchKey(options);

    switch (key.kind) {
      case "JsonWebKey":
        return key.value;
      case "KeyVaultKey":
        return key.value.key!;
      default:
        throw new Error("Failed to exchange Key ID for an actual KeyVault Key.");
    }
  }

  /**
   * Returns the underlying key used for cryptographic operations.
   * If needed, fetches the key from KeyVault and exchanges the ID for the actual key.
   * @param options - The additional options.
   */
  private async fetchKey<T extends OperationOptions>(options: T): Promise<CryptographyClientKey> {
    if (this.key.kind === "identifier") {
      // Exchange the identifier with the actual key when needed
      const key = await this.remoteProvider!.getKey(options);
      this.key = { kind: "KeyVaultKey", value: key };
    }
    return this.key;
  }

  private providers?: CryptographyProvider[];
  /**
   * Gets the provider that support this algorithm and operation.
   * The available providers are ordered by priority such that the first provider that supports this
   * operation is the one we should use.
   * @param operation - The {@link KeyOperation}.
   * @param algorithm - The algorithm to use.
   */
  private async getProvider<T extends OperationOptions>(
    operation: CryptographyProviderOperation,
    algorithm: string,
    options: T
  ): Promise<CryptographyProvider> {
    if (!this.providers) {
      const keyMaterial = await this.getKeyMaterial(options);
      // Add local crypto providers as needed
      this.providers = [
        new RsaCryptographyProvider(keyMaterial),
        new AesCryptographyProvider(keyMaterial),
      ];

      // If the remote provider exists, we're in hybrid-mode. Otherwise we're in local-only mode.
      // If we're in hybrid mode the remote provider is used as a catch-all and should be last in the list.
      if (this.remoteProvider) {
        this.providers.push(this.remoteProvider);
      }
    }

    const providers = this.providers.filter((p) => p.isSupported(algorithm, operation));

    if (providers.length === 0) {
      throw new Error(
        `Unable to support operation: "${operation}" with algorithm: "${algorithm}" ${
          this.key.kind === "JsonWebKey" ? "using a local JsonWebKey" : ""
        }`
      );
    }

    // Return the first provider that supports this request
    return providers[0];
  }

  private ensureValid(key: CryptographyClientKey, operation?: KeyOperation): void {
    if (key.kind === "KeyVaultKey") {
      const keyOps = key.value.keyOperations;
      const { notBefore, expiresOn } = key.value.properties;
      const now = new Date();

      // Check KeyVault Key Expiration
      if (notBefore && now < notBefore) {
        throw new Error(`Key ${key.value.id} can't be used before ${notBefore.toISOString()}`);
      }

      if (expiresOn && now > expiresOn) {
        throw new Error(`Key ${key.value.id} expired at ${expiresOn.toISOString()}`);
      }

      // Check Key operations
      if (operation && keyOps && !keyOps?.includes(operation)) {
        throw new Error(`Operation ${operation} is not supported on key ${key.value.id}`);
      }
    } else if (key.kind === "JsonWebKey") {
      // Check JsonWebKey Key operations
      if (operation && key.value.keyOps && !key.value.keyOps?.includes(operation)) {
        throw new Error(`Operation ${operation} is not supported on key ${key.value.kid}`);
      }
    }
  }
}
