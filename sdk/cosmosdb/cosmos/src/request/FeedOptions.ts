// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { SharedOptions } from "./SharedOptions";

/**
 * The feed options and query methods.
 */
export interface FeedOptions extends SharedOptions {
  /** Opaque token for continuing the enumeration. Default: undefined
   * @deprecated Use continuationToken instead.
   */
  continuation?: string;
  /** Opaque token for continuing the enumeration. Default: undefined */
  continuationToken?: string;
  /**
   * Limits the size of the continuation token in the response. Default: undefined
   *
   * Continuation Tokens contain optional data that can be removed from the serialization before writing it out to a header.
   * By default we are capping this to 1kb to avoid long headers (Node.js has a global header size limit).
   * A user may set this field to allow for longer headers, which can help the backend optimize query execution."
   */
  continuationTokenLimitInKB?: number;
  /**
   * Allow scan on the queries which couldn't be served as indexing was opted out on the requested paths. Default: false
   *
   * In general, it is best to avoid using this setting. Scans are relatively expensive and take a long time to serve.
   */
  enableScanInQuery?: boolean;
  /**
   * The maximum number of concurrent operations that run client side during parallel query execution in the
   * Azure Cosmos DB database service. Negative values make the system automatically decides the number of
   * concurrent operations to run. Default: 0 (no parallelism)
   */
  maxDegreeOfParallelism?: number;
  /**
   * Max number of items to be returned in the enumeration operation. Default: undefined (server will defined payload)
   *
   * Expirimenting with this value can usually result in the biggest performance changes to the query.
   *
   * The smaller the item count, the faster the first result will be delivered (for non-aggregates). For larger amounts,
   * it will take longer to serve the request, but you'll usually get better throughput for large queries (i.e. if you need 1000 items
   * before you can do any other actions, set `maxItemCount` to 1000. If you can start doing work after the first 100, set `maxItemCount` to 100.)
   */
  maxItemCount?: number;
  /**
   * Note: consider using changeFeed instead.
   *
   * Indicates a change feed request. Must be set to "Incremental feed", or omitted otherwise. Default: false
   */
  useIncrementalFeed?: boolean;
  /** Conditions Associated with the request. */
  accessCondition?: {
    /** Conditional HTTP method header type (IfMatch or IfNoneMatch). */
    type: string;
    /** Conditional HTTP method header value (the _etag field from the last version you read). */
    condition: string;
  };
  /**
   * Enable returning query metrics in response headers. Default: false
   *
   * Used for debugging slow or expensive queries. Also increases response size and if you're using a low max header size in Node.js,
   * you can run into issues faster.
   */
  populateQueryMetrics?: boolean;
  /**
   * Enable buffering additional items during queries. Default: false
   *
   * This will buffer an additional page at a time (multiplied by maxDegreeOfParallelism) from the server in the background.
   * This improves latency by fetching pages before they are needed by the client. If you're draining all of the results from the
   * server, like `.fetchAll`, you should usually enable this. If you're only fetching one page at a time via continuation token,
   * you should avoid this. If you're draining more than one page, but not the entire result set, it may help improve latency, but
   * it will increase the total amount of RU/s use to serve the entire query (as some pages will be fetched more than once).
   */
  bufferItems?: boolean;
  /**
   * This setting forces the query to use a query plan. Default: false
   *
   * Note: this will disable continuation token support, even for single partition queries.
   *
   * For queries like aggregates and most cross partition queries, this happens anyway.
   * However, since the library doesn't know what type of query it is until we get back the first response,
   * some optimization can't happen until later.
   *
   * If this setting is enabled, it will force query plan for the query, which will save some network requests
   * and ensure parallelism can happen. Useful for when you know you're doing cross-partition or aggregate queries.
   */
  forceQueryPlan?: boolean;
}
