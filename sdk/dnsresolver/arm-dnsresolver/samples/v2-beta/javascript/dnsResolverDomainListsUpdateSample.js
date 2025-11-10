// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DnsResolverManagementClient } = require("@azure/arm-dnsresolver");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a DNS resolver domain list.
 *
 * @summary updates a DNS resolver domain list.
 * x-ms-original-file: 2025-10-01-preview/DnsResolverDomainList_Patch.json
 */
async function updateDNSResolverDomainList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const result = await client.dnsResolverDomainLists.update(
    "sampleResourceGroup",
    "sampleDnsResolverDomainList",
    { properties: { domains: ["contoso.com"] }, tags: { key1: "value1" } },
  );
  console.log(result);
}

async function main() {
  await updateDNSResolverDomainList();
}

main().catch(console.error);
