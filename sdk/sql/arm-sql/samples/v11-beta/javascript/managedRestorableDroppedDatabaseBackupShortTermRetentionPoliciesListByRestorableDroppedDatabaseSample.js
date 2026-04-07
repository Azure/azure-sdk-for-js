// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a dropped database's short term retention policy list.
 *
 * @summary gets a dropped database's short term retention policy list.
 * x-ms-original-file: 2025-02-01-preview/GetListManagedShortTermRetentionPolicyRestorableDropped.json
 */
async function getTheShortTermRetentionPolicyListForTheDatabase() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedRestorableDroppedDatabaseBackupShortTermRetentionPolicies.listByRestorableDroppedDatabase(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    "testdb,131403269876900000",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getTheShortTermRetentionPolicyListForTheDatabase();
}

main().catch(console.error);
