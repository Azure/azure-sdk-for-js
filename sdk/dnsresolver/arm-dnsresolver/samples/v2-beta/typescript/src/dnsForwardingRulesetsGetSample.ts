// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DnsResolverManagementClient } from "@azure/arm-dnsresolver";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets a DNS forwarding ruleset properties.
 *
 * @summary Gets a DNS forwarding ruleset properties.
 * x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/DnsResolver/preview/2025-10-01-preview/examples/DnsForwardingRuleset_Get.json
 */
async function retrieveDnsForwardingRuleset(): Promise<void> {
  const subscriptionId =
    process.env["DNSRESOLVER_SUBSCRIPTION_ID"] ||
    "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const resourceGroupName =
    process.env["DNSRESOLVER_RESOURCE_GROUP"] || "sampleResourceGroup";
  const dnsForwardingRulesetName = "sampleDnsForwardingRuleset";
  const credential = new DefaultAzureCredential();
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const result = await client.dnsForwardingRulesets.get(
    resourceGroupName,
    dnsForwardingRulesetName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await retrieveDnsForwardingRuleset();
}

main().catch(console.error);
