// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IotHubClient } = require("@azure/arm-iothub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update an existing IoT Hub tags. to update other fields use the CreateOrUpdate method
 *
 * @summary update an existing IoT Hub tags. to update other fields use the CreateOrUpdate method
 * x-ms-original-file: 2026-03-01-preview/iothub_patch.json
 */
async function iotHubResourceUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotHubClient(credential, subscriptionId);
  const result = await client.iotHubResource.update("myResourceGroup", "myHub", {
    tags: { foo: "bar" },
  });
  console.log(result);
}

async function main() {
  await iotHubResourceUpdate();
}

main().catch(console.error);
