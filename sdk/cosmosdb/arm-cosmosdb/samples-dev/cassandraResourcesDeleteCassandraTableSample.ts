// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes an existing Azure Cosmos DB Cassandra table.
 *
 * @summary Deletes an existing Azure Cosmos DB Cassandra table.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/stable/2025-04-15/examples/CosmosDBCassandraTableDelete.json
 */

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function cosmosDbCassandraTableDelete(): Promise<void> {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const keyspaceName = "keyspaceName";
  const tableName = "tableName";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result =
    await client.cassandraResources.beginDeleteCassandraTableAndWait(
      resourceGroupName,
      accountName,
      keyspaceName,
      tableName,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbCassandraTableDelete();
}

main().catch(console.error);
