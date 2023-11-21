// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how get a specific device information
 *
 * @summary Demonstrates the use of a DeviceUpdateClient to get a specific device information in Device Update for IoT Hub.
 * @azsdk-weight 40
 */

import DeviceUpdate, { isUnexpected, paginate } from "@azure-rest/iot-device-update";
import { DefaultAzureCredential } from "@azure/identity";
import dotenv from "dotenv";

dotenv.config();

const endpoint = process.env["ENDPOINT"] || "";
const instanceId = process.env["INSTANCE_ID"] || "";

async function main() {
  console.log("== Get device ==");
  const groupId = process.env["DEVICEUPDATE_DEVICE_GROUP"] || "";

  const credentials = new DefaultAzureCredential();

  const client = DeviceUpdate(endpoint, instanceId, credentials);

  console.log("Get various device management information from Device Update for IoT Hub...");

  console.log("\nDevices:");
  const devicesResult = await client
    .path("/management/devices")
    .get();

  if (isUnexpected(devicesResult)) {
    throw devicesResult.body;
  }

  const devices = paginate(client, devicesResult);
  for await (const device of devices) {
    console.log(device.deviceId);
  }

  console.log("\nDevice groups:");
  const groupsResult = await client
    .path("/management/groups")
    .get();

  if (isUnexpected(groupsResult)) {
    throw groupsResult.body;
  }

  const groups = paginate(client, groupsResult);
  for await (const group of groups) {
    console.log(group.groupId);
  }

  console.log("\nDevice classes:");
  const deviceClassesResult = await client
    .path("/management/deviceClasses")
    .get();

  if (isUnexpected(deviceClassesResult)) {
    throw deviceClassesResult.body;
  }

  const deviceClasses = paginate(client, deviceClassesResult);
  for await (const deviceClass of deviceClasses) {
    console.log(deviceClass.deviceClassId);
  }

  console.log("\nFor group '" + groupId + "', best updates are:");
  const bestUpdatesResult = await client
    .path("/management/groups/{groupId}/bestUpdates", groupId)
    .get();

  if (isUnexpected(bestUpdatesResult)) {
    throw bestUpdatesResult.body;
  }

  const bestUpdates = paginate(client, bestUpdatesResult);
  for await (const bestUpdate of bestUpdates) {
    console.log("  For device class '" + bestUpdate.deviceClassId + "':");
    console.log("    " + bestUpdate.update.updateId.provider);
    console.log("    " + bestUpdate.update.updateId.name);
    console.log("    " + bestUpdate.update.updateId.version);
  }
}

main().catch(console.error);
