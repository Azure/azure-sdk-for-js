// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list DbNode resources by CloudVmCluster
 *
 * @summary list DbNode resources by CloudVmCluster
 * x-ms-original-file: 2025-09-01/DbNodes_ListByParent_MaximumSet_Gen.json
 */
async function listDbNodesByVMClusterGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dbNodes.listByParent(
    "rgopenapi",
    "Replace this value with a string matching RegExp .*",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list DbNode resources by CloudVmCluster
 *
 * @summary list DbNode resources by CloudVmCluster
 * x-ms-original-file: 2025-09-01/DbNodes_ListByParent_MinimumSet_Gen.json
 */
async function listDbNodesByVMClusterGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dbNodes.listByParent(
    "rgopenapi",
    "Replace this value with a string matching RegExp .*",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listDbNodesByVMClusterGeneratedByMaximumSetRule();
  await listDbNodesByVMClusterGeneratedByMinimumSetRule();
}

main().catch(console.error);
