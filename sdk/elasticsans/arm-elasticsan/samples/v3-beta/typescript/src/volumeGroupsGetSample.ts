// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ElasticSanManagement } from "@azure/arm-elasticsan";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get an VolumeGroups.
 *
 * @summary get an VolumeGroups.
 * x-ms-original-file: 2026-05-01-preview/VolumeGroups_GeneralPurpose_Get_MaximumSet_Gen.json
 */
async function volumeGroupsGeneralPurposeGetMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.volumeGroups.get(
    "resourcegroupname",
    "elasticsanname",
    "volumegroupname",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get an VolumeGroups.
 *
 * @summary get an VolumeGroups.
 * x-ms-original-file: 2026-05-01-preview/VolumeGroups_Get_MaximumSet_Gen.json
 */
async function volumeGroupsGetMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.volumeGroups.get(
    "resourcegroupname",
    "elasticsanname",
    "volumegroupname",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get an VolumeGroups.
 *
 * @summary get an VolumeGroups.
 * x-ms-original-file: 2026-05-01-preview/VolumeGroups_Get_MinimumSet_Gen.json
 */
async function volumeGroupsGetMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.volumeGroups.get(
    "resourcegroupname",
    "elasticsanname",
    "volumegroupname",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get an VolumeGroups.
 *
 * @summary get an VolumeGroups.
 * x-ms-original-file: 2026-05-01-preview/VolumeGroups_PerformanceCritical_Get_MaximumSet_Gen.json
 */
async function volumeGroupsPerformanceCriticalGetMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.volumeGroups.get(
    "resourcegroupname",
    "elasticsanname",
    "volumegroupname",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await volumeGroupsGeneralPurposeGetMaximumSetGen();
  await volumeGroupsGetMaximumSetGen();
  await volumeGroupsGetMinimumSetGen();
  await volumeGroupsPerformanceCriticalGetMaximumSetGen();
}

main().catch(console.error);
