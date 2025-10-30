// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list PrefixListResource resources by LocalRulestacks
 *
 * @summary list PrefixListResource resources by LocalRulestacks
 * x-ms-original-file: 2025-10-08/PrefixListLocalRulestack_ListByLocalRulestacks_MaximumSet_Gen.json
 */
async function prefixListLocalRulestackListByLocalRulestacksMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.prefixListLocalRulestack.listByLocalRulestacks(
    "rgopenapi",
    "lrs1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list PrefixListResource resources by LocalRulestacks
 *
 * @summary list PrefixListResource resources by LocalRulestacks
 * x-ms-original-file: 2025-10-08/PrefixListLocalRulestack_ListByLocalRulestacks_MinimumSet_Gen.json
 */
async function prefixListLocalRulestackListByLocalRulestacksMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.prefixListLocalRulestack.listByLocalRulestacks(
    "rgopenapi",
    "lrs1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await prefixListLocalRulestackListByLocalRulestacksMaximumSetGen();
  await prefixListLocalRulestackListByLocalRulestacksMinimumSetGen();
}

main().catch(console.error);
