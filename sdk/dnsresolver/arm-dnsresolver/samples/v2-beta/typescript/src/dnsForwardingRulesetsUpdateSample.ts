// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DnsResolverManagementClient } from "@azure/arm-dnsresolver";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a DNS forwarding ruleset.
 *
 * @summary updates a DNS forwarding ruleset.
 * x-ms-original-file: 2025-10-01-preview/DnsForwardingRuleset_Patch.json
 */
async function updateDNSForwardingRuleset(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const result = await client.dnsForwardingRulesets.update(
    "sampleResourceGroup",
    "sampleDnsForwardingRuleset",
    { tags: { key1: "value1" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateDNSForwardingRuleset();
}

main().catch(console.error);
