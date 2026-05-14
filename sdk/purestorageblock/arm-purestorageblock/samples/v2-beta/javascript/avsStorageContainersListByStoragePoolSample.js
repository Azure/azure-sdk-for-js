// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BlockClient } = require("@azure/arm-purestorageblock");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list AVS storage containers by storage pool
 *
 * @summary list AVS storage containers by storage pool
 * x-ms-original-file: 2026-01-01-preview/AvsStorageContainers_ListByStoragePool_MaximumSet_Gen.json
 */
async function avsStorageContainersListByStoragePool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.avsStorageContainers.listByStoragePool(
    "rgpurestorage",
    "spName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await avsStorageContainersListByStoragePool();
}

main().catch(console.error);
