// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IotHubClient } from "@azure/arm-iothub";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get the security metadata for an IoT hub. For more information, see: https://learn.microsoft.com/azure/iot-hub/iot-hub-devguide-security.
 *
 * @summary Get the security metadata for an IoT hub. For more information, see: https://learn.microsoft.com/azure/iot-hub/iot-hub-devguide-security.
 * x-ms-original-file: specification/iothub/resource-manager/Microsoft.Devices/stable/2023-06-30/examples/iothub_listkeys.json
 */
async function iotHubResourceListKeys(): Promise<void> {
  const subscriptionId =
    process.env["IOTHUB_SUBSCRIPTION_ID"] || "91d12660-3dec-467a-be2a-213b5544ddc0";
  const resourceGroupName = process.env["IOTHUB_RESOURCE_GROUP"] || "myResourceGroup";
  const resourceName = "testHub";
  const credential = new DefaultAzureCredential();
  const client = new IotHubClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.iotHubResource.listKeys(resourceGroupName, resourceName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await iotHubResourceListKeys();
}

main().catch(console.error);
