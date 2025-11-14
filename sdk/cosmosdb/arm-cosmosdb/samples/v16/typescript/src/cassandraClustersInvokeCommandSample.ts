// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CommandPostBody} from "@azure/arm-cosmosdb";
import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Invoke a command like nodetool for cassandra maintenance
 *
 * @summary Invoke a command like nodetool for cassandra maintenance
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/stable/2025-10-15/examples/CosmosDBManagedCassandraCommand.json
 */
async function cosmosDbManagedCassandraCommand(): Promise<void> {
  const subscriptionId =
    process.env["COSMOSDB_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["COSMOSDB_RESOURCE_GROUP"] || "cassandra-prod-rg";
  const clusterName = "cassandra-prod";
  const body: CommandPostBody = {
    command: "nodetool status",
    host: "10.0.1.12",
  };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.cassandraClusters.beginInvokeCommandAndWait(
    resourceGroupName,
    clusterName,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbManagedCassandraCommand();
}

main().catch(console.error);
