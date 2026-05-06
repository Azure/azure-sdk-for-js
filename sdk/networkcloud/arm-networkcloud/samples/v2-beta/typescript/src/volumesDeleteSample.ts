// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudClient } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete the provided volume.
 *
 * @summary delete the provided volume.
 * x-ms-original-file: 2026-05-01-preview/Volumes_Delete.json
 */
async function deleteVolume(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.volumes.delete("resourceGroupName", "volumeName");
  console.log(result);
}

async function main(): Promise<void> {
  await deleteVolume();
}

main().catch(console.error);
