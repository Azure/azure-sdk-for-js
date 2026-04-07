// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a server DNS alias.
 *
 * @summary gets a server DNS alias.
 * x-ms-original-file: 2025-02-01-preview/ManagedServerDnsAliasGet.json
 */
async function getManagedServerDNSAlias(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.managedServerDnsAliases.get("Default", "dns-mi", "dns-alias-mi");
  console.log(result);
}

async function main(): Promise<void> {
  await getManagedServerDNSAlias();
}

main().catch(console.error);
