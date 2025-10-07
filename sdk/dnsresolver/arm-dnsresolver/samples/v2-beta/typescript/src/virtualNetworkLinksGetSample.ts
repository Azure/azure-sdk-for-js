// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DnsResolverManagementClient } from "@azure/arm-dnsresolver";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets properties of a virtual network link to a DNS forwarding ruleset.
 *
 * @summary gets properties of a virtual network link to a DNS forwarding ruleset.
 * x-ms-original-file: 2025-10-01-preview/VirtualNetworkLink_Get.json
 */
async function retrieveVirtualNetworkLinkToADNSForwardingRuleset(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkLinks.get(
    "sampleResourceGroup",
    "sampleDnsForwardingRuleset",
    "sampleVirtualNetworkLink",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await retrieveVirtualNetworkLinkToADNSForwardingRuleset();
}

main().catch(console.error);
