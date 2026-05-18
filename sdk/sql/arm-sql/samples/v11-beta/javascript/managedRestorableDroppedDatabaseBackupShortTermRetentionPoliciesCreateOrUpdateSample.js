// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to sets a database's short term retention policy.
 *
 * @summary sets a database's short term retention policy.
 * x-ms-original-file: 2025-02-01-preview/CreateManagedShortTermRetentionPolicyRestorableDropped.json
 */
async function updateTheShortTermRetentionPolicyForTheRestorableDroppedDatabase() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result =
    await client.managedRestorableDroppedDatabaseBackupShortTermRetentionPolicies.createOrUpdate(
      "resourceGroup",
      "testsvr",
      "testdb,131403269876900000",
      "default",
      { retentionDays: 14 },
    );
  console.log(result);
}

async function main() {
  await updateTheShortTermRetentionPolicyForTheRestorableDroppedDatabase();
}

main().catch(console.error);
