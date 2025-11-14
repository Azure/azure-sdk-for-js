// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  CassandraKeyspaceCreateUpdateParameters} from "@azure/arm-cosmosdb";
import {
  CosmosDBManagementClient,
} from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create or update an Azure Cosmos DB Cassandra keyspace
 *
 * @summary Create or update an Azure Cosmos DB Cassandra keyspace
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/stable/2025-10-15/examples/CosmosDBCassandraKeyspaceCreateUpdate.json
 */
async function cosmosDbCassandraKeyspaceCreateUpdate(): Promise<void> {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const keyspaceName = "keyspaceName";
  const createUpdateCassandraKeyspaceParameters: CassandraKeyspaceCreateUpdateParameters =
    {
      location: "West US",
      options: {},
      resource: { id: "keyspaceName" },
      tags: {},
    };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result =
    await client.cassandraResources.beginCreateUpdateCassandraKeyspaceAndWait(
      resourceGroupName,
      accountName,
      keyspaceName,
      createUpdateCassandraKeyspaceParameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbCassandraKeyspaceCreateUpdate();
}

main().catch(console.error);
