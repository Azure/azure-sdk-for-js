// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ElasticSanManagement } = require("@azure/arm-elasticsan");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to validate whether a list of backed up disk snapshots can be restored into ElasticSan volumes.
 *
 * @summary validate whether a list of backed up disk snapshots can be restored into ElasticSan volumes.
 * x-ms-original-file: 2025-09-01/Volumes_PreRestore_MaximumSet_Gen.json
 */
async function volumeGroupsPreRestoreMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.volumes.preRestore(
    "resourcegroupname",
    "elasticsanname",
    "volumegroupname",
    {
      diskSnapshotIds: [
        "/subscriptions/{subscriptionid}/resourceGroups/{resourcegroupname}/providers/Microsoft.Compute/snapshots/disksnapshot1",
      ],
    },
  );
  console.log(result);
}

async function main() {
  await volumeGroupsPreRestoreMaximumSetGen();
}

main().catch(console.error);
