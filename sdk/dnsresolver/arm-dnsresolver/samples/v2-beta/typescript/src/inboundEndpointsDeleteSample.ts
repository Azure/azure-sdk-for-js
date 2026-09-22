// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DnsResolverManagementClient } from "@azure/arm-dnsresolver";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an inbound endpoint for a DNS resolver. WARNING: This operation cannot be undone.
 *
 * @summary deletes an inbound endpoint for a DNS resolver. WARNING: This operation cannot be undone.
 * x-ms-original-file: 2025-10-01-preview/InboundEndpoint_Delete.json
 */
async function deleteInboundEndpointForDNSResolver(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  await client.inboundEndpoints.delete(
    "sampleResourceGroup",
    "sampleDnsResolver",
    "sampleInboundEndpoint",
  );
}

async function main(): Promise<void> {
  await deleteInboundEndpointForDNSResolver();
}

main().catch(console.error);
