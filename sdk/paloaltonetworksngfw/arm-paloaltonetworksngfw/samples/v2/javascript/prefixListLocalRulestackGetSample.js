// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a PrefixListResource
 *
 * @summary get a PrefixListResource
 * x-ms-original-file: 2025-10-08/PrefixListLocalRulestack_Get_MaximumSet_Gen.json
 */
async function prefixListLocalRulestackGetMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.prefixListLocalRulestack.get("rgopenapi", "lrs1", "armid1");
  console.log(result);
}

/**
 * This sample demonstrates how to get a PrefixListResource
 *
 * @summary get a PrefixListResource
 * x-ms-original-file: 2025-10-08/PrefixListLocalRulestack_Get_MinimumSet_Gen.json
 */
async function prefixListLocalRulestackGetMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.prefixListLocalRulestack.get("rgopenapi", "lrs1", "armid1");
  console.log(result);
}

async function main() {
  await prefixListLocalRulestackGetMaximumSetGen();
  await prefixListLocalRulestackGetMinimumSetGen();
}

main().catch(console.error);
