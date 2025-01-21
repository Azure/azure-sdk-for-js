// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/// <reference lib="esnext.asynciterable" />

import type { TokenCredential } from "@azure/core-auth";

import { logger } from "./log.js";

import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";
import type { PollOperationState } from "@azure/core-lro";
import { PollerLike } from "@azure/core-lro";
import type { KeyVaultClientOptionalParams } from "./generated/keyVaultClient.js";
import { KeyVaultClient } from "./generated/keyVaultClient.js";
import { keyVaultAuthenticationPolicy } from "@azure/keyvault-common";

import {
  BackupSecretOptions,
  BeginDeleteSecretOptions,
  BeginRecoverDeletedSecretOptions,
  DeletedSecret,
  GetDeletedSecretOptions,
  GetSecretOptions,
  KeyVaultSecret,
  LATEST_API_VERSION,
  ListDeletedSecretsOptions,
  ListPropertiesOfSecretVersionsOptions,
  ListPropertiesOfSecretsOptions,
  PurgeDeletedSecretOptions,
  RestoreSecretBackupOptions,
  SecretClientOptions,
  SecretPollerOptions,
  SecretProperties,
  SetSecretOptions,
  UpdateSecretPropertiesOptions,
} from "./secretsModels.js";
import { KnownDeletionRecoveryLevel, DeletionRecoveryLevel } from "./generated/index.js";
import { KeyVaultSecretIdentifier, parseKeyVaultSecretIdentifier } from "./identifier.js";
import { getSecretFromSecretBundle, mapPagedAsyncIterable } from "./transformations.js";
import { tracingClient } from "./tracing.js";
import { bearerTokenAuthenticationPolicyName } from "@azure/core-rest-pipeline";
import { SDK_VERSION } from "./constants.js";
import { DeleteSecretPoller } from "./lro/delete/poller.js";
import { RecoverDeletedSecretPoller } from "./lro/recover/poller.js";

export {
  SecretClientOptions,
  DeletedSecret,
  DeletionRecoveryLevel,
  KnownDeletionRecoveryLevel,
  GetSecretOptions,
  GetDeletedSecretOptions,
  PurgeDeletedSecretOptions,
  BackupSecretOptions,
  RestoreSecretBackupOptions,
  ListPropertiesOfSecretVersionsOptions,
  ListPropertiesOfSecretsOptions,
  ListDeletedSecretsOptions,
  PagedAsyncIterableIterator,
  PageSettings,
  KeyVaultSecretIdentifier,
  parseKeyVaultSecretIdentifier,
  PollerLike,
  PollOperationState,
  KeyVaultSecret,
  SecretProperties,
  SecretPollerOptions,
  BeginDeleteSecretOptions,
  BeginRecoverDeletedSecretOptions,
  SetSecretOptions,
  UpdateSecretPropertiesOptions,
  logger,
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
   * A reference to the auto-generated KeyVault HTTP client.
   */
  private readonly client: KeyVaultClient;

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
   * @param vaultUrl - The base URL to the vault. You should validate that this URL references a valid Key Vault resource. See https://aka.ms/azsdk/blog/vault-uri for details.
   * @param credential - An object that implements the `TokenCredential` interface used to authenticate requests to the service. Use the \@azure/identity package to create a credential that suits your needs.
   * @param pipelineOptions - Pipeline options used to configure Key Vault API requests.
   *                          Omit this parameter to use the default pipeline configuration.
   */
  constructor(
    vaultUrl: string,
    credential: TokenCredential,
    pipelineOptions: SecretClientOptions = {},
  ) {
    this.vaultUrl = vaultUrl;

    const internalPipelineOptions: KeyVaultClientOptionalParams = {
      ...pipelineOptions,
      userAgentOptions: {
        userAgentPrefix: `${pipelineOptions.userAgentOptions?.userAgentPrefix ?? ""} azsdk-js-keyvault-secrets/${SDK_VERSION}`,
      },
      apiVersion: pipelineOptions.serviceVersion || LATEST_API_VERSION,
      loggingOptions: {
        logger: logger.info,
        additionalAllowedHeaderNames: [
          "x-ms-keyvault-region",
          "x-ms-keyvault-network-info",
          "x-ms-keyvault-service-version",
        ],
      },
    };

    this.client = new KeyVaultClient(this.vaultUrl, credential, internalPipelineOptions);

    // Key vault has its own authentication policy that needs to be added to the pipeline, replacing the default bearerTokenAuthenticationPolicy.
    this.client.pipeline.removePolicy({ name: bearerTokenAuthenticationPolicyName });
    this.client.pipeline.addPolicy(keyVaultAuthenticationPolicy(credential, pipelineOptions), {});
    // Workaround for: https://github.com/Azure/azure-sdk-for-js/issues/31843
    this.client.pipeline.addPolicy({
      name: "ContentTypePolicy",
      sendRequest(request, next) {
        const contentType = request.headers.get("Content-Type") ?? "";
        if (contentType.startsWith("application/json")) {
          request.headers.set("Content-Type", "application/json");
        }
        return next(request);
      },
    });
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
   * Adds a secret in a specified key vault.
   * @param secretName - The name of the secret.
   * @param value - The value of the secret.
   * @param options - The optional parameters.
   */
  public setSecret(
    secretName: string,
    value: string,
    options: SetSecretOptions = {},
  ): Promise<KeyVaultSecret> {
    const { enabled, notBefore, expiresOn: expires, tags, ...remainingOptions } = options;

    return tracingClient.withSpan(
      "SecretClient.setSecret",
      remainingOptions,
      async (updatedOptions) => {
        const response = await this.client.setSecret(
          secretName,
          { value, secretAttributes: { enabled, notBefore, expires }, tags },
          updatedOptions,
        );
        return getSecretFromSecretBundle(response);
      },
    );
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
   * Deletes a secret from a specified key vault.
   * @param secretName - The name of the secret.
   * @param options - The optional parameters.
   */
  public async beginDeleteSecret(
    name: string,
    options: BeginDeleteSecretOptions = {},
  ): Promise<PollerLike<PollOperationState<DeletedSecret>, DeletedSecret>> {
    const poller = new DeleteSecretPoller({
      name,
      client: this.client,
      ...options,
      operationOptions: options,
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
   * Updates the attributes associated with a specified secret in a given key vault.
   * @param secretName - The name of the secret.
   * @param secretVersion - The version of the secret.
   * @param options - The optional parameters.
   */
  public async updateSecretProperties(
    secretName: string,
    secretVersion: string,
    options: UpdateSecretPropertiesOptions = {},
  ): Promise<SecretProperties> {
    const { enabled, notBefore, expiresOn: expires, tags, ...remainingOptions } = options;

    return tracingClient.withSpan(
      "SecretClient.updateSecretProperties",
      remainingOptions,
      async (updatedOptions) => {
        const response = await this.client.updateSecret(
          secretName,
          secretVersion,
          { secretAttributes: { enabled, notBefore, expires }, tags },
          updatedOptions,
        );
        return getSecretFromSecretBundle(response).properties;
      },
    );
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
   * Get a specified secret from a given key vault.
   * @param secretName - The name of the secret.
   * @param options - The optional parameters.
   */
  public getSecret(secretName: string, options: GetSecretOptions = {}): Promise<KeyVaultSecret> {
    return tracingClient.withSpan("SecretClient.getSecret", options, async (updatedOptions) => {
      const response = await this.client.getSecret(
        secretName,
        options && options.version ? options.version : "",
        updatedOptions,
      );
      return getSecretFromSecretBundle(response);
    });
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
   * Gets the specified deleted secret.
   * @param secretName - The name of the secret.
   * @param options - The optional parameters.
   */
  public getDeletedSecret(
    secretName: string,
    options: GetDeletedSecretOptions = {},
  ): Promise<DeletedSecret> {
    return tracingClient.withSpan(
      "SecretClient.getDeletedSecret",
      options,
      async (updatedOptions) => {
        const response = await this.client.getDeletedSecret(secretName, updatedOptions);
        return getSecretFromSecretBundle(response);
      },
    );
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
   * Permanently deletes the specified secret.
   * @param secretName - The name of the secret.
   * @param options - The optional parameters.
   */
  public purgeDeletedSecret(
    secretName: string,
    options: PurgeDeletedSecretOptions = {},
  ): Promise<void> {
    return tracingClient.withSpan(
      "SecretClient.purgeDeletedSecret",
      options,
      async (updatedOptions) => {
        await this.client.purgeDeletedSecret(secretName, updatedOptions);
      },
    );
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
   * Recovers the deleted secret to the latest version.
   * @param secretName - The name of the deleted secret.
   * @param options - The optional parameters.
   */
  public async beginRecoverDeletedSecret(
    name: string,
    options: BeginRecoverDeletedSecretOptions = {},
  ): Promise<PollerLike<PollOperationState<SecretProperties>, SecretProperties>> {
    const poller = new RecoverDeletedSecretPoller({
      name,
      client: this.client,
      ...options,
      operationOptions: options,
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
   * Backs up the specified secret.
   * @param secretName - The name of the secret.
   * @param options - The optional parameters.
   */
  public backupSecret(
    secretName: string,
    options: BackupSecretOptions = {},
  ): Promise<Uint8Array | undefined> {
    return tracingClient.withSpan("SecretClient.backupSecret", options, async (updatedOptions) => {
      const response = await this.client.backupSecret(secretName, updatedOptions);

      return response.value;
    });
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
   * Restores a backed up secret to a vault.
   * @param secretBundleBackup - The backup blob associated with a secret bundle.
   * @param options - The optional parameters.
   */
  public restoreSecretBackup(
    secretBundleBackup: Uint8Array,
    options: RestoreSecretBackupOptions = {},
  ): Promise<SecretProperties> {
    return tracingClient.withSpan(
      "SecretClient.restoreSecretBackup",
      options,
      async (updatedOptions) => {
        const response = await this.client.restoreSecret({ secretBundleBackup }, updatedOptions);
        return getSecretFromSecretBundle(response).properties;
      },
    );
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
   * @param secretName - Name of the secret to fetch versions for.
   * @param options - The optional parameters.
   */
  public listPropertiesOfSecretVersions(
    secretName: string,
    options: ListPropertiesOfSecretVersionsOptions = {},
  ): PagedAsyncIterableIterator<SecretProperties> {
    return mapPagedAsyncIterable(
      (updatedOptions) => this.client.getSecretVersions(secretName, updatedOptions),
      options,
      (item) => getSecretFromSecretBundle(item).properties,
    );
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
   * List all secrets in the vault.
   * @param options - The optional parameters.
   */
  public listPropertiesOfSecrets(
    options: ListPropertiesOfSecretsOptions = {},
  ): PagedAsyncIterableIterator<SecretProperties> {
    return mapPagedAsyncIterable(
      this.client.getSecrets.bind(this.client),
      options,
      (item) => getSecretFromSecretBundle(item).properties,
    );
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
   * List all secrets in the vault.
   * @param options - The optional parameters.
   */
  public listDeletedSecrets(
    options: ListDeletedSecretsOptions = {},
  ): PagedAsyncIterableIterator<DeletedSecret> {
    return mapPagedAsyncIterable(
      this.client.getDeletedSecrets.bind(this.client),
      options,
      getSecretFromSecretBundle,
    );
  }
}
