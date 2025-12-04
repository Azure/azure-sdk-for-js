// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list ElasticSnapshot resources by ElasticVolume
 *
 * @summary list ElasticSnapshot resources by ElasticVolume
 * x-ms-original-file: 2025-09-01-preview/ElasticSnapshots_ListByElasticVolume.json
 */
async function elasticSnapshotsListByElasticVolume(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.elasticSnapshots.listByElasticVolume(
    "myRG",
    "account1",
    "pool1",
    "volume1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await elasticSnapshotsListByElasticVolume();
}

main().catch(console.error);
