import type { PriorityLevel } from "../documents/PriorityLevel.js";
import type { CosmosHeaders } from "../index.js";
/**
 * Options that can be specified for a requested issued to the Azure Cosmos DB servers.=
 */
export interface SharedOptions {
    /** Enables/disables getting document container quota related stats for document container read requests. */
    sessionToken?: string;
    /** (Advanced use case) Initial headers to start with when sending requests to Cosmos */
    initialHeaders?: CosmosHeaders;
    /**
     * abortSignal to pass to all underlying network requests created by this method call. See https://developer.mozilla.org/en-US/docs/Web/API/AbortController
     * @example Cancel a read request
     * ```ts snippet:SharedOptionsAbortSignal
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
     * const controller = new AbortController();
     * const results = container.items.query("SELECT * from c", {
     *   abortSignal: controller.signal,
     * });
     * ```
     */
    abortSignal?: AbortSignal;
    /**
     * Sets the staleness value associated with the request in the Azure CosmosDB service. For requests where the {@link
     * com.azure.cosmos.ConsistencyLevel} is {@link com.azure.cosmos.ConsistencyLevel#EVENTUAL}  or {@link com.azure.cosmos.ConsistencyLevel#SESSION}, responses from the
     * integrated cache are guaranteed to be no staler than value indicated by this maxIntegratedCacheStaleness. When the
     * consistency level is not set, this property is ignored.
     *
     * <p>Default value is null</p>
     *
     * <p>Cache Staleness is supported in milliseconds granularity. Anything smaller than milliseconds will be ignored.</p>
     */
    maxIntegratedCacheStalenessInMs?: number;
    /**
     * Sets if integrated cache should be bypassed or enabled for the request in Azure CosmosDB service.
     *
     * <p>Default value is false. By default integrated cache is enabled</p>
     */
    bypassIntegratedCache?: boolean;
    /**
     * Priority Level (Low/High) for each request.
     * Low priority requests are always throttled before any high priority requests.
     *
     * <p>Default value is null. By default all requests are of High priority</p>
     */
    priorityLevel?: PriorityLevel;
    /**
     * Throughput Bucket for a request.
     *
     * <p>Default value is null. In this case, the request can use 100% of the partition throughput. </p>
     * For more information, visit [Cosmos DB throughput Bucketing](https://aka.ms/cosmsodb-bucketing).
     */
    throughputBucket?: number;
    /** Consistency level required by the client. */
    consistencyLevel?: string;
    /**
     * DisableRUPerMinuteUsage is used to enable/disable Request Units(RUs)/minute capacity
     * to serve the request if regular provisioned RUs/second is exhausted.
     */
    disableRUPerMinuteUsage?: boolean;
}
//# sourceMappingURL=SharedOptions.d.ts.map