// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to List LocalRulestackResource resources by subscription ID
 *
 * @summary List LocalRulestackResource resources by subscription ID
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/LocalRulestacks_ListBySubscription_MaximumSet_Gen.json
 */
async function localRulestacksListBySubscriptionMaximumSetGen() {
  const subscriptionId =
    process.env["PALOALTONETWORKSNGFW_SUBSCRIPTION_ID"] || "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.localRulestacks.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to List LocalRulestackResource resources by subscription ID
 *
 * @summary List LocalRulestackResource resources by subscription ID
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/LocalRulestacks_ListBySubscription_MinimumSet_Gen.json
 */
async function localRulestacksListBySubscriptionMinimumSetGen() {
  const subscriptionId =
    process.env["PALOALTONETWORKSNGFW_SUBSCRIPTION_ID"] || "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.localRulestacks.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await localRulestacksListBySubscriptionMaximumSetGen();
  await localRulestacksListBySubscriptionMinimumSetGen();
}

main().catch(console.error);
