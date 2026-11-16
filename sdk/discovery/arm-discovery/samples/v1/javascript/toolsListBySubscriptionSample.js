// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Tool resources by subscription ID
 *
 * @summary list Tool resources by subscription ID
 * x-ms-original-file: 2026-06-01/Tools_ListBySubscription_MaximumSet_Gen.json
 */
async function toolsListBySubscriptionMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.tools.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await toolsListBySubscriptionMaximumSet();
}

main().catch(console.error);
