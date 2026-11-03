// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DnsResolverManagementClient } = require("@azure/arm-dnsresolver");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists DNS resolver policy resource IDs linked to a virtual network.
 *
 * @summary lists DNS resolver policy resource IDs linked to a virtual network.
 * x-ms-original-file: 2025-10-01-preview/DnsResolverPolicy_ListByVirtualNetwork.json
 */
async function listDNSResolverPoliciesByVirtualNetwork() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dnsResolverPolicies.listByVirtualNetwork(
    "sampleResourceGroup",
    "sampleVirtualNetwork",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listDNSResolverPoliciesByVirtualNetwork();
}

main().catch(console.error);
