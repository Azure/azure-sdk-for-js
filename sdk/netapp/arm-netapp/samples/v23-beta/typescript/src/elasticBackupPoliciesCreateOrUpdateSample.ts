// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update the specified Elastic Backup Policy in the NetApp account
 *
 * @summary create or update the specified Elastic Backup Policy in the NetApp account
 * x-ms-original-file: 2025-09-01-preview/ElasticBackupPolicies_CreateOrUpdate.json
 */
async function elasticBackupPoliciesCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.elasticBackupPolicies.createOrUpdate(
    "myRG",
    "account1",
    "backupPolicyName",
    {
      location: "westus",
      properties: {
        dailyBackupsToKeep: 10,
        weeklyBackupsToKeep: 10,
        monthlyBackupsToKeep: 10,
        policyState: "Enabled",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await elasticBackupPoliciesCreateOrUpdate();
}

main().catch(console.error);
