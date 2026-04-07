// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of managed database's security alert policies.
 *
 * @summary gets a list of managed database's security alert policies.
 * x-ms-original-file: 2025-02-01-preview/ManagedDatabaseSecurityAlertListByDatabase.json
 */
async function getAListOfTheDatabaseThreatDetectionPolicies() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedDatabaseSecurityAlertPolicies.listByDatabase(
    "securityalert-6852",
    "securityalert-2080",
    "testdb",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAListOfTheDatabaseThreatDetectionPolicies();
}

main().catch(console.error);
