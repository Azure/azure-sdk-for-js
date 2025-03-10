// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SovereignClient } from "@azure/arm-regulatedenvironmentmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a landing zone registration.
 *
 * @summary delete a landing zone registration.
 * x-ms-original-file: 2025-02-27-preview/LandingZoneRegistrationOperations_Delete.json
 */
async function landingZoneRegistrationOperationsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000001";
  const client = new SovereignClient(credential, subscriptionId);
  await client.landingZoneRegistrationOperations.delete(
    "ExampleResourceGroup",
    "ExampleLZA",
    "ExampleLZR",
  );
}

async function main(): Promise<void> {
  await landingZoneRegistrationOperationsDelete();
}

main().catch(console.error);
