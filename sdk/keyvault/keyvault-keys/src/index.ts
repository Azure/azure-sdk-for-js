// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint @typescript-eslint/member-ordering: 0 */
/// <reference lib="esnext.asynciterable" />

import {
  PipelineOptions,
  TokenCredential,
  createPipelineFromOptions,
  isTokenCredential,
  operationOptionsToRequestOptionsBase,
  signingPolicy
} from "@azure/core-http";

import { logger } from "./log";

import "@azure/core-paging";
import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";
import { PollerLike, PollOperationState } from "@azure/core-lro";

import {
  KeyVaultClientBackupKeyResponse,
  KeyVaultClientCreateKeyResponse,
  DeletionRecoveryLevel,
  KnownDeletionRecoveryLevel,
  KeyVaultClientGetDeletedKeyResponse,
  KeyVaultClientGetKeyResponse,
  KeyVaultClientImportKeyResponse,
  KeyItem,
  KeyVaultClientGetKeysOptionalParams,
  KeyVaultClientRestoreKeyResponse,
  KeyVaultClientUpdateKeyResponse,
  KnownJsonWebKeyType
} from "./generated/models";
import { KeyVaultClient } from "./generated/keyVaultClient";
import { SDK_VERSION } from "./constants";
import {
  challengeBasedAuthenticationPolicy,
  createSpan,
  setParentSpan
} from "../../keyvault-common/src";

import { DeleteKeyPoller } from "./lro/delete/poller";
import { RecoverDeletedKeyPoller } from "./lro/recover/poller";

import {
  BackupKeyOptions,
  CreateEcKeyOptions,
  CreateKeyOptions,
  CreateRsaKeyOptions,
  CryptographyOptions,
  DeletedKey,
  GetDeletedKeyOptions,
  GetKeyOptions,
  ImportKeyOptions,
  JsonWebKey,
  KeyOperation,
  KnownKeyOperations,
  KeyPollerOptions,
  KeyType,
  KnownKeyTypes,
  BeginDeleteKeyOptions,
  BeginRecoverDeletedKeyOptions,
  KeyProperties,
  KeyVaultKey,
  ListPropertiesOfKeysOptions,
  ListPropertiesOfKeyVersionsOptions,
  ListDeletedKeysOptions,
  PurgeDeletedKeyOptions,
  RestoreKeyBackupOptions,
  UpdateKeyPropertiesOptions,
  KeyClientOptions,
  CryptographyClientOptions,
  LATEST_API_VERSION,
  CreateOctKeyOptions
} from "./keysModels";

import { CryptographyClient } from "./cryptographyClient";

import {
  DecryptResult,
  KeyCurveName,
  KnownKeyCurveNames,
  EncryptionAlgorithm,
  KnownEncryptionAlgorithms,
  SignatureAlgorithm,
  KnownSignatureAlgorithms,
  KeyWrapAlgorithm,
  SignResult,
  UnwrapResult,
  VerifyResult,
  WrapResult,
  KeyOperationsOptions,
  EncryptResult,
  DecryptOptions,
  EncryptOptions,
  SignOptions,
  UnwrapKeyOptions,
  VerifyOptions,
  WrapKeyOptions
} from "./cryptographyClientModels";

import { parseKeyVaultKeyId, KeyVaultKeyId } from "./identifier";
import { LocalSupportedAlgorithmName } from "./localCryptography/models";
import { getKeyFromKeyBundle } from "./transformations";

export {
  CryptographyClientOptions,
  KeyOperationsOptions,
  KeyClientOptions,
  BackupKeyOptions,
  CreateEcKeyOptions,
  CreateKeyOptions,
  CreateRsaKeyOptions,
  CreateOctKeyOptions,
  CryptographyClient,
  CryptographyOptions,
  DecryptOptions,
  DecryptResult,
  DeletedKey,
  DeletionRecoveryLevel,
  KnownDeletionRecoveryLevel,
  EncryptOptions,
  EncryptResult,
  GetDeletedKeyOptions,
  GetKeyOptions,
  ImportKeyOptions,
  JsonWebKey,
  KeyCurveName,
  KnownKeyCurveNames,
  EncryptionAlgorithm,
  KnownEncryptionAlgorithms,
  KeyOperation,
  KnownKeyOperations,
  KeyType,
  KnownKeyTypes,
  KeyPollerOptions,
  BeginDeleteKeyOptions,
  BeginRecoverDeletedKeyOptions,
  KeyProperties,
  SignatureAlgorithm,
  KnownSignatureAlgorithms,
  KeyVaultKey,
  KeyWrapAlgorithm,
  ListPropertiesOfKeysOptions,
  ListPropertiesOfKeyVersionsOptions,
  ListDeletedKeysOptions,
  LocalSupportedAlgorithmName,
  PageSettings,
  PagedAsyncIterableIterator,
  KeyVaultKeyId,
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
   * @hidden
   * A reference to the auto-generated Key Vault HTTP client.
   */
  private readonly client: KeyVaultClient;

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
   * @param vaultUrl - the URL of the Key Vault. It should have this shape: `https://${your-key-vault-name}.vault.azure.net`
   * @param credential - An object that implements the `TokenCredential` interface used to authenticate requests to the service. Use the \@azure/identity package to create a credential that suits your needs.
   * @param pipelineOptions - Pipeline options used to configure Key Vault API requests. Omit this parameter to use the default pipeline configuration.
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
   * Creates a new key, stores it, then returns key parameters and properties to the client.
   * @param name - The name of the key.
   * @param keyType - The type of the key. One of the following: 'EC', 'EC-HSM', 'RSA', 'RSA-HSM', 'oct'.
   * @param options - The optional parameters.
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

      const span = createSpan("createKey", unflattenedOptions);

      let response: KeyVaultClientCreateKeyResponse;

      try {
        response = await this.client.createKey(
          this.vaultUrl,
          name,
          keyType,
          setParentSpan(span, unflattenedOptions)
        );
      } finally {
        span.end();
      }
      return getKeyFromKeyBundle(response);
    } else {
      const response = await this.client.createKey(this.vaultUrl, name, keyType, options);
      return getKeyFromKeyBundle(response);
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
   * Creates a new key, stores it, then returns key parameters and properties to the client.
   * @param name - The name of the key.
   * @param options - The optional parameters.
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

      const span = createSpan("createEcKey", unflattenedOptions);

      let response: KeyVaultClientCreateKeyResponse;
      try {
        response = await this.client.createKey(
          this.vaultUrl,
          name,
          options.hsm ? "EC-HSM" : "EC",
          setParentSpan(span, unflattenedOptions)
        );
      } finally {
        span.end();
      }

      return getKeyFromKeyBundle(response);
    } else {
      const response = await this.client.createKey(this.vaultUrl, name, "EC", options);
      return getKeyFromKeyBundle(response);
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
   * Creates a new key, stores it, then returns key parameters and properties to the client.
   * @param name - The name of the key.
   * @param options - The optional parameters.
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

      const span = createSpan("createRsaKey", unflattenedOptions);

      let response: KeyVaultClientCreateKeyResponse;
      try {
        response = await this.client.createKey(
          this.vaultUrl,
          name,
          options.hsm ? "RSA-HSM" : "RSA",
          setParentSpan(span, unflattenedOptions)
        );
      } finally {
        span.end();
      }

      return getKeyFromKeyBundle(response);
    } else {
      const response = await this.client.createKey(this.vaultUrl, name, "RSA", options);
      return getKeyFromKeyBundle(response);
    }
  }

  /**
   * The createOctKey method creates a new OCT key in Azure Key Vault. If the named key
   * already exists, Azure Key Vault creates a new version of the key. It requires the keys/create
   * permission.
   *
   * Example usage:
   * ```ts
   * let client = new KeyClient(url, credentials);
   * let result = await client.createOctKey("MyKey", { hsm: true });
   * ```
   * Creates a new key, stores it, then returns key parameters and properties to the client.
   * @param name - The name of the key.
   * @param options - The optional parameters.
   */
  public async createOctKey(name: string, options?: CreateOctKeyOptions): Promise<KeyVaultKey> {
    if (options) {
      const requestOptions = operationOptionsToRequestOptionsBase(options);
      const { enabled, notBefore, expiresOn: expires, hsm, ...remainingOptions } = requestOptions;
      const unflattenedOptions = {
        ...remainingOptions,
        keyAttributes: {
          enabled,
          notBefore,
          expires
        }
      };

      const span = createSpan("createOctKey", unflattenedOptions);

      let response: KeyVaultClientCreateKeyResponse;
      try {
        response = await this.client.createKey(
          this.vaultUrl,
          name,
          hsm ? KnownJsonWebKeyType.OctHSM : KnownJsonWebKeyType.Oct,
          setParentSpan(span, unflattenedOptions)
        );
      } finally {
        span.end();
      }

      return getKeyFromKeyBundle(response);
    } else {
      const response = await this.client.createKey(this.vaultUrl, name, "OCT", options);
      return getKeyFromKeyBundle(response);
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
   * Imports an externally created key, stores it, and returns key parameters and properties
   * to the client.
   * @param name - Name for the imported key.
   * @param key - The JSON web key.
   * @param options - The optional parameters.
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

      const span = createSpan("importKey", unflattenedOptions);

      let response: KeyVaultClientImportKeyResponse;
      try {
        response = await this.client.importKey(
          this.vaultUrl,
          name,
          key,
          setParentSpan(span, unflattenedOptions)
        );
      } finally {
        span.end();
      }

      return getKeyFromKeyBundle(response);
    } else {
      const response = await this.client.importKey(this.vaultUrl, name, key, options);
      return getKeyFromKeyBundle(response);
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
   * Deletes a key from a specified key vault.
   * @param name - The name of the key.
   * @param options - The optional parameters.
   */
  public async beginDeleteKey(
    name: string,
    options: BeginDeleteKeyOptions = {}
  ): Promise<PollerLike<PollOperationState<DeletedKey>, DeletedKey>> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const poller = new DeleteKeyPoller({
      name,
      vaultUrl: this.vaultUrl,
      client: this.client,
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
   * Updates the properties associated with a specified key in a given key vault.
   * @param name - The name of the key.
   * @param keyVersion - The version of the key.
   * @param options - The optional parameters.
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

      const span = createSpan("updateKeyProperties", unflattenedOptions);

      let response: KeyVaultClientUpdateKeyResponse;

      try {
        response = await this.client.updateKey(
          this.vaultUrl,
          name,
          keyVersion,
          setParentSpan(span, unflattenedOptions)
        );
      } finally {
        span.end();
      }

      return getKeyFromKeyBundle(response);
    } else {
      const response = await this.client.updateKey(this.vaultUrl, name, keyVersion, options);
      return getKeyFromKeyBundle(response);
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
   * Get a specified key from a given key vault.
   * @param name - The name of the key.
   * @param options - The optional parameters.
   */
  public async getKey(name: string, options: GetKeyOptions = {}): Promise<KeyVaultKey> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = createSpan("getKey", requestOptions);

    let response: KeyVaultClientGetKeyResponse;
    try {
      response = await this.client.getKey(
        this.vaultUrl,
        name,
        options && options.version ? options.version : "",
        setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return getKeyFromKeyBundle(response);
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
   * Gets the specified deleted key.
   * @param name - The name of the key.
   * @param options - The optional parameters.
   */
  public async getDeletedKey(
    name: string,
    options: GetDeletedKeyOptions = {}
  ): Promise<DeletedKey> {
    const responseOptions = operationOptionsToRequestOptionsBase(options);
    const span = createSpan("getDeletedKey", responseOptions);

    let response: KeyVaultClientGetDeletedKeyResponse;
    try {
      response = await this.client.getDeletedKey(
        this.vaultUrl,
        name,
        setParentSpan(span, responseOptions)
      );
    } finally {
      span.end();
    }

    return getKeyFromKeyBundle(response);
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
   * Permanently deletes the specified key.
   * @param name - The name of the key.
   * @param options - The optional parameters.
   */
  public async purgeDeletedKey(name: string, options: PurgeDeletedKeyOptions = {}): Promise<void> {
    const responseOptions = operationOptionsToRequestOptionsBase(options);
    const span = createSpan("purgeDeletedKey", responseOptions);

    try {
      await this.client.purgeDeletedKey(this.vaultUrl, name, setParentSpan(span, responseOptions));
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
   * Recovers the deleted key to the latest version.
   * @param name - The name of the deleted key.
   * @param options - The optional parameters.
   */
  public async beginRecoverDeletedKey(
    name: string,
    options: BeginRecoverDeletedKeyOptions = {}
  ): Promise<PollerLike<PollOperationState<DeletedKey>, DeletedKey>> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);

    const poller = new RecoverDeletedKeyPoller({
      name,
      vaultUrl: this.vaultUrl,
      client: this.client,
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
   * Backs up the specified key.
   * @param name - The name of the key.
   * @param options - The optional parameters.
   */
  public async backupKey(
    name: string,
    options: BackupKeyOptions = {}
  ): Promise<Uint8Array | undefined> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = createSpan("backupKey", requestOptions);

    let response: KeyVaultClientBackupKeyResponse;
    try {
      response = await this.client.backupKey(
        this.vaultUrl,
        name,
        setParentSpan(span, requestOptions)
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
   * Restores a backed up key to a vault.
   * @param backup - The backup blob associated with a key bundle.
   * @param options - The optional parameters.
   */
  public async restoreKeyBackup(
    backup: Uint8Array,
    options: RestoreKeyBackupOptions = {}
  ): Promise<KeyVaultKey> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = createSpan("restoreKeyBackup", requestOptions);

    let response: KeyVaultClientRestoreKeyResponse;
    try {
      response = await this.client.restoreKey(
        this.vaultUrl,
        backup,
        setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return getKeyFromKeyBundle(response);
  }

  /**
   * @internal
   * @hidden
   * Deals with the pagination of {@link listPropertiesOfKeyVersions}.
   * @param name - The name of the Key Vault Key.
   * @param continuationState - An object that indicates the position of the paginated request.
   * @param options - Common options for the iterative endpoints.
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
   * @hidden
   * Deals with the iteration of all the available results of {@link listPropertiesOfKeyVersions}.
   * @param name - The name of the Key Vault Key.
   * @param options - Common options for the iterative endpoints.
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
   * @param name - Name of the key to fetch versions for
   * @param options - The optional parameters.
   */
  public listPropertiesOfKeyVersions(
    name: string,
    options: ListPropertiesOfKeyVersionsOptions = {}
  ): PagedAsyncIterableIterator<KeyProperties> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = createSpan("listPropertiesOfKeyVersions", requestOptions);
    const updatedOptions: ListPropertiesOfKeyVersionsOptions = {
      ...requestOptions,
      ...setParentSpan(span, requestOptions)
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
   * @hidden
   * Deals with the pagination of {@link listPropertiesOfKeys}.
   * @param continuationState - An object that indicates the position of the paginated request.
   * @param options - Common options for the iterative endpoints.
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
   * @hidden
   * Deals with the iteration of all the available results of {@link listPropertiesOfKeys}.
   * @param options - Common options for the iterative endpoints.
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
   * List all keys in the vault
   * @param options - The optional parameters.
   */
  public listPropertiesOfKeys(
    options: ListPropertiesOfKeysOptions = {}
  ): PagedAsyncIterableIterator<KeyProperties> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = createSpan("listPropertiesOfKeys", requestOptions);
    const updatedOptions: ListPropertiesOfKeysOptions = {
      ...requestOptions,
      ...setParentSpan(span, requestOptions)
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
   * @hidden
   * Deals with the pagination of {@link listDeletedKeys}.
   * @param continuationState - An object that indicates the position of the paginated request.
   * @param options - Common options for the iterative endpoints.
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
   * @hidden
   * Deals with the iteration of all the available results of {@link listDeletedKeys}.
   * @param options - Common options for the iterative endpoints.
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
   * List all keys in the vault
   * @param options - The optional parameters.
   */
  public listDeletedKeys(
    options: ListDeletedKeysOptions = {}
  ): PagedAsyncIterableIterator<DeletedKey> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = createSpan("listDeletedKeys", requestOptions);

    const updatedOptions: ListDeletedKeysOptions = {
      ...options,
      ...setParentSpan(span, requestOptions)
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
   * @hidden
   * Shapes the exposed {@link DeletedKey} based on a received KeyItem.
   */
  private getDeletedKeyFromKeyItem(keyItem: KeyItem): DeletedKey {
    const parsedId = parseKeyVaultKeyId(keyItem.kid!);

    const attributes = keyItem.attributes || {};

    const abstractProperties: any = {
      deletedOn: (attributes as any).deletedDate,
      expiresOn: attributes.expires,
      createdOn: attributes.created,
      updatedOn: attributes.updated,

      kid: keyItem.kid,
      tags: keyItem.tags,
      managed: keyItem.managed,

      recoverableDays: keyItem.attributes,
      recoveryLevel: keyItem.attributes,
      exportable: keyItem.attributes,

      sourceId: parsedId.sourceId,
      vaultUrl: parsedId.vaultUrl,
      version: parsedId.version,
      name: parsedId.name,

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
   * @hidden
   * Shapes the exposed {@link KeyProperties} based on a received KeyItem.
   */
  private getKeyPropertiesFromKeyItem(keyItem: KeyItem): KeyProperties {
    const parsedId = parseKeyVaultKeyId(keyItem.kid!);

    const attributes = keyItem.attributes || {};

    const resultObject: any = {
      createdOn: attributes.created,
      updatedOn: attributes.updated,

      kid: keyItem.kid,
      tags: keyItem.tags,
      managed: keyItem.managed,

      recoverableDays: keyItem.attributes,
      recoveryLevel: keyItem.attributes,
      exportable: keyItem.attributes,

      sourceId: parsedId.sourceId,
      vaultUrl: parsedId.vaultUrl,
      version: parsedId.version,
      name: parsedId.name
    };

    delete resultObject.attributes;

    if (keyItem.attributes!.expires) {
      resultObject.expiresOn = keyItem.attributes!.expires;
      delete resultObject.expires;
    }

    return resultObject;
  }
}
