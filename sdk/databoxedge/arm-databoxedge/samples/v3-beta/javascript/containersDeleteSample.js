// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataBoxEdgeManagementClient } = require("@azure/arm-databoxedge");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the container on the Data Box Edge/Data Box Gateway device.
 *
 * @summary deletes the container on the Data Box Edge/Data Box Gateway device.
 * x-ms-original-file: 2023-12-01/ContainerDelete.json
 */
async function containerDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  await client.containers.delete(
    "testedgedevice",
    "storageaccount1",
    "blobcontainer1",
    "GroupForEdgeAutomation",
  );
}

async function main() {
  await containerDelete();
}

main().catch(console.error);
