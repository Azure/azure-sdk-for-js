// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BlockClient } = require("@azure/arm-purestorageblock");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list storage pools by resource group
 *
 * @summary list storage pools by resource group
 * x-ms-original-file: 2026-01-01-preview/StoragePools_ListByResourceGroup_MaximumSet_Gen.json
 */
async function storagePoolsListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.storagePools.listByResourceGroup("rgpurestorage")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await storagePoolsListByResourceGroup();
}

main().catch(console.error);
