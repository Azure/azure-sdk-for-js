// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DnsResolverManagementClient } from "@azure/arm-dnsresolver";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a DNS resolver.
 *
 * @summary creates or updates a DNS resolver.
 * x-ms-original-file: 2025-10-01-preview/DnsResolver_Put.json
 */
async function upsertDNSResolver(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const result = await client.dnsResolvers.createOrUpdate(
    "sampleResourceGroup",
    "sampleDnsResolver",
    {
      location: "westus2",
      properties: {
        virtualNetwork: {
          id: "/subscriptions/cbb1387e-4b03-44f2-ad41-58d4677b9873/resourceGroups/virtualNetworkResourceGroup/providers/Microsoft.Network/virtualNetworks/sampleVirtualNetwork",
        },
      },
      tags: { key1: "value1" },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await upsertDNSResolver();
}

main().catch(console.error);
