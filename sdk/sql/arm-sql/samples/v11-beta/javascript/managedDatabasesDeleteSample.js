// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a managed database.
 *
 * @summary deletes a managed database.
 * x-ms-original-file: 2025-02-01-preview/ManagedDatabaseDelete.json
 */
async function deleteManagedDatabase() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  await client.managedDatabases.delete("Default-SQL-SouthEastAsia", "managedInstance", "testdb");
}

async function main() {
  await deleteManagedDatabase();
}

main().catch(console.error);
