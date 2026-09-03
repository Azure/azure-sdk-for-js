// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to stops any active running storage action for the storage task assignment
 *
 * @summary stops any active running storage action for the storage task assignment
 * x-ms-original-file: 2026-04-01/storageTaskAssignmentsCrud/StopStorageTaskAssignment.json
 */
async function stopStorageTaskAssignment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1f31ba14-ce16-4281-b9b4-3e78da6e1616";
  const client = new StorageManagementClient(credential, subscriptionId);
  await client.storageTaskAssignments.stopAssignment("res4228", "sto4445", "myassignment1");
}

async function main(): Promise<void> {
  await stopStorageTaskAssignment();
}

main().catch(console.error);
