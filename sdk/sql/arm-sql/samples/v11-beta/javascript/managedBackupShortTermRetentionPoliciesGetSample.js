// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets a managed database's short term retention policy.
 *
 * @summary Gets a managed database's short term retention policy.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/GetManagedShortTermRetentionPolicy.json
 */
async function getTheShortTermRetentionPolicyForTheDatabase() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const managedInstanceName = "testsvr";
  const databaseName = "testdb";
  const policyName = "default";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedBackupShortTermRetentionPolicies.get(
    resourceGroupName,
    managedInstanceName,
    databaseName,
    policyName,
  );
  console.log(result);
}

async function main() {
  await getTheShortTermRetentionPolicyForTheDatabase();
}

main().catch(console.error);
