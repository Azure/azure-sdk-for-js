// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Offline the specified region for the specified Azure Cosmos DB database account.
 *
 * @summary Offline the specified region for the specified Azure Cosmos DB database account.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/stable/2025-04-15/examples/CosmosDBDatabaseAccountOfflineRegion.json
 */

import {
  RegionForOnlineOffline,
  CosmosDBManagementClient,
} from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function cosmosDbDatabaseAccountOfflineRegion(): Promise<void> {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const regionParameterForOffline: RegionForOnlineOffline = {
    region: "North Europe",
  };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.databaseAccounts.beginOfflineRegionAndWait(
    resourceGroupName,
    accountName,
    regionParameterForOffline,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbDatabaseAccountOfflineRegion();
}

main().catch(console.error);
