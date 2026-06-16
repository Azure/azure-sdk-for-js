// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftStorageSync } from "@azure/arm-storagesync";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to patch a given ServerEndpoint.
 *
 * @summary patch a given ServerEndpoint.
 * x-ms-original-file: 2022-09-01/ServerEndpoints_Update.json
 */
async function serverEndpointsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "52b8da2f-61e0-4a1f-8dde-336911f367fb";
  const client = new MicrosoftStorageSync(credential, subscriptionId);
  const result = await client.serverEndpoints.update(
    "SampleResourceGroup_1",
    "SampleStorageSyncService_1",
    "SampleSyncGroup_1",
    "SampleServerEndpoint_1",
    {
      parameters: {
        cloudTiering: "off",
        localCacheMode: "UpdateLocallyCachedFiles",
        offlineDataTransfer: "off",
        tierFilesOlderThanDays: 0,
        volumeFreeSpacePercent: 100,
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await serverEndpointsUpdate();
}

main().catch(console.error);
