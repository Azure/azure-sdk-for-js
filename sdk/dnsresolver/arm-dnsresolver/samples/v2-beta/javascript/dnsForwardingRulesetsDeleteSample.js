// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DnsResolverManagementClient } = require("@azure/arm-dnsresolver");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a DNS forwarding ruleset. WARNING: This operation cannot be undone. All forwarding rules within the ruleset will be deleted.
 *
 * @summary deletes a DNS forwarding ruleset. WARNING: This operation cannot be undone. All forwarding rules within the ruleset will be deleted.
 * x-ms-original-file: 2025-10-01-preview/DnsForwardingRuleset_Delete.json
 */
async function deleteDNSForwardingRuleset() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  await client.dnsForwardingRulesets.delete(
    "sampleResourceGroup",
    "samplednsForwardingRulesetName",
  );
}

async function main() {
  await deleteDNSForwardingRuleset();
}

main().catch(console.error);
