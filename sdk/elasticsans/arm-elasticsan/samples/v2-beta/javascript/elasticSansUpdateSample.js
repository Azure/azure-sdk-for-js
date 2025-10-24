// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ElasticSanClient } = require("@azure/arm-elasticsan");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a Elastic San.
 *
 * @summary update a Elastic San.
 * x-ms-original-file: 2024-07-01-preview/ElasticSans_Update_MaximumSet_Gen.json
 */
async function elasticSansUpdateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanClient(credential, subscriptionId);
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
 * x-ms-original-file: 2024-07-01-preview/ElasticSans_Update_MinimumSet_Gen.json
 */
async function elasticSansUpdateMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanClient(credential, subscriptionId);
  const result = await client.elasticSans.update("resourcegroupname", "elasticsanname", {});
  console.log(result);
}

async function main() {
  await elasticSansUpdateMaximumSetGen();
  await elasticSansUpdateMinimumSetGen();
}

main().catch(console.error);
