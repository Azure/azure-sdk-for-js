// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  createPipelineFromOptions,
  isTokenCredential,
  TokenCredential,
  signingPolicy
} from "@azure/core-http";
import {
  EncryptParameters,
  EncryptOptions,
  EncryptResult,
  KeyWrapAlgorithm,
  WrapKeyOptions,
  WrapResult,
  VerifyOptions,
  VerifyResult,
  DecryptParameters,
  DecryptOptions,
  DecryptResult,
  UnwrapKeyOptions,
  SignOptions,
  SignResult
} from "../cryptographyClientModels";
import { challengeBasedAuthenticationPolicy } from "../../../keyvault-common";
import { SDK_VERSION } from "../constants";
import { UnwrapResult } from "../cryptographyClientModels";
import { KeyVaultClient } from "../generated";
import { parseKeyVaultKeyIdentifier } from "../identifier";
import {
  CryptographyClientOptions,
  GetKeyOptions,
  KeyVaultKey,
  LATEST_API_VERSION
} from "../keysModels";
import { getKeyFromKeyBundle } from "../transformations";
import { createHash } from "./crypto";
import { CryptographyProvider, CryptographyProviderOperation } from "./models";
import { logger } from "../log";
import { createTraceFunction, TracedFunction } from "../../../keyvault-common/src";

const withTrace: TracedFunction = createTraceFunction(
  "Azure.KeyVault.Keys.RemoteCryptographyProvider"
);

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
      const parsed = parseKeyVaultKeyIdentifier(keyId);
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

  // The remote client supports all algorithms and all operations.
  isSupported(_algorithm: string, _operation: CryptographyProviderOperation): boolean {
    return true;
  }

  encrypt(
    encryptParameters: EncryptParameters,
    options: EncryptOptions = {}
  ): Promise<EncryptResult> {
    const { algorithm, plaintext, ...params } = encryptParameters;
    const requestOptions = { ...options, ...params };

    return withTrace("encrypt", requestOptions, async (updatedOptions) => {
      const result = await this.client.encrypt(
        this.vaultUrl,
        this.name,
        this.version,
        algorithm,
        plaintext,
        updatedOptions
      );

      return {
        algorithm: encryptParameters.algorithm,
        result: result.result!,
        keyID: this.getKeyID(),
        additionalAuthenticatedData: result.additionalAuthenticatedData,
        authenticationTag: result.authenticationTag,
        iv: result.iv
      };
    });
  }

  decrypt(
    decryptParameters: DecryptParameters,
    options: DecryptOptions = {}
  ): Promise<DecryptResult> {
    const { algorithm, ciphertext, ...params } = decryptParameters;
    const requestOptions = { ...options, ...params };

    return withTrace("decrypt", requestOptions, async (updatedOptions) => {
      const result = await this.client.decrypt(
        this.vaultUrl,
        this.name,
        this.version,
        algorithm,
        ciphertext,
        updatedOptions
      );
      return {
        result: result.result!,
        keyID: this.getKeyID(),
        algorithm
      };
    });
  }

  wrapKey(
    algorithm: KeyWrapAlgorithm,
    keyToWrap: Uint8Array,
    options: WrapKeyOptions = {}
  ): Promise<WrapResult> {
    return withTrace("wrapKey", options, async (updatedOptions) => {
      const result = await this.client.wrapKey(
        this.vaultUrl,
        this.name,
        this.version,
        algorithm,
        keyToWrap,
        updatedOptions
      );

      return {
        result: result.result!,
        algorithm,
        keyID: this.getKeyID()
      };
    });
  }

  unwrapKey(
    algorithm: KeyWrapAlgorithm,
    encryptedKey: Uint8Array,
    options: UnwrapKeyOptions = {}
  ): Promise<UnwrapResult> {
    return withTrace("unwrapKey", options, async (updatedOptions) => {
      const result = await this.client.unwrapKey(
        this.vaultUrl,
        this.name,
        this.version,
        algorithm,
        encryptedKey,
        updatedOptions
      );

      return {
        result: result.result!,
        algorithm,
        keyID: this.getKeyID()
      };
    });
  }

  sign(algorithm: string, digest: Uint8Array, options: SignOptions = {}): Promise<SignResult> {
    return withTrace("sign", options, async (updatedOptions) => {
      const result = await this.client.sign(
        this.vaultUrl,
        this.name,
        this.version,
        algorithm,
        digest,
        updatedOptions
      );

      return { result: result.result!, algorithm, keyID: this.getKeyID() };
    });
  }

  verifyData(
    algorithm: string,
    data: Uint8Array,
    signature: Uint8Array,
    options: VerifyOptions = {}
  ): Promise<VerifyResult> {
    return withTrace("verifyData", options, async (updatedOptions) => {
      const hash = await createHash(algorithm, data);
      return this.verify(algorithm, hash, signature, updatedOptions);
    });
  }

  verify(
    algorithm: string,
    digest: Uint8Array,
    signature: Uint8Array,
    options: VerifyOptions = {}
  ): Promise<VerifyResult> {
    return withTrace("verify", options, async (updatedOptions) => {
      const response = await this.client.verify(
        this.vaultUrl,
        this.name,
        this.version,
        algorithm,
        digest,
        signature,
        updatedOptions
      );
      return {
        result: response.value ? response.value : false,
        keyID: this.getKeyID()
      };
    });
  }

  signData(algorithm: string, data: Uint8Array, options: SignOptions = {}): Promise<SignResult> {
    return withTrace("signData", options, async (updatedOptions) => {
      const digest = await createHash(algorithm, data);
      const result = await this.client.sign(
        this.vaultUrl,
        this.name,
        this.version,
        algorithm,
        digest,
        updatedOptions
      );
      return { result: result.result!, algorithm, keyID: this.getKeyID() };
    });
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
  getKey(options: GetKeyOptions = {}): Promise<KeyVaultKey> {
    return withTrace("getKey", options, async (updatedOptions) => {
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
    });
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
