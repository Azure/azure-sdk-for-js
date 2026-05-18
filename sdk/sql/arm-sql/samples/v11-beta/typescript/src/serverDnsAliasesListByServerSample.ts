// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of server DNS aliases for a server.
 *
 * @summary gets a list of server DNS aliases for a server.
 * x-ms-original-file: 2025-02-01-preview/ServerDnsAliasList.json
 */
async function listServerDNSAliases(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.serverDnsAliases.listByServer("Default", "dns-alias-server")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listServerDNSAliases();
}

main().catch(console.error);
