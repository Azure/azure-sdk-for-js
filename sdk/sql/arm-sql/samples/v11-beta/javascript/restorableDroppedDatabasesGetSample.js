// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a restorable dropped database.
 *
 * @summary gets a restorable dropped database.
 * x-ms-original-file: 2025-02-01-preview/GetRestorableDroppedDatabase.json
 */
async function getsARestorableDroppedDatabase() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.restorableDroppedDatabases.get(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    "testdb,131403269876900000",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a restorable dropped database.
 *
 * @summary gets a restorable dropped database.
 * x-ms-original-file: 2025-02-01-preview/GetRestorableDroppedDatabaseWithExpandEqualsKeys.json
 */
async function getsARestorableDroppedDatabaseWithExpandEqualsKeys() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.restorableDroppedDatabases.get(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    "testdb,131403269876900000",
    { expand: "keys" },
  );
  console.log(result);
}

async function main() {
  await getsARestorableDroppedDatabase();
  await getsARestorableDroppedDatabaseWithExpandEqualsKeys();
}

main().catch(console.error);
