// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how get a specific update version
 *
 * @summary Demonstrates the use of a DeviceUpdateClient to get a specific update version in Device Update for IoT Hub.
 */

const DeviceUpdate = require("@azure-rest/iot-device-update").default;
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

const endpoint = process.env["ENDPOINT"] || "";
const instanceId = process.env["INSTANCE_ID"] || "";

async function main() {
  console.log("== Get update ==");
  const provider = process.env["DEVICEUPDATE_UPDATE_PROVIDER"] || "";
  const name = process.env["DEVICEUPDATE_UPDATE_NAME"] || "";
  const version = process.env["DEVICEUPDATE_UPDATE_VERSION"] || "";

  const credentials = new DefaultAzureCredential();

  const client = DeviceUpdate(endpoint, credentials);

  const result = await client
    .path(
      "/deviceUpdate/{instanceId}/updates/providers/{provider}/names/{name}/versions/{version}",
      instanceId,
      provider,
      name,
      version
    )
    .get();

  console.log(result);
}

main().catch(console.error);
