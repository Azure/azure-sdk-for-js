## 3.0.2

Fixes a long outstanding bug where RUs were always being reported as 0 for aggregate queries (#366)

## 3.0.1

Fixes broken session tokens in the browser. Cosmos uses file system friendly base64 to represent resources internally but does not work with the builtin browser atob function (#363)

## 3.0.0

🎉 v3 release! 🎉 Many new features, bug fixes, and a few breaking changes. Primary goals of this release:

- Implement major new features:
  - DISTINCT queries
  - LIMIT/OFFSET queries
  - User cancelable requests
- Update to the latest Cosmos REST API version where [all containers have unlimited scale](https://docs.microsoft.com/en-us/azure/cosmos-db/migrate-containers-partitioned-to-nonpartitioned)
- Make it easier to use Cosmos from the browser
- Better align with the new [Azure JS SDK guidlines](https://azuresdkspecs.z5.web.core.windows.net/TypeScriptSpec.html)

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
    masterKey: "your-primary-key"
  }
});

// v3
const client = new CosmosClient({
  endpoint: "https://your-database.cosmos.azure.com",
  key: "your-primary-key"
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

#### Fixed Containers are now Paritioned (#308)

[The Cosmos service now supports partition keys on all containers, including those that were previously created as fixed containers](https://docs.microsoft.com/en-us/azure/cosmos-db/migrate-containers-partitioned-to-nonpartitioned). The v3 SDK updates to the latest API version that implements this change, but it is not breaking. If you do not supply a partition key for operations, we will default to a system key that works with all your existing containers and documents.

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
const client = new CosmosClient("AccountEndpoint=https://test-account.documents.azure.com:443/;AccountKey=<KEY HERE>;");
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

## Changes in 2.0.1

- Fix type issue (See #141)

## Changes in 2.0.0

- Multi-region Write support
- Shared resource response properties added to responses
- Changed query to allow for customer types for all Resource types
- Modified items.query to allow for cross partition query
- Misc fixes/doc updates

## Changes in 2.0.0-3

- New object model
- Updated documentation and samples
- Improved types
- Added `createdIfNotExists` for database and container
- Added prettier
- Added public CI (Travis and VSTS)

## Changes in 2.0.0-0

- Added Promise support
- Added token handler option for auth
- typings now emitted from source (moved source to TypeScript)
- Added CosmosClient (DocumentClient now considered deprecated)

## Changes in 1.14.4 :

- npm documentation fixed.

## Changes in 1.14.3 :

- Added support for default retries on connection issues.
- Added support to read collection change feed.
- Fixed session consistency bug that intermittently caused "read session not available".
- Added support for query metrics.
- Modified http Agent's maximum number of connections.

## Changes in 1.14.2 :

- Updated documentation to use Azure Cosmos DB.
- Added Support for proxyUrl setting in ConnectionPolicy.

## Changes in 1.14.1 :

- Minor fix for case sensitive file systems.

## Changes in 1.14.0 :

- Adds support for Session Consistency.
- This SDK version requires the latest version of Azure Cosmos DB Emulator available for download from https://aka.ms/cosmosdb-emulator.

## Changes in 1.13.0 :

- Splitproofed cross partition queries.
- Adds supports for resource link with leading and trailing slashes (and corresponding tests).

## Changes in 1.12.2 :

- npm documentation fixed.

## Changes in 1.12.1 :

- Fixed bug in executeStoredProcedure where documents involved had special unicode characters (LS, PS).
- Fixed bug in handling documents with unicode characters in partition key.
- Fixed support for creating collection with name media (github #114).
- Fixed support for permission authorization token (github #178).

## Changes in 1.12.0 :

- Added support for Request Unit per Minute (RU/m) feature.
- Added support for a new consistency level called ConsistentPrefix.
- Added support for UriFactory.
- Fixed the unicode support bug (github #171)

## Changes in 1.11.0 :

- Added the support for aggregation queries (COUNT, MIN, MAX, SUM, and AVG).
- Added the option for controlling degree of parallelism for cross partition queries.
- Added the option for disabling SSL verification when running against Emulator.
- Lowered minimum throughput on partitioned collections from 10,100 RU/s to 2500 RU/s.
- Fixed the continuation token bug for single partition collection (github #107).
- Fixed the executeStoredProcedure bug in handling 0 as single param (github #155).

## Changes in 1.10.2 :

- Fixed user-agent header to include the SDK version.
- Minor code cleanup.

## Changes in 1.10.1 :

- Disabling SSL verification when using the SDK to target the emulator(hostname=localhost).
- Added support for enabling script logging during stored procedure execution.

## Changes in 1.10.0 :

- Added support for cross partition parallel queries.
- Added support for TOP/ORDER BY queries for partitioned collections.

## Changes in 1.9.0 :

- Added retry policy support for throttled requests. (Throttled requests receive a request rate too large exception, error code 429.)
  By default, DocumentClient retries nine times for each request when error code 429 is encountered, honoring the retryAfter time in the response header.
  A fixed retry interval time can now be set as part of the RetryOptions property on the ConnectionPolicy object if you want to ignore the retryAfter time returned by server between the retries.
  DocumentClient now waits for a maximum of 30 seconds for each request that is being throttled (irrespective of retry count) and returns the response with error code 429.
  This time can also be overriden in the RetryOptions property on ConnectionPolicy object.

- DocumentClient now returns x-ms-throttle-retry-count and x-ms-throttle-retry-wait-time-ms as the response headers in every request to denote the throttle retry count and the cummulative time the request waited between the retries.

- The RetryOptions class was added, exposing the RetryOptions property on the ConnectionPolicy class that can be used to override some of the default retry options.

## Changes in 1.8.0 :

- Added the support for geo-replicated database accounts.

## Changes in 1.7.0 :

- Added the support for TimeToLive(TTL) feature for documents.

## Changes in 1.6.0 :

- Added support for Partitioned Collections.
- Added support for new offer types.

## Changes in 1.5.6 :

- Fixed RangePartitionResolver.resolveForRead bug where it was not returning links due to a bad concat of results.
- Move compareFunction from Range class to RangePartitionResolver class.

## Changes in 1.5.5 :

- Fixed hashParitionResolver resolveForRead(): When no partition key supplied was throwing exception, instead of returning a list of all registered links.

## Changes in 1.5.4 :

- Dedicated HTTPS Agent: Avoid modifying the global. Use a dedicated agent for all of the lib’s requests.

## Changes in 1.5.3 :

- Properly handle dashes in the mediaIds.

## Changes in 1.5.2 :

- Fix memory leak.

## Changes in 1.5.1 :

- Renamed "Hash" directory to "hash".

## Changes in 1.5.0 :

- Added client-side sharding support.
- Added hash partition resolver implementation.
- Added range partitoin resolver implementation.

## Changes in 1.4.0 :

- Implement Upsert. New upsertXXX methods on documentClient.

## Changes in 1.3.0 :

- Skipped to bring version numbers in alignment with other SDKs.

## Changes in 1.2.2 :

- Split Q promises wrapper to new repository.
- Update to package file for npm registry.

## Changes in 1.2.1 :

- Implements ID Based Routing.
- Fixes Issue [#49](https://github.com/Azure/azure-documentdb-node/issues/49) - current property conflicts with method current().

## Changes in 1.2.0 :

- Added support for GeoSpatial index.
- Validates id property for all resources. Ids for resources cannot contain ?, /, #, \\, characters or end with a space.
- Adds new header "index transformation progress" to ResourceResponse.

## Changes in 1.1.0 :

- Implements V2 indexing policy.

## Changes in 1.0.3 :

- Issue [#40](https://github.com/Azure/azure-documentdb-node/issues/40) - Implemented eslint and grunt configurations in the core and promise SDK.

## Changes in 1.0.2 :

- Issue [#45](https://github.com/Azure/azure-documentdb-node/issues/45) - Promises wrapper does not include header with error.

## Changes in 1.0.1 :

- Implemented ability to query for conflicts by adding readConflicts, readConflictAsync, queryConflicts.
- Updated API documentation.
- Issue [#41](https://github.com/Azure/azure-documentdb-node/issues/41) - client.createDocumentAsync error.
