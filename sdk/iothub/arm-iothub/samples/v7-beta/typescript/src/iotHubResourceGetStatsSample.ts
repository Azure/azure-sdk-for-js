// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IotHubClient } from "@azure/arm-iothub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the statistics from an IoT hub.
 *
 * @summary get the statistics from an IoT hub.
 * x-ms-original-file: 2026-03-01-preview/iothub_stats.json
 */
async function iotHubResourceGetStats(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotHubClient(credential, subscriptionId);
  const result = await client.iotHubResource.getStats("myResourceGroup", "testHub");
  console.log(result);
}

async function main(): Promise<void> {
  await iotHubResourceGetStats();
}

main().catch(console.error);
