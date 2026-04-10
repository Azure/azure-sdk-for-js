// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a server.
 *
 * @summary gets a server.
 * x-ms-original-file: 2025-02-01-preview/ServerGet.json
 */
async function getServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.servers.get("sqlcrudtest-7398", "sqlcrudtest-4645");
  console.log(result);
}

/**
 * This sample demonstrates how to gets a server.
 *
 * @summary gets a server.
 * x-ms-original-file: 2025-02-01-preview/ServerGetWithExpandEqualsAdministrators.json
 */
async function getServerWithExpandAdministratorsOrActivedirectory() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.servers.get("sqlcrudtest-7398", "sqlcrudtest-4645");
  console.log(result);
}

async function main() {
  await getServer();
  await getServerWithExpandAdministratorsOrActivedirectory();
}

main().catch(console.error);
