// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates a DNS security rule.
 *
 * @summary Updates a DNS security rule.
 * x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2025-05-01/examples/DnsSecurityRule_Patch.json
 */

import {
  DnsSecurityRulePatch,
  DnsResolverManagementClient,
} from "@azure/arm-dnsresolver";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateDnsSecurityRuleForDnsResolverPolicy(): Promise<void> {
  const subscriptionId =
    process.env["DNSRESOLVER_SUBSCRIPTION_ID"] ||
    "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const resourceGroupName =
    process.env["DNSRESOLVER_RESOURCE_GROUP"] || "sampleResourceGroup";
  const dnsResolverPolicyName = "sampleDnsResolverPolicy";
  const dnsSecurityRuleName = "sampleDnsSecurityRule";
  const parameters: DnsSecurityRulePatch = {
    dnsSecurityRuleState: "Disabled",
    tags: { key1: "value1" },
  };
  const credential = new DefaultAzureCredential();
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const result = await client.dnsSecurityRules.beginUpdateAndWait(
    resourceGroupName,
    dnsResolverPolicyName,
    dnsSecurityRuleName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateDnsSecurityRuleForDnsResolverPolicy();
}

main().catch(console.error);
