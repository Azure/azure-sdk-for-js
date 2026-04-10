// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to sets a managed database's long term retention policy.
 *
 * @summary sets a managed database's long term retention policy.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceLongTermRetentionPolicyCreateOrUpdate.json
 */
async function createOrUpdateTheLTRPolicyForTheManagedDatabase(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedInstanceLongTermRetentionPolicies.createOrUpdate(
    "testResourceGroup",
    "testInstance",
    "testDatabase",
    "default",
    {
      backupStorageAccessTier: "Hot",
      monthlyRetention: "P1Y",
      weekOfYear: 5,
      weeklyRetention: "P1M",
      yearlyRetention: "P5Y",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateTheLTRPolicyForTheManagedDatabase();
}

main().catch(console.error);
