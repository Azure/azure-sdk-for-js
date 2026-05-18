// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BlockClient } = require("@azure/arm-purestorageblock");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list volumes in an AVS VM
 *
 * @summary list volumes in an AVS VM
 * x-ms-original-file: 2026-01-01-preview/AvsVmVolumes_ListByAvsVm_MaximumSet_Gen.json
 */
async function avsVmVolumesListByAvsVm() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.avsVmVolumes.listByAvsVm(
    "rgpurestorage",
    "storagepool-01",
    "abc123def456",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await avsVmVolumesListByAvsVm();
}

main().catch(console.error);
