// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloud } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update tags associated with the provided volume.
 *
 * @summary update tags associated with the provided volume.
 * x-ms-original-file: 2026-05-01-preview/Volumes_Patch.json
 */
async function patchVolume() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.volumes.update("resourceGroupName", "volumeName", {
    volumeUpdateParameters: { tags: { key1: "myvalue1", key2: "myvalue2" } },
  });
  console.log(result);
}

async function main() {
  await patchVolume();
}

main().catch(console.error);
