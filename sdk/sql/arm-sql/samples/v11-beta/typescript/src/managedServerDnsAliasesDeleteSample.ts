// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the managed server DNS alias with the given name.
 *
 * @summary deletes the managed server DNS alias with the given name.
 * x-ms-original-file: 2025-02-01-preview/ManagedServerDnsAliasDelete.json
 */
async function deleteManagedServerDNSAlias(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  await client.managedServerDnsAliases.delete("Default", "dns-mi", "dns-alias-mi");
}

async function main(): Promise<void> {
  await deleteManagedServerDNSAlias();
}

main().catch(console.error);
