import { getIdFromLink, getPathFromLink, ResourceType } from "../../common/index.js";
import { QueryIterator } from "../../queryIterator.js";
/**
 * Use to query or read all conflicts.
 *
 * @see {@link Conflict} to read or delete a given {@link Conflict} by id.
 */
export class Conflicts {
    constructor(container, clientContext) {
        this.container = container;
        this.clientContext = clientContext;
    }
    query(query, options) {
        const path = getPathFromLink(this.container.url, ResourceType.conflicts);
        const id = getIdFromLink(this.container.url);
        return new QueryIterator(this.clientContext, query, options, (diagNode, innerOptions) => {
            return this.clientContext.queryFeed({
                path,
                resourceType: ResourceType.conflicts,
                resourceId: id,
                resultFn: (result) => result.Conflicts,
                query,
                options: innerOptions,
                diagnosticNode: diagNode,
            });
        });
    }
    /**
     * Reads all conflicts
     * @param options - Use to set options like response page size, continuation tokens, etc.
     * @example
     * ```ts snippet:ConflictsReadAll
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     * const container = database.container("Test Container");
     *
     * const { resources: conflicts } = await container.conflicts.readAll().fetchAll();
     * ```
     */
    readAll(options) {
        return this.query(undefined, options);
    }
}
//# sourceMappingURL=Conflicts.js.map