// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a restore point.
 *
 * @summary gets a restore point.
 * x-ms-original-file: 2025-02-01-preview/DataWarehouseRestorePointsGet.json
 */
async function getsADatawarehouseDatabaseRestorePoint() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.restorePoints.get(
    "Default-SQL-SouthEastAsia",
    "testserver",
    "testDatabase",
    "131546477590000000",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a restore point.
 *
 * @summary gets a restore point.
 * x-ms-original-file: 2025-02-01-preview/DatabaseRestorePointsGet.json
 */
async function getsADatabaseRestorePoint() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.restorePoints.get(
    "Default-SQL-SouthEastAsia",
    "testserver",
    "testDatabase",
    "131546477590000000",
  );
  console.log(result);
}

async function main() {
  await getsADatawarehouseDatabaseRestorePoint();
  await getsADatabaseRestorePoint();
}

main().catch(console.error);
