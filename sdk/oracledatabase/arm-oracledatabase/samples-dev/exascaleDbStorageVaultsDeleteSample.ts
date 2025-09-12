// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to delete a ExascaleDbStorageVault
 *
 * @summary delete a ExascaleDbStorageVault
 * x-ms-original-file: 2025-03-01/ExascaleDbStorageVaults_Delete_MaximumSet_Gen.json
 */

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

async function exascaleDbStorageVaultsDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  await client.exascaleDbStorageVaults.delete("rgopenapi", "vmClusterName");
}

async function main(): Promise<void> {
  await exascaleDbStorageVaultsDeleteMaximumSet();
}

main().catch(console.error);
