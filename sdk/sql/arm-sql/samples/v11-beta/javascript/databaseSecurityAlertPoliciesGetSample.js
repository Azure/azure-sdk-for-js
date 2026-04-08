// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a database's security alert policy.
 *
 * @summary gets a database's security alert policy.
 * x-ms-original-file: 2025-02-01-preview/DatabaseSecurityAlertGet.json
 */
async function getADatabaseThreatDetectionPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databaseSecurityAlertPolicies.get(
    "securityalert-6852",
    "securityalert-2080",
    "testdb",
    "Default",
  );
  console.log(result);
}

async function main() {
  await getADatabaseThreatDetectionPolicy();
}

main().catch(console.error);
