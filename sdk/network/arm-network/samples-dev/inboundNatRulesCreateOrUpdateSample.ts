// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a load balancer inbound NAT rule.
 *
 * @summary creates or updates a load balancer inbound NAT rule.
 * x-ms-original-file: 2025-05-01/InboundNatRuleCreate.json
 */
async function inboundNatRuleCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.inboundNatRules.createOrUpdate("testrg", "lb1", "natRule1.1", {
    backendPort: 3389,
    enableFloatingIP: false,
    enableTcpReset: false,
    frontendIPConfiguration: {
      id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testrg/providers/Microsoft.Network/loadBalancers/lb1/frontendIPConfigurations/ip1",
    },
    frontendPort: 3390,
    idleTimeoutInMinutes: 4,
    protocol: "Tcp",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await inboundNatRuleCreate();
}

main().catch(console.error);
