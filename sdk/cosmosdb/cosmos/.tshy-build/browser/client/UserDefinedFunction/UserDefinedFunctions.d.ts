import type { ClientContext } from "../../ClientContext.js";
import type { SqlQuerySpec } from "../../queryExecutionContext/index.js";
import { QueryIterator } from "../../queryIterator.js";
import type { FeedOptions, RequestOptions } from "../../request/index.js";
import type { Container } from "../Container/index.js";
import type { Resource } from "../Resource.js";
import type { UserDefinedFunctionDefinition } from "./UserDefinedFunctionDefinition.js";
import { UserDefinedFunctionResponse } from "./UserDefinedFunctionResponse.js";
/**
 * Used to create, upsert, query, or read all User Defined Functions.
 *
 * @see {@link UserDefinedFunction} to read, replace, or delete a given User Defined Function by id.
 */
export declare class UserDefinedFunctions {
    readonly container: Container;
    private readonly clientContext;
    /**
     * @hidden
     * @param container - The parent {@link Container}.
     */
    constructor(container: Container, clientContext: ClientContext);
    /**
     * Query all User Defined Functions.
     * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
     */
    query(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<any>;
    /**
     * Query all User Defined Functions.
     * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
     * @example
     * ```ts snippet:UserDefinedFunctionsQuery
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
     *
     * const querySpec = {
     *   query: "SELECT * FROM root r WHERE r.id=@id",
     *   parameters: [
     *     {
     *       name: "@id",
     *       value: "<udf-id>",
     *     },
     *   ],
     * };
     * const { resources: results } = await container.scripts.userDefinedFunctions
     *   .query(querySpec)
     *   .fetchAll();
     * ```
     */
    query<T>(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<T>;
    /**
     * Read all User Defined Functions.
     * @example Read all User Defined Functions to array.
     * ```ts snippet:UserDefinedFunctionsReadAll
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     *
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     *
     * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
     *
     * const { resources: udfList } = await container.scripts.userDefinedFunctions.readAll().fetchAll();
     * ```
     */
    readAll(options?: FeedOptions): QueryIterator<UserDefinedFunctionDefinition & Resource>;
    /**
     * Create a UserDefinedFunction.
     *
     * Azure Cosmos DB supports JavaScript UDFs which can be used inside queries, stored procedures and triggers.
     *
     * For additional details, refer to the server-side JavaScript API documentation.
     * @example
     * ```ts snippet:UserDefinedFunctionsCreate
     * import { CosmosClient, UserDefinedFunctionDefinition } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
     *
     * const udfDefinition: UserDefinedFunctionDefinition = {
     *   id: "sample udf",
     *   body: "function () { const x = 10; }",
     * };
     *
     * const { resource: udf } = await container.scripts.userDefinedFunctions.create(udfDefinition);
     * ```
     */
    create(body: UserDefinedFunctionDefinition, options?: RequestOptions): Promise<UserDefinedFunctionResponse>;
}
//# sourceMappingURL=UserDefinedFunctions.d.ts.map