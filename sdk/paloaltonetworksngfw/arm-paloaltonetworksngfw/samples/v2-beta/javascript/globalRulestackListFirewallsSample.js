// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list of Firewalls associated with Rulestack
 *
 * @summary list of Firewalls associated with Rulestack
 * x-ms-original-file: 2026-05-11-preview/GlobalRulestack_listFirewalls_MaximumSet_Gen.json
 */
async function globalRulestackListFirewallsMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.globalRulestack.listFirewalls("praval");
  console.log(result);
}

/**
 * This sample demonstrates how to list of Firewalls associated with Rulestack
 *
 * @summary list of Firewalls associated with Rulestack
 * x-ms-original-file: 2026-05-11-preview/GlobalRulestack_listFirewalls_MinimumSet_Gen.json
 */
async function globalRulestackListFirewallsMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.globalRulestack.listFirewalls("praval");
  console.log(result);
}

async function main() {
  await globalRulestackListFirewallsMaximumSetGen();
  await globalRulestackListFirewallsMinimumSetGen();
}

main().catch(console.error);
