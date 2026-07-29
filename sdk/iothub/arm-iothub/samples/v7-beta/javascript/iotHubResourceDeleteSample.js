// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IotHubClient } = require("@azure/arm-iothub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete an IoT hub.
 *
 * @summary delete an IoT hub.
 * x-ms-original-file: 2026-03-01-preview/iothub_delete.json
 */
async function iotHubResourceDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotHubClient(credential, subscriptionId);
  const result = await client.iotHubResource.delete("myResourceGroup", "testHub");
  console.log(result);
}

async function main() {
  await iotHubResourceDelete();
}

main().catch(console.error);
