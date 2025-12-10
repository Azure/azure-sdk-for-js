// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  DnsSecurityRule} from "@azure/arm-dnsresolver";
import {
  DnsResolverManagementClient,
} from "@azure/arm-dnsresolver";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates a DNS security rule for a DNS resolver policy.
 *
 * @summary Creates or updates a DNS security rule for a DNS resolver policy.
 * x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/DnsResolver/preview/2025-10-01-preview/examples/DnsSecurityRule_Put.json
 */
async function upsertDnsSecurityRule(): Promise<void> {
  const subscriptionId =
    process.env["DNSRESOLVER_SUBSCRIPTION_ID"] ||
    "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const resourceGroupName =
    process.env["DNSRESOLVER_RESOURCE_GROUP"] || "sampleResourceGroup";
  const dnsResolverPolicyName = "sampleDnsResolverPolicy";
  const dnsSecurityRuleName = "sampleDnsSecurityRule";
  const parameters: DnsSecurityRule = {
    action: { actionType: "Block" },
    dnsResolverDomainLists: [
      {
        id: "/subscriptions/abdd4249-9f34-4cc6-8e42-c2e32110603e/resourceGroups/sampleResourceGroup/providers/Microsoft.Network/dnsResolverDomainLists/sampleDnsResolverDomainList",
      },
    ],
    dnsSecurityRuleState: "Enabled",
    location: "westus2",
    priority: 100,
    tags: { key1: "value1" },
  };
  const credential = new DefaultAzureCredential();
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const result = await client.dnsSecurityRules.beginCreateOrUpdateAndWait(
    resourceGroupName,
    dnsResolverPolicyName,
    dnsSecurityRuleName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a DNS security rule for a DNS resolver policy.
 *
 * @summary Creates or updates a DNS security rule for a DNS resolver policy.
 * x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/DnsResolver/preview/2025-10-01-preview/examples/DnsSecurityRule_ManagedDomainList_Put.json
 */
async function upsertDnsSecurityRuleWithManagedDomainList(): Promise<void> {
  const subscriptionId =
    process.env["DNSRESOLVER_SUBSCRIPTION_ID"] ||
    "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const resourceGroupName =
    process.env["DNSRESOLVER_RESOURCE_GROUP"] || "sampleResourceGroup";
  const dnsResolverPolicyName = "sampleDnsResolverPolicy";
  const dnsSecurityRuleName = "sampleDnsSecurityRule";
  const parameters: DnsSecurityRule = {
    action: { actionType: "Block" },
    dnsSecurityRuleState: "Enabled",
    location: "westus2",
    managedDomainLists: ["AzureDnsThreatIntel"],
    priority: 100,
    tags: { key1: "value1" },
  };
  const credential = new DefaultAzureCredential();
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const result = await client.dnsSecurityRules.beginCreateOrUpdateAndWait(
    resourceGroupName,
    dnsResolverPolicyName,
    dnsSecurityRuleName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await upsertDnsSecurityRule();
  await upsertDnsSecurityRuleWithManagedDomainList();
}

main().catch(console.error);
