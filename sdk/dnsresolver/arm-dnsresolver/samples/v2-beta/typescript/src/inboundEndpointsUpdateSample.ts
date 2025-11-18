// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  InboundEndpointPatch} from "@azure/arm-dnsresolver";
import {
  DnsResolverManagementClient,
} from "@azure/arm-dnsresolver";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates an inbound endpoint for a DNS resolver.
 *
 * @summary Updates an inbound endpoint for a DNS resolver.
 * x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/DnsResolver/preview/2025-10-01-preview/examples/InboundEndpoint_Patch.json
 */
async function updateInboundEndpointForDnsResolver(): Promise<void> {
  const subscriptionId =
    process.env["DNSRESOLVER_SUBSCRIPTION_ID"] ||
    "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const resourceGroupName =
    process.env["DNSRESOLVER_RESOURCE_GROUP"] || "sampleResourceGroup";
  const dnsResolverName = "sampleDnsResolver";
  const inboundEndpointName = "sampleInboundEndpoint";
  const parameters: InboundEndpointPatch = { tags: { key1: "value1" } };
  const credential = new DefaultAzureCredential();
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const result = await client.inboundEndpoints.beginUpdateAndWait(
    resourceGroupName,
    dnsResolverName,
    inboundEndpointName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateInboundEndpointForDnsResolver();
}

main().catch(console.error);
