// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all the storage task assignments in an account
 *
 * @summary list all the storage task assignments in an account
 * x-ms-original-file: 2025-08-01/storageTaskAssignmentsList/ListStorageTaskAssignmentsForAccount.json
 */
async function listStorageTaskAssignmentsForAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1f31ba14-ce16-4281-b9b4-3e78da6e1616";
  const client = new StorageManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.storageTaskAssignments.list("res4228", "sto4445")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listStorageTaskAssignmentsForAccount();
}

main().catch(console.error);
