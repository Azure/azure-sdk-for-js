// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list LocalRulesResource resources by LocalRulestacks
 *
 * @summary list LocalRulesResource resources by LocalRulestacks
 * x-ms-original-file: 2025-10-08/LocalRules_ListByLocalRulestacks_MaximumSet_Gen.json
 */
async function localRulesListByLocalRulestacksMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.localRules.listByLocalRulestacks("firewall-rg", "lrs1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list LocalRulesResource resources by LocalRulestacks
 *
 * @summary list LocalRulesResource resources by LocalRulestacks
 * x-ms-original-file: 2025-10-08/LocalRules_ListByLocalRulestacks_MinimumSet_Gen.json
 */
async function localRulesListByLocalRulestacksMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.localRules.listByLocalRulestacks("firewall-rg", "lrs1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await localRulesListByLocalRulestacksMaximumSetGen();
  await localRulesListByLocalRulestacksMinimumSetGen();
}

main().catch(console.error);
