// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ImportDevicesRequest } from "@azure/arm-iothub";
import { IotHubClient } from "@azure/arm-iothub";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Import, update, or delete device identities in the IoT hub identity registry from a blob. For more information, see: https://learn.microsoft.com/azure/iot-hub/iot-hub-devguide-identity-registry#import-and-export-device-identities.
 *
 * @summary Import, update, or delete device identities in the IoT hub identity registry from a blob. For more information, see: https://learn.microsoft.com/azure/iot-hub/iot-hub-devguide-identity-registry#import-and-export-device-identities.
 * x-ms-original-file: specification/iothub/resource-manager/Microsoft.Devices/stable/2023-06-30/examples/iothub_importdevices.json
 */
async function iotHubResourceImportDevices(): Promise<void> {
  const subscriptionId =
    process.env["IOTHUB_SUBSCRIPTION_ID"] || "91d12660-3dec-467a-be2a-213b5544ddc0";
  const resourceGroupName = process.env["IOTHUB_RESOURCE_GROUP"] || "myResourceGroup";
  const resourceName = "testHub";
  const importDevicesParameters: ImportDevicesRequest = {
    inputBlobContainerUri: "testBlob",
    outputBlobContainerUri: "testBlob",
  };
  const credential = new DefaultAzureCredential();
  const client = new IotHubClient(credential, subscriptionId);
  const result = await client.iotHubResource.importDevices(
    resourceGroupName,
    resourceName,
    importDevicesParameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await iotHubResourceImportDevices();
}

main().catch(console.error);
