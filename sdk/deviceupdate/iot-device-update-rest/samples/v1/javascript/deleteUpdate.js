// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how import a device update to Device Update for IoT Hub.
 *
 * @summary Demonstrates the use of a Update Delete.
 */

const DeviceUpdate = require("@azure-rest/iot-device-update").default,
  { getLongRunningPoller, isUnexpected } = require("@azure-rest/iot-device-update");

const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

const endpoint = process.env["ENDPOINT"] || "";
const instanceId = process.env["INSTANCE_ID"] || "";

async function main() {
  console.log("== Delete update ==");
  const updateProvider = process.env["DEVICEUPDATE_UPDATE_PROVIDER"] || "";
  const updateName = process.env["DEVICEUPDATE_UPDATE_NAME"] || "";
  const updateVersion = process.env["DEVICEUPDATE_UPDATE_VERSION"] || "";

  const credentials = new DefaultAzureCredential();

  const client = DeviceUpdate(endpoint, credentials);

  const initialResponse = await client
    .path(
      "/deviceUpdate/{instanceId}/updates/providers/{provider}/names/{name}/versions/{version}",
      instanceId,
      updateProvider,
      updateName,
      updateVersion
    )
    .delete();

  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();

  if (isUnexpected(result)) {
    throw result.body.error;
  }

  console.log(`Delete succeeded!`);
}

main().catch(console.error);
