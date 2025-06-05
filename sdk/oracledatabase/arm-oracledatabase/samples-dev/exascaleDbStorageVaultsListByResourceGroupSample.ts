// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list ExascaleDbStorageVault resources by resource group
 *
 * @summary list ExascaleDbStorageVault resources by resource group
 * x-ms-original-file: 2025-03-01/ExascaleDbStorageVaults_ListByResourceGroup_MaximumSet_Gen.json
 */
async function exascaleDbStorageVaultsListByResourceGroupMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.exascaleDbStorageVaults.listByResourceGroup("rgopenapi")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await exascaleDbStorageVaultsListByResourceGroupMaximumSet();
}

main().catch(console.error);
