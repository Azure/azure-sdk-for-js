// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Test all routes configured in this Iot Hub
 *
 * @summary Test all routes configured in this Iot Hub
 * x-ms-original-file: specification/iothub/resource-manager/Microsoft.Devices/preview/2019-07-01-preview/examples/iothub_testallroutes.json
 */

import type { TestAllRoutesInput } from "@azure/arm-iothub-profile-2020-09-01-hybrid";
import { IotHubClient } from "@azure/arm-iothub-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function iotHubResourceTestAllRoutes(): Promise<void> {
  const subscriptionId =
    process.env["IOTHUB_SUBSCRIPTION_ID"] || "91d12660-3dec-467a-be2a-213b5544ddc0";
  const iotHubName = "testHub";
  const resourceGroupName = process.env["IOTHUB_RESOURCE_GROUP"] || "myResourceGroup";
  const input: TestAllRoutesInput = {
    message: {
      appProperties: {},
      body: "Body of message",
      systemProperties: {},
    },
    routingSource: "DeviceMessages",
  };
  const credential = new DefaultAzureCredential();
  const client = new IotHubClient(credential, subscriptionId);
  const result = await client.iotHubResource.testAllRoutes(iotHubName, resourceGroupName, input);
  console.log(result);
}

async function main(): Promise<void> {
  await iotHubResourceTestAllRoutes();
}

main().catch(console.error);
