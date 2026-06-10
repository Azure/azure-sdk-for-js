// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a Schedule.
 *
 * @summary creates or updates a Schedule.
 * x-ms-original-file: 2026-01-01-preview/Schedules_CreateDailyShutdownPoolSchedule.json
 */
async function schedulesCreateDailyShutdownPoolSchedule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.schedules.createOrUpdate(
    "rg1",
    "DevProject",
    "DevPool",
    "autoShutdown",
    {
      properties: {
        type: "StopDevBox",
        frequency: "Daily",
        state: "Enabled",
        time: "17:30",
        timeZone: "America/Los_Angeles",
      },
    },
  );
  console.log(result);
}

async function main() {
  await schedulesCreateDailyShutdownPoolSchedule();
}

main().catch(console.error);
