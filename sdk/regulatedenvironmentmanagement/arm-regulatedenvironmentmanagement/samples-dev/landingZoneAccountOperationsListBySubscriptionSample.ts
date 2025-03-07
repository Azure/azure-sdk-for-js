// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SovereignClient } from "@azure/arm-regulatedenvironmentmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list the landing zone accounts within a subscription.
 *
 * @summary list the landing zone accounts within a subscription.
 * x-ms-original-file: 2025-02-27-preview/LandingZoneAccountOperations_ListBySubscription.json
 */
async function landingZoneAccountOperationsListBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9B52DE5E-FE73-4C8B-8968-1E8F0097DDB8";
  const client = new SovereignClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.landingZoneAccountOperations.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await landingZoneAccountOperationsListBySubscription();
}

main().catch(console.error);
