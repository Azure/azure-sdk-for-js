// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the change data capture capability after all change data capture destinations and configurations have been removed.
 *
 * @summary deletes the change data capture capability after all change data capture destinations and configurations have been removed.
 * x-ms-original-file: 2026-10-01-preview/ChangeDataCaptureCapabilities_Delete.json
 */
async function deleteTheClusterChangeDataCaptureCapability() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  await client.changeDataCaptureCapabilities.delete("example-resource-group", "example-cluster");
}

async function main() {
  await deleteTheClusterChangeDataCaptureCapability();
}

main().catch(console.error);
