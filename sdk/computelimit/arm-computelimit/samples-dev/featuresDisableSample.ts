// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeLimitClient } from "@azure/arm-computelimit";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to disables a compute limit feature for the subscription at the specified location.
 *
 * @summary disables a compute limit feature for the subscription at the specified location.
 * x-ms-original-file: 2026-04-30/Features_Disable.json
 */
async function disableFeature(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "74219ad7-63fc-442f-8037-4b43c627c07d";
  const client = new ComputeLimitClient(credential, subscriptionId);
  const result = await client.features.disable("eastus", "VmCategoryQuota");
  console.log(result);
}

async function main(): Promise<void> {
  await disableFeature();
}

main().catch(console.error);
