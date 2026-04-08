// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to set or update a database's long term retention policy.
 *
 * @summary set or update a database's long term retention policy.
 * x-ms-original-file: 2025-02-01-preview/LongTermRetentionPolicyCreateOrUpdate.json
 */
async function createOrUpdateTheLongTermRetentionPolicyForTheDatabase(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.longTermRetentionPolicies.createOrUpdate(
    "resourceGroup",
    "testserver",
    "testDatabase",
    "default",
    {
      monthlyRetention: "P1Y",
      timeBasedImmutability: "Enabled",
      timeBasedImmutabilityMode: "Unlocked",
      weekOfYear: 5,
      weeklyRetention: "P1M",
      yearlyRetention: "P5Y",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateTheLongTermRetentionPolicyForTheDatabase();
}

main().catch(console.error);
