// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Retrieves a list of all IP prefixes that azure firewall has learned to not SNAT.
 *
 * @summary Retrieves a list of all IP prefixes that azure firewall has learned to not SNAT.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/AzureFirewallListLearnedIPPrefixes.json
 */
async function azureFirewallListLearnedPrefixes(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const azureFirewallName = "azureFirewall1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.azureFirewalls.beginListLearnedPrefixesAndWait(
    resourceGroupName,
    azureFirewallName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await azureFirewallListLearnedPrefixes();
}

main().catch(console.error);
