// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to triggers a refresh of the pool status.
 *
 * @summary triggers a refresh of the pool status.
 * x-ms-original-file: 2026-01-01-preview/Pools_RunHealthChecks.json
 */
async function poolsRefreshStatus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  await client.pools.runHealthChecks("rg1", "DevProject", "DevPool");
}

async function main() {
  await poolsRefreshStatus();
}

main().catch(console.error);
