// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Get a managed server's threat detection policy.
 *
 * @summary Get a managed server's threat detection policy.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/ManagedServerSecurityAlertGet.json
 */
async function getAManagedServerThreatDetectionPolicy() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "securityalert-4799";
  const managedInstanceName = "securityalert-6440";
  const securityAlertPolicyName = "Default";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedServerSecurityAlertPolicies.get(
    resourceGroupName,
    managedInstanceName,
    securityAlertPolicyName,
  );
  console.log(result);
}

async function main() {
  await getAManagedServerThreatDetectionPolicy();
}

main().catch(console.error);
