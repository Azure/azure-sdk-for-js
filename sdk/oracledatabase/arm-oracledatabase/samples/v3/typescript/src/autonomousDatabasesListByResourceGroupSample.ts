// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list AutonomousDatabase resources by resource group
 *
 * @summary list AutonomousDatabase resources by resource group
 * x-ms-original-file: 2025-09-01/AutonomousDatabases_ListByResourceGroup_MaximumSet_Gen.json
 */
async function listAutonomousDatabaseByResourceGroupGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.autonomousDatabases.listByResourceGroup("rgopenapi")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list AutonomousDatabase resources by resource group
 *
 * @summary list AutonomousDatabase resources by resource group
 * x-ms-original-file: 2025-09-01/AutonomousDatabases_ListByResourceGroup_MinimumSet_Gen.json
 */
async function listAutonomousDatabaseByResourceGroupGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.autonomousDatabases.listByResourceGroup("rgopenapi")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list AutonomousDatabase resources by resource group
 *
 * @summary list AutonomousDatabase resources by resource group
 * x-ms-original-file: 2025-09-01/autonomousDatabase_listByResourceGroup.json
 */
async function autonomousDatabasesListByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.autonomousDatabases.listByResourceGroup("rg000")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAutonomousDatabaseByResourceGroupGeneratedByMaximumSetRule();
  await listAutonomousDatabaseByResourceGroupGeneratedByMinimumSetRule();
  await autonomousDatabasesListByResourceGroup();
}

main().catch(console.error);
