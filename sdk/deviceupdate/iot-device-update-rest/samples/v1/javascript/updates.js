// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of a DeviceUpdateClient to list all the update providers that have been imported to Device Update for IoT Hub
 */
import DeviceUpdate, { paginate } from "@azure-rest/iot-device-update";
import { DefaultAzureCredential } from "@azure/identity";
import dotenv from "dotenv";

dotenv.config();

const accountEndpoint = process.env["ENDPOINT"] || "";
const instanceId = process.env["INSTANCE_ID"] || "";

async function main() {
  console.log("== List update providers ==");

  const credentials = new DefaultAzureCredential();

  const client = DeviceUpdate(accountEndpoint, credentials);

  const result = await client.path("/deviceupdate/{instanceId}/updates/providers", instanceId).get();

  const iter = paginate(client, result);

  for await (const item of iter) {
    console.log(item);
  }
}

main().catch(console.error);
