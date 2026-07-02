// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DnsResolverManagementClient } from "@azure/arm-dnsresolver";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a DNS resolver policy virtual network link.
 *
 * @summary updates a DNS resolver policy virtual network link.
 * x-ms-original-file: 2025-10-01-preview/DnsResolverPolicyVirtualNetworkLink_Patch.json
 */
async function updateDNSResolverPolicyVirtualNetworkLink(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const result = await client.dnsResolverPolicyVirtualNetworkLinks.update(
    "sampleResourceGroup",
    "sampleDnsResolverPolicy",
    "sampleVirtualNetworkLink",
    { tags: { key1: "value1" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateDNSResolverPolicyVirtualNetworkLink();
}

main().catch(console.error);
