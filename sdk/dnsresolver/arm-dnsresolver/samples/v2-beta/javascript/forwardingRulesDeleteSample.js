// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DnsResolverManagementClient } = require("@azure/arm-dnsresolver");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a forwarding rule in a DNS forwarding ruleset. WARNING: This operation cannot be undone.
 *
 * @summary deletes a forwarding rule in a DNS forwarding ruleset. WARNING: This operation cannot be undone.
 * x-ms-original-file: 2025-10-01-preview/ForwardingRule_Delete.json
 */
async function deleteForwardingRuleInADNSForwardingRuleset() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  await client.forwardingRules.delete(
    "sampleResourceGroup",
    "sampleDnsForwardingRuleset",
    "sampleForwardingRule",
  );
}

async function main() {
  await deleteForwardingRuleInADNSForwardingRuleset();
}

main().catch(console.error);
