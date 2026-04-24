// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a deleted backup instance with name in a backup vault
 *
 * @summary gets a deleted backup instance with name in a backup vault
 * x-ms-original-file: 2025-07-01/DeletedBackupInstanceOperations/GetDeletedBackupInstance.json
 */
async function getDeletedBackupInstance(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.deletedBackupInstances.get(
    "000pikumar",
    "PratikPrivatePreviewVault1",
    "testInstance1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getDeletedBackupInstance();
}

main().catch(console.error);
