// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a ExascaleDbStorageVault
 *
 * @summary delete a ExascaleDbStorageVault
 * x-ms-original-file: 2026-06-01/ExascaleDbStorageVaults_Delete_MaximumSet_Gen.json
 */
async function exascaleDbStorageVaultsDeleteMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  await client.exascaleDbStorageVaults.delete("rgopenapi", "resource1");
}

async function main(): Promise<void> {
  await exascaleDbStorageVaultsDeleteMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
