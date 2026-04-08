// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a restore point for a data warehouse.
 *
 * @summary creates a restore point for a data warehouse.
 * x-ms-original-file: 2025-02-01-preview/DatabaseRestorePointsPost.json
 */
async function createsDatawarehouseDatabaseRestorePoint() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.restorePoints.create(
    "Default-SQL-SouthEastAsia",
    "testserver",
    "testDatabase",
    { restorePointLabel: "mylabel" },
  );
  console.log(result);
}

async function main() {
  await createsDatawarehouseDatabaseRestorePoint();
}

main().catch(console.error);
