// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SovereignClient } from "@azure/arm-regulatedenvironmentmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list the landing zone registrations within a subscription.
 *
 * @summary list the landing zone registrations within a subscription.
 * x-ms-original-file: 2025-02-27-preview/LandingZoneRegistrationOperations_ListBySubscription.json
 */
async function landingZoneRegistrationOperationsListBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000001";
  const client = new SovereignClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.landingZoneRegistrationOperations.listBySubscription(
    "ExampleLZA",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await landingZoneRegistrationOperationsListBySubscription();
}

main().catch(console.error);
