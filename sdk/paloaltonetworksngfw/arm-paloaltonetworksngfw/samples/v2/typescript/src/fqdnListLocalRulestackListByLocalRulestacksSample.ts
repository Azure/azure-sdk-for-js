// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list FqdnListLocalRulestackResource resources by LocalRulestacks
 *
 * @summary list FqdnListLocalRulestackResource resources by LocalRulestacks
 * x-ms-original-file: 2025-10-08/FqdnListLocalRulestack_ListByLocalRulestacks_MaximumSet_Gen.json
 */
async function fqdnListLocalRulestackListByLocalRulestacksMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fqdnListLocalRulestack.listByLocalRulestacks(
    "rgopenapi",
    "lrs1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list FqdnListLocalRulestackResource resources by LocalRulestacks
 *
 * @summary list FqdnListLocalRulestackResource resources by LocalRulestacks
 * x-ms-original-file: 2025-10-08/FqdnListLocalRulestack_ListByLocalRulestacks_MinimumSet_Gen.json
 */
async function fqdnListLocalRulestackListByLocalRulestacksMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fqdnListLocalRulestack.listByLocalRulestacks(
    "rgopenapi",
    "lrs1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await fqdnListLocalRulestackListByLocalRulestacksMaximumSetGen();
  await fqdnListLocalRulestackListByLocalRulestacksMinimumSetGen();
}

main().catch(console.error);
