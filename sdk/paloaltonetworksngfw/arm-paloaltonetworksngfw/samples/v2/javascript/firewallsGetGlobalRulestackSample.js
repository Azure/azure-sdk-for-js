// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get Global Rulestack associated with the Firewall
 *
 * @summary get Global Rulestack associated with the Firewall
 * x-ms-original-file: 2025-10-08/Firewalls_getGlobalRulestack_MaximumSet_Gen.json
 */
async function firewallsGetGlobalRulestackMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.firewalls.getGlobalRulestack("firewall-rg", "firewall1");
  console.log(result);
}

/**
 * This sample demonstrates how to get Global Rulestack associated with the Firewall
 *
 * @summary get Global Rulestack associated with the Firewall
 * x-ms-original-file: 2025-10-08/Firewalls_getGlobalRulestack_MinimumSet_Gen.json
 */
async function firewallsGetGlobalRulestackMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.firewalls.getGlobalRulestack("firewall-rg", "firewall1");
  console.log(result);
}

async function main() {
  await firewallsGetGlobalRulestackMaximumSetGen();
  await firewallsGetGlobalRulestackMinimumSetGen();
}

main().catch(console.error);
