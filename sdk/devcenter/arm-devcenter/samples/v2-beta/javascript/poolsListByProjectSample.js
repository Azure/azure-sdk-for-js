// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists pools for a project.
 *
 * @summary lists pools for a project.
 * x-ms-original-file: 2026-01-01-preview/Pools_List.json
 */
async function poolsListByProject() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.pools.listByProject("rg1", "DevProject")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await poolsListByProject();
}

main().catch(console.error);
