import type { ClientContext } from "../../ClientContext.js";
import type { RequestOptions } from "../../request/index.js";
import type { Container } from "../Container/index.js";
import { ConflictResponse } from "./ConflictResponse.js";
import type { PartitionKey } from "../../documents/index.js";
/**
 * Use to read or delete a given {@link Conflict} by id.
 *
 * @see {@link Conflicts} to query or read all conflicts.
 */
export declare class Conflict {
    readonly container: Container;
    readonly id: string;
    private readonly clientContext;
    private partitionKey?;
    /**
     * Returns a reference URL to the resource. Used for linking in Permissions.
     */
    get url(): string;
    /**
     * @hidden
     * @param container - The parent {@link Container}.
     * @param id - The id of the given {@link Conflict}.
     */
    constructor(container: Container, id: string, clientContext: ClientContext, partitionKey?: PartitionKey);
    /**
     * Read the {@link ConflictDefinition} for the given {@link Conflict}.
     * @example
     * ```ts snippet:ConflictRead
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     * const container = database.container("Test Container");
     *
     * const { resource: conflict } = await container.conflict("<conflict-id>").read();
     * ```
     */
    read(options?: RequestOptions): Promise<ConflictResponse>;
    /**
     * Delete the given {@link ConflictDefinition}.
     * @example
     * ```ts snippet:ConflictDelete
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     * const container = database.container("Test Container");
     *
     * await container.conflict("<conflict-id>").delete();
     * ```
     */
    delete(options?: RequestOptions): Promise<ConflictResponse>;
}
//# sourceMappingURL=Conflict.d.ts.map