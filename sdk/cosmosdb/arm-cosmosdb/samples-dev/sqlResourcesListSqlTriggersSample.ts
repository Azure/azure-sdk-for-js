// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the SQL trigger under an existing Azure Cosmos DB database account.
 *
 * @summary lists the SQL trigger under an existing Azure Cosmos DB database account.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBSqlTriggerList.json
 */
async function cosmosDBSqlTriggerList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sqlResources.listSqlTriggers(
    "rgName",
    "ddb1",
    "databaseName",
    "containerName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await cosmosDBSqlTriggerList();
}

main().catch(console.error);
