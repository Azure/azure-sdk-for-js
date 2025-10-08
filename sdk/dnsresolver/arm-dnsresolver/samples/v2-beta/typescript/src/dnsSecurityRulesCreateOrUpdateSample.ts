// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DnsResolverManagementClient } from "@azure/arm-dnsresolver";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a DNS security rule for a DNS resolver policy.
 *
 * @summary creates or updates a DNS security rule for a DNS resolver policy.
 * x-ms-original-file: 2025-10-01-preview/DnsSecurityRule_ManagedDomainList_Put.json
 */
async function upsertDNSSecurityRuleWithManagedDomainList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const result = await client.dnsSecurityRules.createOrUpdate(
    "sampleResourceGroup",
    "sampleDnsResolverPolicy",
    "sampleDnsSecurityRule",
    {
      location: "westus2",
      properties: {
        action: { actionType: "Block" },
        managedDomainLists: ["AzureDnsThreatIntel"],
        dnsSecurityRuleState: "Enabled",
        priority: 100,
      },
      tags: { key1: "value1" },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a DNS security rule for a DNS resolver policy.
 *
 * @summary creates or updates a DNS security rule for a DNS resolver policy.
 * x-ms-original-file: 2025-10-01-preview/DnsSecurityRule_Put.json
 */
async function upsertDNSSecurityRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const result = await client.dnsSecurityRules.createOrUpdate(
    "sampleResourceGroup",
    "sampleDnsResolverPolicy",
    "sampleDnsSecurityRule",
    {
      location: "westus2",
      properties: {
        action: { actionType: "Block" },
        dnsResolverDomainLists: [
          {
            id: "/subscriptions/abdd4249-9f34-4cc6-8e42-c2e32110603e/resourceGroups/sampleResourceGroup/providers/Microsoft.Network/dnsResolverDomainLists/sampleDnsResolverDomainList",
          },
        ],
        dnsSecurityRuleState: "Enabled",
        priority: 100,
      },
      tags: { key1: "value1" },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await upsertDNSSecurityRuleWithManagedDomainList();
  await upsertDNSSecurityRule();
}

main().catch(console.error);
