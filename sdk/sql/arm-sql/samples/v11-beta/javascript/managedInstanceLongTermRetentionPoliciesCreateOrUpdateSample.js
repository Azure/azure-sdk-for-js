// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Sets a managed database's long term retention policy.
 *
 * @summary Sets a managed database's long term retention policy.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/ManagedInstanceLongTermRetentionPolicyCreateOrUpdate.json
 */
async function createOrUpdateTheLtrPolicyForTheManagedDatabase() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "testResourceGroup";
  const managedInstanceName = "testInstance";
  const databaseName = "testDatabase";
  const policyName = "default";
  const parameters = {
    monthlyRetention: "P1Y",
    weekOfYear: 5,
    weeklyRetention: "P1M",
    yearlyRetention: "P5Y",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedInstanceLongTermRetentionPolicies.beginCreateOrUpdateAndWait(
    resourceGroupName,
    managedInstanceName,
    databaseName,
    policyName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createOrUpdateTheLtrPolicyForTheManagedDatabase();
}

main().catch(console.error);
