// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list DbSystem resources by resource group
 *
 * @summary list DbSystem resources by resource group
 * x-ms-original-file: 2025-09-01/DbSystems_ListByResourceGroup_MaximumSet_Gen.json
 */
async function dbSystemsListByResourceGroupMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dbSystems.listByResourceGroup("rgopenapi")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list DbSystem resources by resource group
 *
 * @summary list DbSystem resources by resource group
 * x-ms-original-file: 2025-09-01/DbSystems_ListByResourceGroup_MinimumSet_Gen.json
 */
async function dbSystemsListByResourceGroupMaximumSetGenGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dbSystems.listByResourceGroup("rgopenapi")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await dbSystemsListByResourceGroupMaximumSet();
  await dbSystemsListByResourceGroupMaximumSetGenGeneratedByMinimumSetRule();
}

main().catch(console.error);
