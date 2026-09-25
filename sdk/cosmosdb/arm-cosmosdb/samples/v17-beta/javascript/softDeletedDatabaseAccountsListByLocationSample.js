// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the soft-deleted Azure Cosmos DB database accounts available under the subscription and in a region. This call requires 'Microsoft.DocumentDB/locations/softDeletedDatabaseAccounts/read' permission.
 *
 * @summary lists all the soft-deleted Azure Cosmos DB database accounts available under the subscription and in a region. This call requires 'Microsoft.DocumentDB/locations/softDeletedDatabaseAccounts/read' permission.
 * x-ms-original-file: 2026-04-01-preview/CosmosDBSoftDeletedDatabaseAccountListByLocation.json
 */
async function cosmosDBSoftDeletedDatabaseAccountListByLocation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.softDeletedDatabaseAccounts.listByLocation("West US");
  console.log(result);
}

async function main() {
  await cosmosDBSoftDeletedDatabaseAccountListByLocation();
}

main().catch(console.error);
