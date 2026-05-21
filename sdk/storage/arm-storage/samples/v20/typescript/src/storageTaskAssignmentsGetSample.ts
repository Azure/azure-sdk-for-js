// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the storage task assignment properties
 *
 * @summary get the storage task assignment properties
 * x-ms-original-file: 2025-08-01/storageTaskAssignmentsCrud/GetStorageTaskAssignment.json
 */
async function getStorageTaskAssignment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1f31ba14-ce16-4281-b9b4-3e78da6e1616";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageTaskAssignments.get("res4228", "sto4445", "myassignment1");
  console.log(result);
}

async function main(): Promise<void> {
  await getStorageTaskAssignment();
}

main().catch(console.error);
