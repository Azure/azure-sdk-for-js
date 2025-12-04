// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete backup policy
 *
 * @summary delete backup policy
 * x-ms-original-file: 2025-09-01-preview/BackupPolicies_Delete.json
 */
async function backupPoliciesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.backupPolicies.delete("resourceGroup", "accountName", "backupPolicyName");
}

async function main(): Promise<void> {
  await backupPoliciesDelete();
}

main().catch(console.error);
