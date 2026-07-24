// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeLimitClient } from "@azure/arm-computelimit";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to enables a compute limit feature for the subscription at the specified location. Requires the Contributor role.
 *
 * @summary enables a compute limit feature for the subscription at the specified location. Requires the Contributor role.
 * x-ms-original-file: 2026-07-01/Features_Enable.json
 */
async function enableFeature(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "74219ad7-63fc-442f-8037-4b43c627c07d";
  const client = new ComputeLimitClient(credential, subscriptionId);
  const result = await client.features.enable("eastus", "VmCategoryQuota", {
    body: { serviceTreeId: "a1b2c3d4-5678-90ab-cdef-1234567890ab" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await enableFeature();
}

main().catch(console.error);
