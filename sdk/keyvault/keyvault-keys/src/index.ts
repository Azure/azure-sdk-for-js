// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import {
  ServiceClientCredentials,
  RequestPolicyFactory,
  deserializationPolicy,
  signingPolicy,
  exponentialRetryPolicy,
  redirectPolicy,
  systemErrorRetryPolicy,
  generateClientRequestIdPolicy,
  proxyPolicy,
  throttlingRetryPolicy,
  getDefaultProxySettings,
  userAgentPolicy
} from "@azure/ms-rest-js";

import { getDefaultUserAgentValue } from "@azure/ms-rest-azure-js";

import { TelemetryOptions } from "./core";
import { KeyBundle, JsonWebKeyType, JsonWebKey, KeyItem } from "./core/models";
import { KeyVaultClient } from "./core/keyVaultClient";
import { RetryConstants, SDK_VERSION } from "./core/utils/constants";
import { NewPipelineOptions, isNewPipelineOptions, Pipeline } from "./core/keyVaultBase";
import {
  Key,
  DeletedKey,
  CreateKeyOptions,
  CreateEcKeyOptions,
  CreateRsaKeyOptions,
  ImportKeyOptions,
  UpdateKeyOptions,
  GetKeyOptions,
  GetAllKeysOptions,
  KeyAttributes,
  RequestOptions
} from "./keysModels";
import { parseKeyvaultIdentifier as parseKeyvaultEntityIdentifier } from "./core/utils";

export class KeysClient {
  /**
   * A static method used to create a new Pipeline object with the provided Credential.
   *
   * @static
   * @param {ServiceClientCredentials} credential that implements signRequet().
   * @param {NewPipelineOptions} [pipelineOptions] Optional. Options.
   * @returns {Pipeline} A new Pipeline object.
   * @memberof KeysClient
   */
  public static getDefaultPipeline(
    credential: ServiceClientCredentials,
    pipelineOptions: NewPipelineOptions = {}
  ): Pipeline {
    // Order is important. Closer to the API at the top & closer to the network at the bottom.
    // The credential's policy factory must appear close to the wire so it can sign any
    // changes made by other factories (like UniqueRequestIDPolicyFactory)
    const retryOptions = pipelineOptions.retryOptions || {};

    const userAgentString: string = KeysClient.getUserAgentString(pipelineOptions.telemetry);

    const requestPolicyFactories: RequestPolicyFactory[] = [
      proxyPolicy(getDefaultProxySettings((pipelineOptions.proxyOptions || {}).proxySettings)),
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
      signingPolicy(credential)
    ];

    return {
      httpClient: pipelineOptions.HTTPClient,
      httpPipelineLogger: pipelineOptions.logger,
      requestPolicyFactories
    };
  }

  public readonly vaultBaseUrl: string;

  public readonly pipeline: Pipeline;

  protected readonly credential: ServiceClientCredentials;
  private readonly client: KeyVaultClient;

  /**
   * Creates an instance of KeysClient.
   * @param {string} url the base url to the key vault.
   * @param {ServiceClientCredentials} credential credential.
   * @param {(Pipeline | NewPipelineOptions)} [pipelineOrOptions={}] Optional. A Pipeline, or options to create a default Pipeline instance.
   *                                                                 Omitting this parameter to create the default Pipeline instance.
   * @memberof KeysClient
   */
  constructor(
    url: string,
    credential: ServiceClientCredentials,
    pipelineOrOptions: Pipeline | NewPipelineOptions = {}
  ) {
    this.vaultBaseUrl = url;
    this.credential = credential;
    if (isNewPipelineOptions(pipelineOrOptions)) {
      this.pipeline = KeysClient.getDefaultPipeline(
        credential as ServiceClientCredentials,
        pipelineOrOptions
      );
    } else {
      this.pipeline = pipelineOrOptions;
    }

    this.client = new KeyVaultClient(credential, this.pipeline);
  }

  private static getUserAgentString(telemetry?: TelemetryOptions) {
    const userAgentInfo: string[] = [];
    if (telemetry) {
      if (userAgentInfo.indexOf(telemetry.value) === -1) {
        userAgentInfo.push(telemetry.value);
      }
    }
    const libInfo = `Azure-KeyVault-Keys/${SDK_VERSION}`;
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
      let unflattenedAttributes = { enabled: options.enabled, notBefore: options.notBefore, expires: options.expires };
      let unflattenedOptions = { ...options, ...(options.requestOptions ? options.requestOptions : {}), keyAttributes: unflattenedAttributes };

      delete unflattenedOptions.enabled;
      delete unflattenedOptions.notBefore;
      delete unflattenedOptions.expires;
      delete unflattenedOptions.requestOptions;

      const response = await this.client.createKey(this.vaultBaseUrl, name, keyType, unflattenedOptions);
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
   * @summary Creates a new key, stores it, then returns key parameters and attributes to the client.
   * @param name The name of the key.
   * @param keyType The type of the key.
   * @param [options] The optional parameters
   * @returns Promise<Key>
   */
  public async createEcKey(
    name: string,
    options?: CreateEcKeyOptions
  ): Promise<Key> {
    if (options) {
      let unflattenedAttributes = { enabled: options.enabled, notBefore: options.notBefore, expires: options.expires };
      let unflattenedOptions = { ...options, ...(options.requestOptions ? options.requestOptions : {}), keyAttributes: unflattenedAttributes };

      delete unflattenedOptions.enabled;
      delete unflattenedOptions.notBefore;
      delete unflattenedOptions.expires;
      delete unflattenedOptions.requestOptions;

      const response = await this.client.createKey(this.vaultBaseUrl, name, options.hsm ? "EC-HSM" : "EC", unflattenedOptions);
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
   * @summary Creates a new key, stores it, then returns key parameters and attributes to the client.
   * @param name The name of the key.
   * @param keyType The type of the key.
   * @param [options] The optional parameters
   * @returns Promise<Key>
   */
  public async createRsaKey(
    name: string,
    options?: CreateRsaKeyOptions
  ): Promise<Key> {
    if (options) {
      let unflattenedAttributes = { enabled: options.enabled, notBefore: options.notBefore, expires: options.expires };
      let unflattenedOptions = { ...options, ...(options.requestOptions ? options.requestOptions : {}), keyAttributes: unflattenedAttributes };

      delete unflattenedOptions.enabled;
      delete unflattenedOptions.notBefore;
      delete unflattenedOptions.expires;
      delete unflattenedOptions.requestOptions;

      const response = await this.client.createKey(this.vaultBaseUrl, name, options.hsm ? "RSA-HSM" : "RSA", unflattenedOptions);
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
   * @summary Imports an externally created key, stores it, and returns key parameters and attributes
   * to the client.
   * @param name Name for the imported key.
   * @param key The Json web key
   * @param [options] The optional parameters
   */
  public async importKey(
    name: string,
    key: JsonWebKey,
    options?: ImportKeyOptions
  ): Promise<Key> {
    if (options) {
      let unflattenedAttributes = { enabled: options.enabled, notBefore: options.notBefore, expires: options.expires };
      let unflattenedOptions = { ...options, ...(options.requestOptions ? options.requestOptions : {}), keyAttributes: unflattenedAttributes };
      delete unflattenedOptions.enabled;
      delete unflattenedOptions.notBefore;
      delete unflattenedOptions.expires;
      delete unflattenedOptions.requestOptions;

      const response = await this.client.importKey(this.vaultBaseUrl, name, key, unflattenedOptions);
      return this.getKeyFromKeyBundle(response);
    } else {
      const response = await this.client.importKey(this.vaultBaseUrl, name, key, options);
      return this.getKeyFromKeyBundle(response);
    }
  }

  /**
   * The DELETE operation applies to any key stored in Azure Key Vault. DELETE cannot be applied
   * to an individual version of a key. This operation requires the keys/delete permission.
   * @summary Deletes a key from a specified key vault.
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param name The name of the key.
   * @param [options] The optional parameters
   * @returns Promise<DeletedKey>
   */
  public async deleteKey(
    name: string,
    options?: RequestOptions
  ): Promise<DeletedKey> {
    const response = await this.client.deleteKey(this.vaultBaseUrl, name, options ? options.requestOptions : {});
    return this.getKeyFromKeyBundle(response);
  }

  /**
   * The UPDATE operation changes specified attributes of an existing stored key. Attributes that
   * are not specified in the request are left unchanged. The value of a key itself cannot be
   * changed. This operation requires the keys/set permission.
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
      let unflattenedAttributes = { enabled: options.enabled, notBefore: options.notBefore, expires: options.expires };
      let unflattenedOptions = { ...options, ...(options.requestOptions ? options.requestOptions : {}), keyAttributes: unflattenedAttributes };
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
      const response = await this.client.updateKey(
        this.vaultBaseUrl,
        name,
        keyVersion,
        options
      );
      return this.getKeyFromKeyBundle(response);
    }
  }

  /**
   * The GET operation is applicable to any key stored in Azure Key Vault. This operation requires
   * the keys/get permission.
   * @summary Get a specified key from a given key vault.
   * @param name The name of the key.
   * @param [options] The optional parameters
   * @returns Promise<Key>
   */
  public async getKey(
    name: string,
    options?: GetKeyOptions
  ): Promise<Key> {
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
   * @summary Gets the specified deleted key.
   * @param name The name of the key.
   * @param [options] The optional parameters
   * @returns Promise<DeletedKey>
   */
  public async getDeletedKey(
    name: string,
    options?: RequestOptions
  ): Promise<DeletedKey> {
    const response = await this.client.getDeletedKey(this.vaultBaseUrl, name, options ? options.requestOptions : {});
    return this.getKeyFromKeyBundle(response);
  }

  /**
   * The purge deleted key operation removes the key permanently, without the possibility of
   * recovery. This operation can only be enabled on a soft-delete enabled vault. This operation
   * requires the keys/purge permission.
   * @summary Permanently deletes the specified key.
   * @param name The name of the key.
   * @param [options] The optional parameters
   * @returns Promise<void>
   */
  public async purgeDeletedKey(name: string, options?: RequestOptions): Promise<void> {
    await this.client.purgeDeletedKey(this.vaultBaseUrl, name, options ? options.requestOptions : {});
  }

  /**
   * Recovers the deleted key in the specified vault. This operation can only be performed on a
   * soft-delete enabled vault. This operation requires the keys/recover permission.
   * @summary Recovers the deleted key to the latest version.
   * @param name The name of the deleted key.
   * @param [options] The optional parameters
   * @returns Promise<Key>
   */
  public async recoverDeletedKey(
    name: string,
    options?: RequestOptions
  ): Promise<Key> {
    const response = await this.client.recoverDeletedKey(this.vaultBaseUrl, name, options ? options.requestOptions : {});
    return this.getKeyFromKeyBundle(response);
  }

  /**
   * Requests that a backup of the specified key be downloaded to the client. All versions of the
   * key will be downloaded. This operation requires the keys/backup permission.
   * @summary Backs up the specified key.
   * @param name The name of the key.
   * @param [options] The optional parameters
   * @returns Promise<Uint8Array | undefined>
   */
  public async backupKey(
    name: string,
    options?: RequestOptions
  ): Promise<Uint8Array | undefined> {
    const response = await this.client.backupKey(this.vaultBaseUrl, name, options ? options.requestOptions : {});
    return response.value;
  }

  /**
   * Restores a backed up key, and all its versions, to a vault. This operation requires the
   * keys/restore permission.
   * @summary Restores a backed up key to a vault.
   * @param backup The backup blob associated with a key bundle.
   * @param [options] The optional parameters
   * @returns Promise<Key>
   */
  public async restoreKey(
    backup: Uint8Array,
    options?: RequestOptions
  ): Promise<Key> {
    const response = await this.client.restoreKey(
      this.vaultBaseUrl,
      backup,
      options ? options.requestOptions : {}
    );
    return this.getKeyFromKeyBundle(response);
  }

  public async *getKeyVersions(
    name: string,
    options?: GetAllKeysOptions
  ): AsyncIterableIterator<KeyAttributes> {
    let currentSetResponse = await this.client.getKeyVersions(
      this.vaultBaseUrl,
      name,
      {
        ...(options && options.requestOptions ? options.requestOptions : {})
      }
    );
    yield* currentSetResponse.map(this.getKeyAttributesFromKeyItem);

    while (currentSetResponse.nextLink) {
      currentSetResponse = await this.client.getKeyVersionsNext(
        currentSetResponse.nextLink,
        options
      );
      yield* currentSetResponse.map(this.getKeyAttributesFromKeyItem);
    }
  }

  /**
   * Iterates the latest version of all keys in the vault.  The full key identifier and attributes are provided
   * in the response. No values are returned for the keys. This operations requires the keys/list permission.
   * @summary List all versions of the specified key.
   * @param name The name of the key.
   * @param [options] The optional parameters
   * @returns AsyncIterableIterator<Key>
   */
  public async *getAllKeys(options?: GetAllKeysOptions): AsyncIterableIterator<KeyAttributes> {
    let currentSetResponse = await this.client.getKeys(
      this.vaultBaseUrl,
      {
        ...(options && options.requestOptions ? options.requestOptions : {})
      }
    );
    yield* currentSetResponse.map(this.getKeyAttributesFromKeyItem);

    while (currentSetResponse.nextLink) {
      currentSetResponse = await this.client.getKeysNext(
        currentSetResponse.nextLink,
        options
      );
      yield* currentSetResponse.map(this.getKeyAttributesFromKeyItem);
    }
  }

  /**
   * Iterates the latest version of all keys in the vault.  The full key identifier and attributes are provided
   * in the response. No values are returned for the keys. This operations requires the keys/list permission.
   * @summary List all versions of the specified key.
   * @param name The name of the key.
   * @param [options] The optional parameters
   * @returns AsyncIterableIterator<Key>
   */
  public async *getAllDeletedKeys(options?: GetAllKeysOptions): AsyncIterableIterator<Key> {
    let currentSetResponse = await this.client.getDeletedKeys(
      this.vaultBaseUrl,
      {
        ...(options && options.requestOptions ? options.requestOptions : {})
      }
    );
    yield* currentSetResponse.map(this.getKeyAttributesFromKeyItem);

    while (currentSetResponse.nextLink) {
      currentSetResponse = await this.client.getDeletedKeysNext(
        currentSetResponse.nextLink,
        options
      );
      yield* currentSetResponse.map(this.getKeyAttributesFromKeyItem);
    }
  }

  private getKeyFromKeyBundle(keyBundle: KeyBundle): Key {
    const parsedId = parseKeyvaultEntityIdentifier("keys", keyBundle.key ? keyBundle.key.kid : undefined);

    let resultObject;
    if (keyBundle.attributes) {
      resultObject = {
        keyMaterial: keyBundle.key,
        ...keyBundle,
        ...parsedId,
        ...keyBundle.attributes
      }
      delete (resultObject.attributes);
    } else {
      resultObject = {
        keyMaterial: keyBundle.key,
        ...keyBundle,
        ...parsedId
      }
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
      }
      delete (resultObject.attributes);
    } else {
      resultObject = {
        ...keyItem,
        ...parsedId
      }
    }

    return resultObject;
  }
}
