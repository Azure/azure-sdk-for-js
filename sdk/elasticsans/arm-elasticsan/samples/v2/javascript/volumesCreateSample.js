// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ElasticSanManagement } = require("@azure/arm-elasticsan");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a Volume.
 *
 * @summary create a Volume.
 * x-ms-original-file: 2025-09-01/Volumes_Create_MaximumSet_Gen.json
 */
async function volumesCreateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.volumes.create(
    "resourcegroupname",
    "elasticsanname",
    "volumegroupname",
    "volumename",
    {
      properties: {
        creationData: { createSource: "None", sourceId: "mdonegivjquite" },
        managedBy: { resourceId: "pclpkrpkpmvcsegcubrakcoodrubo" },
        sizeGiB: 23,
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a Volume.
 *
 * @summary create a Volume.
 * x-ms-original-file: 2025-09-01/Volumes_Create_MinimumSet_Gen.json
 */
async function volumesCreateMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.volumes.create(
    "resourcegroupname",
    "elasticsanname",
    "volumegroupname",
    "volumename",
    { properties: { sizeGiB: 9 } },
  );
  console.log(result);
}

async function main() {
  await volumesCreateMaximumSetGen();
  await volumesCreateMinimumSetGen();
}

main().catch(console.error);
