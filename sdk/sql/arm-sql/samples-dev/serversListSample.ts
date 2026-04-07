// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of all servers in the subscription.
 *
 * @summary gets a list of all servers in the subscription.
 * x-ms-original-file: 2025-02-01-preview/ServerList.json
 */
async function listServers(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.servers.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to gets a list of all servers in the subscription.
 *
 * @summary gets a list of all servers in the subscription.
 * x-ms-original-file: 2025-02-01-preview/ServerListWithExpandEqualsAdministrators.json
 */
async function listServersWithExpandAdministratorsOrActivedirectory(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.servers.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listServers();
  await listServersWithExpandAdministratorsOrActivedirectory();
}

main().catch(console.error);
