// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IotHubClient } from "@azure/arm-iothub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to add a consumer group to an Event Hub-compatible endpoint in an IoT hub.
 *
 * @summary add a consumer group to an Event Hub-compatible endpoint in an IoT hub.
 * x-ms-original-file: 2026-03-01-preview/iothub_createconsumergroup.json
 */
async function iotHubResourceCreateEventHubConsumerGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotHubClient(credential, subscriptionId);
  const result = await client.iotHubResource.createEventHubConsumerGroup(
    "myResourceGroup",
    "testHub",
    "events",
    "test",
    { properties: { name: "test" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await iotHubResourceCreateEventHubConsumerGroup();
}

main().catch(console.error);
