// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BlockClient } = require("@azure/arm-purestorageblock");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a volume in an AVS VM
 *
 * @summary update a volume in an AVS VM
 * x-ms-original-file: 2026-01-01-preview/AvsVmVolumes_Update_MaximumSet_Gen.json
 */
async function avsVmVolumesUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.avsVmVolumes.update(
    "rgpurestorage",
    "storagepool-01",
    "abc123def456",
    "a1b2c3d4-e5f6",
    { properties: { softDeletion: { destroyed: true } } },
  );
  console.log(result);
}

async function main() {
  await avsVmVolumesUpdate();
}

main().catch(console.error);
