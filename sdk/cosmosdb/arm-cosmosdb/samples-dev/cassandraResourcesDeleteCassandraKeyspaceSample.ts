// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes an existing Azure Cosmos DB Cassandra keyspace.
 *
 * @summary Deletes an existing Azure Cosmos DB Cassandra keyspace.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/stable/2025-04-15/examples/CosmosDBCassandraKeyspaceDelete.json
 */

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function cosmosDbCassandraKeyspaceDelete(): Promise<void> {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const keyspaceName = "keyspaceName";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result =
    await client.cassandraResources.beginDeleteCassandraKeyspaceAndWait(
      resourceGroupName,
      accountName,
      keyspaceName,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbCassandraKeyspaceDelete();
}

main().catch(console.error);
