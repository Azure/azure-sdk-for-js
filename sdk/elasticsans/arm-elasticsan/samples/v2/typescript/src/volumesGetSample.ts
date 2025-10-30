// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ElasticSanManagement } from "@azure/arm-elasticsan";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get an Volume.
 *
 * @summary get an Volume.
 * x-ms-original-file: 2025-09-01/Volumes_Get_MaximumSet_Gen.json
 */
async function volumesGetMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.volumes.get(
    "resourcegroupname",
    "elasticsanname",
    "volumegroupname",
    "volumename",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get an Volume.
 *
 * @summary get an Volume.
 * x-ms-original-file: 2025-09-01/Volumes_Get_MinimumSet_Gen.json
 */
async function volumesGetMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.volumes.get(
    "resourcegroupname",
    "elasticsanname",
    "volumegroupname",
    "volumename",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await volumesGetMaximumSetGen();
  await volumesGetMinimumSetGen();
}

main().catch(console.error);
