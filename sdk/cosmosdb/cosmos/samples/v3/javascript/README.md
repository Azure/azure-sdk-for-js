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

| **File Name**                                                                 | **Description**                                                                                     |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [typescript/Shared/handleError.js][typescript_shared_handleerror]             | Demonstrates using SasTokens for granting scoped access to Cosmos resources. _Private feature_      |
| [typescript/src/AADAuth.js][typescript_src_aadauth]                           | Uses AAD credentials to authenticate with the CosmosClient.                                         |
| [typescript/src/AlterQueryThroughput.js][typescript_src_alterquerythroughput] | Updates a container offer to change query throughput.                                               |
| [typescript/src/Bulk.js][typescript_src_bulk]                                 | Shows a simple bulk call with each BulkOperation type.                                              |
| [typescript/src/BulkUpdateWithSproc.js][typescript_src_bulkupdatewithsproc]   | Bulk Updates documents with a Stored Procedure. Prefer `container.items().bulk()` to this behavior. |
| [typescript/src/ChangeFeed.js][typescript_src_changefeed]                     | Demonstrates using a ChangeFeed.                                                                    |
| [typescript/src/ContainerManagement.js][typescript_src_containermanagement]   | Demonstrates container create, read, delete and reading all containers belonging to a database.     |
| [typescript/src/DatabaseManagement.js][typescript_src_databasemanagement]     | Demonstrates database create, read, delete and reading all databases.                               |
| [typescript/src/IndexManagement.js][typescript_src_indexmanagement]           | Shows various ways to manage indexing items or changing container index policies.                   |
| [typescript/src/ItemManagement.js][typescript_src_itemmanagement]             | Demonstrates item creation, read, delete and reading all items belonging to a container.            |
| [typescript/src/QueryThroughput.js][typescript_src_querythroughput]           | Demonstrates query throughput scenarios.                                                            |
| [typescript/src/SasTokenAuth.js][typescript_src_sastokenauth]                 | Demonstrates using SasTokens for granting scoped access to Cosmos resources. _Private feature_      |
| [typescript/src/ServerSideScripts.js][typescript_src_serversidescripts]       | Demonstrates using stored procedures for server side run functions                                  |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

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
node typescript/Shared/handleError.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node typescript/Shared/handleError.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[typescript_shared_handleerror]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v3/javascript/typescript/Shared/handleError.js
[typescript_src_aadauth]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v3/javascript/typescript/src/AADAuth.js
[typescript_src_alterquerythroughput]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v3/javascript/typescript/src/AlterQueryThroughput.js
[typescript_src_bulk]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v3/javascript/typescript/src/Bulk.js
[typescript_src_bulkupdatewithsproc]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v3/javascript/typescript/src/BulkUpdateWithSproc.js
[typescript_src_changefeed]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v3/javascript/typescript/src/ChangeFeed.js
[typescript_src_containermanagement]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v3/javascript/typescript/src/ContainerManagement.js
[typescript_src_databasemanagement]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v3/javascript/typescript/src/DatabaseManagement.js
[typescript_src_indexmanagement]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v3/javascript/typescript/src/IndexManagement.js
[typescript_src_itemmanagement]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v3/javascript/typescript/src/ItemManagement.js
[typescript_src_querythroughput]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v3/javascript/typescript/src/QueryThroughput.js
[typescript_src_sastokenauth]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v3/javascript/typescript/src/SasTokenAuth.js
[typescript_src_serversidescripts]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v3/javascript/typescript/src/ServerSideScripts.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/cosmos
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurecosmosdbaccount]: https://docs.microsoft.com/azure/cosmos-db/how-to-manage-database-account#create-an-account
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cosmosdb/cosmos/README.md
