// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves continuous backup information for a container resource.
 *
 * @summary retrieves continuous backup information for a container resource.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBSqlContainerBackupInformation.json
 */
async function cosmosDBSqlContainerBackupInformation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.sqlResources.retrieveContinuousBackupInformation(
    "rgName",
    "ddb1",
    "databaseName",
    "containerName",
    { location: "North Europe" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBSqlContainerBackupInformation();
}

main().catch(console.error);
