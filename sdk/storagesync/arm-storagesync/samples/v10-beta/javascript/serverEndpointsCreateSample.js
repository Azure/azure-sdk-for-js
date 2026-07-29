// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftStorageSync } = require("@azure/arm-storagesync");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a new ServerEndpoint.
 *
 * @summary create a new ServerEndpoint.
 * x-ms-original-file: 2022-09-01/ServerEndpoints_Create.json
 */
async function serverEndpointsCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "52b8da2f-61e0-4a1f-8dde-336911f367fb";
  const client = new MicrosoftStorageSync(credential, subscriptionId);
  const result = await client.serverEndpoints.create(
    "SampleResourceGroup_1",
    "SampleStorageSyncService_1",
    "SampleSyncGroup_1",
    "SampleServerEndpoint_1",
    {
      cloudTiering: "off",
      initialDownloadPolicy: "NamespaceThenModifiedFiles",
      initialUploadPolicy: "ServerAuthoritative",
      localCacheMode: "UpdateLocallyCachedFiles",
      offlineDataTransfer: "on",
      offlineDataTransferShareName: "myfileshare",
      serverLocalPath: "D:\\SampleServerEndpoint_1",
      serverResourceId:
        "/subscriptions/52b8da2f-61e0-4a1f-8dde-336911f367fb/resourceGroups/SampleResourceGroup_1/providers/Microsoft.StorageSync/storageSyncServices/SampleStorageSyncService_1/registeredServers/080d4133-bdb5-40a0-96a0-71a6057bfe9a",
      tierFilesOlderThanDays: 0,
      volumeFreeSpacePercent: 100,
    },
  );
  console.log(result);
}

async function main() {
  await serverEndpointsCreate();
}

main().catch(console.error);
