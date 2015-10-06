## Changes in 1.4.0 : ##

- Implement Upsert. New upsertXXX methods on documentClient. 

## Changes in 1.3.0 : ##

- Skipped to bring version numbers in alignment with other SDKs

## Changes in 1.2.2 : ##

- Split Q promises wrapper to new repository
- Update to package file for npm registry

## Changes in 1.2.1 : ##

- Implements ID Based Routing
- Fixes Issue [#49](https://github.com/Azure/azure-documentdb-node/issues/49) - current property conflicts with method current()

## Changes in 1.2.0 : ##

- Added support for GeoSpatial index.
- Validates id property for all resources. Ids for resources cannot contain ?, /, #, \\, characters or end with a space. 
- Adds new header "index transformation progress" to ResourceResponse.

## Changes in 1.1.0 : ##

- Implements V2 indexing policy

## Changes in 1.0.3 : ##

- Issue [#40] (https://github.com/Azure/azure-documentdb-node/issues/40) - Implemented eslint and grunt configurations in the core and promise SDK

## Changes in 1.0.2 : ##

- Issue [#45](https://github.com/Azure/azure-documentdb-node/issues/45) - Promises wrapper does not include header with error.

## Changes in 1.0.1 : ##

- Implemented ability to query for conflicts by adding readConflicts, readConflictAsync, queryConflicts;
- Updated API documentation
- Issue [#41](https://github.com/Azure/azure-documentdb-node/issues/41) - client.createDocumentAsync error  
