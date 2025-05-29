import type { TokenCredential } from "@azure/core-auth";
import { logger } from "./log.js";
import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";
import type { PollOperationState } from "@azure/core-lro";
import { PollerLike } from "@azure/core-lro";
import { BackupSecretOptions, BeginDeleteSecretOptions, BeginRecoverDeletedSecretOptions, DeletedSecret, GetDeletedSecretOptions, GetSecretOptions, KeyVaultSecret, ListDeletedSecretsOptions, ListPropertiesOfSecretVersionsOptions, ListPropertiesOfSecretsOptions, PurgeDeletedSecretOptions, RestoreSecretBackupOptions, SecretClientOptions, SecretPollerOptions, SecretProperties, SetSecretOptions, UpdateSecretPropertiesOptions } from "./secretsModels.js";
import { KnownDeletionRecoveryLevel, DeletionRecoveryLevel } from "./generated/index.js";
import { KeyVaultSecretIdentifier, parseKeyVaultSecretIdentifier } from "./identifier.js";
export { SecretClientOptions, DeletedSecret, DeletionRecoveryLevel, KnownDeletionRecoveryLevel, GetSecretOptions, GetDeletedSecretOptions, PurgeDeletedSecretOptions, BackupSecretOptions, RestoreSecretBackupOptions, ListPropertiesOfSecretVersionsOptions, ListPropertiesOfSecretsOptions, ListDeletedSecretsOptions, PagedAsyncIterableIterator, PageSettings, KeyVaultSecretIdentifier, parseKeyVaultSecretIdentifier, PollerLike, PollOperationState, KeyVaultSecret, SecretProperties, SecretPollerOptions, BeginDeleteSecretOptions, BeginRecoverDeletedSecretOptions, SetSecretOptions, UpdateSecretPropertiesOptions, logger, };
/**
 * The SecretClient provides methods to manage {@link KeyVaultSecret} in
 * the Azure Key Vault. The client supports creating, retrieving, updating,
 * deleting, purging, backing up, restoring and listing KeyVaultSecrets. The
 * client also supports listing {@link DeletedSecret} for a soft-delete enabled Azure
 * Key Vault.
 */
export declare class SecretClient {
    /**
     * The base URL to the vault
     */
    readonly vaultUrl: string;
    /**
     * A reference to the auto-generated KeyVault HTTP client.
     */
    private readonly client;
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
    constructor(vaultUrl: string, credential: TokenCredential, pipelineOptions?: SecretClientOptions);
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
    setSecret(secretName: string, value: string, options?: SetSecretOptions): Promise<KeyVaultSecret>;
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
    beginDeleteSecret(name: string, options?: BeginDeleteSecretOptions): Promise<PollerLike<PollOperationState<DeletedSecret>, DeletedSecret>>;
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
    updateSecretProperties(secretName: string, secretVersion: string, options?: UpdateSecretPropertiesOptions): Promise<SecretProperties>;
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
    getSecret(secretName: string, options?: GetSecretOptions): Promise<KeyVaultSecret>;
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
    getDeletedSecret(secretName: string, options?: GetDeletedSecretOptions): Promise<DeletedSecret>;
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
    purgeDeletedSecret(secretName: string, options?: PurgeDeletedSecretOptions): Promise<void>;
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
    beginRecoverDeletedSecret(name: string, options?: BeginRecoverDeletedSecretOptions): Promise<PollerLike<PollOperationState<SecretProperties>, SecretProperties>>;
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
    backupSecret(secretName: string, options?: BackupSecretOptions): Promise<Uint8Array | undefined>;
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
    restoreSecretBackup(secretBundleBackup: Uint8Array, options?: RestoreSecretBackupOptions): Promise<SecretProperties>;
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
    listPropertiesOfSecretVersions(secretName: string, options?: ListPropertiesOfSecretVersionsOptions): PagedAsyncIterableIterator<SecretProperties>;
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
    listPropertiesOfSecrets(options?: ListPropertiesOfSecretsOptions): PagedAsyncIterableIterator<SecretProperties>;
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
    listDeletedSecrets(options?: ListDeletedSecretsOptions): PagedAsyncIterableIterator<DeletedSecret>;
}
//# sourceMappingURL=index.d.ts.map