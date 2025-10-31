// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a PrefixListGlobalRulestackResource
 *
 * @summary get a PrefixListGlobalRulestackResource
 * x-ms-original-file: 2025-10-08/PrefixListGlobalRulestack_Get_MaximumSet_Gen.json
 */
async function prefixListGlobalRulestackGetMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.prefixListGlobalRulestack.get("praval", "armid1");
  console.log(result);
}

/**
 * This sample demonstrates how to get a PrefixListGlobalRulestackResource
 *
 * @summary get a PrefixListGlobalRulestackResource
 * x-ms-original-file: 2025-10-08/PrefixListGlobalRulestack_Get_MinimumSet_Gen.json
 */
async function prefixListGlobalRulestackGetMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.prefixListGlobalRulestack.get("praval", "armid1");
  console.log(result);
}

async function main() {
  await prefixListGlobalRulestackGetMaximumSetGen();
  await prefixListGlobalRulestackGetMinimumSetGen();
}

main().catch(console.error);
