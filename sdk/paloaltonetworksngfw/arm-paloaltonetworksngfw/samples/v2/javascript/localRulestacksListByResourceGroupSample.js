// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list LocalRulestackResource resources by resource group
 *
 * @summary list LocalRulestackResource resources by resource group
 * x-ms-original-file: 2025-10-08/LocalRulestacks_ListByResourceGroup_MaximumSet_Gen.json
 */
async function localRulestacksListByResourceGroupMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.localRulestacks.listByResourceGroup("rgopenapi")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list LocalRulestackResource resources by resource group
 *
 * @summary list LocalRulestackResource resources by resource group
 * x-ms-original-file: 2025-10-08/LocalRulestacks_ListByResourceGroup_MinimumSet_Gen.json
 */
async function localRulestacksListByResourceGroupMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.localRulestacks.listByResourceGroup("rgopenapi")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await localRulestacksListByResourceGroupMaximumSetGen();
  await localRulestacksListByResourceGroupMinimumSetGen();
}

main().catch(console.error);
