// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ElasticSanManagement } = require("@azure/arm-elasticsan");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the private link resources that need to be created for a elastic San.
 *
 * @summary gets the private link resources that need to be created for a elastic San.
 * x-ms-original-file: 2025-09-01/PrivateLinkResources_ListByElasticSan_MaximumSet_Gen.json
 */
async function privateLinkResourcesListByElasticSanMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.privateLinkResources.listByElasticSan(
    "resourcegroupname",
    "elasticsanname",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets the private link resources that need to be created for a elastic San.
 *
 * @summary gets the private link resources that need to be created for a elastic San.
 * x-ms-original-file: 2025-09-01/PrivateLinkResources_ListByElasticSan_MinimumSet_Gen.json
 */
async function privateLinkResourcesListByElasticSanMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.privateLinkResources.listByElasticSan(
    "resourcegroupname",
    "elasticsanname",
  );
  console.log(result);
}

async function main() {
  await privateLinkResourcesListByElasticSanMaximumSetGen();
  await privateLinkResourcesListByElasticSanMinimumSetGen();
}

main().catch(console.error);
