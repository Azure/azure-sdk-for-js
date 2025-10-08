// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DnsResolverManagementClient } = require("@azure/arm-dnsresolver");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a DNS resolver policy virtual network link. WARNING: This operation cannot be undone.
 *
 * @summary deletes a DNS resolver policy virtual network link. WARNING: This operation cannot be undone.
 * x-ms-original-file: 2025-10-01-preview/DnsResolverPolicyVirtualNetworkLink_Delete.json
 */
async function deleteDNSResolverPolicyVirtualNetworkLink() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  await client.dnsResolverPolicyVirtualNetworkLinks.delete(
    "sampleResourceGroup",
    "sampleDnsResolverPolicy",
    "sampleVirtualNetworkLink",
  );
}

async function main() {
  await deleteDNSResolverPolicyVirtualNetworkLink();
}

main().catch(console.error);
