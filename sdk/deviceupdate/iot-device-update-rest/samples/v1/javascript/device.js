// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how get a list of devices
 *
 * @summary gets a list of updates providers
 * @azsdk-weight 40
 */

import DeviceUpdate from "@azure-rest/iot-device-update";
import { DefaultAzureCredential } from "@azure/identity";
import dotenv from "dotenv";

dotenv.config();

const endpoint = process.env["ENDPOINT"] || "";
const instanceId = process.env["INSTANCE_ID"] || "";

async function main() {
  console.log("== List devices ==");

  const credentials = new DefaultAzureCredential();

  const client = DeviceUpdate(endpoint, credentials);

  const result = await client
    .path("/deviceupdate/{instanceId}/management/devices", instanceId)
    .get();

  console.log(result);
}

main().catch(console.error);
