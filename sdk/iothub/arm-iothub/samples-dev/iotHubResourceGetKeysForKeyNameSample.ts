// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IotHubClient } from "@azure/arm-iothub";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get a shared access policy by name from an IoT hub. For more information, see: https://learn.microsoft.com/azure/iot-hub/iot-hub-devguide-security.
 *
 * @summary Get a shared access policy by name from an IoT hub. For more information, see: https://learn.microsoft.com/azure/iot-hub/iot-hub-devguide-security.
 * x-ms-original-file: specification/iothub/resource-manager/Microsoft.Devices/stable/2023-06-30/examples/iothub_getkey.json
 */
async function iotHubResourceGetKeysForKeyName(): Promise<void> {
  const subscriptionId =
    process.env["IOTHUB_SUBSCRIPTION_ID"] || "91d12660-3dec-467a-be2a-213b5544ddc0";
  const resourceGroupName = process.env["IOTHUB_RESOURCE_GROUP"] || "myResourceGroup";
  const resourceName = "testHub";
  const keyName = "iothubowner";
  const credential = new DefaultAzureCredential();
  const client = new IotHubClient(credential, subscriptionId);
  const result = await client.iotHubResource.getKeysForKeyName(
    resourceGroupName,
    resourceName,
    keyName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await iotHubResourceGetKeysForKeyName();
}

main().catch(console.error);
