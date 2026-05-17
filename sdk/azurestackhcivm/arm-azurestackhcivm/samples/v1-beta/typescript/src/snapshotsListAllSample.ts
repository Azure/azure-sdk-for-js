// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIVMManagementClient } from "@azure/arm-azurestackhcivm";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all of the snapshots in the specified subscription. Use the nextLink property in the response to get the next page of snapshots.
 *
 * @summary lists all of the snapshots in the specified subscription. Use the nextLink property in the response to get the next page of snapshots.
 * x-ms-original-file: 2026-04-01-preview/Snapshots_ListAll.json
 */
async function listAllSnapshotsInASubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.snapshots.listAll()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllSnapshotsInASubscription();
}

main().catch(console.error);
