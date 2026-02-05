// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a backup policy for Netapp Account
 *
 * @summary create a backup policy for Netapp Account
 * x-ms-original-file: 2025-09-01-preview/BackupPolicies_Create.json
 */
async function backupPoliciesCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.backupPolicies.create("myRG", "account1", "backupPolicyName", {
    location: "westus",
    properties: {
      dailyBackupsToKeep: 10,
      enabled: true,
      monthlyBackupsToKeep: 10,
      weeklyBackupsToKeep: 10,
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await backupPoliciesCreate();
}

main().catch(console.error);
