// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ElasticSanManagement } from "@azure/arm-elasticsan";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Volumes in a VolumeGroup.
 *
 * @summary list Volumes in a VolumeGroup.
 * x-ms-original-file: 2025-09-01/Volumes_ListByVolumeGroup_MaximumSet_Gen.json
 */
async function volumesListByVolumeGroupMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.volumes.listByVolumeGroup(
    "resourcegroupname",
    "elasticsanname",
    "volumegroupname",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list Volumes in a VolumeGroup.
 *
 * @summary list Volumes in a VolumeGroup.
 * x-ms-original-file: 2025-09-01/Volumes_ListByVolumeGroup_MinimumSet_Gen.json
 */
async function volumesListByVolumeGroupMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.volumes.listByVolumeGroup(
    "resourcegroupname",
    "elasticsanname",
    "volumegroupname",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await volumesListByVolumeGroupMaximumSetGen();
  await volumesListByVolumeGroupMinimumSetGen();
}

main().catch(console.error);
