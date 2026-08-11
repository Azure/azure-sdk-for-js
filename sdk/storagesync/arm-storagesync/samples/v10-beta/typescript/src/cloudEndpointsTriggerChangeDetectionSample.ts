// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftStorageSync } from "@azure/arm-storagesync";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to triggers detection of changes performed on Azure File share connected to the specified Azure File Sync Cloud Endpoint.
 *
 * @summary triggers detection of changes performed on Azure File share connected to the specified Azure File Sync Cloud Endpoint.
 * x-ms-original-file: 2022-09-01/CloudEndpoints_TriggerChangeDetection.json
 */
async function cloudEndpointsTriggerChangeDetection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "52b8da2f-61e0-4a1f-8dde-336911f367fb";
  const client = new MicrosoftStorageSync(credential, subscriptionId);
  await client.cloudEndpoints.triggerChangeDetection(
    "SampleResourceGroup_1",
    "SampleStorageSyncService_1",
    "SampleSyncGroup_1",
    "SampleCloudEndpoint_1",
    { changeDetectionMode: "Recursive", directoryPath: "NewDirectory" },
  );
}

async function main(): Promise<void> {
  await cloudEndpointsTriggerChangeDetection();
}

main().catch(console.error);
