// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to acquires server DNS alias from another server.
 *
 * @summary acquires server DNS alias from another server.
 * x-ms-original-file: 2025-02-01-preview/ServerDnsAliasAcquire.json
 */
async function acquireServerDNSAlias(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.serverDnsAliases.acquire(
    "Default",
    "dns-alias-new-server",
    "dns-alias-name-1",
    {
      oldServerDnsAliasId:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/Default/providers/Microsoft.Sql/servers/dns-alias-old-server/dnsAliases/dns-alias-name-1",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await acquireServerDNSAlias();
}

main().catch(console.error);
