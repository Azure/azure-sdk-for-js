// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates mutable change data capture capability properties. Omitted properties preserve their current values.
 *
 * @summary updates mutable change data capture capability properties. Omitted properties preserve their current values.
 * x-ms-original-file: 2026-10-01-preview/ChangeDataCaptureCapabilities_Update.json
 */
async function updateTheClusterChangeDataCaptureCapability() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.changeDataCaptureCapabilities.update(
    "example-resource-group",
    "example-cluster",
    { properties: { autoUpgradeExtension: false } },
  );
  console.log(result);
}

async function main() {
  await updateTheClusterChangeDataCaptureCapability();
}

main().catch(console.error);
