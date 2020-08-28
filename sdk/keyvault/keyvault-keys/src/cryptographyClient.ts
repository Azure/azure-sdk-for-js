// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  TokenCredential,
  createPipelineFromOptions,
  isTokenCredential,
  RequestOptionsBase,
  signingPolicy,
  operationOptionsToRequestOptionsBase
} from "@azure/core-http";

import { getTracer } from "@azure/core-tracing";
import { Span } from "@opentelemetry/api";

import { logger } from "./log";
import { SDK_VERSION } from "./generated/utils/constants";
import { KeyVaultClient } from "./generated/keyVaultClient";
import { challengeBasedAuthenticationPolicy } from "../../keyvault-common/src";

import {
  LocalSupportedAlgorithmName,
  localSupportedAlgorithms,
  LocalCryptographyOperationFunction,
  isLocallySupported
} from "./localCryptography/algorithms";

import { LocalCryptographyClient } from "./localCryptographyClient";

import {
  JsonWebKey,
  GetKeyOptions,
  KeyVaultKey,
  LATEST_API_VERSION,
  CryptographyOptions,
  CryptographyClientOptions,
  KeyOperation
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
  EncryptResult
} from "./cryptographyClientModels";
import { KeyBundle } from "./generated/models";
import { parseKeyVaultKeysIdentifier } from "./identifier";

/**
 * Checks whether a key can be used at that specific moment,
 * by comparing the current date with the bundle's notBefore and expires values.
 */
export function checkKeyValidity(keyId?: string, keyBundle?: KeyBundle) {
  const attributes = keyBundle?.attributes || {};
  const { notBefore, expires } = attributes;
  const now = new Date();

  if (!keyId) {
    throw new Error(
      "Only local cryptography operations can be performed on JsonWebKeys without kid"
    );
  }

  if (notBefore && now < notBefore) {
    throw new Error(`Key ${keyId} can't be used before ${notBefore.toISOString()}`);
  }

  if (expires && now > expires) {
    throw new Error(`Key ${keyId} expired at ${expires.toISOString()}`);
  }
}

/**
 * A client used to perform cryptographic operations with Azure Key Vault keys.
 */
export class CryptographyClient {
  /**
   * @internal
   * @ignore
   * Retrieves the {@link JsonWebKey} from the Key Vault.
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(keyVaultKey, credentials);
   * let result = await client.getKey();
   * ```
   * @param {GetKeyOptions} [options] Options for retrieving key.
   */
  private async getKey(options: GetKeyOptions = {}): Promise<JsonWebKey> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("getKey", requestOptions);

    if (typeof this.key === "string") {
      if (!this.name || this.name === "") {
        throw new Error("getKey requires a key with a name");
      }
      const keyBundle = await this.client.getKey(
        this.vaultUrl,
        this.name,
        options && options.version ? options.version : this.version ? this.version : "",
        this.setParentSpan(span, requestOptions)
      );
      this.keyBundle = keyBundle;
      return keyBundle.key! as JsonWebKey;
    } else {
      return this.key;
    }
  }

  /**
   * Encrypts the given plaintext with the specified cryptography algorithm
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(keyVaultKey, credentials);
   * let result = await client.encrypt("RSA1_5", Buffer.from("My Message"));
   * ```
   * @param {EncryptionAlgorithm} algorithm The algorithm to use.
   * @param {Uint8Array} plaintext The text to encrypt.
   * @param {EncryptOptions} [options] Additional options.
   */
  public async encrypt(
    algorithm: EncryptionAlgorithm,
    plaintext: Uint8Array,
    options: EncryptOptions = {}
  ): Promise<EncryptResult> {
    const localCryptographyClient = await this.getLocalCryptographyClient();
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("encrypt", requestOptions);

    await this.checkPermissions("encrypt");
    await this.getLocalCryptographyClient();
    checkKeyValidity(this.getKeyID(), this.keyBundle);

    if (localCryptographyClient && isLocallySupported(algorithm)) {
      try {
        return localCryptographyClient.encrypt(algorithm as LocalSupportedAlgorithmName, plaintext);
      } catch (e) {
        if (e.name !== "LocalCryptographyUnsupportedError") {
          span.end();
          throw e;
        }
      }
    }

    // Default to the service

    let result;
    try {
      result = await this.client.encrypt(
        this.vaultUrl,
        this.name,
        this.version,
        algorithm,
        plaintext,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return { result: result.result!, algorithm, keyID: this.getKeyID() };
  }

  /**
   * Decrypts the given ciphertext with the specified cryptography algorithm
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(keyVaultKey, credentials);
   * let result = await client.decrypt("RSA1_5", encryptedBuffer);
   * ```
   * @param {EncryptionAlgorithm} algorithm The algorithm to use.
   * @param {Uint8Array} ciphertext The text to decrypt.
   * @param {EncryptOptions} [options] Additional options.
   */

  public async decrypt(
    algorithm: EncryptionAlgorithm,
    ciphertext: Uint8Array,
    options: DecryptOptions = {}
  ): Promise<DecryptResult> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("decrypt", requestOptions);

    await this.checkPermissions("decrypt");
    await this.getLocalCryptographyClient();
    checkKeyValidity(this.getKeyID(), this.keyBundle);

    // Default to the service

    let result;
    try {
      result = await this.client.decrypt(
        this.vaultUrl,
        this.name,
        this.version,
        algorithm,
        ciphertext,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return { result: result.result!, keyID: this.getKeyID(), algorithm };
  }

  /**
   * Wraps the given key using the specified cryptography algorithm
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(keyVaultKey, credentials);
   * let result = await client.wrapKey("RSA1_5", keyToWrap);
   * ```
   * @param {KeyWrapAlgorithm} algorithm The encryption algorithm to use to wrap the given key.
   * @param {Uint8Array} key The key to wrap.
   * @param {EncryptOptions} [options] Additional options.
   */
  public async wrapKey(
    algorithm: KeyWrapAlgorithm,
    key: Uint8Array,
    options: WrapKeyOptions = {}
  ): Promise<WrapResult> {
    const localCryptographyClient = await this.getLocalCryptographyClient();
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("decrypt", requestOptions);

    await this.checkPermissions("wrapKey");
    await this.getLocalCryptographyClient();
    checkKeyValidity(this.getKeyID(), this.keyBundle);

    if (localCryptographyClient && isLocallySupported(algorithm)) {
      try {
        return localCryptographyClient.wrapKey(algorithm as LocalSupportedAlgorithmName, key);
      } catch (e) {
        if (e.name !== "LocalCryptographyUnsupportedError") {
          span.end();
          throw e;
        }
      }
    }

    // Default to the service

    let result;
    try {
      result = await this.client.wrapKey(
        this.vaultUrl,
        this.name,
        this.version,
        algorithm,
        key,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return { result: result.result!, algorithm, keyID: this.getKeyID() };
  }

  /**
   * Unwraps the given wrapped key using the specified cryptography algorithm
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(keyVaultKey, credentials);
   * let result = await client.unwrapKey("RSA1_5", keyToUnwrap);
   * ```
   * @param {KeyWrapAlgorithm} algorithm The decryption algorithm to use to unwrap the key.
   * @param {Uint8Array} encryptedKey The encrypted key to unwrap.
   * @param {EncryptOptions} [options] Additional options.
   */
  public async unwrapKey(
    algorithm: KeyWrapAlgorithm,
    encryptedKey: Uint8Array,
    options: UnwrapKeyOptions = {}
  ): Promise<UnwrapResult> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("unwrapKey", requestOptions);

    await this.checkPermissions("unwrapKey");
    await this.getLocalCryptographyClient();
    checkKeyValidity(this.getKeyID(), this.keyBundle);

    // Default to the service

    let result;
    try {
      result = await this.client.unwrapKey(
        this.vaultUrl,
        this.name,
        this.version,
        algorithm,
        encryptedKey,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return { result: result.result!, keyID: this.getKeyID() };
  }

  /**
   * Cryptographically sign the digest of a message
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(keyVaultKey, credentials);
   * let result = await client.sign("RS256", digest);
   * ```
   * @param {KeySignatureAlgorithm} algorithm The signing algorithm to use.
   * @param {Uint8Array} digest The digest of the data to sign.
   * @param {EncryptOptions} [options] Additional options.
   */
  public async sign(
    algorithm: SignatureAlgorithm,
    digest: Uint8Array,
    options: SignOptions = {}
  ): Promise<SignResult> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("sign", requestOptions);

    await this.checkPermissions("sign");
    await this.getLocalCryptographyClient();
    checkKeyValidity(this.getKeyID(), this.keyBundle);

    let result;
    try {
      result = await this.client.sign(
        this.vaultUrl,
        this.name,
        this.version,
        algorithm,
        digest,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return { result: result.result!, algorithm, keyID: this.getKeyID() };
  }

  /**
   * Verify the signed message digest
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(keyVaultKey, credentials);
   * let result = await client.verify("RS256", signedDigest, signature);
   * ```
   * @param {KeySignatureAlgorithm} algorithm The signing algorithm to use to verify with.
   * @param {Uint8Array} digest The digest to verify.
   * @param {Uint8Array} signature The signature to verify the digest against.
   * @param {EncryptOptions} [options] Additional options.
   */
  public async verify(
    algorithm: SignatureAlgorithm,
    digest: Uint8Array,
    signature: Uint8Array,
    options: VerifyOptions = {}
  ): Promise<VerifyResult> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("verify", requestOptions);

    await this.checkPermissions("verify");
    await this.getLocalCryptographyClient();
    checkKeyValidity(this.getKeyID(), this.keyBundle);

    let response;
    try {
      response = await this.client.verify(
        this.vaultUrl,
        this.name,
        this.version,
        algorithm,
        digest,
        signature,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return { result: response.value ? response.value : false, keyID: this.getKeyID() };
  }

  /**
   * Cryptographically sign a block of data
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(keyVaultKey, credentials);
   * let result = await client.signData("RS256", message);
   * ```
   * @param {KeySignatureAlgorithm} algorithm The signing algorithm to use.
   * @param {Uint8Array} data The data to sign.
   * @param {EncryptOptions} [options] Additional options.
   */
  public async signData(
    algorithm: SignatureAlgorithm,
    data: Uint8Array,
    options: SignOptions = {}
  ): Promise<SignResult> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("unwrapKey", requestOptions);

    await this.checkPermissions("sign");
    await this.getLocalCryptographyClient();
    checkKeyValidity(this.getKeyID(), this.keyBundle);

    if (!isLocallySupported(algorithm)) {
      throw new Error(`Unsupported algorithm ${algorithm}`);
    }
    const localAlgorithm = algorithm as LocalSupportedAlgorithmName;

    // Not supported locally yet

    const createHash: LocalCryptographyOperationFunction = localSupportedAlgorithms[localAlgorithm]
      ?.operations.createHash as LocalCryptographyOperationFunction;
    const digest = await createHash("", Buffer.from(data));

    // Default to the service

    let result;
    try {
      result = await this.client.sign(
        this.vaultUrl,
        this.name,
        this.version,
        algorithm,
        digest,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return { result: result.result!, algorithm, keyID: this.getKeyID() };
  }

  /**
   * Verify the signed block of data
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(keyVaultKey, credentials);
   * let result = await client.verifyData("RS256", signedMessage, signature);
   * ```
   * @param {KeySignatureAlgorithm} algorithm The algorithm to use to verify with.
   * @param {Uint8Array} data The signed block of data to verify.
   * @param {Uint8Array} signature The signature to verify the block against.
   * @param {EncryptOptions} [options] Additional options.
   */
  public async verifyData(
    algorithm: SignatureAlgorithm,
    data: Uint8Array,
    signature: Uint8Array,
    options: VerifyOptions = {}
  ): Promise<VerifyResult> {
    const localCryptographyClient = await this.getLocalCryptographyClient();
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("decrypt", requestOptions);

    await this.checkPermissions("verify");
    await this.getLocalCryptographyClient();
    checkKeyValidity(this.getKeyID(), this.keyBundle);

    if (!isLocallySupported(algorithm)) {
      throw new Error(`Unsupported algorithm ${algorithm}`);
    }
    const localAlgorithm = algorithm as LocalSupportedAlgorithmName;

    if (localCryptographyClient) {
      try {
        return localCryptographyClient.verifyData(localAlgorithm, data, signature);
      } catch (e) {
        if (e.name !== "LocalCryptographyUnsupportedError") {
          span.end();
          throw e;
        }
      }
    }

    const createHash: LocalCryptographyOperationFunction = localSupportedAlgorithms[localAlgorithm]
      ?.operations.createHash as LocalCryptographyOperationFunction;
    const digest = await createHash("", Buffer.from(data));

    // Default to the service

    let result;
    try {
      result = await this.client.verify(
        this.vaultUrl,
        this.name,
        this.version,
        algorithm,
        digest,
        signature,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return { result: result.value!, keyID: this.getKeyID() };
  }

  /**
   * @internal
   * @ignore
   * Attempts to retrieve the ID of the key.
   */
  private getKeyID(): string | undefined {
    let kid;
    if (typeof this.key !== "string") {
      kid = this.key.kid;
    } else {
      kid = this.key;
    }

    return kid;
  }

  /**
   * The base URL to the vault
   */
  public readonly vaultUrl: string;

  /**
   * @internal
   * @ignore
   * A reference to the auto-generated KeyVault HTTP client.
   */
  private readonly client: KeyVaultClient;

  /**
   * Other relevant information of the Key Vault Key that will be used for cryptographic operations.
   */
  private keyBundle: KeyBundle | undefined;

  /**
   * A reference to the key used for the cryptographic operations.
   * Based on what was provided to the CryptographyClient constructor, it can be either a string with the URL of a Key Vault Key, or an already parsed {@link JsonWebKey}.
   */
  private key: string | JsonWebKey;

  /**
   * Name of the key the client represents
   */
  private name: string;

  /**
   * Version of the key the client represents
   */
  private version: string;

  /**
   * Tries to load the full Key Vault Key and then creates the Local Cryptography Client
   */
  private _localCryptographyClientPromise?: Promise<LocalCryptographyClient>;

  /**
   * Returns a promise that resolves once the Local Cryptography Client is available.
   */
  private getLocalCryptographyClient(): Promise<LocalCryptographyClient> | undefined {
    if (!this._localCryptographyClientPromise) {
      this._localCryptographyClientPromise = this.configureLocalCryptographyClient();
    }
    return this._localCryptographyClientPromise;
  }

  private async configureLocalCryptographyClient(): Promise<LocalCryptographyClient> {
    this.key = await this.getKey();
    return new LocalCryptographyClient(this.key as JsonWebKey);
  }

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
   * @param key The key to use during cryptography tasks. You can also pass the identifier of the key i.e its url here.
   * @param {TokenCredential} credential An object that implements the `TokenCredential` interface used to authenticate requests to the service. Use the @azure/identity package to create a credential that suits your needs.
   * @param {PipelineOptions} [pipelineOptions={}] Optional. Pipeline options used to configure Key Vault API requests.
   *                                                         Omit this parameter to use the default pipeline configuration.
   * @memberof CryptographyClient
   */
  constructor(
    key: string | KeyVaultKey,
    credential: TokenCredential,
    pipelineOptions: CryptographyClientOptions = {}
  ) {
    const libInfo = `azsdk-js-keyvault-keys/${SDK_VERSION}`;

    const userAgentOptions = pipelineOptions.userAgentOptions;

    pipelineOptions.userAgentOptions = {
      ...pipelineOptions.userAgentOptions,
      userAgentPrefix:
        userAgentOptions && userAgentOptions.userAgentPrefix
          ? `${userAgentOptions.userAgentPrefix} ${libInfo}`
          : libInfo
    };

    const authPolicy = isTokenCredential(credential)
      ? challengeBasedAuthenticationPolicy(credential)
      : signingPolicy(credential);

    const internalPipelineOptions = {
      ...pipelineOptions,
      ...{
        loggingOptions: {
          logger: logger.info,
          logPolicyOptions: {
            allowedHeaderNames: [
              "x-ms-keyvault-region",
              "x-ms-keyvault-network-info",
              "x-ms-keyvault-service-version"
            ]
          }
        }
      }
    };

    const pipeline = createPipelineFromOptions(internalPipelineOptions, authPolicy);
    this.client = new KeyVaultClient(
      pipelineOptions.serviceVersion || LATEST_API_VERSION,
      pipeline
    );

    let parsed;
    if (typeof key === "string") {
      this.key = key;
      parsed = parseKeyVaultKeysIdentifier(this.key);
    } else if (key.key) {
      this.key = key.key;
      parsed = parseKeyVaultKeysIdentifier(this.key.kid!);
    } else {
      throw new Error(
        "The provided key is malformed as it does not have a value for the `key` property."
      );
    }

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
    this.name = parsed.name;
    this.version = parsed.version;
  }

  /**
   * @internal
   * @ignore
   * Creates a span using the tracer that was set by the user.
   * @param {string} methodName The name of the method creating the span.
   * @param {RequestOptionsBase} [options] The options for the underlying HTTP request.
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

  /**
   * @internal
   * @ignore
   * Returns updated HTTP options with the given span as the parent of future spans,
   * if applicable.
   * @param {Span} span The span for the current operation.
   * @param {RequestOptionsBase} [options] The options for the underlying HTTP request.
   */
  private setParentSpan(span: Span, options: RequestOptionsBase = {}): RequestOptionsBase {
    if (span.isRecording()) {
      const spanOptions = options.spanOptions || {};
      return {
        ...options,
        spanOptions: {
          ...spanOptions,
          parent: span.context(),
          attributes: {
            ...spanOptions.attributes,
            "az.namespace": "Microsoft.KeyVault"
          }
        }
      };
    } else {
      return options;
    }
  }

  /**
   * Checks whether the internal key can be used to execute a given operation, by the operation's name.
   * @param operation The name of the operation that is expected to be viable
   */
  private async checkPermissions(operation: KeyOperation): Promise<void> {
    await this.getLocalCryptographyClient();

    if (typeof this.key !== "string" && this.key.keyOps && !this.key.keyOps.includes(operation)) {
      throw new Error(`Operation ${operation} is not supported on key ${this.getKeyID()}`);
    }
  }
}

/**
 * Options for {@link encrypt}.
 */
export interface EncryptOptions extends CryptographyOptions {}

/**
 * Options for {@link decrypt}.
 */
export interface DecryptOptions extends CryptographyOptions {}

/**
 * Options for {@link sign}.
 */
export interface SignOptions extends CryptographyOptions {}

/**
 * Options for {@link verify}.
 */
export interface VerifyOptions extends CryptographyOptions {}

/**
 * Options for {@link wrapKey}.
 */
export interface WrapKeyOptions extends CryptographyOptions {}

/**
 * Options for {@link unwrapKey}.
 */
export interface UnwrapKeyOptions extends CryptographyOptions {}
