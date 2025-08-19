// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes a DNS resolver policy virtual network link. WARNING: This operation cannot be undone.
 *
 * @summary Deletes a DNS resolver policy virtual network link. WARNING: This operation cannot be undone.
 * x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2025-05-01/examples/DnsResolverPolicyVirtualNetworkLink_Delete.json
 */

import { DnsResolverManagementClient } from "@azure/arm-dnsresolver";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteDnsResolverPolicyVirtualNetworkLink(): Promise<void> {
  const subscriptionId =
    process.env["DNSRESOLVER_SUBSCRIPTION_ID"] ||
    "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const resourceGroupName =
    process.env["DNSRESOLVER_RESOURCE_GROUP"] || "sampleResourceGroup";
  const dnsResolverPolicyName = "sampleDnsResolverPolicy";
  const dnsResolverPolicyVirtualNetworkLinkName = "sampleVirtualNetworkLink";
  const credential = new DefaultAzureCredential();
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const result =
    await client.dnsResolverPolicyVirtualNetworkLinks.beginDeleteAndWait(
      resourceGroupName,
      dnsResolverPolicyName,
      dnsResolverPolicyVirtualNetworkLinkName,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteDnsResolverPolicyVirtualNetworkLink();
}

main().catch(console.error);
