// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a ExascaleDbStorageVault
 *
 * @summary update a ExascaleDbStorageVault
 * x-ms-original-file: 2026-06-01/ExascaleDbStorageVaults_Update_MaximumSet_Gen.json
 */
async function exascaleDbStorageVaultsUpdateMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.exascaleDbStorageVaults.update("rgopenapi", "resource1", {
    tags: { key4191: "dwwnuodzbkj" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await exascaleDbStorageVaultsUpdateMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
