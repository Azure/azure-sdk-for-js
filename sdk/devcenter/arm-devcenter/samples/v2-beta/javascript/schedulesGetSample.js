// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a schedule resource.
 *
 * @summary gets a schedule resource.
 * x-ms-original-file: 2026-01-01-preview/Schedules_Get.json
 */
async function schedulesGetByPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.schedules.get("rg1", "TestProject", "DevPool", "autoShutdown");
  console.log(result);
}

async function main() {
  await schedulesGetByPool();
}

main().catch(console.error);
