// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ThroughputSettingsUpdateParameters} from "@azure/arm-cosmosdb";
import {
  CosmosDBManagementClient,
} from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Update RUs per second of an Azure Cosmos DB Cassandra Keyspace
 *
 * @summary Update RUs per second of an Azure Cosmos DB Cassandra Keyspace
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/stable/2025-10-15/examples/CosmosDBCassandraKeyspaceThroughputUpdate.json
 */
async function cosmosDbCassandraKeyspaceThroughputUpdate(): Promise<void> {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const keyspaceName = "keyspaceName";
  const updateThroughputParameters: ThroughputSettingsUpdateParameters = {
    location: "West US",
    resource: { throughput: 400 },
    tags: {},
  };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result =
    await client.cassandraResources.beginUpdateCassandraKeyspaceThroughputAndWait(
      resourceGroupName,
      accountName,
      keyspaceName,
      updateThroughputParameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbCassandraKeyspaceThroughputUpdate();
}

main().catch(console.error);
