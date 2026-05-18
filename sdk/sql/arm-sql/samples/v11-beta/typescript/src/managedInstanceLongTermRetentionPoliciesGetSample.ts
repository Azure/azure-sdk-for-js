// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a managed database's long term retention policy.
 *
 * @summary gets a managed database's long term retention policy.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceLongTermRetentionPolicyGet.json
 */
async function getTheLongTermRetentionPolicyForTheManagedDatabase(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedInstanceLongTermRetentionPolicies.get(
    "testResourceGroup",
    "testInstance",
    "testDatabase",
    "default",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getTheLongTermRetentionPolicyForTheManagedDatabase();
}

main().catch(console.error);
