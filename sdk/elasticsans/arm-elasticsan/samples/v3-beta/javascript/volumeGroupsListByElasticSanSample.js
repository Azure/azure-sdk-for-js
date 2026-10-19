// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ElasticSanManagement } = require("@azure/arm-elasticsan");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list VolumeGroups.
 *
 * @summary list VolumeGroups.
 * x-ms-original-file: 2026-05-01-preview/VolumeGroups_GeneralPurpose_ListByElasticSan_MaximumSet_Gen.json
 */
async function volumeGroupsGeneralPurposeListByElasticSanMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.volumeGroups.listByElasticSan(
    "resourcegroupname",
    "elasticsanname",
    { xMsAccessSoftDeletedResources: "true" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list VolumeGroups.
 *
 * @summary list VolumeGroups.
 * x-ms-original-file: 2026-05-01-preview/VolumeGroups_ListByElasticSan_MaximumSet_Gen.json
 */
async function volumeGroupsListByElasticSanMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.volumeGroups.listByElasticSan(
    "resourcegroupname",
    "elasticsanname",
    { xMsAccessSoftDeletedResources: "true" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list VolumeGroups.
 *
 * @summary list VolumeGroups.
 * x-ms-original-file: 2026-05-01-preview/VolumeGroups_ListByElasticSan_MinimumSet_Gen.json
 */
async function volumeGroupsListByElasticSanMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.volumeGroups.listByElasticSan(
    "resourcegroupname",
    "elasticsanname",
    { xMsAccessSoftDeletedResources: "true" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list VolumeGroups.
 *
 * @summary list VolumeGroups.
 * x-ms-original-file: 2026-05-01-preview/VolumeGroups_PerformanceCritical_ListByElasticSan_MaximumSet_Gen.json
 */
async function volumeGroupsPerformanceCriticalListByElasticSanMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.volumeGroups.listByElasticSan(
    "resourcegroupname",
    "elasticsanname",
    { xMsAccessSoftDeletedResources: "true" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await volumeGroupsGeneralPurposeListByElasticSanMaximumSetGen();
  await volumeGroupsListByElasticSanMaximumSetGen();
  await volumeGroupsListByElasticSanMinimumSetGen();
  await volumeGroupsPerformanceCriticalListByElasticSanMaximumSetGen();
}

main().catch(console.error);
