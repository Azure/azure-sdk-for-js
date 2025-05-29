import { Constants, getIdFromLink, getPathFromLink, ResourceType } from "../../common/index.js";
import { ConflictResponse } from "./ConflictResponse.js";
import { undefinedPartitionKey } from "../../extractPartitionKey.js";
import { readPartitionKeyDefinition } from "../ClientUtils.js";
import { getEmptyCosmosDiagnostics, withDiagnostics } from "../../utils/diagnostics.js";
/**
 * Use to read or delete a given {@link Conflict} by id.
 *
 * @see {@link Conflicts} to query or read all conflicts.
 */
export class Conflict {
    /**
     * Returns a reference URL to the resource. Used for linking in Permissions.
     */
    get url() {
        return `/${this.container.url}/${Constants.Path.ConflictsPathSegment}/${this.id}`;
    }
    /**
     * @hidden
     * @param container - The parent {@link Container}.
     * @param id - The id of the given {@link Conflict}.
     */
    constructor(container, id, clientContext, partitionKey) {
        this.container = container;
        this.id = id;
        this.clientContext = clientContext;
        this.partitionKey = partitionKey;
        this.partitionKey = partitionKey;
    }
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
    async read(options) {
        return withDiagnostics(async (diagnosticNode) => {
            const path = getPathFromLink(this.url, ResourceType.conflicts);
            const id = getIdFromLink(this.url);
            const response = await this.clientContext.read({
                path,
                resourceType: ResourceType.user,
                resourceId: id,
                options,
                diagnosticNode,
            });
            return new ConflictResponse(response.result, response.headers, response.code, this, getEmptyCosmosDiagnostics());
        }, this.clientContext);
    }
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
    async delete(options) {
        return withDiagnostics(async (diagnosticNode) => {
            if (this.partitionKey === undefined) {
                const partitionKeyDefinition = await readPartitionKeyDefinition(diagnosticNode, this.container);
                this.partitionKey = undefinedPartitionKey(partitionKeyDefinition);
            }
            const path = getPathFromLink(this.url);
            const id = getIdFromLink(this.url);
            const response = await this.clientContext.delete({
                path,
                resourceType: ResourceType.conflicts,
                resourceId: id,
                options,
                partitionKey: this.partitionKey,
                diagnosticNode,
            });
            return new ConflictResponse(response.result, response.headers, response.code, this, getEmptyCosmosDiagnostics());
        }, this.clientContext);
    }
}
//# sourceMappingURL=Conflict.js.map