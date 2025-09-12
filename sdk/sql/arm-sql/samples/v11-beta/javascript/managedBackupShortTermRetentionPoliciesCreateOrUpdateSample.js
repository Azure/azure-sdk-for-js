// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Updates a managed database's short term retention policy.
 *
 * @summary Updates a managed database's short term retention policy.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/UpdateManagedShortTermRetentionPolicy.json
 */
async function updateTheShortTermRetentionPolicyForTheDatabase() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "resourceGroup";
  const managedInstanceName = "testsvr";
  const databaseName = "testdb";
  const policyName = "default";
  const parameters = {
    retentionDays: 14,
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedBackupShortTermRetentionPolicies.beginCreateOrUpdateAndWait(
    resourceGroupName,
    managedInstanceName,
    databaseName,
    policyName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await updateTheShortTermRetentionPolicyForTheDatabase();
}

main().catch(console.error);
