// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how get a specific device information
 *
 * @summary Demonstrates the use of a DeviceUpdateClient to get a specific device information in Device Update for IoT Hub.
 */

const DeviceUpdate = require("@azure-rest/iot-device-update").default;
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

const endpoint = process.env["ENDPOINT"] || "";
const instanceId = process.env["INSTANCE_ID"] || "";

async function main() {
  console.log("== Get device ==");
  const groupId = process.env["DEVICEUPDATE_DEVICE_GROUP"] || "";

  const credentials = new DefaultAzureCredential();

  const client = DeviceUpdate(endpoint, credentials);

  console.log("Get various device management information from Device Update for IoT Hub...");

  console.log("\nDevices:");
  const devicesResult = await client
    .path("/deviceUpdate/{instanceId}/management/devices", instanceId)
    .get();
  devicesResult.body.value.forEach((device) => {
    console.log(device.deviceId);
  });

  console.log("\nDevice groups:");
  const groupsResult = await client
    .path("/deviceUpdate/{instanceId}/management/groups", instanceId)
    .get();
  groupsResult.body.value.forEach((group) => {
    console.log(group.groupId);
  });

  console.log("\nDevice classes:");
  const deviceClassesResult = await client
    .path("/deviceUpdate/{instanceId}/management/deviceClasses", instanceId)
    .get();
  deviceClassesResult.body.value.forEach((deviceClass) => {
    console.log(deviceClass.deviceClassId);
  });

  console.log("\nFor group '" + groupId + "', best updates are:");
  const bestUpdatesResult = await client
    .path("/deviceUpdate/{instanceId}/management/groups/{groupId}/bestUpdates", instanceId, groupId)
    .get();
  bestUpdatesResult.body.value.forEach((bestUpdate) => {
    console.log("  For device class '" + bestUpdate.deviceClassId + "':");
    console.log("    " + bestUpdate.update.updateId.provider);
    console.log("    " + bestUpdate.update.updateId.name);
    console.log("    " + bestUpdate.update.updateId.version);
  });
}

main().catch(console.error);
