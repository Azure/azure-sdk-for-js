"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/// <reference lib="esnext.asynciterable" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecretClient = exports.logger = exports.parseKeyVaultSecretIdentifier = exports.KnownDeletionRecoveryLevel = void 0;
const tslib_1 = require("tslib");
const log_js_1 = require("./log.js");
Object.defineProperty(exports, "logger", { enumerable: true, get: function () { return log_js_1.logger; } });
const keyVaultClient_js_1 = require("./generated/keyVaultClient.js");
const keyvault_common_1 = require("@azure/keyvault-common");
const secretsModels_js_1 = require("./secretsModels.js");
const index_js_1 = require("./generated/index.js");
Object.defineProperty(exports, "KnownDeletionRecoveryLevel", { enumerable: true, get: function () { return index_js_1.KnownDeletionRecoveryLevel; } });
const identifier_js_1 = require("./identifier.js");
Object.defineProperty(exports, "parseKeyVaultSecretIdentifier", { enumerable: true, get: function () { return identifier_js_1.parseKeyVaultSecretIdentifier; } });
const transformations_js_1 = require("./transformations.js");
const tracing_js_1 = require("./tracing.js");
const core_rest_pipeline_1 = require("@azure/core-rest-pipeline");
const constants_js_1 = require("./constants.js");
const poller_js_1 = require("./lro/delete/poller.js");
const poller_js_2 = require("./lro/recover/poller.js");
/**
 * The SecretClient provides methods to manage {@link KeyVaultSecret} in
 * the Azure Key Vault. The client supports creating, retrieving, updating,
 * deleting, purging, backing up, restoring and listing KeyVaultSecrets. The
 * client also supports listing {@link DeletedSecret} for a soft-delete enabled Azure
 * Key Vault.
 */
class SecretClient {
    /**
     * Creates an instance of SecretClient.
     *
     * Example usage:
     * ```ts snippet:ReadmeSampleCreateClient
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { SecretClient } from "@azure/keyvault-secrets";
     *
     * const credential = new DefaultAzureCredential();
     *
     * // Build the URL to reach your key vault
     * const vaultName = "<YOUR KEYVAULT NAME>";
     * const url = `https://${vaultName}.vault.azure.net`;
     *
     * // Lastly, create our keys client and connect to the service
     * const client = new SecretClient(url, credential);
     * ```
     * @param vaultUrl - The base URL to the vault. You should validate that this URL references a valid Key Vault resource. See https://aka.ms/azsdk/blog/vault-uri for details.
     * @param credential - An object that implements the `TokenCredential` interface used to authenticate requests to the service. Use the \@azure/identity package to create a credential that suits your needs.
     * @param pipelineOptions - Pipeline options used to configure Key Vault API requests.
     *                          Omit this parameter to use the default pipeline configuration.
     */
    constructor(vaultUrl, credential, pipelineOptions = {}) {
        var _a, _b;
        this.vaultUrl = vaultUrl;
        const internalPipelineOptions = Object.assign(Object.assign({}, pipelineOptions), { userAgentOptions: {
                userAgentPrefix: `${(_b = (_a = pipelineOptions.userAgentOptions) === null || _a === void 0 ? void 0 : _a.userAgentPrefix) !== null && _b !== void 0 ? _b : ""} azsdk-js-keyvault-secrets/${constants_js_1.SDK_VERSION}`,
            }, apiVersion: pipelineOptions.serviceVersion || secretsModels_js_1.LATEST_API_VERSION, loggingOptions: {
                logger: log_js_1.logger.info,
                additionalAllowedHeaderNames: [
                    "x-ms-keyvault-region",
                    "x-ms-keyvault-network-info",
                    "x-ms-keyvault-service-version",
                ],
            } });
        this.client = new keyVaultClient_js_1.KeyVaultClient(this.vaultUrl, credential, internalPipelineOptions);
        // Key vault has its own authentication policy that needs to be added to the pipeline, replacing the default bearerTokenAuthenticationPolicy.
        this.client.pipeline.removePolicy({ name: core_rest_pipeline_1.bearerTokenAuthenticationPolicyName });
        this.client.pipeline.addPolicy((0, keyvault_common_1.keyVaultAuthenticationPolicy)(credential, pipelineOptions), {});
        // Workaround for: https://github.com/Azure/azure-sdk-for-js/issues/31843
        this.client.pipeline.addPolicy({
            name: "ContentTypePolicy",
            sendRequest(request, next) {
                var _a;
                const contentType = (_a = request.headers.get("Content-Type")) !== null && _a !== void 0 ? _a : "";
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
     * ```ts snippet:ReadmeSampleCreateSecret
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { SecretClient } from "@azure/keyvault-secrets";
     *
     * const credential = new DefaultAzureCredential();
     *
     * const vaultName = "<YOUR KEYVAULT NAME>";
     * const url = `https://${vaultName}.vault.azure.net`;
     *
     * const client = new SecretClient(url, credential);
     *
     * const secretName = "MySecretName";
     *
     * const result = await client.setSecret(secretName, "MySecretValue");
     * console.log("result: ", result);
     * ```
     * Adds a secret in a specified key vault.
     * @param secretName - The name of the secret.
     * @param value - The value of the secret.
     * @param options - The optional parameters.
     */
    setSecret(secretName, value, options = {}) {
        const { enabled, notBefore, expiresOn: expires, tags } = options, remainingOptions = tslib_1.__rest(options, ["enabled", "notBefore", "expiresOn", "tags"]);
        return tracing_js_1.tracingClient.withSpan("SecretClient.setSecret", remainingOptions, async (updatedOptions) => {
            const response = await this.client.setSecret(secretName, { value, secretAttributes: { enabled, notBefore, expires }, tags }, updatedOptions);
            return (0, transformations_js_1.getSecretFromSecretBundle)(response);
        });
    }
    /**
     * Deletes a secret stored in Azure Key Vault.
     * This function returns a Long Running Operation poller that allows you to wait indefinitely until the secret is deleted.
     *
     * This operation requires the secrets/delete permission.
     *
     * Example usage:
     * ```ts snippet:ReadmeSampleDeleteSecret
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { SecretClient } from "@azure/keyvault-secrets";
     *
     * const credential = new DefaultAzureCredential();
     *
     * const vaultName = "<YOUR KEYVAULT NAME>";
     * const url = `https://${vaultName}.vault.azure.net`;
     *
     * const client = new SecretClient(url, credential);
     *
     * const secretName = "MySecretName";
     *
     * await client.beginDeleteSecret(secretName);
     * ```
     * Deletes a secret from a specified key vault.
     * @param secretName - The name of the secret.
     * @param options - The optional parameters.
     */
    async beginDeleteSecret(name, options = {}) {
        const poller = new poller_js_1.DeleteSecretPoller(Object.assign(Object.assign({ name, client: this.client }, options), { operationOptions: options }));
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
     * ```ts snippet:ReadmeSampleUpdateSecretAttributes
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { SecretClient } from "@azure/keyvault-secrets";
     *
     * const credential = new DefaultAzureCredential();
     *
     * const vaultName = "<YOUR KEYVAULT NAME>";
     * const url = `https://${vaultName}.vault.azure.net`;
     *
     * const client = new SecretClient(url, credential);
     *
     * const secretName = "MySecretName";
     *
     * const result = await client.getSecret(secretName);
     * await client.updateSecretProperties(secretName, result.properties.version, { enabled: false });
     * ```
     * Updates the attributes associated with a specified secret in a given key vault.
     * @param secretName - The name of the secret.
     * @param secretVersion - The version of the secret.
     * @param options - The optional parameters.
     */
    async updateSecretProperties(secretName, secretVersion, options = {}) {
        const { enabled, notBefore, expiresOn: expires, tags } = options, remainingOptions = tslib_1.__rest(options, ["enabled", "notBefore", "expiresOn", "tags"]);
        return tracing_js_1.tracingClient.withSpan("SecretClient.updateSecretProperties", remainingOptions, async (updatedOptions) => {
            const response = await this.client.updateSecret(secretName, secretVersion, { secretAttributes: { enabled, notBefore, expires }, tags }, updatedOptions);
            return (0, transformations_js_1.getSecretFromSecretBundle)(response).properties;
        });
    }
    /**
     * The getSecret method is applicable to any secret stored in Azure Key Vault. This operation requires
     * the secrets/get permission.
     *
     * Example usage:
     * ```ts snippet:ReadmeSampleGetSecret
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { SecretClient } from "@azure/keyvault-secrets";
     *
     * const credential = new DefaultAzureCredential();
     *
     * const vaultName = "<YOUR KEYVAULT NAME>";
     * const url = `https://${vaultName}.vault.azure.net`;
     *
     * const client = new SecretClient(url, credential);
     *
     * const secretName = "MySecretName";
     *
     * const latestSecret = await client.getSecret(secretName);
     * console.log(`Latest version of the secret ${secretName}: `, latestSecret);
     *
     * const specificSecret = await client.getSecret(secretName, {
     *   version: latestSecret.properties.version!,
     * });
     * console.log(
     *   `The secret ${secretName} at the version ${latestSecret.properties.version!}: `,
     *   specificSecret,
     * );
     * ```
     * Get a specified secret from a given key vault.
     * @param secretName - The name of the secret.
     * @param options - The optional parameters.
     */
    getSecret(secretName, options = {}) {
        return tracing_js_1.tracingClient.withSpan("SecretClient.getSecret", options, async (updatedOptions) => {
            const response = await this.client.getSecret(secretName, options && options.version ? options.version : "", updatedOptions);
            return (0, transformations_js_1.getSecretFromSecretBundle)(response);
        });
    }
    /**
     * The getDeletedSecret method returns the specified deleted secret along with its attributes.
     * This operation requires the secrets/get permission.
     *
     * Example usage:
     * ```ts snippet:ReadmeSampleGetDeletedSecret
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { SecretClient } from "@azure/keyvault-secrets";
     *
     * const credential = new DefaultAzureCredential();
     *
     * const vaultName = "<YOUR KEYVAULT NAME>";
     * const url = `https://${vaultName}.vault.azure.net`;
     *
     * const client = new SecretClient(url, credential);
     *
     * const secretName = "MySecretName";
     *
     * const result = await client.getDeletedSecret("MyDeletedSecret");
     * ```
     * Gets the specified deleted secret.
     * @param secretName - The name of the secret.
     * @param options - The optional parameters.
     */
    getDeletedSecret(secretName, options = {}) {
        return tracing_js_1.tracingClient.withSpan("SecretClient.getDeletedSecret", options, async (updatedOptions) => {
            const response = await this.client.getDeletedSecret(secretName, updatedOptions);
            return (0, transformations_js_1.getSecretFromSecretBundle)(response);
        });
    }
    /**
     * The purge deleted secret operation removes the secret permanently, without the possibility of
     * recovery. This operation can only be enabled on a soft-delete enabled vault. This operation
     * requires the secrets/purge permission.
     *
     * Example usage:
     * ```ts snippet:ReadmeSamplePurgeDeletedSecret
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { SecretClient } from "@azure/keyvault-secrets";
     *
     * const credential = new DefaultAzureCredential();
     *
     * const vaultName = "<YOUR KEYVAULT NAME>";
     * const url = `https://${vaultName}.vault.azure.net`;
     *
     * const client = new SecretClient(url, credential);
     *
     * const secretName = "MySecretName";
     *
     * const deletePoller = await client.beginDeleteSecret(secretName);
     * await deletePoller.pollUntilDone();
     *
     * await client.purgeDeletedSecret(secretName);
     * ```
     * Permanently deletes the specified secret.
     * @param secretName - The name of the secret.
     * @param options - The optional parameters.
     */
    purgeDeletedSecret(secretName, options = {}) {
        return tracing_js_1.tracingClient.withSpan("SecretClient.purgeDeletedSecret", options, async (updatedOptions) => {
            await this.client.purgeDeletedSecret(secretName, updatedOptions);
        });
    }
    /**
     * Recovers the deleted secret in the specified vault.
     * This function returns a Long Running Operation poller that allows you to wait indefinitely until the secret is recovered.
     *
     * This operation requires the secrets/recover permission.
     *
     * Example usage:
     * ```ts snippet:ReadmeSampleRecoverDeletedSecret
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { SecretClient } from "@azure/keyvault-secrets";
     *
     * const credential = new DefaultAzureCredential();
     *
     * const vaultName = "<YOUR KEYVAULT NAME>";
     * const url = `https://${vaultName}.vault.azure.net`;
     *
     * const client = new SecretClient(url, credential);
     *
     * const secretName = "MySecretName";
     *
     * const deletePoller = await client.beginDeleteSecret(secretName);
     * await deletePoller.pollUntilDone();
     *
     * const recoverPoller = await client.beginRecoverDeletedSecret(secretName);
     * const deletedSecret = await recoverPoller.pollUntilDone();
     * console.log(deletedSecret);
     * ```
     * Recovers the deleted secret to the latest version.
     * @param secretName - The name of the deleted secret.
     * @param options - The optional parameters.
     */
    async beginRecoverDeletedSecret(name, options = {}) {
        const poller = new poller_js_2.RecoverDeletedSecretPoller(Object.assign(Object.assign({ name, client: this.client }, options), { operationOptions: options }));
        // This will initialize the poller's operation (the recovery of the deleted secret).
        await poller.poll();
        return poller;
    }
    /**
     * Requests that a backup of the specified secret be downloaded to the client. All versions of the
     * secret will be downloaded. This operation requires the secrets/backup permission.
     *
     * Example usage:
     * ```ts snippet:ReadmeSampleBackupSecret
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { SecretClient } from "@azure/keyvault-secrets";
     *
     * const credential = new DefaultAzureCredential();
     *
     * const vaultName = "<YOUR KEYVAULT NAME>";
     * const url = `https://${vaultName}.vault.azure.net`;
     *
     * const client = new SecretClient(url, credential);
     *
     * const secretName = "MySecretName";
     *
     * const backupResult = await client.backupSecret(secretName);
     * ```
     * Backs up the specified secret.
     * @param secretName - The name of the secret.
     * @param options - The optional parameters.
     */
    backupSecret(secretName, options = {}) {
        return tracing_js_1.tracingClient.withSpan("SecretClient.backupSecret", options, async (updatedOptions) => {
            const response = await this.client.backupSecret(secretName, updatedOptions);
            return response.value;
        });
    }
    /**
     * Restores a backed up secret, and all its versions, to a vault. This operation requires the
     * secrets/restore permission.
     *
     * Example usage:
     * ```ts snippet:ReadmeSampleRestoreSecret
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { SecretClient } from "@azure/keyvault-secrets";
     *
     * const credential = new DefaultAzureCredential();
     *
     * const vaultName = "<YOUR KEYVAULT NAME>";
     * const url = `https://${vaultName}.vault.azure.net`;
     *
     * const client = new SecretClient(url, credential);
     *
     * const secretName = "MySecretName";
     *
     * const backupResult = await client.backupSecret(secretName);
     *
     * await client.restoreSecretBackup(backupResult);
     * ```
     * Restores a backed up secret to a vault.
     * @param secretBundleBackup - The backup blob associated with a secret bundle.
     * @param options - The optional parameters.
     */
    restoreSecretBackup(secretBundleBackup, options = {}) {
        return tracing_js_1.tracingClient.withSpan("SecretClient.restoreSecretBackup", options, async (updatedOptions) => {
            const response = await this.client.restoreSecret({ secretBundleBackup }, updatedOptions);
            return (0, transformations_js_1.getSecretFromSecretBundle)(response).properties;
        });
    }
    /**
     * Iterates all versions of the given secret in the vault. The full secret identifier and attributes are provided
     * in the response. No values are returned for the secrets. This operations requires the secrets/list permission.
     *
     * Example usage:
     * ```ts snippet:ReadmeSampleListSecrets
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { SecretClient } from "@azure/keyvault-secrets";
     *
     * const credential = new DefaultAzureCredential();
     *
     * const vaultName = "<YOUR KEYVAULT NAME>";
     * const url = `https://${vaultName}.vault.azure.net`;
     *
     * const client = new SecretClient(url, credential);
     *
     * const secretName = "MySecretName";
     *
     * for await (const secretProperties of client.listPropertiesOfSecrets()) {
     *   console.log("Secret properties: ", secretProperties);
     * }
     *
     * for await (const deletedSecret of client.listDeletedSecrets()) {
     *   console.log("Deleted secret: ", deletedSecret);
     * }
     *
     * for await (const versionProperties of client.listPropertiesOfSecretVersions(secretName)) {
     *   console.log("Version properties: ", versionProperties);
     * }
     * ```
     * @param secretName - Name of the secret to fetch versions for.
     * @param options - The optional parameters.
     */
    listPropertiesOfSecretVersions(secretName, options = {}) {
        return (0, transformations_js_1.mapPagedAsyncIterable)((updatedOptions) => this.client.getSecretVersions(secretName, updatedOptions), options, (item) => (0, transformations_js_1.getSecretFromSecretBundle)(item).properties);
    }
    /**
     * Iterates the latest version of all secrets in the vault.  The full secret identifier and attributes are provided
     * in the response. No values are returned for the secrets. This operations requires the secrets/list permission.
     *
     * Example usage:
     * ```ts snippet:ReadmeSampleListSecrets
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { SecretClient } from "@azure/keyvault-secrets";
     *
     * const credential = new DefaultAzureCredential();
     *
     * const vaultName = "<YOUR KEYVAULT NAME>";
     * const url = `https://${vaultName}.vault.azure.net`;
     *
     * const client = new SecretClient(url, credential);
     *
     * const secretName = "MySecretName";
     *
     * for await (const secretProperties of client.listPropertiesOfSecrets()) {
     *   console.log("Secret properties: ", secretProperties);
     * }
     *
     * for await (const deletedSecret of client.listDeletedSecrets()) {
     *   console.log("Deleted secret: ", deletedSecret);
     * }
     *
     * for await (const versionProperties of client.listPropertiesOfSecretVersions(secretName)) {
     *   console.log("Version properties: ", versionProperties);
     * }
     * ```
     * List all secrets in the vault.
     * @param options - The optional parameters.
     */
    listPropertiesOfSecrets(options = {}) {
        return (0, transformations_js_1.mapPagedAsyncIterable)(this.client.getSecrets.bind(this.client), options, (item) => (0, transformations_js_1.getSecretFromSecretBundle)(item).properties);
    }
    /**
     * Iterates the deleted secrets in the vault.  The full secret identifier and attributes are provided
     * in the response. No values are returned for the secrets. This operations requires the secrets/list permission.
     *
     * Example usage:
     * ```ts snippet:ReadmeSampleListSecrets
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { SecretClient } from "@azure/keyvault-secrets";
     *
     * const credential = new DefaultAzureCredential();
     *
     * const vaultName = "<YOUR KEYVAULT NAME>";
     * const url = `https://${vaultName}.vault.azure.net`;
     *
     * const client = new SecretClient(url, credential);
     *
     * const secretName = "MySecretName";
     *
     * for await (const secretProperties of client.listPropertiesOfSecrets()) {
     *   console.log("Secret properties: ", secretProperties);
     * }
     *
     * for await (const deletedSecret of client.listDeletedSecrets()) {
     *   console.log("Deleted secret: ", deletedSecret);
     * }
     *
     * for await (const versionProperties of client.listPropertiesOfSecretVersions(secretName)) {
     *   console.log("Version properties: ", versionProperties);
     * }
     * ```
     * List all secrets in the vault.
     * @param options - The optional parameters.
     */
    listDeletedSecrets(options = {}) {
        return (0, transformations_js_1.mapPagedAsyncIterable)(this.client.getDeletedSecrets.bind(this.client), options, transformations_js_1.getSecretFromSecretBundle);
    }
}
exports.SecretClient = SecretClient;
//# sourceMappingURL=index.js.map