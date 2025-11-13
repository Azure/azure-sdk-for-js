// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DnsResolverManagementClient } from "@azure/arm-dnsresolver";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Lists DNS resolver policy resource IDs linked to a virtual network.
 *
 * @summary Lists DNS resolver policy resource IDs linked to a virtual network.
 * x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/DnsResolver/preview/2025-10-01-preview/examples/DnsResolverPolicy_ListByVirtualNetwork.json
 */
async function listDnsResolverPoliciesByVirtualNetwork(): Promise<void> {
  const subscriptionId =
    process.env["DNSRESOLVER_SUBSCRIPTION_ID"] ||
    "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const resourceGroupName =
    process.env["DNSRESOLVER_RESOURCE_GROUP"] || "sampleResourceGroup";
  const virtualNetworkName = "sampleVirtualNetwork";
  const credential = new DefaultAzureCredential();
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dnsResolverPolicies.listByVirtualNetwork(
    resourceGroupName,
    virtualNetworkName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listDnsResolverPoliciesByVirtualNetwork();
}

main().catch(console.error);
