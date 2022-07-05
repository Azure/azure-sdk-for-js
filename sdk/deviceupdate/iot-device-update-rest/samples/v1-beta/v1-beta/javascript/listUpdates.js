// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how get a list of available updates
 *
 * @summary Demonstrates the use of a DeviceUpdateClient to list all updates in Device Update for IoT Hub.
 */

const DeviceUpdate = require("@azure-rest/iot-device-update").default;
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

const endpoint = process.env["ENDPOINT"] || "";
const instanceId = process.env["INSTANCE_ID"] || "";

async function main() {
  console.log("== List updates ==");
  const provider = process.env["DEVICEUPDATE_UPDATE_PROVIDER"] || "";
  const name = process.env["DEVICEUPDATE_UPDATE_NAME"] || "";

  const credentials = new DefaultAzureCredential();

  const client = DeviceUpdate(endpoint, credentials);

  const result = await client
    .path(
      "/deviceUpdate/{instanceId}/updates/providers/{provider}/names/{name}/versions",
      instanceId,
      provider,
      name
    )
    .get();

  console.log(result.body);
}

main().catch(console.error);
