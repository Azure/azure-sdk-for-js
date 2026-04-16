// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list ExascaleDbNode resources by ExadbVmCluster
 *
 * @summary list ExascaleDbNode resources by ExadbVmCluster
 * x-ms-original-file: 2025-09-01/ExascaleDbNodes_ListByParent_MaximumSet_Gen.json
 */
async function exascaleDbNodesListByParentMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.exascaleDbNodes.listByParent("rgopenapi", "vmcluster")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list ExascaleDbNode resources by ExadbVmCluster
 *
 * @summary list ExascaleDbNode resources by ExadbVmCluster
 * x-ms-original-file: 2025-09-01/ExascaleDbNodes_ListByParent_MinimumSet_Gen.json
 */
async function exascaleDbNodesListByParentMaximumSetGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.exascaleDbNodes.listByParent("rgopenapi", "vmcluster")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await exascaleDbNodesListByParentMaximumSet();
  await exascaleDbNodesListByParentMaximumSetGeneratedByMinimumSetRule();
}

main().catch(console.error);
