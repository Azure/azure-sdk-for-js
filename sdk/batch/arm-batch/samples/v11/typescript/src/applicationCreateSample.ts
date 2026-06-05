// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BatchManagementClient } from "@azure/arm-batch";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to adds an application to the specified Batch account.
 *
 * @summary adds an application to the specified Batch account.
 * x-ms-original-file: 2025-06-01/ApplicationCreate.json
 */
async function applicationCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.application.create(
    "default-azurebatch-japaneast",
    "sampleacct",
    "app1",
    { parameters: { allowUpdates: false, displayName: "myAppName" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await applicationCreate();
}

main().catch(console.error);
