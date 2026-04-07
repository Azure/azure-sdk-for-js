// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to recovers a deleted server.
 *
 * @summary recovers a deleted server.
 * x-ms-original-file: 2025-02-01-preview/DeletedServerRecover.json
 */
async function recoverDeletedServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.deletedServers.recover("japaneast", "sqlcrudtest-d-1414");
  console.log(result);
}

async function main() {
  await recoverDeletedServer();
}

main().catch(console.error);
