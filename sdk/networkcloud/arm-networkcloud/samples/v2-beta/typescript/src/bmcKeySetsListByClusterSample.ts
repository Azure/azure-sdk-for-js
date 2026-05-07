// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloud } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a list of baseboard management controller key sets for the provided cluster.
 *
 * @summary get a list of baseboard management controller key sets for the provided cluster.
 * x-ms-original-file: 2026-05-01-preview/BmcKeySets_ListByCluster.json
 */
async function listBaseboardManagementControllerKeySetsOfTheCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.bmcKeySets.listByCluster("resourceGroupName", "clusterName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listBaseboardManagementControllerKeySetsOfTheCluster();
}

main().catch(console.error);
