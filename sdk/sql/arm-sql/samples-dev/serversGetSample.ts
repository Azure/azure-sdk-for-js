// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a server.
 *
 * @summary gets a server.
 * x-ms-original-file: 2025-02-01-preview/ServerGet.json
 */
async function getServer(): Promise<void> {
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
async function getServerWithExpandAdministratorsOrActivedirectory(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.servers.get("sqlcrudtest-7398", "sqlcrudtest-4645");
  console.log(result);
}

async function main(): Promise<void> {
  await getServer();
  await getServerWithExpandAdministratorsOrActivedirectory();
}

main().catch(console.error);
