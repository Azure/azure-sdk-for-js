// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how get a list of updates providers
 *
 * @summary gets a list of updates providers
 * @azsdk-weight 40
 */

import DeviceUpdate, { paginate } from "@azure-rest/iot-device-update";
import { DefaultAzureCredential } from "@azure/identity";
import dotenv from "dotenv";

dotenv.config();

const accountEndpoint = process.env["ENDPOINT"] || "";
const instanceId = process.env["INSTANCE_ID"] || "";

async function main() {
  const credentials = new DefaultAzureCredential();

  const client = DeviceUpdate(accountEndpoint, credentials);

  const result = await client.path("/deviceupdate/{instanceId}/updates/providers", instanceId).get();

  const iter = paginate(client, result);

  for await (const item of iter) {
    console.log(item);
  }
}

main().catch(console.error);
