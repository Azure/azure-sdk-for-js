// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ElasticSanManagement } from "@azure/arm-elasticsan";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete an VolumeGroup.
 *
 * @summary delete an VolumeGroup.
 * x-ms-original-file: 2025-09-01/VolumeGroups_Delete_MaximumSet_Gen.json
 */
async function volumeGroupsDeleteMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  await client.volumeGroups.delete("resourcegroupname", "elasticsanname", "volumegroupname");
}

/**
 * This sample demonstrates how to delete an VolumeGroup.
 *
 * @summary delete an VolumeGroup.
 * x-ms-original-file: 2025-09-01/VolumeGroups_Delete_MinimumSet_Gen.json
 */
async function volumeGroupsDeleteMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  await client.volumeGroups.delete("resourcegroupname", "elasticsanname", "volumegroupname");
}

async function main(): Promise<void> {
  await volumeGroupsDeleteMaximumSetGen();
  await volumeGroupsDeleteMinimumSetGen();
}

main().catch(console.error);
