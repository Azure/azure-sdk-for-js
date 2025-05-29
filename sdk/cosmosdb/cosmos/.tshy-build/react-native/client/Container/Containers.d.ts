import type { ClientContext } from "../../ClientContext.js";
import type { SqlQuerySpec } from "../../queryExecutionContext/index.js";
import { QueryIterator } from "../../queryIterator.js";
import { type FeedOptions, type RequestOptions } from "../../request/index.js";
import type { Database } from "../Database/index.js";
import type { Resource } from "../Resource.js";
import type { ContainerDefinition } from "./ContainerDefinition.js";
import type { ContainerRequest } from "./ContainerRequest.js";
import { ContainerResponse } from "./ContainerResponse.js";
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal.js";
import type { EncryptionManager } from "../../encryption/EncryptionManager.js";
/**
 * Operations for creating new containers, and reading/querying all containers
 *
 * @see {@link Container} for reading, replacing, or deleting an existing container; use `.container(id)`.
 *
 * Note: all these operations make calls against a fixed budget.
 * You should design your system such that these calls scale sublinearly with your application.
 * For instance, do not call `containers.readAll()` before every single `item.read()` call, to ensure the container exists;
 * do this once on application start up.
 */
export declare class Containers {
    readonly database: Database;
    private readonly clientContext;
    private encryptionManager?;
    /**
     * @hidden
     * @param database - The parent {@link Database}.
     */
    constructor(database: Database, clientContext: ClientContext, encryptionManager?: EncryptionManager);
    /**
     * Queries all containers.
     * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
     * @param options - Use to set options like response page size, continuation tokens, etc.
     * @returns {@link QueryIterator} Allows you to return specific containers in an array or iterate over them one at a time.
     * @example Read all containers to array.
     * ```ts snippet:ContainersQueryAllContainers
     * import { CosmosClient, SqlQuerySpec } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     *
     * const querySpec: SqlQuerySpec = {
     *   query: `SELECT * FROM root r WHERE r.id = @container`,
     *   parameters: [{ name: "@container", value: "Todo" }],
     * };
     * const { resources: containerList } = await client
     *   .database("<db id>")
     *   .containers.query(querySpec)
     *   .fetchAll();
     * ```
     */
    query(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<any>;
    /**
     * Queries all containers.
     * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
     * @param options - Use to set options like response page size, continuation tokens, etc.
     * @returns {@link QueryIterator} Allows you to return specific containers in an array or iterate over them one at a time.
     * @example Read all containers to array.
     * ```ts snippet:ContainersQueryAllContainers
     * import { CosmosClient, SqlQuerySpec } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     *
     * const querySpec: SqlQuerySpec = {
     *   query: `SELECT * FROM root r WHERE r.id = @container`,
     *   parameters: [{ name: "@container", value: "Todo" }],
     * };
     * const { resources: containerList } = await client
     *   .database("<db id>")
     *   .containers.query(querySpec)
     *   .fetchAll();
     * ```
     */
    query<T>(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<T>;
    /**
     * Creates a container.
     *
     * A container is a named logical container for items.
     *
     * A database may contain zero or more named containers and each container consists of
     * zero or more JSON items.
     *
     * Being schema-free, the items in a container do not need to share the same structure or fields.
     *
     *
     * Since containers are application resources, they can be authorized using either the
     * master key or resource keys.
     *
     * @param body - Represents the body of the container.
     * @param options - Use to set options like response page size, continuation tokens, etc.
     * @example
     * ```ts snippet:CosmosClientDatabaseCreateContainer
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     * const container = client.database("<database id>").containers.create({
     *   id: "<name here>",
     * });
     * ```
     */
    create(body: ContainerRequest, options?: RequestOptions): Promise<ContainerResponse>;
    /**
     * @hidden
     */
    createInternal(diagnosticNode: DiagnosticNodeInternal, body: ContainerRequest, options?: RequestOptions): Promise<ContainerResponse>;
    /**
     * Checks if a Container exists, and, if it doesn't, creates it.
     * This will make a read operation based on the id in the `body`, then if it is not found, a create operation.
     * You should confirm that the output matches the body you passed in for non-default properties (i.e. indexing policy/etc.)
     *
     * A container is a named logical container for items.
     *
     * A database may contain zero or more named containers and each container consists of
     * zero or more JSON items.
     *
     * Being schema-free, the items in a container do not need to share the same structure or fields.
     *
     *
     * Since containers are application resources, they can be authorized using either the
     * master key or resource keys.
     *
     * @param body - Represents the body of the container.
     * @param options - Use to set options like response page size, continuation tokens, etc.
     * @example
     * ```ts snippet:ReadmeSampleCreateContainer
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     *
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
     * ```
     */
    createIfNotExists(body: ContainerRequest, options?: RequestOptions): Promise<ContainerResponse>;
    /**
     * Read all containers.
     * @param options - Use to set options like response page size, continuation tokens, etc.
     * @returns {@link QueryIterator} Allows you to return all containers in an array or iterate over them one at a time.
     * @example Read all containers to array.
     * ```ts snippet:ContainersReadAllContainers
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     *
     * const { resources: containerList } = await client
     *   .database("<db id>")
     *   .containers.readAll()
     *   .fetchAll();
     * ```
     */
    readAll(options?: FeedOptions): QueryIterator<ContainerDefinition & Resource>;
}
//# sourceMappingURL=Containers.d.ts.map