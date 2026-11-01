// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the singleton HorizonDB capability catalog entry available to a subscription in a specific region.
 *
 * @summary gets the singleton HorizonDB capability catalog entry available to a subscription in a specific region.
 * x-ms-original-file: 2026-10-01-preview/Capabilities_Get.json
 */
async function getHorizonDBCapabilitiesBySubscriptionAndRegion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.capabilities.get("eastus2");
  console.log(result);
}

async function main(): Promise<void> {
  await getHorizonDBCapabilitiesBySubscriptionAndRegion();
}

main().catch(console.error);
