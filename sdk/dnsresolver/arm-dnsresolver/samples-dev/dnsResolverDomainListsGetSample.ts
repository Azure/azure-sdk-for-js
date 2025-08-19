// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets properties of a DNS resolver domain list.
 *
 * @summary Gets properties of a DNS resolver domain list.
 * x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2025-05-01/examples/DnsResolverDomainList_BulkDomains_Get.json
 */

import { DnsResolverManagementClient } from "@azure/arm-dnsresolver";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function retrieveDnsResolverDomainListWithBulkNumberOfDomains(): Promise<void> {
  const subscriptionId =
    process.env["DNSRESOLVER_SUBSCRIPTION_ID"] ||
    "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const resourceGroupName =
    process.env["DNSRESOLVER_RESOURCE_GROUP"] || "sampleResourceGroup";
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
 * x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2025-05-01/examples/DnsResolverDomainList_Get.json
 */
async function retrieveDnsResolverDomainListWithLessThan1000Domains(): Promise<void> {
  const subscriptionId =
    process.env["DNSRESOLVER_SUBSCRIPTION_ID"] ||
    "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const resourceGroupName =
    process.env["DNSRESOLVER_RESOURCE_GROUP"] || "sampleResourceGroup";
  const dnsResolverDomainListName = "sampleDnsResolverDomainList";
  const credential = new DefaultAzureCredential();
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const result = await client.dnsResolverDomainLists.get(
    resourceGroupName,
    dnsResolverDomainListName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await retrieveDnsResolverDomainListWithBulkNumberOfDomains();
  await retrieveDnsResolverDomainListWithLessThan1000Domains();
}

main().catch(console.error);
