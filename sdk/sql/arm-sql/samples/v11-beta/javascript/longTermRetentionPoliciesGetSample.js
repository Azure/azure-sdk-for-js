// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets a database's long term retention policy.
 *
 * @summary Gets a database's long term retention policy.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2024-11-01-preview/examples/LongTermRetentionPolicyGet.json
 */
async function getTheLongTermRetentionPolicyForTheDatabase() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "resourceGroup";
  const serverName = "testserver";
  const databaseName = "testDatabase";
  const policyName = "default";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.longTermRetentionPolicies.get(
    resourceGroupName,
    serverName,
    databaseName,
    policyName,
  );
  console.log(result);
}

async function main() {
  await getTheLongTermRetentionPolicyForTheDatabase();
}

main().catch(console.error);
