// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates an inbound endpoint for a DNS resolver.
 *
 * @summary Creates or updates an inbound endpoint for a DNS resolver.
 * x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2025-05-01/examples/InboundEndpoint_Put.json
 */

import {
  InboundEndpoint,
  DnsResolverManagementClient,
} from "@azure/arm-dnsresolver";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function upsertInboundEndpointForDnsResolver(): Promise<void> {
  const subscriptionId =
    process.env["DNSRESOLVER_SUBSCRIPTION_ID"] ||
    "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const resourceGroupName =
    process.env["DNSRESOLVER_RESOURCE_GROUP"] || "sampleResourceGroup";
  const dnsResolverName = "sampleDnsResolver";
  const inboundEndpointName = "sampleInboundEndpoint";
  const parameters: InboundEndpoint = {
    ipConfigurations: [
      {
        privateIpAllocationMethod: "Dynamic",
        subnet: {
          id: "/subscriptions/0403cfa9-9659-4f33-9f30-1f191c51d111/resourceGroups/sampleVnetResourceGroupName/providers/Microsoft.Network/virtualNetworks/sampleVirtualNetwork/subnets/sampleSubnet",
        },
      },
    ],
    location: "westus2",
    tags: { key1: "value1" },
  };
  const credential = new DefaultAzureCredential();
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const result = await client.inboundEndpoints.beginCreateOrUpdateAndWait(
    resourceGroupName,
    dnsResolverName,
    inboundEndpointName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await upsertInboundEndpointForDnsResolver();
}

main().catch(console.error);
