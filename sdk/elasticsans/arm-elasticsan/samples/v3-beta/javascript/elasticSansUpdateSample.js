// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ElasticSanManagement } = require("@azure/arm-elasticsan");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a Elastic San.
 *
 * @summary update a Elastic San.
 * x-ms-original-file: 2026-05-01-preview/ElasticSans_V1_Update_MaximumSet_Gen.json
 */
async function elasticSansV1UpdateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.elasticSans.update("resourcegroupname", "elasticsanname", {
    properties: {
      autoScaleProperties: {
        scaleUpProperties: {
          autoScalePolicyEnforcement: "None",
          capacityUnitScaleUpLimitTiB: 17,
          increaseCapacityUnitByTiB: 4,
          unusedSizeTiB: 24,
        },
      },
      baseSizeTiB: 13,
      extendedCapacitySizeTiB: 29,
      publicNetworkAccess: "Enabled",
    },
    tags: { key1931: "yhjwkgmrrwrcoxblgwgzjqusch" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update a Elastic San.
 *
 * @summary update a Elastic San.
 * x-ms-original-file: 2026-05-01-preview/ElasticSans_V1_Update_MinimumSet_Gen.json
 */
async function elasticSansV1UpdateMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.elasticSans.update("resourcegroupname", "elasticsanname", {});
  console.log(result);
}

/**
 * This sample demonstrates how to update a Elastic San.
 *
 * @summary update a Elastic San.
 * x-ms-original-file: 2026-05-01-preview/ElasticSans_V2_Update_MaximumSet_Gen.json
 */
async function elasticSansV2UpdateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.elasticSans.update("resourcegroupname", "elasticsanname", {
    properties: {
      autoScaleProperties: {
        scaleUpProperties: {
          autoScalePolicyEnforcement: "None",
          capacityUnitScaleUpLimitTiB: 17,
          increaseCapacityUnitByTiB: 4,
          unusedSizeTiB: 24,
        },
      },
      totalIops: 22,
      totalMBps: 4,
      totalSizeTiB: 27,
      publicNetworkAccess: "Enabled",
    },
    tags: { key1931: "yhjwkgmrrwrcoxblgwgzjqusch" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update a Elastic San.
 *
 * @summary update a Elastic San.
 * x-ms-original-file: 2026-05-01-preview/ElasticSans_V2_Update_MinimumSet_Gen.json
 */
async function elasticSansV2UpdateMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.elasticSans.update("resourcegroupname", "elasticsanname", {});
  console.log(result);
}

async function main() {
  await elasticSansV1UpdateMaximumSetGen();
  await elasticSansV1UpdateMinimumSetGen();
  await elasticSansV2UpdateMaximumSetGen();
  await elasticSansV2UpdateMinimumSetGen();
}

main().catch(console.error);
