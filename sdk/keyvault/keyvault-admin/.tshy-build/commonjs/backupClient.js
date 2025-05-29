"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyVaultBackupClient = void 0;
const mappings_js_1 = require("./mappings.js");
const createKeyVaultClient_js_1 = require("./createKeyVaultClient.js");
const shim_js_1 = require("./lro/shim.js");
const restorePollerHelpers_js_1 = require("./generated/restorePollerHelpers.js");
/**
 * The KeyVaultBackupClient provides methods to generate backups
 * and restore backups of any given Azure Key Vault instance.
 * This client supports generating full backups, selective restores of specific keys
 * and full restores of Key Vault instances.
 */
class KeyVaultBackupClient {
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
    constructor(vaultUrl, credential, options = {}) {
        this.vaultUrl = vaultUrl;
        this.client = (0, createKeyVaultClient_js_1.createKeyVaultClient)(vaultUrl, credential, options);
    }
    async beginPreBackup(blobStorageUri, sasTokenOrOptions = {}, optionsWhenSasTokenSpecified = {}) {
        const sasToken = typeof sasTokenOrOptions === "string" ? sasTokenOrOptions : undefined;
        const options = typeof sasTokenOrOptions === "string" ? optionsWhenSasTokenSpecified : sasTokenOrOptions;
        let poller;
        if (options.resumeFrom) {
            poller = (0, restorePollerHelpers_js_1.restorePoller)(this.client, options.resumeFrom, this.client.preFullBackup, options);
        }
        else {
            poller = this.client.preFullBackup({
                storageResourceUri: blobStorageUri,
                token: sasToken,
                useManagedIdentity: sasToken === undefined,
            }, {
                abortSignal: options.abortSignal,
                requestOptions: options.requestOptions,
                onResponse: options.onResponse,
                tracingOptions: options.tracingOptions,
                updateIntervalInMs: options.intervalInMs,
            });
        }
        poller.onProgress(shim_js_1.updateState);
        return (0, shim_js_1.wrapPoller)(poller);
    }
    /**
     * Starts a pre-restore operation which can be used to check whether the customer can perform a {@link beginRestore} operation using the Managed HSM's configured user-assigned managed identity to authenticate with Azure Storage.
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
    async beginPreRestore(folderUri, sasTokenOrOptions = {}, optionsWhenSasTokenSpecified = {}) {
        const sasToken = typeof sasTokenOrOptions === "string" ? sasTokenOrOptions : undefined;
        const options = typeof sasTokenOrOptions === "string" ? optionsWhenSasTokenSpecified : sasTokenOrOptions;
        const folderUriParts = mappings_js_1.mappings.folderUriParts(folderUri);
        let poller;
        if (options.resumeFrom) {
            poller = (0, restorePollerHelpers_js_1.restorePoller)(this.client, options.resumeFrom, this.client.preFullRestoreOperation, options);
        }
        else {
            poller = this.client.preFullRestoreOperation({
                folderToRestore: folderUriParts.folderName,
                sasTokenParameters: {
                    storageResourceUri: folderUriParts.folderUri,
                    token: sasToken,
                    useManagedIdentity: sasToken === undefined,
                },
            }, {
                abortSignal: options.abortSignal,
                requestOptions: options.requestOptions,
                onResponse: options.onResponse,
                tracingOptions: options.tracingOptions,
                updateIntervalInMs: options.intervalInMs,
            });
        }
        poller.onProgress(shim_js_1.updateState);
        return (0, shim_js_1.wrapPoller)(poller);
    }
    async beginBackup(blobStorageUri, sasTokenOrOptions = {}, optionsWhenSasTokenSpecified = {}) {
        const sasToken = typeof sasTokenOrOptions === "string" ? sasTokenOrOptions : undefined;
        const options = typeof sasTokenOrOptions === "string" ? optionsWhenSasTokenSpecified : sasTokenOrOptions;
        let poller;
        if (options.resumeFrom) {
            poller = (0, restorePollerHelpers_js_1.restorePoller)(this.client, options.resumeFrom, this.client.fullBackup, options);
        }
        else {
            poller = this.client.fullBackup({
                storageResourceUri: blobStorageUri,
                token: sasToken,
                useManagedIdentity: sasToken === undefined,
            }, {
                abortSignal: options.abortSignal,
                requestOptions: options.requestOptions,
                onResponse: options.onResponse,
                tracingOptions: options.tracingOptions,
                updateIntervalInMs: options.intervalInMs,
            });
        }
        poller.onProgress(shim_js_1.updateState);
        return (0, shim_js_1.wrapPoller)(poller);
    }
    async beginRestore(folderUri, sasTokenOrOptions = {}, optionsWhenSasTokenSpecified = {}) {
        const sasToken = typeof sasTokenOrOptions === "string" ? sasTokenOrOptions : undefined;
        const options = typeof sasTokenOrOptions === "string" ? optionsWhenSasTokenSpecified : sasTokenOrOptions;
        const folderUriParts = mappings_js_1.mappings.folderUriParts(folderUri);
        let poller;
        if (options.resumeFrom) {
            poller = (0, restorePollerHelpers_js_1.restorePoller)(this.client, options.resumeFrom, this.client.fullRestoreOperation, options);
        }
        else {
            poller = this.client.fullRestoreOperation({
                folderToRestore: folderUriParts.folderName,
                sasTokenParameters: {
                    storageResourceUri: folderUriParts.folderUri,
                    token: sasToken,
                    useManagedIdentity: sasToken === undefined,
                },
            }, {
                abortSignal: options.abortSignal,
                requestOptions: options.requestOptions,
                onResponse: options.onResponse,
                tracingOptions: options.tracingOptions,
                updateIntervalInMs: options.intervalInMs,
            });
        }
        poller.onProgress(shim_js_1.updateState);
        return (0, shim_js_1.wrapPoller)(poller);
    }
    async beginSelectiveKeyRestore(keyName, folderUri, sasTokenOrOptions = {}, optionsWhenSasTokenSpecified = {}) {
        const sasToken = typeof sasTokenOrOptions === "string" ? sasTokenOrOptions : undefined;
        const options = typeof sasTokenOrOptions === "string" ? optionsWhenSasTokenSpecified : sasTokenOrOptions;
        const folderUriParts = mappings_js_1.mappings.folderUriParts(folderUri);
        let poller;
        if (options.resumeFrom) {
            poller = (0, restorePollerHelpers_js_1.restorePoller)(this.client, options.resumeFrom, this.client.selectiveKeyRestoreOperation, options);
        }
        else {
            poller = this.client.selectiveKeyRestoreOperation(keyName, {
                folder: folderUriParts.folderName,
                sasTokenParameters: {
                    storageResourceUri: folderUriParts.folderUri,
                    token: sasToken,
                    useManagedIdentity: sasToken === undefined,
                },
            }, {
                abortSignal: options.abortSignal,
                requestOptions: options.requestOptions,
                onResponse: options.onResponse,
                tracingOptions: options.tracingOptions,
                updateIntervalInMs: options.intervalInMs,
            });
        }
        poller.onProgress(shim_js_1.updateState);
        return (0, shim_js_1.wrapPoller)(poller);
    }
}
exports.KeyVaultBackupClient = KeyVaultBackupClient;
//# sourceMappingURL=backupClient.js.map