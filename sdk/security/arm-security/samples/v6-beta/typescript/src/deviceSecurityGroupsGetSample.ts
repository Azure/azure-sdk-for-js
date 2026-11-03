// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to use this method to get the device security group for the specified IoT Hub resource.
 *
 * @summary use this method to get the device security group for the specified IoT Hub resource.
 * x-ms-original-file: 2019-08-01/DeviceSecurityGroups/GetDeviceSecurityGroups_example.json
 */
async function getADeviceSecurityGroupForTheSpecifiedIoTHubResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.deviceSecurityGroups.get(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/SampleRG/providers/Microsoft.Devices/iotHubs/sampleiothub",
    "samplesecuritygroup",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getADeviceSecurityGroupForTheSpecifiedIoTHubResource();
}

main().catch(console.error);
