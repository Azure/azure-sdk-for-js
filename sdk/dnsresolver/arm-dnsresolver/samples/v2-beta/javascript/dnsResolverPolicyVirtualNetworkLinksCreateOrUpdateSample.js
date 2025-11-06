// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DnsResolverManagementClient } = require("@azure/arm-dnsresolver");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a DNS resolver policy virtual network link.
 *
 * @summary creates or updates a DNS resolver policy virtual network link.
 * x-ms-original-file: 2025-10-01-preview/DnsResolverPolicyVirtualNetworkLink_Put.json
 */
async function upsertDNSResolverPolicyVirtualNetworkLink() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const result = await client.dnsResolverPolicyVirtualNetworkLinks.createOrUpdate(
    "sampleResourceGroup",
    "sampleDnsResolverPolicy",
    "sampleVirtualNetworkLink",
    {
      location: "westus2",
      properties: {
        virtualNetwork: {
          id: "/subscriptions/0403cfa9-9659-4f33-9f30-1f191c51d111/resourceGroups/sampleVnetResourceGroupName/providers/Microsoft.Network/virtualNetworks/sampleVirtualNetwork",
        },
      },
      tags: { key1: "value1" },
    },
  );
  console.log(result);
}

async function main() {
  await upsertDNSResolverPolicyVirtualNetworkLink();
}

main().catch(console.error);
