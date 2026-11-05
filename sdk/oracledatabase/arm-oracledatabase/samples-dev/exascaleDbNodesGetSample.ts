// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a ExascaleDbNode
 *
 * @summary get a ExascaleDbNode
 * x-ms-original-file: 2026-06-01/ExascaleDbNodes_Get_MaximumSet_Gen.json
 */
async function exascaleDbNodesGetMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.exascaleDbNodes.get("rgopenapi", "resource1", "resource1");
  console.log(result);
}

async function main(): Promise<void> {
  await exascaleDbNodesGetMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
