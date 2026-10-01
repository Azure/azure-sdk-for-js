// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventHubManagementClient } = require("@azure/arm-eventhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update NetworkRuleSet for a Namespace.
 *
 * @summary create or update NetworkRuleSet for a Namespace.
 * x-ms-original-file: 2026-01-01/NameSpaces/VirtualNetworkRule/EHNetworkRuleSetCreate.json
 */
async function nameSpaceNetworkRuleSetCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "Subscription";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.namespaces.createOrUpdateNetworkRuleSet(
    "ResourceGroup",
    "sdk-Namespace-6019",
    {
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
            id: "/subscriptions/subscriptionid/resourcegroups/resourcegroupid/providers/Microsoft.Network/virtualNetworks/myvn/subnets/subnet2",
          },
        },
        {
          ignoreMissingVnetServiceEndpoint: false,
          subnet: {
            id: "/subscriptions/subscriptionid/resourcegroups/resourcegroupid/providers/Microsoft.Network/virtualNetworks/myvn/subnets/subnet3",
          },
        },
        {
          ignoreMissingVnetServiceEndpoint: false,
          subnet: {
            id: "/subscriptions/subscriptionid/resourcegroups/resourcegroupid/providers/Microsoft.Network/virtualNetworks/myvn/subnets/subnet6",
          },
        },
      ],
    },
  );
  console.log(result);
}

async function main() {
  await nameSpaceNetworkRuleSetCreate();
}

main().catch(console.error);
