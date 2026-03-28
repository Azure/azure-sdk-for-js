// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the SQL userDefinedFunction under an existing Azure Cosmos DB database account.
 *
 * @summary gets the SQL userDefinedFunction under an existing Azure Cosmos DB database account.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBSqlUserDefinedFunctionGet.json
 */
async function cosmosDBSqlUserDefinedFunctionGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.sqlResources.getSqlUserDefinedFunction(
    "rgName",
    "ddb1",
    "databaseName",
    "containerName",
    "userDefinedFunctionName",
  );
  console.log(result);
}

async function main() {
  await cosmosDBSqlUserDefinedFunctionGet();
}

main().catch(console.error);
