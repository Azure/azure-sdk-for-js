// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Restore Soft Deleted Volumes. The volume name is obtained by using the API to list soft deleted volumes by volume group
 *
 * @summary Restore Soft Deleted Volumes. The volume name is obtained by using the API to list soft deleted volumes by volume group
 * x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/preview/2024-07-01-preview/examples/RestoreVolume_MaximumSet_Gen.json
 */

import { ElasticSanManagement } from "@azure/arm-elasticsan";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function restoreVolumeMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["ELASTICSANS_SUBSCRIPTION_ID"] || "subscriptionid";
  const resourceGroupName =
    process.env["ELASTICSANS_RESOURCE_GROUP"] || "resourcegroupname";
  const elasticSanName = "elasticsanname";
  const volumeGroupName = "volumegroupname";
  const volumeName = "volumename-1741526907";
  const credential = new DefaultAzureCredential();
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.beginRestoreVolumeAndWait(
    resourceGroupName,
    elasticSanName,
    volumeGroupName,
    volumeName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Restore Soft Deleted Volumes. The volume name is obtained by using the API to list soft deleted volumes by volume group
 *
 * @summary Restore Soft Deleted Volumes. The volume name is obtained by using the API to list soft deleted volumes by volume group
 * x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/preview/2024-07-01-preview/examples/RestoreVolume_MinimumSet_Gen.json
 */
async function restoreVolumeMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["ELASTICSANS_SUBSCRIPTION_ID"] || "subscriptionid";
  const resourceGroupName =
    process.env["ELASTICSANS_RESOURCE_GROUP"] || "resourcegroupname";
  const elasticSanName = "elasticsanname";
  const volumeGroupName = "volumegroupname";
  const volumeName = "volumename-1741526907";
  const credential = new DefaultAzureCredential();
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.beginRestoreVolumeAndWait(
    resourceGroupName,
    elasticSanName,
    volumeGroupName,
    volumeName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await restoreVolumeMaximumSetGen();
  await restoreVolumeMinimumSetGen();
}

main().catch(console.error);
