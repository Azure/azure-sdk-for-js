// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists schedules for a pool.
 *
 * @summary lists schedules for a pool.
 * x-ms-original-file: 2026-01-01-preview/Schedules_ListByPool.json
 */
async function schedulesListByPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.schedules.listByPool("rg1", "TestProject", "DevPool")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await schedulesListByPool();
}

main().catch(console.error);
