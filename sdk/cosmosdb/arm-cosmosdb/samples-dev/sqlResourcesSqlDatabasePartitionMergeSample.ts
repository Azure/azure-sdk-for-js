// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MergeParameters} from "@azure/arm-cosmosdb";
import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Merges the partitions of a SQL database
 *
 * @summary Merges the partitions of a SQL database
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/CosmosDBSqlDatabasePartitionMerge.json
 */
async function cosmosDbSqlDatabasePartitionMerge(): Promise<void> {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rgName";
  const accountName = "ddb1";
  const databaseName = "databaseName";
  const mergeParameters: MergeParameters = { isDryRun: false };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result =
    await client.sqlResources.beginSqlDatabasePartitionMergeAndWait(
      resourceGroupName,
      accountName,
      databaseName,
      mergeParameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbSqlDatabasePartitionMerge();
}

main().catch(console.error);
