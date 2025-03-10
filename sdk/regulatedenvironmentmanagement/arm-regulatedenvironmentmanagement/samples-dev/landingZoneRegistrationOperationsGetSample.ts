// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SovereignClient } from "@azure/arm-regulatedenvironmentmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a landing zone registration.
 *
 * @summary get a landing zone registration.
 * x-ms-original-file: 2025-02-27-preview/LandingZoneRegistrationOperations_Get.json
 */
async function landingZoneRegistrationOperationsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000001";
  const client = new SovereignClient(credential, subscriptionId);
  const result = await client.landingZoneRegistrationOperations.get(
    "ExampleResourceGroup",
    "ExampleLZA",
    "ExampleLZR",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await landingZoneRegistrationOperationsGet();
}

main().catch(console.error);
