import { ServiceClientCredentials, RequestOptionsBase } from "@azure/ms-rest-js";
import { Secret, DeletedSecret, SetSecretOptions, UpdateSecretOptions, GetSecretOptions, GetAllSecretsOptions, SecretAttributes } from "./secretsModels";
import { NewPipelineOptions, Pipeline } from "./core/keyVaultBase";
export declare class SecretsClient {
    /**
     * A static method used to create a new Pipeline object with the provided Credential.
     *
     * @static
     * @param {ServiceClientCredentials} credential that implements signRequet().
     * @param {NewPipelineOptions} [pipelineOptions] Optional. Options.
     * @returns {Pipeline} A new Pipeline object.
     * @memberof SecretsClient
     */
    static getDefaultPipeline(credential: ServiceClientCredentials, pipelineOptions?: NewPipelineOptions): Pipeline;
    readonly vaultBaseUrl: string;
    readonly pipeline: Pipeline;
    protected readonly credential: ServiceClientCredentials;
    private readonly client;
    /**
     * Creates an instance of SecretsClient.
     * @param {string} url the base url to the key vault.
     * @param {ServiceClientCredentials} credential credential.
     * @param {(Pipeline | NewPipelineOptions)} [pipelineOrOptions={}] Optional. A Pipeline, or options to create a default Pipeline instance.
     *                                                                 Omitting this parameter to create the default Pipeline instance.
     * @memberof SecretsClient
     */
    constructor(url: string, credential: ServiceClientCredentials, pipelineOrOptions?: Pipeline | NewPipelineOptions);
    private static getUserAgentString;
    /**
     * The SET operation adds a secret to the Azure Key Vault. If the named secret already exists,
     * Azure Key Vault creates a new version of that secret. This operation requires the secrets/set
     * permission.
     * @summary Adds a secret in a specified key vault.
     * @param secretName The name of the secret.
     * @param value The value of the secret.
     * @param [options] The optional parameters
     * @returns Promise<Secret>
     */
    setSecret(secretName: string, value: string, options?: SetSecretOptions): Promise<Secret>;
    /**
     * The DELETE operation applies to any secret stored in Azure Key Vault. DELETE cannot be applied
     * to an individual version of a secret. This operation requires the secrets/delete permission.
     * @summary Deletes a secret from a specified key vault.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param secretName The name of the secret.
     * @param [options] The optional parameters
     * @returns Promise<DeletedSecret>
     */
    deleteSecret(secretName: string, options?: RequestOptionsBase): Promise<DeletedSecret>;
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
    updateSecretAttributes(secretName: string, secretVersion: string, options?: UpdateSecretOptions): Promise<Secret>;
    /**
     * The GET operation is applicable to any secret stored in Azure Key Vault. This operation requires
     * the secrets/get permission.
     * @summary Get a specified secret from a given key vault.
     * @param secretName The name of the secret.
     * @param [options] The optional parameters
     * @returns Promise<Secret>
     */
    getSecret(secretName: string, options?: GetSecretOptions): Promise<Secret>;
    /**
     * The Get Deleted Secret operation returns the specified deleted secret along with its attributes.
     * This operation requires the secrets/get permission.
     * @summary Gets the specified deleted secret.
     * @param secretName The name of the secret.
     * @param [options] The optional parameters
     * @returns Promise<DeletedSecret>
     */
    getDeletedSecret(secretName: string, options?: RequestOptionsBase): Promise<DeletedSecret>;
    /**
     * The purge deleted secret operation removes the secret permanently, without the possibility of
     * recovery. This operation can only be enabled on a soft-delete enabled vault. This operation
     * requires the secrets/purge permission.
     * @summary Permanently deletes the specified secret.
     * @param secretName The name of the secret.
     * @param [options] The optional parameters
     * @returns Promise<void>
     */
    purgeDeletedSecret(secretName: string, options?: RequestOptionsBase): Promise<void>;
    /**
     * Recovers the deleted secret in the specified vault. This operation can only be performed on a
     * soft-delete enabled vault. This operation requires the secrets/recover permission.
     * @summary Recovers the deleted secret to the latest version.
     * @param secretName The name of the deleted secret.
     * @param [options] The optional parameters
     * @returns Promise<Secret>
     */
    recoverDeletedSecret(secretName: string, options?: RequestOptionsBase): Promise<Secret>;
    /**
     * Requests that a backup of the specified secret be downloaded to the client. All versions of the
     * secret will be downloaded. This operation requires the secrets/backup permission.
     * @summary Backs up the specified secret.
     * @param secretName The name of the secret.
     * @param [options] The optional parameters
     * @returns Promise<Uint8Array | undefined>
     */
    backupSecret(secretName: string, options?: RequestOptionsBase): Promise<Uint8Array | undefined>;
    /**
     * Restores a backed up secret, and all its versions, to a vault. This operation requires the
     * secrets/restore permission.
     * @summary Restores a backed up secret to a vault.
     * @param secretBundleBackup The backup blob associated with a secret bundle.
     * @param [options] The optional parameters
     * @returns Promise<Secret>
     */
    restoreSecret(secretBundleBackup: Uint8Array, options?: RequestOptionsBase): Promise<Secret>;
    getSecretVersions(secretName: string, options?: GetAllSecretsOptions): AsyncIterableIterator<SecretAttributes>;
    /**
     * Iterates the latest version of all secrets in the vault.  The full secret identifier and attributes are provided
     * in the response. No values are returned for the secrets. This operations requires the secrets/list permission.
     * @summary List all secrets in the vault
     * @param [options] The optional parameters
     * @returns AsyncIterableIterator<Secret>
     */
    getAllSecrets(options?: GetAllSecretsOptions): AsyncIterableIterator<SecretAttributes>;
    /**
     * Iterates the latest version of all secrets in the vault.  The full secret identifier and attributes are provided
     * in the response. No values are returned for the secrets. This operations requires the secrets/list permission.
     * @summary List all versions of the specified secret.
     * @param secretName The name of the secret.
     * @param [options] The optional parameters
     * @returns AsyncIterableIterator<Secret>
     */
    getAllDeletedSecrets(options?: GetAllSecretsOptions): AsyncIterableIterator<Secret>;
    private getSecretFromSecretBundle;
}
//# sourceMappingURL=index.d.ts.map