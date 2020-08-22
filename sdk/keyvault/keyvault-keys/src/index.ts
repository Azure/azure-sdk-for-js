// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint @typescript-eslint/member-ordering: 0 */
/// <reference lib="esnext.asynciterable" />

import {
  PipelineOptions,
  RequestOptionsBase,
  TokenCredential,
  createPipelineFromOptions,
  isTokenCredential,
  operationOptionsToRequestOptionsBase,
  signingPolicy
} from "@azure/core-http";

import { getTracer } from "@azure/core-tracing";
import { Span } from "@opentelemetry/api";
import { logger } from "./log";

import "@azure/core-paging";
import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";
import { PollerLike, PollOperationState } from "@azure/core-lro";

import {
  BackupKeyResponse,
  CreateKeyResponse,
  DeleteKeyResponse,
  DeletedKeyBundle,
  DeletionRecoveryLevel,
  GetDeletedKeyResponse,
  GetKeyResponse,
  ImportKeyResponse,
  KeyBundle,
  KeyItem,
  KeyVaultClientGetKeysOptionalParams,
  RecoverDeletedKeyResponse,
  RestoreKeyResponse,
  UpdateKeyResponse
} from "./generated/models";
import { KeyVaultClient } from "./generated/keyVaultClient";
import { SDK_VERSION } from "./generated/utils/constants";
import { challengeBasedAuthenticationPolicy } from "../../keyvault-common/src";

import { DeleteKeyPoller } from "./lro/delete/poller";
import { RecoverDeletedKeyPoller } from "./lro/recover/poller";

import {
  BackupKeyOptions,
  CreateEcKeyOptions,
  CreateKeyOptions,
  CreateRsaKeyOptions,
  CryptographyOptions,
  DeletedKey,
  DeleteKeyOptions,
  EncryptionAlgorithm,
  GetDeletedKeyOptions,
  GetKeyOptions,
  ImportKeyOptions,
  JsonWebKey,
  KeyClientInterface,
  KeyCurveName,
  KeyOperation,
  KeyPollerOptions,
  KeyType,
  BeginDeleteKeyOptions,
  BeginRecoverDeletedKeyOptions,
  KeyProperties,
  KeyVaultKey,
  ListPropertiesOfKeysOptions,
  ListPropertiesOfKeyVersionsOptions,
  ListDeletedKeysOptions,
  PurgeDeletedKeyOptions,
  RecoverDeletedKeyOptions,
  RestoreKeyBackupOptions,
  UpdateKeyPropertiesOptions,
  KeyClientOptions,
  LATEST_API_VERSION,
  CryptographyClientOptions
} from "./keysModels";

import {
  CryptographyClient,
  DecryptOptions,
  DecryptResult,
  EncryptOptions,
  EncryptResult,
  SignatureAlgorithm,
  KeyWrapAlgorithm,
  SignOptions,
  SignResult,
  UnwrapKeyOptions,
  UnwrapResult,
  VerifyOptions,
  VerifyResult,
  WrapKeyOptions,
  WrapResult
} from "./cryptographyClient";

import {
  parseKeyVaultKeysIdentifier,
  ParsedKeyVaultKeysIdentifier,
  KeyVaultKeysIdentifierCollectionName
} from "./identifier";

export {
  CryptographyClientOptions,
  KeyClientOptions,
  BackupKeyOptions,
  CreateEcKeyOptions,
  CreateKeyOptions,
  CreateRsaKeyOptions,
  CryptographyClient,
  CryptographyOptions,
  DecryptOptions,
  DecryptResult,
  DeletedKey,
  DeletionRecoveryLevel,
  EncryptOptions,
  EncryptResult,
  GetDeletedKeyOptions,
  GetKeyOptions,
  ImportKeyOptions,
  JsonWebKey,
  KeyCurveName,
  EncryptionAlgorithm,
  KeyOperation,
  KeyType,
  KeyPollerOptions,
  parseKeyVaultKeysIdentifier,
  BeginDeleteKeyOptions,
  BeginRecoverDeletedKeyOptions,
  KeyProperties,
  SignatureAlgorithm,
  KeyVaultKey,
  KeyWrapAlgorithm,
  ListPropertiesOfKeysOptions,
  ListPropertiesOfKeyVersionsOptions,
  ListDeletedKeysOptions,
  PageSettings,
  PagedAsyncIterableIterator,
  ParsedKeyVaultKeysIdentifier,
  KeyVaultKeysIdentifierCollectionName,
  PipelineOptions,
  PollOperationState,
  PollerLike,
  PurgeDeletedKeyOptions,
  RestoreKeyBackupOptions,
  SignOptions,
  SignResult,
  UnwrapKeyOptions,
  UnwrapResult,
  UpdateKeyPropertiesOptions,
  VerifyOptions,
  VerifyResult,
  WrapKeyOptions,
  WrapResult,
  logger
};

/**
 * The KeyClient provides methods to manage {@link KeyVaultKey} in the
 * Azure Key Vault. The client supports creating, retrieving, updating,
 * deleting, purging, backing up, restoring and listing KeyVaultKeys. The
 * client also supports listing {@link DeletedKey} for a soft-delete enabled Azure Key
 * Vault.
 */
export class KeyClient {
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
   * @internal
   * @ignore
   * A self reference that bypasses private methods, for the pollers.
   */
  private readonly pollerClient: KeyClientInterface = {
    recoverDeletedKey: this.recoverDeletedKey.bind(this),
    getKey: this.getKey.bind(this),
    deleteKey: this.deleteKey.bind(this),
    getDeletedKey: this.getDeletedKey.bind(this)
  };

  /**
   * Creates an instance of KeyClient.
   *
   * Example usage:
   * ```ts
   * import { KeyClient } from "@azure/keyvault-keys";
   * import { DefaultAzureCredential } from "@azure/identity";
   *
   * let vaultUrl = `https://<MY KEYVAULT HERE>.vault.azure.net`;
   * let credentials = new DefaultAzureCredential();
   *
   * let client = new KeyClient(vaultUrl, credentials);
   * ```
   * @param {string} vaultUrl the URL of the Key Vault. It should have this shape: https://${your-key-vault-name}.vault.azure.net
   * @param {TokenCredential} credential An object that implements the `TokenCredential` interface used to authenticate requests to the service. Use the @azure/identity package to create a credential that suits your needs.
   * @param {PipelineOptions} [pipelineOptions] Pipeline options used to configure Key Vault API requests. Omit this parameter to use the default pipeline configuration.
   * @memberof KeyClient
   */
  constructor(
    vaultUrl: string,
    credential: TokenCredential,
    pipelineOptions: KeyClientOptions = {}
  ) {
    this.vaultUrl = vaultUrl;

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
  }

  /**
   * @internal
   * @ignore
   * Sends a delete request for the given KeyVault Key's name to the KeyVault service.
   * Since the KeyVault Key won't be immediately deleted, we have {@link beginDeleteKey}.
   * @param {string} name The name of the KeyVault Key.
   * @param {DeleteKeyOptions} [options] Optional parameters for the underlying HTTP request.
   */
  private async deleteKey(name: string, options: DeleteKeyOptions = {}): Promise<DeletedKey> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("deleteKey", requestOptions);

    let response: DeleteKeyResponse;
    try {
      response = await this.client.deleteKey(
        this.vaultUrl,
        name,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return this.getKeyFromKeyBundle(response);
  }

  /**
   * @internal
   * @ignore
   * Sends a request to recover a deleted KeyVault Key based on the given name.
   * Since the KeyVault Key won't be immediately recover the deleted key, we have {@link beginRecoverDeletedKey}.
   * @param {string} name The name of the KeyVault Key.
   * @param {RecoverDeletedKeyOptions} [options] Optional parameters for the underlying HTTP request.
   */
  private async recoverDeletedKey(
    name: string,
    options: RecoverDeletedKeyOptions = {}
  ): Promise<KeyVaultKey> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("recoverDeletedKey", requestOptions);

    let response: RecoverDeletedKeyResponse;
    try {
      response = await this.client.recoverDeletedKey(
        this.vaultUrl,
        name,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return this.getKeyFromKeyBundle(response);
  }

  /**
   * The create key operation can be used to create any key type in Azure Key Vault. If the named key
   * already exists, Azure Key Vault creates a new version of the key. It requires the keys/create
   * permission.
   *
   * Example usage:
   * ```ts
   * let client = new KeyClient(url, credentials);
   * // Create an elliptic-curve key:
   * let result = await client.createKey("MyKey", "EC");
   * ```
   * @summary Creates a new key, stores it, then returns key parameters and properties to the client.
   * @param {string} name The name of the key.
   * @param {KeyType} keyType The type of the key. One of the following: 'EC', 'EC-HSM', 'RSA', 'RSA-HSM', 'oct'.
   * @param {CreateKeyOptions} [options] The optional parameters.
   */
  public async createKey(
    name: string,
    keyType: KeyType,
    options?: CreateKeyOptions
  ): Promise<KeyVaultKey> {
    if (options) {
      const requestOptions = operationOptionsToRequestOptionsBase(options);
      const { enabled, notBefore, expiresOn: expires, ...remainingOptions } = requestOptions;
      const unflattenedOptions = {
        ...remainingOptions,
        keyAttributes: {
          enabled,
          notBefore,
          expires
        }
      };

      const span = this.createSpan("createKey", unflattenedOptions);

      let response: CreateKeyResponse;

      try {
        response = await this.client.createKey(
          this.vaultUrl,
          name,
          keyType,
          this.setParentSpan(span, unflattenedOptions)
        );
      } finally {
        span.end();
      }
      return this.getKeyFromKeyBundle(response);
    } else {
      const response = await this.client.createKey(this.vaultUrl, name, keyType, options);
      return this.getKeyFromKeyBundle(response);
    }
  }

  /**
   * The createEcKey method creates a new elliptic curve key in Azure Key Vault. If the named key
   * already exists, Azure Key Vault creates a new version of the key. It requires the keys/create
   * permission.
   *
   * Example usage:
   * ```ts
   * let client = new KeyClient(url, credentials);
   * let result = await client.createEcKey("MyKey", { curve: "P-256" });
   * ```
   * @summary Creates a new key, stores it, then returns key parameters and properties to the client.
   * @param {string} name The name of the key.
   * @param {CreateEcKeyOptions} [options] The optional parameters.
   */
  public async createEcKey(name: string, options?: CreateEcKeyOptions): Promise<KeyVaultKey> {
    if (options) {
      const requestOptions = operationOptionsToRequestOptionsBase(options);
      const { enabled, notBefore, expiresOn: expires, ...remainingOptions } = requestOptions;
      const unflattenedOptions = {
        ...remainingOptions,
        keyAttributes: {
          enabled,
          notBefore,
          expires
        }
      };

      const span = this.createSpan("createEcKey", unflattenedOptions);

      let response: CreateKeyResponse;
      try {
        response = await this.client.createKey(
          this.vaultUrl,
          name,
          options.hsm ? "EC-HSM" : "EC",
          this.setParentSpan(span, unflattenedOptions)
        );
      } finally {
        span.end();
      }

      return this.getKeyFromKeyBundle(response);
    } else {
      const response = await this.client.createKey(this.vaultUrl, name, "EC", options);
      return this.getKeyFromKeyBundle(response);
    }
  }

  /**
   * The createRSAKey method creates a new RSA key in Azure Key Vault. If the named key
   * already exists, Azure Key Vault creates a new version of the key. It requires the keys/create
   * permission.
   *
   * Example usage:
   * ```ts
   * let client = new KeyClient(url, credentials);
   * let result = await client.createRsaKey("MyKey", { keySize: 2048 });
   * ```
   * @summary Creates a new key, stores it, then returns key parameters and properties to the client.
   * @param {string} name The name of the key.
   * @param {CreateRsaKeyOptions} [options] The optional parameters.
   */
  public async createRsaKey(name: string, options?: CreateRsaKeyOptions): Promise<KeyVaultKey> {
    if (options) {
      const requestOptions = operationOptionsToRequestOptionsBase(options);
      const { enabled, notBefore, expiresOn: expires, ...remainingOptions } = requestOptions;
      const unflattenedOptions = {
        ...remainingOptions,
        keyAttributes: {
          enabled,
          notBefore,
          expires
        }
      };

      const span = this.createSpan("createRsaKey", unflattenedOptions);

      let response: CreateKeyResponse;
      try {
        response = await this.client.createKey(
          this.vaultUrl,
          name,
          options.hsm ? "RSA-HSM" : "RSA",
          this.setParentSpan(span, unflattenedOptions)
        );
      } finally {
        span.end();
      }

      return this.getKeyFromKeyBundle(response);
    } else {
      const response = await this.client.createKey(this.vaultUrl, name, "RSA", options);
      return this.getKeyFromKeyBundle(response);
    }
  }

  /**
   * The import key operation may be used to import any key type into an Azure Key Vault. If the
   * named key already exists, Azure Key Vault creates a new version of the key. This operation
   * requires the keys/import permission.
   *
   * Example usage:
   * ```ts
   * let client = new KeyClient(url, credentials);
   * // Key contents in myKeyContents
   * let result = await client.importKey("MyKey", myKeyContents);
   * ```
   * @summary Imports an externally created key, stores it, and returns key parameters and properties
   * to the client.
   * @param {string} name Name for the imported key.
   * @param {JsonWebKey} key The JSON web key.
   * @param {ImportKeyOptions} [options] The optional parameters.
   */
  public async importKey(
    name: string,
    key: JsonWebKey,
    options?: ImportKeyOptions
  ): Promise<KeyVaultKey> {
    if (options) {
      const requestOptions = operationOptionsToRequestOptionsBase(options);
      const {
        enabled,
        notBefore,
        expiresOn: expires,
        hardwareProtected: hsm,
        ...remainingOptions
      } = requestOptions;
      const unflattenedOptions = {
        ...remainingOptions,
        keyAttributes: {
          enabled,
          notBefore,
          expires,
          hsm
        }
      };

      const span = this.createSpan("importKey", unflattenedOptions);

      let response: ImportKeyResponse;
      try {
        response = await this.client.importKey(
          this.vaultUrl,
          name,
          key,
          this.setParentSpan(span, unflattenedOptions)
        );
      } finally {
        span.end();
      }

      return this.getKeyFromKeyBundle(response);
    } else {
      const response = await this.client.importKey(this.vaultUrl, name, key, options);
      return this.getKeyFromKeyBundle(response);
    }
  }

  /**
   * The delete operation applies to any key stored in Azure Key Vault. Individual versions
   * of a key can not be deleted, only all versions of a given key at once.
   *
   * This function returns a Long Running Operation poller that allows you to wait indefinitely until the key is deleted.
   *
   * This operation requires the keys/delete permission.
   *
   * Example usage:
   * ```ts
   * const client = new KeyClient(url, credentials);
   * await client.createKey("MyKey", "EC");
   * const poller = await client.beginDeleteKey("MyKey");
   *
   * // Serializing the poller
   * const serialized = poller.toString();
   * // A new poller can be created with:
   * // await client.beginDeleteKey("MyKey", { resumeFrom: serialized });
   *
   * // Waiting until it's done
   * const deletedKey = await poller.pollUntilDone();
   * console.log(deletedKey);
   * ```
   * @summary Deletes a key from a specified key vault.
   * @param {string} name The name of the key.
   * @param {BeginDeleteKeyOptions} [options] The optional parameters.
   */
  public async beginDeleteKey(
    name: string,
    options: BeginDeleteKeyOptions = {}
  ): Promise<PollerLike<PollOperationState<DeletedKey>, DeletedKey>> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const poller = new DeleteKeyPoller({
      name,
      client: this.pollerClient,
      intervalInMs: options.intervalInMs,
      resumeFrom: options.resumeFrom,
      requestOptions
    });

    // This will initialize the poller's operation (the deletion of the key).
    await poller.poll();

    return poller;
  }

  /**
   * The updateKeyProperties method changes specified properties of an existing stored key. Properties that
   * are not specified in the request are left unchanged. The value of a key itself cannot be
   * changed. This operation requires the keys/set permission.
   *
   * Example usage:
   * ```ts
   * let keyName = "MyKey";
   * let client = new KeyClient(url, credentials);
   * let key = await client.getKey(keyName);
   * let result = await client.updateKeyProperties(keyName, key.properties.version, { enabled: false });
   * ```
   * @summary Updates the properties associated with a specified key in a given key vault.
   * @param {string} name The name of the key.
   * @param {string} keyVersion The version of the key.
   * @param {UpdateKeyPropertiesOptions} [options] The optional parameters.
   */
  public async updateKeyProperties(
    name: string,
    keyVersion: string,
    options?: UpdateKeyPropertiesOptions
  ): Promise<KeyVaultKey> {
    if (options) {
      const requestOptions = operationOptionsToRequestOptionsBase(options);
      const { enabled, notBefore, expiresOn: expires, ...remainingOptions } = requestOptions;
      const unflattenedOptions = {
        ...remainingOptions,
        keyAttributes: {
          enabled,
          notBefore,
          expires
        }
      };

      const span = this.createSpan("updateKeyProperties", unflattenedOptions);

      let response: UpdateKeyResponse;

      try {
        response = await this.client.updateKey(
          this.vaultUrl,
          name,
          keyVersion,
          this.setParentSpan(span, unflattenedOptions)
        );
      } finally {
        span.end();
      }

      return this.getKeyFromKeyBundle(response);
    } else {
      const response = await this.client.updateKey(this.vaultUrl, name, keyVersion, options);
      return this.getKeyFromKeyBundle(response);
    }
  }

  /**
   * The getKey method gets a specified key and is applicable to any key stored in Azure Key Vault.
   * This operation requires the keys/get permission.
   *
   * Example usage:
   * ```ts
   * let client = new KeyClient(url, credentials);
   * let key = await client.getKey("MyKey");
   * ```
   * @summary Get a specified key from a given key vault.
   * @param {string} name The name of the key.
   * @param {GetKeyOptions} [options] The optional parameters.
   */
  public async getKey(name: string, options: GetKeyOptions = {}): Promise<KeyVaultKey> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("getKey", requestOptions);

    let response: GetKeyResponse;
    try {
      response = await this.client.getKey(
        this.vaultUrl,
        name,
        options && options.version ? options.version : "",
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return this.getKeyFromKeyBundle(response);
  }

  /**
   * The getDeletedKey method returns the specified deleted key along with its properties.
   * This operation requires the keys/get permission.
   *
   * Example usage:
   * ```ts
   * let client = new KeyClient(url, credentials);
   * let key = await client.getDeletedKey("MyDeletedKey");
   * ```
   * @summary Gets the specified deleted key.
   * @param {string} name The name of the key.
   * @param {GetDeletedKeyOptions} [options] The optional parameters.
   */
  public async getDeletedKey(
    name: string,
    options: GetDeletedKeyOptions = {}
  ): Promise<DeletedKey> {
    const responseOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("getDeletedKey", responseOptions);

    let response: GetDeletedKeyResponse;
    try {
      response = await this.client.getDeletedKey(
        this.vaultUrl,
        name,
        this.setParentSpan(span, responseOptions)
      );
    } finally {
      span.end();
    }

    return this.getKeyFromKeyBundle(response);
  }

  /**
   * The purge deleted key operation removes the key permanently, without the possibility of
   * recovery. This operation can only be enabled on a soft-delete enabled vault. This operation
   * requires the keys/purge permission.
   *
   * Example usage:
   * ```ts
   * const client = new KeyClient(url, credentials);
   * const deletePoller = await client.beginDeleteKey("MyKey")
   * await deletePoller.pollUntilDone();
   * await client.purgeDeletedKey("MyKey");
   * ```
   * @summary Permanently deletes the specified key.
   * @param name The name of the key.
   * @param {PurgeDeletedKeyOptions} [options] The optional parameters.
   */
  public async purgeDeletedKey(name: string, options: PurgeDeletedKeyOptions = {}): Promise<void> {
    const responseOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("purgeDeletedKey", responseOptions);

    try {
      await this.client.purgeDeletedKey(
        this.vaultUrl,
        name,
        this.setParentSpan(span, responseOptions)
      );
    } finally {
      span.end();
    }
  }

  /**
   * Recovers the deleted key in the specified vault. This operation can only be performed on a
   * soft-delete enabled vault.
   *
   * This function returns a Long Running Operation poller that allows you to wait indefinitely until the deleted key is recovered.
   *
   * This operation requires the keys/recover permission.
   *
   * Example usage:
   * ```ts
   * const client = new KeyClient(url, credentials);
   * await client.createKey("MyKey", "EC");
   * const deletePoller = await client.beginDeleteKey("MyKey");
   * await deletePoller.pollUntilDone();
   * const poller = await client.beginRecoverDeletedKey("MyKey");
   *
   * // Serializing the poller
   * const serialized = poller.toString();
   * // A new poller can be created with:
   * // await client.beginRecoverDeletedKey("MyKey", { resumeFrom: serialized });
   *
   * // Waiting until it's done
   * const key = await poller.pollUntilDone();
   * console.log(key);
   * ```
   * @summary Recovers the deleted key to the latest version.
   * @param name The name of the deleted key.
   * @param {BeginRecoverDeletedKeyOptions} [options] The optional parameters.
   */
  public async beginRecoverDeletedKey(
    name: string,
    options: BeginRecoverDeletedKeyOptions = {}
  ): Promise<PollerLike<PollOperationState<DeletedKey>, DeletedKey>> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);

    const poller = new RecoverDeletedKeyPoller({
      name,
      client: this.pollerClient,
      intervalInMs: options.intervalInMs,
      resumeFrom: options.resumeFrom,
      requestOptions: requestOptions
    });
    // This will initialize the poller's operation (the deletion of the key).
    await poller.poll();
    return poller;
  }

  /**
   * Requests that a backup of the specified key be downloaded to the client. All versions of the
   * key will be downloaded. This operation requires the keys/backup permission.
   *
   * Example usage:
   * ```ts
   * let client = new KeyClient(url, credentials);
   * let backupContents = await client.backupKey("MyKey");
   * ```
   * @summary Backs up the specified key.
   * @param {string} name The name of the key.
   * @param {BackupKeyOptions} [options] The optional parameters.
   */
  public async backupKey(
    name: string,
    options: BackupKeyOptions = {}
  ): Promise<Uint8Array | undefined> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("backupKey", requestOptions);

    let response: BackupKeyResponse;
    try {
      response = await this.client.backupKey(
        this.vaultUrl,
        name,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return response.value;
  }

  /**
   * Restores a backed up key, and all its versions, to a vault. This operation requires the
   * keys/restore permission.
   *
   * Example usage:
   * ```ts
   * let client = new KeyClient(url, credentials);
   * let backupContents = await client.backupKey("MyKey");
   * // ...
   * let key = await client.restoreKeyBackup(backupContents);
   * ```
   * @summary Restores a backed up key to a vault.
   * @param {Uint8Array} backup The backup blob associated with a key bundle.
   * @param {RestoreKeyBackupOptions} [options] The optional parameters.
   */
  public async restoreKeyBackup(
    backup: Uint8Array,
    options: RestoreKeyBackupOptions = {}
  ): Promise<KeyVaultKey> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("restoreKeyBackup", requestOptions);

    let response: RestoreKeyResponse;
    try {
      response = await this.client.restoreKey(
        this.vaultUrl,
        backup,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return this.getKeyFromKeyBundle(response);
  }

  /**
   * @internal
   * @ignore
   * Deals with the pagination of {@link listPropertiesOfKeyVersions}.
   * @param {string} name The name of the KeyVault Key.
   * @param {PageSettings} continuationState An object that indicates the position of the paginated request.
   * @param {ListPropertiesOfKeyVersionsOptions} [options] Common options for the iterative endpoints.
   */
  private async *listPropertiesOfKeyVersionsPage(
    name: string,
    continuationState: PageSettings,
    options?: ListPropertiesOfKeyVersionsOptions
  ): AsyncIterableIterator<KeyProperties[]> {
    if (continuationState.continuationToken == null) {
      const optionsComplete: KeyVaultClientGetKeysOptionalParams = {
        maxresults: continuationState.maxPageSize,
        ...options
      };
      const currentSetResponse = await this.client.getKeyVersions(
        this.vaultUrl,
        name,
        optionsComplete
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(this.getKeyPropertiesFromKeyItem, this);
      }
    }
    while (continuationState.continuationToken) {
      const currentSetResponse = await this.client.getKeyVersions(
        continuationState.continuationToken,
        name,
        options
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(this.getKeyPropertiesFromKeyItem, this);
      } else {
        break;
      }
    }
  }

  /**
   * @internal
   * @ignore
   * Deals with the iteration of all the available results of {@link listPropertiesOfKeyVersions}.
   * @param {string} name The name of the KeyVault Key.
   * @param {ListPropertiesOfKeyVersionsOptions} [options] Common options for the iterative endpoints.
   */
  private async *listPropertiesOfKeyVersionsAll(
    name: string,
    options?: ListPropertiesOfKeyVersionsOptions
  ): AsyncIterableIterator<KeyProperties> {
    const f = {};

    for await (const page of this.listPropertiesOfKeyVersionsPage(name, f, options)) {
      for (const item of page) {
        yield item;
      }
    }
  }

  /**
   * Iterates all versions of the given key in the vault. The full key identifier, properties, and tags are provided
   * in the response. This operation requires the keys/list permission.
   *
   * Example usage:
   * ```ts
   * let client = new KeyClient(url, credentials);
   * for await (const keyProperties of client.listPropertiesOfKeyVersions("MyKey")) {
   *   const key = await client.getKey(keyProperties.name);
   *   console.log("key version: ", key);
   * }
   * ```
   * @param {string} name Name of the key to fetch versions for
   * @param {ListPropertiesOfKeyVersionsOptions} [options] The optional parameters.
   */
  public listPropertiesOfKeyVersions(
    name: string,
    options: ListPropertiesOfKeyVersionsOptions = {}
  ): PagedAsyncIterableIterator<KeyProperties> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("listPropertiesOfKeyVersions", requestOptions);
    const updatedOptions: ListPropertiesOfKeyVersionsOptions = {
      ...requestOptions,
      ...this.setParentSpan(span, requestOptions)
    };

    const iter = this.listPropertiesOfKeyVersionsAll(name, updatedOptions);

    span.end();
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) =>
        this.listPropertiesOfKeyVersionsPage(name, settings, updatedOptions)
    };
  }

  /**
   * @internal
   * @ignore
   * Deals with the pagination of {@link listPropertiesOfKeys}.
   * @param {PageSettings} continuationState An object that indicates the position of the paginated request.
   * @param {ListPropertiesOfKeysOptions} [options] Common options for the iterative endpoints.
   */
  private async *listPropertiesOfKeysPage(
    continuationState: PageSettings,
    options?: ListPropertiesOfKeysOptions
  ): AsyncIterableIterator<KeyProperties[]> {
    if (continuationState.continuationToken == null) {
      const optionsComplete: KeyVaultClientGetKeysOptionalParams = {
        maxresults: continuationState.maxPageSize,
        ...options
      };
      const currentSetResponse = await this.client.getKeys(this.vaultUrl, optionsComplete);
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(this.getKeyPropertiesFromKeyItem, this);
      }
    }
    while (continuationState.continuationToken) {
      const currentSetResponse = await this.client.getKeys(
        continuationState.continuationToken,
        options
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(this.getKeyPropertiesFromKeyItem, this);
      } else {
        break;
      }
    }
  }

  /**
   * @internal
   * @ignore
   * Deals with the iteration of all the available results of {@link listPropertiesOfKeys}.
   * @param {ListPropertiesOfKeysOptions} [options] Common options for the iterative endpoints.
   */
  private async *listPropertiesOfKeysAll(
    options?: ListPropertiesOfKeysOptions
  ): AsyncIterableIterator<KeyProperties> {
    const f = {};

    for await (const page of this.listPropertiesOfKeysPage(f, options)) {
      for (const item of page) {
        yield item;
      }
    }
  }

  /**
   * Iterates the latest version of all keys in the vault.  The full key identifier and properties are provided
   * in the response. No values are returned for the keys. This operations requires the keys/list permission.
   *
   * Example usage:
   * ```ts
   * let client = new KeyClient(url, credentials);
   * for await (const keyProperties of client.listPropertiesOfKeys()) {
   *   const key = await client.getKey(keyProperties.name);
   *   console.log("key: ", key);
   * }
   * ```
   * @summary List all keys in the vault
   * @param {ListPropertiesOfKeysOptions} [options] The optional parameters.
   */
  public listPropertiesOfKeys(
    options: ListPropertiesOfKeysOptions = {}
  ): PagedAsyncIterableIterator<KeyProperties> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("listPropertiesOfKeys", requestOptions);
    const updatedOptions: ListPropertiesOfKeysOptions = {
      ...requestOptions,
      ...this.setParentSpan(span, requestOptions)
    };

    const iter = this.listPropertiesOfKeysAll(updatedOptions);

    span.end();
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) =>
        this.listPropertiesOfKeysPage(settings, updatedOptions)
    };
  }

  /**
   * @internal
   * @ignore
   * Deals with the pagination of {@link listDeletedKeys}.
   * @param {PageSettings} continuationState An object that indicates the position of the paginated request.
   * @param {ListDeletedKeysOptions} [options] Common options for the iterative endpoints.
   */
  private async *listDeletedKeysPage(
    continuationState: PageSettings,
    options?: ListDeletedKeysOptions
  ): AsyncIterableIterator<DeletedKey[]> {
    if (continuationState.continuationToken == null) {
      const optionsComplete: KeyVaultClientGetKeysOptionalParams = {
        maxresults: continuationState.maxPageSize,
        ...options
      };
      const currentSetResponse = await this.client.getDeletedKeys(this.vaultUrl, optionsComplete);
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(this.getDeletedKeyFromKeyItem, this);
      }
    }
    while (continuationState.continuationToken) {
      const currentSetResponse = await this.client.getDeletedKeys(
        continuationState.continuationToken,
        options
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(this.getDeletedKeyFromKeyItem, this);
      } else {
        break;
      }
    }
  }

  /**
   * @internal
   * @ignore
   * Deals with the iteration of all the available results of {@link listDeletedKeys}.
   * @param {ListDeletedKeysOptions} [options] Common options for the iterative endpoints.
   */
  private async *listDeletedKeysAll(
    options?: ListDeletedKeysOptions
  ): AsyncIterableIterator<DeletedKey> {
    const f = {};

    for await (const page of this.listDeletedKeysPage(f, options)) {
      for (const item of page) {
        yield item;
      }
    }
  }

  /**
   * Iterates the deleted keys in the vault.  The full key identifier and properties are provided
   * in the response. No values are returned for the keys. This operations requires the keys/list permission.
   *
   * Example usage:
   * ```ts
   * let client = new KeyClient(url, credentials);
   * for await (const deletedKey of client.listDeletedKeys()) {
   *   console.log("deleted key: ", deletedKey);
   * }
   * ```
   * @summary List all keys in the vault
   * @param {ListDeletedKeysOptions} [options] The optional parameters.
   */
  public listDeletedKeys(
    options: ListDeletedKeysOptions = {}
  ): PagedAsyncIterableIterator<DeletedKey> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("listDeletedKeys", requestOptions);

    const updatedOptions: ListDeletedKeysOptions = {
      ...options,
      ...this.setParentSpan(span, requestOptions)
    };

    const iter = this.listDeletedKeysAll(updatedOptions);

    span.end();
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) => this.listDeletedKeysPage(settings, updatedOptions)
    };
  }

  /**
   * @internal
   * @ignore
   * Shapes the exposed {@link KeyVaultKey} based on either a received key bundle or deleted key bundle.
   */
  private getKeyFromKeyBundle(bundle: KeyBundle | DeletedKeyBundle): KeyVaultKey {
    const keyBundle = bundle as KeyBundle;
    const deletedKeyBundle = bundle as DeletedKeyBundle;

    const parsedId = parseKeyVaultKeysIdentifier(keyBundle.key!.kid!);

    const attributes: any = keyBundle.attributes || {};
    delete keyBundle.attributes;

    const resultObject: KeyVaultKey & DeletedKey = {
      key: keyBundle.key as JsonWebKey,
      id: keyBundle.key ? keyBundle.key.kid : undefined,
      name: parsedId.name,
      keyOperations: keyBundle.key ? (keyBundle.key.keyOps as KeyOperation[]) : undefined,
      keyType: keyBundle.key ? keyBundle.key.kty : undefined,
      properties: {
        expiresOn: attributes.expires,
        createdOn: attributes.created,
        updatedOn: attributes.updated,
        ...keyBundle,
        ...attributes,
        ...parsedId,
        id: keyBundle.key ? keyBundle.key.kid : undefined
      }
    };

    if (deletedKeyBundle.deletedDate) {
      resultObject.properties.deletedOn = deletedKeyBundle.deletedDate;
      delete (resultObject.properties as any).deletedDate;
    }

    if (attributes.vaultUrl) {
      delete (resultObject.properties as any).vaultUrl;
    }
    if (attributes.expires) {
      delete (resultObject.properties as any).expires;
    }
    if (attributes.created) {
      delete (resultObject.properties as any).created;
    }
    if (attributes.updated) {
      delete (resultObject.properties as any).updated;
    }

    return resultObject;
  }

  /**
   * @internal
   * @ignore
   * Shapes the exposed {@link DeletedKey} based on a received KeyItem.
   */
  private getDeletedKeyFromKeyItem(keyItem: KeyItem): DeletedKey {
    const parsedId = parseKeyVaultKeysIdentifier(keyItem.kid!);

    const attributes = keyItem.attributes || {};

    const abstractProperties: any = {
      deletedOn: (attributes as any).deletedDate,
      expiresOn: attributes.expires,
      createdOn: attributes.created,
      updatedOn: attributes.updated,
      ...keyItem,
      ...keyItem.attributes,
      ...parsedId,
      id: keyItem.kid
    };

    if (abstractProperties.deletedDate) {
      delete abstractProperties.deletedDate;
    }

    if (abstractProperties.expires) {
      delete abstractProperties.expires;
    }
    if (abstractProperties.created) {
      delete abstractProperties.created;
    }
    if (abstractProperties.updated) {
      delete abstractProperties.updated;
    }

    return {
      key: keyItem,
      id: keyItem.kid,
      name: abstractProperties.name,
      properties: abstractProperties
    };
  }

  /**
   * @internal
   * @ignore
   * Shapes the exposed {@link KeyProperties} based on a received KeyItem.
   */
  private getKeyPropertiesFromKeyItem(keyItem: KeyItem): KeyProperties {
    const parsedId = parseKeyVaultKeysIdentifier(keyItem.kid!);

    const attributes = keyItem.attributes || {};

    const resultObject: any = {
      createdOn: attributes.created,
      updatedOn: attributes.updated,
      ...keyItem,
      ...parsedId,
      ...keyItem.attributes
    };

    delete resultObject.attributes;

    if (keyItem.attributes!.expires) {
      resultObject.expiresOn = keyItem.attributes!.expires;
      delete resultObject.expires;
    }

    return resultObject;
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
    const span = tracer.startSpan(methodName, requestOptions && requestOptions.spanOptions);
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
}
