// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get a list of all the jobs in an IoT hub. For more information, see: https://learn.microsoft.com/azure/iot-hub/iot-hub-devguide-identity-registry.
 *
 * @summary Get a list of all the jobs in an IoT hub. For more information, see: https://learn.microsoft.com/azure/iot-hub/iot-hub-devguide-identity-registry.
 * x-ms-original-file: specification/iothub/resource-manager/Microsoft.Devices/preview/2019-07-01-preview/examples/iothub_listjobs.json
 */

import { IotHubClient } from "@azure/arm-iothub-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function iotHubResourceListJobs(): Promise<void> {
  const subscriptionId =
    process.env["IOTHUB_SUBSCRIPTION_ID"] || "91d12660-3dec-467a-be2a-213b5544ddc0";
  const resourceGroupName = process.env["IOTHUB_RESOURCE_GROUP"] || "myResourceGroup";
  const resourceName = "testHub";
  const credential = new DefaultAzureCredential();
  const client = new IotHubClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.iotHubResource.listJobs(resourceGroupName, resourceName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await iotHubResourceListJobs();
}

main().catch(console.error);
