// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to list AutonomousDatabase resources by resource group
 *
 * @summary list AutonomousDatabase resources by resource group
 * x-ms-original-file: 2025-03-01/autonomousDatabase_listByResourceGroup.json
 */

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

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
  await autonomousDatabasesListByResourceGroup();
}

main().catch(console.error);
