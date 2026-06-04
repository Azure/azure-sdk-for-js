// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftStorageSync } = require("@azure/arm-storagesync");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a new CloudEndpoint.
 *
 * @summary create a new CloudEndpoint.
 * x-ms-original-file: 2022-09-01/CloudEndpoints_Create.json
 */
async function cloudEndpointsCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "52b8da2f-61e0-4a1f-8dde-336911f367fb";
  const client = new MicrosoftStorageSync(credential, subscriptionId);
  const result = await client.cloudEndpoints.create(
    "SampleResourceGroup_1",
    "SampleStorageSyncService_1",
    "SampleSyncGroup_1",
    "SampleCloudEndpoint_1",
    {
      azureFileShareName: "cvcloud-afscv-0719-058-a94a1354-a1fd-4e9a-9a50-919fad8c4ba4",
      friendlyName: "ankushbsubscriptionmgmtmab",
      storageAccountResourceId:
        "/subscriptions/744f4d70-6d17-4921-8970-a765d14f763f/resourceGroups/tminienv59svc/providers/Microsoft.Storage/storageAccounts/tminienv59storage",
      storageAccountTenantId: '"72f988bf-86f1-41af-91ab-2d7cd011db47"',
    },
  );
  console.log(result);
}

async function main() {
  await cloudEndpointsCreate();
}

main().catch(console.error);
