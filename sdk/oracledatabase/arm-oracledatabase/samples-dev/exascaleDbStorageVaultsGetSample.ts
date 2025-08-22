// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to get a ExascaleDbStorageVault
 *
 * @summary get a ExascaleDbStorageVault
 * x-ms-original-file: 2025-03-01/ExascaleDbStorageVaults_Get_MaximumSet_Gen.json
 */

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

async function exascaleDbStorageVaultsGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.exascaleDbStorageVaults.get("rgopenapi", "vmClusterName");
  console.log(result);
}

async function main(): Promise<void> {
  await exascaleDbStorageVaultsGetMaximumSet();
}

main().catch(console.error);
