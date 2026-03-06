// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BatchManagementClient } from "@azure/arm-batch";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates settings for the specified application.
 *
 * @summary updates settings for the specified application.
 * x-ms-original-file: 2025-06-01/ApplicationUpdate.json
 */
async function applicationUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.application.update(
    "default-azurebatch-japaneast",
    "sampleacct",
    "app1",
    { allowUpdates: true, defaultVersion: "2", displayName: "myAppName" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await applicationUpdate();
}

main().catch(console.error);
