// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventHubConsumerGroupBodyDescription } from "@azure/arm-iothub";
import { IotHubClient } from "@azure/arm-iothub";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Add a consumer group to an Event Hub-compatible endpoint in an IoT hub.
 *
 * @summary Add a consumer group to an Event Hub-compatible endpoint in an IoT hub.
 * x-ms-original-file: specification/iothub/resource-manager/Microsoft.Devices/stable/2023-06-30/examples/iothub_createconsumergroup.json
 */
async function iotHubResourceCreateEventHubConsumerGroup(): Promise<void> {
  const subscriptionId =
    process.env["IOTHUB_SUBSCRIPTION_ID"] || "91d12660-3dec-467a-be2a-213b5544ddc0";
  const resourceGroupName = process.env["IOTHUB_RESOURCE_GROUP"] || "myResourceGroup";
  const resourceName = "testHub";
  const eventHubEndpointName = "events";
  const name = "test";
  const consumerGroupBody: EventHubConsumerGroupBodyDescription = {
    properties: { name: "test" },
  };
  const credential = new DefaultAzureCredential();
  const client = new IotHubClient(credential, subscriptionId);
  const result = await client.iotHubResource.createEventHubConsumerGroup(
    resourceGroupName,
    resourceName,
    eventHubEndpointName,
    name,
    consumerGroupBody,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await iotHubResourceCreateEventHubConsumerGroup();
}

main().catch(console.error);
