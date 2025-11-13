// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  DnsResolverPolicyVirtualNetworkLinkPatch} from "@azure/arm-dnsresolver";
import {
  DnsResolverManagementClient,
} from "@azure/arm-dnsresolver";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates a DNS resolver policy virtual network link.
 *
 * @summary Updates a DNS resolver policy virtual network link.
 * x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/DnsResolver/preview/2025-10-01-preview/examples/DnsResolverPolicyVirtualNetworkLink_Patch.json
 */
async function updateDnsResolverPolicyVirtualNetworkLink(): Promise<void> {
  const subscriptionId =
    process.env["DNSRESOLVER_SUBSCRIPTION_ID"] ||
    "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const resourceGroupName =
    process.env["DNSRESOLVER_RESOURCE_GROUP"] || "sampleResourceGroup";
  const dnsResolverPolicyName = "sampleDnsResolverPolicy";
  const dnsResolverPolicyVirtualNetworkLinkName = "sampleVirtualNetworkLink";
  const parameters: DnsResolverPolicyVirtualNetworkLinkPatch = {
    tags: { key1: "value1" },
  };
  const credential = new DefaultAzureCredential();
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const result =
    await client.dnsResolverPolicyVirtualNetworkLinks.beginUpdateAndWait(
      resourceGroupName,
      dnsResolverPolicyName,
      dnsResolverPolicyVirtualNetworkLinkName,
      parameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await updateDnsResolverPolicyVirtualNetworkLink();
}

main().catch(console.error);
