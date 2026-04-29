// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update an Azure Cosmos DB SQL userDefinedFunction
 *
 * @summary create or update an Azure Cosmos DB SQL userDefinedFunction
 * x-ms-original-file: 2025-11-01-preview/CosmosDBSqlUserDefinedFunctionCreateUpdate.json
 */
async function cosmosDBSqlUserDefinedFunctionCreateUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.sqlResources.createUpdateSqlUserDefinedFunction(
    "rg1",
    "ddb1",
    "databaseName",
    "containerName",
    "userDefinedFunctionName",
    { options: {}, resource: { body: "body", id: "userDefinedFunctionName" } },
  );
  console.log(result);
}

async function main() {
  await cosmosDBSqlUserDefinedFunctionCreateUpdate();
}

main().catch(console.error);
