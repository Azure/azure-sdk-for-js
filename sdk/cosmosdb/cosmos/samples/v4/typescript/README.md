---
page_type: sample
languages:
  - typescript
products:
  - azure-cosmos-db
urlFragment: cosmos-typescript
---

# Azure Cosmos DB client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for Azure Cosmos DB in some common scenarios.

| **File Name**                                                                                                               | **Description**                                                                                                       |
| --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [AlterQueryThroughput.ts][alterquerythroughput]                                                                             | Updates a container offer to change query throughput.                                                                 |
| [Bulk.ts][bulk]                                                                                                             | Shows a simple bulk call with each BulkOperation type.                                                                |
| [BulkUpdateWithSproc.ts][bulkupdatewithsproc]                                                                               | Bulk Updates documents with a Stored Procedure. Prefer `container.items().bulk()` to this behavior.                   |
| [ChangeFeed.ts][changefeed]                                                                                                 | Demonstrates using a ChangeFeed.                                                                                      |
| [ChangeFeedIterator/ChangeFeedHierarchicalPartitionKey.ts][changefeediterator_changefeedhierarchicalpartitionkey]           | Demonstrates using a ChangeFeed for a partition key                                                                   |
| [ChangeFeedIterator/ChangeFeedIteratorAllVersionsAndDeletes.ts][changefeediterator_changefeediteratorallversionsanddeletes] | Demonstrates using a ChangeFeed in AllVersionsAndDeletes mode for entire container, a partition key, and an epk range |
| [ChangeFeedIterator/ChangeFeedIteratorLatestVersion.ts][changefeediterator_changefeediteratorlatestversion]                 | Demonstrates using a ChangeFeed in LatestVersion mode for entire container, a partition key, and an epk range         |
| [ClientSideEncryption.ts][clientsideencryption]                                                                             | Client-Side Encryption                                                                                                |
| [ContainerManagement.ts][containermanagement]                                                                               | Demonstrates container create, read, delete and reading all containers belonging to a database.                       |
| [DatabaseManagement.ts][databasemanagement]                                                                                 | Demonstrates database create, read, delete and reading all databases.                                                 |
| [Diagnostics.ts][diagnostics]                                                                                               | Demonstrates usage of CosmosDiagnostic Object.                                                                        |
| [EntraAuth.ts][entraauth]                                                                                                   | Uses Entra Auth credentials to authenticate with the CosmosClient.                                                    |
| [ExcludedLocations.ts][excludedlocations]                                                                                   | Demonstrates Cosmos DB operations with excluded regions/locations.                                                    |
| [ExecuteBulkOperations.ts][executebulkoperations]                                                                           | Shows CRUD operations using executeBulkOperations API.                                                                |
| [HierarchicalPartitioning.ts][hierarchicalpartitioning]                                                                     | Shows various operations on containers with Hierarchical Partitioning.                                                |
| [IndexManagement.ts][indexmanagement]                                                                                       | Shows various ways to manage indexing items or changing container index policies.                                     |
| [ItemManagement.ts][itemmanagement]                                                                                         | Demonstrates item creation, read, delete and reading all items belonging to a container.                              |
| [QueryThroughput.ts][querythroughput]                                                                                       | Demonstrates query throughput scenarios.                                                                              |
| [Query/FullTextSearch.ts][query_fulltextsearch]                                                                             | Demonstrates full text search queries.                                                                                |
| [SasTokenAuth.ts][sastokenauth]                                                                                             | Demonstrates using SasTokens for granting scoped access to Cosmos resources. _Private feature_                        |
| [ServerSideScripts.ts][serversidescripts]                                                                                   | Demonstrates using stored procedures for server side run functions                                                    |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

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

2. Compile the samples:

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/AlterQueryThroughput.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env COSMOS_KEY="<cosmos key>" COSMOS_ENDPOINT="<cosmos endpoint>" COSMOS_DATABASE="<cosmos database>" COSMOS_CONTAINER="<cosmos container>" node dist/AlterQueryThroughput.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[alterquerythroughput]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v4/typescript/src/AlterQueryThroughput.ts
[bulk]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v4/typescript/src/Bulk.ts
[bulkupdatewithsproc]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v4/typescript/src/BulkUpdateWithSproc.ts
[changefeed]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v4/typescript/src/ChangeFeed.ts
[changefeediterator_changefeedhierarchicalpartitionkey]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v4/typescript/src/ChangeFeedIterator/ChangeFeedHierarchicalPartitionKey.ts
[changefeediterator_changefeediteratorallversionsanddeletes]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v4/typescript/src/ChangeFeedIterator/ChangeFeedIteratorAllVersionsAndDeletes.ts
[changefeediterator_changefeediteratorlatestversion]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v4/typescript/src/ChangeFeedIterator/ChangeFeedIteratorLatestVersion.ts
[clientsideencryption]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v4/typescript/src/ClientSideEncryption.ts
[containermanagement]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v4/typescript/src/ContainerManagement.ts
[databasemanagement]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v4/typescript/src/DatabaseManagement.ts
[diagnostics]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v4/typescript/src/Diagnostics.ts
[entraauth]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v4/typescript/src/EntraAuth.ts
[excludedlocations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v4/typescript/src/ExcludedLocations.ts
[executebulkoperations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v4/typescript/src/ExecuteBulkOperations.ts
[hierarchicalpartitioning]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v4/typescript/src/HierarchicalPartitioning.ts
[indexmanagement]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v4/typescript/src/IndexManagement.ts
[itemmanagement]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v4/typescript/src/ItemManagement.ts
[querythroughput]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v4/typescript/src/QueryThroughput.ts
[query_fulltextsearch]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v4/typescript/src/Query/FullTextSearch.ts
[sastokenauth]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v4/typescript/src/SasTokenAuth.ts
[serversidescripts]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v4/typescript/src/ServerSideScripts.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/cosmos
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurecosmosdbaccount]: https://learn.microsoft.com/azure/cosmos-db/how-to-manage-database-account#create-an-account
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cosmosdb/cosmos/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
