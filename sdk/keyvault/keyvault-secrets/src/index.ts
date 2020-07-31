// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint @typescript-eslint/member-ordering: 0 */
/// <reference lib="esnext.asynciterable" />

import {
  TokenCredential,
  isTokenCredential,
  signingPolicy,
  RequestOptionsBase,
  operationOptionsToRequestOptionsBase,
  PipelineOptions,
  createPipelineFromOptions
} from "@azure/core-http";

import { getTracer } from "@azure/core-tracing";
import { Span } from "@opentelemetry/api";
import { logger } from "./log";

import "@azure/core-paging";
import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";
import { PollerLike, PollOperationState } from "@azure/core-lro";
import {
  SecretBundle,
  DeletedSecretBundle,
  DeletionRecoveryLevel,
  KeyVaultClientGetSecretsOptionalParams,
  SetSecretResponse,
  DeleteSecretResponse,
  UpdateSecretResponse,
  GetSecretResponse,
  GetDeletedSecretResponse,
  BackupSecretResponse,
  RestoreSecretResponse
} from "./generated/models";
import { KeyVaultClient } from "./generated/keyVaultClient";
import { SDK_VERSION } from "./generated/utils/constants";
import { challengeBasedAuthenticationPolicy } from "../../keyvault-common/src";

import { DeleteSecretPoller } from "./lro/delete/poller";
import { RecoverDeletedSecretPoller } from "./lro/recover/poller";

import {
  KeyVaultSecret,
  DeletedSecret,
  DeleteSecretOptions,
  SecretClientInterface,
  SecretPollerOptions,
  BeginDeleteSecretOptions,
  BeginRecoverDeletedSecretOptions,
  SetSecretOptions,
  UpdateSecretPropertiesOptions,
  GetSecretOptions,
  GetDeletedSecretOptions,
  PurgeDeletedSecretOptions,
  BackupSecretOptions,
  RestoreSecretBackupOptions,
  RecoverDeletedSecretOptions,
  ListPropertiesOfSecretVersionsOptions,
  ListPropertiesOfSecretsOptions,
  ListDeletedSecretsOptions,
  SecretProperties,
  SecretClientOptions,
  LATEST_API_VERSION
} from "./secretsModels";
import { parseKeyvaultIdentifier as parseKeyvaultEntityIdentifier } from "./generated/utils";

export {
  SecretClientOptions,
  DeletedSecret,
  DeletionRecoveryLevel,
  GetSecretOptions,
  PipelineOptions,
  GetDeletedSecretOptions,
  PurgeDeletedSecretOptions,
  BackupSecretOptions,
  RestoreSecretBackupOptions,
  ListPropertiesOfSecretVersionsOptions,
  ListPropertiesOfSecretsOptions,
  ListDeletedSecretsOptions,
  PagedAsyncIterableIterator,
  PageSettings,
  PollerLike,
  PollOperationState,
  KeyVaultSecret,
  SecretProperties,
  SecretPollerOptions,
  BeginDeleteSecretOptions,
  BeginRecoverDeletedSecretOptions,
  SetSecretOptions,
  UpdateSecretPropertiesOptions,
  logger
};

/**
 * The SecretClient provides methods to manage {@link KeyVaultSecret} in
 * the Azure Key Vault. The client supports creating, retrieving, updating,
 * deleting, purging, backing up, restoring and listing KeyVaultSecrets. The
 * client also supports listing {@link DeletedSecret} for a soft-delete enabled Azure
 * Key Vault.
 */
export class SecretClient {
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
  private readonly pollerClient: SecretClientInterface = {
    recoverDeletedSecret: this.recoverDeletedSecret.bind(this),
    getSecret: this.getSecret.bind(this),
    deleteSecret: this.deleteSecret.bind(this),
    getDeletedSecret: this.getDeletedSecret.bind(this)
  };

  /**
   * Creates an instance of SecretClient.
   *
   * Example usage:
   * ```ts
   * import { SecretClient } from "@azure/keyvault-secrets";
   * import { DefaultAzureCredential } from "@azure/identity";
   *
   * let vaultUrl = `https://<MY KEYVAULT HERE>.vault.azure.net`;
   * let credentials = new DefaultAzureCredential();
   *
   * let client = new SecretClient(vaultUrl, credentials);
   * ```
   * @param {string} vaultUrl the base URL to the vault.
   * @param {TokenCredential} credential An object that implements the `TokenCredential` interface used to authenticate requests to the service. Use the @azure/identity package to create a credential that suits your needs.
   * @param {PipelineOptions} [pipelineOptions] Optional. Pipeline options used to configure Key Vault API requests.
   *                                                         Omit this parameter to use the default pipeline configuration.
   * @memberof SecretClient
   */
  constructor(
    vaultUrl: string,
    credential: TokenCredential,
    pipelineOptions: SecretClientOptions = {}
  ) {
    this.vaultUrl = vaultUrl;

    const libInfo = `azsdk-js-keyvault-secrets/${SDK_VERSION}`;

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
    this.client = new KeyVaultClient(pipelineOptions.apiVersion || LATEST_API_VERSION, pipeline);
  }

  /**
   * The setSecret method adds a secret or secret version to the Azure Key Vault. If the named secret
   * already exists, Azure Key Vault creates a new version of that secret.
   * This operation requires the secrets/set permission.
   *
   * Example usage:
   * ```ts
   * let client = new SecretClient(url, credentials);
   * await client.setSecret("MySecretName", "ABC123");
   * ```
   * @summary Adds a secret in a specified key vault.
   * @param {string} secretName The name of the secret.
   * @param {string} value The value of the secret.
   * @param {SetSecretOptions} [options] The optional parameters.
   */
  public async setSecret(
    secretName: string,
    value: string,
    options: SetSecretOptions = {}
  ): Promise<KeyVaultSecret> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);

    if (requestOptions) {
      const { enabled, notBefore, expiresOn: expires, ...remainingOptions } = requestOptions;
      const unflattenedOptions = {
        ...remainingOptions,
        secretAttributes: {
          enabled,
          notBefore,
          expires
        }
      };

      const span = this.createSpan("setSecret", unflattenedOptions);

      let response: SetSecretResponse;
      try {
        response = await this.client.setSecret(
          this.vaultUrl,
          secretName,
          value,
          this.setParentSpan(span, unflattenedOptions)
        );
      } finally {
        span.end();
      }

      return this.getSecretFromSecretBundle(response);
    } else {
      const response = await this.client.setSecret(
        this.vaultUrl,
        secretName,
        value,
        requestOptions
      );
      return this.getSecretFromSecretBundle(response);
    }
  }

  /**
   * Deletes a secret stored in Azure Key Vault.
   * This function returns a Long Running Operation poller that allows you to wait indefinitely until the secret is deleted.
   *
   * This operation requires the secrets/delete permission.
   *
   * Example usage:
   * ```ts
   * const client = new SecretClient(url, credentials);
   * await client.setSecret("MySecretName", "ABC123");
   *
   * const deletePoller = await client.beginDeleteSecret("MySecretName");
   *
   * // Serializing the poller
   * const serialized = deletePoller.toString();
   *
   * // A new poller can be created with:
   * // const newPoller = await client.beginDeleteSecret("MySecretName", { resumeFrom: serialized });
   *
   * // Waiting until it's done
   * const deletedSecret = await deletePoller.pollUntilDone();
   * console.log(deletedSecret);
   * ```
   * @summary Deletes a secret from a specified key vault.
   * @param {string} secretName The name of the secret.
   * @param {BeginDeleteSecretOptions} [options] The optional parameters.
   */
  public async beginDeleteSecret(
    name: string,
    options: BeginDeleteSecretOptions = {}
  ): Promise<PollerLike<PollOperationState<DeletedSecret>, DeletedSecret>> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const poller = new DeleteSecretPoller({
      name,
      client: this.pollerClient,
      ...options,
      requestOptions
    });
    // This will initialize the poller's operation (the deletion of the secret).
    await poller.poll();
    return poller;
  }

  /**
   * The updateSecret method changes specified attributes of an existing stored secret. Properties that
   * are not specified in the request are left unchanged. The value of a secret itself cannot be
   * changed. This operation requires the secrets/set permission.
   *
   * Example usage:
   * ```ts
   * let secretName = "MySecretName";
   * let client = new SecretClient(url, credentials);
   * let secret = await client.getSecret(secretName);
   * await client.updateSecretProperties(secretName, secret.properties.version, { enabled: false });
   * ```
   * @summary Updates the attributes associated with a specified secret in a given key vault.
   * @param {string} secretName The name of the secret.
   * @param {string} secretVersion The version of the secret.
   * @param {UpdateSecretPropertiesOptions} [options] The optional parameters.
   */
  public async updateSecretProperties(
    secretName: string,
    secretVersion: string,
    options: UpdateSecretPropertiesOptions = {}
  ): Promise<SecretProperties> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);

    if (requestOptions) {
      const { enabled, notBefore, expiresOn: expires, ...remainingOptions } = requestOptions;
      const unflattenedOptions = {
        ...remainingOptions,
        secretAttributes: {
          enabled,
          notBefore,
          expires
        }
      };

      const span = this.createSpan("updateSecretProperties", unflattenedOptions);

      let response: UpdateSecretResponse;

      try {
        response = await this.client.updateSecret(
          this.vaultUrl,
          secretName,
          secretVersion,
          this.setParentSpan(span, unflattenedOptions)
        );
      } finally {
        span.end();
      }

      return this.getSecretFromSecretBundle(response).properties;
    } else {
      const response = await this.client.updateSecret(
        this.vaultUrl,
        secretName,
        secretVersion,
        requestOptions
      );
      return this.getSecretFromSecretBundle(response).properties;
    }
  }

  /**
   * The getSecret method is applicable to any secret stored in Azure Key Vault. This operation requires
   * the secrets/get permission.
   *
   * Example usage:
   * ```ts
   * let client = new SecretClient(url, credentials);
   * let secret = await client.getSecret("MySecretName");
   * ```
   * @summary Get a specified secret from a given key vault.
   * @param {string} secretName The name of the secret.
   * @param {GetSecretOptions} [options] The optional parameters.
   */
  public async getSecret(
    secretName: string,
    options: GetSecretOptions = {}
  ): Promise<KeyVaultSecret> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("getSecret", requestOptions);

    let response: GetSecretResponse;
    try {
      response = await this.client.getSecret(
        this.vaultUrl,
        secretName,
        options && options.version ? options.version : "",
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return this.getSecretFromSecretBundle(response);
  }

  /**
   * The getDeletedSecret method returns the specified deleted secret along with its attributes.
   * This operation requires the secrets/get permission.
   *
   * Example usage:
   * ```ts
   * let client = new SecretClient(url, credentials);
   * await client.getDeletedSecret("MyDeletedSecret");
   * ```
   * @summary Gets the specified deleted secret.
   * @param {string} secretName The name of the secret.
   * @param {GetDeletedSecretOptions} [options] The optional parameters.
   */
  public async getDeletedSecret(
    secretName: string,
    options: GetDeletedSecretOptions = {}
  ): Promise<DeletedSecret> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("getDeletedSecret", requestOptions);

    let response: GetDeletedSecretResponse;

    try {
      response = await this.client.getDeletedSecret(
        this.vaultUrl,
        secretName,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return this.getSecretFromSecretBundle(response);
  }

  /**
   * The purge deleted secret operation removes the secret permanently, without the possibility of
   * recovery. This operation can only be enabled on a soft-delete enabled vault. This operation
   * requires the secrets/purge permission.
   *
   * Example usage:
   * ```ts
   * const client = new SecretClient(url, credentials);
   * const deletePoller = await client.beginDeleteSecret("MySecretName");
   * await deletePoller.pollUntilDone();
   * await client.purgeDeletedSecret("MySecretName");
   * ```
   * @summary Permanently deletes the specified secret.
   * @param {string} secretName The name of the secret.
   * @param {PurgeDeletedSecretOptions} [options] The optional parameters.
   */
  public async purgeDeletedSecret(
    secretName: string,
    options: PurgeDeletedSecretOptions = {}
  ): Promise<void> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("purgeDeletedSecret", requestOptions);

    try {
      await this.client.purgeDeletedSecret(
        this.vaultUrl,
        secretName,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }
  }

  /**
   * Recovers the deleted secret in the specified vault.
   * This function returns a Long Running Operation poller that allows you to wait indefinitely until the secret is recovered.
   *
   * This operation requires the secrets/recover permission.
   *
   * Example usage:
   * ```ts
   * const client = new SecretClient(url, credentials);
   * await client.setSecret("MySecretName", "ABC123");
   *
   * const deletePoller = await client.beginDeleteSecret("MySecretName");
   * await deletePoller.pollUntilDone();
   *
   * const recoverPoller = await client.beginRecoverDeletedSecret("MySecretName");
   *
   * // Serializing the poller
   * const serialized = recoverPoller.toString();
   *
   * // A new poller can be created with:
   * // const newPoller = await client.beginRecoverDeletedSecret("MySecretName", { resumeFrom: serialized });
   *
   * // Waiting until it's done
   * const deletedSecret = await recoverPoller.pollUntilDone();
   * console.log(deletedSecret);
   * ```
   * @summary Recovers the deleted secret to the latest version.
   * @param {string} secretName The name of the deleted secret.
   * @param {BeginRecoverDeletedSecretOptions} [options] The optional parameters.
   */
  public async beginRecoverDeletedSecret(
    name: string,
    options: BeginRecoverDeletedSecretOptions = {}
  ): Promise<PollerLike<PollOperationState<SecretProperties>, SecretProperties>> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);

    const poller = new RecoverDeletedSecretPoller({
      name,
      client: this.pollerClient,
      ...options,
      requestOptions
    });

    // This will initialize the poller's operation (the recovery of the deleted secret).
    await poller.poll();
    return poller;
  }

  /**
   * Requests that a backup of the specified secret be downloaded to the client. All versions of the
   * secret will be downloaded. This operation requires the secrets/backup permission.
   *
   * Example usage:
   * ```ts
   * let client = new SecretClient(url, credentials);
   * let backupResult = await client.backupSecret("MySecretName");
   * ```
   * @summary Backs up the specified secret.
   * @param {string} secretName The name of the secret.
   * @param {BackupSecretOptions} [options] The optional parameters.
   */
  public async backupSecret(
    secretName: string,
    options: BackupSecretOptions = {}
  ): Promise<Uint8Array | undefined> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("backupSecret", requestOptions);

    let response: BackupSecretResponse;

    try {
      response = await this.client.backupSecret(
        this.vaultUrl,
        secretName,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }
    return response.value;
  }

  /**
   * Restores a backed up secret, and all its versions, to a vault. This operation requires the
   * secrets/restore permission.
   *
   * Example usage:
   * ```ts
   * let client = new SecretClient(url, credentials);
   * let mySecretBundle = await client.backupSecret("MySecretName");
   * // ...
   * await client.restoreSecretBackup(mySecretBundle);
   * ```
   * @summary Restores a backed up secret to a vault.
   * @param {Uint8Array} secretBundleBackup The backup blob associated with a secret bundle.
   * @param {RestoreSecretResponse} [options] The optional parameters.
   */
  public async restoreSecretBackup(
    secretBundleBackup: Uint8Array,
    options: RestoreSecretBackupOptions = {}
  ): Promise<SecretProperties> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("restoreSecretBackup", requestOptions);

    let response: RestoreSecretResponse;

    try {
      response = await this.client.restoreSecret(
        this.vaultUrl,
        secretBundleBackup,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return this.getSecretFromSecretBundle(response).properties;
  }

  /**
   * @internal
   * @ignore
   * Sends a delete request for the given KeyVault Secret's name to the KeyVault service.
   * Since the KeyVault Secret won't be immediately deleted, we have {@link beginDeleteSecret}.
   * @param {string} name The name of the KeyVault Secret.
   * @param {RequestOptionsBase} [options] Optional parameters for the underlying HTTP request.
   */
  private async deleteSecret(
    secretName: string,
    options: DeleteSecretOptions = {}
  ): Promise<DeletedSecret> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("deleteSecret", requestOptions);

    let response: DeleteSecretResponse;
    try {
      response = await this.client.deleteSecret(
        this.vaultUrl,
        secretName,
        this.setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return this.getSecretFromSecretBundle(response);
  }

  /**
   * @internal
   * @ignore
   * Sends a request to recover a deleted KeyVault Secret based on the given name.
   * Since the KeyVault Secret won't be immediately recover the deleted secret, we have {@link beginRecoverDeletedSecret}.
   * @param {string} name The name of the KeyVault Secret.
   * @param {RecoverDeletedKeyOptions} [options] Optional parameters for the underlying HTTP request.
   */
  private async recoverDeletedSecret(
    secretName: string,
    options: RecoverDeletedSecretOptions = {}
  ): Promise<SecretProperties> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("recoverDeletedSecret", requestOptions);

    let properties: SecretProperties;

    try {
      const response = await this.client.recoverDeletedSecret(
        this.vaultUrl,
        secretName,
        this.setParentSpan(span, requestOptions)
      );
      properties = this.getSecretFromSecretBundle(response).properties;
    } finally {
      span.end();
    }

    return properties;
  }

  /**
   * @internal
   * @ignore
   * Deals with the pagination of {@link listPropertiesOfSecretVersions}.
   * @param {string} name The name of the KeyVault Secret.
   * @param {PageSettings} continuationState An object that indicates the position of the paginated request.
   * @param {ListPropertiesOfSecretVersionsOptions} [options] Optional parameters for the underlying HTTP request.
   */
  private async *listPropertiesOfSecretVersionsPage(
    secretName: string,
    continuationState: PageSettings,
    options: ListPropertiesOfSecretVersionsOptions = {}
  ): AsyncIterableIterator<SecretProperties[]> {
    if (continuationState.continuationToken == null) {
      const optionsComplete: KeyVaultClientGetSecretsOptionalParams = {
        maxresults: continuationState.maxPageSize,
        ...options
      };
      const currentSetResponse = await this.client.getSecretVersions(
        this.vaultUrl,
        secretName,
        optionsComplete
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(
          (bundle) => this.getSecretFromSecretBundle(bundle).properties
        );
      }
    }
    while (continuationState.continuationToken) {
      const currentSetResponse = await this.client.getSecretVersions(
        continuationState.continuationToken,
        secretName,
        options
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(
          (bundle) => this.getSecretFromSecretBundle(bundle).properties
        );
      } else {
        break;
      }
    }
  }

  /**
   * @internal
   * @ignore
   * Deals with the iteration of all the available results of {@link listPropertiesOfSecretVersions}.
   * @param {string} name The name of the KeyVault Secret.
   * @param {ListPropertiesOfSecretVersionsOptions} [options] Optional parameters for the underlying HTTP request.
   */
  private async *listPropertiesOfSecretVersionsAll(
    secretName: string,
    options: ListPropertiesOfSecretVersionsOptions = {}
  ): AsyncIterableIterator<SecretProperties> {
    const f = {};

    for await (const page of this.listPropertiesOfSecretVersionsPage(secretName, f, options)) {
      for (const item of page) {
        yield item;
      }
    }
  }

  /**
   * Iterates all versions of the given secret in the vault. The full secret identifier and attributes are provided
   * in the response. No values are returned for the secrets. This operations requires the secrets/list permission.
   *
   * Example usage:
   * ```ts
   * let client = new SecretClient(url, credentials);
   * for await (const secretProperties of client.listPropertiesOfSecretVersions("MySecretName")) {
   *   const secret = await client.getSecret(secretProperties.name);
   *   console.log("secret version: ", secret);
   * }
   * ```
   * @param {string} secretName Name of the secret to fetch versions for.
   * @param {ListPropertiesOfSecretVersionsOptions} [options] The optional parameters.
   */
  public listPropertiesOfSecretVersions(
    secretName: string,
    options: ListPropertiesOfSecretVersionsOptions = {}
  ): PagedAsyncIterableIterator<SecretProperties> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("listPropertiesOfSecretVersions", requestOptions);
    const updatedOptions: ListPropertiesOfSecretVersionsOptions = {
      ...requestOptions,
      ...this.setParentSpan(span, requestOptions)
    };

    const iter = this.listPropertiesOfSecretVersionsAll(secretName, updatedOptions);

    span.end();
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) =>
        this.listPropertiesOfSecretVersionsPage(secretName, settings, updatedOptions)
    };
  }

  /**
   * @internal
   * @ignore
   * Deals with the pagination of {@link listPropertiesOfSecrets}.
   * @param {PageSettings} continuationState An object that indicates the position of the paginated request.
   * @param {ListPropertiesOfSecretsOptions} [options] Optional parameters for the underlying HTTP request.
   */
  private async *listPropertiesOfSecretsPage(
    continuationState: PageSettings,
    options: ListPropertiesOfSecretsOptions = {}
  ): AsyncIterableIterator<SecretProperties[]> {
    if (continuationState.continuationToken == null) {
      const optionsComplete: KeyVaultClientGetSecretsOptionalParams = {
        maxresults: continuationState.maxPageSize,
        ...options
      };
      const currentSetResponse = await this.client.getSecrets(this.vaultUrl, optionsComplete);
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(
          (bundle) => this.getSecretFromSecretBundle(bundle).properties
        );
      }
    }
    while (continuationState.continuationToken) {
      const currentSetResponse = await this.client.getSecrets(
        continuationState.continuationToken,
        options
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(
          (bundle) => this.getSecretFromSecretBundle(bundle).properties
        );
      } else {
        break;
      }
    }
  }

  /**
   * @internal
   * @ignore
   * Deals with the iteration of all the available results of {@link listPropertiesOfSecrets}.
   * @param {ListPropertiesOfSecretsOptions} [options] Optional parameters for the underlying HTTP request.
   */
  private async *listPropertiesOfSecretsAll(
    options: ListPropertiesOfSecretsOptions = {}
  ): AsyncIterableIterator<SecretProperties> {
    const f = {};

    for await (const page of this.listPropertiesOfSecretsPage(f, options)) {
      for (const item of page) {
        yield item;
      }
    }
  }

  /**
   * Iterates the latest version of all secrets in the vault.  The full secret identifier and attributes are provided
   * in the response. No values are returned for the secrets. This operations requires the secrets/list permission.
   *
   * Example usage:
   * ```ts
   * let client = new SecretClient(url, credentials);
   * for await (const secretProperties of client.listPropertiesOfSecrets()) {
   *   const secret = await client.getSecret(secretProperties.name);
   *   console.log("secret: ", secret);
   * }
   * ```
   * @summary List all secrets in the vault.
   * @param {ListPropertiesOfSecretsOptions} [options] The optional parameters.
   */
  public listPropertiesOfSecrets(
    options: ListPropertiesOfSecretsOptions = {}
  ): PagedAsyncIterableIterator<SecretProperties> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("listPropertiesOfSecrets", requestOptions);
    const updatedOptions: ListPropertiesOfSecretsOptions = {
      ...requestOptions,
      ...this.setParentSpan(span, requestOptions)
    };

    const iter = this.listPropertiesOfSecretsAll(updatedOptions);

    span.end();
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) =>
        this.listPropertiesOfSecretsPage(settings, updatedOptions)
    };
  }

  /**
   * @internal
   * @ignore
   * Deals with the pagination of {@link listDeletedSecrets}.
   * @param {PageSettings} continuationState An object that indicates the position of the paginated request.
   * @param {ListDeletedSecretsOptions} [options] Optional parameters for the underlying HTTP request.
   */
  private async *listDeletedSecretsPage(
    continuationState: PageSettings,
    options: ListDeletedSecretsOptions = {}
  ): AsyncIterableIterator<DeletedSecret[]> {
    if (continuationState.continuationToken == null) {
      const optionsComplete: KeyVaultClientGetSecretsOptionalParams = {
        maxresults: continuationState.maxPageSize,
        ...options
      };
      const currentSetResponse = await this.client.getDeletedSecrets(
        this.vaultUrl,
        optionsComplete
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map((bundle) => this.getSecretFromSecretBundle(bundle));
      }
    }
    while (continuationState.continuationToken) {
      const currentSetResponse = await this.client.getDeletedSecrets(
        continuationState.continuationToken,
        options
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map((bundle) => this.getSecretFromSecretBundle(bundle));
      } else {
        break;
      }
    }
  }

  /**
   * @internal
   * @ignore
   * Deals with the iteration of all the available results of {@link listDeletedSecrets}.
   * @param {ListDeletedSecretsOptions} [options] Optional parameters for the underlying HTTP request.
   */
  private async *listDeletedSecretsAll(
    options: ListDeletedSecretsOptions = {}
  ): AsyncIterableIterator<DeletedSecret> {
    const f = {};

    for await (const page of this.listDeletedSecretsPage(f, options)) {
      for (const item of page) {
        yield item;
      }
    }
  }

  /**
   * Iterates the deleted secrets in the vault.  The full secret identifier and attributes are provided
   * in the response. No values are returned for the secrets. This operations requires the secrets/list permission.
   *
   * Example usage:
   * ```ts
   * let client = new SecretClient(url, credentials);
   * for await (const deletedSecret of client.listDeletedSecrets()) {
   *   console.log("deleted secret: ", deletedSecret);
   * }
   * ```
   * @summary List all secrets in the vault.
   * @param {ListDeletedSecretsOptions} [options] The optional parameters.
   */
  public listDeletedSecrets(
    options: ListDeletedSecretsOptions = {}
  ): PagedAsyncIterableIterator<DeletedSecret> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = this.createSpan("listDeletedSecrets", requestOptions);
    const updatedOptions: ListDeletedSecretsOptions = {
      ...requestOptions,
      ...this.setParentSpan(span, requestOptions)
    };

    const iter = this.listDeletedSecretsAll(updatedOptions);

    span.end();
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) => this.listDeletedSecretsPage(settings, updatedOptions)
    };
  }

  /**
   * @internal
   * @ignore
   * Shapes the exposed {@link KeyVaultSecret} based on either a received secret bundle or deleted secret bundle.
   */
  private getSecretFromSecretBundle(bundle: SecretBundle | DeletedSecretBundle): KeyVaultSecret {
    const secretBundle = bundle as SecretBundle;
    const deletedSecretBundle = bundle as DeletedSecretBundle;
    const parsedId = parseKeyvaultEntityIdentifier("secrets", secretBundle.id);

    const attributes = secretBundle.attributes;
    delete secretBundle.attributes;

    const resultObject: KeyVaultSecret & DeletedSecret = {
      value: secretBundle.value,
      name: parsedId.name,
      properties: {
        expiresOn: (attributes as any).expires,
        createdOn: (attributes as any).created,
        updatedOn: (attributes as any).updated,
        ...secretBundle,
        ...parsedId,
        ...attributes
      }
    };

    if (deletedSecretBundle.deletedDate) {
      resultObject.properties.deletedOn = deletedSecretBundle.deletedDate;
      delete (resultObject.properties as any).deletedDate;
    }

    if (attributes) {
      if ((attributes as any).vaultUrl) {
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
    }

    return resultObject;
  }

  /**
   * @internal
   * @ignore
   * Creates a span using the tracer that was set by the user
   * @param {string} methodName The name of the method creating the span.
   * @param {RequestOptionsBase} [options] The options for the underlying HTTP request.
   */
  private createSpan(methodName: string, requestOptions: RequestOptionsBase = {}): Span {
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
