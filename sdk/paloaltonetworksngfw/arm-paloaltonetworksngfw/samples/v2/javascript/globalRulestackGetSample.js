// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a GlobalRulestackResource
 *
 * @summary get a GlobalRulestackResource
 * x-ms-original-file: 2025-10-08/GlobalRulestack_Get_MaximumSet_Gen.json
 */
async function globalRulestackGetMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.globalRulestack.get("praval");
  console.log(result);
}

/**
 * This sample demonstrates how to get a GlobalRulestackResource
 *
 * @summary get a GlobalRulestackResource
 * x-ms-original-file: 2025-10-08/GlobalRulestack_Get_MinimumSet_Gen.json
 */
async function globalRulestackGetMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.globalRulestack.get("praval");
  console.log(result);
}

async function main() {
  await globalRulestackGetMaximumSetGen();
  await globalRulestackGetMinimumSetGen();
}

main().catch(console.error);
