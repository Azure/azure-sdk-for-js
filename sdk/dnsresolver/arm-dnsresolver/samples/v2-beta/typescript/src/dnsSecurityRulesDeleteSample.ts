// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DnsResolverManagementClient } from "@azure/arm-dnsresolver";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a DNS security rule for a DNS resolver policy. WARNING: This operation cannot be undone.
 *
 * @summary deletes a DNS security rule for a DNS resolver policy. WARNING: This operation cannot be undone.
 * x-ms-original-file: 2025-10-01-preview/DnsSecurityRule_Delete.json
 */
async function deleteDNSSecurityRuleForDNSResolverPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  await client.dnsSecurityRules.delete(
    "sampleResourceGroup",
    "sampleDnsDnsResolverPolicy",
    "sampleDnsSecurityRule",
  );
}

async function main(): Promise<void> {
  await deleteDNSSecurityRuleForDNSResolverPolicy();
}

main().catch(console.error);
