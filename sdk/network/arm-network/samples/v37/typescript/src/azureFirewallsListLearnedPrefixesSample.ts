// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves a list of all IP prefixes that azure firewall has learned to not SNAT.
 *
 * @summary retrieves a list of all IP prefixes that azure firewall has learned to not SNAT.
 * x-ms-original-file: 2025-05-01/AzureFirewallListLearnedIPPrefixes.json
 */
async function azureFirewallListLearnedPrefixes(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.azureFirewalls.listLearnedPrefixes("rg1", "azureFirewall1");
  console.log(result);
}

async function main(): Promise<void> {
  await azureFirewallListLearnedPrefixes();
}

main().catch(console.error);
