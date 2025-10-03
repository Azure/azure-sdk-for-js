// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets deleted backup instances belonging to a backup vault
 *
 * @summary gets deleted backup instances belonging to a backup vault
 * x-ms-original-file: 2025-07-01/DeletedBackupInstanceOperations/ListDeletedBackupInstances.json
 */
async function listDeletedBackupInstancesInAVault(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new DataProtectionClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.deletedBackupInstances.list(
    "000pikumar",
    "PratikPrivatePreviewVault1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listDeletedBackupInstancesInAVault();
}

main().catch(console.error);
