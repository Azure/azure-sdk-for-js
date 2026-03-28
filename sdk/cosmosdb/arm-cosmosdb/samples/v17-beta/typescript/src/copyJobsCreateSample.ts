// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a Copy Job.
 *
 * @summary creates a Copy Job.
 * x-ms-original-file: 2025-11-01-preview/copy-jobs/CosmosDBCopyJobCreate.json
 */
async function cosmosDBCopyJobCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.copyJobs.create("rg1", "ddb1", "j1", {
    properties: {
      jobProperties: {
        jobType: "NoSqlRUToNoSqlRU",
        tasks: [
          {
            destination: { containerName: "destTable1", databaseName: "destDB1" },
            source: { containerName: "sourceTable1", databaseName: "sourceDb1" },
          },
          {
            destination: { containerName: "destTable2", databaseName: "destDB2" },
            source: { containerName: "sourceTable2", databaseName: "sourceDb2" },
          },
        ],
      },
      mode: "Offline",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBCopyJobCreate();
}

main().catch(console.error);
