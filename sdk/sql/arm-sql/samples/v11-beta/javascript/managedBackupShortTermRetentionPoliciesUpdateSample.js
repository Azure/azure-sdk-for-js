// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a managed database's short term retention policy.
 *
 * @summary updates a managed database's short term retention policy.
 * x-ms-original-file: 2025-02-01-preview/UpdateManagedShortTermRetentionPolicy.json
 */
async function updateTheShortTermRetentionPolicyForTheDatabase() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.managedBackupShortTermRetentionPolicies.update(
    "resourceGroup",
    "testsvr",
    "testdb",
    "default",
    { retentionDays: 14 },
  );
  console.log(result);
}

async function main() {
  await updateTheShortTermRetentionPolicyForTheDatabase();
}

main().catch(console.error);
