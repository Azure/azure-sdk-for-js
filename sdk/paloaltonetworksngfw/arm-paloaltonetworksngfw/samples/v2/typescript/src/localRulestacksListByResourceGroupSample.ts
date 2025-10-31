// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list LocalRulestackResource resources by resource group
 *
 * @summary list LocalRulestackResource resources by resource group
 * x-ms-original-file: 2025-10-08/LocalRulestacks_ListByResourceGroup_MaximumSet_Gen.json
 */
async function localRulestacksListByResourceGroupMaximumSetGen(): Promise<void> {
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
async function localRulestacksListByResourceGroupMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.localRulestacks.listByResourceGroup("rgopenapi")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await localRulestacksListByResourceGroupMaximumSetGen();
  await localRulestacksListByResourceGroupMinimumSetGen();
}

main().catch(console.error);
