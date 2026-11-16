// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the singleton change data capture capability for a HorizonDB cluster.
 *
 * @summary gets the singleton change data capture capability for a HorizonDB cluster.
 * x-ms-original-file: 2026-10-01-preview/ChangeDataCaptureCapabilities_Get.json
 */
async function getTheClusterChangeDataCaptureCapability() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.changeDataCaptureCapabilities.get(
    "example-resource-group",
    "example-cluster",
  );
  console.log(result);
}

async function main() {
  await getTheClusterChangeDataCaptureCapability();
}

main().catch(console.error);
