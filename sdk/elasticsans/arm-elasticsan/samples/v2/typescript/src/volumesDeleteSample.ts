// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ElasticSanManagement } from "@azure/arm-elasticsan";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete an Volume.
 *
 * @summary delete an Volume.
 * x-ms-original-file: 2025-09-01/Volumes_Delete_MaximumSet_Gen.json
 */
async function volumesDeleteMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  await client.volumes.delete(
    "resourcegroupname",
    "elasticsanname",
    "volumegroupname",
    "volumename",
    { xMsDeleteSnapshots: "true", xMsForceDelete: "true" },
  );
}

/**
 * This sample demonstrates how to delete an Volume.
 *
 * @summary delete an Volume.
 * x-ms-original-file: 2025-09-01/Volumes_Delete_MinimumSet_Gen.json
 */
async function volumesDeleteMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  await client.volumes.delete(
    "resourcegroupname",
    "elasticsanname",
    "volumegroupname",
    "volumename",
  );
}

async function main(): Promise<void> {
  await volumesDeleteMaximumSetGen();
  await volumesDeleteMinimumSetGen();
}

main().catch(console.error);
