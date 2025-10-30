// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list predefined URL categories for rulestack
 *
 * @summary list predefined URL categories for rulestack
 * x-ms-original-file: 2025-10-08/LocalRulestacks_listPredefinedUrlCategories_MaximumSet_Gen.json
 */
async function localRulestacksListPredefinedUrlCategoriesMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.localRulestacks.listPredefinedUrlCategories("rgopenapi", "lrs1", {
    skip: "a6a321",
    top: 20,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list predefined URL categories for rulestack
 *
 * @summary list predefined URL categories for rulestack
 * x-ms-original-file: 2025-10-08/LocalRulestacks_listPredefinedUrlCategories_MinimumSet_Gen.json
 */
async function localRulestacksListPredefinedUrlCategoriesMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.localRulestacks.listPredefinedUrlCategories(
    "rgopenapi",
    "lrs1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await localRulestacksListPredefinedUrlCategoriesMaximumSetGen();
  await localRulestacksListPredefinedUrlCategoriesMinimumSetGen();
}

main().catch(console.error);
