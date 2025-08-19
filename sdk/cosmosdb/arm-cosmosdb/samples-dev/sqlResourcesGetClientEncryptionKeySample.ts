// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the ClientEncryptionKey under an existing Azure Cosmos DB SQL database.
 *
 * @summary Gets the ClientEncryptionKey under an existing Azure Cosmos DB SQL database.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/stable/2025-04-15/examples/CosmosDBSqlClientEncryptionKeyGet.json
 */

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function cosmosDbClientEncryptionKeyGet(): Promise<void> {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subId";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rgName";
  const accountName = "accountName";
  const databaseName = "databaseName";
  const clientEncryptionKeyName = "cekName";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.sqlResources.getClientEncryptionKey(
    resourceGroupName,
    accountName,
    databaseName,
    clientEncryptionKeyName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbClientEncryptionKeyGet();
}

main().catch(console.error);
