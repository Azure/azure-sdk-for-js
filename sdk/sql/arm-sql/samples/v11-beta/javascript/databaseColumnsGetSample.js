// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get database column
 *
 * @summary get database column
 * x-ms-original-file: 2025-02-01-preview/DatabaseColumnGet.json
 */
async function getDatabaseColumn() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databaseColumns.get(
    "myRG",
    "serverName",
    "myDatabase",
    "dbo",
    "table1",
    "column1",
  );
  console.log(result);
}

async function main() {
  await getDatabaseColumn();
}

main().catch(console.error);
