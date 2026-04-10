// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get query by query id.
 *
 * @summary get query by query id.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceQueryGet.json
 */
async function obtainQueryProperties() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedDatabaseQueries.get(
    "sqlcrudtest-7398",
    "sqlcrudtest-4645",
    "database_1",
    "42",
  );
  console.log(result);
}

async function main() {
  await obtainQueryProperties();
}

main().catch(console.error);
