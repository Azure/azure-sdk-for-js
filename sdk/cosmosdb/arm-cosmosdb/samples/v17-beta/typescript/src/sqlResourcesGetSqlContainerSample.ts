// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the SQL container under an existing Azure Cosmos DB database account.
 *
 * @summary gets the SQL container under an existing Azure Cosmos DB database account.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBSqlContainerGet.json
 */
async function cosmosDBSqlContainerGet(): Promise<void> {
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

async function main(): Promise<void> {
  await cosmosDBSqlContainerGet();
}

main().catch(console.error);
