// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftStorageSync } from "@azure/arm-storagesync";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to recall a server endpoint.
 *
 * @summary recall a server endpoint.
 * x-ms-original-file: 2022-09-01/ServerEndpoints_Recall.json
 */
async function serverEndpointsRecallAction(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "52b8da2f-61e0-4a1f-8dde-336911f367fb";
  const client = new MicrosoftStorageSync(credential, subscriptionId);
  await client.serverEndpoints.recallAction(
    "SampleResourceGroup_1",
    "SampleStorageSyncService_1",
    "SampleSyncGroup_1",
    "SampleServerEndpoint_1",
    { pattern: "", recallPath: "" },
  );
}

async function main(): Promise<void> {
  await serverEndpointsRecallAction();
}

main().catch(console.error);
