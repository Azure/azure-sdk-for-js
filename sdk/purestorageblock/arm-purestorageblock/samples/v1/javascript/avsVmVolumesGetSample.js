// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BlockClient } = require("@azure/arm-purestorageblock");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a volume in an AVS VM
 *
 * @summary get a volume in an AVS VM
 * x-ms-original-file: 2024-11-01/AvsVmVolumes_Get_MaximumSet_Gen.json
 */
async function avsVmVolumesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "BC47D6CC-AA80-4374-86F8-19D94EC70666";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.avsVmVolumes.get(
    "rgpurestorage",
    "storagePoolname",
    "cbdec-ddbb",
    "cbdec-ddbb",
  );
  console.log(result);
}

async function main() {
  await avsVmVolumesGet();
}

main().catch(console.error);
