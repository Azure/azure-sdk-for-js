// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DnsResolverManagementClient } = require("@azure/arm-dnsresolver");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a forwarding rule in a DNS forwarding ruleset.
 *
 * @summary creates or updates a forwarding rule in a DNS forwarding ruleset.
 * x-ms-original-file: 2025-10-01-preview/ForwardingRule_Put.json
 */
async function upsertForwardingRuleInADNSForwardingRuleset() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const result = await client.forwardingRules.createOrUpdate(
    "sampleResourceGroup",
    "sampleDnsForwardingRuleset",
    "sampleForwardingRule",
    {
      properties: {
        domainName: "contoso.com.",
        forwardingRuleState: "Enabled",
        metadata: { additionalProp1: "value1" },
        targetDnsServers: [
          { ipAddress: "10.0.0.1", port: 53 },
          { ipAddress: "10.0.0.2", port: 53 },
        ],
      },
    },
  );
  console.log(result);
}

async function main() {
  await upsertForwardingRuleInADNSForwardingRuleset();
}

main().catch(console.error);
