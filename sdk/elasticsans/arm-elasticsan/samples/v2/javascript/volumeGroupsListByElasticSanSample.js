// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ElasticSanManagement } = require("@azure/arm-elasticsan");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list VolumeGroups.
 *
 * @summary list VolumeGroups.
 * x-ms-original-file: 2025-09-01/VolumeGroups_ListByElasticSan_MaximumSet_Gen.json
 */
async function volumeGroupsListByElasticSanMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.volumeGroups.listByElasticSan(
    "resourcegroupname",
    "elasticsanname",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list VolumeGroups.
 *
 * @summary list VolumeGroups.
 * x-ms-original-file: 2025-09-01/VolumeGroups_ListByElasticSan_MinimumSet_Gen.json
 */
async function volumeGroupsListByElasticSanMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.volumeGroups.listByElasticSan(
    "resourcegroupname",
    "elasticsanname",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await volumeGroupsListByElasticSanMaximumSetGen();
  await volumeGroupsListByElasticSanMinimumSetGen();
}

main().catch(console.error);
