// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TokenCredential } from "@azure/core-auth";

import type {
  DecryptOptions,
  DecryptParameters,
  DecryptResult,
  EncryptOptions,
  EncryptParameters,
  EncryptResult,
  KeyWrapAlgorithm,
  SignOptions,
  SignResult,
  UnwrapKeyOptions,
  VerifyOptions,
  VerifyResult,
  WrapKeyOptions,
  WrapResult,
} from "../cryptographyClientModels.js";
import { SDK_VERSION } from "../constants.js";
import type { UnwrapResult } from "../cryptographyClientModels.js";
import type { KeyVaultClientOptionalParams } from "../keyVaultClient.js";
import { KeyVaultClient } from "../keyVaultClient.js";
import { parseKeyVaultKeyIdentifier } from "../identifier.js";
import type { CryptographyClientOptions, GetKeyOptions, KeyVaultKey } from "../keysModels.js";
import { LATEST_API_VERSION } from "../keysModels.js";
import { getKeyFromKeyBundle } from "../transformations.js";
import { createHash } from "./crypto.js";
import type { CryptographyProvider, CryptographyProviderOperation } from "./models.js";
import { logger } from "../logger.js";
import { keyVaultAuthenticationPolicy } from "@azure/keyvault-common";
import { tracingClient } from "../tracing.js";
import { bearerTokenAuthenticationPolicyName } from "@azure/core-rest-pipeline";

/**
 * The remote cryptography provider is used to run crypto operations against KeyVault.
 * @internal
 */
export class RemoteCryptographyProvider implements CryptographyProvider {
  constructor(
    key: string | KeyVaultKey,
    credential: TokenCredential,
    pipelineOptions: CryptographyClientOptions = {},
  ) {
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

      if (!parsed.vaultUrl || parsed.vaultUrl === "") {
        throw new Error("Could not find 'vaultUrl' of key in key URL");
      }

      this.vaultUrl = parsed.vaultUrl;
      this.name = parsed.name;
      this.version = parsed.version ?? "";

      this.client = getOrInitializeClient(this.vaultUrl, credential, pipelineOptions);
    } catch (err: any) {
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
    options: EncryptOptions = {},
  ): Promise<EncryptResult> {
    const { algorithm, plaintext, ...params } = encryptParameters;
    const requestOptions = { ...options, ...params };

    return tracingClient.withSpan(
      "RemoteCryptographyProvider.encrypt",
      requestOptions,
      async (updatedOptions) => {
        const result = await this.client.encrypt(
          this.name,
          this.version,
          {
            algorithm,
            value: plaintext,
            aad:
              "additionalAuthenticatedData" in encryptParameters
                ? encryptParameters.additionalAuthenticatedData
                : undefined,
            iv: "iv" in encryptParameters ? encryptParameters.iv : undefined,
          },
          updatedOptions,
        );

        return {
          algorithm: encryptParameters.algorithm,
          result: result.result!,
          keyID: this.getKeyID(),
          additionalAuthenticatedData: result.additionalAuthenticatedData,
          authenticationTag: result.authenticationTag,
          iv: result.iv,
        };
      },
    );
  }

  decrypt(
    decryptParameters: DecryptParameters,
    options: DecryptOptions = {},
  ): Promise<DecryptResult> {
    const { algorithm, ciphertext, ...params } = decryptParameters;
    const requestOptions = { ...options, ...params };

    return tracingClient.withSpan(
      "RemoteCryptographyProvider.decrypt",
      requestOptions,
      async (updatedOptions) => {
        const result = await this.client.decrypt(
          this.name,
          this.version,
          {
            algorithm,
            value: ciphertext,
            aad:
              "additionalAuthenticatedData" in decryptParameters
                ? decryptParameters.additionalAuthenticatedData
                : undefined,
            iv: "iv" in decryptParameters ? decryptParameters.iv : undefined,
            tag:
              "authenticationTag" in decryptParameters
                ? decryptParameters.authenticationTag
                : undefined,
          },
          updatedOptions,
        );
        return {
          result: result.result!,
          keyID: this.getKeyID(),
          algorithm,
        };
      },
    );
  }

  wrapKey(
    algorithm: KeyWrapAlgorithm,
    keyToWrap: Uint8Array,
    options: WrapKeyOptions = {},
  ): Promise<WrapResult> {
    return tracingClient.withSpan(
      "RemoteCryptographyProvider.wrapKey",
      options,
      async (updatedOptions) => {
        const result = await this.client.wrapKey(
          this.name,
          this.version,
          {
            algorithm,
            value: keyToWrap,
          },
          updatedOptions,
        );

        return {
          result: result.result!,
          algorithm,
          keyID: this.getKeyID(),
        };
      },
    );
  }

  unwrapKey(
    algorithm: KeyWrapAlgorithm,
    encryptedKey: Uint8Array,
    options: UnwrapKeyOptions = {},
  ): Promise<UnwrapResult> {
    return tracingClient.withSpan(
      "RemoteCryptographyProvider.unwrapKey",
      options,
      async (updatedOptions) => {
        const result = await this.client.unwrapKey(
          this.name,
          this.version,
          {
            algorithm,
            value: encryptedKey,
          },
          updatedOptions,
        );

        return {
          result: result.result!,
          algorithm,
          keyID: this.getKeyID(),
        };
      },
    );
  }

  sign(algorithm: string, digest: Uint8Array, options: SignOptions = {}): Promise<SignResult> {
    return tracingClient.withSpan(
      "RemoteCryptographyProvider.sign",
      options,
      async (updatedOptions) => {
        const result = await this.client.sign(
          this.name,
          this.version,
          {
            algorithm,
            value: digest,
          },
          updatedOptions,
        );

        return { result: result.result!, algorithm, keyID: this.getKeyID() };
      },
    );
  }

  verifyData(
    algorithm: string,
    data: Uint8Array,
    signature: Uint8Array,
    options: VerifyOptions = {},
  ): Promise<VerifyResult> {
    return tracingClient.withSpan(
      "RemoteCryptographyProvider.verifyData",
      options,
      async (updatedOptions) => {
        const hash = await createHash(algorithm, data);
        return this.verify(algorithm, hash, signature, updatedOptions);
      },
    );
  }

  verify(
    algorithm: string,
    digest: Uint8Array,
    signature: Uint8Array,
    options: VerifyOptions = {},
  ): Promise<VerifyResult> {
    return tracingClient.withSpan(
      "RemoteCryptographyProvider.verify",
      options,
      async (updatedOptions) => {
        const response = await this.client.verify(
          this.name,
          this.version,
          {
            algorithm,
            digest,
            signature,
          },
          updatedOptions,
        );
        return {
          result: response.value ? response.value : false,
          keyID: this.getKeyID(),
        };
      },
    );
  }

  signData(algorithm: string, data: Uint8Array, options: SignOptions = {}): Promise<SignResult> {
    return tracingClient.withSpan(
      "RemoteCryptographyProvider.signData",
      options,
      async (updatedOptions) => {
        const digest = await createHash(algorithm, data);
        const result = await this.client.sign(
          this.name,
          this.version,
          {
            algorithm,
            value: digest,
          },
          updatedOptions,
        );
        return { result: result.result!, algorithm, keyID: this.getKeyID() };
      },
    );
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
    return tracingClient.withSpan(
      "RemoteCryptographyProvider.getKey",
      options,
      async (updatedOptions) => {
        if (typeof this.key === "string") {
          if (!this.name || this.name === "") {
            throw new Error("getKey requires a key with a name");
          }
          const response = await this.client.getKey(
            this.name,
            options && options.version ? options.version : this.version ? this.version : "",
            updatedOptions,
          );
          this.key = getKeyFromKeyBundle(response);
        }
        return this.key;
      },
    );
  }

  /**
   * A reference to the auto-generated KeyVault HTTP client.
   */
  private client: KeyVaultClient;

  /**
   * A reference to the key used for the cryptographic operations.
   * Based on what was provided to the CryptographyClient constructor,
   * it can be either a string with the URL of a Key Vault Key, or an already parsed {@link KeyVaultKey}.
   */
  private key: string | KeyVaultKey;

  /**
   * Name of the key the client represents
   */
  private name: string;

  /**
   * Version of the key the client represents
   */
  private version: string;

  /**
   * Attempts to retrieve the ID of the key.
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

/**
 * A helper method to either get the passed down generated client or initialize a new one.
 * An already constructed generated client may be passed down from {@link KeyClient} in which case we should reuse it.
 *
 * @internal
 * @param credential - The credential to use when initializing a new client.
 * @param options - The options for constructing a client or the underlying client if one already exists.
 * @returns - A generated client instance
 */
function getOrInitializeClient(
  vaultUrl: string,
  credential: TokenCredential,
  options: CryptographyClientOptions & { generatedClient?: KeyVaultClient },
): KeyVaultClient {
  if (options.generatedClient) {
    return options.generatedClient;
  }

  const libInfo = `azsdk-js-keyvault-keys/${SDK_VERSION}`;

  const userAgentOptions = options.userAgentOptions;

  options.userAgentOptions = {
    userAgentPrefix:
      userAgentOptions && userAgentOptions.userAgentPrefix
        ? `${userAgentOptions.userAgentPrefix} ${libInfo}`
        : libInfo,
  };

  const internalPipelineOptions: KeyVaultClientOptionalParams = {
    ...options,
    apiVersion: options.serviceVersion || LATEST_API_VERSION,
    loggingOptions: {
      logger: logger.info,
      additionalAllowedHeaderNames: [
        "x-ms-keyvault-region",
        "x-ms-keyvault-network-info",
        "x-ms-keyvault-service-version",
      ],
    },
  };

  const client = new KeyVaultClient(vaultUrl, credential, internalPipelineOptions);

  client.pipeline.removePolicy({ name: bearerTokenAuthenticationPolicyName });
  client.pipeline.addPolicy(keyVaultAuthenticationPolicy(credential, options));
  // Workaround for: https://github.com/Azure/azure-sdk-for-js/issues/31843
  client.pipeline.addPolicy({
    name: "ContentTypePolicy",
    sendRequest(request, next) {
      const contentType = request.headers.get("Content-Type") ?? "";
      if (contentType.startsWith("application/json")) {
        request.headers.set("Content-Type", "application/json");
      }
      return next(request);
    },
  });

  return client;
}
