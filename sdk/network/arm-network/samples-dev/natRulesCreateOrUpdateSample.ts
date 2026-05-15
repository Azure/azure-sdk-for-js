// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a nat rule to a scalable vpn gateway if it doesn't exist else updates the existing nat rules.
 *
 * @summary creates a nat rule to a scalable vpn gateway if it doesn't exist else updates the existing nat rules.
 * x-ms-original-file: 2025-05-01/NatRulePut.json
 */
async function natRulePut(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.natRules.createOrUpdate("rg1", "gateway1", "natRule1", {
    typePropertiesType: "Static",
    externalMappings: [{ addressSpace: "192.168.21.0/24" }],
    internalMappings: [{ addressSpace: "10.4.0.0/24" }],
    ipConfigurationId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworkGateways/cloudnet1-VNG/ipConfigurations/default",
    mode: "EgressSnat",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await natRulePut();
}

main().catch(console.error);
