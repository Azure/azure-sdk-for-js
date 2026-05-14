// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockClient } from "@azure/arm-purestorageblock";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list reservations by Azure subscription ID
 *
 * @summary list reservations by Azure subscription ID
 * x-ms-original-file: 2026-01-01-preview/Reservations_ListBySubscription_MaximumSet_Gen.json
 */
async function reservationsListBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.reservations.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await reservationsListBySubscription();
}

main().catch(console.error);
