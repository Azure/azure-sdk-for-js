// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DnsResolverManagementClient } = require("@azure/arm-dnsresolver");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a virtual network link to a DNS forwarding ruleset.
 *
 * @summary creates or updates a virtual network link to a DNS forwarding ruleset.
 * x-ms-original-file: 2025-10-01-preview/VirtualNetworkLink_Put.json
 */
async function upsertVirtualNetworkLinkToADNSForwardingRuleset() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkLinks.createOrUpdate(
    "sampleResourceGroup",
    "sampleDnsForwardingRuleset",
    "sampleVirtualNetworkLink",
    {
      properties: {
        metadata: { additionalProp1: "value1" },
        virtualNetwork: {
          id: "/subscriptions/0403cfa9-9659-4f33-9f30-1f191c51d111/resourceGroups/sampleVnetResourceGroupName/providers/Microsoft.Network/virtualNetworks/sampleVirtualNetwork",
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await upsertVirtualNetworkLinkToADNSForwardingRuleset();
}

main().catch(console.error);
