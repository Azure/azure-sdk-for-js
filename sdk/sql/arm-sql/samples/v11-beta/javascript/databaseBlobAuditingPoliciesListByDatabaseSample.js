// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists auditing settings of a database.
 *
 * @summary lists auditing settings of a database.
 * x-ms-original-file: 2025-02-01-preview/DatabaseAuditingSettingsList.json
 */
async function listAuditSettingsOfADatabase() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.databaseBlobAuditingPolicies.listByDatabase(
    "blobauditingtest-6852",
    "blobauditingtest-2080",
    "testdb",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAuditSettingsOfADatabase();
}

main().catch(console.error);
