// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a particular backup Policy
 *
 * @summary get a particular backup Policy
 * x-ms-original-file: 2025-09-01-preview/BackupPolicies_Get.json
 */
async function backupsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.backupPolicies.get("myRG", "account1", "backupPolicyName");
  console.log(result);
}

async function main(): Promise<void> {
  await backupsGet();
}

main().catch(console.error);
