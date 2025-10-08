// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DnsResolverManagementClient } from "@azure/arm-dnsresolver";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists inbound endpoints for a DNS resolver.
 *
 * @summary lists inbound endpoints for a DNS resolver.
 * x-ms-original-file: 2025-10-01-preview/InboundEndpoint_List.json
 */
async function listInboundEndpointsByDNSResolver(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.inboundEndpoints.list(
    "sampleResourceGroup",
    "sampleDnsResolver",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listInboundEndpointsByDNSResolver();
}

main().catch(console.error);
