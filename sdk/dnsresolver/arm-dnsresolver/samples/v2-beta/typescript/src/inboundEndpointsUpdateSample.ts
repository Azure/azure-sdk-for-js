// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DnsResolverManagementClient } from "@azure/arm-dnsresolver";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates an inbound endpoint for a DNS resolver.
 *
 * @summary updates an inbound endpoint for a DNS resolver.
 * x-ms-original-file: 2025-10-01-preview/InboundEndpoint_Patch.json
 */
async function updateInboundEndpointForDNSResolver(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const result = await client.inboundEndpoints.update(
    "sampleResourceGroup",
    "sampleDnsResolver",
    "sampleInboundEndpoint",
    { tags: { key1: "value1" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateInboundEndpointForDNSResolver();
}

main().catch(console.error);
