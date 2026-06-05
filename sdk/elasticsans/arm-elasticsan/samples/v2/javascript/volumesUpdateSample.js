// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ElasticSanManagement } = require("@azure/arm-elasticsan");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update an Volume.
 *
 * @summary update an Volume.
 * x-ms-original-file: 2025-09-01/Volumes_Update_MaximumSet_Gen.json
 */
async function volumesUpdateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.volumes.update(
    "resourcegroupname",
    "elasticsanname",
    "volumegroupname",
    "volumename",
    { properties: { managedBy: { resourceId: "pclpkrpkpmvcsegcubrakcoodrubo" }, sizeGiB: 7 } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to update an Volume.
 *
 * @summary update an Volume.
 * x-ms-original-file: 2025-09-01/Volumes_Update_MinimumSet_Gen.json
 */
async function volumesUpdateMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.volumes.update(
    "resourcegroupname",
    "elasticsanname",
    "volumegroupname",
    "volumename",
    {},
  );
  console.log(result);
}

async function main() {
  await volumesUpdateMaximumSetGen();
  await volumesUpdateMinimumSetGen();
}

main().catch(console.error);
