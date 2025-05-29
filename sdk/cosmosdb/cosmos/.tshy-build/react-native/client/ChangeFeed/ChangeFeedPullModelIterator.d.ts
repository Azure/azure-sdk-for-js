import type { Resource } from "../Resource.js";
import type { ChangeFeedIteratorResponse } from "./ChangeFeedIteratorResponse.js";
/**
 * Use `Items.getChangeFeedIterator()` to return an iterator that can iterate over all the changes for a partition key, feed range or an entire container.
 */
export interface ChangeFeedPullModelIterator<T> {
    /**
     * Always returns true, changefeed is an infinite stream.
     */
    readonly hasMoreResults: boolean;
    /**
     * Returns next set of results for the change feed.
     * @example
     * ```ts snippet:ReadmeSampleChangeFeedPullModelIteratorPartitionKey
     * import {
     *   CosmosClient,
     *   PartitionKeyDefinitionVersion,
     *   PartitionKeyKind,
     *   ChangeFeedStartFrom,
     * } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     *
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     *
     * const containerDefinition = {
     *   id: "Test Database",
     *   partitionKey: {
     *     paths: ["/name", "/address/zip"],
     *     version: PartitionKeyDefinitionVersion.V2,
     *     kind: PartitionKeyKind.MultiHash,
     *   },
     * };
     * const { container } = await database.containers.createIfNotExists(containerDefinition);
     *
     * const partitionKey = "some-partition-Key-value";
     * const options = {
     *   changeFeedStartFrom: ChangeFeedStartFrom.Beginning(partitionKey),
     * };
     *
     * const iterator = container.items.getChangeFeedIterator(options);
     *
     * while (iterator.hasMoreResults) {
     *   const response = await iterator.readNext();
     *   // process this response
     * }
     * ```
     */
    readNext(): Promise<ChangeFeedIteratorResponse<Array<T & Resource>>>;
    /**
     * Gets an async iterator which will yield change feed results.
     * @example Get changefeed for an entire container from now
     * ```ts snippet:ChangeFeedPullModelIteratorIterate
     * import { CosmosClient, ChangeFeedStartFrom } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     *
     * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
     *
     * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
     *
     * const options = { changeFeedStartFrom: ChangeFeedStartFrom.Now() };
     * for await (const results of container.items.getChangeFeedIterator(options).getAsyncIterator()) {
     *   // Process result
     *   for (const resource of results.result) {
     *     console.log(resource);
     *   }
     * }
     * ```
     */
    getAsyncIterator(): AsyncIterable<ChangeFeedIteratorResponse<Array<T & Resource>>>;
}
//# sourceMappingURL=ChangeFeedPullModelIterator.d.ts.map