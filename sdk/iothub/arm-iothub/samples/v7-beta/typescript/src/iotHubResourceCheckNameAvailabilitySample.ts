// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IotHubClient } from "@azure/arm-iothub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to check if an IoT hub name is available.
 *
 * @summary check if an IoT hub name is available.
 * x-ms-original-file: 2026-03-01-preview/checkNameAvailability.json
 */
async function iotHubResourceCheckNameAvailability(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotHubClient(credential, subscriptionId);
  const result = await client.iotHubResource.checkNameAvailability({ name: "test-request" });
  console.log(result);
}

async function main(): Promise<void> {
  await iotHubResourceCheckNameAvailability();
}

main().catch(console.error);
