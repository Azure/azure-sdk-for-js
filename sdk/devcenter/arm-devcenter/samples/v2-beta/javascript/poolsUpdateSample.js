// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to partially updates a machine pool.
 *
 * @summary partially updates a machine pool.
 * x-ms-original-file: 2026-01-01-preview/Pools_Patch.json
 */
async function poolsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.pools.update("rg1", "DevProject", "DevPool", {
    devBoxDefinitionName: "WebDevBox2",
  });
  console.log(result);
}

async function main() {
  await poolsUpdate();
}

main().catch(console.error);
