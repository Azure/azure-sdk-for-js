// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to return trial status for subscription by region
 *
 * @summary return trial status for subscription by region
 * x-ms-original-file: 2024-09-01/Locations_CheckTrialAvailability.json
 */
async function locationsCheckTrialAvailability(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.locations.checkTrialAvailability("eastus");
  console.log(result);
}

/**
 * This sample demonstrates how to return trial status for subscription by region
 *
 * @summary return trial status for subscription by region
 * x-ms-original-file: 2024-09-01/Locations_CheckTrialAvailabilityWithSku.json
 */
async function locationsCheckTrialAvailabilityWithSku(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.locations.checkTrialAvailability("eastus", {
    sku: { name: "avs52t" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await locationsCheckTrialAvailability();
  await locationsCheckTrialAvailabilityWithSku();
}

main().catch(console.error);
