// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ElasticSanManagement } from "@azure/arm-elasticsan";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create ElasticSan.
 *
 * @summary create ElasticSan.
 * x-ms-original-file: 2025-09-01/ElasticSans_Create_MaximumSet_Gen.json
 */
async function elasticSansCreateMaximumSetGen(): Promise<void> {
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
 * x-ms-original-file: 2025-09-01/ElasticSans_Create_MinimumSet_Gen.json
 */
async function elasticSansCreateMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.elasticSans.create("resourcegroupname", "elasticsanname", {
    location: "France Central",
    properties: { baseSizeTiB: 15, extendedCapacitySizeTiB: 27, sku: { name: "Premium_LRS" } },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await elasticSansCreateMaximumSetGen();
  await elasticSansCreateMinimumSetGen();
}

main().catch(console.error);
