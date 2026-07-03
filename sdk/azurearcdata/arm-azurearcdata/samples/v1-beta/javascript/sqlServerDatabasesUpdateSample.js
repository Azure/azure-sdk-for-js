// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureArcDataClient } = require("@azure/arm-azurearcdata");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates an existing database.
 *
 * @summary updates an existing database.
 * x-ms-original-file: 2026-03-01-preview/UpdateSqlServerDatabase.json
 */
async function updateADatabase() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const result = await client.sqlServerDatabases.update(
    "testrg",
    "testsqlManagedInstance",
    "testdb",
    { tags: { mytag: "myval1" } },
  );
  console.log(result);
}

async function main() {
  await updateADatabase();
}

main().catch(console.error);
