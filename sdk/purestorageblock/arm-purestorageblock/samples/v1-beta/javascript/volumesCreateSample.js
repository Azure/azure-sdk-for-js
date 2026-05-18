// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BlockClient } = require("@azure/arm-purestorageblock");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a volume
 *
 * @summary create a volume
 * x-ms-original-file: 2026-01-01-preview/Volumes_Create_MaximumSet_Gen.json
 */
async function volumesCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.volumes.create(
    "rgpurestorage",
    "storagepool-01",
    "volumegroup-01",
    "volume-01",
    {
      properties: {
        provisionedSize: 10737418240,
        sourceVolumeResourceId:
          "/subscriptions/11111111-1111-1111-1111-111111111111/resourceGroups/rgpurestorage/providers/PureStorage.Block/storagePools/storagepool-01/volumeGroups/volumegroup-01/volumes/source-volume",
      },
    },
  );
  console.log(result);
}

async function main() {
  await volumesCreate();
}

main().catch(console.error);
