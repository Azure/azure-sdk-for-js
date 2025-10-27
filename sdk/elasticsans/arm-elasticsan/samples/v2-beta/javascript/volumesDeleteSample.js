// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ElasticSanManagement } = require("@azure/arm-elasticsan");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete an Volume.
 *
 * @summary delete an Volume.
 * x-ms-original-file: 2024-07-01-preview/Volumes_Delete_MaximumSet_Gen.json
 */
async function volumesDeleteMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  await client.volumes.delete(
    "resourcegroupname",
    "elasticsanname",
    "volumegroupname",
    "volumename",
    {
      xMsDeleteSnapshots: "true",
      xMsForceDelete: "true",
      deleteType: "permanent",
    },
  );
}

/**
 * This sample demonstrates how to delete an Volume.
 *
 * @summary delete an Volume.
 * x-ms-original-file: 2024-07-01-preview/Volumes_Delete_MinimumSet_Gen.json
 */
async function volumesDeleteMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  await client.volumes.delete(
    "resourcegroupname",
    "elasticsanname",
    "volumegroupname",
    "volumename",
    { deleteType: "permanent" },
  );
}

async function main() {
  await volumesDeleteMaximumSetGen();
  await volumesDeleteMinimumSetGen();
}

main().catch(console.error);
