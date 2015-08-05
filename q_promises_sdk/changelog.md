## Changes in 1.2.0 : ##

- Added support for GeoSpatial index.
- Validates id property for all resources. Ids for resources cannot contain ?, /, #, \\, characters or end with a space. 
- Adds new header "index transformation progress" to ResourceResponse.

## Changes in 1.1.0 : ##

- Implements V2 indexing policy

## Changes in 1.0.3 : ##

- Issue [#40] (https://github.com/Azure/azure-documentdb-node/issues/40) - Implemented eslint and grunt configurations in the core and promise SDK

## Changes in 1.0.2 : ##

- Resolved issue [#45](https://github.com/Azure/azure-documentdb-node/issues/45) - promises wrapper does not include header with error.

## Changes in 1.0.1 : ##

- Implemented ability to query for conflicts by adding readConflicts, readConflictAsync, queryConflicts;
- Updated API documentation
- Resolved issue [#41](https://github.com/Azure/azure-documentdb-node/issues/41) - client.createDocumentAsync error  
