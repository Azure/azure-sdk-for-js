// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IotHubClient } = require("@azure/arm-iothub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a consumer group from an Event Hub-compatible endpoint in an IoT hub.
 *
 * @summary delete a consumer group from an Event Hub-compatible endpoint in an IoT hub.
 * x-ms-original-file: 2026-03-01-preview/iothub_deleteconsumergroup.json
 */
async function iotHubResourceDeleteEventHubConsumerGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotHubClient(credential, subscriptionId);
  await client.iotHubResource.deleteEventHubConsumerGroup(
    "myResourceGroup",
    "testHub",
    "events",
    "test",
  );
}

async function main() {
  await iotHubResourceDeleteEventHubConsumerGroup();
}

main().catch(console.error);
