// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information about a HorizonDb pool.
 *
 * @summary gets information about a HorizonDb pool.
 * x-ms-original-file: 2026-01-20-preview/Pools_Get.json
 */
async function getAHorizonDbPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.horizonDbPools.get(
    "exampleresourcegroup",
    "examplecluster",
    "examplepool",
  );
  console.log(result);
}

async function main() {
  await getAHorizonDbPool();
}

main().catch(console.error);
