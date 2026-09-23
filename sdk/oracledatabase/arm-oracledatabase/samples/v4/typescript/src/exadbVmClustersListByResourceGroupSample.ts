// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list ExadbVmCluster resources by resource group
 *
 * @summary list ExadbVmCluster resources by resource group
 * x-ms-original-file: 2026-06-01/ExadbVmClusters_ListByResourceGroup_MaximumSet_Gen.json
 */
async function exadbVmClustersListByResourceGroupMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.exadbVmClusters.listByResourceGroup("rgopenapi")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await exadbVmClustersListByResourceGroupMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
