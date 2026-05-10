// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a server.
 *
 * @summary deletes a server.
 * x-ms-original-file: 2025-02-01-preview/ServerDelete.json
 */
async function deleteServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  await client.servers.delete("sqlcrudtest-7398", "sqlcrudtest-6661");
}

async function main() {
  await deleteServer();
}

main().catch(console.error);
