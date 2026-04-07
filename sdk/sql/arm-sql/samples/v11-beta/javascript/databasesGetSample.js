// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a database.
 *
 * @summary gets a database.
 * x-ms-original-file: 2025-02-01-preview/GetDatabaseWithAvailabilityZone.json
 */
async function getsADatabaseWithAvailabilityZoneSpecified() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.databases.get("Default-SQL-SouthEastAsia", "testsvr", "testdb");
  console.log(result);
}

/**
 * This sample demonstrates how to gets a database.
 *
 * @summary gets a database.
 * x-ms-original-file: 2025-02-01-preview/GetVCoreDatabase.json
 */
async function getsADatabase() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.databases.get("Default-SQL-SouthEastAsia", "testsvr", "testdb");
  console.log(result);
}

/**
 * This sample demonstrates how to gets a database.
 *
 * @summary gets a database.
 * x-ms-original-file: 2025-02-01-preview/GetVCoreDatabaseDefaultEnclave.json
 */
async function getsADatabaseConfiguredWithDefaultEnclaveType() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.databases.get("Default-SQL-SouthEastAsia", "testsvr", "testdb");
  console.log(result);
}

/**
 * This sample demonstrates how to gets a database.
 *
 * @summary gets a database.
 * x-ms-original-file: 2025-02-01-preview/GetVCoreDatabaseVBSEnclave.json
 */
async function getsADatabaseConfiguredWithVBSEnclaveType() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.databases.get("Default-SQL-SouthEastAsia", "testsvr", "testdb");
  console.log(result);
}

/**
 * This sample demonstrates how to gets a database.
 *
 * @summary gets a database.
 * x-ms-original-file: 2025-02-01-preview/GetVCoreDatabaseWithExpandEqualsKeys.json
 */
async function getsADatabaseWithDatabaseLevelKeysExpanded() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.databases.get("Default-SQL-SouthEastAsia", "testsvr", "testdb", {
    expand: "keys",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to gets a database.
 *
 * @summary gets a database.
 * x-ms-original-file: 2025-02-01-preview/GetVCoreDatabaseWithExpandEqualsKeysWithVersionlessKeys.json
 */
async function getsADatabaseWithDatabaseLevelKeysExpandedUsingVersionlessKeys() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.databases.get("Default-SQL-SouthEastAsia", "testsvr", "testdb", {
    expand: "keys",
  });
  console.log(result);
}

async function main() {
  await getsADatabaseWithAvailabilityZoneSpecified();
  await getsADatabase();
  await getsADatabaseConfiguredWithDefaultEnclaveType();
  await getsADatabaseConfiguredWithVBSEnclaveType();
  await getsADatabaseWithDatabaseLevelKeysExpanded();
  await getsADatabaseWithDatabaseLevelKeysExpandedUsingVersionlessKeys();
}

main().catch(console.error);
