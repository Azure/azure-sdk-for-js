// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a restore point.
 *
 * @summary deletes a restore point.
 * x-ms-original-file: 2025-02-01-preview/DatabaseRestorePointsDelete.json
 */
async function deletesARestorePoint() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  await client.restorePoints.delete(
    "Default-SQL-SouthEastAsia",
    "testserver",
    "testDatabase",
    "131546477590000000",
  );
}

async function main() {
  await deletesARestorePoint();
}

main().catch(console.error);
