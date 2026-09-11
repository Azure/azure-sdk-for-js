// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevOpsInfrastructureClient } = require("@azure/arm-devopsinfrastructure");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Pool
 *
 * @summary delete a Pool
 * x-ms-original-file: 2026-07-03-preview/DeletePool.json
 */
async function poolsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a2e95d27-c161-4b61-bda4-11512c14c2c2";
  const client = new DevOpsInfrastructureClient(credential, subscriptionId);
  await client.pools.delete("rg", "pool");
}

async function main() {
  await poolsDelete();
}

main().catch(console.error);
