// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the ClientEncryptionKeys under an existing Azure Cosmos DB SQL database.
 *
 * @summary lists the ClientEncryptionKeys under an existing Azure Cosmos DB SQL database.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBSqlClientEncryptionKeysList.json
 */
async function cosmosDBClientEncryptionKeysList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sqlResources.listClientEncryptionKeys(
    "rgName",
    "accountName",
    "databaseName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await cosmosDBClientEncryptionKeysList();
}

main().catch(console.error);
