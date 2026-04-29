// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to failovers a database.
 *
 * @summary failovers a database.
 * x-ms-original-file: 2025-02-01-preview/FailoverDatabase.json
 */
async function failoverAnDatabase() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  await client.databases.failover("group1", "testServer", "testDatabase", {
    replicaType: "Primary",
  });
}

async function main() {
  await failoverAnDatabase();
}

main().catch(console.error);
