// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BlockClient } = require("@azure/arm-purestorageblock");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list AVS VMs by storage pool
 *
 * @summary list AVS VMs by storage pool
 * x-ms-original-file: 2026-01-01-preview/AvsVms_ListByStoragePool_MaximumSet_Gen.json
 */
async function avsVmsListByStoragePool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.avsVms.listByStoragePool("rgpurestorage", "storagepool-01")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await avsVmsListByStoragePool();
}

main().catch(console.error);
