// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update a Elastic San.
 *
 * @summary Update a Elastic San.
 * x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/preview/2024-07-01-preview/examples/ElasticSans_Update_MaximumSet_Gen.json
 */

import { ElasticSanUpdate, ElasticSanManagement } from "@azure/arm-elasticsan";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function elasticSansUpdateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["ELASTICSANS_SUBSCRIPTION_ID"] || "subscriptionid";
  const resourceGroupName =
    process.env["ELASTICSANS_RESOURCE_GROUP"] || "resourcegroupname";
  const elasticSanName = "elasticsanname";
  const parameters: ElasticSanUpdate = {
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
  };
  const credential = new DefaultAzureCredential();
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.elasticSans.beginUpdateAndWait(
    resourceGroupName,
    elasticSanName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Update a Elastic San.
 *
 * @summary Update a Elastic San.
 * x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/preview/2024-07-01-preview/examples/ElasticSans_Update_MinimumSet_Gen.json
 */
async function elasticSansUpdateMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["ELASTICSANS_SUBSCRIPTION_ID"] || "subscriptionid";
  const resourceGroupName =
    process.env["ELASTICSANS_RESOURCE_GROUP"] || "resourcegroupname";
  const elasticSanName = "elasticsanname";
  const parameters: ElasticSanUpdate = {};
  const credential = new DefaultAzureCredential();
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.elasticSans.beginUpdateAndWait(
    resourceGroupName,
    elasticSanName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await elasticSansUpdateMaximumSetGen();
  await elasticSansUpdateMinimumSetGen();
}

main().catch(console.error);
