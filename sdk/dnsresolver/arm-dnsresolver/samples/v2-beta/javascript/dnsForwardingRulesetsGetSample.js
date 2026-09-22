// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DnsResolverManagementClient } = require("@azure/arm-dnsresolver");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a DNS forwarding ruleset properties.
 *
 * @summary gets a DNS forwarding ruleset properties.
 * x-ms-original-file: 2025-10-01-preview/DnsForwardingRuleset_Get.json
 */
async function retrieveDNSForwardingRuleset() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const result = await client.dnsForwardingRulesets.get(
    "sampleResourceGroup",
    "sampleDnsForwardingRuleset",
  );
  console.log(result);
}

async function main() {
  await retrieveDNSForwardingRuleset();
}

main().catch(console.error);
