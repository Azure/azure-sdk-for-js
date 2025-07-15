// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BlockClient } = require("@azure/arm-purestorageblock");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a storage pool
 *
 * @summary create a storage pool
 * x-ms-original-file: 2024-11-01/StoragePools_Create_MaximumSet_Gen.json
 */
async function storagePoolsCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "BC47D6CC-AA80-4374-86F8-19D94EC70666";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.storagePools.create("rgpurestorage", "storagePoolname", {
    properties: {
      availabilityZone: "vknyl",
      vnetInjection: {
        subnetId: "tnlctolrxdvnkjiphlrdxq",
        vnetId: "zbumtytyqwewjcyckwqchiypshv",
      },
      provisionedBandwidthMbPerSec: 17,
      avs: {
        avsEnabled: true,
        clusterResourceId: "zekrdsarbkwcbvpzhmuwoazogziwms",
      },
      reservationResourceId: "xiowoxnbtcotutcmmrofvgdi",
    },
    identity: { type: "None", userAssignedIdentities: { key4211: {} } },
    tags: { key7593: "vsyiygyurvwlfaezpuqu" },
    location: "lonlc",
  });
  console.log(result);
}

async function main() {
  await storagePoolsCreate();
}

main().catch(console.error);
