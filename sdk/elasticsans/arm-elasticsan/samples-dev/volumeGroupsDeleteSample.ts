// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete an VolumeGroup.
 *
 * @summary Delete an VolumeGroup.
 * x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/preview/2024-07-01-preview/examples/VolumeGroups_Delete_MaximumSet_Gen.json
 */

import { ElasticSanManagement } from "@azure/arm-elasticsan";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function volumeGroupsDeleteMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["ELASTICSANS_SUBSCRIPTION_ID"] || "subscriptionid";
  const resourceGroupName =
    process.env["ELASTICSANS_RESOURCE_GROUP"] || "resourcegroupname";
  const elasticSanName = "elasticsanname";
  const volumeGroupName = "volumegroupname";
  const credential = new DefaultAzureCredential();
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.volumeGroups.beginDeleteAndWait(
    resourceGroupName,
    elasticSanName,
    volumeGroupName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Delete an VolumeGroup.
 *
 * @summary Delete an VolumeGroup.
 * x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/preview/2024-07-01-preview/examples/VolumeGroups_Delete_MinimumSet_Gen.json
 */
async function volumeGroupsDeleteMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["ELASTICSANS_SUBSCRIPTION_ID"] || "subscriptionid";
  const resourceGroupName =
    process.env["ELASTICSANS_RESOURCE_GROUP"] || "resourcegroupname";
  const elasticSanName = "elasticsanname";
  const volumeGroupName = "volumegroupname";
  const credential = new DefaultAzureCredential();
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.volumeGroups.beginDeleteAndWait(
    resourceGroupName,
    elasticSanName,
    volumeGroupName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await volumeGroupsDeleteMaximumSetGen();
  await volumeGroupsDeleteMinimumSetGen();
}

main().catch(console.error);
