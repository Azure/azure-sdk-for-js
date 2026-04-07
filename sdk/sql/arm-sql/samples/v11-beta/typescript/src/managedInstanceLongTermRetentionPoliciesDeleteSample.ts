// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a managed database's long term retention policy.
 *
 * @summary deletes a managed database's long term retention policy.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceLongTermRetentionPolicyDelete.json
 */
async function deletesTheLTRPolicyForTheManagedDatabase(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.managedInstanceLongTermRetentionPolicies.delete(
    "testResourceGroup",
    "testInstance",
    "testDatabase",
    "default",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deletesTheLTRPolicyForTheManagedDatabase();
}

main().catch(console.error);
