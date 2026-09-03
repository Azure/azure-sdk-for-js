// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a FqdnListGlobalRulestackResource
 *
 * @summary get a FqdnListGlobalRulestackResource
 * x-ms-original-file: 2026-05-11-preview/FqdnListGlobalRulestack_Get_MaximumSet_Gen.json
 */
async function fqdnListGlobalRulestackGetMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.fqdnListGlobalRulestack.get("praval", "armid1");
  console.log(result);
}

/**
 * This sample demonstrates how to get a FqdnListGlobalRulestackResource
 *
 * @summary get a FqdnListGlobalRulestackResource
 * x-ms-original-file: 2026-05-11-preview/FqdnListGlobalRulestack_Get_MinimumSet_Gen.json
 */
async function fqdnListGlobalRulestackGetMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.fqdnListGlobalRulestack.get("praval", "armid1");
  console.log(result);
}

async function main() {
  await fqdnListGlobalRulestackGetMaximumSetGen();
  await fqdnListGlobalRulestackGetMinimumSetGen();
}

main().catch(console.error);
