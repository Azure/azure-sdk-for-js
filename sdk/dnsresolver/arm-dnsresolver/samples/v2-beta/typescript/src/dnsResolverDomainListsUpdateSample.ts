// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  DnsResolverDomainListPatch} from "@azure/arm-dnsresolver";
import {
  DnsResolverManagementClient,
} from "@azure/arm-dnsresolver";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates a DNS resolver domain list.
 *
 * @summary Updates a DNS resolver domain list.
 * x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/DnsResolver/preview/2025-10-01-preview/examples/DnsResolverDomainList_Patch.json
 */
async function updateDnsResolverDomainList(): Promise<void> {
  const subscriptionId =
    process.env["DNSRESOLVER_SUBSCRIPTION_ID"] ||
    "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const resourceGroupName =
    process.env["DNSRESOLVER_RESOURCE_GROUP"] || "sampleResourceGroup";
  const dnsResolverDomainListName = "sampleDnsResolverDomainList";
  const parameters: DnsResolverDomainListPatch = {
    domains: ["contoso.com"],
    tags: { key1: "value1" },
  };
  const credential = new DefaultAzureCredential();
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const result = await client.dnsResolverDomainLists.beginUpdateAndWait(
    resourceGroupName,
    dnsResolverDomainListName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateDnsResolverDomainList();
}

main().catch(console.error);
