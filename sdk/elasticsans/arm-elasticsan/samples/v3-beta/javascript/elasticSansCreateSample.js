// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ElasticSanManagement } = require("@azure/arm-elasticsan");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create ElasticSan.
 *
 * @summary create ElasticSan.
 * x-ms-original-file: 2026-05-01-preview/ElasticSans_V1_Create_MaximumSet_Gen.json
 */
async function elasticSansV1CreateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.elasticSans.create("resourcegroupname", "elasticsanname", {
    location: "France Central",
    properties: {
      autoScaleProperties: {
        scaleUpProperties: {
          autoScalePolicyEnforcement: "None",
          capacityUnitScaleUpLimitTiB: 17,
          increaseCapacityUnitByTiB: 4,
          unusedSizeTiB: 24,
        },
      },
      availabilityZones: ["1"],
      version: "V1",
      baseSizeTiB: 5,
      extendedCapacitySizeTiB: 25,
      publicNetworkAccess: "Enabled",
      sku: { name: "Premium_LRS", tier: "Premium" },
    },
    tags: { key9316: "ihndtieqibtob" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create ElasticSan.
 *
 * @summary create ElasticSan.
 * x-ms-original-file: 2026-05-01-preview/ElasticSans_V1_Create_MinimumSet_Gen.json
 */
async function elasticSansV1CreateMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.elasticSans.create("resourcegroupname", "elasticsanname", {
    location: "France Central",
    properties: { baseSizeTiB: 15, extendedCapacitySizeTiB: 27, sku: { name: "Premium_LRS" } },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create ElasticSan.
 *
 * @summary create ElasticSan.
 * x-ms-original-file: 2026-05-01-preview/ElasticSans_V2_Create_MaximumSet_Gen.json
 */
async function elasticSansV2CreateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.elasticSans.create("resourcegroupname", "elasticsanname", {
    location: "France Central",
    properties: {
      autoScaleProperties: {
        scaleUpProperties: {
          autoScalePolicyEnforcement: "None",
          capacityUnitScaleUpLimitTiB: 17,
          increaseCapacityUnitByTiB: 4,
          unusedSizeTiB: 24,
        },
      },
      availabilityZones: ["1"],
      version: "V2",
      totalIops: 22,
      totalMBps: 4,
      totalSizeTiB: 27,
      publicNetworkAccess: "Enabled",
      sku: { name: "ElasticSAN_LRS" },
    },
    tags: { key9316: "ihndtieqibtob" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create ElasticSan.
 *
 * @summary create ElasticSan.
 * x-ms-original-file: 2026-05-01-preview/ElasticSans_V2_Create_MinimumSet_Gen.json
 */
async function elasticSansV2CreateMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.elasticSans.create("resourcegroupname", "elasticsanname", {
    location: "France Central",
    properties: {
      version: "V2",
      totalIops: 22,
      totalMBps: 4,
      totalSizeTiB: 27,
      sku: { name: "ElasticSAN_LRS" },
    },
  });
  console.log(result);
}

async function main() {
  await elasticSansV1CreateMaximumSetGen();
  await elasticSansV1CreateMinimumSetGen();
  await elasticSansV2CreateMaximumSetGen();
  await elasticSansV2CreateMinimumSetGen();
}

main().catch(console.error);
