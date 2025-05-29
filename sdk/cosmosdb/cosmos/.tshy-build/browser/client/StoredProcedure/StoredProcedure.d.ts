import type { ClientContext } from "../../ClientContext.js";
import type { PartitionKey } from "../../documents/PartitionKey.js";
import type { RequestOptions } from "../../request/index.js";
import { ResourceResponse } from "../../request/index.js";
import type { Container } from "../Container/index.js";
import type { StoredProcedureDefinition } from "./StoredProcedureDefinition.js";
import { StoredProcedureResponse } from "./StoredProcedureResponse.js";
/**
 * Operations for reading, replacing, deleting, or executing a specific, existing stored procedure by id.
 *
 * For operations to create, read all, or query Stored Procedures,
 */
export declare class StoredProcedure {
    readonly container: Container;
    readonly id: string;
    private readonly clientContext;
    /**
     * Returns a reference URL to the resource. Used for linking in Permissions.
     */
    get url(): string;
    /**
     * Creates a new instance of {@link StoredProcedure} linked to the parent {@link Container}.
     * @param container - The parent {@link Container}.
     * @param id - The id of the given {@link StoredProcedure}.
     * @hidden
     */
    constructor(container: Container, id: string, clientContext: ClientContext);
    /**
     * Read the {@link StoredProcedureDefinition} for the given {@link StoredProcedure}.
     * @example
     * ```ts snippet:StoredProcedureRead
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
     *
     * const { resource: sproc } = await container.scripts.storedProcedure("<sproc-id>").read();
     * ```
     */
    read(options?: RequestOptions): Promise<StoredProcedureResponse>;
    /**
     * Replace the given {@link StoredProcedure} with the specified {@link StoredProcedureDefinition}.
     * @param body - The specified {@link StoredProcedureDefinition} to replace the existing definition.
     * @example
     * ```ts snippet:StoredProcedureReplace
     * import { CosmosClient, StoredProcedureDefinition } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
     *
     * const sprocDefinition: StoredProcedureDefinition = {
     *   id: "sample sproc",
     *   body: "function () { const x = 10; }",
     * };
     *
     * const { resource: sproc } = await container.scripts.storedProcedures.create(sprocDefinition);
     *
     * sproc.body = function () {
     *   const x = 20;
     *   console.log(x);
     * };
     * const { resource: replacedSproc } = await container.scripts
     *   .storedProcedure(sproc.id)
     *   .replace(sproc);
     * ```
     */
    replace(body: StoredProcedureDefinition, options?: RequestOptions): Promise<StoredProcedureResponse>;
    /**
     * Delete the given {@link StoredProcedure}.
     * @example
     * ```ts snippet:StoredProcedureDelete
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
     *
     * await container.scripts.storedProcedure("<sproc-id>").delete();
     * ```
     */
    delete(options?: RequestOptions): Promise<StoredProcedureResponse>;
    /**
     * Execute the given {@link StoredProcedure}.
     *
     * The specified type, T, is not enforced by the client.
     * Be sure to validate the response from the stored procedure matches the type, T, you provide.
     *
     * @param partitionKey - The partition key to use when executing the stored procedure
     * @param params - Array of parameters to pass as arguments to the given {@link StoredProcedure}.
     * @param options - Additional options, such as the partition key to invoke the {@link StoredProcedure} on.
     * * @example
     * ```ts snippet:StoredProcedureExecute
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
     *
     * const { resource: result } = await container.scripts
     *   .storedProcedure("<sproc-id>")
     *   .execute(undefined);
     * ```
     */
    execute<T = any>(partitionKey: PartitionKey, params?: any[], options?: RequestOptions): Promise<ResourceResponse<T>>;
}
//# sourceMappingURL=StoredProcedure.d.ts.map