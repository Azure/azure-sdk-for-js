// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DnsResolverManagementClient } = require("@azure/arm-dnsresolver");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets properties of a DNS resolver domain list.
 *
 * @summary gets properties of a DNS resolver domain list.
 * x-ms-original-file: 2025-10-01-preview/DnsResolverDomainList_BulkDomains_Get.json
 */
async function retrieveDNSResolverDomainListWithBulkNumberOfDomains() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const result = await client.dnsResolverDomainLists.get(
    "sampleResourceGroup",
    "sampleDnsResolverDomainList",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets properties of a DNS resolver domain list.
 *
 * @summary gets properties of a DNS resolver domain list.
 * x-ms-original-file: 2025-10-01-preview/DnsResolverDomainList_Get.json
 */
async function retrieveDNSResolverDomainListWithLessThan1000Domains() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const result = await client.dnsResolverDomainLists.get(
    "sampleResourceGroup",
    "sampleDnsResolverDomainList",
  );
  console.log(result);
}

async function main() {
  await retrieveDNSResolverDomainListWithBulkNumberOfDomains();
  await retrieveDNSResolverDomainListWithLessThan1000Domains();
}

main().catch(console.error);
