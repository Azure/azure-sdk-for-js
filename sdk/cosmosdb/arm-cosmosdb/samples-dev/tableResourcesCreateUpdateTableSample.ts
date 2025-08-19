// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create or update an Azure Cosmos DB Table
 *
 * @summary Create or update an Azure Cosmos DB Table
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/stable/2025-04-15/examples/CosmosDBTableCreateUpdate.json
 */

import {
  TableCreateUpdateParameters,
  CosmosDBManagementClient,
} from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function cosmosDbTableReplace(): Promise<void> {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const tableName = "tableName";
  const createUpdateTableParameters: TableCreateUpdateParameters = {
    location: "West US",
    options: {},
    resource: { id: "tableName" },
    tags: {},
  };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.tableResources.beginCreateUpdateTableAndWait(
    resourceGroupName,
    accountName,
    tableName,
    createUpdateTableParameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbTableReplace();
}

main().catch(console.error);
