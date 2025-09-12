// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets a database's security alert policy.
 *
 * @summary Gets a database's security alert policy.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/DatabaseSecurityAlertGet.json
 */
async function getADatabaseThreatDetectionPolicy() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "securityalert-6852";
  const serverName = "securityalert-2080";
  const databaseName = "testdb";
  const securityAlertPolicyName = "Default";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databaseSecurityAlertPolicies.get(
    resourceGroupName,
    serverName,
    databaseName,
    securityAlertPolicyName,
  );
  console.log(result);
}

async function main() {
  await getADatabaseThreatDetectionPolicy();
}

main().catch(console.error);
