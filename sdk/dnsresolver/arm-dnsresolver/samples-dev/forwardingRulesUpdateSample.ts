// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates a forwarding rule in a DNS forwarding ruleset.
 *
 * @summary Updates a forwarding rule in a DNS forwarding ruleset.
 * x-ms-original-file: specification/dnsresolver/resource-manager/Microsoft.Network/stable/2025-05-01/examples/ForwardingRule_Patch.json
 */

import {
  ForwardingRulePatch,
  DnsResolverManagementClient,
} from "@azure/arm-dnsresolver";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateForwardingRuleInADnsForwardingRuleset(): Promise<void> {
  const subscriptionId =
    process.env["DNSRESOLVER_SUBSCRIPTION_ID"] ||
    "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const resourceGroupName =
    process.env["DNSRESOLVER_RESOURCE_GROUP"] || "sampleResourceGroup";
  const dnsForwardingRulesetName = "sampleDnsForwardingRuleset";
  const forwardingRuleName = "sampleForwardingRule";
  const parameters: ForwardingRulePatch = {
    forwardingRuleState: "Disabled",
    metadata: { additionalProp2: "value2" },
  };
  const credential = new DefaultAzureCredential();
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const result = await client.forwardingRules.update(
    resourceGroupName,
    dnsForwardingRulesetName,
    forwardingRuleName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateForwardingRuleInADnsForwardingRuleset();
}

main().catch(console.error);
