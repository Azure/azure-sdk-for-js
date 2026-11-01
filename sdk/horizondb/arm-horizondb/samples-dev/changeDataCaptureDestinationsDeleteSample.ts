// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a change data capture destination after all referencing configurations and identity assignments have been removed.
 *
 * @summary deletes a change data capture destination after all referencing configurations and identity assignments have been removed.
 * x-ms-original-file: 2026-10-01-preview/ChangeDataCaptureDestinations_Delete.json
 */
async function deleteAMicrosoftFabricChangeDataCaptureDestination(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  await client.changeDataCaptureDestinations.delete(
    "example-resource-group",
    "example-cluster",
    "fabric-mirroring",
  );
}

async function main(): Promise<void> {
  await deleteAMicrosoftFabricChangeDataCaptureDestination();
}

main().catch(console.error);
