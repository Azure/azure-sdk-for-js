// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a change data capture destination after all referencing configurations and identity assignments have been removed.
 *
 * @summary deletes a change data capture destination after all referencing configurations and identity assignments have been removed.
 * x-ms-original-file: 2026-10-01-preview/ChangeDataCaptureDestinations_Delete.json
 */
async function deleteAMicrosoftFabricChangeDataCaptureDestination() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  await client.changeDataCaptureDestinations.delete(
    "example-resource-group",
    "example-cluster",
    "fabric-mirroring",
  );
}

async function main() {
  await deleteAMicrosoftFabricChangeDataCaptureDestination();
}

main().catch(console.error);
