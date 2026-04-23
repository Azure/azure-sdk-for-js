// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { InboundNatRule} from "@azure/arm-network";
import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates a load balancer inbound NAT rule.
 *
 * @summary Creates or updates a load balancer inbound NAT rule.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/InboundNatRuleCreate.json
 */
async function inboundNatRuleCreate(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "testrg";
  const loadBalancerName = "lb1";
  const inboundNatRuleName = "natRule1.1";
  const inboundNatRuleParameters: InboundNatRule = {
    backendPort: 3389,
    enableFloatingIP: false,
    enableTcpReset: false,
    frontendIPConfiguration: {
      id: "/subscriptions/subid/resourceGroups/testrg/providers/Microsoft.Network/loadBalancers/lb1/frontendIPConfigurations/ip1",
    },
    frontendPort: 3390,
    idleTimeoutInMinutes: 4,
    protocol: "Tcp",
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.inboundNatRules.beginCreateOrUpdateAndWait(
    resourceGroupName,
    loadBalancerName,
    inboundNatRuleName,
    inboundNatRuleParameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await inboundNatRuleCreate();
}

main().catch(console.error);
