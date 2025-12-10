// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DnsResolverManagementClient } = require("@azure/arm-dnsresolver");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets properties of a DNS resolver domain list.
 *
 * @summary Gets properties of a DNS resolver domain list.
 * x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/DnsResolver/preview/2025-10-01-preview/examples/DnsResolverDomainList_BulkDomains_Get.json
 */
async function retrieveDnsResolverDomainListWithBulkNumberOfDomains() {
  const subscriptionId =
    process.env["DNSRESOLVER_SUBSCRIPTION_ID"] || "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const resourceGroupName = process.env["DNSRESOLVER_RESOURCE_GROUP"] || "sampleResourceGroup";
  const dnsResolverDomainListName = "sampleDnsResolverDomainList";
  const credential = new DefaultAzureCredential();
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const result = await client.dnsResolverDomainLists.get(
    resourceGroupName,
    dnsResolverDomainListName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Gets properties of a DNS resolver domain list.
 *
 * @summary Gets properties of a DNS resolver domain list.
 * x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/DnsResolver/preview/2025-10-01-preview/examples/DnsResolverDomainList_Get.json
 */
async function retrieveDnsResolverDomainListWithLessThan1000Domains() {
  const subscriptionId =
    process.env["DNSRESOLVER_SUBSCRIPTION_ID"] || "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const resourceGroupName = process.env["DNSRESOLVER_RESOURCE_GROUP"] || "sampleResourceGroup";
  const dnsResolverDomainListName = "sampleDnsResolverDomainList";
  const credential = new DefaultAzureCredential();
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const result = await client.dnsResolverDomainLists.get(
    resourceGroupName,
    dnsResolverDomainListName,
  );
  console.log(result);
}

async function main() {
  await retrieveDnsResolverDomainListWithBulkNumberOfDomains();
  await retrieveDnsResolverDomainListWithLessThan1000Domains();
}

main().catch(console.error);
