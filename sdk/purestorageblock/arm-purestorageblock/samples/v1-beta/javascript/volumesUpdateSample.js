// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BlockClient } = require("@azure/arm-purestorageblock");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a volume
 *
 * @summary update a volume
 * x-ms-original-file: 2026-01-01-preview/Volumes_Update_MaximumSet_Gen.json
 */
async function volumesUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.volumes.update(
    "rgpurestorage",
    "storagepool-01",
    "volumegroup-01",
    "volume-01",
    { properties: { provisionedSize: 21474836480 } },
  );
  console.log(result);
}

async function main() {
  await volumesUpdate();
}

main().catch(console.error);
