// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataBoxEdgeManagementClient } = require("@azure/arm-databoxedge");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a new StorageAccount or updates an existing StorageAccount on the device.
 *
 * @summary creates a new StorageAccount or updates an existing StorageAccount on the device.
 * x-ms-original-file: 2023-12-01/StorageAccountPut.json
 */
async function storageAccountPut() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.createOrUpdate(
    "testedgedevice",
    "blobstorageaccount1",
    "GroupForEdgeAutomation",
    {
      description: "It's an awesome storage account",
      dataPolicy: "Cloud",
      storageAccountCredentialId:
        "/subscriptions/4385cf00-2d3a-425a-832f-f4285b1c9dce/resourceGroups/GroupForDataBoxEdgeAutomation/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/testedgedevice/storageAccountCredentials/cisbvt",
      storageAccountStatus: "OK",
    },
  );
  console.log(result);
}

async function main() {
  await storageAccountPut();
}

main().catch(console.error);
