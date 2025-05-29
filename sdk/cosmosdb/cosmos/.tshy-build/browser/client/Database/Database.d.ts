import type { ClientContext } from "../../ClientContext.js";
import type { CosmosClient } from "../../CosmosClient.js";
import { type RequestOptions } from "../../request/index.js";
import { Container, Containers } from "../Container/index.js";
import { User, Users } from "../User/index.js";
import { DatabaseResponse } from "./DatabaseResponse.js";
import { OfferResponse } from "../Offer/index.js";
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal.js";
import type { EncryptionKeyWrapMetadata } from "../../encryption/index.js";
import { ClientEncryptionKeyResponse, EncryptionAlgorithm } from "../../encryption/index.js";
import type { EncryptionManager } from "../../encryption/EncryptionManager.js";
/**
 * Operations for reading or deleting an existing database.
 *
 * @see {@link Databases} for creating new databases, and reading/querying all databases; use `client.databases`.
 *
 * Note: all these operations make calls against a fixed budget.
 * You should design your system such that these calls scale sublinearly with your application.
 * For instance, do not call `database.read()` before every single `item.read()` call, to ensure the database exists;
 * do this once on application start up.
 */
export declare class Database {
    readonly client: CosmosClient;
    readonly id: string;
    private clientContext;
    private encryptionManager?;
    /**
     * Used for creating new containers, or querying/reading all containers.
     *
     * Use `.database(id)` to read, replace, or delete a specific, existing {@link Database} by id.
     *
     * @example Create a new container
     * ```ts snippet:DatabaseCreateContainer
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     *
     * const { body: containerDefinition, container } = await client
     *   .database("<db id>")
     *   .containers.create({ id: "<container id>" });
     * ```
     */
    readonly containers: Containers;
    /**
     * Used for creating new users, or querying/reading all users.
     *
     * Use `.user(id)` to read, replace, or delete a specific, existing {@link User} by id.
     */
    readonly users: Users;
    /**
     * Returns a reference URL to the resource. Used for linking in Permissions.
     * @example
     * ```ts snippet:DatabaseGetUrl
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     *
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     *
     * const url = database.url;
     * ```
     */
    get url(): string;
    /** Returns a new {@link Database} instance.
     *
     * Note: the intention is to get this object from {@link CosmosClient} via `client.database(id)`, not to instantiate it yourself.
     * @hidden
     */
    constructor(client: CosmosClient, id: string, clientContext: ClientContext, encryptionManager?: EncryptionManager, _rid?: string);
    /**
     * Used to read, replace, or delete a specific, existing {@link Database} by id.
     *
     * Use `.containers` creating new containers, or querying/reading all containers.
     *
     * @example Delete a container
     * ```ts snippet:DatabaseDeleteContainer
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     *
     * await client.database("<db id>").container("<container id>").delete();
     * ```
     */
    container(id: string): Container;
    /**
     * Used to read, replace, or delete a specific, existing {@link User} by id.
     *
     * Use `.users` for creating new users, or querying/reading all users.
     * @example Delete a user
     * ```ts snippet:DatabaseDeleteUser
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     * await client.database("<db id>").user("<user id>").delete();
     * ```
     */
    user(id: string): User;
    /** Read the definition of the given Database.
     * @example
     * ```ts snippet:DatabaseRead
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     *
     * const { resource: database } = await client.database("<db id>").read();
     * ```
     */
    read(options?: RequestOptions): Promise<DatabaseResponse>;
    /**
     * @hidden
     */
    readInternal(diagnosticNode: DiagnosticNodeInternal, options?: RequestOptions): Promise<DatabaseResponse>;
    /** Delete the given Database.
     * @example
     * ```ts snippet:CosmosClientDatabaseDelete
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     * await client.database("<id here>").delete();
     * ```
     */
    delete(options?: RequestOptions): Promise<DatabaseResponse>;
    /**
     * Gets offer on database. If none exists, returns an OfferResponse with undefined.
     * @example Read the offer on the database
     * ```ts snippet:DatabaseReadOffer
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     *
     * const { resource: offer } = await client.database("<db id>").readOffer();
     * ```
     */
    readOffer(options?: RequestOptions): Promise<OfferResponse>;
    /**
     * Create Encryption key for database account
     * @example
     * ```ts snippet:DatabaseCreateClientEncryptionKey
     * import { ClientSecretCredential } from "@azure/identity";
     * import {
     *   AzureKeyVaultEncryptionKeyResolver,
     *   CosmosClient,
     *   EncryptionKeyWrapMetadata,
     *   EncryptionKeyResolverName,
     *   KeyEncryptionAlgorithm,
     *   EncryptionAlgorithm,
     * } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const credentials = new ClientSecretCredential("<tenant-id>", "<client-id>", "<app-secret>");
     * const keyResolver = new AzureKeyVaultEncryptionKeyResolver(credentials);
     * const client = new CosmosClient({
     *   endpoint,
     *   key,
     *   clientEncryptionOptions: {
     *     keyEncryptionKeyResolver: keyResolver,
     *   },
     * });
     * const { database } = await client.databases.createIfNotExists({ id: "<db id>" });
     * const metadata: EncryptionKeyWrapMetadata = {
     *   type: EncryptionKeyResolverName.AzureKeyVault,
     *   name: "<key-name>",
     *   value: "<key-vault-url>",
     *   algorithm: KeyEncryptionAlgorithm.RSA_OAEP,
     * };
     *
     * await database.createClientEncryptionKey(
     *   "<cek-id>",
     *   EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
     *   metadata,
     * );
     * ```
     */
    createClientEncryptionKey(clientEncryptionKeyId: string, encryptionAlgorithm: EncryptionAlgorithm, keyWrapMetadata: EncryptionKeyWrapMetadata): Promise<ClientEncryptionKeyResponse>;
    /**
     * Read Encryption key for database account
     * @example
     * ```ts snippet:DatabaseReadClientEncryptionKey
     * import { ClientSecretCredential } from "@azure/identity";
     * import { AzureKeyVaultEncryptionKeyResolver, CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const credentials = new ClientSecretCredential("<tenant-id>", "<client-id>", "<app-secret>");
     * const keyResolver = new AzureKeyVaultEncryptionKeyResolver(credentials);
     * const client = new CosmosClient({
     *   endpoint,
     *   key,
     *   clientEncryptionOptions: {
     *     keyEncryptionKeyResolver: keyResolver,
     *   },
     * });
     * const { database } = await client.databases.createIfNotExists({ id: "<db id>" });
     *
     * const { resource: clientEncryptionKey } = await database.readClientEncryptionKey("<cek-id>");
     * ```
     */
    readClientEncryptionKey(clientEncryptionKeyId: string): Promise<ClientEncryptionKeyResponse>;
    /**
     * rewraps a client encryption key with new key encryption key
     * @param id - client encryption key id
     * @param newKeyWrapMetadata - new encryption key wrap metadata
     * @returns rewrapped client encryption key with new customer managed key
     * @example
     * ```ts snippet:DatabaseRewrapClientEncryptionKey
     * import { ClientSecretCredential } from "@azure/identity";
     * import {
     *   AzureKeyVaultEncryptionKeyResolver,
     *   CosmosClient,
     *   EncryptionKeyWrapMetadata,
     *   EncryptionKeyResolverName,
     *   KeyEncryptionAlgorithm,
     * } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const credentials = new ClientSecretCredential("<tenant-id>", "<client-id>", "<app-secret>");
     * const keyResolver = new AzureKeyVaultEncryptionKeyResolver(credentials);
     * const client = new CosmosClient({
     *   endpoint,
     *   key,
     *   clientEncryptionOptions: {
     *     keyEncryptionKeyResolver: keyResolver,
     *   },
     * });
     * const { database } = await client.databases.createIfNotExists({ id: "<db id>" });
     * const newMetadata: EncryptionKeyWrapMetadata = {
     *   type: EncryptionKeyResolverName.AzureKeyVault,
     *   name: "<key-name>",
     *   value: "<key-vault-url>",
     *   algorithm: KeyEncryptionAlgorithm.RSA_OAEP,
     * };
     *
     * await database.rewrapClientEncryptionKey("<new-cek-id>", newMetadata);
     * ```
     */
    rewrapClientEncryptionKey(clientEncryptionKeyId: string, newKeyWrapMetadata: EncryptionKeyWrapMetadata): Promise<ClientEncryptionKeyResponse>;
}
//# sourceMappingURL=Database.d.ts.map