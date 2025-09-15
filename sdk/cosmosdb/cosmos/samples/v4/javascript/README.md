---
page_type: sample
languages:
  - javascript
products:
  - azure-cosmos-db
urlFragment: cosmos-javascript
---

# Azure Cosmos DB client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Cosmos DB in some common scenarios.

| **File Name**                                                                                                               | **Description**                                                                                                       |
| --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [AlterQueryThroughput.js][alterquerythroughput]                                                                             | Updates a container offer to change query throughput.                                                                 |
| [Bulk.js][bulk]                                                                                                             | Shows a simple bulk call with each BulkOperation type.                                                                |
| [BulkUpdateWithSproc.js][bulkupdatewithsproc]                                                                               | Bulk Updates documents with a Stored Procedure. Prefer `container.items().bulk()` to this behavior.                   |
| [ChangeFeed.js][changefeed]                                                                                                 | Demonstrates using a ChangeFeed.                                                                                      |
| [ChangeFeedIterator/ChangeFeedHierarchicalPartitionKey.js][changefeediterator_changefeedhierarchicalpartitionkey]           | Demonstrates using a ChangeFeed for a partition key                                                                   |
| [ChangeFeedIterator/ChangeFeedIteratorAllVersionsAndDeletes.js][changefeediterator_changefeediteratorallversionsanddeletes] | Demonstrates using a ChangeFeed in AllVersionsAndDeletes mode for entire container, a partition key, and an epk range |
| [ChangeFeedIterator/ChangeFeedIteratorLatestVersion.js][changefeediterator_changefeediteratorlatestversion]                 | Demonstrates using a ChangeFeed in LatestVersion mode for entire container, a partition key, and an epk range         |
| [ClientSideEncryption.js][clientsideencryption]                                                                             | Client-Side Encryption                                                                                                |
| [ContainerManagement.js][containermanagement]                                                                               | Demonstrates container create, read, delete and reading all containers belonging to a database.                       |
| [DatabaseManagement.js][databasemanagement]                                                                                 | Demonstrates database create, read, delete and reading all databases.                                                 |
| [Diagnostics.js][diagnostics]                                                                                               | Demonstrates usage of CosmosDiagnostic Object.                                                                        |
| [EntraAuth.js][entraauth]                                                                                                   | Uses Entra Auth credentials to authenticate with the CosmosClient.                                                    |
| [ExcludedLocations.js][excludedlocations]                                                                                   | Demonstrates Cosmos DB operations with excluded regions/locations.                                                    |
| [ExecuteBulkOperations.js][executebulkoperations]                                                                           | Shows CRUD operations using executeBulkOperations API.                                                                |
| [HierarchicalPartitioning.js][hierarchicalpartitioning]                                                                     | Shows various operations on containers with Hierarchical Partitioning.                                                |
| [IndexManagement.js][indexmanagement]                                                                                       | Shows various ways to manage indexing items or changing container index policies.                                     |
| [ItemManagement.js][itemmanagement]                                                                                         | Demonstrates item creation, read, delete and reading all items belonging to a container.                              |
| [QueryThroughput.js][querythroughput]                                                                                       | Demonstrates query throughput scenarios.                                                                              |
| [Query/FullTextSearch.js][query_fulltextsearch]                                                                             | Demonstrates full text search queries.                                                                                |
| [SasTokenAuth.js][sastokenauth]                                                                                             | Demonstrates using SasTokens for granting scoped access to Cosmos resources. _Private feature_                        |
| [ServerSideScripts.js][serversidescripts]                                                                                   | Demonstrates using stored procedures for server side run functions                                                    |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure Cosmos DB account][createinstance_azurecosmosdbaccount]

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

3. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node AlterQueryThroughput.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env COSMOS_KEY="<cosmos key>" COSMOS_ENDPOINT="<cosmos endpoint>" COSMOS_DATABASE="<cosmos database>" COSMOS_CONTAINER="<cosmos container>" node AlterQueryThroughput.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[alterquerythroughput]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v4/javascript/AlterQueryThroughput.js
[bulk]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v4/javascript/Bulk.js
[bulkupdatewithsproc]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v4/javascript/BulkUpdateWithSproc.js
[changefeed]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v4/javascript/ChangeFeed.js
[changefeediterator_changefeedhierarchicalpartitionkey]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v4/javascript/ChangeFeedIterator/ChangeFeedHierarchicalPartitionKey.js
[changefeediterator_changefeediteratorallversionsanddeletes]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v4/javascript/ChangeFeedIterator/ChangeFeedIteratorAllVersionsAndDeletes.js
[changefeediterator_changefeediteratorlatestversion]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v4/javascript/ChangeFeedIterator/ChangeFeedIteratorLatestVersion.js
[clientsideencryption]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v4/javascript/ClientSideEncryption.js
[containermanagement]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v4/javascript/ContainerManagement.js
[databasemanagement]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v4/javascript/DatabaseManagement.js
[diagnostics]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v4/javascript/Diagnostics.js
[entraauth]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v4/javascript/EntraAuth.js
[excludedlocations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v4/javascript/ExcludedLocations.js
[executebulkoperations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v4/javascript/ExecuteBulkOperations.js
[hierarchicalpartitioning]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v4/javascript/HierarchicalPartitioning.js
[indexmanagement]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v4/javascript/IndexManagement.js
[itemmanagement]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v4/javascript/ItemManagement.js
[querythroughput]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v4/javascript/QueryThroughput.js
[query_fulltextsearch]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v4/javascript/Query/FullTextSearch.js
[sastokenauth]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v4/javascript/SasTokenAuth.js
[serversidescripts]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v4/javascript/ServerSideScripts.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/cosmos
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurecosmosdbaccount]: https://learn.microsoft.com/azure/cosmos-db/how-to-manage-database-account#create-an-account
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cosmosdb/cosmos/README.md
