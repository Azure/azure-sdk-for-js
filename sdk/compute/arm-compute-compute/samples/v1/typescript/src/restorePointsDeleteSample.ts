// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to delete the restore point.
 *
 * @summary the operation to delete the restore point.
 * x-ms-original-file: 2025-04-01/restorePointExamples/RestorePoint_Delete_MaximumSet_Gen.json
 */
async function restorePointDeleteMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.restorePoints.delete("rgcompute", "aaaaaaaaaaaaaaaaaaaaaa", "a");
}

/**
 * This sample demonstrates how to the operation to delete the restore point.
 *
 * @summary the operation to delete the restore point.
 * x-ms-original-file: 2025-04-01/restorePointExamples/RestorePoint_Delete_MinimumSet_Gen.json
 */
async function restorePointDeleteMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.restorePoints.delete("rgcompute", "aaaaaaaaaaaaaaaaa", "aaaaaaaaaaaaaaaaaaaaaaaa");
}

async function main(): Promise<void> {
  await restorePointDeleteMaximumSetGen();
  await restorePointDeleteMinimumSetGen();
}

main().catch(console.error);
