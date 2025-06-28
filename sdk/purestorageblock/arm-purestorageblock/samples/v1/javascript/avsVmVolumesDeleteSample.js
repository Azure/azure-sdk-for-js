// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BlockClient } = require("@azure/arm-purestorageblock");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a volume in an AVS VM
 *
 * @summary delete a volume in an AVS VM
 * x-ms-original-file: 2024-11-01/AvsVmVolumes_Delete_MaximumSet_Gen.json
 */
async function avsVmVolumesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "BC47D6CC-AA80-4374-86F8-19D94EC70666";
  const client = new BlockClient(credential, subscriptionId);
  await client.avsVmVolumes.delete("rgpurestorage", "storagePoolname", "cbdec-ddbb", "cbdec-ddbb");
}

async function main() {
  await avsVmVolumesDelete();
}

main().catch(console.error);
