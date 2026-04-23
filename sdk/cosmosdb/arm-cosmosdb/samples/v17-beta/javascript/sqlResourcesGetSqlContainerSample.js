// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the SQL container under an existing Azure Cosmos DB database account.
 *
 * @summary gets the SQL container under an existing Azure Cosmos DB database account.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBSqlContainerGet.json
 */
async function cosmosDBSqlContainerGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.sqlResources.getSqlContainer(
    "rgName",
    "ddb1",
    "databaseName",
    "containerName",
  );
  console.log(result);
}

async function main() {
  await cosmosDBSqlContainerGet();
}

main().catch(console.error);
