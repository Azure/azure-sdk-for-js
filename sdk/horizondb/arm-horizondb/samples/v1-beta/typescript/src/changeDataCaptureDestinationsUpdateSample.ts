// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates mutable change data capture destination properties. Omitted properties preserve their current values.
 *
 * @summary updates mutable change data capture destination properties. Omitted properties preserve their current values.
 * x-ms-original-file: 2026-10-01-preview/ChangeDataCaptureDestinations_Update.json
 */
async function disableAMicrosoftFabricChangeDataCaptureDestination(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.changeDataCaptureDestinations.update(
    "example-resource-group",
    "example-cluster",
    "fabric-mirroring",
    { properties: { desiredState: "Disabled" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await disableAMicrosoftFabricChangeDataCaptureDestination();
}

main().catch(console.error);
