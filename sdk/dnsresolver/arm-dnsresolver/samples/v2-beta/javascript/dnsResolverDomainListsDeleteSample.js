// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DnsResolverManagementClient } = require("@azure/arm-dnsresolver");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a DNS resolver domain list. WARNING: This operation cannot be undone.
 *
 * @summary deletes a DNS resolver domain list. WARNING: This operation cannot be undone.
 * x-ms-original-file: 2025-10-01-preview/DnsResolverDomainList_Delete.json
 */
async function deleteDNSResolverDomainList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  await client.dnsResolverDomainLists.delete("sampleResourceGroup", "sampleDnsResolverDomainList");
}

async function main() {
  await deleteDNSResolverDomainList();
}

main().catch(console.error);
