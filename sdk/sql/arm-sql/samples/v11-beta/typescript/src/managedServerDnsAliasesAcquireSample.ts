// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to acquires managed server DNS alias from another managed server.
 *
 * @summary acquires managed server DNS alias from another managed server.
 * x-ms-original-file: 2025-02-01-preview/ManagedServerDnsAliasAcquire.json
 */
async function acquireManagedServerDNSAlias(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedServerDnsAliases.acquire("Default", "new-mi", "dns-alias-mi", {
    oldManagedServerDnsAliasResourceId:
      "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/Default/providers/Microsoft.Sql/managedInstances/old-mi/dnsAliases/alias1",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await acquireManagedServerDNSAlias();
}

main().catch(console.error);
