// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DnsResolverManagementClient } = require("@azure/arm-dnsresolver");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists DNS resolver domain lists within a resource group.
 *
 * @summary lists DNS resolver domain lists within a resource group.
 * x-ms-original-file: 2025-10-01-preview/DnsResolverDomainList_ListByResourceGroup.json
 */
async function listDNSResolverDomainListsByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dnsResolverDomainLists.listByResourceGroup(
    "sampleResourceGroup",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listDNSResolverDomainListsByResourceGroup();
}

main().catch(console.error);
