// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a change data capture destination.
 *
 * @summary gets a change data capture destination.
 * x-ms-original-file: 2026-10-01-preview/ChangeDataCaptureDestinations_Get.json
 */
async function getAMicrosoftFabricChangeDataCaptureDestination(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.changeDataCaptureDestinations.get(
    "example-resource-group",
    "example-cluster",
    "fabric-mirroring",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAMicrosoftFabricChangeDataCaptureDestination();
}

main().catch(console.error);
