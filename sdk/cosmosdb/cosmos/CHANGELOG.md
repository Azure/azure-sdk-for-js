# Release History

## 4.5.0 (2025-07-21)

### Features Added

- PPAF (Per Partition Automatic Failover) Support: This feature adds support for Per Partition Automatic Failover (PPAF) and Per Partition Circuit Breaker (PPCB) allowing failover to different regions on a per partition basis instead of account level failovers increasing the availability and reducing the operation latencies on the client side. [docs](https://learn.microsoft.com/azure/cosmos-db/how-to-configure-per-partition-automatic-failover)

The following sample shows how to enable PPAF and PPCB. If `enablePartitionLevelFailover` is set to `true`, by default `enablePartitionLevelCircuitBreaker` will also be set to `true`.

```js
const client = new CosmosClient({
  endpoint,
  key: masterKey,
  connectionPolicy: {
    ...defaultConnectionPolicy,
    enablePartitionLevelFailover: true,
    enablePartitionLevelCircuitBreaker: true,
  },
});
```

### Bugs Fixed

- [#35054](https://github.com/Azure/azure-sdk-for-js/pull/35054) Fixed an issue with COUNTIF aggregation which ensures that partial results from multiple partitions or batches are correctly summed, producing accurate results for COUNTIF queries.
- [#35049](https://github.com/Azure/azure-sdk-for-js/pull/35049) Moved `@azure/logger` from the devDependencies to the runtime dependencies in the Cosmos DB client package, ensuring that client loggers can be created at runtime.
- [#35189](https://github.com/Azure/azure-sdk-for-js/pull/35189) Fixed the RU calculation bug where RU (Request Unit) charges were not aggregated when document producer returned empty responses.
- [#34765](https://github.com/Azure/azure-sdk-for-js/pull/34765) Fixed partition key extraction bug enhancing the partition key extraction logic to correctly handle migrated containers using the systemKey flag.
- [#32044](https://github.com/Azure/azure-sdk-for-js/pull/32044) Fixed an issue of Client retrying 120*120 times on an inaccessible endpoint.
- [#34933](https://github.com/Azure/azure-sdk-for-js/pull/34933) Fixed an issue of SDK throwing an error on executing parameterized RRF queries.

## 4.4.1 (2025-05-15)

### Bugs Fixed

[#34346](https://github.com/Azure/azure-sdk-for-js/pull/34346) Fixed an issue where `require` is being used in an ESM context. 

## 4.4.0 (2025-05-13)

### Features Added
#### New Bulk API (Preview)
The new `executeBulkOperations` API in the SDK brings significant enhancements for bulk workloads. It removes the previous 100-operation limit, adds operation-level retries for improved resilience, and introduces dynamic congestion control to optimize performance based on real-time system feedback.

Example of using `executeBulkOperations`:
```js
const operations: OperationInput[] = [
    {
      operationType: BulkOperationType.Create,
      partitionKey: "pkValue1",
      resourceBody: { id: "doc1", name: "sample1", key: "key1" },
    },
    {
      operationType: BulkOperationType.Create,
      partitionKey: "pkValue2",
      resourceBody: { id: "doc2", name: "sample2", key: "key1" },
    },
    // ...more operations
  ];
  const response = await container.items.executeBulkOperations(
    operations,
  );
  // process the response
```

#### Weighted RRF
Adds WeightedRankFusion query feature and support of component weights for weighted rank fusion in Hybrid Search.

#### Optimized query plan that skips the order by rewrite
Adds support for the optimized query plan that skips the order by rewrite. 
This optimization is enabled by default. Use flag `disableHybridSearchQueryPlanOptimization:true` in FeedOptions to disable this feature.

### Bugs Fixed
#### [#34088](https://github.com/Azure/azure-sdk-for-js/pull/34088) Fix documentation for default values of `useMultipleWriteLocations` and `enableBackgroundEndpointRefreshing`.
#### [#33869](https://github.com/Azure/azure-sdk-for-js/pull/33869) Fix ChangeFeed Iterator merge

### Other Changes
#### Migrated the codebase to ESM. This change is internal and should not affect customers.
#### Migrated tests to vitest.
#### [#34244](https://github.com/Azure/azure-sdk-for-js/pull/34244) Update murmurHash to use Uint8Array instead of Buffer.
#### [#33728](https://github.com/Azure/azure-sdk-for-js/pull/33728) Update Entra authentication samples

## 4.3.0 (2025-03-18)

### Features Added
#### Client-side Encryption (Preview) [#28760](https://github.com/Azure/azure-sdk-for-js/issues/28760)
Add support for Client-Side Encryption. Read more here: [docs](https://learn.microsoft.com/azure/cosmos-db/how-to-always-encrypted)
 
Example of using Client-Side Encryption:
 ```js
  const credentials = new DefaultAzureCredential();
  const keyResolver = new AzureKeyVaultEncryptionKeyResolver(credentials);
  const cosmosClient = new CosmosClient({connectionString: "<ConnectionString>", clientEncryptionOptions: { keyEncryptionKeyResolver: keyResolver }});
  const database = cosmosClient.database("my-database");
  const metadata: EncryptionKeyWrapMetadata = {
      type: EncryptionKeyResolverName.AzureKeyVault, 
      name: "akvKey", 
      value: "https://<my-key-vault>.vault.azure.net/keys/<key>/<version>",
      algorithm: KeyEncryptionAlgorithm.RSA_OAEP
  };

  await database.createClientEncryptionKey(
      "my-key",
      EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
      metadata);

  const path1 : ClientEncryptionIncludedPath = {
    path: "/property1",
    clientEncryptionKeyId: "my-key",
    encryptionType: EncryptionType.DETERMINISTIC,
    encryptionAlgorithm: EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
  };
  const path2 : ClientEncryptionIncludedPath = {
    path: "/property2",
    clientEncryptionKeyId: "my-key",
    encryptionType: EncryptionType.DETERMINISTIC,
    encryptionAlgorithm: EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
  };
  const paths = [path1, path2];
  const clientEncryptionPolicy = {
      includedPaths: [path],
      policyFormatVersion: 2,
  };
  const containerDefinition = {
      id: "my-container",
      partitionKey: {
        paths: ["/id"],
      },
      clientEncryptionPolicy: clientEncryptionPolicy,
  };
  await database.containers.createIfNotExists(containerDefinition);
 ```

#### New Query Pipeline
Introduced `enableQueryControl` flag to enhance query pipeline, giving users more control over their query execution.

By default, value of `enableQueryControl` is set as `false` keeping query pipeline older behavior as default, as explained below:

Previously, the SDK guaranteed that each fetchNext call would return `maxItemCount` number of results, provided those many results existed in the backend. While this behavior ensured a predictable output, the SDK may query backend partitions multiple times in a single `fetchNext` iteration. This can sometimes lead to higher RU consumption with no user control, especially when results are scattered across partitions. Also queries could run for extended periods as the SDK worked to fulfil the `maxItemCount` guarantee.

When `enableQueryControl` is set to `true`, Each `fetchNext` call will now query up to `maxDegreeOfParallelism` physical partitions. If no results are found, the SDK will return empty pages instead of continuing to search all partitions. Returning fewer or empty results in each iteration consumes less RUs and hands control back to the users, allowing them to decide whether to continue fetching more data. This approach provides more granular control over RU consumption.

Eg. usage of this flag to enable new query pipeline:
```js
const options : FeedOptions = {
  enableQueryControl: true, // Flag to enable new query pipeline. Default value is false
  maxItemCount: 100,
  maxDegreeOfParallelism: 10,
  forceQueryPlan: true,
}
const queryIterator = container.items.query("query text", options);
const res = await queryIterator.fetchNext();
```

#### Partition merge support
 This feature adds support for Partition merge (preview) feature. Requests from SDK will not be blocked, when the feature is enabled on the CosmosDB account. 
 Read more about merge here: [docs](https://learn.microsoft.com/azure/cosmos-db/merge)

#### RU Bucketing (Preview)
Read more about RU Bucketing here: https://aka.ms/cosmsodb-bucketing

#### Partial hierarchical partition key support in Change Feed [#27059](https://github.com/Azure/azure-sdk-for-js/issues/27059)
This feature adds support for partial hierarchical partition key in Change Feed allowing the SDK to work seamlessly with partial Hierarchical partition keys, returning accurate change feed results regardless of which partition key components are provided in the iterator. 

Eg. Container has partition key ["/name", "/zip", "/state"], change feed will work if, only value of name and zip is provided eg: ["john", "11011"]

#### Index Metrics V2 support
This feature adds support for V2 version of index metrics that returns the response in JSON format.

Example output of older version

```js
Index Utilization Information
  Utilized Single Indexes
    Index Spec: /Item/?
    Index Impact Score: High
    ---
    Index Spec: /Price/?
    Index Impact Score: High
    ---
  Potential Single Indexes
  Utilized Composite Indexes
  Potential Composite Indexes
    Index Spec: /Item ASC, /Price ASC
    Index Impact Score: High
    ---
```

Example output of version V2

```js
{"UtilizedIndexes":{"SingleIndexes":[{"IndexSpec":"/Item/?"},{"IndexSpec":"/Price/?"}],"CompositeIndexes":[]},"PotentialIndexes":{"SingleIndexes":[],"CompositeIndexes":[{"IndexSpecs":["/Item ASC","/Price ASC"],"IndexImpactScore":"High"}]}}
```

#### Add `connectionString` in CosmosClientOptions
ConnectionString can now be configured in CosmosClientOptions along with other configurations for client initialization.
Eg. usage: 
```js
const options = {
  connectionString: "<ConnectionString>",
  consistencyLevel: ConsistencyLevel.Strong
}
```

### Bugs Fixed

- Fixed issue for incorrect `ParallelizeCrossPartitionQuery` header value. It was set to true if `maxDegreeOfParallelism` was set to 0 or 1 in `FeedOptions` while executing a query. [#31232](https://github.com/Azure/azure-sdk-for-js/issues/31232)
- Fixed the issue for incorrect results in Changefeed in case of internal TimeoutErrors [#32652](https://github.com/Azure/azure-sdk-for-js/issues/32652)
- Fix RequestOptions and SharedOptions [#27336](https://github.com/Azure/azure-sdk-for-js/issues/27336)
- Set default values in RetryOptions [#27312](https://github.com/Azure/azure-sdk-for-js/issues/27312)
### Other Changes
- Deprecate the older `changeFeed` iterator in favor of the newer `getChangeFeedIterator()` method. [#32650](https://github.com/Azure/azure-sdk-for-js/issues/32650)

## 4.2.0 (2024-11-19)

### Features Added

- Full Text Support: This feature adds support for full text search policy and indexing policy. It also enables performing full text search queries. [docs](https://learn.microsoft.com/azure/cosmos-db/gen-ai/full-text-search)
- Hybrid Search Support: This feature adds support for performing hybrid search queries. [docs](https://learn.microsoft.com/azure/cosmos-db/gen-ai/hybrid-search)
- Added support for three optional properties to support `quantizedFlat` and `diskANN` vector indexing policies. The properties are: `quantizationByteSize`, `vectorIndexShardKey` and `indexingSearchListSize`.

## 4.1.1 (2024-08-30)

### Bugs Fixed

- Fixed a issue caused by accessing `process` without checking its existence in the global scope, it was leading to crashes in non-Node environments.
- The default value of `continueOnError` of BulkRequestOptions is now set to true. Pass `{ continueOnError: false }` in `bulkOptions` to stop executing operations when one fails.

## 4.1.0 (2024-08-07)

### Features Added

- Vector Search: This feature introduces vector indexes, vector embedding policy and vector queries to enable vector similarity search in JS SDK. [docs](https://learn.microsoft.com/azure/cosmos-db/nosql/vector-search)
- All versions and deletes mode in change feed: The All versions and deletes mode is added in change feed mode which captures every version and every change (create, update, and delete) made to items. [docs](https://learn.microsoft.com/azure/cosmos-db/nosql/change-feed-modes?tabs=all-versions-and-deletes#all-versions-and-deletes-change-feed-mode-preview)
- Bypassing integrated cache: The option to bypass integrated cache is now available in `RequestOptions`. [docs](https://learn.microsoft.com/azure/cosmos-db/integrated-cache#bypass-the-integrated-cache-preview)
- Computed Properties: Support for adding Computed Properties in items is added. [docs](https://learn.microsoft.com/azure/cosmos-db/nosql/query/computed-properties?tabs=dotnet#creating-computed-properties)
- Composite Indexing: The JS SDK now supports including composite indexes in the indexing policy, improving query performance on multiple fields. [docs](https://learn.microsoft.com/azure/cosmos-db/index-overview#composite-indexes)
- Correlated Activity Id: Correlated Activity Id is added in header of every query request on Items. This helps in troubleshooting by linking all requests for a query that involves multiple server interactions and partitions. Correlated Activity Id can be accessed through query response headers or `response.correlatedActivityId`.
- Split proof Bulk API: Earlier, whenever Bulk API encountered a partition split during processing, it would return an error message. Now, JS SDK ensures that the Bulk API is resistant to partition split. [#18682](https://github.com/Azure/azure-sdk-for-js/issues/18682)
- Improved samples: The samples have been updated in this release, now organized into two folders: `v3` for features up to the v3 release, and `v4` for features up to the v4 release.
- Added support for MakeList and MakeSet query aggregators

#### Vector Search

- The following sample shows how to create a container with vector embedding and indexing policies.

```js
// define vector indexing policy
const vectorEmbeddingPolicy = {
  vectorEmbeddings: [
    {
      path: "/vector1",
      dataType: VectorEmbeddingDataType.UInt8,
      dimensions: 1000,
      distanceFunction: VectorEmbeddingDistanceFunction.Euclidean,
    },
    {
      path: "/vector2",
      dataType: VectorEmbeddingDataType.Int8,
      dimensions: 200,
      distanceFunction: VectorEmbeddingDistanceFunction.DotProduct,
    },
    {
      path: "/vector3",
      dataType: VectorEmbeddingDataType.UInt8,
      dimensions: 400,
      distanceFunction: VectorEmbeddingDistanceFunction.Cosine,
    },
  ],
};

// add vector indexes in Indexing Policy
const indexingPolicy = {
  automatic: true,
  indexingMode: "consistent",
  vectorIndexes: [
    { path: "/vector1", type: VectorIndexType.Flat },
    { path: "/vector2", type: VectorIndexType.QuantizedFlat },
    { path: "/vector3", type: VectorIndexType.DiskANN },
  ],
};

// define and create container with vector Embedding Policy
const containerDefinition = {
  id: containerId,
  partitionKey: { paths: ["/id"] },
  indexingPolicy: indexingPolicy,
  vectorEmbeddingPolicy: vectorEmbeddingPolicy,
};
await database.containers.createIfNotExists(containerDefinition);
```

- Vector Search queries without TOP or LIMIT+OFFSET are blocked by default, with an option to disable this check using `allowUnboundedNonStreamingQueries` in query FeedOptions. Also added an internal buffer size check to prevent excessive memory consumption, throwing errors if the buffer size exceeds the default. The max buffer size can be increased using the `vectorSearchBufferSize` option from query FeedOptions.

#### Change Feed - All versions and deletes mode

- The AllVersionsAndDeletes mode is only supported with `ChangeFeedStartFrom.Now` and `ChangeFeedStartFrom.Continuation`.
- To read from the change feed in all versions and deletes mode, include `changeFeedMode` in changeFeedIteratorOptions:

```js
    const changeFeedIteratorOptions: ChangeFeedIteratorOptions = {
      maxItemCount: 5,
      changeFeedStartFrom: ChangeFeedStartFrom.Now(),
      changeFeedMode: ChangeFeedMode.AllVersionsAndDeletes,
    };
    const iterator = container.items.getChangeFeedIterator(changeFeedIteratorOptions);
```

#### Bypassing Integrated Cache

- Here is a sample showing how to enable `bypassIntegratedCache` in RequestOptions.

```js
  const options: RequestOptions = {bypassIntegratedCache: true};
  const response = await container.item("1").read(options);
```

#### Computed Properties

- The following snippet configures computed properties for a container:

```js
    const computedProperties: ComputedProperty[] = [{
      name: "lowerLastName",
      query:
        "SELECT VALUE LOWER(IS_DEFINED(c.lastName) ? c.lastName : c.parents[0].familyName) FROM c",
    },];
    const { resource: containerdef } = await database.containers.createIfNotExists({
      id: containerName,
      computedProperties: computedProperties,
      indexingPolicy: indexingPolicy,
    });
    const container: Container = database.container(containerdef.id);
```

#### Composite Indexing

- Here's a sample of adding composite indexes for a container:

```js
    const containerDefinition: ContainerDefinition = {
      id: "containerWithCompositeIndexingPolicy",
      indexingPolicy: {
        automatic: true,
        indexingMode: IndexingMode.consistent,
        includedPaths: [
          {
            path: "/*",
          },
        ],
        excludedPaths: [],
        compositeIndexes: [
          [
            { path: "/key", order: "ascending" },
            { path: "/field", order: "ascending" },
          ],
        ],
      },
    };
    await database.containers.create(containerDefinition);
```

- Added support for passing a custom `HttpClient` when constructing a `CosmosClient`.

### Breaking Changes

#### Dropped Support for TypeScript 4.1

- We have opted to discontinue support for TypeScript version 4.1. Consequently, the minimum supported TypeScript version has been elevated to 4.2. Kindly ensure that your environment is promptly updated to align with these changes.

### Bugs Fixed

- Fix Bulk operations(Read, Delete, and Patch) failing due to wrong format of partition key in non-partitioned container.

## 4.0.0 (2023-09-12)

🎉 v4 release! 🎉 Many new features, bug fixes, and a few breaking changes.

- Summary of new added features
  - Diagnostics: A diagnostic object has been added to responses of api operations ie. point lookups, bulk & batch operations, query and error responses, which contains information related to metadata lookups, retries, request and reponse latencies and payload siezes.
  - Hierarchical Partitioning: Containers with hierarchical partitions are now supported. [docs](https://learn.microsoft.com/azure/cosmos-db/hierarchical-partition-keys)
  - Index metrics: can be enabled to show both utilized indexed paths and recommended indexed paths. [docs](https://learn.microsoft.com/azure/cosmos-db/nosql/index-metrics?tabs=javascript)
  - New Changefeed iterator: which can consume changes for a specific partition key, a feed range or an entire container. [docs](https://learn.microsoft.com/azure/cosmos-db/nosql/change-feed-pull-model?tabs=JavaScript)
  - Priority based throttling is now supported. [docs](https://devblogs.microsoft.com/cosmosdb/introducing-priority-based-execution-in-azure-cosmos-db-preview/)

### New Features

#### Diagnostics

- Since `diagnostics` is added to all Response objects. You could programatically access `CosmosDiagnostic` as follows.

```js
  // For point look up operations
  const { container, diagnostics: containerCreateDiagnostic } =
    await database.containers.createIfNotExists({
      id: containerId,
      partitionKey: {
        paths: ["/key1"],
      },
  });

  // For Batch operations
   const operations: OperationInput[] = [
    {
      operationType: BulkOperationType.Create,
      resourceBody: { id: 'A', key: "A", school: "high" },
    },
  ];
  const response = await container.items.batch(operations, "A");
  const diagnostics = response.diagnostics

  // For Bulk operations
   const operations: OperationInput[] = [
    {
      operationType: BulkOperationType.Create,
      resourceBody: { id: 'A', key: "A", school: "high" },
    },
  ];
  const response = await container.items.bulk(operations);;
  const diagnostics = response.diagnostics

  // For query operations
  const queryIterator = container.items.query("select * from c");
  const { resources, diagnostics } = await queryIterator.fetchAll();

  // While error handling
  try {
    // Some operation that might fail
  } catch (err) {
    const diagnostics = err.diagnostics
  }
```

#### Hierarchical Partitioning

- Here is a sampele for creating container with Hierarchical Partitions

  ```js
  const containerDefinition = {
    id: "Test Database",
    partitionKey: {
      paths: ["/name", "/address/zip"],
      version: PartitionKeyDefinitionVersion.V2,
      kind: PartitionKeyKind.MultiHash,
    },
  };
  const { container } = await database.containers.createIfNotExists(containerDefinition);
  console.log(container.id);
  ```

- Definition of PartitionKey has been changed to support Hierarchical partitioning. Here is how to use the new definition.

  - The operations for which PartitionKey can be derived from Request body, providing PartitionKey is optional as always i.e
    ```js
    const item = {
      id: 1,
      name: "foo",
      address: {
        zip: 100,
      },
      active: true,
    };
    await container.items.create(item);
    ```
  - Here is sample for operations which require hierarchical partition to be passed.

    ```js
    await container.item("1", ["foo", 100]).read();
    ```

    OR

    ```js
    const partitionKey: PartitionKey = new PartitionKeyBuilder()
      .addValue("foo")
      .addValue(100)
      .build();
    await container.item("1", partitionKey).read();
    ```

  - If you are not using Hierarchical Partitioning feature, Definition of Partition Key is practically backward compatible.
    ```js
    await container.item("1", "1").read();
    ```

#### New Change feed Iterator

The v4 SDK now supports [Change feed pull model](https://learn.microsoft.com/azure/cosmos-db/nosql/change-feed-pull-model?tabs=JavaScript).

**_Note: There are no breaking changes, the old change feed iterator is still supported._**

Major Differences:

- The new iterator allows fetching change feed for a partition key, a feed range, or an entire container, compared to the older iterator, which was limited to fetching change feed for a partition key only.

- The new implementation is effectively an infinite list of items that encompasses all future writes and updates. The `hasMoreResults` property now always returns `true`, unlike the older implementation, which returned `false` when a `NotModified` status code was received from the backend.

Here is an example of creating and using the new change feed iterator:

```js
const changeFeedOptions = {
  changeFeedStartFrom: ChangeFeedStartFrom.Beginning("partition key or feed range"),
  maxItemCount: 10,
};
const iterator = container.items.getChangeFeedIterator(changeFeedOptions);
while (iterator.hasMoreResults) {
  const res = await iterator.readNext();
  // process res
}
```

#### Index Metrics [#20194](https://github.com/Azure/azure-sdk-for-js/issues/20194)

Azure Cosmos DB provides indexing metrics for optimizing query performance, especially when you're unsure about adjusting the indexing policy.
You can enable indexing metrics for a query by setting the PopulateIndexMetrics property to true(default=false).

```js
const { resources: resultsIndexMetrics, indexMetrics } = await container.items
  .query(querySpec, { populateIndexMetrics: true })
  .fetchAll();
```

We only recommend enabling the index metrics for troubleshooting query performance.

#### Enhanced Retry Utility for Improved SDK Reliability [#23475](https://github.com/Azure/azure-sdk-for-js/issues/23475)

Improved the retry utility to align with other language SDKs. Now, it automatically retries requests on the next available region when encountering HTTP 503 errors (Service Unavailable)
and handles HTTP timeouts more effectively, enhancing the SDK's reliability.

#### Priority based throttling [docs](https://devblogs.microsoft.com/cosmosdb/introducing-priority-based-execution-in-azure-cosmos-db-preview/) [#26393](https://github.com/Azure/azure-sdk-for-js/pull/26393/files)

Priority-based execution is a capability which allows users to specify priority for the request sent to Azure Cosmos DB. Based on the priority specified by the user, if there are more requests than the configured RU/s in a second, then Azure Cosmos DB will throttle low priority requests to allow high priority requests to execute.
You can enable priority based throttling by setting priorityLevel property.

```js
const response =
  (await container.item(document.id).read) < TestItem > { priorityLevel: PriorityLevel.Low };
```

### Bugs Fixed

- Updated response codes for the getDatabase() method. [#25932](https://github.com/Azure/azure-sdk-for-js/issues/25932)
- Fix Upsert operation failing when partition key of container is `/id` and `/id` is missing in the document. [#21383](https://github.com/Azure/azure-sdk-for-js/issues/21383)

### Breaking Changes

- The definition of PartitionKey is changed, PartitionKeyDefinition is now a independent type. [#23416](https://github.com/Azure/azure-sdk-for-js/issues/23416)

## 3.17.3 (2023-02-13)

### Features Added

- Changes in bulk api to honour size restictions (i.e 2Mb) while creating individual batches.[#23923](https://github.com/Azure/azure-sdk-for-js/issues/23923)
- Enriched Timeout error response. We had defined Timeout error as custom error in our sdk but we were not sending up any message along with it, now we are throwing the specific Error. [#23025](https://github.com/Azure/azure-sdk-for-js/issues/23025)
- Added functionality to delete entire data for a partition id. [#22091](https://github.com/Azure/azure-sdk-for-js/issues/22091)
- SDK now defines all possible error types, namely Export RestError, AbortError, TimeoutError, and ErrorResponse. [22789](https://github.com/Azure/azure-sdk-for-js/issues/22789)

### Bugs Fixed

- Removed excessive log warnings during bulk operations on a container with no partitionkey set.
- Fix issue with GlobalEndpointManager never making endpoints available after they fall-back [#22726](https://github.com/Azure/azure-sdk-for-js/issues/22726)
- Fix issue that caused parallel queries to break when returning a result of 0 or false. [#24493](https://github.com/Azure/azure-sdk-for-js/issues/24493)

### Other Changes

- Error handling guidelines are added in README.md

## 3.17.2 (2022-11-15)

### Bugs Fixed

- Fix issue with patch api not working with aadCredentials [#20689](https://github.com/Azure/azure-sdk-for-js/issues/20689)
- Improve the contract of Item.batch operation from type any to OperationResponse [#23652](https://github.com/Azure/azure-sdk-for-js/issues/20689)
- Add section for the current limitations with the SDK [#21650](https://github.com/Azure/azure-sdk-for-js/issues/21650)
- Fix issue aad refresh token automatically getting refreshed [#22620](https://github.com/Azure/azure-sdk-for-js/issues/22620)

## 3.17.1 (2022-09-12)

### Bugs Fixed

- Fix issue with unwanted runtime dependency on `@azure/identity` [#22968](https://github.com/Azure/azure-sdk-for-js/issues/22968)

## 3.17.0 (2022-08-19)

### Features Added

#### GA: Azure Cosmos DB Integrated Cache

- Support DedicatedGatewayRequestOptions and MaxIntegratedCacheStaleness [#21240](https://github.com/Azure/azure-sdk-for-js/pull/21240)
- Upgrade cosmos with azure core tracing [#22284](https://github.com/Azure/azure-sdk-for-js/pull/22284)
- Removed old logging and implement Azure core logging coverage [#18723](https://github.com/Azure/azure-sdk-for-js/pull/18723?)

### Bugs Fixed

- ParallelQueryExecutionContextBase breaks use of abortSignal [#18544](https://github.com/Azure/azure-sdk-for-js/pull/18544)
- Fixes id encoding issues when using special characters fo RoutingGateway

## 3.16.3 (2022-07-13)

### Bugs Fixed

- Fixes issues with "id" encoding when using special characters that should be allowed in the "id" property of a document. [#22548](https://github.com/Azure/azure-sdk-for-js/pull/22548)

## 3.16.2 (2022-06-24)

### Bugs Fixed

- Adds support to run queries with group by over a column with null values. [#22345](https://github.com/Azure/azure-sdk-for-js/pull/22345)

## 3.16.1 (2022-05-31)

### Bugs Fixed

- Fix [#22003](https://github.com/Azure/azure-sdk-for-js/issues/22003) missing interface error. [#22015](https://github.com/Azure/azure-sdk-for-js/pull/22015)

## 3.16.0 (2022-05-23)

### Features Added

- Allow users like cosmos-explorer to specify hierarchical partition keys. https://github.com/Azure/azure-sdk-for-js/pull/21934
- Support Dedicated Gateway RequestOptions and Max Integrated Cache Staleness. https://github.com/Azure/azure-sdk-for-js/pull/21240

## 3.15.1 (2022-01-24)

### Bugs Fixed

- Fixed the paths mapped by the `browser` entry in `package.json` to be correct for the package's new output structure. This solves errors with bundling the package for browsers.

## 3.15.0 (2021-11-22)

### Features Added

- _GA_ Adds `container.item(itemId).patch()`. `patch()` is an alternative to `replace()` for item updates. https://github.com/Azure/azure-sdk-for-js/pull/16264/files#diff-7caca690c469e2025576523c0377ac71815f001024fde7c48b20cd24adaa6977R561
- _GA_ support for Bulk operation PATCH.
- _GA_ support for Batch operation PATCH.
- Added the `SasTokenProperties` type and a `createAuthorizationSasToken` function to enable scoped access to Cosmos resources with SAS tokens. For an example that demonstrates creating a SAS token and using it to authenticate a `CosmosClient`, see [the `SasTokenAuth` sample](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v3/typescript/src/SasTokenAuth.ts).

### Other Changes

- Made several changes to the sample programs to improve code quality and compatibility with Node 12, and upgraded the sample programs' dependencies.

## 3.14.1 (2021-09-02)

### Bugs Fixed

- Fix @azure/core-rest-pipeline version for AAD auth.

## 3.14.0 (2021-09-01)

### Features Added

- _PREVIEW_ Adds `container.item(itemId).patch()`. `patch()` is an alternative to `replace()` for item updates. https://github.com/Azure/azure-sdk-for-js/pull/16264/files#diff-7caca690c469e2025576523c0377ac71815f001024fde7c48b20cd24adaa6977R561
- _PREVIEW_ Adds support for Bulk operation PATCH.
- _PREVIEW_ Adds support for Batch operation PATCH.

### Bugs Fixed

- Fixes bug where Batch was passing the wrong header for batch requests with partition keys
- Fixes 401s when using AAD auth. AAD credentials should now work and no longer cause 429s from @azure/identity at high throughput.

## 3.13.1 (2021-08-23)

### Bugs Fixed

- Fixed bugs in session token clearing logic. Session Not found (404, substatus 1002) was not being handled correctly by the session retry policy and would mistakenly retry the request with the same session token.

## 3.13.0 (2021-08-10)

### Features Added

- Adds TransactionalBatch to items `container.items.batch(operations)`

### Bugs Fixed

- Fixed bulk requests which had operations without partitionKey specified.

## 3.12.3 (2021-07-23)

### Bugs Fixed

- Fix bulk operations on containers with multiple partitions with nested partition keys

## 3.12.2 (2021-07-21)

### Features Added

- Adopted target ES2017 to reduce bundle size.

## 3.12.1 (2021-07-16)

### Bugs Fixed

- Returned default retryPolicy option `fixedRetryIntervalInMilliseconds` to its original default 0.

## 3.12.0 (2021-07-06)

### Features Added

- With the dropping of support for Node.js versions that are no longer in LTS, the dependency on `@types/node` has been updated to version 12. Read our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.
- Added background refresher for endpoints, and new `ConnectionPolicy` options. Refreshing defaults to true, and the default refresh rate is every 5 minutes.

```js
const client = new CosmosClient({
  endpoint,
  key: masterKey,
  connectionPolicy: {
    ...defaultConnectionPolicy,
    endpointRefreshRateInMs: 700,
    enableBackgroundEndpointRefreshing: true,
  },
});
```

- Added `client.dispose()` for closing the endpoint refresher verbosely. Necessary when destroying the CosmosClient inside existing processes like an express web server, or when you want to destroy the client and create a new one in the same process.

```js
const client = new CosmosClient();
client.dispose(); // cancels background endpoint refreshing
```

## 3.11.5 (2021-06-10)

### Features Added

### Breaking Changes

### Key Bugs Fixed

### Fixed

- BUGFIX: Adds another failover condition.

## 3.11.4 (2021-06-10)

- BUGFIX: Correctly failover to new regions when regional DNS has gone offline.

## 3.11.3 (2021-05-21)

- BUGFIX: Sanitize user endpoint URLs for AAD DataPlane RBAC token generation.

## 3.11.2 (2021-05-11)

- BUGFIX: Cache https client between requests.

## 3.11.1 (2021-05-06)

- BUGFIX: Import URL from Browser/Node shim rather than built-in module.

## 3.11.0 (2021-04-21)

- FEATURE: Internal client update. No user facing changes, but major version bump to be safe.

## 3.10.6 (2021-04-14)

- BUGFIX: Adds partitionKey parameter to `container.conflicts.delete`

## 3.10.5 (2021-03-25)

- BUGFIX: Pins node-abort-controller version as we depend on a type in v1.2.0.

## 3.10.4 (2021-03-23)

- FEATURE: Adds Bulk continueOnError option.

## 3.10.3 (2021-03-12)

- BUGFIX: Removes direct dependency on @azure/identity while retaining compatibility.

## 3.10.2 (2021-03-11)

- BUGFIX: Fixes @azure/identity dependency in dev deps.

## 3.10.1 (2021-03-10)

- BUGFIX: Autogenerates IDs for Upsert operations in bulk.

## 3.10.0 (2021-01-21)

- FEATURE: Adds AAD authentication via @azure/identity.

## 3.9.5 (2021-01-18)

- BUGFIX: Throws correct Invalid Continuation Token error when making request with malformed token
- BUGFIX: Defaults partitionKeyValue to `'[{}]'` when missing in Read/Delete bulk operations
- BUGFIX: Sums group by operations for cross-partition queries correctly with null values.

## 3.9.3 (2020-10-19)

- BUGFIX: Fixes bulk operations with top level partitionKey values that are undefined or null.

## 3.9.2 (2020-09-16)

- BUGFIX: Fixes slow `userAgent` lookup on azure functions.

## 3.9.1 (2020-08-28)

- BUGFIX: Fixes `OperationInput` type to be more accurate based on `OperationType`.
- FEATURE: Bulk requests with `Create` operations will now autogenerate IDs if they are not present.
- FEATURE: The `BulkOperationType` enum now exists and can be used when making bulk requests.

## 3.9.0 (2020-08-13)

- FEATURE: Adds support for autoscale parameters on container and database create methods

Note that `maxThroughput` cannot be passed with `throughput`.

```js
// correct
const containerDefinition = {
  id: "sample container",
  indexingPolicy: { indexingMode: IndexingMode.consistent },
  maxThroughput: 500,
  autoUpgradePolicy: {
    throughputPolicy: {
      incrementPercent: 15
    }
  }
};
database.container.create(containerDefinition)

// incorrect
const containerDefinition = {
  id: "sample container",
  indexingPolicy: { indexingMode: IndexingMode.consistent },
  throughput: 500, // do not specify throughput with maxThroughput
  maxThroughput: 500
  autoUpgradePolicy: {
    throughputPolicy: {
      incrementPercent: 15
    }
  }
};
database.container.create(containerDefinition)
```

## 3.8.2 (2020-08-12)

- BUGFIX: Fix checkURL function for Node 8

## 3.8.1 (2020-08-12)

- BUGFIX: Adds separate URL module for browser/node.

## 3.8.0 (2020-08-10)

- FEATURE: Throws when initializing ClientContext with an invalid endpoint
- FEATURE: Changes JSONArray type internal from Array to ArrayLike to avoid requiring type coercion for immutable data
- FEATURE: Adds bulk request to container.items. Allows aggregate bulk request for up to 100 operations on items with the types: Create, Upsert, Read, Replace, Delete

```js
// up to 100 operations
const operations: OperationInput[] = [
  {
    operationType: "Create",
    resourceBody: { id: "doc1", name: "sample", key: "A" },
  },
  {
    operationType: "Upsert",
    resourceBody: { id: "doc2", name: "other", key: "A" },
  },
  {
    operationType: "Read",
    id: "readItemId",
    partitionKey: "key",
  },
];

await database.container.items.bulk(operations);
```

## 3.7.4 (2020-06-30)

- BUGFIX: Properly escape ASCII "DEL" character in partition key header

## 3.7.3 (2020-06-29)

- BUGFIX: Cannot create item with automatic id generation and a container partitioned on ID (#9734)

## 3.7.2 (2020-06-16)

- BUGFIX: Internal abort signal incorrectly triggered when user passes a custom abort signal. See #9510 for details.

## 3.7.1 (2020-06-12)

- BUGFIX: Typo in globalCrypto.js causing errors in IE browser
- BUGFIX: Resource tokens not matching for item delete operations (#9110)

## 3.7.0 (2020-06-08)

- BUGFIX: Support crypto functions in Internet Explorer browser
- BUGFIX: Incorrect key casing in object returned by `setAuthorizationHeader`
- FEATURE: Adds `readOffer` methods to container and database
- FEATURE: Allows string value `partitionKey` parameter when creating containers

The following result in the same behavior:

```js
const containerDefinition = {
  id: "sample container",
  indexingPolicy: { indexingMode: IndexingMode.consistent },
  throughput: 400,
  partitionKey: { paths: ["/key"] }
};
database.container.create(containerDefinition);

// OR as a string

const containerDefinition = {
  id: "sample container",
  indexingPolicy: { indexingMode: IndexingMode.consistent },
  throughput: 400,
  partitionKey: "/key" } // must have leading slash "/"
};
database.container.create(containerDefinition);
```

## 3.6.3 (2020-04-08)

- FEATURE: Add `partitionKey` to `FeedOptions` for scoping a query to a single partition key value

@azure/cosmos V2 has two different but equivalent ways to specify the partition key for a query:

```js
// V2 These are effectively the same
container.items.query("SELECT * from c", { partitionKey: "foo" }).toArray();
container.items.query('SELECT * from c WHERE c.yourPartitionKey = "foo"').toArray();
```

In an effort to simplify, the V3 SDK removed `partitionKey` from `FeedOptions` so there was only one way to specify the partition key:

```js
// V3
container.items.query('SELECT * from c WHERE c.yourPartitionKey = "foo"').fetchAll();
```

Based on customer feedback, we identified scenarios where it still makes sense to support passing the partition key via `FeedOptions` and have decided to restore the behavior.

## 3.6.2 (2020-02-20)

- BUG FIX: Support signing in web workers where this === self

## 3.6.1 (2020-02-11)

- BUG FIX: Normalize location names when selecting endpoint. Allows passing of normalized endpoint names

## 3.6.0 (2020-02-10)

- FEATURE: Add support for spatial indexing, bounding boxes, and geospatial configuration
- BUG FIX: Fix bug when passing forceQueryPlan to QueryIterator for non-item resources (#7333)

## 3.5.4 (2020-01-28)

- BUG FIX: Return parsed number instead of string for request charge

## 3.5.3 (2020-01-06)

- BUG FIX: maxDegreeOfParallelism was defaulting to 1 and should default to the number of partitions of the collection
- BUG FIX: maxItemCount was defaulting to 10 and should default to undefined
- Set default TLS version to 1.2 (#6761)
- Use tslib 1.10.0 (#6710)
- Add partition key to code sample (#6612)

## 3.5.2 (2019-12-03)

- Fix handling of special characters in item ids when signing tokens in the browser (#6379)

## 3.5.1 (2019-11-25)

- Fix bug when paginating GROUP BY queries or using in conjunction with TOP/OFFSET/LIMIT (#6003)
- Improve error message for mixed type ORDER BY (#6306)

## 3.5.0 (2019-11-21)

- FEATURE: Endpoint discovery and multi-region failover improvements. See https://github.com/Azure/azure-sdk-for-js/pull/6283 for more information on this change. (#6283)
- Makes changeFeed and query options optional. Fix #6232 Fix #6277 (#6273)

## 3.4.2 (2019-11-07)

- Fixes bug where the query may throw a 410 error during a split operation. Instead, throw 503 (#6074)

## 3.4.1 (2019-11-05)

- Fix region drop failover scenario and add test (#5892)

## 3.4.0 (2019-10-28)

- FEATURE: GROUP BY query support (#5749)
- Update proxy-agent. Remove types folder (#5854)
- Typo: Fix "an" vs "a" (#5812)
- Update to Mocha 6.2.2 (#5824)
- Remove unused Range type (#5686)
- Remove universal-user-agent (#5869)

## 3.3.4 (2019-10-14)

- Query bug fix. Empty result last call not reporting proper RUs (#5517)
- Sign headers using internal package (#5523)
- Use internal digest function instead of crypto-hash package (#5493)
- Remove internal binary-search-bounds package (#5417)
- Fix atob bug impacting browser users (#5375)

## 3.3.2 (2019-10-03)

- Export TokenProvider and RequestInfo types (#5262)
- Remove atob package in favor of local version (#5334)
- Fix incorrect lib version in UserAgent (#5295)
- Allow zero for Item TTL (#5257)

## 3.3.0 (2019-09-24)

- FEATURE: Add userAgentSuffix to CosmosClient constructor options (#5068)
- Guard process.env to fix webpack issues (#5223)
- Fixes bug where initial QueryIterator promise was not being created (#5215)
- Fix aggregates bug when query was returning no results (#5184)
- sideEffects field set to false (#5022)

## 3.2.0 (2019-08-26)

- FEATURE: Endpoint resolution now blocks until initialized (#409)
- FEATURE: Add bufferItems support & other cross-partition perf improvements (#397)
- Fix missing AbortSignal type for users not targeting the DOM (#416)
- Add sample for bulk update with continuation token (#402)
- Export default partition key path (#405)

## 3.1.1 (2019-08-07)

- Fix bug where offset limit iterator was being called for each item under the offset count (#398)
- Add retry on EPIPE error (#400)

## 3.1.0 (2019-07-26)

- FEATURE: Set default ResponseContinuationTokenLimitInKB to 1kb. Prevents header limit errors (#384)
- Remove unused disableSSLVerification options (#388)

## 3.0.4 (2019-07-22)

- Allow initialHeaders to explicitly set partition key header (#383)
- Use package.json#files to prevent extraneous files from being pubished (#382)
- Fix for routing map sort error on older version of node+v8 (#378)
- Fixes bug when user supplies partial retry options. Close #377 (#379)
- README updates (#374)

## 3.0.3 (2019-07-17)

- Fix webpack usage. Prevent resolving modules called with `require` (#373)
- Various internal API cleanups and sample fixes

## 3.0.2 (2019-07-09)

Fixes a long outstanding bug where RUs were always being reported as 0 for aggregate queries (#366)

## 3.0.1 (2019-07-02)

Fixes broken session tokens in the browser. Cosmos uses file system friendly base64 to represent resources internally but does not work with the builtin browser atob function (#363)

## 3.0.0 (2019-06-28)

🎉 v3 release! 🎉 Many new features, bug fixes, and a few breaking changes. Primary goals of this release:

- Implement major new features:
  - DISTINCT queries
  - LIMIT/OFFSET queries
  - User cancelable requests
- Update to the latest Cosmos REST API version where [all containers have unlimited scale](https://learn.microsoft.com/azure/cosmos-db/migrate-containers-partitioned-to-nonpartitioned)
- Make it easier to use Cosmos from the browser
- Better align with the new [Azure JS SDK guidlines](https://azure.github.io/azure-sdk/typescript_introduction.html)

### Migration Guide for Breaking Changes

#### Improved Client Constructor Options (#246)

Constructor options have been simplified:

- `masterKey` was renamed `key` and moved to the top-level
- Properties previously under `options.auth` have moved to the top-level

```js
// v2
const client = new CosmosClient({
  endpoint: "https://your-database.cosmos.azure.com",
  auth: {
    masterKey: "your-primary-key",
  },
});

// v3
const client = new CosmosClient({
  endpoint: "https://your-database.cosmos.azure.com",
  key: "your-primary-key",
});
```

#### Simplified QueryIterator API (#238 #316)

In v2 there were many different ways to iterate or retrieve results from a query. We have attempted to simplify the v3 API and remove similar or duplciate APIs:

- Remove iterator.next() and iterator.current(). Use fetchNext() to get pages of results.
- Remove iterator.forEach(). Use async iterators instead.
- iterator.executeNext() renamed to iterator.fetchNext()
- iterator.toArray() renamed to iterator.fetchAll()
- Pages are now proper `Response` objects intead of plain JS objects

```js
const container = client.database(dbId).container(containerId)

// v2
container.items.query('SELECT * from c').toArray()
container.items.query('SELECT * from c').executeNext()
container.items.query('SELECT * from c').forEach(({ body: item }) => { console.log(item.id) })

// v3
container.items.query('SELECT * from c').fetchAll()
container.items.query('SELECT * from c').fetchNext()
for await(const { result: item } in client.databases.readAll().getAsyncIterator()) {
    console.log(item.id)
}
```

#### Simplified Partition Keys for Queries

v2 has two different but equivalent ways to specify the partition key for a query:

```js
// v2. These are effectively the same
container.items.query("SELECT * from c", { partitionKey: "foo" }).toArray();
container.items.query('SELECT * from c WHERE c.yourPartitionKey = "foo"').toArray();
```

v3 removed `partitionKey` from `FeedOptions` so there is now only one way to specify the partition key:

```js
// v3
container.items.query('SELECT * from c WHERE c.yourPartitionKey = "foo"').fetchAll();
```

#### Fixed Containers are now Paritioned (#308)

[The Cosmos service now supports partition keys on all containers, including those that were previously created as fixed containers](https://learn.microsoft.com/azure/cosmos-db/migrate-containers-partitioned-to-nonpartitioned). The v3 SDK updates to the latest API version that implements this change, but it is not breaking. If you do not supply a partition key for operations, we will default to a system key that works with all your existing containers and documents.

#### `upsert` removed for Stored Procedures (#356)

Previously `upsert` was allowed for non-partitioned collections, but with the API version update, all collections are partitioned so we removed it entirely.

#### Item reads will not throw on 404 (#343, Community Request)

```js
const container = client.database(dbId).container(containerId);

// v2
try {
  container.items.read(id, undefined);
} catch (e) {
  if (e.code === 404) {
    console.log("item not found");
  }
}

// v3
const { result: item } = container.items.read(id, undefined);
if (item === undefined) {
  console.log("item not found");
}
```

#### Default Multi Region Write (#335)

The SDK will now write to multiple regions by default if your database configuration supports it. This was previously opt-in behavior.

#### Proper Error Objects (#334, Community Request)

Failed requests now throw proper `Error` or subclasses of `Error`. Previously they threw plain JS objects.

### New Features

#### User Cancellable Requests (#263, Community Request)

The move to `fetch` internally allows us to use the browser `AbortController` API to support user cancellable operations. In the case of operations where multiple requests are potentially in progress (like cross partition queries), all requests for the operation will be canceled. Modern browser users will already have `AbortController`. Node.js users will need to use a [polyfill library](https://www.npmjs.com/package/node-abort-controller)

```js
const controller = new AbortController();
const { result: item } = await items.query("SELECT * from c", { abortSignal: controller.signal });
controller.abort();
```

#### Set throughput as part of db/container create operation (#220)

```js
const { database } = client.databases.create({ id: "my-database", throughput: 10000 });
database.containers.create({ id: "my-container", throughput: 10000 });
```

#### @azure/cosmos-sign (#213)

Header token generation was split out into a new library, @azure/cosmos-sign. Anyone calling the Cosmos REST API directly can use this to sign headers using the same code we call inside @azure/cosmos.

#### UUID for generated IDs (#355)

v2 had custom code to generate item IDs. We have switched to the well known and maintained community library `uuid`.

#### Connection Strings (#350, Community Request)

It is now possible to pass a connection string copied from the Azure portal:

```js
const client = new CosmosClient(
  "AccountEndpoint=https://test-account.documents.azure.com:443/;AccountKey=<KEY HERE>;",
);
```

#### Add DISTINCT and LIMIT/OFFSET queries (#306)

```js
const { results } = await items.query("SELECT DISTINCT VALUE r.name FROM ROOT").fetchAll();
const { results } = await items.query("SELECT * FROM root r OFFSET 1 LIMIT 2").fetchAll();
```

### Improved Browser Experience

While it was possible to use the v2 SDK in the browser it was not an ideal experience. You needed to polyfill several node.js built-in libraries and use a bundler like Webpack or Parcel. The v3 SDK makes the out of the box experience much better for browser users.

- Replace request internals with `fetch` (#245)
- Remove usage of Buffer (#330)
- Remove node builtin usage in favor of universal packages/APIs (#328)
- Switch to node-abort-controller (#294)

### Bug Fixes

- Fix offer read and bring back offer tests (#224)
- Fix EnableEndpointDiscovery (#207)
- Fix missing RUs on paginated results (#360)
- Expand SQL query parameter type (#346)
- Add ttl to ItemDefinition (#341)
- Fix CP query metrics (#311)
- Add activityId to FeedResponse (#293)
- Switch \_ts type from string to number (#252)(#295)
- Fix Request Charge Aggregation (#289)
- Allow blank string partition keys (#277)
- Add string to conflict query type (#237)
- Add uniqueKeyPolicy to container (#234)

### Engineering Systems

Not always the most visible changes, but they help our team ship better code, faster.

- Use rollup for production builds (#104)
- Update to Typescript 3.5 (#327)
- Convert to TS project references. Extract test folder (#270)
- Enable noUnusedLocals and noUnusedParameters (#275)
- Azure Pipelines YAML for CI builds (#298)

## 2.0.1 (2018-09-25)

- Fix type issue (See #141)

## 2.0.0 (2018-09-24)

- Multi-region Write support
- Shared resource response properties added to responses
- Changed query to allow for customer types for all Resource types
- Modified items.query to allow for cross partition query
- Misc fixes/doc updates

## 2.0.0-3 (2018-08-02)

- New object model
- Updated documentation and samples
- Improved types
- Added `createdIfNotExists` for database and container
- Added prettier
- Added public CI (Travis and VSTS)

## 2.0.0-0 (2018-08-01)

- Added Promise support
- Added token handler option for auth
- typings now emitted from source (moved source to TypeScript)
- Added CosmosClient (DocumentClient now considered deprecated)

## 1.14.4 (2018-05-03)

- npm documentation fixed.

## 1.14.3 (2018-05-03)

- Added support for default retries on connection issues.
- Added support to read collection change feed.
- Fixed session consistency bug that intermittently caused "read session not available".
- Added support for query metrics.
- Modified http Agent's maximum number of connections.

## 1.14.2 (2017-12-21)

- Updated documentation to use Azure Cosmos DB.
- Added Support for proxyUrl setting in ConnectionPolicy.

## 1.14.1 (2017-11-10)

- Minor fix for case sensitive file systems.

## 1.14.0 (2017-11-09)

- Adds support for Session Consistency.
- This SDK version requires the latest version of Azure Cosmos DB Emulator available for download from https://aka.ms/cosmosdb-emulator.

## 1.13.0 (2017-10-11)

- Splitproofed cross partition queries.
- Adds supports for resource link with leading and trailing slashes (and corresponding tests).

## 1.12.2 (2017-08-10)

- npm documentation fixed.

## 1.12.1 (2017-08-10)

- Fixed bug in executeStoredProcedure where documents involved had special unicode characters (LS, PS).
- Fixed bug in handling documents with unicode characters in partition key.
- Fixed support for creating collection with name media (github #114).
- Fixed support for permission authorization token (github #178).

## 1.12.0 (2017-05-10)

- Added support for Request Unit per Minute (RU/m) feature.
- Added support for a new consistency level called ConsistentPrefix.
- Added support for UriFactory.
- Fixed the unicode support bug (github #171)

## 1.11.0 (2017-03-16)

- Added the support for aggregation queries (COUNT, MIN, MAX, SUM, and AVG).
- Added the option for controlling degree of parallelism for cross partition queries.
- Added the option for disabling SSL verification when running against Emulator.
- Lowered minimum throughput on partitioned collections from 10,100 RU/s to 2500 RU/s.
- Fixed the continuation token bug for single partition collection (github #107).
- Fixed the executeStoredProcedure bug in handling 0 as single param (github #155).

## 1.10.2 (2017-01-27)

- Fixed user-agent header to include the SDK version.
- Minor code cleanup.

## 1.10.1 (2016-12-22)

- Disabling SSL verification when using the SDK to target the emulator(hostname=localhost).
- Added support for enabling script logging during stored procedure execution.

## 1.10.0 (2016-10-03)

- Added support for cross partition parallel queries.
- Added support for TOP/ORDER BY queries for partitioned collections.

## 1.9.0 (2016-07-07)

- Added retry policy support for throttled requests. (Throttled requests receive a request rate too large exception, error code 429.)
  By default, DocumentClient retries nine times for each request when error code 429 is encountered, honoring the retryAfter time in the response header.
  A fixed retry interval time can now be set as part of the RetryOptions property on the ConnectionPolicy object if you want to ignore the retryAfter time returned by server between the retries.
  DocumentClient now waits for a maximum of 30 seconds for each request that is being throttled (irrespective of retry count) and returns the response with error code 429.
  This time can also be overriden in the RetryOptions property on ConnectionPolicy object.

- DocumentClient now returns x-ms-throttle-retry-count and x-ms-throttle-retry-wait-time-ms as the response headers in every request to denote the throttle retry count and the cummulative time the request waited between the retries.

- The RetryOptions class was added, exposing the RetryOptions property on the ConnectionPolicy class that can be used to override some of the default retry options.

## 1.8.0 (2016-06-14)

- Added the support for geo-replicated database accounts.

## 1.7.0 (2016-04-26)

- Added the support for TimeToLive(TTL) feature for documents.

## 1.6.0 (2016-03-29)

- Added support for Partitioned Collections.
- Added support for new offer types.

## 1.5.6 (2016-03-08)

- Fixed RangePartitionResolver.resolveForRead bug where it was not returning links due to a bad concat of results.
- Move compareFunction from Range class to RangePartitionResolver class.

## 1.5.5 (2016-02-02)

- Fixed hashParitionResolver resolveForRead(): When no partition key supplied was throwing exception, instead of returning a list of all registered links.

## 1.5.4 (2016-02-01)

- Dedicated HTTPS Agent: Avoid modifying the global. Use a dedicated agent for all of the lib’s requests.

## 1.5.3 (2016-01-26)

- Properly handle dashes in the mediaIds.

## 1.5.2 (2016-01-22)

- Fix memory leak.

## 1.5.1 (2016-01-04)

- Renamed "Hash" directory to "hash".

## 1.5.0 (2015-12-31)

- Added client-side sharding support.
- Added hash partition resolver implementation.
- Added range partitoin resolver implementation.

## 1.4.0 (2015-10-06)

- Implement Upsert. New upsertXXX methods on documentClient.

## 1.3.0 (2015-10-06)

- Skipped to bring version numbers in alignment with other SDKs.

## 1.2.2 (2015-09-10)

- Split Q promises wrapper to new repository.
- Update to package file for npm registry.

## 1.2.1 (2015-08-15)

- Implements ID Based Routing.
- Fixes Issue [#49](https://github.com/Azure/azure-documentdb-node/issues/49) - current property conflicts with method current().

## 1.2.0 (2015-08-05)

- Added support for GeoSpatial index.
- Validates id property for all resources. Ids for resources cannot contain ?, /, #, \\, characters or end with a space.
- Adds new header "index transformation progress" to ResourceResponse.

## 1.1.0 (2015-07-09)

- Implements V2 indexing policy.

## 1.0.3 (2015-06-04)

- Issue [#40](https://github.com/Azure/azure-cosmosdb-node/issues/40) - Implemented eslint and grunt configurations in the core and promise SDK.

## 1.0.2 (2015-05-23)

- Issue [#45](https://github.com/Azure/azure-documentdb-node/issues/45) - Promises wrapper does not include header with error.

## 1.0.1 (2015-05-15)

- Implemented ability to query for conflicts by adding readConflicts, readConflictAsync, queryConflicts.
- Updated API documentation.
- Issue [#41](https://github.com/Azure/azure-documentdb-node/issues/41) - client.createDocumentAsync error.

Microsoft will provide notification at least **12 months** in advance of retiring an SDK in order to smooth the transition to a newer/supported version.

New features, functionality, and optimizations are only added to the current SDK. So it's recommended that you always upgrade to the latest SDK version as early as possible.

Any request to Cosmos DB using a retired SDK will be rejected by the service.

> [!WARNING]
> All versions **1.x** of the Cosmos JavaScript SDK for SQL API will be retired on **August 30, 2020**.
>
> <br/>

| Version                  | Release Date       | Retirement Date |
| ------------------------ | ------------------ | --------------- |
| [3.4.2](#3.4.2)          | November 7, 2019   | ---             |
| [3.4.1](#3.4.1)          | November 5, 2019   | ---             |
| [3.4.0](#3.4.0)          | October 28, 2019   | ---             |
| [3.3.6](#3.3.6)          | October 14, 2019   | ---             |
| [3.3.5](#3.3.5)          | October 14, 2019   | ---             |
| [3.3.4](#3.3.4)          | October 14, 2019   | ---             |
| [3.3.3](#3.3.3)          | October 3, 2019    | ---             |
| [3.3.2](#3.3.2)          | October 3, 2019    | ---             |
| [3.3.1](#3.3.1)          | October 1, 2019    | ---             |
| [3.3.0](#3.3.0)          | September 24, 2019 | ---             |
| [3.2.0](#3.2.0)          | August 26, 2019    | ---             |
| [3.1.1](#3.1.1)          | August 7, 2019     | ---             |
| [3.1.0](#3.1.0)          | July 26, 2019      | ---             |
| [3.0.4](#3.0.4)          | July 22, 2019      | ---             |
| [3.0.3](#3.0.3)          | July 17, 2019      | ---             |
| [3.0.2](#3.0.2)          | July 9, 2019       | ---             |
| [3.0.0](#3.0.0)          | June 28, 2019      | ---             |
| [2.1.5](#2.1.5)          | March 20, 2019     | ---             |
| [2.1.4](#2.1.4)          | March 15, 2019     | ---             |
| [2.1.3](#2.1.3)          | March 8, 2019      | ---             |
| [2.1.2](#2.1.2)          | January 28, 2019   | ---             |
| [2.1.1](#2.1.1)          | December 5, 2018   | ---             |
| [2.1.0](#2.1.0)          | December 4, 2018   | ---             |
| [2.0.5](#2.0.5)          | November 7, 2018   | ---             |
| [2.0.4](#2.0.4)          | October 30, 2018   | ---             |
| [2.0.3](#2.0.3)          | October 30, 2018   | ---             |
| [2.0.2](#2.0.2)          | October 10, 2018   | ---             |
| [2.0.1](#2.0.1)          | September 25, 2018 | ---             |
| [2.0.0](#2.0.0)          | September 24, 2018 | ---             |
| [2.0.0-3 (RC)](#2.0.0-3) | August 2, 2018     | ---             |
| [1.14.4](#1.14.4)        | May 03, 2018       | August 30, 2020 |
| [1.14.3](#1.14.3)        | May 03, 2018       | August 30, 2020 |
| [1.14.2](#1.14.2)        | December 21, 2017  | August 30, 2020 |
| [1.14.1](#1.14.1)        | November 10, 2017  | August 30, 2020 |
| [1.14.0](#1.14.0)        | November 9, 2017   | August 30, 2020 |
| [1.13.0](#1.13.0)        | October 11, 2017   | August 30, 2020 |
| [1.12.2](#1.12.2)        | August 10, 2017    | August 30, 2020 |
| [1.12.1](#1.12.1)        | August 10, 2017    | August 30, 2020 |
| [1.12.0](#1.12.0)        | May 10, 2017       | August 30, 2020 |
| [1.11.0](#1.11.0)        | March 16, 2017     | August 30, 2020 |
| [1.10.2](#1.10.2)        | January 27, 2017   | August 30, 2020 |
| [1.10.1](#1.10.1)        | December 22, 2016  | August 30, 2020 |
| [1.10.0](#1.10.0)        | October 03, 2016   | August 30, 2020 |
| [1.9.0](#1.9.0)          | July 07, 2016      | August 30, 2020 |
| [1.8.0](#1.8.0)          | June 14, 2016      | August 30, 2020 |
| [1.7.0](#1.7.0)          | April 26, 2016     | August 30, 2020 |
| [1.6.0](#1.6.0)          | March 29, 2016     | August 30, 2020 |
| [1.5.6](#1.5.6)          | March 08, 2016     | August 30, 2020 |
| [1.5.5](#1.5.5)          | February 02, 2016  | August 30, 2020 |
| [1.5.4](#1.5.4)          | February 01, 2016  | August 30, 2020 |
| [1.5.3](#1.5.2)          | January 26, 2016   | August 30, 2020 |
| [1.5.2](#1.5.2)          | January 22, 2016   | August 30, 2020 |
| [1.5.1](#1.5.1)          | January 4, 2016    | August 30, 2020 |
| [1.5.0](#1.5.0)          | December 31, 2015  | August 30, 2020 |
| [1.4.0](#1.4.0)          | October 06, 2015   | August 30, 2020 |
| [1.3.0](#1.3.0)          | October 06, 2015   | August 30, 2020 |
| [1.2.2](#1.2.2)          | September 10, 2015 | August 30, 2020 |
| [1.2.1](#1.2.1)          | August 15, 2015    | August 30, 2020 |
| [1.2.0](#1.2.0)          | August 05, 2015    | August 30, 2020 |
| [1.1.0](#1.1.0)          | July 09, 2015      | August 30, 2020 |
| [1.0.3](#1.0.3)          | June 04, 2015      | August 30, 2020 |
| [1.0.2](#1.0.2)          | May 23, 2015       | August 30, 2020 |
| [1.0.1](#1.0.1)          | May 15, 2015       | August 30, 2020 |
| [1.0.0](#1.0.0)          | April 08, 2015     | August 30, 2020 |
