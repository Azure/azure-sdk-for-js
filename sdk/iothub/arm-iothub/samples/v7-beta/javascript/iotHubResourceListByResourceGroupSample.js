// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IotHubClient } = require("@azure/arm-iothub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get all the IoT hubs in a resource group.
 *
 * @summary get all the IoT hubs in a resource group.
 * x-ms-original-file: 2026-03-01-preview/iothub_listbyrg.json
 */
async function iotHubResourceListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotHubClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.iotHubResource.listByResourceGroup("myResourceGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await iotHubResourceListByResourceGroup();
}

main().catch(console.error);
