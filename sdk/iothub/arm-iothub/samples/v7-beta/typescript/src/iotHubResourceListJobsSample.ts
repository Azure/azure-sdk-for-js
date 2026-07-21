// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IotHubClient } from "@azure/arm-iothub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a list of all the jobs in an IoT hub. For more information, see: https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-identity-registry.
 *
 * @summary get a list of all the jobs in an IoT hub. For more information, see: https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-identity-registry.
 * x-ms-original-file: 2026-03-01-preview/iothub_listjobs.json
 */
async function iotHubResourceListJobs(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotHubClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.iotHubResource.listJobs("myResourceGroup", "testHub")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await iotHubResourceListJobs();
}

main().catch(console.error);
