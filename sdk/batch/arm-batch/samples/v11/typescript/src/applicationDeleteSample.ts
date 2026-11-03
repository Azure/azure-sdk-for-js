// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BatchManagementClient } from "@azure/arm-batch";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an application.
 *
 * @summary deletes an application.
 * x-ms-original-file: 2025-06-01/ApplicationDelete.json
 */
async function applicationDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  await client.application.delete("default-azurebatch-japaneast", "sampleacct", "app1");
}

async function main(): Promise<void> {
  await applicationDelete();
}

main().catch(console.error);
