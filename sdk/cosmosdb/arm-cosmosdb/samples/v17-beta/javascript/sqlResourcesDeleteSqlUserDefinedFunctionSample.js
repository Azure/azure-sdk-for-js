// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an existing Azure Cosmos DB SQL userDefinedFunction.
 *
 * @summary deletes an existing Azure Cosmos DB SQL userDefinedFunction.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBSqlUserDefinedFunctionDelete.json
 */
async function cosmosDBSqlUserDefinedFunctionDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.sqlResources.deleteSqlUserDefinedFunction(
    "rg1",
    "ddb1",
    "databaseName",
    "containerName",
    "userDefinedFunctionName",
  );
}

async function main() {
  await cosmosDBSqlUserDefinedFunctionDelete();
}

main().catch(console.error);
