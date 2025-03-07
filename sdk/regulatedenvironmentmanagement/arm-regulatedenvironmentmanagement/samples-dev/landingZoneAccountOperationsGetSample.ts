// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SovereignClient } from "@azure/arm-regulatedenvironmentmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a landing zone account.
 *
 * @summary get a landing zone account.
 * x-ms-original-file: 2025-02-27-preview/LandingZoneAccountOperations_Get.json
 */
async function landingZoneAccountOperationsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SovereignClient(credential, subscriptionId);
  const result = await client.landingZoneAccountOperations.get("SampleResourceGroup", "SampleLZA");
  console.log(result);
}

async function main(): Promise<void> {
  await landingZoneAccountOperationsGet();
}

main().catch(console.error);
