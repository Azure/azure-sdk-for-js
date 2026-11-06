// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a change data capture destination.
 *
 * @summary gets a change data capture destination.
 * x-ms-original-file: 2026-10-01-preview/ChangeDataCaptureDestinations_Get.json
 */
async function getAMicrosoftFabricChangeDataCaptureDestination() {
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

async function main() {
  await getAMicrosoftFabricChangeDataCaptureDestination();
}

main().catch(console.error);
