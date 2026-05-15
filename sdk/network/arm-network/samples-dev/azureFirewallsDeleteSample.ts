// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified Azure Firewall.
 *
 * @summary deletes the specified Azure Firewall.
 * x-ms-original-file: 2025-05-01/AzureFirewallDelete.json
 */
async function deleteAzureFirewall(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.azureFirewalls.delete("rg1", "azurefirewall");
}

async function main(): Promise<void> {
  await deleteAzureFirewall();
}

main().catch(console.error);
