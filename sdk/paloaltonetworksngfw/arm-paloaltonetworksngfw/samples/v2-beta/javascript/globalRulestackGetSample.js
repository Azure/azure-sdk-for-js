// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a GlobalRulestackResource
 *
 * @summary get a GlobalRulestackResource
 * x-ms-original-file: 2026-05-11-preview/GlobalRulestack_Get_MaximumSet_Gen.json
 */
async function globalRulestackGetMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.globalRulestack.get("praval");
  console.log(result);
}

/**
 * This sample demonstrates how to get a GlobalRulestackResource
 *
 * @summary get a GlobalRulestackResource
 * x-ms-original-file: 2026-05-11-preview/GlobalRulestack_Get_MinimumSet_Gen.json
 */
async function globalRulestackGetMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.globalRulestack.get("praval");
  console.log(result);
}

async function main() {
  await globalRulestackGetMaximumSetGen();
  await globalRulestackGetMinimumSetGen();
}

main().catch(console.error);
