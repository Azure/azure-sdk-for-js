// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IotHubClient } from "@azure/arm-iothub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to test the new route for this Iot Hub
 *
 * @summary test the new route for this Iot Hub
 * x-ms-original-file: 2026-03-01-preview/iothub_testnewroute.json
 */
async function iotHubResourceTestRoute(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotHubClient(credential, subscriptionId);
  const result = await client.iotHubResource.testRoute("testHub", "myResourceGroup", {
    message: {
      appProperties: { key1: "value1" },
      body: "Body of message",
      systemProperties: { key1: "value1" },
    },
    route: { name: "Routeid", endpointNames: ["id1"], isEnabled: true, source: "DeviceMessages" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await iotHubResourceTestRoute();
}

main().catch(console.error);
