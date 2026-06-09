// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftStorageSync } from "@azure/arm-storagesync";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to pre Backup a given CloudEndpoint.
 *
 * @summary pre Backup a given CloudEndpoint.
 * x-ms-original-file: 2022-09-01/CloudEndpoints_PreBackup.json
 */
async function cloudEndpointsPreBackup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "52b8da2f-61e0-4a1f-8dde-336911f367fb";
  const client = new MicrosoftStorageSync(credential, subscriptionId);
  await client.cloudEndpoints.preBackup(
    "SampleResourceGroup_1",
    "SampleStorageSyncService_1",
    "SampleSyncGroup_1",
    "SampleCloudEndpoint_1",
    { azureFileShare: "https://sampleserver.file.core.test-cint.azure-test.net/sampleFileShare" },
  );
}

async function main(): Promise<void> {
  await cloudEndpointsPreBackup();
}

main().catch(console.error);
