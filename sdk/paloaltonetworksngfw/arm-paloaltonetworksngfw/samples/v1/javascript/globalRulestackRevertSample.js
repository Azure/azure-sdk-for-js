// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Revert rulestack configuration
 *
 * @summary Revert rulestack configuration
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/GlobalRulestack_revert_MaximumSet_Gen.json
 */
async function globalRulestackRevertMaximumSetGen() {
  const globalRulestackName = "praval";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.globalRulestack.revert(globalRulestackName);
  console.log(result);
}

/**
 * This sample demonstrates how to Revert rulestack configuration
 *
 * @summary Revert rulestack configuration
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/GlobalRulestack_revert_MinimumSet_Gen.json
 */
async function globalRulestackRevertMinimumSetGen() {
  const globalRulestackName = "praval";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.globalRulestack.revert(globalRulestackName);
  console.log(result);
}

async function main() {
  await globalRulestackRevertMaximumSetGen();
  await globalRulestackRevertMinimumSetGen();
}

main().catch(console.error);
