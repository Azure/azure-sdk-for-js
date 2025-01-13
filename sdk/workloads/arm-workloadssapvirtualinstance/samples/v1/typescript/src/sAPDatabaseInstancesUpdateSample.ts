// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadsClient } from "@azure/arm-workloadssapvirtualinstance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the Database resource.
 *
 * @summary updates the Database resource.
 * x-ms-original-file: 2024-09-01/SapDatabaseInstances_Update.json
 */
async function sAPDatabaseInstancesUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6d875e77-e412-4d7d-9af4-8895278b4443";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPDatabaseInstances.update("test-rg", "X00", "databaseServer", {
    tags: { key1: "value1" },
  });
  console.log(result);
}

async function main() {
  sAPDatabaseInstancesUpdate();
}

main().catch(console.error);
