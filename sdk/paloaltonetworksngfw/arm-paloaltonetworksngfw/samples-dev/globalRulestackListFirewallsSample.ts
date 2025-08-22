// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List of Firewalls associated with Rulestack
 *
 * @summary List of Firewalls associated with Rulestack
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2023-09-01/examples/GlobalRulestack_listFirewalls_MaximumSet_Gen.json
 */

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function globalRulestackListFirewallsMaximumSetGen(): Promise<void> {
  const globalRulestackName = "praval";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.globalRulestack.listFirewalls(globalRulestackName);
  console.log(result);
}

/**
 * This sample demonstrates how to List of Firewalls associated with Rulestack
 *
 * @summary List of Firewalls associated with Rulestack
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2023-09-01/examples/GlobalRulestack_listFirewalls_MinimumSet_Gen.json
 */
async function globalRulestackListFirewallsMinimumSetGen(): Promise<void> {
  const globalRulestackName = "praval";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.globalRulestack.listFirewalls(globalRulestackName);
  console.log(result);
}

async function main(): Promise<void> {
  await globalRulestackListFirewallsMaximumSetGen();
  await globalRulestackListFirewallsMinimumSetGen();
}

main().catch(console.error);
