// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the singleton HorizonDB capability catalog entry available to a subscription in a specific region. The result contains one item.
 *
 * @summary lists the singleton HorizonDB capability catalog entry available to a subscription in a specific region. The result contains one item.
 * x-ms-original-file: 2026-10-01-preview/Capabilities_List.json
 */
async function listHorizonDBCapabilitiesBySubscriptionAndRegion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.capabilities.list("eastus2")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listHorizonDBCapabilitiesBySubscriptionAndRegion();
}

main().catch(console.error);
