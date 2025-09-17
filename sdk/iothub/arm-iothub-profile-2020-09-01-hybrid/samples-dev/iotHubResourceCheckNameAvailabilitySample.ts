// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Check if an IoT hub name is available.
 *
 * @summary Check if an IoT hub name is available.
 * x-ms-original-file: specification/iothub/resource-manager/Microsoft.Devices/preview/2019-07-01-preview/examples/checkNameAvailability.json
 */

import type { OperationInputs } from "@azure/arm-iothub-profile-2020-09-01-hybrid";
import { IotHubClient } from "@azure/arm-iothub-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function iotHubResourceCheckNameAvailability(): Promise<void> {
  const subscriptionId =
    process.env["IOTHUB_SUBSCRIPTION_ID"] || "91d12660-3dec-467a-be2a-213b5544ddc0";
  const operationInputs: OperationInputs = { name: "test-request" };
  const credential = new DefaultAzureCredential();
  const client = new IotHubClient(credential, subscriptionId);
  const result = await client.iotHubResource.checkNameAvailability(operationInputs);
  console.log(result);
}

async function main(): Promise<void> {
  await iotHubResourceCheckNameAvailability();
}

main().catch(console.error);
