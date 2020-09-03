// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  createPipelineFromOptions,
  isTokenCredential,
  operationOptionsToRequestOptionsBase,
  signingPolicy,
  TokenCredential
} from "@azure/core-http";
import { PollerLike, PollOperationState } from "@azure/core-lro";

import { challengeBasedAuthenticationPolicy } from "../../keyvault-common";
import { KeyVaultClient } from "./generated/keyVaultClient";
import { BackupClientOptions, BeginBackupOptions, BeginRestoreOptions } from "./backupClientModels";
import { LATEST_API_VERSION, SDK_VERSION } from "./constants";
import { logger } from "./log";
import { BackupPoller } from "./lro/backup/poller";
import { RestorePoller } from "./lro/restore/poller";
import { SelectiveRestorePoller } from "./lro/selectiveRestore/poller";

/**
 * The KeyVaultBackupClient provides methods to generate backups
 * and restore backups of any given Azure Key Vault instance.
 */
export class KeyVaultBackupClient {
  /**
   * The base URL to the vault
   */
  public readonly vaultUrl: string;

  /**
   * @internal
   * @ignore
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
   * let vaultUrl = `https://<MY KEYVAULT HERE>.vault.azure.net`;
   * let credentials = new DefaultAzureCredential();
   *
   * let client = new KeyVaultBackupClient(vaultUrl, credentials);
   * ```
   * @param {string} vaultUrl the URL of the Key Vault. It should have this shape: https://${your-key-vault-name}.vault.azure.net
   * @param {TokenCredential} credential An object that implements the `TokenCredential` interface used to authenticate requests to the service. Use the @azure/identity package to create a credential that suits your needs.
   * @param {BackupClientOptions} [pipelineOptions] Pipeline options used to configure Key Vault API requests. Omit this parameter to use the default pipeline configuration.
   * @memberof KeyVaultBackupClient
   */
  constructor(
    vaultUrl: string,
    credential: TokenCredential,
    pipelineOptions: BackupClientOptions = {}
  ) {
    this.vaultUrl = vaultUrl;

    const libInfo = `azsdk-js-keyvault-admin/${SDK_VERSION}`;

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
    this.client = new KeyVaultClient({
      apiVersion: pipelineOptions.serviceVersion || LATEST_API_VERSION,
      ...pipeline
    });
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
   * const blobStorageUri = "<blob-storage-uri>";
   * const sasToken = "<sas-token>";
   * const poller = await client.beginBackup(blobStorageUri, sasToken);
   *
   * // Serializing the poller
   * const serialized = poller.toString();
   * // A new poller can be created with:
   * // await client.beginBackup(blobStorageUri, sasToken, { resumeFrom: serialized });
   *
   * // Waiting until it's done
   * const backupUri = await poller.pollUntilDone();
   * console.log(backupUri);
   * ```
   * @summary Creates a new role assignment.
   * @param {string} blobStorageUri The URI of the blob storage account.
   * @param {string} sasToken The SAS token.
   * @param {CreateRoleAssignmentOptions} [options] The optional parameters.
   */
  public async beginBackup(
    blobStorageUri: string,
    sasToken: string,
    options: BeginBackupOptions = {}
  ): Promise<PollerLike<PollOperationState<string>, string>> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);

    if (!(blobStorageUri && sasToken)) {
      throw new Error(
        "beginBackup requires non-empty strings for the parameters: blobStorageUri and sasToken."
      );
    }

    const poller = new BackupPoller({
      blobStorageUri,
      sasToken,
      client: this.client,
      vaultUrl: this.vaultUrl,
      intervalInMs: options.intervalInMs,
      resumeFrom: options.resumeFrom,
      requestOptions
    });

    // This will initialize the poller's operation (the generation of the backup).
    await poller.poll();

    return poller;
  }

  /**
   * Starts restoring all key materials using the SAS token pointing to a previously stored Azure Blob storage
   * backup folder.
   *
   * This function returns a Long Running Operation poller that allows you to wait indefinitely until the Key Vault backup is generated.
   *
   * Example usage:
   * ```ts
   * const client = new KeyVaultBackupClient(url, credentials);
   *
   * const blobStorageUri = "<blob-storage-uri>";
   * const sasToken = "<sas-token>";
   * const folderName = "<folder-name>";
   * const poller = await client.beginRestore(blobStorageUri, sasToken, folderName);
   *
   * // Serializing the poller
   * const serialized = poller.toString();
   * // A new poller can be created with:
   * // await client.beginRestore(blobStorageUri, sasToken, folderName, { resumeFrom: serialized });
   *
   * // Waiting until it's done
   * const backupUri = await poller.pollUntilDone();
   * console.log(backupUri);
   * ```
   * @summary Creates a new role assignment.
   * @param {string} blobStorageUri The URI of the blob storage account.
   * @param {string} sasToken The SAS token.
   * @param {string} folderName The Folder name of the blob where the previous successful full backup was stored.
   * @param {CreateRoleAssignmentOptions} [options] The optional parameters.
   */
  public async beginRestore(
    blobStorageUri: string,
    sasToken: string,
    folderName: string,
    options: BeginRestoreOptions = {}
  ): Promise<PollerLike<PollOperationState<undefined>, undefined>> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);

    if (!(blobStorageUri && sasToken && folderName)) {
      throw new Error(
        "beginRestore requires non-empty strings for the parameters: blobStorageUri, sasToken and folderName."
      );
    }

    const poller = new RestorePoller({
      blobStorageUri,
      sasToken,
      folderName,
      client: this.client,
      vaultUrl: this.vaultUrl,
      intervalInMs: options.intervalInMs,
      resumeFrom: options.resumeFrom,
      requestOptions
    });

    // This will initialize the poller's operation (the generation of the backup).
    await poller.poll();

    return poller;
  }

  /**
   * Starts restoring all key versions of a given key using user supplied SAS token pointing to a previously
   * stored Azure Blob storage backup folder.
   *
   * This function returns a Long Running Operation poller that allows you to wait indefinitely until the Key Vault backup is generated.
   *
   * Example usage:
   * ```ts
   * const client = new KeyVaultBackupClient(url, credentials);
   *
   * const keyName = "<key-name>";
   * const blobStorageUri = "<blob-storage-uri>";
   * const sasToken = "<sas-token>";
   * const poller = await client.beginSelectiveRestore(keyName, blobStorageUri, sasToken);
   *
   * // Serializing the poller
   * const serialized = poller.toString();
   * // A new poller can be created with:
   * // await client.beginBackup(keyName, blobStorageUri, sasToken, { resumeFrom: serialized });
   *
   * // Waiting until it's done
   * const backupUri = await poller.pollUntilDone();
   * console.log(backupUri);
   * ```
   * @summary Creates a new role assignment.
   * @param {string} keyName The name of the key that wants to be restored.
   * @param {string} blobStorageUri The URI of the blob storage account.
   * @param {string} sasToken The SAS token.
   * @param {string} folderName The Folder name of the blob where the previous successful full backup was stored.
   * @param {CreateRoleAssignmentOptions} [options] The optional parameters.
   */
  public async beginSelectiveRestore(
    keyName: string,
    blobStorageUri: string,
    sasToken: string,
    folderName: string,
    options: BeginBackupOptions = {}
  ): Promise<PollerLike<PollOperationState<undefined>, undefined>> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);

    if (!(keyName && blobStorageUri && sasToken && folderName)) {
      throw new Error(
        "beginSelectiveRestore requires non-empty strings for the parameters: keyName, blobStorageUri, sasToken and folderName."
      );
    }

    const poller = new SelectiveRestorePoller({
      keyName,
      blobStorageUri,
      sasToken,
      folderName,
      client: this.client,
      vaultUrl: this.vaultUrl,
      intervalInMs: options.intervalInMs,
      resumeFrom: options.resumeFrom,
      requestOptions
    });

    // This will initialize the poller's operation (the generation of the backup).
    await poller.poll();

    return poller;
  }
}
