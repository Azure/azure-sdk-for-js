// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a machine pool.
 *
 * @summary gets a machine pool.
 * x-ms-original-file: 2026-01-01-preview/Pools_Get.json
 */
async function poolsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.pools.get("rg1", "DevProject", "DevPool");
  console.log(result);
}

/**
 * This sample demonstrates how to gets a machine pool.
 *
 * @summary gets a machine pool.
 * x-ms-original-file: 2026-01-01-preview/Pools_GetUnhealthyStatus.json
 */
async function poolsGetUnhealthyStatus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.pools.get("rg1", "DevProject", "DevPool");
  console.log(result);
}

async function main() {
  await poolsGet();
  await poolsGetUnhealthyStatus();
}

main().catch(console.error);
