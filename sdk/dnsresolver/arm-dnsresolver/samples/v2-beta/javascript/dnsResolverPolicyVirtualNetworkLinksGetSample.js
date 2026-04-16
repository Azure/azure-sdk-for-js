// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DnsResolverManagementClient } = require("@azure/arm-dnsresolver");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets properties of a DNS resolver policy virtual network link.
 *
 * @summary Gets properties of a DNS resolver policy virtual network link.
 * x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/DnsResolver/preview/2025-10-01-preview/examples/DnsResolverPolicyVirtualNetworkLink_Get.json
 */
async function retrieveDnsResolverPolicyVirtualNetworkLink() {
  const subscriptionId =
    process.env["DNSRESOLVER_SUBSCRIPTION_ID"] || "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const resourceGroupName = process.env["DNSRESOLVER_RESOURCE_GROUP"] || "sampleResourceGroup";
  const dnsResolverPolicyName = "sampleDnsResolverPolicy";
  const dnsResolverPolicyVirtualNetworkLinkName = "sampleVirtualNetworkLink";
  const credential = new DefaultAzureCredential();
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const result = await client.dnsResolverPolicyVirtualNetworkLinks.get(
    resourceGroupName,
    dnsResolverPolicyName,
    dnsResolverPolicyVirtualNetworkLinkName,
  );
  console.log(result);
}

async function main() {
  await retrieveDnsResolverPolicyVirtualNetworkLink();
}

main().catch(console.error);
