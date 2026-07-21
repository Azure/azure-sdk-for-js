// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DnsResolverManagementClient } from "@azure/arm-dnsresolver";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists DNS forwarding ruleset resource IDs attached to a virtual network.
 *
 * @summary lists DNS forwarding ruleset resource IDs attached to a virtual network.
 * x-ms-original-file: 2025-10-01-preview/DnsForwardingRuleset_ListByVirtualNetwork.json
 */
async function listDNSForwardingRulesetsByVirtualNetwork(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dnsForwardingRulesets.listByVirtualNetwork(
    "sampleResourceGroup",
    "sampleVirtualNetwork",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listDNSForwardingRulesetsByVirtualNetwork();
}

main().catch(console.error);
