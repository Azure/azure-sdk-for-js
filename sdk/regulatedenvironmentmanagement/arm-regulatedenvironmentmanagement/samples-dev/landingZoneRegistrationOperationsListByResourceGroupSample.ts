// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SovereignClient } from "@azure/arm-regulatedenvironmentmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list the landing zone registrations within a resource group.
 *
 * @summary list the landing zone registrations within a resource group.
 * x-ms-original-file: 2025-02-27-preview/LandingZoneRegistrationOperations_ListByResourceGroup.json
 */
async function landingZoneRegistrationOperationsListByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000001";
  const client = new SovereignClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.landingZoneRegistrationOperations.listByResourceGroup(
    "ExampleResourceGroup",
    "ExampleLZA",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await landingZoneRegistrationOperationsListByResourceGroup();
}

main().catch(console.error);
