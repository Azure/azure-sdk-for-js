// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to partially updates a Schedule.
 *
 * @summary partially updates a Schedule.
 * x-ms-original-file: 2026-01-01-preview/Schedules_Patch.json
 */
async function schedulesUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.schedules.update("rg1", "TestProject", "DevPool", "autoShutdown", {
    time: "18:00",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await schedulesUpdate();
}

main().catch(console.error);
