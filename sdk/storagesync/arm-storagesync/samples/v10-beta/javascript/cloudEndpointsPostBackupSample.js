// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftStorageSync } = require("@azure/arm-storagesync");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to post Backup a given CloudEndpoint.
 *
 * @summary post Backup a given CloudEndpoint.
 * x-ms-original-file: 2022-09-01/CloudEndpoints_PostBackup.json
 */
async function cloudEndpointsPostBackup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "52b8da2f-61e0-4a1f-8dde-336911f367fb";
  const client = new MicrosoftStorageSync(credential, subscriptionId);
  const result = await client.cloudEndpoints.postBackup(
    "SampleResourceGroup_1",
    "SampleStorageSyncService_1",
    "SampleSyncGroup_1",
    "SampleCloudEndpoint_1",
    { azureFileShare: "https://sampleserver.file.core.test-cint.azure-test.net/sampleFileShare" },
  );
  console.log(result);
}

async function main() {
  await cloudEndpointsPostBackup();
}

main().catch(console.error);
