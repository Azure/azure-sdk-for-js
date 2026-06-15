// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IotHubClient } from "@azure/arm-iothub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to test all routes configured in this Iot Hub
 *
 * @summary test all routes configured in this Iot Hub
 * x-ms-original-file: 2026-03-01-preview/iothub_testallroutes.json
 */
async function iotHubResourceTestAllRoutes(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotHubClient(credential, subscriptionId);
  const result = await client.iotHubResource.testAllRoutes("testHub", "myResourceGroup", {
    message: {
      appProperties: { key1: "value1" },
      body: "Body of message",
      systemProperties: { key1: "value1" },
    },
    routingSource: "DeviceMessages",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await iotHubResourceTestAllRoutes();
}

main().catch(console.error);
