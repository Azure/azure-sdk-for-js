// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the server DNS alias with the given name.
 *
 * @summary deletes the server DNS alias with the given name.
 * x-ms-original-file: 2025-02-01-preview/ServerDnsAliasDelete.json
 */
async function deleteServerDNSAlias(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  await client.serverDnsAliases.delete("Default", "dns-alias-server", "dns-alias-name-1");
}

async function main(): Promise<void> {
  await deleteServerDNSAlias();
}

main().catch(console.error);
