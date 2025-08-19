// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ElasticSanManagement } from "@azure/arm-elasticsan";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the private link resources that need to be created for a elastic San.
 *
 * @summary Gets the private link resources that need to be created for a elastic San.
 * x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/preview/2024-07-01-preview/examples/PrivateLinkResources_ListByElasticSan_MaximumSet_Gen.json
 */
async function privateLinkResourcesListByElasticSanMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["ELASTICSANS_SUBSCRIPTION_ID"] || "subscriptionid";
  const resourceGroupName =
    process.env["ELASTICSANS_RESOURCE_GROUP"] || "resourcegroupname";
  const elasticSanName = "elasticsanname";
  const credential = new DefaultAzureCredential();
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.privateLinkResources.listByElasticSan(
    resourceGroupName,
    elasticSanName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Gets the private link resources that need to be created for a elastic San.
 *
 * @summary Gets the private link resources that need to be created for a elastic San.
 * x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/preview/2024-07-01-preview/examples/PrivateLinkResources_ListByElasticSan_MinimumSet_Gen.json
 */
async function privateLinkResourcesListByElasticSanMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["ELASTICSANS_SUBSCRIPTION_ID"] || "subscriptionid";
  const resourceGroupName =
    process.env["ELASTICSANS_RESOURCE_GROUP"] || "resourcegroupname";
  const elasticSanName = "elasticsanname";
  const credential = new DefaultAzureCredential();
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.privateLinkResources.listByElasticSan(
    resourceGroupName,
    elasticSanName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await privateLinkResourcesListByElasticSanMaximumSetGen();
  await privateLinkResourcesListByElasticSanMinimumSetGen();
}

main().catch(console.error);
