// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get a Volume Snapshot.
 *
 * @summary Get a Volume Snapshot.
 * x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/preview/2024-07-01-preview/examples/VolumeSnapshots_Get_MaximumSet_Gen.json
 */

import { ElasticSanManagement } from "@azure/arm-elasticsan";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function volumeSnapshotsGetMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["ELASTICSANS_SUBSCRIPTION_ID"] || "subscriptionid";
  const resourceGroupName =
    process.env["ELASTICSANS_RESOURCE_GROUP"] || "resourcegroupname";
  const elasticSanName = "elasticsanname";
  const volumeGroupName = "volumegroupname";
  const snapshotName = "snapshotname";
  const credential = new DefaultAzureCredential();
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.volumeSnapshots.get(
    resourceGroupName,
    elasticSanName,
    volumeGroupName,
    snapshotName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Get a Volume Snapshot.
 *
 * @summary Get a Volume Snapshot.
 * x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/preview/2024-07-01-preview/examples/VolumeSnapshots_Get_MinimumSet_Gen.json
 */
async function volumeSnapshotsGetMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["ELASTICSANS_SUBSCRIPTION_ID"] || "subscriptionid";
  const resourceGroupName =
    process.env["ELASTICSANS_RESOURCE_GROUP"] || "resourcegroupname";
  const elasticSanName = "elasticsanname";
  const volumeGroupName = "volumegroupname";
  const snapshotName = "snapshotname";
  const credential = new DefaultAzureCredential();
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.volumeSnapshots.get(
    resourceGroupName,
    elasticSanName,
    volumeGroupName,
    snapshotName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await volumeSnapshotsGetMaximumSetGen();
  await volumeSnapshotsGetMinimumSetGen();
}

main().catch(console.error);
