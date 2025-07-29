// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BlockClient } = require("@azure/arm-purestorageblock");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a volume in an AVS VM
 *
 * @summary update a volume in an AVS VM
 * x-ms-original-file: 2024-11-01/AvsVmVolumes_Update_MaximumSet_Gen.json
 */
async function avsVmVolumesUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "BC47D6CC-AA80-4374-86F8-19D94EC70666";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.avsVmVolumes.update(
    "rgpurestorage",
    "storagePoolname",
    "cbdec-ddbb",
    "cbdec-ddbb",
    { properties: { softDeletion: { destroyed: true } } },
  );
  console.log(result);
}

async function main() {
  await avsVmVolumesUpdate();
}

main().catch(console.error);
