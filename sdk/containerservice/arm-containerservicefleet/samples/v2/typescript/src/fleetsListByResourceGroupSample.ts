// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceFleetClient } from "@azure/arm-containerservicefleet";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists fleets in the specified subscription and resource group.
 *
 * @summary lists fleets in the specified subscription and resource group.
 * x-ms-original-file: 2025-03-01/Fleets_ListByResourceGroup.json
 */
async function listsTheFleetResourcesInAResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fleets.listByResourceGroup("rg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists fleets in the specified subscription and resource group.
 *
 * @summary lists fleets in the specified subscription and resource group.
 * x-ms-original-file: 2025-03-01/Fleets_ListByResourceGroup_MaximumSet_Gen.json
 */
async function listsTheFleetResourcesInAResourceGroupGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fleets.listByResourceGroup("rgfleets")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listsTheFleetResourcesInAResourceGroup();
  await listsTheFleetResourcesInAResourceGroupGeneratedByMaximumSetRule();
}

main().catch(console.error);
