// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  KeyVaultBackupClientOptions,
  KeyVaultBackupResult,
  KeyVaultBeginBackupOptions,
  KeyVaultBeginRestoreOptions,
  KeyVaultBeginSelectiveKeyRestoreOptions,
  KeyVaultRestoreResult,
  KeyVaultSelectiveKeyRestoreResult,
} from "./backupClientModels";
import { KeyVaultAdminPollOperationState } from "./lro/keyVaultAdminPoller";
import { KeyVaultBackupOperationState } from "./lro/backup/operation";
import { KeyVaultBackupPoller } from "./lro/backup/poller";
import { KeyVaultClient } from "./generated/keyVaultClient";
import { KeyVaultRestoreOperationState } from "./lro/restore/operation";
import { KeyVaultRestorePoller } from "./lro/restore/poller";
import { KeyVaultSelectiveKeyRestoreOperationState } from "./lro/selectiveKeyRestore/operation";
import { KeyVaultSelectiveKeyRestorePoller } from "./lro/selectiveKeyRestore/poller";
import { LATEST_API_VERSION } from "./constants";
import { PollerLike } from "@azure/core-lro";
import { TokenCredential } from "@azure/core-auth";
import { bearerTokenAuthenticationPolicy } from "@azure/core-rest-pipeline";
import { createChallengeCallbacks } from "./challengeAuthenticationCallbacks";
import { logger } from "./log";
import { mappings } from "./mappings";

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
   * @param vaultUrl - the URL of the Key Vault. It should have this shape: `https://${your-key-vault-name}.vault.azure.net`
   * @param credential - An object that implements the `TokenCredential` interface used to authenticate requests to the service. Use the \@azure/identity package to create a credential that suits your needs.
   * @param options - options used to configure Key Vault API requests.
   */
  constructor(
    vaultUrl: string,
    credential: TokenCredential,
    options: KeyVaultBackupClientOptions = {}
  ) {
    this.vaultUrl = vaultUrl;

    const apiVersion = options.serviceVersion || LATEST_API_VERSION;

    const clientOptions = {
      ...options,
      loggingOptions: {
        logger: logger.info,
        additionalAllowedHeaderNames: [
          "x-ms-keyvault-region",
          "x-ms-keyvault-network-info",
          "x-ms-keyvault-service-version",
        ],
      },
    };

    this.client = new KeyVaultClient(apiVersion, clientOptions);
    this.client.pipeline.addPolicy(
      bearerTokenAuthenticationPolicy({
        credential,
        // The scopes will be populated in the challenge callbacks based on the WWW-authenticate header
        // returned by the challenge, so pass an empty array as a placeholder.
        scopes: [],
        challengeCallbacks: createChallengeCallbacks(),
      })
    );
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
   * @param sasToken - The SAS token.
   * @param options - The optional parameters.
   */
  public async beginBackup(
    blobStorageUri: string,
    sasToken: string,
    options: KeyVaultBeginBackupOptions = {}
  ): Promise<PollerLike<KeyVaultBackupOperationState, KeyVaultBackupResult>> {
    const poller = new KeyVaultBackupPoller({
      blobStorageUri,
      sasToken,
      client: this.client,
      vaultUrl: this.vaultUrl,
      intervalInMs: options.intervalInMs,
      resumeFrom: options.resumeFrom,
      requestOptions: options,
    });

    // This will initialize the poller's operation (the generation of the backup).
    await poller.poll();

    return poller;
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
   * @param sasToken - The SAS token.
   * @param options - The optional parameters.
   */
  public async beginRestore(
    folderUri: string,
    sasToken: string,
    options: KeyVaultBeginRestoreOptions = {}
  ): Promise<PollerLike<KeyVaultRestoreOperationState, KeyVaultRestoreResult>> {
    const poller = new KeyVaultRestorePoller({
      ...mappings.folderUriParts(folderUri),
      sasToken,
      client: this.client,
      vaultUrl: this.vaultUrl,
      intervalInMs: options.intervalInMs,
      resumeFrom: options.resumeFrom,
      requestOptions: options,
    });

    // This will initialize the poller's operation (the generation of the backup).
    await poller.poll();

    return poller;
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
   * @param sasToken - The SAS token.
   * @param options - The optional parameters.
   */
  public async beginSelectiveKeyRestore(
    keyName: string,
    folderUri: string,
    sasToken: string,
    options: KeyVaultBeginSelectiveKeyRestoreOptions = {}
  ): Promise<
    PollerLike<KeyVaultSelectiveKeyRestoreOperationState, KeyVaultSelectiveKeyRestoreResult>
  > {
    const poller = new KeyVaultSelectiveKeyRestorePoller({
      ...mappings.folderUriParts(folderUri),
      keyName,
      sasToken,
      client: this.client,
      vaultUrl: this.vaultUrl,
      intervalInMs: options.intervalInMs,
      resumeFrom: options.resumeFrom,
      requestOptions: options,
    });

    // This will initialize the poller's operation (the generation of the backup).
    await poller.poll();

    return poller;
  }
}
