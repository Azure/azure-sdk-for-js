// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ElasticSanManagement } from "@azure/arm-elasticsan";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a Volume.
 *
 * @summary create a Volume.
 * x-ms-original-file: 2025-09-01/Volumes_Create_MaximumSet_Gen.json
 */
async function volumesCreateMaximumSetGen(): Promise<void> {
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
async function volumesCreateMinimumSetGen(): Promise<void> {
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

async function main(): Promise<void> {
  await volumesCreateMaximumSetGen();
  await volumesCreateMinimumSetGen();
}

main().catch(console.error);
