// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SovereignClient } from "@azure/arm-regulatedenvironmentmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a landing zone configuration.
 *
 * @summary delete a landing zone configuration.
 * x-ms-original-file: 2025-02-27-preview/LandingZoneConfigurationOperations_Delete.json
 */
async function landingZoneConfigurationOperationsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9B52DE5E-FE73-4C8B-8968-1E8F0097DDB8";
  const client = new SovereignClient(credential, subscriptionId);
  await client.landingZoneConfigurationOperations.delete(
    "ExampleResourceGroup",
    "SampleLZA",
    "ExampleLZC",
  );
}

async function main(): Promise<void> {
  await landingZoneConfigurationOperationsDelete();
}

main().catch(console.error);
