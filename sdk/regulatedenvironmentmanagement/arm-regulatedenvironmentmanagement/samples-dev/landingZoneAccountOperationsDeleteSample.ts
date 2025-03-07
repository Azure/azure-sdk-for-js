// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SovereignClient } from "@azure/arm-regulatedenvironmentmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a landing zone account.
 *
 * @summary deletes a landing zone account.
 * x-ms-original-file: 2025-02-27-preview/LandingZoneAccountOperations_Delete.json
 */
async function landingZoneAccountOperationsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SovereignClient(credential, subscriptionId);
  await client.landingZoneAccountOperations.delete(
    "SampleResourceGroup",
    "SampleLZA",
  );
}

async function main(): Promise<void> {
  await landingZoneAccountOperationsDelete();
}

main().catch(console.error);
