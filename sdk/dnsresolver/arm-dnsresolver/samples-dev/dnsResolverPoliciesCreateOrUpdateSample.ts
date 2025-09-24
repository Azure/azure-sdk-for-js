// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates a DNS resolver policy.
 *
 * @summary Creates or updates a DNS resolver policy.
 * x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2025-05-01/examples/DnsResolverPolicy_Put.json
 */

import {
  DnsResolverPolicy,
  DnsResolverManagementClient,
} from "@azure/arm-dnsresolver";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function upsertDnsResolverPolicy(): Promise<void> {
  const subscriptionId =
    process.env["DNSRESOLVER_SUBSCRIPTION_ID"] ||
    "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const resourceGroupName =
    process.env["DNSRESOLVER_RESOURCE_GROUP"] || "sampleResourceGroup";
  const dnsResolverPolicyName = "sampleDnsResolverPolicy";
  const parameters: DnsResolverPolicy = {
    location: "westus2",
    tags: { key1: "value1" },
  };
  const credential = new DefaultAzureCredential();
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const result = await client.dnsResolverPolicies.beginCreateOrUpdateAndWait(
    resourceGroupName,
    dnsResolverPolicyName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await upsertDnsResolverPolicy();
}

main().catch(console.error);
