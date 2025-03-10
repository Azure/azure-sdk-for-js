// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SovereignClient } from "@azure/arm-regulatedenvironmentmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list the landing zone configurations within a subscription.
 *
 * @summary list the landing zone configurations within a subscription.
 * x-ms-original-file: 2025-02-27-preview/LandingZoneConfigurationOperations_ListBySubscription.json
 */
async function landingZoneConfigurationOperationsListBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000001";
  const client = new SovereignClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.landingZoneConfigurationOperations.listBySubscription(
    "ExampleLZA",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await landingZoneConfigurationOperationsListBySubscription();
}

main().catch(console.error);
