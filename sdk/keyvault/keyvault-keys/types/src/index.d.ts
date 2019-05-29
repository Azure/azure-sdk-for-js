import { ServiceClientCredentials } from "@azure/ms-rest-js";
import { JsonWebKeyType, JsonWebKey } from "./core/models";
import { NewPipelineOptions, Pipeline } from "./core/keyVaultBase";
import { Key, DeletedKey, CreateKeyOptions, CreateEcKeyOptions, CreateRsaKeyOptions, ImportKeyOptions, UpdateKeyOptions, GetKeyOptions, GetAllKeysOptions, KeyAttributes, RequestOptions } from "./keysModels";
export declare class KeysClient {
    /**
     * A static method used to create a new Pipeline object with the provided Credential.
     *
     * @static
     * @param {ServiceClientCredentials} credential that implements signRequet().
     * @param {NewPipelineOptions} [pipelineOptions] Optional. Options.
     * @returns {Pipeline} A new Pipeline object.
     * @memberof KeysClient
     */
    static getDefaultPipeline(credential: ServiceClientCredentials, pipelineOptions?: NewPipelineOptions): Pipeline;
    readonly vaultBaseUrl: string;
    readonly pipeline: Pipeline;
    protected readonly credential: ServiceClientCredentials;
    private readonly client;
    /**
     * Creates an instance of KeysClient.
     * @param {string} url the base url to the key vault.
     * @param {ServiceClientCredentials} credential credential.
     * @param {(Pipeline | NewPipelineOptions)} [pipelineOrOptions={}] Optional. A Pipeline, or options to create a default Pipeline instance.
     *                                                                 Omitting this parameter to create the default Pipeline instance.
     * @memberof KeysClient
     */
    constructor(url: string, credential: ServiceClientCredentials, pipelineOrOptions?: Pipeline | NewPipelineOptions);
    private static getUserAgentString;
    /**
     * The create key operation can be used to create any key type in Azure Key Vault. If the named key
     * already exists, Azure Key Vault creates a new version of the key. It requires the keys/create
     * permission.
     * @summary Creates a new key, stores it, then returns key parameters and attributes to the client.
     * @param name The name of the key.
     * @param keyType The type of the key.
     * @param [options] The optional parameters
     * @returns Promise<Key>
     */
    createKey(name: string, keyType: JsonWebKeyType, options?: CreateKeyOptions): Promise<Key>;
    /**
     * The create key operation can be used to create any key type in Azure Key Vault. If the named key
     * already exists, Azure Key Vault creates a new version of the key. It requires the keys/create
     * permission.
     * @summary Creates a new key, stores it, then returns key parameters and attributes to the client.
     * @param name The name of the key.
     * @param keyType The type of the key.
     * @param [options] The optional parameters
     * @returns Promise<Key>
     */
    createEcKey(name: string, options?: CreateEcKeyOptions): Promise<Key>;
    /**
     * The create key operation can be used to create any key type in Azure Key Vault. If the named key
     * already exists, Azure Key Vault creates a new version of the key. It requires the keys/create
     * permission.
     * @summary Creates a new key, stores it, then returns key parameters and attributes to the client.
     * @param name The name of the key.
     * @param keyType The type of the key.
     * @param [options] The optional parameters
     * @returns Promise<Key>
     */
    createRsaKey(name: string, options?: CreateRsaKeyOptions): Promise<Key>;
    /**
     * The import key operation may be used to import any key type into an Azure Key Vault. If the
     * named key already exists, Azure Key Vault creates a new version of the key. This operation
     * requires the keys/import permission.
     * @summary Imports an externally created key, stores it, and returns key parameters and attributes
     * to the client.
     * @param name Name for the imported key.
     * @param key The Json web key
     * @param [options] The optional parameters
     */
    importKey(name: string, key: JsonWebKey, options?: ImportKeyOptions): Promise<Key>;
    /**
     * The DELETE operation applies to any key stored in Azure Key Vault. DELETE cannot be applied
     * to an individual version of a key. This operation requires the keys/delete permission.
     * @summary Deletes a key from a specified key vault.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param name The name of the key.
     * @param [options] The optional parameters
     * @returns Promise<DeletedKey>
     */
    deleteKey(name: string, options?: RequestOptions): Promise<DeletedKey>;
    /**
     * The UPDATE operation changes specified attributes of an existing stored key. Attributes that
     * are not specified in the request are left unchanged. The value of a key itself cannot be
     * changed. This operation requires the keys/set permission.
     * @summary Updates the attributes associated with a specified key in a given key vault.
     * @param name The name of the key.
     * @param keyVersion The version of the key.
     * @param [options] The optional parameters
     * @returns Promise<Key>
     */
    updateKey(name: string, keyVersion: string, options?: UpdateKeyOptions): Promise<Key>;
    /**
     * The GET operation is applicable to any key stored in Azure Key Vault. This operation requires
     * the keys/get permission.
     * @summary Get a specified key from a given key vault.
     * @param name The name of the key.
     * @param [options] The optional parameters
     * @returns Promise<Key>
     */
    getKey(name: string, options?: GetKeyOptions): Promise<Key>;
    /**
     * The Get Deleted Key operation returns the specified deleted key along with its attributes.
     * This operation requires the keys/get permission.
     * @summary Gets the specified deleted key.
     * @param name The name of the key.
     * @param [options] The optional parameters
     * @returns Promise<DeletedKey>
     */
    getDeletedKey(name: string, options?: RequestOptions): Promise<DeletedKey>;
    /**
     * The purge deleted key operation removes the key permanently, without the possibility of
     * recovery. This operation can only be enabled on a soft-delete enabled vault. This operation
     * requires the keys/purge permission.
     * @summary Permanently deletes the specified key.
     * @param name The name of the key.
     * @param [options] The optional parameters
     * @returns Promise<void>
     */
    purgeDeletedKey(name: string, options?: RequestOptions): Promise<void>;
    /**
     * Recovers the deleted key in the specified vault. This operation can only be performed on a
     * soft-delete enabled vault. This operation requires the keys/recover permission.
     * @summary Recovers the deleted key to the latest version.
     * @param name The name of the deleted key.
     * @param [options] The optional parameters
     * @returns Promise<Key>
     */
    recoverDeletedKey(name: string, options?: RequestOptions): Promise<Key>;
    /**
     * Requests that a backup of the specified key be downloaded to the client. All versions of the
     * key will be downloaded. This operation requires the keys/backup permission.
     * @summary Backs up the specified key.
     * @param name The name of the key.
     * @param [options] The optional parameters
     * @returns Promise<Uint8Array | undefined>
     */
    backupKey(name: string, options?: RequestOptions): Promise<Uint8Array | undefined>;
    /**
     * Restores a backed up key, and all its versions, to a vault. This operation requires the
     * keys/restore permission.
     * @summary Restores a backed up key to a vault.
     * @param backup The backup blob associated with a key bundle.
     * @param [options] The optional parameters
     * @returns Promise<Key>
     */
    restoreKey(backup: Uint8Array, options?: RequestOptions): Promise<Key>;
    getKeyVersions(name: string, options?: GetAllKeysOptions): AsyncIterableIterator<KeyAttributes>;
    /**
     * Iterates the latest version of all keys in the vault.  The full key identifier and attributes are provided
     * in the response. No values are returned for the keys. This operations requires the keys/list permission.
     * @summary List all versions of the specified key.
     * @param name The name of the key.
     * @param [options] The optional parameters
     * @returns AsyncIterableIterator<Key>
     */
    getAllKeys(options?: GetAllKeysOptions): AsyncIterableIterator<KeyAttributes>;
    /**
     * Iterates the latest version of all keys in the vault.  The full key identifier and attributes are provided
     * in the response. No values are returned for the keys. This operations requires the keys/list permission.
     * @summary List all versions of the specified key.
     * @param name The name of the key.
     * @param [options] The optional parameters
     * @returns AsyncIterableIterator<Key>
     */
    getAllDeletedKeys(options?: GetAllKeysOptions): AsyncIterableIterator<Key>;
    private getKeyFromKeyBundle;
    private getKeyAttributesFromKeyItem;
}
//# sourceMappingURL=index.d.ts.map