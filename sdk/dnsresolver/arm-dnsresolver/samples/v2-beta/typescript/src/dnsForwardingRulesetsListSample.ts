// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DnsResolverManagementClient } from "@azure/arm-dnsresolver";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists DNS forwarding rulesets in all resource groups of a subscription.
 *
 * @summary lists DNS forwarding rulesets in all resource groups of a subscription.
 * x-ms-original-file: 2025-10-01-preview/DnsForwardingRuleset_ListBySubscription.json
 */
async function listDNSForwardingRulesetsBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dnsForwardingRulesets.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listDNSForwardingRulesetsBySubscription();
}

main().catch(console.error);
