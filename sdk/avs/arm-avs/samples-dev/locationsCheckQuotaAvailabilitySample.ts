// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to return quota for subscription by region
 *
 * @summary return quota for subscription by region
 * x-ms-original-file: 2025-09-01/Locations_CheckQuotaAvailability.json
 */
async function locationsCheckQuotaAvailability(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.locations.checkQuotaAvailability("eastus");
  console.log(result);
}

async function main(): Promise<void> {
  await locationsCheckQuotaAvailability();
}

main().catch(console.error);
