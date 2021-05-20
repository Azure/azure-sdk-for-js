// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of a DeviceUpdateClient to list all the update providers that have been imported to Device Update for IoT Hub
 * @azsdk-weight 40
 */
 
import { DeviceUpdateClient } from "@azure/iot-device-update";
import { DefaultAzureCredential } from "@azure/identity";
import { config } from "dotenv";

config();

const accountEndpoint = process.env["ACCOUNT_ENDPOINT"] || "<ACCOUNT_ENDPOINT>";
const instanceId = process.env["INSTANCE_ID"] || "<INSTANCE_ID>";

/**
 * Get a list of all update providers that have been imported to Device Update for IoT Hub
 */
export async function main() {
  const credentials = new DefaultAzureCredential();
  const client = new DeviceUpdateClient(credentials, accountEndpoint, instanceId);

  const providers = client.updates.listProviders();

  for await (const provider of providers) {
    console.log(provider);
  }
}

main().catch((error) => {
  console.error("An error occurred in the sample:", error);
  process.exit(1);
});
