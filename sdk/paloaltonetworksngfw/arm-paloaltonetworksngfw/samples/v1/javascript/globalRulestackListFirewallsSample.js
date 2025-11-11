// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to List of Firewalls associated with Rulestack
 *
 * @summary List of Firewalls associated with Rulestack
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/GlobalRulestack_listFirewalls_MaximumSet_Gen.json
 */
async function globalRulestackListFirewallsMaximumSetGen() {
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
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/GlobalRulestack_listFirewalls_MinimumSet_Gen.json
 */
async function globalRulestackListFirewallsMinimumSetGen() {
  const globalRulestackName = "praval";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.globalRulestack.listFirewalls(globalRulestackName);
  console.log(result);
}

async function main() {
  await globalRulestackListFirewallsMaximumSetGen();
  await globalRulestackListFirewallsMinimumSetGen();
}

main().catch(console.error);
