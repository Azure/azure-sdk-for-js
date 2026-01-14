// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the Cassandra keyspaces under an existing Azure Cosmos DB database account with the provided name.
 *
 * @summary Gets the Cassandra keyspaces under an existing Azure Cosmos DB database account with the provided name.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/CosmosDBCassandraKeyspaceGet.json
 */
async function cosmosDbCassandraKeyspaceGet(): Promise<void> {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const keyspaceName = "keyspaceName";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.cassandraResources.getCassandraKeyspace(
    resourceGroupName,
    accountName,
    keyspaceName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbCassandraKeyspaceGet();
}

main().catch(console.error);
