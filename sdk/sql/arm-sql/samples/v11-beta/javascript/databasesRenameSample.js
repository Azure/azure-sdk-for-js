// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to renames a database.
 *
 * @summary renames a database.
 * x-ms-original-file: 2025-02-01-preview/RenameDatabase.json
 */
async function renamesADatabase() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  await client.databases.rename("Default-SQL-SouthEastAsia", "testsvr", "testdb", {
    id: "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/Default-SQL-SouthEastAsia/providers/Microsoft.Sql/servers/testsvr/databases/newtestdb",
  });
}

async function main() {
  await renamesADatabase();
}

main().catch(console.error);
