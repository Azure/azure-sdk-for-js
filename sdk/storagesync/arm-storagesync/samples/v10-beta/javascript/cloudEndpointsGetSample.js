// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftStorageSync } = require("@azure/arm-storagesync");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a given CloudEndpoint.
 *
 * @summary get a given CloudEndpoint.
 * x-ms-original-file: 2022-09-01/CloudEndpoints_Get.json
 */
async function cloudEndpointsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "52b8da2f-61e0-4a1f-8dde-336911f367fb";
  const client = new MicrosoftStorageSync(credential, subscriptionId);
  const result = await client.cloudEndpoints.get(
    "SampleResourceGroup_1",
    "SampleStorageSyncService_1",
    "SampleSyncGroup_1",
    "SampleCloudEndpoint_1",
  );
  console.log(result);
}

async function main() {
  await cloudEndpointsGet();
}

main().catch(console.error);
