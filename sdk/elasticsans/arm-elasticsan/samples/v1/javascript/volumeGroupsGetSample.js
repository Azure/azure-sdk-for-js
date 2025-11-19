// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ElasticSanManagement } = require("@azure/arm-elasticsan");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Get an VolumeGroups.
 *
 * @summary Get an VolumeGroups.
 * x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/ElasticSan/stable/2025-09-01/examples/VolumeGroups_Get_MaximumSet_Gen.json
 */
async function volumeGroupsGetMaximumSetGen() {
  const subscriptionId = process.env["ELASTICSANS_SUBSCRIPTION_ID"] || "subscriptionid";
  const resourceGroupName = process.env["ELASTICSANS_RESOURCE_GROUP"] || "resourcegroupname";
  const elasticSanName = "elasticsanname";
  const volumeGroupName = "volumegroupname";
  const credential = new DefaultAzureCredential();
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.volumeGroups.get(resourceGroupName, elasticSanName, volumeGroupName);
  console.log(result);
}

/**
 * This sample demonstrates how to Get an VolumeGroups.
 *
 * @summary Get an VolumeGroups.
 * x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/ElasticSan/stable/2025-09-01/examples/VolumeGroups_Get_MinimumSet_Gen.json
 */
async function volumeGroupsGetMinimumSetGen() {
  const subscriptionId = process.env["ELASTICSANS_SUBSCRIPTION_ID"] || "subscriptionid";
  const resourceGroupName = process.env["ELASTICSANS_RESOURCE_GROUP"] || "resourcegroupname";
  const elasticSanName = "elasticsanname";
  const volumeGroupName = "volumegroupname";
  const credential = new DefaultAzureCredential();
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.volumeGroups.get(resourceGroupName, elasticSanName, volumeGroupName);
  console.log(result);
}

async function main() {
  await volumeGroupsGetMaximumSetGen();
  await volumeGroupsGetMinimumSetGen();
}

main().catch(console.error);
