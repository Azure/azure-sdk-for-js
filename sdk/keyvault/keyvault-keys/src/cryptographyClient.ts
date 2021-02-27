// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isNode, RequestOptionsBase, TokenCredential } from "@azure/core-http";
import {
  JsonWebKey,
  KeyVaultKey,
  CryptographyClientOptions,
  GetKeyOptions,
  KeyOperation,
  KnownKeyOperations
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
  DecryptParameters
} from "./cryptographyClientModels";
import { RsaCryptographyProvider } from "./cryptography/rsaCryptographyProvider";
import { parseKeyVaultKeyId } from "./identifier";
import { getTracer } from "@azure/core-tracing";
import {
  CryptographyProvider,
  RemoteCryptographyProvider
} from "./cryptography/remoteCryptographyProvider";
import { Span } from "@opentelemetry/api";
import { algorithm } from "./generated/models/parameters";
import { LocalCryptographyUnsupportedErrorName } from "./cryptography/models";
import { createHash } from "./cryptography/hash";

/**
 * A client used to perform cryptographic operations on an Azure Key vault key
 * or a local {@link JsonWebKey}.
 */
export class CryptographyClient {
  private key:
    | {
        kind: "identifier";
        value: string;
      }
    | {
        kind: "KeyVaultKey";
        value: KeyVaultKey;
      }
    | {
        kind: "JsonWebKey";
        value: JsonWebKey;
      };
  vaultUrl?: string;
  private credential?: TokenCredential;
  private pipelineOptions: CryptographyClientOptions | undefined;
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
    let parsed;
    if (typeof key === "string") {
      this.key = { kind: "identifier", value: key };
      parsed = parseKeyVaultKeyId(key);

      if (parsed.name === "") {
        throw new Error("Could not find 'name' of key in key URL");
      }

      if (!parsed.version || parsed.version === "") {
        throw new Error("Could not find 'version' of key in key URL");
      }

      if (!parsed.vaultUrl || parsed.vaultUrl === "") {
        throw new Error("Could not find 'vaultUrl' of key in key URL");
      }
      this.vaultUrl = parsed.vaultUrl;
    } else if ("key" in key) {
      this.key = {
        kind: "KeyVaultKey",
        value: key
      };
      parsed = parseKeyVaultKeyId(key.id!);

      if (parsed.name === "") {
        throw new Error("Could not find 'name' of key in key URL");
      }

      if (!parsed.version || parsed.version === "") {
        throw new Error("Could not find 'version' of key in key URL");
      }

      if (!parsed.vaultUrl || parsed.vaultUrl === "") {
        throw new Error("Could not find 'vaultUrl' of key in key URL");
      }
      this.vaultUrl = parsed.vaultUrl;
    } else if ("kid" in key) {
      this.key = {
        kind: "JsonWebKey",
        value: key
      };
      parsed = parseKeyVaultKeyId(key.kid!);
    } else {
      throw new Error(
        "The provided key is malformed as it does not have a value for the `key` property."
      );
    }
    this.credential = credential;
    this.pipelineOptions = pipelineOptions;
  }

  /**
   * The ID of the key used to perform cryptographic operations for the client.
   */
  public get keyId(): string | undefined {
    return this.getKeyID();
  }

  /**
   * @internal
   * @hidden
   * Attempts to retrieve the ID of the key.
   */
  private getKeyID(): string | undefined {
    if (this.key.kind === "identifier") {
      return this.key.value;
    } else if (this.key.kind === "KeyVaultKey") {
      return this.key.value.id;
    } else {
      return this.key.value.kid;
    }
  }
  /**
   * @internal
   * @hidden
   * Retrieves the {@link JsonWebKey} from the Key Vault.
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(keyVaultKey, credentials);
   * let result = await client.getKey();
   * ```
   * @param options - Options for retrieving key.
   */
  private async getKeyMaterial(): Promise<JsonWebKey> {
    // Also exchanges an identifier for an actual key
    await this.getKey();

    if (this.key.kind === "JsonWebKey") {
      return this.key.value;
    } else if (this.key.kind === "KeyVaultKey") {
      return this.key.value.key!;
    } else {
      throw new Error("Failed to exchange Key ID for an actual KeyVault Key.");
    }
  }

  async getKey(options: GetKeyOptions = {}): Promise<KeyVaultKey | JsonWebKey> {
    if (this.key.kind === "identifier") {
      // Exchange the identifier with the actual key when needed
      const remoteProvider = new RemoteCryptographyProvider(this.key.value, this.credential!);
      const key = await remoteProvider.getKey(options);
      this.key = { kind: "KeyVaultKey", value: key };
    }
    return this.key.value;
  }

  private providers?: CryptographyProvider[];
  private async getProviders(
    operation: KeyOperation,
    algorithm: string
  ): Promise<CryptographyProvider[]> {
    if (!this.providers) {
      const key = await this.getKeyMaterial();
      this.providers = [];

      // Local crypto providers in node only.
      if (isNode) {
        this.providers.push(new RsaCryptographyProvider(key));
      }

      // The remote provider should be the last provider in the list unless we're in local-only mode.
      if (this.key.kind === "KeyVaultKey" || this.key.kind === "identifier") {
        this.providers.push(
          new RemoteCryptographyProvider(this.key.value, this.credential!, this.pipelineOptions)
        );
      }
    }

    let providers = this.providers.filter((p) => p.supportsOperation(operation));

    if (algorithm) {
      providers = providers.filter((p) => p.supportsAlgorithm(algorithm));
    }

    return providers;
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
   * @deprecated Use `encrypt({ algorithm, plaintext }, options)` instead.
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
    this.ensureValid(await this.getKey(), KnownKeyOperations.Encrypt);
    const span = this.createSpan("encrypt", options);

    const providers = await this.getProviders(KnownKeyOperations.Encrypt, parameters.algorithm);
    for (const provider of providers) {
      try {
        return await provider.encrypt(parameters, options);
      } catch (e) {
        if (e.name !== LocalCryptographyUnsupportedErrorName) {
          span.end();
          throw e;
        }
      }
    }

    span.end();
    // TODO: log all providers tried
    throw new Error(`Unsupported algorithm ${algorithm} passed to encrypt.`);
  }

  private disambiguateEncryptArguments(
    args: [EncryptParameters, EncryptOptions?] | [string, Uint8Array, EncryptOptions?]
  ): [EncryptParameters, EncryptOptions] {
    if (typeof args[0] === "string") {
      // Sample shape: ["RSA1_5", buffer, options]
      return [
        {
          algorithm: args[0],
          plaintext: args[1]
        } as EncryptParameters,
        args[2] || {}
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
    this.ensureValid(await this.getKey(), KnownKeyOperations.Decrypt);
    const span = this.createSpan("decrypt", options);

    const providers = await this.getProviders(KnownKeyOperations.Decrypt, parameters.algorithm);
    for (const provider of providers) {
      try {
        return await provider.decrypt(parameters, options);
      } catch (e) {
        console.log("e", e);
        console.log("e.name", e.name);
        if (e.name !== LocalCryptographyUnsupportedErrorName) {
          span.end();
          throw e;
        }
      }
    }

    span.end();
    // TODO: log all providers tried
    throw new Error(`Unsupported algorithm ${algorithm} passed to encrypt.`);
  }

  private disambiguateDecryptArguments(
    args: [DecryptParameters, DecryptOptions?] | [string, Uint8Array, DecryptOptions?]
  ): [DecryptParameters, DecryptOptions] {
    if (typeof args[0] === "string") {
      // Sample shape: ["RSA1_5", encryptedBuffer, options]
      return [
        {
          algorithm: args[0],
          ciphertext: args[1]
        } as DecryptParameters,
        args[2] || {}
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
  public async wrapKey(
    algorithm: KeyWrapAlgorithm,
    key: Uint8Array,
    options: WrapKeyOptions = {}
  ): Promise<WrapResult> {
    this.ensureValid(await this.getKey(), KnownKeyOperations.WrapKey);
    const span = this.createSpan("wrapKey", options);

    const providers = await this.getProviders(KnownKeyOperations.WrapKey, algorithm);
    for (const provider of providers) {
      try {
        return await provider.wrapKey(algorithm, key, options);
      } catch (e) {
        if (e.name !== LocalCryptographyUnsupportedErrorName) {
          span.end();
          throw e;
        }
      }
    }

    span.end();

    throw new Error(`Unsupported algorithm ${algorithm} passed to encrypt.`);
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
    this.ensureValid(await this.getKey(), KnownKeyOperations.UnwrapKey);
    const providers = await this.getProviders(KnownKeyOperations.UnwrapKey, algorithm);
    const span = this.createSpan("encrypt", options);

    for (const provider of providers) {
      try {
        return await provider.unwrapKey(algorithm, encryptedKey, options);
      } catch (e) {
        if (e !== LocalCryptographyUnsupportedErrorName) {
          span.end();
          throw e;
        }
      }
    }

    span.end();

    throw new Error("TODO: fill in error details");
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
    this.ensureValid(await this.getKey(), KnownKeyOperations.Sign);
    const span = this.createSpan("encrypt", options);

    const providers = await this.getProviders(KnownKeyOperations.Sign, algorithm);
    for (const provider of providers) {
      try {
        return await provider.sign(algorithm, digest, options);
      } catch (e) {
        if (e.name !== LocalCryptographyUnsupportedErrorName) {
          span.end();
          throw e;
        }
      }
    }

    span.end();

    throw new Error("TODO: fill in error details");
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
    this.ensureValid(await this.getKey(), KnownKeyOperations.Verify);
    const span = this.createSpan("encrypt", options);

    const providers = await this.getProviders(KnownKeyOperations.Verify, algorithm);
    for (const provider of providers) {
      try {
        return provider.verify(algorithm, digest, signature, options);
      } catch (e) {
        if (e.name !== LocalCryptographyUnsupportedErrorName) {
          span.end();
          throw e;
        }
      }
    }

    span.end();

    throw new Error("TODO: fill in error details");
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
    this.ensureValid(await this.getKey(), KnownKeyOperations.Sign);
    const span = this.createSpan("encrypt", options);

    const providers = await this.getProviders(KnownKeyOperations.Sign, algorithm);
    const digest = await createHash(algorithm, data);
    for (const provider of providers) {
      try {
        return await provider.sign(algorithm, digest, options);
      } catch (e) {
        if (e.name !== LocalCryptographyUnsupportedErrorName) {
          span.end();
          throw e;
        }
      }
    }

    span.end();
    throw new Error("TODO: fill in error details");
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
    this.ensureValid(await this.getKey(), KnownKeyOperations.Verify);
    const span = this.createSpan("encrypt", options);

    const providers = await this.getProviders(KnownKeyOperations.Verify, algorithm);
    const digest = await createHash(algorithm, data);
    // TODO: with just one or two providers there's no reason to loop...
    for (const provider of providers) {
      return await provider.verify(algorithm, digest, signature, options);
    }

    span.end();
    throw new Error("TODO: fill in error details");
  }

  /**
   * @internal
   * Creates a span using the tracer that was set by the user.
   * @param methodName - The name of the method creating the span.
   * @param options - The options for the underlying HTTP request.
   */
  private createSpan(methodName: string, requestOptions?: RequestOptionsBase): Span {
    const tracer = getTracer();
    const span = tracer.startSpan(
      `CryptographyClient ${methodName}`,
      requestOptions && requestOptions.spanOptions
    );
    span.setAttribute("az.namespace", "Microsoft.KeyVault");
    return span;
  }

  private ensureValid(key: KeyVaultKey | JsonWebKey, operation?: KeyOperation): void {
    if ("name" in key) {
      const attributes = key.properties;
      const keyOps = key.keyOperations;
      const { notBefore, expiresOn } = attributes;
      const now = new Date();

      if (!key.id) {
        throw new Error(
          "Only local cryptography operations can be performed on JsonWebKeys without kid"
        );
      }

      if (notBefore && now < notBefore) {
        throw new Error(`Key ${key.id} can't be used before ${notBefore.toISOString()}`);
      }

      if (expiresOn && now > expiresOn) {
        throw new Error(`Key ${key.id} expired at ${expiresOn.toISOString()}`);
      }

      if (operation && !keyOps?.includes(operation)) {
        throw new Error(`Operation ${operation} is not supported on key ${key.id}`);
      }
    } else {
      if (operation && !key.keyOps?.includes(operation)) {
        throw new Error(`Operation ${operation} is not supported on key ${key.kid}`);
      }
    }
  }
}
