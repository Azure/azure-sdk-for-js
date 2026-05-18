// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BlockClient } = require("@azure/arm-purestorageblock");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a volume group
 *
 * @summary create a volume group
 * x-ms-original-file: 2026-01-01-preview/VolumeGroups_Create_MaximumSet_Gen.json
 */
async function volumeGroupsCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.volumeGroups.create(
    "rgpurestorage",
    "storagepool-01",
    "volumegroup-01",
    {
      properties: {
        performanceParameters: { bandwidthLimitMbPerSec: 500, iopsLimit: 10000 },
        protectionParameters: { retention: "P7D", frequency: "PT1H" },
      },
      tags: { environment: "production" },
      location: "eastus",
    },
  );
  console.log(result);
}

async function main() {
  await volumeGroupsCreate();
}

main().catch(console.error);
