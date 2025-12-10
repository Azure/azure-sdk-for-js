// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  RetrieveThroughputParameters} from "@azure/arm-cosmosdb";
import {
  CosmosDBManagementClient,
} from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Retrieve throughput distribution for an Azure Cosmos DB SQL container
 *
 * @summary Retrieve throughput distribution for an Azure Cosmos DB SQL container
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/CosmosDBSqlContainerRetrieveThroughputDistribution.json
 */
async function cosmosDbSqlContainerRetrieveThroughputDistribution(): Promise<void> {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const databaseName = "databaseName";
  const containerName = "containerName";
  const retrieveThroughputParameters: RetrieveThroughputParameters = {
    resource: { physicalPartitionIds: [{ id: "0" }, { id: "1" }] },
  };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result =
    await client.sqlResources.beginSqlContainerRetrieveThroughputDistributionAndWait(
      resourceGroupName,
      accountName,
      databaseName,
      containerName,
      retrieveThroughputParameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbSqlContainerRetrieveThroughputDistribution();
}

main().catch(console.error);
