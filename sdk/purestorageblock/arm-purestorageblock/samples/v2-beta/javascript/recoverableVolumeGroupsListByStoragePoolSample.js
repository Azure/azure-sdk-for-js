// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BlockClient } = require("@azure/arm-purestorageblock");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all recoverable volume groups in a storage pool
 *
 * @summary list all recoverable volume groups in a storage pool
 * x-ms-original-file: 2026-05-01-preview/RecoverableVolumeGroups_ListByStoragePool_MaximumSet_Gen.json
 */
async function recoverableVolumeGroupsListByStoragePool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.recoverableVolumeGroups.listByStoragePool(
    "rgpurestorage",
    "storagepool-01",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await recoverableVolumeGroupsListByStoragePool();
}

main().catch(console.error);
