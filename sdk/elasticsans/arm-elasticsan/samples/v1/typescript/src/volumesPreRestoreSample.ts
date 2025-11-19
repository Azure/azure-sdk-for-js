// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DiskSnapshotList} from "@azure/arm-elasticsan";
import { ElasticSanManagement } from "@azure/arm-elasticsan";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Validate whether a list of backed up disk snapshots can be restored into ElasticSan volumes.
 *
 * @summary Validate whether a list of backed up disk snapshots can be restored into ElasticSan volumes.
 * x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/ElasticSan/stable/2025-09-01/examples/Volumes_PreRestore_MaximumSet_Gen.json
 */
async function volumeGroupsPreRestoreMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["ELASTICSANS_SUBSCRIPTION_ID"] || "subscriptionid";
  const resourceGroupName =
    process.env["ELASTICSANS_RESOURCE_GROUP"] || "resourcegroupname";
  const elasticSanName = "elasticsanname";
  const volumeGroupName = "volumegroupname";
  const parameters: DiskSnapshotList = {
    diskSnapshotIds: [
      "/subscriptions/{subscriptionid}/resourceGroups/{resourcegroupname}/providers/Microsoft.Compute/snapshots/disksnapshot1",
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.volumes.beginPreRestoreAndWait(
    resourceGroupName,
    elasticSanName,
    volumeGroupName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await volumeGroupsPreRestoreMaximumSetGen();
}

main().catch(console.error);
