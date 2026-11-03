// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a FlexComponent
 *
 * @summary get a FlexComponent
 * x-ms-original-file: 2026-06-01/FlexComponents_Get_MaximumSet_Gen.json
 */
async function flexComponentsGetMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.flexComponents.get("eastus", "resource1");
  console.log(result);
}

async function main(): Promise<void> {
  await flexComponentsGetMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
