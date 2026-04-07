// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of servers in a resource groups.
 *
 * @summary gets a list of servers in a resource groups.
 * x-ms-original-file: 2025-02-01-preview/ServerListByResourceGroup.json
 */
async function listServersByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.servers.listByResourceGroup("sqlcrudtest-7398")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to gets a list of servers in a resource groups.
 *
 * @summary gets a list of servers in a resource groups.
 * x-ms-original-file: 2025-02-01-preview/ServerListByResourceGroupWithExpandEqualsAdministrators.json
 */
async function listServersByResourceGroupWithExpandAdministratorsOrActivedirectory(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.servers.listByResourceGroup("sqlcrudtest-7398")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listServersByResourceGroup();
  await listServersByResourceGroupWithExpandAdministratorsOrActivedirectory();
}

main().catch(console.error);
