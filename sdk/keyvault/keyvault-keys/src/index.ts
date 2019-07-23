// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/* eslint @typescript-eslint/member-ordering: 0 */

import {
  ServiceClientCredentials,
  TokenCredential,
  isTokenCredential,
  RequestPolicyFactory,
  deserializationPolicy,
  bearerTokenAuthenticationPolicy,
  signingPolicy,
  exponentialRetryPolicy,
  redirectPolicy,
  systemErrorRetryPolicy,
  generateClientRequestIdPolicy,
  proxyPolicy,
  throttlingRetryPolicy,
  getDefaultProxySettings,
  isNode,
  userAgentPolicy
} from "@azure/core-http";

import { getDefaultUserAgentValue } from "@azure/core-http";
import "@azure/core-paging";
import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";

import { TelemetryOptions, ProxyOptions, RetryOptions } from "./core";
import {
  KeyBundle,
  JsonWebKeyType,
  JsonWebKey,
  JsonWebKeyOperation,
  JsonWebKeyCurveName,
  KeyItem,
  DeletionRecoveryLevel,
  KeyVaultClientGetKeysOptionalParams
} from "./core/models";
import { KeyVaultClient } from "./core/keyVaultClient";
import { RetryConstants, SDK_VERSION } from "./core/utils/constants";
import {
  NewPipelineOptions,
  isNewPipelineOptions,
  Pipeline,
  ParsedKeyVaultEntityIdentifier
} from "./core/keyVaultBase";
import {
  Key,
  DeletedKey,
  CreateKeyOptions,
  CreateEcKeyOptions,
  CreateRsaKeyOptions,
  ImportKeyOptions,
  UpdateKeyOptions,
  GetKeyOptions,
  ListKeysOptions,
  KeyAttributes,
  RequestOptions
} from "./keysModels";
import { parseKeyvaultIdentifier as parseKeyvaultEntityIdentifier } from "./core/utils";

export {
  CreateEcKeyOptions,
  CreateRsaKeyOptions,
  CreateKeyOptions,
  DeletedKey,
  DeletionRecoveryLevel,
  GetKeyOptions,
  ListKeysOptions as GetKeysOptions,
  ImportKeyOptions,
  JsonWebKey,
  JsonWebKeyCurveName,
  JsonWebKeyOperation,
  JsonWebKeyType,
  Key,
  KeyAttributes,
  NewPipelineOptions,
  PageSettings,
  PagedAsyncIterableIterator,
  ParsedKeyVaultEntityIdentifier,
  RequestOptions,
  UpdateKeyOptions
};

export { ProxyOptions, TelemetryOptions, RetryOptions };

/**
 * The client to interact with the KeyVault keys functionality
 */
export class KeysClient {
  /**
   * A static method used to create a new Pipeline object with the provided Credential.
   *
   * @static
   * @param {ServiceClientCredentials | TokenCredential} The credential to use for API requests.
   * @param {NewPipelineOptions} [pipelineOptions] Optional. Options.
   * @returns {Pipeline} A new Pipeline object.
   * @memberof KeysClient
   */
  public static getDefaultPipeline(
    credential: ServiceClientCredentials | TokenCredential,
    pipelineOptions: NewPipelineOptions = {}
  ): Pipeline {
    // Order is important. Closer to the API at the top & closer to the network at the bottom.
    // The credential's policy factory must appear close to the wire so it can sign any
    // changes made by other factories (like UniqueRequestIDPolicyFactory)
    const retryOptions = pipelineOptions.retryOptions || {};

    const userAgentString: string = KeysClient.getUserAgentString(pipelineOptions.telemetry);

    let requestPolicyFactories: RequestPolicyFactory[] = [];
    if (isNode) {
      requestPolicyFactories.push(
        proxyPolicy(getDefaultProxySettings((pipelineOptions.proxyOptions || {}).proxySettings))
      );
    }
    requestPolicyFactories = requestPolicyFactories.concat([
      userAgentPolicy({ value: userAgentString }),
      generateClientRequestIdPolicy(),
      deserializationPolicy(), // Default deserializationPolicy is provided by protocol layer
      throttlingRetryPolicy(),
      systemErrorRetryPolicy(),
      exponentialRetryPolicy(
        retryOptions.retryCount,
        retryOptions.retryIntervalInMS,
        RetryConstants.MIN_RETRY_INTERVAL_MS, // Minimum retry interval to prevent frequent retries
        retryOptions.maxRetryDelayInMs
      ),
      redirectPolicy(),
      isTokenCredential(credential)
        ? bearerTokenAuthenticationPolicy(credential, "https://vault.azure.net/.default")
        : signingPolicy(credential)
    ]);

    return {
      httpClient: pipelineOptions.HTTPClient,
      httpPipelineLogger: pipelineOptions.logger,
      requestPolicyFactories
    };
  }

  /**
   * The base URL to the vault
   */
  public readonly vaultBaseUrl: string;

  /**
   * The options to create the connection to the service
   */
  public readonly pipeline: Pipeline;

  /**
   * The authentication credentials
   */
  protected readonly credential: ServiceClientCredentials | TokenCredential;
  private readonly client: KeyVaultClient;

  /**
   * Creates an instance of KeysClient.
   *
   * Example usage:
   * ```ts
   * import { KeysClient } from "@azure/keyvault-keys";
   * import { EnvironmentCredential } from "@azure/identity";
   *
   * let url = `https://<MY KEYVAULT HERE>.vault.azure.net`;
   * let credentials = new EnvironmentCredential();
   *
   * let client = new KeysClient(url, credentials);
   * ```
   * @param {string} url the base url to the key vault.
   * @param {ServiceClientCredentials | TokenCredential} The credential to use for API requests.
   * @param {(Pipeline | NewPipelineOptions)} [pipelineOrOptions={}] Optional. A Pipeline, or options to create a default Pipeline instance.
   *                                                                 Omitting this parameter to create the default Pipeline instance.
   * @memberof KeysClient
   */
  constructor(
    url: string,
    credential: ServiceClientCredentials | TokenCredential,
    pipelineOrOptions: Pipeline | NewPipelineOptions = {}
  ) {
    this.vaultBaseUrl = url;
    this.credential = credential;
    if (isNewPipelineOptions(pipelineOrOptions)) {
      this.pipeline = KeysClient.getDefaultPipeline(credential, pipelineOrOptions);
    } else {
      this.pipeline = pipelineOrOptions;
    }

    this.client = new KeyVaultClient(credential, this.pipeline);
  }

  private static getUserAgentString(telemetry?: TelemetryOptions): string {
    const userAgentInfo: string[] = [];
    if (telemetry) {
      if (userAgentInfo.indexOf(telemetry.value) === -1) {
        userAgentInfo.push(telemetry.value);
      }
    }
    const libInfo = `azsdk-js-keyvault-keys/${SDK_VERSION}`;
    if (userAgentInfo.indexOf(libInfo) === -1) {
      userAgentInfo.push(libInfo);
    }
    const defaultUserAgentInfo = getDefaultUserAgentValue();
    if (userAgentInfo.indexOf(defaultUserAgentInfo) === -1) {
      userAgentInfo.push(defaultUserAgentInfo);
    }
    return userAgentInfo.join(" ");
  }

  // TODO: do we want Aborter as well?

  /**
   * The create key operation can be used to create any key type in Azure Key Vault. If the named key
   * already exists, Azure Key Vault creates a new version of the key. It requires the keys/create
   * permission.
   *
   * Example usage:
   * ```ts
   * let client = new KeysClient(url, credentials);
   * // Create an elliptic-curve key:
   * let result = await client.createKey("MyKey", "EC");
   * ```
   * @summary Creates a new key, stores it, then returns key parameters and attributes to the client.
   * @param name The name of the key.
   * @param keyType The type of the key.
   * @param [options] The optional parameters
   * @returns Promise<Key>
   */
  public async createKey(
    name: string,
    keyType: JsonWebKeyType,
    options?: CreateKeyOptions
  ): Promise<Key> {
    if (options) {
      const unflattenedAttributes = {
        enabled: options.enabled,
        notBefore: options.notBefore,
        expires: options.expires
      };
      const unflattenedOptions = {
        ...options,
        ...(options.requestOptions ? options.requestOptions : {}),
        keyAttributes: unflattenedAttributes
      };

      delete unflattenedOptions.enabled;
      delete unflattenedOptions.notBefore;
      delete unflattenedOptions.expires;
      delete unflattenedOptions.requestOptions;

      const response = await this.client.createKey(
        this.vaultBaseUrl,
        name,
        keyType,
        unflattenedOptions
      );
      return this.getKeyFromKeyBundle(response);
    } else {
      const response = await this.client.createKey(this.vaultBaseUrl, name, keyType, options);
      return this.getKeyFromKeyBundle(response);
    }
  }

  /**
   * The create key operation can be used to create any key type in Azure Key Vault. If the named key
   * already exists, Azure Key Vault creates a new version of the key. It requires the keys/create
   * permission.
   *
   * Example usage:
   * ```ts
   * let client = new KeysClient(url, credentials);
   * let result = await client.createEcKey("MyKey", { curve: "P-256" });
   * ```
   * @summary Creates a new key, stores it, then returns key parameters and attributes to the client.
   * @param name The name of the key.
   * @param keyType The type of the key.
   * @param [options] The optional parameters
   * @returns Promise<Key>
   */
  public async createEcKey(name: string, options?: CreateEcKeyOptions): Promise<Key> {
    if (options) {
      const unflattenedAttributes = {
        enabled: options.enabled,
        notBefore: options.notBefore,
        expires: options.expires
      };
      const unflattenedOptions = {
        ...options,
        ...(options.requestOptions ? options.requestOptions : {}),
        keyAttributes: unflattenedAttributes
      };

      delete unflattenedOptions.enabled;
      delete unflattenedOptions.notBefore;
      delete unflattenedOptions.expires;
      delete unflattenedOptions.requestOptions;

      const response = await this.client.createKey(
        this.vaultBaseUrl,
        name,
        options.hsm ? "EC-HSM" : "EC",
        unflattenedOptions
      );
      return this.getKeyFromKeyBundle(response);
    } else {
      const response = await this.client.createKey(this.vaultBaseUrl, name, "EC", options);
      return this.getKeyFromKeyBundle(response);
    }
  }

  /**
   * The create key operation can be used to create any key type in Azure Key Vault. If the named key
   * already exists, Azure Key Vault creates a new version of the key. It requires the keys/create
   * permission.
   *
   * Example usage:
   * ```ts
   * let client = new KeysClient(url, credentials);
   * let result = await client.createRsaKey("MyKey", { keySize: 2048 });
   * ```
   * @summary Creates a new key, stores it, then returns key parameters and attributes to the client.
   * @param name The name of the key.
   * @param keyType The type of the key.
   * @param [options] The optional parameters
   * @returns Promise<Key>
   */
  public async createRsaKey(name: string, options?: CreateRsaKeyOptions): Promise<Key> {
    if (options) {
      const unflattenedAttributes = {
        enabled: options.enabled,
        notBefore: options.notBefore,
        expires: options.expires
      };
      const unflattenedOptions = {
        ...options,
        ...(options.requestOptions ? options.requestOptions : {}),
        keyAttributes: unflattenedAttributes
      };

      delete unflattenedOptions.enabled;
      delete unflattenedOptions.notBefore;
      delete unflattenedOptions.expires;
      delete unflattenedOptions.requestOptions;

      const response = await this.client.createKey(
        this.vaultBaseUrl,
        name,
        options.hsm ? "RSA-HSM" : "RSA",
        unflattenedOptions
      );
      return this.getKeyFromKeyBundle(response);
    } else {
      const response = await this.client.createKey(this.vaultBaseUrl, name, "RSA", options);
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
   * let client = new KeysClient(url, credentials);
   * // Key contents in myKeyContents
   * let result = await client.importKey("MyKey", myKeyContents);
   * ```
   * @summary Imports an externally created key, stores it, and returns key parameters and attributes
   * to the client.
   * @param name Name for the imported key.
   * @param key The Json web key
   * @param [options] The optional parameters
   */
  public async importKey(name: string, key: JsonWebKey, options?: ImportKeyOptions): Promise<Key> {
    if (options) {
      const unflattenedAttributes = {
        enabled: options.enabled,
        notBefore: options.notBefore,
        expires: options.expires
      };
      const unflattenedOptions = {
        ...options,
        ...(options.requestOptions ? options.requestOptions : {}),
        keyAttributes: unflattenedAttributes
      };
      delete unflattenedOptions.enabled;
      delete unflattenedOptions.notBefore;
      delete unflattenedOptions.expires;
      delete unflattenedOptions.requestOptions;

      const response = await this.client.importKey(
        this.vaultBaseUrl,
        name,
        key,
        unflattenedOptions
      );
      return this.getKeyFromKeyBundle(response);
    } else {
      const response = await this.client.importKey(this.vaultBaseUrl, name, key, options);
      return this.getKeyFromKeyBundle(response);
    }
  }

  /**
   * The DELETE operation applies to any key stored in Azure Key Vault. DELETE cannot be applied
   * to an individual version of a key. This operation requires the keys/delete permission.
   *
   * Example usage:
   * ```ts
   * let client = new KeysClient(url, credentials);
   * let result = await client.deleteKey("MyKey");
   * ```
   * @summary Deletes a key from a specified key vault.
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param name The name of the key.
   * @param [options] The optional parameters
   * @returns Promise<DeletedKey>
   */
  public async deleteKey(name: string, options?: RequestOptions): Promise<DeletedKey> {
    const response = await this.client.deleteKey(
      this.vaultBaseUrl,
      name,
      options ? options.requestOptions : {}
    );
    return this.getKeyFromKeyBundle(response);
  }

  /**
   * The UPDATE operation changes specified attributes of an existing stored key. Attributes that
   * are not specified in the request are left unchanged. The value of a key itself cannot be
   * changed. This operation requires the keys/set permission.
   *
   * Example usage:
   * ```ts
   * let keyName = "MyKey";
   * let client = new KeysClient(url, credentials);
   * let key = await client.getKey(keyName);
   * let result = await client.updateKey(keyName, key.version, { enabled: false });
   * ```
   * @summary Updates the attributes associated with a specified key in a given key vault.
   * @param name The name of the key.
   * @param keyVersion The version of the key.
   * @param [options] The optional parameters
   * @returns Promise<Key>
   */
  public async updateKey(
    name: string,
    keyVersion: string,
    options?: UpdateKeyOptions
  ): Promise<Key> {
    if (options) {
      const unflattenedAttributes = {
        enabled: options.enabled,
        notBefore: options.notBefore,
        expires: options.expires
      };
      const unflattenedOptions = {
        ...options,
        ...(options.requestOptions ? options.requestOptions : {}),
        keyAttributes: unflattenedAttributes
      };
      delete unflattenedOptions.enabled;
      delete unflattenedOptions.notBefore;
      delete unflattenedOptions.expires;
      delete unflattenedOptions.requestOptions;

      const response = await this.client.updateKey(
        this.vaultBaseUrl,
        name,
        keyVersion,
        unflattenedOptions
      );
      return this.getKeyFromKeyBundle(response);
    } else {
      const response = await this.client.updateKey(this.vaultBaseUrl, name, keyVersion, options);
      return this.getKeyFromKeyBundle(response);
    }
  }

  /**
   * The GET operation is applicable to any key stored in Azure Key Vault. This operation requires
   * the keys/get permission.
   *
   * Example usage:
   * ```ts
   * let client = new KeysClient(url, credentials);
   * let key = await client.getKey("MyKey");
   * ```
   * @summary Get a specified key from a given key vault.
   * @param name The name of the key.
   * @param [options] The optional parameters
   * @returns Promise<Key>
   */
  public async getKey(name: string, options?: GetKeyOptions): Promise<Key> {
    const response = await this.client.getKey(
      this.vaultBaseUrl,
      name,
      options && options.version ? options.version : "",
      options
    );
    return this.getKeyFromKeyBundle(response);
  }

  /**
   * The Get Deleted Key operation returns the specified deleted key along with its attributes.
   * This operation requires the keys/get permission.
   *
   * Example usage:
   * ```ts
   * let client = new KeysClient(url, credentials);
   * let key = await client.getDeletedKey("MyDeletedKey");
   * ```
   * @summary Gets the specified deleted key.
   * @param name The name of the key.
   * @param [options] The optional parameters
   * @returns Promise<DeletedKey>
   */
  public async getDeletedKey(name: string, options?: RequestOptions): Promise<DeletedKey> {
    const response = await this.client.getDeletedKey(
      this.vaultBaseUrl,
      name,
      options ? options.requestOptions : {}
    );
    return this.getKeyFromKeyBundle(response);
  }

  /**
   * The purge deleted key operation removes the key permanently, without the possibility of
   * recovery. This operation can only be enabled on a soft-delete enabled vault. This operation
   * requires the keys/purge permission.
   *
   * Example usage:
   * ```ts
   * let client = new KeysClient(url, credentials);
   * await client.deleteKey("MyKey");
   * // ...
   * await client.purgeDeletedKey("MyKey");
   * ```
   * @summary Permanently deletes the specified key.
   * @param name The name of the key.
   * @param [options] The optional parameters
   * @returns Promise<void>
   */
  public async purgeDeletedKey(name: string, options?: RequestOptions): Promise<void> {
    await this.client.purgeDeletedKey(
      this.vaultBaseUrl,
      name,
      options ? options.requestOptions : {}
    );
  }

  /**
   * Recovers the deleted key in the specified vault. This operation can only be performed on a
   * soft-delete enabled vault. This operation requires the keys/recover permission.
   *
   * Example usage:
   * ```ts
   * let client = new KeysClient(url, credentials);
   * await client.deleteKey("MyKey");
   * // ...
   * await client.recoverDeletedKey("MyKey");
   * ```
   * @summary Recovers the deleted key to the latest version.
   * @param name The name of the deleted key.
   * @param [options] The optional parameters
   * @returns Promise<Key>
   */
  public async recoverDeletedKey(name: string, options?: RequestOptions): Promise<Key> {
    const response = await this.client.recoverDeletedKey(
      this.vaultBaseUrl,
      name,
      options ? options.requestOptions : {}
    );
    return this.getKeyFromKeyBundle(response);
  }

  /**
   * Requests that a backup of the specified key be downloaded to the client. All versions of the
   * key will be downloaded. This operation requires the keys/backup permission.
   *
   * Example usage:
   * ```ts
   * let client = new KeysClient(url, credentials);
   * let backupContents = await client.backupKey("MyKey");
   * ```
   * @summary Backs up the specified key.
   * @param name The name of the key.
   * @param [options] The optional parameters
   * @returns Promise<Uint8Array | undefined>
   */
  public async backupKey(name: string, options?: RequestOptions): Promise<Uint8Array | undefined> {
    const response = await this.client.backupKey(
      this.vaultBaseUrl,
      name,
      options ? options.requestOptions : {}
    );
    return response.value;
  }

  /**
   * Restores a backed up key, and all its versions, to a vault. This operation requires the
   * keys/restore permission.
   *
   * Example usage:
   * ```ts
   * let client = new KeysClient(url, credentials);
   * let backupContents = await client.backupKey("MyKey");
   * // ...
   * let key = await client.restoreKey(backupContents);
   * ```
   * @summary Restores a backed up key to a vault.
   * @param backup The backup blob associated with a key bundle.
   * @param [options] The optional parameters
   * @returns Promise<Key>
   */
  public async restoreKey(backup: Uint8Array, options?: RequestOptions): Promise<Key> {
    const response = await this.client.restoreKey(
      this.vaultBaseUrl,
      backup,
      options ? options.requestOptions : {}
    );
    return this.getKeyFromKeyBundle(response);
  }

  private async *listKeyVersionsPage(
    name: string,
    continuationState: PageSettings,
    options?: ListKeysOptions
  ): AsyncIterableIterator<KeyAttributes[]> {
    if (continuationState.continuationToken == null) {
      const optionsComplete: KeyVaultClientGetKeysOptionalParams = {
        maxresults: continuationState.maxPageSize,
        ...(options && options.requestOptions ? options.requestOptions : {})
      };
      const currentSetResponse = await this.client.getKeyVersions(
        this.vaultBaseUrl,
        name,
        optionsComplete
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      yield currentSetResponse.map(this.getKeyAttributesFromKeyItem);
    }
    while (continuationState.continuationToken) {
      const currentSetResponse = await this.client.getKeyVersionsNext(
        continuationState.continuationToken,
        options
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      yield currentSetResponse.map(this.getKeyAttributesFromKeyItem);
    }
  }

  private async *listKeyVersionsAll(
    name: string,
    options?: ListKeysOptions
  ): AsyncIterableIterator<KeyAttributes> {
    const f = {};

    for await (const page of this.listKeyVersionsPage(name, f, options)) {
      for (const item of page) {
        yield item;
      }
    }
  }

  /**
   * Iterates all versions of the given key in the vault. The full key identifier, attributes, and tags are provided
   * in the response. This operation requires the keys/list permission.
   *
   * Example usage:
   * ```ts
   * let client = new KeysClient(url, credentials);
   * for await (const keyAttr of client.listKeyVersions("MyKey")) {
   *   const key = await client.getKey(keyAttr.name);
   *   console.log("key version: ", key);
   * }
   * ```
   * @param name Name of the key to fetch versions for
   * @param [options] The optional parameters
   * @returns PagedAsyncIterableIterator<KeyAttributes, KeyAttributes[]>
   */
  public listKeyVersions(
    name: string,
    options?: ListKeysOptions
  ): PagedAsyncIterableIterator<KeyAttributes, KeyAttributes[]> {
    const iter = this.listKeyVersionsAll(name, options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) => this.listKeyVersionsPage(name, settings, options)
    };
  }

  private async *listKeysPage(
    continuationState: PageSettings,
    options?: ListKeysOptions
  ): AsyncIterableIterator<KeyAttributes[]> {
    if (continuationState.continuationToken == null) {
      const optionsComplete: KeyVaultClientGetKeysOptionalParams = {
        maxresults: continuationState.maxPageSize,
        ...(options && options.requestOptions ? options.requestOptions : {})
      };
      const currentSetResponse = await this.client.getKeys(this.vaultBaseUrl, optionsComplete);
      continuationState.continuationToken = currentSetResponse.nextLink;
      yield currentSetResponse.map(this.getKeyAttributesFromKeyItem);
    }
    while (continuationState.continuationToken) {
      const currentSetResponse = await this.client.getKeysNext(
        continuationState.continuationToken,
        options
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      yield currentSetResponse.map(this.getKeyAttributesFromKeyItem);
    }
  }

  private async *listKeysAll(options?: ListKeysOptions): AsyncIterableIterator<KeyAttributes> {
    const f = {};

    for await (const page of this.listKeysPage(f, options)) {
      for (const item of page) {
        yield item;
      }
    }
  }

  /**
   * Iterates the latest version of all keys in the vault.  The full key identifier and attributes are provided
   * in the response. No values are returned for the keys. This operations requires the keys/list permission.
   *
   * Example usage:
   * ```ts
   * let client = new KeysClient(url, credentials);
   * for await (const keyAttr of client.listKeys()) {
   *   const key = await client.getKey(keyAttr.name);
   *   console.log("key: ", key);
   * }
   * ```
   * @summary List all keys in the vault
   * @param [options] The optional parameters
   * @returns PagedAsyncIterableIterator<KeyAttributes, KeyAttributes[]>
   */
  public listKeys(
    options?: ListKeysOptions
  ): PagedAsyncIterableIterator<KeyAttributes, KeyAttributes[]> {
    const iter = this.listKeysAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) => this.listKeysPage(settings, options)
    };
  }

  private async *listDeletedKeysPage(
    continuationState: PageSettings,
    options?: ListKeysOptions
  ): AsyncIterableIterator<KeyAttributes[]> {
    if (continuationState.continuationToken == null) {
      const optionsComplete: KeyVaultClientGetKeysOptionalParams = {
        maxresults: continuationState.maxPageSize,
        ...(options && options.requestOptions ? options.requestOptions : {})
      };
      const currentSetResponse = await this.client.getDeletedKeys(
        this.vaultBaseUrl,
        optionsComplete
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      yield currentSetResponse.map(this.getKeyAttributesFromKeyItem);
    }
    while (continuationState.continuationToken) {
      const currentSetResponse = await this.client.getDeletedKeysNext(
        continuationState.continuationToken,
        options
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      yield currentSetResponse.map(this.getKeyAttributesFromKeyItem);
    }
  }

  private async *listDeletedKeysAll(
    options?: ListKeysOptions
  ): AsyncIterableIterator<KeyAttributes> {
    const f = {};

    for await (const page of this.listDeletedKeysPage(f, options)) {
      for (const item of page) {
        yield item;
      }
    }
  }

  /**
   * Iterates the deleted keys in the vault.  The full key identifier and attributes are provided
   * in the response. No values are returned for the keys. This operations requires the keys/list permission.
   *
   * Example usage:
   * ```ts
   * let client = new KeysClient(url, credentials);
   * for await (const keyAttr of client.listDeletedKeys()) {
   *   const deletedKey = await client.getKey(keyAttr.name);
   *   console.log("deleted key: ", deletedKey);
   * }
   * ```
   * @summary List all keys in the vault
   * @param [options] The optional parameters
   * @returns PagedAsyncIterableIterator<KeyAttributes, KeyAttributes[]>
   */
  public listDeletedKeys(
    options?: ListKeysOptions
  ): PagedAsyncIterableIterator<KeyAttributes, KeyAttributes[]> {
    const iter = this.listDeletedKeysAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) => this.listDeletedKeysPage(settings, options)
    };
  }

  private getKeyFromKeyBundle(keyBundle: KeyBundle): Key {
    const parsedId = parseKeyvaultEntityIdentifier(
      "keys",
      keyBundle.key ? keyBundle.key.kid : undefined
    );

    let resultObject;
    if (keyBundle.attributes) {
      resultObject = {
        keyMaterial: keyBundle.key,
        ...keyBundle,
        ...parsedId,
        ...keyBundle.attributes
      };
      delete resultObject.attributes;
    } else {
      resultObject = {
        keyMaterial: keyBundle.key,
        ...keyBundle,
        ...parsedId
      };
    }

    return resultObject;
  }

  private getKeyAttributesFromKeyItem(keyItem: KeyItem): KeyAttributes {
    const parsedId = parseKeyvaultEntityIdentifier("keys", keyItem.kid);

    let resultObject;
    if (keyItem.attributes) {
      resultObject = {
        ...keyItem,
        ...parsedId,
        ...keyItem.attributes
      };
      delete resultObject.attributes;
    } else {
      resultObject = {
        ...keyItem,
        ...parsedId
      };
    }

    return resultObject;
  }
}
