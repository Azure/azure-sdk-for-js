// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BatchManagementClient } from "@azure/arm-batch";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an application package record and its associated binary file.
 *
 * @summary deletes an application package record and its associated binary file.
 * x-ms-original-file: 2025-06-01/ApplicationPackageDelete.json
 */
async function applicationPackageDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  await client.applicationPackage.delete("default-azurebatch-japaneast", "sampleacct", "app1", "1");
}

async function main(): Promise<void> {
  await applicationPackageDelete();
}

main().catch(console.error);
