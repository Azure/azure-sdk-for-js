// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates an instance pool.
 *
 * @summary updates an instance pool.
 * x-ms-original-file: 2025-02-01-preview/PatchInstancePool.json
 */
async function patchAnInstancePool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.instancePools.update("group1", "testIP", { tags: { x: "y" } });
  console.log(result);
}

async function main() {
  await patchAnInstancePool();
}

main().catch(console.error);
