// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a Schedule.
 *
 * @summary deletes a Schedule.
 * x-ms-original-file: 2026-01-01-preview/Schedules_Delete.json
 */
async function schedulesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  await client.schedules.delete("rg1", "TestProject", "DevPool", "autoShutdown");
}

async function main() {
  await schedulesDelete();
}

main().catch(console.error);
