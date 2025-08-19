// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get an VolumeGroups.
 *
 * @summary Get an VolumeGroups.
 * x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/preview/2024-07-01-preview/examples/VolumeGroups_Get_MaximumSet_Gen.json
 */

import { ElasticSanManagement } from "@azure/arm-elasticsan";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function volumeGroupsGetMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["ELASTICSANS_SUBSCRIPTION_ID"] || "subscriptionid";
  const resourceGroupName =
    process.env["ELASTICSANS_RESOURCE_GROUP"] || "resourcegroupname";
  const elasticSanName = "elasticsanname";
  const volumeGroupName = "volumegroupname";
  const credential = new DefaultAzureCredential();
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.volumeGroups.get(
    resourceGroupName,
    elasticSanName,
    volumeGroupName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Get an VolumeGroups.
 *
 * @summary Get an VolumeGroups.
 * x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/preview/2024-07-01-preview/examples/VolumeGroups_Get_MinimumSet_Gen.json
 */
async function volumeGroupsGetMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["ELASTICSANS_SUBSCRIPTION_ID"] || "subscriptionid";
  const resourceGroupName =
    process.env["ELASTICSANS_RESOURCE_GROUP"] || "resourcegroupname";
  const elasticSanName = "elasticsanname";
  const volumeGroupName = "volumegroupname";
  const credential = new DefaultAzureCredential();
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.volumeGroups.get(
    resourceGroupName,
    elasticSanName,
    volumeGroupName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await volumeGroupsGetMaximumSetGen();
  await volumeGroupsGetMinimumSetGen();
}

main().catch(console.error);
