// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the singleton HorizonDB capability catalog entry available to a subscription in a specific region.
 *
 * @summary gets the singleton HorizonDB capability catalog entry available to a subscription in a specific region.
 * x-ms-original-file: 2026-10-01-preview/Capabilities_Get.json
 */
async function getHorizonDBCapabilitiesBySubscriptionAndRegion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.capabilities.get("eastus2");
  console.log(result);
}

async function main() {
  await getHorizonDBCapabilitiesBySubscriptionAndRegion();
}

main().catch(console.error);
