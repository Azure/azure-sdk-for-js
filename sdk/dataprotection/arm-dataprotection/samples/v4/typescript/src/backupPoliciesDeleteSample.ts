// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a backup policy belonging to a backup vault
 *
 * @summary deletes a backup policy belonging to a backup vault
 * x-ms-original-file: 2025-07-01/PolicyCRUD/DeleteBackupPolicy.json
 */
async function deleteBackupPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new DataProtectionClient(credential, subscriptionId);
  await client.backupPolicies.delete(
    "000pikumar",
    "PrivatePreviewVault",
    "OSSDBPolicy",
  );
}

async function main(): Promise<void> {
  await deleteBackupPolicy();
}

main().catch(console.error);
