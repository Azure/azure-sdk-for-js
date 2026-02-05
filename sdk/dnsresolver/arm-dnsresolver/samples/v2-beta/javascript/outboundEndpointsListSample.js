// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DnsResolverManagementClient } = require("@azure/arm-dnsresolver");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists outbound endpoints for a DNS resolver.
 *
 * @summary Lists outbound endpoints for a DNS resolver.
 * x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/DnsResolver/preview/2025-10-01-preview/examples/OutboundEndpoint_List.json
 */
async function listOutboundEndpointsByDnsResolver() {
  const subscriptionId =
    process.env["DNSRESOLVER_SUBSCRIPTION_ID"] || "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const resourceGroupName = process.env["DNSRESOLVER_RESOURCE_GROUP"] || "sampleResourceGroup";
  const dnsResolverName = "sampleDnsResolver";
  const credential = new DefaultAzureCredential();
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.outboundEndpoints.list(resourceGroupName, dnsResolverName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listOutboundEndpointsByDnsResolver();
}

main().catch(console.error);
