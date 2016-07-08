## Changes in 1.9.0 : ##

- Added the retry policy support for throttle requests(Request Rate too large - Error code 429). By default, we now retry 9 times for each request when we get a 429, honoring the retryAfter time in the response header.
  We also allow setting a fixed retry interval time as part of the RetryOptions property on the ConnectionPolicy object if you want to ignore the retryAfter time returned by server between the retries. We will also 
  now wait for max 30 sec for each request that is being throttled(irrespective of retry count) and will return the request with a 429. This time can also be overriden in the RetryOptions property on ConnectionPolicy object.

- We also return x-ms-throttle-retry-count and x-ms-throttle-retry-wait-time-ms as the response headers in every request to denote the throttle retry count and the cummulative time the request waited between the retries.

- Introducing a RetryOptions class and exposing the RetryOptions property on ConnectionPolicy class that can be used to override some of the default retry options we set.

## Changes in 1.8.0 : ##

- Added the support for geo-replicated database accounts.

## Changes in 1.7.0 : ##

- Added the support for TimeToLive(TTL) feature for documents.

## Changes in 1.6.0 : ##

- Added support for Partitioned Collections.
- Added support for new offer types.

## Changes in 1.5.6 : ##

- Fixed RangePartitionResolver.resolveForRead bug where it was not returning links due to a bad concat of results.
- Move compareFunction from Range class to RangePartitionResolver class.

## Changes in 1.5.5 : ##

- Fixed hashParitionResolver resolveForRead(): When no partition key supplied was throwing exception, instead of returning a list of all registered links.

## Changes in 1.5.4 : ##

- Dedicated HTTPS Agent: Avoid modifying the global agent for DocumentDB purposes. Use a dedicated agent for all of the lib’s requests.

## Changes in 1.5.3 : ##

- Properly handle dashes in the mediaIds.

## Changes in 1.5.2 : ##

- Fix memory leak.

## Changes in 1.5.1 : ##

- Renamed "Hash" directory to "hash".

## Changes in 1.5.0 : ##

- Added client-side sharding support.
- Added hash partition resolver implementation.
- Added range partitoin resolver implementation.

## Changes in 1.4.0 : ##

- Implement Upsert. New upsertXXX methods on documentClient. 

## Changes in 1.3.0 : ##

- Skipped to bring version numbers in alignment with other SDKs.

## Changes in 1.2.2 : ##

- Split Q promises wrapper to new repository.
- Update to package file for npm registry.

## Changes in 1.2.1 : ##

- Implements ID Based Routing.
- Fixes Issue [#49](https://github.com/Azure/azure-documentdb-node/issues/49) - current property conflicts with method current().

## Changes in 1.2.0 : ##

- Added support for GeoSpatial index.
- Validates id property for all resources. Ids for resources cannot contain ?, /, #, \\, characters or end with a space. 
- Adds new header "index transformation progress" to ResourceResponse.

## Changes in 1.1.0 : ##

- Implements V2 indexing policy.

## Changes in 1.0.3 : ##

- Issue [#40] (https://github.com/Azure/azure-documentdb-node/issues/40) - Implemented eslint and grunt configurations in the core and promise SDK.

## Changes in 1.0.2 : ##

- Issue [#45](https://github.com/Azure/azure-documentdb-node/issues/45) - Promises wrapper does not include header with error.

## Changes in 1.0.1 : ##

- Implemented ability to query for conflicts by adding readConflicts, readConflictAsync, queryConflicts.
- Updated API documentation.
- Issue [#41](https://github.com/Azure/azure-documentdb-node/issues/41) - client.createDocumentAsync error.
