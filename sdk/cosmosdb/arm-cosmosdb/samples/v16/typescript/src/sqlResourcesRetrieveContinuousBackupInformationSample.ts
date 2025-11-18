// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ContinuousBackupRestoreLocation} from "@azure/arm-cosmosdb";
import {
  CosmosDBManagementClient,
} from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Retrieves continuous backup information for a container resource.
 *
 * @summary Retrieves continuous backup information for a container resource.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/stable/2025-10-15/examples/CosmosDBSqlContainerBackupInformation.json
 */
async function cosmosDbSqlContainerBackupInformation(): Promise<void> {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rgName";
  const accountName = "ddb1";
  const databaseName = "databaseName";
  const containerName = "containerName";
  const location: ContinuousBackupRestoreLocation = {
    location: "North Europe",
  };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result =
    await client.sqlResources.beginRetrieveContinuousBackupInformationAndWait(
      resourceGroupName,
      accountName,
      databaseName,
      containerName,
      location,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbSqlContainerBackupInformation();
}

main().catch(console.error);
