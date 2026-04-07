// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists extended auditing settings of a database.
 *
 * @summary lists extended auditing settings of a database.
 * x-ms-original-file: 2025-02-01-preview/DatabaseExtendedAuditingSettingsList.json
 */
async function listExtendedAuditingSettingsOfADatabase() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.extendedDatabaseBlobAuditingPolicies.listByDatabase(
    "blobauditingtest-6852",
    "blobauditingtest-2080",
    "testdb",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listExtendedAuditingSettingsOfADatabase();
}

main().catch(console.error);
