// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get an Volume.
 *
 * @summary Get an Volume.
 * x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/preview/2024-07-01-preview/examples/Volumes_Get_MaximumSet_Gen.json
 */

import { ElasticSanManagement } from "@azure/arm-elasticsan";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function volumesGetMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["ELASTICSANS_SUBSCRIPTION_ID"] || "subscriptionid";
  const resourceGroupName =
    process.env["ELASTICSANS_RESOURCE_GROUP"] || "resourcegroupname";
  const elasticSanName = "elasticsanname";
  const volumeGroupName = "volumegroupname";
  const volumeName = "volumename";
  const credential = new DefaultAzureCredential();
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.volumes.get(
    resourceGroupName,
    elasticSanName,
    volumeGroupName,
    volumeName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Get an Volume.
 *
 * @summary Get an Volume.
 * x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/preview/2024-07-01-preview/examples/Volumes_Get_MinimumSet_Gen.json
 */
async function volumesGetMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["ELASTICSANS_SUBSCRIPTION_ID"] || "subscriptionid";
  const resourceGroupName =
    process.env["ELASTICSANS_RESOURCE_GROUP"] || "resourcegroupname";
  const elasticSanName = "elasticsanname";
  const volumeGroupName = "volumegroupname";
  const volumeName = "volumename";
  const credential = new DefaultAzureCredential();
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.volumes.get(
    resourceGroupName,
    elasticSanName,
    volumeGroupName,
    volumeName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await volumesGetMaximumSetGen();
  await volumesGetMinimumSetGen();
}

main().catch(console.error);
