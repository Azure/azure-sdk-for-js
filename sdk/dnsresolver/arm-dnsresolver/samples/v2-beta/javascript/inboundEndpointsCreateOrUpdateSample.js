// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DnsResolverManagementClient } = require("@azure/arm-dnsresolver");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an inbound endpoint for a DNS resolver.
 *
 * @summary creates or updates an inbound endpoint for a DNS resolver.
 * x-ms-original-file: 2025-10-01-preview/InboundEndpoint_Put.json
 */
async function upsertInboundEndpointForDNSResolver() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const result = await client.inboundEndpoints.createOrUpdate(
    "sampleResourceGroup",
    "sampleDnsResolver",
    "sampleInboundEndpoint",
    {
      location: "westus2",
      properties: {
        ipConfigurations: [
          {
            privateIpAllocationMethod: "Dynamic",
            subnet: {
              id: "/subscriptions/0403cfa9-9659-4f33-9f30-1f191c51d111/resourceGroups/sampleVnetResourceGroupName/providers/Microsoft.Network/virtualNetworks/sampleVirtualNetwork/subnets/sampleSubnet",
            },
          },
        ],
      },
      tags: { key1: "value1" },
    },
  );
  console.log(result);
}

async function main() {
  await upsertInboundEndpointForDNSResolver();
}

main().catch(console.error);
