// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DnsResolverManagementClient } = require("@azure/arm-dnsresolver");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an outbound endpoint for a DNS resolver. WARNING: This operation cannot be undone.
 *
 * @summary deletes an outbound endpoint for a DNS resolver. WARNING: This operation cannot be undone.
 * x-ms-original-file: 2025-10-01-preview/OutboundEndpoint_Delete.json
 */
async function deleteOutboundEndpointForDNSResolver() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  await client.outboundEndpoints.delete(
    "sampleResourceGroup",
    "sampleDnsResolver",
    "sampleOutboundEndpoint",
  );
}

async function main() {
  await deleteOutboundEndpointForDNSResolver();
}

main().catch(console.error);
