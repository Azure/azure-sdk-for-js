// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get all the IoT hubs in a subscription.
 *
 * @summary Get all the IoT hubs in a subscription.
 * x-ms-original-file: specification/iothub/resource-manager/Microsoft.Devices/stable/2023-06-30/examples/iothub_listbysubscription.json
 */

import { IotHubClient } from "@azure/arm-iothub";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function iotHubResourceListBySubscription(): Promise<void> {
  const subscriptionId =
    process.env["IOTHUB_SUBSCRIPTION_ID"] || "91d12660-3dec-467a-be2a-213b5544ddc0";
  const credential = new DefaultAzureCredential();
  const client = new IotHubClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.iotHubResource.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await iotHubResourceListBySubscription();
}

main().catch(console.error);
