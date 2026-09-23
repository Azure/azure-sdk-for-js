// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a DbSystem
 *
 * @summary get a DbSystem
 * x-ms-original-file: 2026-06-01/DbSystems_Get_MaximumSet_Gen.json
 */
async function dbSystemsGetMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.dbSystems.get("rgopenapi", "resource1");
  console.log(result);
}

async function main(): Promise<void> {
  await dbSystemsGetMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
