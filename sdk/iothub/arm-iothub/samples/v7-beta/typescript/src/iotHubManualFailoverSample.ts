// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IotHubClient } from "@azure/arm-iothub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to manually initiate a failover for the IoT Hub to its secondary region. To learn more, see https://aka.ms/manualfailover
 *
 * @summary manually initiate a failover for the IoT Hub to its secondary region. To learn more, see https://aka.ms/manualfailover
 * x-ms-original-file: 2026-03-01-preview/IotHub_ManualFailover.json
 */
async function iotHubManualFailover(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotHubClient(credential, subscriptionId);
  await client.iotHub.manualFailover("testHub", "myResourceGroup", { failoverRegion: "testHub" });
}

async function main(): Promise<void> {
  await iotHubManualFailover();
}

main().catch(console.error);
