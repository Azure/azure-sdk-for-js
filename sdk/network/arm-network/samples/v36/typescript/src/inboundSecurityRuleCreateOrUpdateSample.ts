// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  InboundSecurityRule} from "@azure/arm-network";
import {
  NetworkManagementClient,
} from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates the specified Network Virtual Appliance Inbound Security Rules.
 *
 * @summary Creates or updates the specified Network Virtual Appliance Inbound Security Rules.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/InboundSecurityRulePut.json
 */
async function createNetworkVirtualApplianceInboundSecurityRules(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkVirtualApplianceName = "nva";
  const ruleCollectionName = "rule1";
  const parameters: InboundSecurityRule = {
    ruleType: "Permanent",
    rules: [
      {
        name: "inboundRule1",
        appliesOn: ["slbip1"],
        destinationPortRange: 22,
        destinationPortRanges: ["80-100"],
        sourceAddressPrefix: "50.20.121.5/32",
        protocol: "TCP",
      },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.inboundSecurityRuleOperations.beginCreateOrUpdateAndWait(
      resourceGroupName,
      networkVirtualApplianceName,
      ruleCollectionName,
      parameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await createNetworkVirtualApplianceInboundSecurityRules();
}

main().catch(console.error);
