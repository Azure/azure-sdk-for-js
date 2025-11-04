// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DnsResolverManagementClient } = require("@azure/arm-dnsresolver");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a DNS resolver domain list.
 *
 * @summary creates or updates a DNS resolver domain list.
 * x-ms-original-file: 2025-10-01-preview/DnsResolverDomainList_BulkDomains_Put.json
 */
async function upsertDNSResolverDomainListWithBulkNumberOfDomains() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const result = await client.dnsResolverDomainLists.createOrUpdate(
    "sampleResourceGroup",
    "sampleDnsResolverDomainList",
    { location: "westus2", properties: {}, tags: { key1: "value1" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a DNS resolver domain list.
 *
 * @summary creates or updates a DNS resolver domain list.
 * x-ms-original-file: 2025-10-01-preview/DnsResolverDomainList_Put.json
 */
async function upsertDNSResolverDomainListWithLessThan1000Domains() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const result = await client.dnsResolverDomainLists.createOrUpdate(
    "sampleResourceGroup",
    "sampleDnsResolverDomainList",
    {
      location: "westus2",
      properties: { domains: ["contoso.com"] },
      tags: { key1: "value1" },
    },
  );
  console.log(result);
}

async function main() {
  await upsertDNSResolverDomainListWithBulkNumberOfDomains();
  await upsertDNSResolverDomainListWithLessThan1000Domains();
}

main().catch(console.error);
