// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DnsResolverManagementClient } = require("@azure/arm-dnsresolver");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a DNS resolver policy.
 *
 * @summary updates a DNS resolver policy.
 * x-ms-original-file: 2025-10-01-preview/DnsResolverPolicy_Patch.json
 */
async function updateDNSResolverPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const result = await client.dnsResolverPolicies.update(
    "sampleResourceGroup",
    "sampleDnsResolverPolicy",
    { tags: { key1: "value1" } },
  );
  console.log(result);
}

async function main() {
  await updateDNSResolverPolicy();
}

main().catch(console.error);
