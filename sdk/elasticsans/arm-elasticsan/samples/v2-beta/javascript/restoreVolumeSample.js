// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ElasticSanManagement } = require("@azure/arm-elasticsan");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to restore Soft Deleted Volumes. The volume name is obtained by using the API to list soft deleted volumes by volume group
 *
 * @summary restore Soft Deleted Volumes. The volume name is obtained by using the API to list soft deleted volumes by volume group
 * x-ms-original-file: 2024-07-01-preview/RestoreVolume_MaximumSet_Gen.json
 */
async function restoreVolumeMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.restoreVolume(
    "resourcegroupname",
    "elasticsanname",
    "volumegroupname",
    "volumename-1741526907",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to restore Soft Deleted Volumes. The volume name is obtained by using the API to list soft deleted volumes by volume group
 *
 * @summary restore Soft Deleted Volumes. The volume name is obtained by using the API to list soft deleted volumes by volume group
 * x-ms-original-file: 2024-07-01-preview/RestoreVolume_MinimumSet_Gen.json
 */
async function restoreVolumeMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.restoreVolume(
    "resourcegroupname",
    "elasticsanname",
    "volumegroupname",
    "volumename-1741526907",
  );
  console.log(result);
}

async function main() {
  await restoreVolumeMaximumSetGen();
  await restoreVolumeMinimumSetGen();
}

main().catch(console.error);
