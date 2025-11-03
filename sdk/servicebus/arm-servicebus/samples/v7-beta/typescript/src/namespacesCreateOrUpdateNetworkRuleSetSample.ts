// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceBusManagementClient } from "@azure/arm-servicebus";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update NetworkRuleSet for a Namespace.
 *
 * @summary create or update NetworkRuleSet for a Namespace.
 * x-ms-original-file: 2025-05-01-preview/NameSpaces/VirtualNetworkRule/SBNetworkRuleSetCreate.json
 */
async function nameSpaceNetworkRuleSetCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const result = await client.namespaces.createOrUpdateNetworkRuleSet(
    "ResourceGroup",
    "sdk-Namespace-6019",
    {
      properties: {
        defaultAction: "Deny",
        ipRules: [
          { action: "Allow", ipMask: "1.1.1.1" },
          { action: "Allow", ipMask: "1.1.1.2" },
          { action: "Allow", ipMask: "1.1.1.3" },
          { action: "Allow", ipMask: "1.1.1.4" },
          { action: "Allow", ipMask: "1.1.1.5" },
        ],
        virtualNetworkRules: [
          {
            ignoreMissingVnetServiceEndpoint: true,
            subnet: {
              id: "/subscriptions/854d368f-1828-428f-8f3c-f2affa9b2f7d/resourcegroups/alitest/providers/Microsoft.Network/virtualNetworks/myvn/subnets/subnet2",
            },
          },
          {
            ignoreMissingVnetServiceEndpoint: false,
            subnet: {
              id: "/subscriptions/854d368f-1828-428f-8f3c-f2affa9b2f7d/resourcegroups/alitest/providers/Microsoft.Network/virtualNetworks/myvn/subnets/subnet3",
            },
          },
          {
            ignoreMissingVnetServiceEndpoint: false,
            subnet: {
              id: "/subscriptions/854d368f-1828-428f-8f3c-f2affa9b2f7d/resourcegroups/alitest/providers/Microsoft.Network/virtualNetworks/myvn/subnets/subnet6",
            },
          },
        ],
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await nameSpaceNetworkRuleSetCreate();
}

main().catch(console.error);
