// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how get a specific device information
 *
 * @summary Demonstrates the use of a DeviceUpdateClient to get a specific device information in Device Update for IoT Hub.
 */

import DeviceUpdate from "@azure-rest/iot-device-update";
import { DefaultAzureCredential } from "@azure/identity";
import dotenv from "dotenv";

dotenv.config();

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
