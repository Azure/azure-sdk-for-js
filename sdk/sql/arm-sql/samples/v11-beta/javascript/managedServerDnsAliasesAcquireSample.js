// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to acquires managed server DNS alias from another managed server.
 *
 * @summary acquires managed server DNS alias from another managed server.
 * x-ms-original-file: 2025-02-01-preview/ManagedServerDnsAliasAcquire.json
 */
async function acquireManagedServerDNSAlias() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.managedServerDnsAliases.acquire("Default", "new-mi", "dns-alias-mi", {
    oldManagedServerDnsAliasResourceId:
      "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/Default/providers/Microsoft.Sql/managedInstances/old-mi/dnsAliases/alias1",
  });
  console.log(result);
}

async function main() {
  await acquireManagedServerDNSAlias();
}

main().catch(console.error);
