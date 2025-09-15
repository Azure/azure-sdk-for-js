// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to lists fleets in the specified subscription.
 *
 * @summary lists fleets in the specified subscription.
 * x-ms-original-file: 2025-04-01-preview/Fleets_ListBySub.json
 */

import { ContainerServiceFleetClient } from "@azure/arm-containerservicefleet";
import { DefaultAzureCredential } from "@azure/identity";

async function listsTheFleetResourcesInASubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fleets.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists fleets in the specified subscription.
 *
 * @summary lists fleets in the specified subscription.
 * x-ms-original-file: 2025-04-01-preview/Fleets_ListBySubscription_MaximumSet_Gen.json
 */
async function listsTheFleetResourcesInASubscriptionGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fleets.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listsTheFleetResourcesInASubscription();
  await listsTheFleetResourcesInASubscriptionGeneratedByMaximumSetRule();
}

main().catch(console.error);
