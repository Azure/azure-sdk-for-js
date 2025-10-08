// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DnsResolverManagementClient } = require("@azure/arm-dnsresolver");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a DNS resolver policy.
 *
 * @summary creates or updates a DNS resolver policy.
 * x-ms-original-file: 2025-10-01-preview/DnsResolverPolicy_Put.json
 */
async function upsertDNSResolverPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const result = await client.dnsResolverPolicies.createOrUpdate(
    "sampleResourceGroup",
    "sampleDnsResolverPolicy",
    { location: "westus2", tags: { key1: "value1" } },
  );
  console.log(result);
}

async function main() {
  await upsertDNSResolverPolicy();
}

main().catch(console.error);
