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
