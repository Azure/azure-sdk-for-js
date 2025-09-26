// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns list of backup policies belonging to a backup vault
 *
 * @summary returns list of backup policies belonging to a backup vault
 * x-ms-original-file: 2025-07-01/PolicyCRUD/ListBackupPolicy.json
 */
async function listBackupPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new DataProtectionClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.backupPolicies.list(
    "000pikumar",
    "PrivatePreviewVault",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listBackupPolicy();
}

main().catch(console.error);
