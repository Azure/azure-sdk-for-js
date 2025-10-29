// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the security services for rulestack
 *
 * @summary list the security services for rulestack
 * x-ms-original-file: 2025-10-08/GlobalRulestack_listSecurityServices_MaximumSet_Gen.json
 */
async function globalRulestackListSecurityServicesMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.globalRulestack.listSecurityServices("praval", "globalRulestacks", {
    skip: "a6a321",
    top: 20,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to list the security services for rulestack
 *
 * @summary list the security services for rulestack
 * x-ms-original-file: 2025-10-08/GlobalRulestack_listSecurityServices_MinimumSet_Gen.json
 */
async function globalRulestackListSecurityServicesMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.globalRulestack.listSecurityServices("praval", "globalRulestacks");
  console.log(result);
}

async function main() {
  await globalRulestackListSecurityServicesMaximumSetGen();
  await globalRulestackListSecurityServicesMinimumSetGen();
}

main().catch(console.error);
