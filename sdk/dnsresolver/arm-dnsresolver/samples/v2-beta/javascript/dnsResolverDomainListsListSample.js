// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DnsResolverManagementClient } = require("@azure/arm-dnsresolver");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists DNS resolver domain lists in all resource groups of a subscription.
 *
 * @summary lists DNS resolver domain lists in all resource groups of a subscription.
 * x-ms-original-file: 2025-10-01-preview/DnsResolverDomainList_ListBySubscription.json
 */
async function listDNSResolverDomainListsBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dnsResolverDomainLists.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listDNSResolverDomainListsBySubscription();
}

main().catch(console.error);
