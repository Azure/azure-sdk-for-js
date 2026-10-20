// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list ExascaleDbNode resources by ExadbVmCluster
 *
 * @summary list ExascaleDbNode resources by ExadbVmCluster
 * x-ms-original-file: 2026-06-01/ExascaleDbNodes_ListByParent_MaximumSet_Gen.json
 */
async function exascaleDbNodesListByParentMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.exascaleDbNodes.listByParent("rgopenapi", "resource1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await exascaleDbNodesListByParentMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
