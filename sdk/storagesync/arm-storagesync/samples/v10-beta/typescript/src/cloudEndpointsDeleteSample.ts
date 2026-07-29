// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftStorageSync } from "@azure/arm-storagesync";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a given CloudEndpoint.
 *
 * @summary delete a given CloudEndpoint.
 * x-ms-original-file: 2022-09-01/CloudEndpoints_Delete.json
 */
async function cloudEndpointsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "52b8da2f-61e0-4a1f-8dde-336911f367fb";
  const client = new MicrosoftStorageSync(credential, subscriptionId);
  await client.cloudEndpoints.delete(
    "SampleResourceGroup_1",
    "SampleStorageSyncService_1",
    "SampleSyncGroup_1",
    "SampleCloudEndpoint_1",
  );
}

async function main(): Promise<void> {
  await cloudEndpointsDelete();
}

main().catch(console.error);
