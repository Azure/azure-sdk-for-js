// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ElasticSan, ElasticSanManagement } from "@azure/arm-elasticsan";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create ElasticSan.
 *
 * @summary Create ElasticSan.
 * x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/preview/2024-07-01-preview/examples/ElasticSans_Create_MaximumSet_Gen.json
 */
async function elasticSansCreateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["ELASTICSANS_SUBSCRIPTION_ID"] || "subscriptionid";
  const resourceGroupName =
    process.env["ELASTICSANS_RESOURCE_GROUP"] || "resourcegroupname";
  const elasticSanName = "elasticsanname";
  const parameters: ElasticSan = {
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
  };
  const credential = new DefaultAzureCredential();
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.elasticSans.beginCreateAndWait(
    resourceGroupName,
    elasticSanName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create ElasticSan.
 *
 * @summary Create ElasticSan.
 * x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/preview/2024-07-01-preview/examples/ElasticSans_Create_MinimumSet_Gen.json
 */
async function elasticSansCreateMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["ELASTICSANS_SUBSCRIPTION_ID"] || "subscriptionid";
  const resourceGroupName =
    process.env["ELASTICSANS_RESOURCE_GROUP"] || "resourcegroupname";
  const elasticSanName = "elasticsanname";
  const parameters: ElasticSan = {
    location: "France Central",
    properties: {
      baseSizeTiB: 15,
      extendedCapacitySizeTiB: 27,
      sku: { name: "Premium_LRS" },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.elasticSans.beginCreateAndWait(
    resourceGroupName,
    elasticSanName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await elasticSansCreateMaximumSetGen();
  await elasticSansCreateMinimumSetGen();
}

main().catch(console.error);
