// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DnsResolverManagementClient } = require("@azure/arm-dnsresolver");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets properties of a forwarding rule in a DNS forwarding ruleset.
 *
 * @summary gets properties of a forwarding rule in a DNS forwarding ruleset.
 * x-ms-original-file: 2025-10-01-preview/ForwardingRule_Get.json
 */
async function retrieveForwardingRuleInADNSForwardingRuleset() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const result = await client.forwardingRules.get(
    "sampleResourceGroup",
    "sampleDnsForwardingRuleset",
    "sampleForwardingRule",
  );
  console.log(result);
}

async function main() {
  await retrieveForwardingRuleInADNSForwardingRuleset();
}

main().catch(console.error);
