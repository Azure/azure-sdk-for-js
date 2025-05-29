import type { KeyVaultBackupClientOptions, KeyVaultBackupResult, KeyVaultBeginBackupOptions, KeyVaultBeginPreBackupOptions, KeyVaultBeginPreRestoreOptions, KeyVaultBeginRestoreOptions, KeyVaultBeginSelectiveKeyRestoreOptions, KeyVaultRestoreResult, KeyVaultSelectiveKeyRestoreResult } from "./backupClientModels.js";
import type { TokenCredential } from "@azure/core-auth";
import type { PollerLike } from "./lro/shim.js";
import { KeyVaultAdminPollOperationState, KeyVaultBackupOperationState, KeyVaultRestoreOperationState, KeyVaultSelectiveKeyRestoreOperationState } from "./lro/models.js";
export { KeyVaultBackupOperationState, KeyVaultRestoreOperationState, KeyVaultSelectiveKeyRestoreOperationState, KeyVaultAdminPollOperationState, };
/**
 * The KeyVaultBackupClient provides methods to generate backups
 * and restore backups of any given Azure Key Vault instance.
 * This client supports generating full backups, selective restores of specific keys
 * and full restores of Key Vault instances.
 */
export declare class KeyVaultBackupClient {
    /**
     * The base URL to the vault
     */
    readonly vaultUrl: string;
    /**
     * A reference to the auto-generated Key Vault HTTP client.
     */
    private readonly client;
    /**
     * Creates an instance of the KeyVaultBackupClient.
     *
     * Example usage:
     * ```ts snippet:ReadmeSampleCreateBackupClient
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { KeyVaultBackupClient } from "@azure/keyvault-admin";
     *
     * const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
     * const credentials = new DefaultAzureCredential();
     * const client = new KeyVaultBackupClient(vaultUrl, credentials);
     * ```
     * @param vaultUrl - the URL of the Key Vault. It should have this shape: `https://${your-key-vault-name}.vault.azure.net`. You should validate that this URL references a valid Key Vault or Managed HSM resource. See https://aka.ms/azsdk/blog/vault-uri for details.
     * @param credential - An object that implements the `TokenCredential` interface used to authenticate requests to the service. Use the \@azure/identity package to create a credential that suits your needs.
     * @param options - options used to configure Key Vault API requests.
     */
    constructor(vaultUrl: string, credential: TokenCredential, options?: KeyVaultBackupClientOptions);
    /**
     * Starts a pre-backup operation which can be used to check whether the customer can perform a {@link beginBackup} operation using the provided SAS token.
     *
     * This function returns a Long Running Operation poller that allows you to wait indefinitely until the operation completes.
     *
     * Example usage:
     * ```ts snippet:ReadmeSampleBeginPreBackup_SAS
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { KeyVaultBackupClient } from "@azure/keyvault-admin";
     *
     * const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
     * const credentials = new DefaultAzureCredential();
     * const client = new KeyVaultBackupClient(vaultUrl, credentials);
     *
     * const blobStorageUri = "<blob-storage-uri>"; // <Blob storage URL>/<folder name>
     * const sasToken = "<sas-token>";
     * const poller = await client.beginPreBackup(blobStorageUri, sasToken);
     *
     * // Serializing the poller
     * const serialized = poller.toString();
     *
     * // A new poller can be created with:
     * await client.beginPreBackup(blobStorageUri, sasToken, { resumeFrom: serialized });
     *
     * // Waiting until it's done
     * const result = await poller.pollUntilDone();
     * console.log(result);
     * ```
     * @param blobStorageUri - The URL of the blob storage resource, including the path to the container where the backup will end up being stored.
     * @param sasToken - The SAS token used to access the blob storage resource.
     * @param options - The optional parameters.
     */
    beginPreBackup(blobStorageUri: string, sasToken: string, options?: KeyVaultBeginPreBackupOptions): Promise<PollerLike<KeyVaultBackupOperationState, KeyVaultBackupResult>>;
    /**
     * Starts a pre-backup operation which can be used to check whether the customer can perform a {@link beginBackup} operation using the Managed HSM's configured user-assigned managed identity to authenticate with Azure Storage.
     *
     * This function returns a Long Running Operation poller that allows you to wait indefinitely until the operation completes.
     *
     * Example usage:
     * ```ts snippet:ReadmeSampleBeginPreBackup_NonSAS
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { KeyVaultBackupClient } from "@azure/keyvault-admin";
     *
     * const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
     * const credentials = new DefaultAzureCredential();
     * const client = new KeyVaultBackupClient(vaultUrl, credentials);
     *
     * const blobStorageUri = "<blob-storage-uri>"; // <Blob storage URL>/<folder name>
     * const poller = await client.beginPreBackup(blobStorageUri);
     *
     * // Serializing the poller
     * const serialized = poller.toString();
     *
     * // A new poller can be created with:
     * await client.beginPreBackup(blobStorageUri, { resumeFrom: serialized });
     *
     * // Waiting until it's done
     * const result = await poller.pollUntilDone();
     * console.log(result);
     * ```
     * @param blobStorageUri - The URL of the blob storage resource, including the path to the container where the backup will end up being stored.
     * @param options - The optional parameters.
     */
    beginPreBackup(blobStorageUri: string, options?: KeyVaultBeginPreBackupOptions): Promise<PollerLike<KeyVaultBackupOperationState, KeyVaultBackupResult>>;
    /**
     * Starts a pre-restore operation which can be used to check whether the customer can perform a {@link beginRestore} operation using the provided SAS token.
     *
     * This function returns a Long Running Operation poller that allows you to wait indefinitely until the operation completes.
     *
     * Example usage:
     * ```ts snippet:ReadmeSampleBeginPreRestore_SAS
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { KeyVaultBackupClient } from "@azure/keyvault-admin";
     *
     * const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
     * const credentials = new DefaultAzureCredential();
     * const client = new KeyVaultBackupClient(vaultUrl, credentials);
     *
     * const blobStorageUri = "<blob-storage-uri>"; // <Blob storage URL>/<folder name>
     * const sasToken = "<sas-token>";
     * const poller = await client.beginPreRestore(blobStorageUri, sasToken);
     *
     * // The poller can be serialized with:
     * const serialized = poller.toString();
     *
     * // A new poller can be created with:
     * await client.beginPreRestore(blobStorageUri, sasToken, { resumeFrom: serialized });
     *
     * // Waiting until it's done
     * await poller.pollUntilDone();
     * ```
     * @param folderUri - The URL of the blob storage resource where the previous successful full backup was stored.
     * @param sasToken - The SAS token. If no SAS token is provided, user-assigned Managed Identity will be used to access the blob storage resource.
     * @param options - The optional parameters.
     */
    beginPreRestore(folderUri: string, sasToken: string, options?: KeyVaultBeginPreRestoreOptions): Promise<PollerLike<KeyVaultRestoreOperationState, KeyVaultRestoreResult>>;
    /**
     * Starts a pre-restore operation which can be used to check whether the customer can perform a {@link beginRestore} operation using the provided SAS token.
     *
     * This function returns a Long Running Operation poller that allows you to wait indefinitely until the operation completes.
     *
     * Example usage:
     * ```ts snippet:ReadmeSampleBeginPreRestore_SAS
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { KeyVaultBackupClient } from "@azure/keyvault-admin";
     *
     * const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
     * const credentials = new DefaultAzureCredential();
     * const client = new KeyVaultBackupClient(vaultUrl, credentials);
     *
     * const blobStorageUri = "<blob-storage-uri>"; // <Blob storage URL>/<folder name>
     * const sasToken = "<sas-token>";
     * const poller = await client.beginPreRestore(blobStorageUri, sasToken);
     *
     * // The poller can be serialized with:
     * const serialized = poller.toString();
     *
     * // A new poller can be created with:
     * await client.beginPreRestore(blobStorageUri, sasToken, { resumeFrom: serialized });
     *
     * // Waiting until it's done
     * await poller.pollUntilDone();
     * ```
     * @param folderUri - The URL of the blob storage resource where the previous successful full backup was stored.
     * @param sasToken - The SAS token. If no SAS token is provided, user-assigned Managed Identity will be used to access the blob storage resource.
     * @param options - The optional parameters.
     */
    beginPreRestore(folderUri: string, options?: KeyVaultBeginPreRestoreOptions): Promise<PollerLike<KeyVaultRestoreOperationState, KeyVaultRestoreResult>>;
    /**
     * Starts generating a backup of an Azure Key Vault on the specified Storage Blob account.
     *
     * This function returns a Long Running Operation poller that allows you to wait indefinitely until the Key Vault backup is generated.
     *
     * Example usage:
     * ```ts snippet:ReadmeSampleBeginBackup_SAS
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { KeyVaultBackupClient } from "@azure/keyvault-admin";
     *
     * const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
     * const credentials = new DefaultAzureCredential();
     * const client = new KeyVaultBackupClient(vaultUrl, credentials);
     *
     * const blobStorageUri = "<blob-storage-uri>"; // <Blob storage URL>/<folder name>
     * const sasToken = "<sas-token>";
     * const poller = await client.beginBackup(blobStorageUri, sasToken);
     *
     * // Serializing the poller
     * const serialized = poller.toString();
     *
     * // A new poller can be created with:
     * await client.beginBackup(blobStorageUri, sasToken, { resumeFrom: serialized });
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
    beginBackup(blobStorageUri: string, sasToken: string, options?: KeyVaultBeginBackupOptions): Promise<PollerLike<KeyVaultBackupOperationState, KeyVaultBackupResult>>;
    /**
     * Starts generating a backup of an Azure Key Vault on the specified Storage Blob account, using a user-assigned Managed Identity
     * to access the Storage account.
     *
     * This function returns a Long Running Operation poller that allows you to wait indefinitely until the Key Vault backup is generated.
     *
     * Example usage:
     * ```ts snippet:ReadmeSampleBeginBackup_NonSAS
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { KeyVaultBackupClient } from "@azure/keyvault-admin";
     *
     * const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
     * const credentials = new DefaultAzureCredential();
     * const client = new KeyVaultBackupClient(vaultUrl, credentials);
     *
     * const blobStorageUri = "<blob-storage-uri>"; // <Blob storage URL>/<folder name>
     * const poller = await client.beginBackup(blobStorageUri);
     *
     * // Serializing the poller
     * const serialized = poller.toString();
     *
     * // A new poller can be created with:
     * await client.beginBackup(blobStorageUri, { resumeFrom: serialized });
     *
     * // Waiting until it's done
     * const backupUri = await poller.pollUntilDone();
     * console.log(backupUri);
     * ```
     * Starts a full backup operation.
     * @param blobStorageUri - The URL of the blob storage resource, including the path to the container where the backup will end up being stored.
     * @param options - The optional parameters.
     */
    beginBackup(blobStorageUri: string, options?: KeyVaultBeginBackupOptions): Promise<PollerLike<KeyVaultBackupOperationState, KeyVaultBackupResult>>;
    /**
     * Starts restoring all key materials using the SAS token pointing to a previously stored Azure Blob storage
     * backup folder.
     *
     * This function returns a Long Running Operation poller that allows you to wait indefinitely until the Key Vault restore operation is complete.
     *
     * Example usage:
     * ```ts snippet:ReadmeSampleBeginRestore_SAS
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { KeyVaultBackupClient } from "@azure/keyvault-admin";
     *
     * const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
     * const credentials = new DefaultAzureCredential();
     * const client = new KeyVaultBackupClient(vaultUrl, credentials);
     *
     * const blobStorageUri = "<blob-storage-uri>"; // <Blob storage URL>/<folder name>
     * const sasToken = "<sas-token>";
     * const poller = await client.beginRestore(blobStorageUri, sasToken);
     *
     * // The poller can be serialized with:
     * const serialized = poller.toString();
     *
     * // A new poller can be created with:
     * await client.beginRestore(blobStorageUri, sasToken, { resumeFrom: serialized });
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
    beginRestore(folderUri: string, sasToken: string, options?: KeyVaultBeginRestoreOptions): Promise<PollerLike<KeyVaultRestoreOperationState, KeyVaultRestoreResult>>;
    /**
     * Starts restoring all key materials using the SAS token pointing to a previously stored Azure Blob storage
     * backup folder, using a user-assigned Managed Identity to access the storage account.
     *
     * This function returns a Long Running Operation poller that allows you to wait indefinitely until the Key Vault restore operation is complete.
     *
     * Example usage:
     * ```ts snippet:ReadmeSampleBeginRestore_NonSAS
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { KeyVaultBackupClient } from "@azure/keyvault-admin";
     *
     * const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
     * const credentials = new DefaultAzureCredential();
     * const client = new KeyVaultBackupClient(vaultUrl, credentials);
     *
     * const blobStorageUri = "<blob-storage-uri>"; // <Blob storage URL>/<folder name>
     * const poller = await client.beginRestore(blobStorageUri);
     *
     * // The poller can be serialized with:
     * const serialized = poller.toString();
     *
     * // A new poller can be created with:
     * await client.beginRestore(blobStorageUri, { resumeFrom: serialized });
     *
     * // Waiting until it's done
     * await poller.pollUntilDone();
     * ```
     * Starts a full restore operation.
     * @param folderUri - The URL of the blob storage resource where the previous successful full backup was stored.
     * @param sasToken - The SAS token. If no SAS token is provided, user-assigned Managed Identity will be used to access the blob storage resource.
     * @param options - The optional parameters.
     */
    beginRestore(folderUri: string, options?: KeyVaultBeginRestoreOptions): Promise<PollerLike<KeyVaultRestoreOperationState, KeyVaultRestoreResult>>;
    /**
     * Starts restoring all key versions of a given key using user supplied SAS token pointing to a previously
     * stored Azure Blob storage backup folder.
     *
     * This function returns a Long Running Operation poller that allows you to wait indefinitely until the Key Vault selective restore is complete.
     *
     * Example usage:
     * ```ts snippet:ReadmeSampleBeginSelectiveKeyRestore_SAS
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { KeyVaultBackupClient } from "@azure/keyvault-admin";
     *
     * const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
     * const credentials = new DefaultAzureCredential();
     * const client = new KeyVaultBackupClient(vaultUrl, credentials);
     *
     * const blobStorageUri = "<blob-storage-uri>";
     * const sasToken = "<sas-token>";
     * const keyName = "<key-name>";
     * const poller = await client.beginSelectiveKeyRestore(keyName, blobStorageUri, sasToken);
     *
     * // Serializing the poller
     * const serialized = poller.toString();
     *
     * // A new poller can be created with:
     * await client.beginSelectiveKeyRestore(keyName, blobStorageUri, sasToken, {
     *   resumeFrom: serialized,
     * });
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
    beginSelectiveKeyRestore(keyName: string, folderUri: string, sasToken: string, options?: KeyVaultBeginSelectiveKeyRestoreOptions): Promise<PollerLike<KeyVaultSelectiveKeyRestoreOperationState, KeyVaultSelectiveKeyRestoreResult>>;
    /**
     * Starts restoring all key versions of a given key using to a previously
     * stored Azure Blob storage backup folder. The Blob storage backup folder will be accessed using user-assigned Managed Identity.
     *
     * This function returns a Long Running Operation poller that allows you to wait indefinitely until the Key Vault selective restore is complete.
     *
     * Example usage:
     * ```ts snippet:ReadmeSampleBeginSelectiveKeyRestore_NonSAS
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { KeyVaultBackupClient } from "@azure/keyvault-admin";
     *
     * const vaultUrl = `https://<MY KEY VAULT HERE>.vault.azure.net`;
     * const credentials = new DefaultAzureCredential();
     * const client = new KeyVaultBackupClient(vaultUrl, credentials);
     *
     * const blobStorageUri = "<blob-storage-uri>";
     * const keyName = "<key-name>";
     * const poller = await client.beginSelectiveKeyRestore(keyName, blobStorageUri);
     *
     * // Serializing the poller
     * const serialized = poller.toString();
     *
     * // A new poller can be created with:
     * await client.beginSelectiveKeyRestore(keyName, blobStorageUri, { resumeFrom: serialized });
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
    beginSelectiveKeyRestore(keyName: string, folderUri: string, options?: KeyVaultBeginSelectiveKeyRestoreOptions): Promise<PollerLike<KeyVaultSelectiveKeyRestoreOperationState, KeyVaultSelectiveKeyRestoreResult>>;
}
//# sourceMappingURL=backupClient.d.ts.map