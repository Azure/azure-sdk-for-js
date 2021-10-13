// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how get a list of updates
 *
 * @summary gets a list of updates
 * @azsdk-weight 40
 */

import DeviceUpdate from "@azure-rest/iot-device-update";
import { DefaultAzureCredential } from "@azure/identity";
import dotenv from "dotenv";

dotenv.config();

const endpoint = process.env["ENDPOINT"] || "";

async function main() {
  console.log("== List updates sample ==");
  const client = DeviceUpdate(endpoint, new DefaultAzureCredential());

  const updates = await client.path("/deviceupdate/{instanceId}/updates", "test").get();

  if (updates.status !== "200") {
    throw updates.body.error;
  }

  console.log(updates.body.value?.map((ups) => ups.name).join("\n"));
}

main().catch(console.error);
