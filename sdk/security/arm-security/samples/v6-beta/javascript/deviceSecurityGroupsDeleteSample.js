// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to user this method to deletes the device security group.
 *
 * @summary user this method to deletes the device security group.
 * x-ms-original-file: 2019-08-01/DeviceSecurityGroups/DeleteDeviceSecurityGroups_example.json
 */
async function deleteADeviceSecurityGroupForTheSpecifiedIoTHubResource() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  await client.deviceSecurityGroups.delete(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/SampleRG/providers/Microsoft.Devices/iotHubs/sampleiothub",
    "samplesecuritygroup",
  );
}

async function main() {
  await deleteADeviceSecurityGroupForTheSpecifiedIoTHubResource();
}

main().catch(console.error);
