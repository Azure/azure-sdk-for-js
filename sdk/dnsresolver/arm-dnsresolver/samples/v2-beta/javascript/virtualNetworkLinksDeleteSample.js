// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DnsResolverManagementClient } = require("@azure/arm-dnsresolver");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a virtual network link to a DNS forwarding ruleset. WARNING: This operation cannot be undone.
 *
 * @summary deletes a virtual network link to a DNS forwarding ruleset. WARNING: This operation cannot be undone.
 * x-ms-original-file: 2025-10-01-preview/VirtualNetworkLink_Delete.json
 */
async function deleteVirtualNetworkLinkToADNSForwardingRuleset() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  await client.virtualNetworkLinks.delete(
    "sampleResourceGroup",
    "sampleDnsForwardingRuleset",
    "sampleVirtualNetworkLink",
  );
}

async function main() {
  await deleteVirtualNetworkLinkToADNSForwardingRuleset();
}

main().catch(console.error);
