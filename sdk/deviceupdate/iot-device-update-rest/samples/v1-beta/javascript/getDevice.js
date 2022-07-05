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
  const device = process.env["DEVICEUPDATE_DEVICE"] || "";

  const credentials = new DefaultAzureCredential();

  const client = DeviceUpdate(endpoint, credentials);

  const result = await client
    .path("/deviceUpdate/{instanceId}/management/devices/{deviceId}", instanceId, device)
    .get();

  console.log(result.body);
}

main().catch(console.error);
