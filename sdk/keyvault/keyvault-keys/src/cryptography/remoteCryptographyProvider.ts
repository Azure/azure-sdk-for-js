// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  createPipelineFromOptions,
  isTokenCredential,
  OperationOptions,
  signingPolicy
} from "@azure/core-http";
import { TokenCredential } from "@azure/identity";
import {
  EncryptParameters,
  EncryptOptions,
  EncryptResult,
  KeyWrapAlgorithm,
  WrapKeyOptions,
  WrapResult,
  VerifyOptions,
  VerifyResult,
  KeyVaultKey,
  CryptographyClientOptions,
  DecryptParameters,
  DecryptOptions,
  DecryptResult,
  UnwrapKeyOptions,
  SignOptions,
  SignResult,
  logger,
  GetKeyOptions
} from "..";
import { createSpan } from "../tracing";
import { challengeBasedAuthenticationPolicy } from "../../../keyvault-common";
import { SDK_VERSION } from "../constants";
import { UnwrapResult } from "../cryptographyClientModels";
import { KeyVaultClient } from "../generated";
import { parseKeyVaultKeyId } from "../identifier";
import { LATEST_API_VERSION } from "../keysModels";
import { getKeyFromKeyBundle } from "../transformations";
import { createHash } from "./hash";
import { CryptographyProvider } from "./models";
import { Span } from "@opentelemetry/api";

/**
 * The remote cryptography provider is used to run crypto operations against KeyVault.
 * @internal
 */
export class RemoteCryptographyProvider implements CryptographyProvider {
  constructor(
    key: string | KeyVaultKey,
    credential: TokenCredential,
    pipelineOptions: CryptographyClientOptions = {}
  ) {
    const libInfo = `azsdk-js-keyvault-keys/${SDK_VERSION}`;

    const userAgentOptions = pipelineOptions.userAgentOptions;

    pipelineOptions.userAgentOptions = {
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
      loggingOptions: {
        logger: logger.info,
        allowedHeaderNames: [
          "x-ms-keyvault-region",
          "x-ms-keyvault-network-info",
          "x-ms-keyvault-service-version"
        ]
      }
    };

    this.client = new KeyVaultClient(
      pipelineOptions.serviceVersion || LATEST_API_VERSION,
      createPipelineFromOptions(internalPipelineOptions, authPolicy)
    );

    this.key = key;

    let keyId: string;
    if (typeof key === "string") {
      keyId = key;
    } else {
      keyId = key.id!;
    }

    try {
      const parsed = parseKeyVaultKeyId(keyId);
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
    } catch (err) {
      logger.error(err);

      throw new Error(`${keyId} is not a valid Key Vault key ID`);
    }
  }

  async encrypt(
    encryptParameters: EncryptParameters,
    options: EncryptOptions
  ): Promise<EncryptResult> {
    const { algorithm, plaintext, ...params } = encryptParameters;
    const requestOptions = { ...options, ...params };
    const { span, updatedOptions } = this.createSpan("encrypt", requestOptions);

    let result;
    try {
      result = await this.client.encrypt(
        this.vaultUrl,
        this.name,
        this.version,
        algorithm,
        plaintext,
        updatedOptions
      );
    } finally {
      span.end();
    }

    return {
      algorithm: encryptParameters.algorithm,
      result: result.result!,
      keyID: this.getKeyID(),
      additionalAuthenticatedData: result.additionalAuthenticatedData,
      authenticationTag: result.authenticationTag,
      iv: result.iv
    };
  }

  async decrypt(
    decryptParameters: DecryptParameters,
    options: DecryptOptions
  ): Promise<DecryptResult> {
    const { algorithm, ciphertext, ...params } = decryptParameters;
    const requestOptions = { ...options, ...params };
    const { span, updatedOptions } = this.createSpan("decrypt", requestOptions);

    let result;
    try {
      result = await this.client.decrypt(
        this.vaultUrl,
        this.name,
        this.version,
        algorithm,
        ciphertext,
        updatedOptions
      );
    } finally {
      span.end();
    }

    return {
      result: result.result!,
      keyID: this.getKeyID(),
      algorithm
    };
  }

  // The remote client supports all algorithms and all operations.
  supportsAlgorithm(_algorithm: string): boolean {
    return true;
  }

  supportsOperation(_operation: string): boolean {
    return true;
  }

  async wrapKey(
    algorithm: KeyWrapAlgorithm,
    keyToWrap: Uint8Array,
    options: WrapKeyOptions
  ): Promise<WrapResult> {
    const { span, updatedOptions } = this.createSpan("wrapKey", options);

    let result;
    try {
      result = await this.client.wrapKey(
        this.vaultUrl,
        this.name,
        this.version,
        algorithm,
        keyToWrap,
        updatedOptions
      );
    } finally {
      span.end();
    }

    return { result: result.result!, algorithm, keyID: this.getKeyID() };
  }

  async unwrapKey(
    algorithm: KeyWrapAlgorithm,
    encryptedKey: Uint8Array,
    options: UnwrapKeyOptions
  ): Promise<UnwrapResult> {
    const { span, updatedOptions } = this.createSpan("unwrapKey", options);

    let result;
    try {
      result = await this.client.unwrapKey(
        this.vaultUrl,
        this.name,
        this.version,
        algorithm,
        encryptedKey,
        updatedOptions
      );
    } finally {
      span.end();
    }

    return { result: result.result!, algorithm, keyID: this.getKeyID() };
  }

  async sign(algorithm: string, digest: Uint8Array, options: SignOptions): Promise<SignResult> {
    const { span, updatedOptions } = this.createSpan("sign", options);

    let result;
    try {
      result = await this.client.sign(
        this.vaultUrl,
        this.name,
        this.version,
        algorithm,
        digest,
        updatedOptions
      );
    } finally {
      span.end();
    }

    return { result: result.result!, algorithm, keyID: this.getKeyID() };
  }

  async verify(
    algorithm: string,
    digest: Uint8Array,
    signature: Uint8Array,
    options: VerifyOptions
  ): Promise<VerifyResult> {
    const { span, updatedOptions } = createSpan("verify", options);

    let response;
    try {
      response = await this.client.verify(
        this.vaultUrl,
        this.name,
        this.version,
        algorithm,
        digest,
        signature,
        updatedOptions
      );
    } finally {
      span.end();
    }

    return { result: response.value ? response.value : false, keyID: this.getKeyID() };
  }

  async signData(algorithm: string, data: Uint8Array, options: SignOptions): Promise<SignResult> {
    const { span, updatedOptions } = createSpan("signData", options);

    const digest = await createHash(algorithm, data);

    let result;
    try {
      result = await this.client.sign(
        this.vaultUrl,
        this.name,
        this.version,
        algorithm,
        digest,
        updatedOptions
      );
    } finally {
      span.end();
    }

    return { result: result.result!, algorithm, keyID: this.getKeyID() };
  }

  /**
   * The base URL to the vault.
   */
  readonly vaultUrl: string;

  /**
   * The ID of the key used to perform cryptographic operations for the client.
   */
  get keyId(): string | undefined {
    return this.getKeyID();
  }

  /**
   * Gets the {@link KeyVaultKey} used for cryptography operations, fetching it
   * from KeyVault if necessary.
   * @param options - Additional options.
   */
  async getKey(options: GetKeyOptions): Promise<KeyVaultKey> {
    const { span, updatedOptions } = createSpan("getKey", options);

    try {
      if (typeof this.key === "string") {
        if (!this.name || this.name === "") {
          throw new Error("getKey requires a key with a name");
        }
        const response = await this.client.getKey(
          this.vaultUrl,
          this.name,
          options && options.version ? options.version : this.version ? this.version : "",
          updatedOptions
        );
        this.key = getKeyFromKeyBundle(response);
      }
      return this.key;
    } finally {
      span.end();
    }
  }

  private createSpan(
    methodName: string,
    options: OperationOptions
  ): { span: Span; updatedOptions: OperationOptions } {
    return createSpan(`RemoteCryptographyProvider-${methodName}`, options);
  }

  /**
   * @internal
   * A reference to the auto-generated KeyVault HTTP client.
   */
  private readonly client: KeyVaultClient;

  /**
   * A reference to the key used for the cryptographic operations.
   * Based on what was provided to the CryptographyClient constructor,
   * it can be either a string with the URL of a Key Vault Key, or an already parsed {@link KeyVaultKey}.
   * @internal
   */
  private key: string | KeyVaultKey;

  /**
   * Name of the key the client represents
   * @internal
   */
  private name: string;

  /**
   * Version of the key the client represents
   * @internal
   */
  private version: string;

  /**
   * Attempts to retrieve the ID of the key.
   * @internal
   */
  private getKeyID(): string | undefined {
    let kid;
    if (typeof this.key !== "string") {
      kid = this.key.id;
    } else {
      kid = this.key;
    }

    return kid;
  }
}
