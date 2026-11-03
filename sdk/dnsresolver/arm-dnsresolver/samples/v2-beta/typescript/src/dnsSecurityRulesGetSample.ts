// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DnsResolverManagementClient } from "@azure/arm-dnsresolver";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets properties of a DNS security rule for a DNS resolver policy.
 *
 * @summary gets properties of a DNS security rule for a DNS resolver policy.
 * x-ms-original-file: 2025-10-01-preview/DnsSecurityRule_Get.json
 */
async function retrieveDNSSecurityRuleForDNSResolverPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const result = await client.dnsSecurityRules.get(
    "sampleResourceGroup",
    "sampleDnsResolverPolicy",
    "sampleDnsSecurityRule",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await retrieveDNSSecurityRuleForDNSResolverPolicy();
}

main().catch(console.error);
