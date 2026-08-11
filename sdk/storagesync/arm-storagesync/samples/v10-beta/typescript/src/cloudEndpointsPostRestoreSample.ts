// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftStorageSync } from "@azure/arm-storagesync";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to post Restore a given CloudEndpoint.
 *
 * @summary post Restore a given CloudEndpoint.
 * x-ms-original-file: 2022-09-01/CloudEndpoints_PostRestore.json
 */
async function cloudEndpointsPostRestore(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "52b8da2f-61e0-4a1f-8dde-336911f367fb";
  const client = new MicrosoftStorageSync(credential, subscriptionId);
  await client.cloudEndpoints.postRestore(
    "SampleResourceGroup_1",
    "SampleStorageSyncService_1",
    "SampleSyncGroup_1",
    "SampleCloudEndpoint_1",
    {
      azureFileShareUri:
        "https://hfsazbackupdevintncus2.file.core.test-cint.azure-test.net/sampleFileShare",
      restoreFileSpec: [
        { path: "text1.txt", isdir: false },
        { path: "MyDir", isdir: true },
        { path: "MyDir/SubDir", isdir: false },
        { path: "MyDir/SubDir/File1.pdf", isdir: false },
      ],
      sourceAzureFileShareUri:
        "https://hfsazbackupdevintncus2.file.core.test-cint.azure-test.net/sampleFileShare",
      status: "Succeeded",
    },
  );
}

async function main(): Promise<void> {
  await cloudEndpointsPostRestore();
}

main().catch(console.error);
