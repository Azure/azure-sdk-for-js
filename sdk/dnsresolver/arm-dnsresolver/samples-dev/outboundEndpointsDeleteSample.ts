// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes an outbound endpoint for a DNS resolver. WARNING: This operation cannot be undone.
 *
 * @summary Deletes an outbound endpoint for a DNS resolver. WARNING: This operation cannot be undone.
 * x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2025-05-01/examples/OutboundEndpoint_Delete.json
 */

import { DnsResolverManagementClient } from "@azure/arm-dnsresolver";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteOutboundEndpointForDnsResolver(): Promise<void> {
  const subscriptionId =
    process.env["DNSRESOLVER_SUBSCRIPTION_ID"] ||
    "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const resourceGroupName =
    process.env["DNSRESOLVER_RESOURCE_GROUP"] || "sampleResourceGroup";
  const dnsResolverName = "sampleDnsResolver";
  const outboundEndpointName = "sampleOutboundEndpoint";
  const credential = new DefaultAzureCredential();
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const result = await client.outboundEndpoints.beginDeleteAndWait(
    resourceGroupName,
    dnsResolverName,
    outboundEndpointName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteOutboundEndpointForDnsResolver();
}

main().catch(console.error);
