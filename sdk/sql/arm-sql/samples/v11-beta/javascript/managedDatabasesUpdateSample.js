// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates an existing database.
 *
 * @summary updates an existing database.
 * x-ms-original-file: 2025-02-01-preview/ManagedDatabaseUpdateMax.json
 */
async function updatesAManagedDatabaseWithMaximalProperties() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedDatabases.update(
    "Default-SQL-SouthEastAsia",
    "managedInstance",
    "testdb",
    { tags: { tagKey1: "TagValue1" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing database.
 *
 * @summary updates an existing database.
 * x-ms-original-file: 2025-02-01-preview/ManagedDatabaseUpdateMin.json
 */
async function updatesAManagedDatabaseWithMinimalProperties() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedDatabases.update(
    "Default-SQL-SouthEastAsia",
    "managedInstance",
    "testdb",
    { tags: { tagKey1: "TagValue1" } },
  );
  console.log(result);
}

async function main() {
  await updatesAManagedDatabaseWithMaximalProperties();
  await updatesAManagedDatabaseWithMinimalProperties();
}

main().catch(console.error);
