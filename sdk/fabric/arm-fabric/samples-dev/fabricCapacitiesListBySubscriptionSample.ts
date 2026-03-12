// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to list FabricCapacity resources by subscription ID
 *
 * @summary list FabricCapacity resources by subscription ID
 * x-ms-original-file: 2023-11-01/FabricCapacities_ListBySubscription.json
 */

import { FabricClient } from "@azure/arm-fabric";
import { DefaultAzureCredential } from "@azure/identity";

async function listCapacitiesBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "548B7FB7-3B2A-4F46-BB02-66473F1FC22C";
  const client = new FabricClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fabricCapacities.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listCapacitiesBySubscription();
}

main().catch(console.error);
