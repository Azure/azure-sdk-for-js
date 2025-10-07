// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DnsResolverManagementClient } = require("@azure/arm-dnsresolver");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets properties of a DNS resolver policy virtual network link.
 *
 * @summary gets properties of a DNS resolver policy virtual network link.
 * x-ms-original-file: 2025-10-01-preview/DnsResolverPolicyVirtualNetworkLink_Get.json
 */
async function retrieveDNSResolverPolicyVirtualNetworkLink() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const result = await client.dnsResolverPolicyVirtualNetworkLinks.get(
    "sampleResourceGroup",
    "sampleDnsResolverPolicy",
    "sampleVirtualNetworkLink",
  );
  console.log(result);
}

async function main() {
  await retrieveDNSResolverPolicyVirtualNetworkLink();
}

main().catch(console.error);
