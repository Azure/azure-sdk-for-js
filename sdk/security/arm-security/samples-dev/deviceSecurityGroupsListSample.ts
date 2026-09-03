// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to use this method get the list of device security groups for the specified IoT Hub resource.
 *
 * @summary use this method get the list of device security groups for the specified IoT Hub resource.
 * x-ms-original-file: 2019-08-01/DeviceSecurityGroups/ListDeviceSecurityGroups_example.json
 */
async function listAllDeviceSecurityGroupsForTheSpecifiedIoTHubResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const resArray = new Array();
  for await (const item of client.deviceSecurityGroups.list(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/SampleRG/providers/Microsoft.Devices/iotHubs/sampleiothub",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllDeviceSecurityGroupsForTheSpecifiedIoTHubResource();
}

main().catch(console.error);
