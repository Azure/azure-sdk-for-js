// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DnsResolverManagementClient } from "@azure/arm-dnsresolver";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets properties of a DNS resolver policy.
 *
 * @summary Gets properties of a DNS resolver policy.
 * x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/DnsResolver/preview/2025-10-01-preview/examples/DnsResolverPolicy_Get.json
 */
async function retrieveDnsResolverPolicy(): Promise<void> {
  const subscriptionId =
    process.env["DNSRESOLVER_SUBSCRIPTION_ID"] ||
    "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const resourceGroupName =
    process.env["DNSRESOLVER_RESOURCE_GROUP"] || "sampleResourceGroup";
  const dnsResolverPolicyName = "sampleDnsResolverPolicy";
  const credential = new DefaultAzureCredential();
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const result = await client.dnsResolverPolicies.get(
    resourceGroupName,
    dnsResolverPolicyName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await retrieveDnsResolverPolicy();
}

main().catch(console.error);
