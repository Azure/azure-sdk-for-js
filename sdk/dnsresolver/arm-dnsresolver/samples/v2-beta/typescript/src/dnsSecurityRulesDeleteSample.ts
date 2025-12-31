// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DnsResolverManagementClient } from "@azure/arm-dnsresolver";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes a DNS security rule for a DNS resolver policy. WARNING: This operation cannot be undone.
 *
 * @summary Deletes a DNS security rule for a DNS resolver policy. WARNING: This operation cannot be undone.
 * x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/DnsResolver/preview/2025-10-01-preview/examples/DnsSecurityRule_Delete.json
 */
async function deleteDnsSecurityRuleForDnsResolverPolicy(): Promise<void> {
  const subscriptionId =
    process.env["DNSRESOLVER_SUBSCRIPTION_ID"] ||
    "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const resourceGroupName =
    process.env["DNSRESOLVER_RESOURCE_GROUP"] || "sampleResourceGroup";
  const dnsResolverPolicyName = "sampleDnsDnsResolverPolicy";
  const dnsSecurityRuleName = "sampleDnsSecurityRule";
  const credential = new DefaultAzureCredential();
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const result = await client.dnsSecurityRules.beginDeleteAndWait(
    resourceGroupName,
    dnsResolverPolicyName,
    dnsSecurityRuleName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteDnsSecurityRuleForDnsResolverPolicy();
}

main().catch(console.error);
