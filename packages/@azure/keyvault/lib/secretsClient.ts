// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import {
  HttpClient as IHttpClient,
  HttpPipelineLogger as IHttpPipelineLogger,
  ServiceClientCredentials,
  RequestPolicyFactory,
  deserializationPolicy,
  signingPolicy,
  RequestOptionsBase,
  exponentialRetryPolicy,
  redirectPolicy,
  systemErrorRetryPolicy
  // generateClientRequestIdPolicy,
  // proxyPolicy,
  // throttlingRetryPolicy
} from "@azure/ms-rest-js";

import { AzureServiceClientOptions as Pipeline } from "@azure/ms-rest-azure-js";

import { IRetryOptions, IProxyOptions } from "./clientOptions";
import { ITelemetryOptions, TelemetryPolicyFactory } from "./TelemetryPolicyFactory";
import * as Models from "./models";
import { KeyVaultClient } from "./keyVaultClient";
import { RetryConstants } from "./utils/constants";
import { UniqueRequestIDPolicyFactory } from "./UniqueRequestIDPolicyFactory";
import { Secret, DeletedSecret } from "./secretsModels";
import { parseKeyvaultIdentifier as parseKeyvaultEntityIdentifier } from "./utils";

export { Pipeline };

/**
 * Option interface for Pipeline.newPipeline method.
 *
 * Properties of this interface should not overlap with properties of {@link Pipeline}
 * as we use them to differentiate instances of NewPipelineOptions from instances of Pipeline.
 * If this interface is modified, the method isNewPipelineOptions() should also be updated
 * to adapt the changes.
 *
 * @export
 * @interface NewPipelineOptions
 */
export interface NewPipelineOptions {
  /**
   * Telemetry configures the built-in telemetry policy behavior.
   *
   * @type {ITelemetryOptions}
   * @memberof NewPipelineOptions
   */
  telemetry?: ITelemetryOptions;
  retryOptions?: IRetryOptions;
  proxyOptions?: IProxyOptions;

  logger?: IHttpPipelineLogger;
  HTTPClient?: IHttpClient;
}

function isNewPipelineOptions(
  pipelineOrOptions: Pipeline | NewPipelineOptions
): pipelineOrOptions is NewPipelineOptions {
  // An empty object is consider options
  function isEmptyObject(obj: Pipeline | NewPipelineOptions) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }
  const options = pipelineOrOptions as NewPipelineOptions;
  return (
    isEmptyObject(pipelineOrOptions) ||
    !!(options.retryOptions || options.proxyOptions || options.logger || options.HTTPClient)
  );
}

export class SecretsClient {
  /**
   * A static method used to create a new Pipeline object with the provided Credential.
   *
   * @static
   * @param {ServiceClientCredentials} credential that implements signRequet().
   * @param {NewPipelineOptions} [pipelineOptions] Optional. Options.
   * @returns {Pipeline} A new Pipeline object.
   * @memberof SecretsClient
   */
  public static getDefaultPipeline(
    credential: ServiceClientCredentials,
    pipelineOptions: NewPipelineOptions = {}
  ): Pipeline {
    // Order is important. Closer to the API at the top & closer to the network at the bottom.
    // The credential's policy factory must appear close to the wire so it can sign any
    // changes made by other factories (like UniqueRequestIDPolicyFactory)
    const retryOptions = pipelineOptions.retryOptions || {};
    const requestPolicyFactories: RequestPolicyFactory[] = [
      // TODO: proxyPolicy() is not yet exported in ms-rest-js.
      // proxyPolicy((pipelineOptions.proxyOptions || {}).proxySettings),
      new TelemetryPolicyFactory(pipelineOptions.telemetry),
      // TODO: generateClientRequestIdPolicy() was not yet exported in ms-rest-js. For now use UniqueRequestIDPolicyFactory
      // generateClientRequestIdPolicy(),
      new UniqueRequestIDPolicyFactory(),
      deserializationPolicy(), // Default deserializationPolicy is provided by protocol layer
      // TODO: throttlingRetryPolicy() is not yet exported in ms-rest-js.
      // throttlingRetryPolicy(),
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
  protected readonly client: KeyVaultClient;

  /**
   * Creates an instance of SecretsClient.
   * @param {string} url the base url to the key vault.
   * @param {ServiceClientCredentials} credential credential.
   * @param {(Pipeline | NewPipelineOptions)} [pipelineOrOptions={}] Optional. A Pipeline, or options to create a default Pipeline instance.
   *                                                                 Omitting this parameter to create the default Pipeline instance.
   * @memberof SecretsClient
   */
  constructor(
    url: string,
    credential: ServiceClientCredentials,
    pipelineOrOptions: Pipeline | NewPipelineOptions = {}
  ) {
    this.vaultBaseUrl = url;
    this.credential = credential;
    if (isNewPipelineOptions(pipelineOrOptions)) {
      this.pipeline = SecretsClient.getDefaultPipeline(
        credential as ServiceClientCredentials,
        pipelineOrOptions
      );
    } else {
      this.pipeline = pipelineOrOptions;
    }

    this.client = new KeyVaultClient(credential, this.pipeline);
  }

  // TODO: do we want Aborter as well?

  /**
   * The SET operation adds a secret to the Azure Key Vault. If the named secret already exists,
   * Azure Key Vault creates a new version of that secret. This operation requires the secrets/set
   * permission.
   * @summary Sets a secret in a specified key vault.
   * @param secretName The name of the secret.
   * @param value The value of the secret.
   * @param [options] The optional parameters
   * @returns Promise<Secret>
   */
  public async setSecret(
    secretName: string,
    value: string,
    options?: Models.KeyVaultClientSetSecretOptionalParams
  ) {
    const response = await this.client.setSecret(this.vaultBaseUrl, secretName, value, options);
    return this.getSecretFromSecretBundle(response);
  }

  /**
   * The DELETE operation applies to any secret stored in Azure Key Vault. DELETE cannot be applied
   * to an individual version of a secret. This operation requires the secrets/delete permission.
   * @summary Deletes a secret from a specified key vault.
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param secretName The name of the secret.
   * @param [options] The optional parameters
   * @returns Promise<DeletedSecret>
   */
  public async deleteSecret(
    secretName: string,
    options?: RequestOptionsBase
  ): Promise<DeletedSecret> {
    const response = await this.client.deleteSecret(this.vaultBaseUrl, secretName, options);
    return this.getSecretFromSecretBundle(response);
  }

  /**
   * The UPDATE operation changes specified attributes of an existing stored secret. Attributes that
   * are not specified in the request are left unchanged. The value of a secret itself cannot be
   * changed. This operation requires the secrets/set permission.
   * @summary Updates the attributes associated with a specified secret in a given key vault.
   * @param secretName The name of the secret.
   * @param secretVersion The version of the secret.
   * @param [options] The optional parameters
   * @returns Promise<Secret>
   */
  public async updateSecret(
    secretName: string,
    secretVersion: string,
    options?: Models.KeyVaultClientUpdateSecretOptionalParams
  ): Promise<Secret> {
    const response = await this.client.updateSecret(
      this.vaultBaseUrl,
      secretName,
      secretVersion,
      options
    );
    return this.getSecretFromSecretBundle(response);
  }

  /**
   * The GET operation is applicable to any secret stored in Azure Key Vault. This operation requires
   * the secrets/get permission.
   * @summary Get a specified secret from a given key vault.
   * @param secretName The name of the secret.
   * @param secretVersion The version of the secret.
   * @param [options] The optional parameters
   * @returns Promise<Secret>
   */
  public async getSecret(
    secretName: string,
    secretVersion?: string,
    options: RequestOptionsBase = {}
  ): Promise<Secret> {
    const response = await this.client.getSecret(
      this.vaultBaseUrl,
      secretName,
      secretVersion || "",
      options
    );
    return this.getSecretFromSecretBundle(response);
  }

  /**
   * The Get Deleted Secret operation returns the specified deleted secret along with its attributes.
   * This operation requires the secrets/get permission.
   * @summary Gets the specified deleted secret.
   * @param secretName The name of the secret.
   * @param [options] The optional parameters
   * @returns Promise<DeletedSecret>
   */
  public async getDeletedSecret(
    secretName: string,
    options?: RequestOptionsBase
  ): Promise<DeletedSecret> {
    const response = await this.client.getDeletedSecret(this.vaultBaseUrl, secretName, options);
    return this.getSecretFromSecretBundle(response);
  }

  /**
   * The purge deleted secret operation removes the secret permanently, without the possibility of
   * recovery. This operation can only be enabled on a soft-delete enabled vault. This operation
   * requires the secrets/purge permission.
   * @summary Permanently deletes the specified secret.
   * @param secretName The name of the secret.
   * @param [options] The optional parameters
   * @returns Promise<void>
   */
  public async purgeDeletedSecret(secretName: string, options?: RequestOptionsBase): Promise<void> {
    await this.client.purgeDeletedSecret(this.vaultBaseUrl, secretName, options);
  }

  /**
   * Recovers the deleted secret in the specified vault. This operation can only be performed on a
   * soft-delete enabled vault. This operation requires the secrets/recover permission.
   * @summary Recovers the deleted secret to the latest version.
   * @param secretName The name of the deleted secret.
   * @param [options] The optional parameters
   * @returns Promise<Secret>
   */
  public async recoverDeletedSecret(
    secretName: string,
    options?: RequestOptionsBase
  ): Promise<Secret> {
    const response = await this.client.recoverDeletedSecret(this.vaultBaseUrl, secretName, options);
    return this.getSecretFromSecretBundle(response);
  }

  /**
   * Requests that a backup of the specified secret be downloaded to the client. All versions of the
   * secret will be downloaded. This operation requires the secrets/backup permission.
   * @summary Backs up the specified secret.
   * @param secretName The name of the secret.
   * @param [options] The optional parameters
   * @returns Promise<Uint8Array | undefined>
   */
  public async backupSecret(
    secretName: string,
    options?: RequestOptionsBase
  ): Promise<Uint8Array | undefined> {
    const response = await this.client.backupSecret(this.vaultBaseUrl, secretName, options);
    return response.value;
  }

  /**
   * Restores a backed up secret, and all its versions, to a vault. This operation requires the
   * secrets/restore permission.
   * @summary Restores a backed up secret to a vault.
   * @param secretBundleBackup The backup blob associated with a secret bundle.
   * @param [options] The optional parameters
   * @returns Promise<Secret>
   */
  public async restoreSecret(
    secretBundleBackup: Uint8Array,
    options?: RequestOptionsBase
  ): Promise<Secret> {
    const response = await this.client.restoreSecret(
      this.vaultBaseUrl,
      secretBundleBackup,
      options
    );
    return this.getSecretFromSecretBundle(response);
  }

  public getSecretVersions(
    secretName: string,
    options?: RequestOptionsBase
  ): AsyncIterableIterator<Secret> {
    const keyVaultClient = this.client;
    const keyVaultUrl = this.vaultBaseUrl;
    const extractSecretFromSecretItem = this.getSecretFromSecretBundle;

    async function* asyncGenerator() {
      let currentSetResponse = await keyVaultClient.getSecretVersions(
        keyVaultUrl,
        secretName,
        options
      );
      let currentSetLength = currentSetResponse.length;
      let i = 0;
      while (i < currentSetLength) {
        yield extractSecretFromSecretItem(currentSetResponse[i]);
        i++;
        if (i === currentSetLength && currentSetResponse.nextLink) {
          currentSetResponse = await keyVaultClient.getSecretVersionsNext(currentSetResponse.nextLink, options);
          i = 0;
          currentSetLength = currentSetResponse.length;
        }
      }
    }

    return asyncGenerator();
  }

  private getSecretFromSecretBundle(secretBundle: Models.SecretBundle): Secret {
    const parsedId = parseKeyvaultEntityIdentifier("secrets", secretBundle.id);
    return {
      value: secretBundle.value,
      id: secretBundle.id,
      contentType: secretBundle.contentType,
      attributes: secretBundle.attributes,
      tags: secretBundle.tags,
      keyId: secretBundle.kid,
      managed: secretBundle.managed,
      ...parsedId
    };
  }
}
