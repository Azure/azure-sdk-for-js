// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Retrieves the properties of an existing Azure Cosmos DB restorable database account.  This call requires 'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/read/*' permission.
 *
 * @summary Retrieves the properties of an existing Azure Cosmos DB restorable database account.  This call requires 'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/read/*' permission.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/CosmosDBRestorableDatabaseAccountGet.json
 */
async function cosmosDbRestorableDatabaseAccountGet(): Promise<void> {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const location = "West US";
  const instanceId = "d9b26648-2f53-4541-b3d8-3044f4f9810d";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.restorableDatabaseAccounts.getByLocation(
    location,
    instanceId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbRestorableDatabaseAccountGet();
}

main().catch(console.error);
