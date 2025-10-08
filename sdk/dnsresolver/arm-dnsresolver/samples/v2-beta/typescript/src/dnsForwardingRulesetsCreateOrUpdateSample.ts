// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DnsResolverManagementClient } from "@azure/arm-dnsresolver";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a DNS forwarding ruleset.
 *
 * @summary creates or updates a DNS forwarding ruleset.
 * x-ms-original-file: 2025-10-01-preview/DnsForwardingRuleset_Put.json
 */
async function upsertDNSForwardingRuleset(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const result = await client.dnsForwardingRulesets.createOrUpdate(
    "sampleResourceGroup",
    "samplednsForwardingRuleset",
    {
      location: "westus2",
      properties: {
        dnsResolverOutboundEndpoints: [
          {
            id: "/subscriptions/abdd4249-9f34-4cc6-8e42-c2e32110603e/resourceGroups/sampleResourceGroup/providers/Microsoft.Network/dnsResolvers/sampleDnsResolver/outboundEndpoints/sampleOutboundEndpoint0",
          },
          {
            id: "/subscriptions/abdd4249-9f34-4cc6-8e42-c2e32110603e/resourceGroups/sampleResourceGroup/providers/Microsoft.Network/dnsResolvers/sampleDnsResolver/outboundEndpoints/sampleOutboundEndpoint1",
          },
        ],
      },
      tags: { key1: "value1" },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await upsertDNSForwardingRuleset();
}

main().catch(console.error);
