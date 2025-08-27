// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Test the new route for this Iot Hub
 *
 * @summary Test the new route for this Iot Hub
 * x-ms-original-file: specification/iothub/resource-manager/Microsoft.Devices/stable/2023-06-30/examples/iothub_testnewroute.json
 */

import type { TestRouteInput } from "@azure/arm-iothub";
import { IotHubClient } from "@azure/arm-iothub";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function iotHubResourceTestRoute(): Promise<void> {
  const subscriptionId =
    process.env["IOTHUB_SUBSCRIPTION_ID"] || "91d12660-3dec-467a-be2a-213b5544ddc0";
  const iotHubName = "testHub";
  const resourceGroupName = process.env["IOTHUB_RESOURCE_GROUP"] || "myResourceGroup";
  const input: TestRouteInput = {
    message: {
      appProperties: { key1: "value1" },
      body: "Body of message",
      systemProperties: { key1: "value1" },
    },
    route: {
      name: "Routeid",
      endpointNames: ["id1"],
      isEnabled: true,
      source: "DeviceMessages",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new IotHubClient(credential, subscriptionId);
  const result = await client.iotHubResource.testRoute(iotHubName, resourceGroupName, input);
  console.log(result);
}

async function main(): Promise<void> {
  await iotHubResourceTestRoute();
}

main().catch(console.error);
