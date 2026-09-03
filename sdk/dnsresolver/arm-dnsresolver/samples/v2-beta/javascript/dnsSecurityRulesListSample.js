// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DnsResolverManagementClient } = require("@azure/arm-dnsresolver");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists DNS security rules for a DNS resolver policy.
 *
 * @summary lists DNS security rules for a DNS resolver policy.
 * x-ms-original-file: 2025-10-01-preview/DnsSecurityRule_List.json
 */
async function listDNSSecurityRulesByDNSResolverPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dnsSecurityRules.list(
    "sampleResourceGroup",
    "sampleDnsResolverPolicy",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listDNSSecurityRulesByDNSResolverPolicy();
}

main().catch(console.error);
