// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IotHubClient } = require("@azure/arm-iothub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a consumer group from the Event Hub-compatible device-to-cloud endpoint for an IoT hub.
 *
 * @summary get a consumer group from the Event Hub-compatible device-to-cloud endpoint for an IoT hub.
 * x-ms-original-file: 2026-03-01-preview/iothub_getconsumergroup.json
 */
async function iotHubResourceListEventHubConsumerGroups() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotHubClient(credential, subscriptionId);
  const result = await client.iotHubResource.getEventHubConsumerGroup(
    "myResourceGroup",
    "testHub",
    "events",
    "test",
  );
  console.log(result);
}

async function main() {
  await iotHubResourceListEventHubConsumerGroups();
}

main().catch(console.error);
