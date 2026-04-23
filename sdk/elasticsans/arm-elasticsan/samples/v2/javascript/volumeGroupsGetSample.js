// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ElasticSanManagement } = require("@azure/arm-elasticsan");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get an VolumeGroups.
 *
 * @summary get an VolumeGroups.
 * x-ms-original-file: 2025-09-01/VolumeGroups_Get_MaximumSet_Gen.json
 */
async function volumeGroupsGetMaximumSetGen() {
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
 * x-ms-original-file: 2025-09-01/VolumeGroups_Get_MinimumSet_Gen.json
 */
async function volumeGroupsGetMinimumSetGen() {
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

async function main() {
  await volumeGroupsGetMaximumSetGen();
  await volumeGroupsGetMinimumSetGen();
}

main().catch(console.error);
