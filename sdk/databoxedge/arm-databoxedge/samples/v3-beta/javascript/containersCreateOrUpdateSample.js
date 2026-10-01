// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataBoxEdgeManagementClient } = require("@azure/arm-databoxedge");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a new container or updates an existing container on the device.
 *
 * @summary creates a new container or updates an existing container on the device.
 * x-ms-original-file: 2023-12-01/ContainerPut.json
 */
async function containerPut() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const result = await client.containers.createOrUpdate(
    "testedgedevice",
    "storageaccount1",
    "blobcontainer1",
    "GroupForEdgeAutomation",
    { dataFormat: "BlockBlob" },
  );
  console.log(result);
}

async function main() {
  await containerPut();
}

main().catch(console.error);
