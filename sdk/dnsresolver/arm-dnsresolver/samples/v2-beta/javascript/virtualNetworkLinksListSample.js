// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DnsResolverManagementClient } = require("@azure/arm-dnsresolver");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists virtual network links to a DNS forwarding ruleset.
 *
 * @summary lists virtual network links to a DNS forwarding ruleset.
 * x-ms-original-file: 2025-10-01-preview/VirtualNetworkLink_List.json
 */
async function listVirtualNetworkLinksToADNSForwardingRuleset() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualNetworkLinks.list(
    "sampleResourceGroup",
    "sampleDnsForwardingRuleset",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listVirtualNetworkLinksToADNSForwardingRuleset();
}

main().catch(console.error);
