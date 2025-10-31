// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list of Firewalls associated with Rulestack
 *
 * @summary list of Firewalls associated with Rulestack
 * x-ms-original-file: 2025-10-08/GlobalRulestack_listFirewalls_MaximumSet_Gen.json
 */
async function globalRulestackListFirewallsMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.globalRulestack.listFirewalls("praval");
  console.log(result);
}

/**
 * This sample demonstrates how to list of Firewalls associated with Rulestack
 *
 * @summary list of Firewalls associated with Rulestack
 * x-ms-original-file: 2025-10-08/GlobalRulestack_listFirewalls_MinimumSet_Gen.json
 */
async function globalRulestackListFirewallsMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.globalRulestack.listFirewalls("praval");
  console.log(result);
}

async function main(): Promise<void> {
  await globalRulestackListFirewallsMaximumSetGen();
  await globalRulestackListFirewallsMinimumSetGen();
}

main().catch(console.error);
