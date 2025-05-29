import type { ClientContext } from "../../ClientContext.js";
import type { RequestOptions } from "../../request/index.js";
import type { Container } from "../Container/index.js";
import type { UserDefinedFunctionDefinition } from "./UserDefinedFunctionDefinition.js";
import { UserDefinedFunctionResponse } from "./UserDefinedFunctionResponse.js";
/**
 * Used to read, replace, or delete a specified User Definied Function by id.
 *
 * @see {@link UserDefinedFunction} to create, upsert, query, read all User Defined Functions.
 */
export declare class UserDefinedFunction {
    readonly container: Container;
    readonly id: string;
    private readonly clientContext;
    /**
     * Returns a reference URL to the resource. Used for linking in Permissions.
     */
    get url(): string;
    /**
     * @hidden
     * @param container - The parent {@link Container}.
     * @param id - The id of the given {@link UserDefinedFunction}.
     */
    constructor(container: Container, id: string, clientContext: ClientContext);
    /**
     * Read the {@link UserDefinedFunctionDefinition} for the given {@link UserDefinedFunction}.
     * @example
     * ```ts snippet:UserDefinedFunctionRead
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
     *
     * const { resource: udf } = await container.scripts.userDefinedFunction("<udf-id>").read();
     * ```
     */
    read(options?: RequestOptions): Promise<UserDefinedFunctionResponse>;
    /**
     * Replace the given {@link UserDefinedFunction} with the specified {@link UserDefinedFunctionDefinition}.
     * @param options -
     * @example
     * ```ts snippet:UserDefinedFunctionReplace
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
     * await container.scripts.userDefinedFunctions.create(udfDefinition);
     *
     * udfDefinition.body = "function () { const x = 20; }";
     * const { resource: replacedUdf } = await container.scripts
     *   .userDefinedFunction(udfDefinition.id)
     *   .replace(udfDefinition);
     * ```
     */
    replace(body: UserDefinedFunctionDefinition, options?: RequestOptions): Promise<UserDefinedFunctionResponse>;
    /**
     * Delete the given {@link UserDefined}.
     * @example
     * ```ts snippet:UserDefinedFunctionDelete
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
     *
     * await container.scripts.userDefinedFunction("<udf-id>").delete();
     * ```
     */
    delete(options?: RequestOptions): Promise<UserDefinedFunctionResponse>;
}
//# sourceMappingURL=UserDefinedFunction.d.ts.map