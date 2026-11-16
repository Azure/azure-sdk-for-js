// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists change data capture destinations in a HorizonDB cluster.
 *
 * @summary lists change data capture destinations in a HorizonDB cluster.
 * x-ms-original-file: 2026-10-01-preview/ChangeDataCaptureDestinations_List.json
 */
async function listMicrosoftFabricChangeDataCaptureDestinations() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.changeDataCaptureDestinations.list(
    "example-resource-group",
    "example-cluster",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listMicrosoftFabricChangeDataCaptureDestinations();
}

main().catch(console.error);
