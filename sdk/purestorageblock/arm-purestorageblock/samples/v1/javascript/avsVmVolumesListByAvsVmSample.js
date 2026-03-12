// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BlockClient } = require("@azure/arm-purestorageblock");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list volumes in an AVS VM
 *
 * @summary list volumes in an AVS VM
 * x-ms-original-file: 2024-11-01/AvsVmVolumes_ListByAvsVm_MaximumSet_Gen.json
 */
async function avsVmVolumesListByAvsVm() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "BC47D6CC-AA80-4374-86F8-19D94EC70666";
  const client = new BlockClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.avsVmVolumes.listByAvsVm(
    "rgpurestorage",
    "storagePoolname",
    "cbdec-ddbb",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await avsVmVolumesListByAvsVm();
}

main().catch(console.error);
