// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DnsResolverManagementClient } = require("@azure/arm-dnsresolver");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates an outbound endpoint for a DNS resolver.
 *
 * @summary updates an outbound endpoint for a DNS resolver.
 * x-ms-original-file: 2025-10-01-preview/OutboundEndpoint_Patch.json
 */
async function updateOutboundEndpointForDNSResolver() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const result = await client.outboundEndpoints.update(
    "sampleResourceGroup",
    "sampleDnsResolver",
    "sampleOutboundEndpoint",
    { tags: { key1: "value1" } },
  );
  console.log(result);
}

async function main() {
  await updateOutboundEndpointForDNSResolver();
}

main().catch(console.error);
