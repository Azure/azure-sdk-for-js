// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  KeyVaultBackupClientOptions,
  KeyVaultBackupResult,
  KeyVaultBeginBackupOptions,
  KeyVaultBeginRestoreOptions,
  KeyVaultBeginSelectiveKeyRestoreOptions,
  KeyVaultRestoreResult,
  KeyVaultSelectiveKeyRestoreResult,
} from "./backupClientModels.js";
import type { KeyVaultClient } from "./generated/keyVaultClient.js";
import type { TokenCredential } from "@azure/core-auth";
import { mappings } from "./mappings.js";
import { createKeyVaultClient } from "./createKeyVaultClient.js";
import type { PollerLike } from "./lro/shim.js";
import { wrapPoller } from "./lro/shim.js";
import {
  KeyVaultAdminPollOperationState,
  KeyVaultBackupOperationState,
  KeyVaultRestoreOperationState,
  KeyVaultSelectiveKeyRestoreOperationState,
} from "./lro/models.js";
import { restorePoller } from "./generated/restorePollerHelpers.js";

export {
  KeyVaultBackupOperationState,
  KeyVaultRestoreOperationState,
  KeyVaultSelectiveKeyRestoreOperationState,
  KeyVaultAdminPollOperationState,
};

/**
 * The KeyVaultBackupClient provides methods to generate backups
 * and restore backups of any given Azure Key Vault instance.
 * This client supports generating full backups, selective restores of specific keys
 * and full restores of Key Vault instances.
 */
export class KeyVaultBackupClient {
  /**
   * The base URL to the vault
   */
  public readonly vaultUrl: string;

  /**
   * A reference to the auto-generated Key Vault HTTP client.
   */
  private readonly client: KeyVaultClient;

  /**
   * Creates an instance of the KeyVaultBackupClient.
   *
   * Example usage:
   * ```ts
   * import { KeyVaultBackupClient } from "@azure/keyvault-admin";
   * import { DefaultAzureCredential } from "@azure/identity";
   *
   * let vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
   * let credentials = new DefaultAzureCredential();
   *
   * let client = new KeyVaultBackupClient(vaultUrl, credentials);
   * ```
   * @param vaultUrl - the URL of the Key Vault. It should have this shape: `https://${your-key-vault-name}.vault.azure.net`. You should validate that this URL references a valid Key Vault or Managed HSM resource. See https://aka.ms/azsdk/blog/vault-uri for details.
   * @param credential - An object that implements the `TokenCredential` interface used to authenticate requests to the service. Use the \@azure/identity package to create a credential that suits your needs.
   * @param options - options used to configure Key Vault API requests.
   */
  constructor(
    vaultUrl: string,
    credential: TokenCredential,
    options: KeyVaultBackupClientOptions = {},
  ) {
    this.vaultUrl = vaultUrl;

    this.client = createKeyVaultClient(vaultUrl, credential, options);
  }

  /**
   * Starts generating a backup of an Azure Key Vault on the specified Storage Blob account.
   *
   * This function returns a Long Running Operation poller that allows you to wait indefinitely until the Key Vault backup is generated.
   *
   * Example usage:
   * ```ts
   * const client = new KeyVaultBackupClient(url, credentials);
   *
   * const blobStorageUri = "<blob-storage-uri>"; // <Blob storage URL>/<folder name>
   * const sasToken = "<sas-token>";
   * const poller = await client.beginBackup(blobStorageUri, sasToken);
   *
   * // Serializing the poller
   * //
   * //   const serialized = poller.toString();
   * //
   * // A new poller can be created with:
   * //
   * //   await client.beginBackup(blobStorageUri, sasToken, { resumeFrom: serialized });
   * //
   *
   * // Waiting until it's done
   * const backupUri = await poller.pollUntilDone();
   * console.log(backupUri);
   * ```
   * Starts a full backup operation.
   * @param blobStorageUri - The URL of the blob storage resource, including the path to the container where the backup will end up being stored.
   * @param sasToken - The SAS token used to access the blob storage resource.
   * @param options - The optional parameters.
   */
  public async beginBackup(
    blobStorageUri: string,
    sasToken: string,
    options?: KeyVaultBeginBackupOptions,
  ): Promise<PollerLike<KeyVaultBackupOperationState, KeyVaultBackupResult>>;

  /**
   * Starts generating a backup of an Azure Key Vault on the specified Storage Blob account, using a user-assigned Managed Identity
   * to access the Storage account.
   *
   * This function returns a Long Running Operation poller that allows you to wait indefinitely until the Key Vault backup is generated.
   *
   * Example usage:
   * ```ts
   * const client = new KeyVaultBackupClient(url, credentials);
   *
   * const blobStorageUri = "<blob-storage-uri>"; // <Blob storage URL>/<folder name>
   * const sasToken = "<sas-token>";
   * const poller = await client.beginBackup(blobStorageUri);
   *
   * // Serializing the poller
   * //
   * //   const serialized = poller.toString();
   * //
   * // A new poller can be created with:
   * //
   * //   await client.beginBackup(blobStorageUri, { resumeFrom: serialized });
   * //
   *
   * // Waiting until it's done
   * const backupUri = await poller.pollUntilDone();
   * console.log(backupUri);
   * ```
   * Starts a full backup operation.
   * @param blobStorageUri - The URL of the blob storage resource, including the path to the container where the backup will end up being stored.
   * @param options - The optional parameters.
   */
  public async beginBackup(
    blobStorageUri: string,
    options?: KeyVaultBeginBackupOptions,
  ): Promise<PollerLike<KeyVaultBackupOperationState, KeyVaultBackupResult>>;

  public async beginBackup(
    blobStorageUri: string,
    sasTokenOrOptions: string | KeyVaultBeginBackupOptions = {},
    optionsWhenSasTokenSpecified: KeyVaultBeginBackupOptions = {},
  ): Promise<PollerLike<KeyVaultBackupOperationState, KeyVaultBackupResult>> {
    const sasToken = typeof sasTokenOrOptions === "string" ? sasTokenOrOptions : undefined;
    const options =
      typeof sasTokenOrOptions === "string" ? optionsWhenSasTokenSpecified : sasTokenOrOptions;

    if (options.resumeFrom) {
      return wrapPoller(
        restorePoller(this.client, options.resumeFrom, this.client.fullBackup, options),
      );
    }

    return wrapPoller(
      this.client.fullBackup({
        abortSignal: options.abortSignal,
        requestOptions: options.requestOptions,
        azureStorageBlobContainerUri: {
          storageResourceUri: blobStorageUri,
          token: sasToken,
          useManagedIdentity: sasToken === undefined,
        },
        onResponse: options.onResponse,
        tracingOptions: options.tracingOptions,
        updateIntervalInMs: options.intervalInMs,
      }),
    );
  }

  /**
   * Starts restoring all key materials using the SAS token pointing to a previously stored Azure Blob storage
   * backup folder.
   *
   * This function returns a Long Running Operation poller that allows you to wait indefinitely until the Key Vault restore operation is complete.
   *
   * Example usage:
   * ```ts
   * const client = new KeyVaultBackupClient(url, credentials);
   *
   * const blobStorageUri = "<blob-storage-uri>"; // <Blob storage URL>/<folder name>
   * const sasToken = "<sas-token>";
   * const poller = await client.beginRestore(blobStorageUri, sasToken);
   *
   * // The poller can be serialized with:
   * //
   * //   const serialized = poller.toString();
   * //
   * // A new poller can be created with:
   * //
   * //   await client.beginRestore(blobStorageUri, sasToken, { resumeFrom: serialized });
   * //
   *
   * // Waiting until it's done
   * const backupUri = await poller.pollUntilDone();
   * console.log(backupUri);
   * ```
   * Starts a full restore operation.
   * @param folderUri - The URL of the blob storage resource where the previous successful full backup was stored.
   * @param sasToken - The SAS token. If no SAS token is provided, user-assigned Managed Identity will be used to access the blob storage resource.
   * @param options - The optional parameters.
   */
  public async beginRestore(
    folderUri: string,
    sasToken: string,
    options?: KeyVaultBeginRestoreOptions,
  ): Promise<PollerLike<KeyVaultRestoreOperationState, KeyVaultRestoreResult>>;

  /**
   * Starts restoring all key materials using the SAS token pointing to a previously stored Azure Blob storage
   * backup folder, using a user-assigned Managed Identity to access the storage account.
   *
   * This function returns a Long Running Operation poller that allows you to wait indefinitely until the Key Vault restore operation is complete.
   *
   * Example usage:
   * ```ts
   * const client = new KeyVaultBackupClient(url, credentials);
   *
   * const blobStorageUri = "<blob-storage-uri>"; // <Blob storage URL>/<folder name>
   * const sasToken = "<sas-token>";
   * const poller = await client.beginRestore(blobStorageUri);
   *
   * // The poller can be serialized with:
   * //
   * //   const serialized = poller.toString();
   * //
   * // A new poller can be created with:
   * //
   * //   await client.beginRestore(blobStorageUri, { resumeFrom: serialized });
   * //
   *
   * // Waiting until it's done
   * const backupUri = await poller.pollUntilDone();
   * console.log(backupUri);
   * ```
   * Starts a full restore operation.
   * @param folderUri - The URL of the blob storage resource where the previous successful full backup was stored.
   * @param sasToken - The SAS token. If no SAS token is provided, user-assigned Managed Identity will be used to access the blob storage resource.
   * @param options - The optional parameters.
   */
  public async beginRestore(
    folderUri: string,
    options?: KeyVaultBeginRestoreOptions,
  ): Promise<PollerLike<KeyVaultRestoreOperationState, KeyVaultRestoreResult>>;

  public async beginRestore(
    folderUri: string,
    sasTokenOrOptions: string | KeyVaultBeginRestoreOptions = {},
    optionsWhenSasTokenSpecified: KeyVaultBeginRestoreOptions = {},
  ): Promise<PollerLike<KeyVaultRestoreOperationState, KeyVaultRestoreResult>> {
    const sasToken = typeof sasTokenOrOptions === "string" ? sasTokenOrOptions : undefined;
    const options =
      typeof sasTokenOrOptions === "string" ? optionsWhenSasTokenSpecified : sasTokenOrOptions;

    const folderUriParts = mappings.folderUriParts(folderUri);

    if (options.resumeFrom) {
      return wrapPoller(
        restorePoller(this.client, options.resumeFrom, this.client.fullRestoreOperation, options),
      );
    }

    return wrapPoller(
      this.client.fullRestoreOperation({
        abortSignal: options.abortSignal,
        requestOptions: options.requestOptions,
        restoreBlobDetails: {
          folderToRestore: folderUriParts.folderName,
          sasTokenParameters: {
            storageResourceUri: folderUriParts.folderUri,
            token: sasToken,
            useManagedIdentity: sasToken === undefined,
          },
        },
        onResponse: options.onResponse,
        tracingOptions: options.tracingOptions,
        updateIntervalInMs: options.intervalInMs,
      }),
    );
  }

  /**
   * Starts restoring all key versions of a given key using user supplied SAS token pointing to a previously
   * stored Azure Blob storage backup folder.
   *
   * This function returns a Long Running Operation poller that allows you to wait indefinitely until the Key Vault selective restore is complete.
   *
   * Example usage:
   * ```ts
   * const client = new KeyVaultBackupClient(url, credentials);
   *
   * const blobStorageUri = "<blob-storage-uri>";
   * const sasToken = "<sas-token>";
   * const keyName = "<key-name>";
   * const poller = await client.beginSelectiveKeyRestore(keyName, blobStorageUri, sasToken);
   *
   * // Serializing the poller
   * //
   * //   const serialized = poller.toString();
   * //
   * // A new poller can be created with:
   * //
   * //   await client.beginSelectiveKeyRestore(keyName, blobStorageUri, sasToken, { resumeFrom: serialized });
   * //
   *
   * // Waiting until it's done
   * await poller.pollUntilDone();
   * ```
   * Creates a new role assignment.
   * @param keyName - The name of the key that wants to be restored.
   * @param folderUri - The URL of the blob storage resource, with the folder name of the blob where the previous successful full backup was stored.
   * @param sasToken - The SAS token. If no SAS token is provided, user-assigned Managed Identity will be used to access the blob storage resource.
   * @param options - The optional parameters.
   */
  public async beginSelectiveKeyRestore(
    keyName: string,
    folderUri: string,
    sasToken: string,
    options?: KeyVaultBeginSelectiveKeyRestoreOptions,
  ): Promise<
    PollerLike<KeyVaultSelectiveKeyRestoreOperationState, KeyVaultSelectiveKeyRestoreResult>
  >;

  /**
   * Starts restoring all key versions of a given key using to a previously
   * stored Azure Blob storage backup folder. The Blob storage backup folder will be accessed using user-assigned Managed Identity.
   *
   * This function returns a Long Running Operation poller that allows you to wait indefinitely until the Key Vault selective restore is complete.
   *
   * Example usage:
   * ```ts
   * const client = new KeyVaultBackupClient(url, credentials);
   *
   * const blobStorageUri = "<blob-storage-uri>";
   * const sasToken = "<sas-token>";
   * const keyName = "<key-name>";
   * const poller = await client.beginSelectiveKeyRestore(keyName, blobStorageUri, sasToken);
   *
   * // Serializing the poller
   * //
   * //   const serialized = poller.toString();
   * //
   * // A new poller can be created with:
   * //
   * //   await client.beginSelectiveKeyRestore(keyName, blobStorageUri, sasToken, { resumeFrom: serialized });
   * //
   *
   * // Waiting until it's done
   * await poller.pollUntilDone();
   * ```
   * Creates a new role assignment.
   * @param keyName - The name of the key that wants to be restored.
   * @param folderUri - The URL of the blob storage resource, with the folder name of the blob where the previous successful full backup was stored.
   * @param sasToken - The SAS token. If no SAS token is provided, user-assigned Managed Identity will be used to access the blob storage resource.
   * @param options - The optional parameters.
   */
  public async beginSelectiveKeyRestore(
    keyName: string,
    folderUri: string,
    options?: KeyVaultBeginSelectiveKeyRestoreOptions,
  ): Promise<
    PollerLike<KeyVaultSelectiveKeyRestoreOperationState, KeyVaultSelectiveKeyRestoreResult>
  >;

  public async beginSelectiveKeyRestore(
    keyName: string,
    folderUri: string,
    sasTokenOrOptions: string | KeyVaultBeginSelectiveKeyRestoreOptions = {},
    optionsWhenSasTokenSpecified: KeyVaultBeginSelectiveKeyRestoreOptions = {},
  ): Promise<
    PollerLike<KeyVaultSelectiveKeyRestoreOperationState, KeyVaultSelectiveKeyRestoreResult>
  > {
    const sasToken = typeof sasTokenOrOptions === "string" ? sasTokenOrOptions : undefined;
    const options =
      typeof sasTokenOrOptions === "string" ? optionsWhenSasTokenSpecified : sasTokenOrOptions;

    const folderUriParts = mappings.folderUriParts(folderUri);

    if (options.resumeFrom) {
      return wrapPoller(
        restorePoller(
          this.client,
          options.resumeFrom,
          this.client.selectiveKeyRestoreOperation,
          options,
        ),
      );
    }

    return wrapPoller(
      this.client.selectiveKeyRestoreOperation(keyName, {
        abortSignal: options.abortSignal,
        requestOptions: options.requestOptions,
        onResponse: options.onResponse,
        restoreBlobDetails: {
          folder: folderUriParts.folderName,
          sasTokenParameters: {
            storageResourceUri: folderUriParts.folderUri,
            token: sasToken,
            useManagedIdentity: sasToken === undefined,
          },
        },
        tracingOptions: options.tracingOptions,
        updateIntervalInMs: options.intervalInMs,
      }),
    );
  }
}
