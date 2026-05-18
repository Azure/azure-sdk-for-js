// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BlockClient } = require("@azure/arm-purestorageblock");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a volume group
 *
 * @summary update a volume group
 * x-ms-original-file: 2026-01-01-preview/VolumeGroups_Update_MaximumSet_Gen.json
 */
async function volumeGroupsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.volumeGroups.update(
    "rgpurestorage",
    "storagepool-01",
    "volumegroup-01",
    {
      tags: { environment: "production" },
      properties: {
        performanceParameters: { bandwidthLimitMbPerSec: 750, iopsLimit: 15000 },
        protectionParameters: { retention: "P14D", frequency: "PT2H" },
      },
    },
  );
  console.log(result);
}

async function main() {
  await volumeGroupsUpdate();
}

main().catch(console.error);
