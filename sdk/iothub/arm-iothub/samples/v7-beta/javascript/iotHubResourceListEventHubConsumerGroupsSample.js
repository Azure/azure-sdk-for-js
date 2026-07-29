// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IotHubClient } = require("@azure/arm-iothub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a list of the consumer groups in the Event Hub-compatible device-to-cloud endpoint in an IoT hub.
 *
 * @summary get a list of the consumer groups in the Event Hub-compatible device-to-cloud endpoint in an IoT hub.
 * x-ms-original-file: 2026-03-01-preview/iothub_listehgroups.json
 */
async function iotHubResourceListEventHubConsumerGroups() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotHubClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.iotHubResource.listEventHubConsumerGroups(
    "myResourceGroup",
    "testHub",
    "events",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await iotHubResourceListEventHubConsumerGroups();
}

main().catch(console.error);
