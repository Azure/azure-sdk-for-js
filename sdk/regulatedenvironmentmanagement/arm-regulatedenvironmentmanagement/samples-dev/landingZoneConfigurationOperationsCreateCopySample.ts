// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SovereignClient } from "@azure/arm-regulatedenvironmentmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a duplicate of the landing zone configuration.
 *
 * @summary create a duplicate of the landing zone configuration.
 * x-ms-original-file: 2025-02-27-preview/LandingZoneConfigurationOperations_CreateCopy.json
 */
async function landingZoneConfigurationOperationsCreateCopy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9B52DE5E-FE73-4C8B-8968-1E8F0097DDB8";
  const client = new SovereignClient(credential, subscriptionId);
  const result = await client.landingZoneConfigurationOperations.createCopy(
    "ExampleResourceGroup",
    "SampleLZA",
    "ExampleLZC",
    { name: "LandingZoneConfiguration" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await landingZoneConfigurationOperationsCreateCopy();
}

main().catch(console.error);
