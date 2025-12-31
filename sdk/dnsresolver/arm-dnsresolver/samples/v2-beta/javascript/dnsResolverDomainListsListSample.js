// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DnsResolverManagementClient } = require("@azure/arm-dnsresolver");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists DNS resolver domain lists in all resource groups of a subscription.
 *
 * @summary Lists DNS resolver domain lists in all resource groups of a subscription.
 * x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/DnsResolver/preview/2025-10-01-preview/examples/DnsResolverDomainList_ListBySubscription.json
 */
async function listDnsResolverDomainListsBySubscription() {
  const subscriptionId =
    process.env["DNSRESOLVER_SUBSCRIPTION_ID"] || "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const credential = new DefaultAzureCredential();
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dnsResolverDomainLists.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listDnsResolverDomainListsBySubscription();
}

main().catch(console.error);
